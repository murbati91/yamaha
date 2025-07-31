import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Maximize2, Minimize2, RotateCcw, Camera, Box, 
  Palette, Download, Share2, Eye, Loader2, ChevronLeft, ChevronRight 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { trackEvent } from '@/services/analytics'
import { getProductImages } from '@/data/assetCatalog'

// Load model-viewer as a web component
if (typeof window !== 'undefined' && !customElements.get('model-viewer')) {
  import('@google/model-viewer')
}

const EnhancedProductViewer = ({ product, onClose }) => {
  const viewerRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('3d') // '3d', 'gallery', '360'
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedColor, setSelectedColor] = useState('default')
  
  const productImages = getProductImages(product.id)
  const has3DModel = product.model3D
  const hasMultipleImages = productImages.length > 1

  // Color variants (example - would come from product data)
  const colorVariants = [
    { id: 'default', name: 'Original', hex: '#DC2626' },
    { id: 'blue', name: 'Racing Blue', hex: '#1E40AF' },
    { id: 'black', name: 'Stealth Black', hex: '#0A0A0A' },
    { id: 'white', name: 'Pearl White', hex: '#FFFFFF' }
  ]

  useEffect(() => {
    // Track viewer opened
    trackEvent.viewProduct(product)
    
    // Handle keyboard navigation
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') navigateImage('prev')
      if (e.key === 'ArrowRight') navigateImage('next')
      if (e.key === 'Escape' && isFullscreen) toggleFullscreen()
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentImageIndex, isFullscreen])

  const navigateImage = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? productImages.length - 1 : prev - 1
      )
    }
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      viewerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
    trackEvent.shareProduct(product.id, 'native')
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = productImages[currentImageIndex]
    link.download = `${product.name}-${currentImageIndex + 1}.jpg`
    link.click()
    trackEvent.track('download_product_image', { product_id: product.id })
  }

  const renderViewer = () => {
    switch (viewMode) {
      case '3d':
        return has3DModel ? (
          <model-viewer
            ref={viewerRef}
            src={product.model3D}
            alt={product.name}
            auto-rotate
            camera-controls
            ar
            ar-modes="webxr scene-viewer quick-look"
            environment-image="/hdri/studio.hdr"
            skybox-image="/hdri/studio.hdr"
            shadow-intensity="1"
            exposure="1"
            camera-orbit={`${rotation}deg 75deg ${zoom}m`}
            min-camera-orbit="auto auto 0.5m"
            max-camera-orbit="auto auto 3m"
            loading="eager"
            reveal="auto"
            onLoad={() => setLoading(false)}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#0A0A0A'
            }}
          >
            <button slot="ar-button" className="ar-button">
              View in Your Space
            </button>
            
            {/* Loading UI */}
            {loading && (
              <div slot="poster" className="flex items-center justify-center h-full bg-black">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
                  <p className="text-white">Loading 3D Model...</p>
                </div>
              </div>
            )}

            {/* Hotspots */}
            <button slot="hotspot-1" 
              data-position="0.5 0.5 0.5" 
              data-normal="0 1 0"
              className="hotspot"
            >
              <div className="annotation">
                {product.specs?.engine || 'Premium Engine'}
              </div>
            </button>
          </model-viewer>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-900">
            <div className="text-center">
              <Box className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">3D model not available</p>
              <Button 
                onClick={() => setViewMode('gallery')}
                className="mt-4 bg-red-600 hover:bg-red-700"
              >
                View Images
              </Button>
            </div>
          </div>
        )

      case 'gallery':
        return (
          <div className="relative h-full bg-black">
            <img
              src={productImages[currentImageIndex]}
              alt={`${product.name} view ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
              onLoad={() => setLoading(false)}
            />
            
            {/* Navigation */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
            
            {/* Thumbnails */}
            {hasMultipleImages && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-red-600 w-8' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )

      case '360':
        return (
          <div className="relative h-full bg-black">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <RotateCcw className="w-16 h-16 text-gray-600 mx-auto mb-4 animate-spin-slow" />
                <p className="text-gray-400">360° view coming soon</p>
                <p className="text-gray-500 text-sm mt-2">
                  Drag to rotate the product
                </p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
    >
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">{product.name}</h2>
              <p className="text-gray-400">{product.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="text-white hover:bg-white/10"
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                className="text-white hover:bg-white/10"
              >
                <Download className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/10"
              >
                {isFullscreen ? <Minimize2 /> : <Maximize2 />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                ×
              </Button>
            </div>
          </div>
        </div>

        {/* Main Viewer */}
        <div className="flex-1 relative">
          {renderViewer()}
        </div>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* View Mode Selector */}
            <div className="flex justify-center gap-2 mb-4">
              {has3DModel && (
                <Button
                  onClick={() => setViewMode('3d')}
                  variant={viewMode === '3d' ? 'default' : 'outline'}
                  className={viewMode === '3d' ? 'bg-red-600' : ''}
                >
                  <Box className="w-4 h-4 mr-2" />
                  3D Model
                </Button>
              )}
              <Button
                onClick={() => setViewMode('gallery')}
                variant={viewMode === 'gallery' ? 'default' : 'outline'}
                className={viewMode === 'gallery' ? 'bg-red-600' : ''}
              >
                <Camera className="w-4 h-4 mr-2" />
                Gallery
              </Button>
              <Button
                onClick={() => setViewMode('360')}
                variant={viewMode === '360' ? 'default' : 'outline'}
                className={viewMode === '360' ? 'bg-red-600' : ''}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                360°
              </Button>
            </div>

            {/* Color Selector */}
            {viewMode === '3d' && (
              <div className="flex items-center justify-center gap-4">
                <span className="text-white text-sm">Color:</span>
                <div className="flex gap-2">
                  {colorVariants.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color.id 
                          ? 'border-white scale-110' 
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 3D Controls */}
            {viewMode === '3d' && has3DModel && (
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div>
                  <label className="text-white text-sm">Rotation</label>
                  <Slider
                    value={[rotation]}
                    onValueChange={([value]) => setRotation(value)}
                    max={360}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-white text-sm">Zoom</label>
                  <Slider
                    value={[zoom]}
                    onValueChange={([value]) => setZoom(value)}
                    min={0.5}
                    max={3}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex justify-center gap-4">
              <Button 
                className="bg-red-600 hover:bg-red-700"
                onClick={() => trackEvent.requestTestDrive(product.id)}
              >
                Request Test Drive
              </Button>
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white/10"
                onClick={() => trackEvent.requestBrochure(product.id)}
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ar-button {
          background: #DC2626;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .ar-button:hover {
          background: #B91C1C;
          transform: translateX(-50%) scale(1.05);
        }
        .hotspot {
          display: block;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #DC2626;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          cursor: pointer;
          animation: pulse 2s infinite;
        }
        .annotation {
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-0.5rem);
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .hotspot:hover .annotation {
          opacity: 1;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </motion.div>
  )
}

export default EnhancedProductViewer
