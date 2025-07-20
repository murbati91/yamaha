import { createContext, useContext, useState, useEffect } from 'react'

const AccessibilityContext = createContext()

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider')
  }
  return context
}

export function AccessibilityProvider({ children }) {
  const [isHighContrast, setIsHighContrast] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [fontSize, setFontSize] = useState('normal')
  const [announcements, setAnnouncements] = useState([])

  // Check for user preferences
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    
    const handleChange = (e) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Apply accessibility settings
  useEffect(() => {
    const root = document.documentElement
    
    if (isHighContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    if (isReducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }
    
    root.setAttribute('data-font-size', fontSize)
  }, [isHighContrast, isReducedMotion, fontSize])

  const announce = (message, priority = 'polite') => {
    const id = Date.now()
    setAnnouncements(prev => [...prev, { id, message, priority }])
    
    // Remove announcement after it's been read
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(a => a.id !== id))
    }, 3000)
  }

  const skipToContent = () => {
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const value = {
    isHighContrast,
    setIsHighContrast,
    isReducedMotion,
    setIsReducedMotion,
    fontSize,
    setFontSize,
    announce,
    skipToContent
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      
      {/* Screen Reader Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcements
          .filter(a => a.priority === 'polite')
          .map(a => (
            <div key={a.id}>{a.message}</div>
          ))}
      </div>
      
      <div className="sr-only" aria-live="assertive" aria-atomic="true">
        {announcements
          .filter(a => a.priority === 'assertive')
          .map(a => (
            <div key={a.id}>{a.message}</div>
          ))}
      </div>
      
      {/* Skip to Content Link */}
      <button
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={skipToContent}
      >
        Skip to main content
      </button>
    </AccessibilityContext.Provider>
  )
}

// Accessibility utility components
export function VisuallyHidden({ children, ...props }) {
  return (
    <span className="sr-only" {...props}>
      {children}
    </span>
  )
}

export function FocusTrap({ children, active = true }) {
  useEffect(() => {
    if (!active) return

    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [active])

  return children
}

export function AccessibilityControls() {
  const {
    isHighContrast,
    setIsHighContrast,
    fontSize,
    setFontSize,
    announce
  } = useAccessibility()

  const handleContrastToggle = () => {
    setIsHighContrast(!isHighContrast)
    announce(
      isHighContrast ? 'High contrast disabled' : 'High contrast enabled',
      'polite'
    )
  }

  const handleFontSizeChange = (size) => {
    setFontSize(size)
    announce(`Font size changed to ${size}`, 'polite')
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black bg-opacity-80 text-white p-4 rounded-lg">
      <h3 className="text-sm font-semibold mb-2">Accessibility</h3>
      
      <div className="space-y-2">
        <button
          onClick={handleContrastToggle}
          className="block w-full text-left text-sm hover:text-blue-300 transition-colors"
          aria-pressed={isHighContrast}
        >
          {isHighContrast ? '✓' : '○'} High Contrast
        </button>
        
        <div>
          <span className="text-sm block mb-1">Font Size:</span>
          <div className="flex space-x-1">
            {['small', 'normal', 'large'].map((size) => (
              <button
                key={size}
                onClick={() => handleFontSizeChange(size)}
                className={`text-xs px-2 py-1 rounded ${
                  fontSize === size
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                }`}
                aria-pressed={fontSize === size}
              >
                {size[0].toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

