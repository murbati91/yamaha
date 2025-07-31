// Analytics Service
// Handles Google Analytics, GTM, and custom events

const GA_ID = import.meta.env.VITE_GA_ID
const GTM_ID = import.meta.env.VITE_GTM_ID
const ENABLE_ANALYTICS = import.meta.env.VITE_ENABLE_ANALYTICS === 'true'

// Initialize Google Analytics
export const initGA = () => {
  if (!ENABLE_ANALYTICS || !GA_ID) return

  // Load GA script
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script1)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, {
    send_page_view: false, // We'll send page views manually
  })
}

// Initialize Google Tag Manager
export const initGTM = () => {
  if (!ENABLE_ANALYTICS || !GTM_ID) return

  // GTM script
  const script = document.createElement('script')
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `
  document.head.appendChild(script)

  // GTM noscript
  const noscript = document.createElement('noscript')
  noscript.innerHTML = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
  `
  document.body.insertBefore(noscript, document.body.firstChild)
}

// Analytics class
class Analytics {
  constructor() {
    this.initialized = false
    this.queue = []
  }

  init() {
    if (this.initialized) return
    
    initGA()
    initGTM()
    
    this.initialized = true
    
    // Process queued events
    this.queue.forEach(event => this.track(event.name, event.properties))
    this.queue = []
  }

  // Track page view
  pageView(page, title) {
    if (!ENABLE_ANALYTICS) return

    const payload = {
      page_path: page,
      page_title: title,
    }

    if (window.gtag) {
      window.gtag('event', 'page_view', payload)
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageView',
        ...payload,
      })
    }
  }

  // Track custom events
  track(eventName, properties = {}) {
    if (!ENABLE_ANALYTICS) return

    if (!this.initialized) {
      this.queue.push({ name: eventName, properties })
      return
    }

    if (window.gtag) {
      window.gtag('event', eventName, properties)
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...properties,
      })
    }

    // Log in development
    if (import.meta.env.DEV) {
      console.log('Analytics Event:', eventName, properties)
    }
  }

  // E-commerce tracking
  trackProduct(action, product) {
    if (!ENABLE_ANALYTICS) return

    const eventData = {
      currency: product.currency || 'BHD',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1,
      }],
    }

    switch (action) {
      case 'view':
        this.track('view_item', eventData)
        break
      case 'add_to_cart':
        this.track('add_to_cart', eventData)
        break
      case 'begin_checkout':
        this.track('begin_checkout', eventData)
        break
      case 'purchase':
        this.track('purchase', {
          ...eventData,
          transaction_id: product.transactionId,
        })
        break
    }
  }

  // User properties
  setUserProperties(properties) {
    if (!ENABLE_ANALYTICS) return

    if (window.gtag) {
      window.gtag('set', 'user_properties', properties)
    }
  }

  // Timing events
  trackTiming(category, variable, value) {
    if (!ENABLE_ANALYTICS) return

    this.track('timing_complete', {
      name: variable,
      value: Math.round(value),
      event_category: category,
    })
  }

  // Error tracking
  trackError(error, fatal = false) {
    if (!ENABLE_ANALYTICS) return

    this.track('exception', {
      description: error.message || error,
      fatal: fatal,
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
    })
  }
}

// Create singleton instance
export const analytics = new Analytics()

// Common event tracking functions
export const trackEvent = {
  // Navigation
  clickMenu: (item) => analytics.track('click_menu', { menu_item: item }),
  clickCTA: (button, location) => analytics.track('click_cta', { button_text: button, location }),
  
  // Product interactions
  viewProduct: (product) => analytics.trackProduct('view', product),
  customize3D: (productId, option) => analytics.track('customize_3d', { product_id: productId, option }),
  requestBrochure: (productId) => analytics.track('request_brochure', { product_id: productId }),
  requestTestDrive: (productId) => analytics.track('request_test_drive', { product_id: productId }),
  shareProduct: (productId, platform) => analytics.track('share', { product_id: productId, platform }),
  
  // Forms
  submitForm: (formName) => analytics.track('form_submit', { form_name: formName }),
  formError: (formName, error) => analytics.track('form_error', { form_name: formName, error }),
  
  // Contact
  clickPhone: (number) => analytics.track('click_phone', { phone_number: number }),
  clickEmail: (email) => analytics.track('click_email', { email_address: email }),
  
  // Video
  playVideo: (videoId) => analytics.track('video_play', { video_id: videoId }),
  
  // Scroll depth
  scrollDepth: (percentage) => analytics.track('scroll_depth', { depth: percentage }),
}

// Performance tracking
export const trackPerformance = () => {
  if (!ENABLE_ANALYTICS) return

  // Wait for page to fully load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0]
      
      if (perfData) {
        // Track page load time
        analytics.trackTiming('Page', 'Load', perfData.loadEventEnd - perfData.fetchStart)
        
        // Track other metrics
        analytics.track('web_vitals', {
          dns_lookup: Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
          tcp_connection: Math.round(perfData.connectEnd - perfData.connectStart),
          request_response: Math.round(perfData.responseEnd - perfData.requestStart),
          dom_interactive: Math.round(perfData.domInteractive - perfData.fetchStart),
          dom_complete: Math.round(perfData.domComplete - perfData.fetchStart),
        })
      }
    }, 0)
  })
}

export default analytics
