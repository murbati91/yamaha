import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  lazy = true,
  quality = 85,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(!lazy)
  const [error, setError] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (!lazy) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [lazy])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
    setIsLoaded(true)
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} {...props}>
      {/* Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          {placeholder || (
            <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-600 rounded-full animate-spin" />
          )}
        </div>
      )}

      {/* Main Image */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ scale: 1.1 }}
          animate={{ scale: isLoaded ? 1 : 1.1 }}
          transition={{ duration: 0.6 }}
          loading={lazy ? 'lazy' : 'eager'}
        />
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function HeroImage({ src, alt, className = '' }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      lazy={false}
      quality={90}
      placeholder={
        <div className="w-full h-full bg-gradient-to-br from-blue-900 to-red-900 animate-pulse" />
      }
    />
  )
}

export function ProductImage({ src, alt, className = '' }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      lazy={true}
      quality={85}
      placeholder={
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-lg animate-pulse" />
            <div className="w-24 h-4 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      }
    />
  )
}

