// Currency formatting utility
export const formatCurrency = (amount, currency = 'BHD') => {
  const formatter = new Intl.NumberFormat('en-BH', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  })
  return formatter.format(amount)
}

// Date formatting
export const formatDate = (date, locale = 'en-BH') => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

// Number formatting with locale
export const formatNumber = (number, locale = 'en-BH') => {
  return new Intl.NumberFormat(locale).format(number)
}

// EMI Calculator
export const calculateEMI = (principal, rate, tenure) => {
  // Convert annual rate to monthly and percentage to decimal
  const monthlyRate = rate / 12 / 100
  const numberOfPayments = tenure * 12
  
  // EMI formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
              (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  
  const totalAmount = emi * numberOfPayments
  const totalInterest = totalAmount - principal
  
  return {
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest),
    principal,
  }
}

// Throttle function for performance
export const throttle = (func, delay) => {
  let timeoutId
  let lastExecTime = 0
  
  return function (...args) {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

// Debounce function
export const debounce = (func, delay) => {
  let timeoutId
  
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// Image optimization helper
export const getOptimizedImageUrl = (url, width, quality = 80) => {
  // In production, this would integrate with an image CDN
  // For now, return the original URL
  return url
}

// Smooth scroll to element
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId)
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }
}

// Check if element is in viewport
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Local storage helpers with error handling
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Error writing to localStorage:', error)
      return false
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing from localStorage:', error)
      return false
    }
  },
  
  clear: () => {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  },
}

// Performance monitoring
export const measurePerformance = (name, callback) => {
  const startTime = performance.now()
  const result = callback()
  const endTime = performance.now()
  const duration = endTime - startTime
  
  console.log(`${name} took ${duration.toFixed(2)}ms`)
  
  return result
}

// Device detection
export const device = {
  isMobile: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isTablet: () => /iPad|Android|Kindle/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent),
  isDesktop: () => !device.isMobile() && !device.isTablet(),
  isIOS: () => /iPad|iPhone|iPod/.test(navigator.userAgent),
  isAndroid: () => /Android/.test(navigator.userAgent),
}

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number (Bahrain format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+973)?[36]\d{7}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Class names helper
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}
