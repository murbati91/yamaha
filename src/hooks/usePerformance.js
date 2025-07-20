import { useEffect, useState } from 'react'

export function usePerformance() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0
  })

  useEffect(() => {
    // Measure page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
    
    // Get Web Vitals if available
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const fcp = entries.find(entry => entry.name === 'first-contentful-paint')
        if (fcp) {
          setMetrics(prev => ({ ...prev, firstContentfulPaint: fcp.startTime }))
        }
      })
      fcpObserver.observe({ entryTypes: ['paint'] })

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        setMetrics(prev => ({ ...prev, largestContentfulPaint: lastEntry.startTime }))
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        }
        setMetrics(prev => ({ ...prev, cumulativeLayoutShift: clsValue }))
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          setMetrics(prev => ({ ...prev, firstInputDelay: entry.processingStart - entry.startTime }))
        }
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      return () => {
        fcpObserver.disconnect()
        lcpObserver.disconnect()
        clsObserver.disconnect()
        fidObserver.disconnect()
      }
    }

    setMetrics(prev => ({ ...prev, loadTime }))
  }, [])

  return metrics
}

export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(!document.hidden)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return isVisible
}

export function useNetworkStatus() {
  const [networkStatus, setNetworkStatus] = useState({
    online: navigator.onLine,
    effectiveType: navigator.connection?.effectiveType || 'unknown',
    downlink: navigator.connection?.downlink || 0,
    rtt: navigator.connection?.rtt || 0
  })

  useEffect(() => {
    const updateNetworkStatus = () => {
      setNetworkStatus({
        online: navigator.onLine,
        effectiveType: navigator.connection?.effectiveType || 'unknown',
        downlink: navigator.connection?.downlink || 0,
        rtt: navigator.connection?.rtt || 0
      })
    }

    window.addEventListener('online', updateNetworkStatus)
    window.addEventListener('offline', updateNetworkStatus)
    navigator.connection?.addEventListener('change', updateNetworkStatus)

    return () => {
      window.removeEventListener('online', updateNetworkStatus)
      window.removeEventListener('offline', updateNetworkStatus)
      navigator.connection?.removeEventListener('change', updateNetworkStatus)
    }
  }, [])

  return networkStatus
}

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [ref, setRef] = useState(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    })

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, options])

  return [setRef, isIntersecting]
}

