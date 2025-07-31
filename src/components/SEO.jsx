import { useEffect } from 'react'

const SEO = ({ 
  title = 'Yamaha Bahrain - Official Motorcycle Dealer',
  description = 'Discover Yamaha motorcycles in Bahrain. Official dealer for YZF-R1, VMAX, and more. Premium bikes, genuine parts, and expert service.',
  keywords = 'Yamaha Bahrain, motorcycles, YZF-R1, VMAX, bikes Bahrain, Yamaha dealer',
  image = '/og-image.jpg',
  type = 'website',
  author = 'Yamaha Bahrain',
}) => {
  const url = `https://yamaha-bahrain.com${window.location.pathname}`

  useEffect(() => {
    // Update document title
    document.title = title

    // Update meta tags
    const updateMetaTag = (property, content, isProperty = false) => {
      let meta = document.querySelector(
        isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`
      )
      
      if (!meta) {
        meta = document.createElement('meta')
        if (isProperty) {
          meta.setAttribute('property', property)
        } else {
          meta.setAttribute('name', property)
        }
        document.head.appendChild(meta)
      }
      
      meta.setAttribute('content', content)
    }

    // Basic meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', author)
    
    // Open Graph tags
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', image, true)
    updateMetaTag('og:url', url, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:site_name', 'Yamaha Bahrain', true)
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)
    updateMetaTag('twitter:site', '@YamahaBahrain')
    
    // Additional SEO tags
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('googlebot', 'index, follow')
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    updateMetaTag('theme-color', '#DC2626')
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
    
    // Language
    document.documentElement.setAttribute('lang', 'en')
    
  }, [title, description, keywords, image, url, type, author])

  // Structured data for organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Yamaha Bahrain',
    url: 'https://yamaha-bahrain.com',
    logo: 'https://yamaha-bahrain.com/yamaha-logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+973-1234-5678',
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic'],
    },
    sameAs: [
      'https://www.facebook.com/YamahaBahrain',
      'https://www.instagram.com/yamaha_bahrain',
      'https://twitter.com/YamahaBahrain',
    ],
  }

  // Product schema for product pages
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Yamaha YZF-R1',
    image: 'https://yamaha-bahrain.com/images/r1-hero.jpg',
    description: 'The Yamaha YZF-R1 is a supersport motorcycle with pure racing DNA.',
    brand: {
      '@type': 'Brand',
      name: 'Yamaha',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BHD',
      price: '8500',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Yamaha Bahrain',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {window.location.pathname.includes('/product') && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
    </>
  )
}

export default SEO
