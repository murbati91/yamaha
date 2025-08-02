import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, Eye, Wrench, Calculator, Info, Share2 } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei'
import PremiumBoatConfigurator from './PremiumBoatConfigurator'
import FinanceCalculator from './FinanceCalculator'

// Import boat assets
import { assetCatalog } from '@/data/assetCatalog'

// 360 View Component
function Boat360View({ images, name }) {
  const [currentAngle, setCurrentAngle] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const angles = images.length
  
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentAngle((prev) => (prev + 1) % angles)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying, angles])
  
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden">
      <img
        src={images[currentAngle]}
        alt={`${name} - ${currentAngle * (360 / angles)}°`}
        className="w-full h-full object-contain"
      />
      
      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/80 backdrop-blur-sm rounded-full px-6 py-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-white hover:text-red-500 transition-colors"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        
        <div className="flex items-center gap-2">
          {[...Array(angles)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentAngle(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentAngle === i ? 'bg-red-500 w-8' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Angle Indicator */}
      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2">
        <p className="text-white text-sm font-mono">
          {Math.round(currentAngle * (360 / angles))}°
        </p>
      </div>
    </div>
  )
}

// Image Gallery Component
function ImageGallery({ images, name }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length)
  }
  
  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)
  }
  
  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative group">
          <img
            src={images[selectedIndex]}
            alt={`${name} - Image ${selectedIndex + 1}`}
            className="w-full h-96 object-cover rounded-xl cursor-pointer"
            onClick={() => setIsFullscreen(true)}
          />
          
          {/* Navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
        
        {/* Thumbnails */}
        <div className="grid grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-video overflow-hidden rounded-lg ${
                selectedIndex === index ? 'ring-2 ring-red-500' : ''
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform"
              />
            </button>
          ))}
        </div>
      </div>
      
      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <img
              src={images[selectedIndex]}
              alt={`${name} - Fullscreen`}
              className="max-w-full max-h-full object-contain"
            />
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
              className="absolute left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Specification Table Component
function SpecificationTable({ specs }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
      <div className="space-y-3">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="flex justify-between py-2 border-b border-gray-800">
            <span className="text-gray-400 capitalize">{key.replace(/_/g, ' ')}</span>
            <span className="text-white font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main Boat Showcase Component
export default function BoatShowcase({ boat, onClose }) {
  const [activeView, setActiveView] = useState('gallery')
  const [showConfigurator, setShowConfigurator] = useState(false)
  const [showFinance, setShowFinance] = useState(false)
  
  // Get all boat images
  const allImages = [
    boat.images.main,
    ...(boat.images.gallery || []),
    ...(boat.images['360'] || [])
  ].filter(Boolean)
  
  const has360View = boat.images['360'] && boat.images['360'].length > 0
  
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
        <div className="min-h-screen">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-6">
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  
                  <div>
                    <h1 className="text-2xl font-bold text-white">{boat.name}</h1>
                    <p className="text-gray-400">{boat.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowConfigurator(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Wrench className="w-5 h-5" />
                    Customize
                  </button>
                  
                  <button
                    onClick={() => setShowFinance(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Calculator className="w-5 h-5" />
                    Finance
                  </button>
                  
                  <button className="p-3 hover:bg-gray-800 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              
              {/* View Tabs */}
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveView('gallery')}
                  className={`py-3 border-b-2 transition-colors ${
                    activeView === 'gallery'
                      ? 'text-white border-red-500'
                      : 'text-gray-400 border-transparent hover:text-white'
                  }`}
                >
                  Gallery
                </button>
                
                {has360View && (
                  <button
                    onClick={() => setActiveView('360')}
                    className={`py-3 border-b-2 transition-colors ${
                      activeView === '360'
                        ? 'text-white border-red-500'
                        : 'text-gray-400 border-transparent hover:text-white'
                    }`}
                  >
                    360° View
                  </button>
                )}
                
                <button
                  onClick={() => setActiveView('specs')}
                  className={`py-3 border-b-2 transition-colors ${
                    activeView === 'specs'
                      ? 'text-white border-red-500'
                      : 'text-gray-400 border-transparent hover:text-white'
                  }`}
                >
                  Specifications
                </button>
                
                <button
                  onClick={() => setActiveView('features')}
                  className={`py-3 border-b-2 transition-colors ${
                    activeView === 'features'
                      ? 'text-white border-red-500'
                      : 'text-gray-400 border-transparent hover:text-white'
                  }`}
                >
                  Features
                </button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {activeView === 'gallery' && (
                  <ImageGallery images={allImages} name={boat.name} />
                )}
                
                {activeView === '360' && has360View && (
                  <Boat360View images={boat.images['360']} name={boat.name} />
                )}
                
                {activeView === 'specs' && (
                  <div className="space-y-6">
                    <SpecificationTable specs={boat.specs} />
                    
                    {boat.performance && (
                      <div className="bg-gray-900 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Performance</h3>
                        <div className="grid grid-cols-3 gap-6">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-red-500">
                              {boat.performance.topSpeed}
                            </p>
                            <p className="text-gray-400">Top Speed</p>
                          </div>
                          <div className="text-center">
                            <p className="text-3xl font-bold text-red-500">
                              {boat.performance.cruiseSpeed}
                            </p>
                            <p className="text-gray-400">Cruise Speed</p>
                          </div>
                          <div className="text-center">
                            <p className="text-3xl font-bold text-red-500">
                              {boat.performance.range}
                            </p>
                            <p className="text-gray-400">Range</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {activeView === 'features' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Standard Features</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {boat.features?.standard?.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-gray-300">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {boat.features?.optional && (
                      <div className="bg-gray-900 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Optional Features</h3>
                        <div className="space-y-3">
                          {boat.features.optional.map((feature, index) => (
                            <div key={index} className="flex items-start justify-between p-4 bg-gray-800 rounded-lg">
                              <div className="flex items-start gap-3">
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-white text-xs">+</span>
                                </div>
                                <div>
                                  <p className="text-white">{feature.name}</p>
                                  {feature.description && (
                                    <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
                                  )}
                                </div>
                              </div>
                              <p className="text-red-400 font-medium">+BHD {feature.price}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Price Card */}
                <div className="bg-gray-900 rounded-xl p-6 sticky top-24">
                  <div className="mb-6">
                    <p className="text-gray-400 mb-1">Starting from</p>
                    <p className="text-4xl font-bold text-white">
                      BHD {boat.price?.toLocaleString() || 'Contact Us'}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowConfigurator(true)}
                      className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Build & Price
                    </button>
                    
                    <button
                      onClick={() => setShowFinance(true)}
                      className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Calculate Finance
                    </button>
                    
                    <button className="w-full py-3 border border-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors">
                      Download Brochure
                    </button>
                    
                    <button className="w-full py-3 border border-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors">
                      Book Test Ride
                    </button>
                  </div>
                </div>
                
                {/* Contact Card */}
                <div className="bg-gray-900 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Need Help?</h3>
                  <div className="space-y-3">
                    <a href="tel:+97312345678" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                      <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                        📞
                      </div>
                      <div>
                        <p className="font-medium">Call Us</p>
                        <p className="text-sm text-gray-400">+973 1234 5678</p>
                      </div>
                    </a>
                    
                    <a href="mailto:marine@yamaha-bahrain.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                      <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                        ✉️
                      </div>
                      <div>
                        <p className="font-medium">Email Us</p>
                        <p className="text-sm text-gray-400">marine@yamaha-bahrain.com</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Configurator Modal */}
      {showConfigurator && (
        <Suspense fallback={<div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="text-white">Loading configurator...</div>
        </div>}>
          <PremiumBoatConfigurator
            boat={boat}
            onClose={() => setShowConfigurator(false)}
          />
        </Suspense>
      )}
      
      {/* Finance Modal */}
      {showFinance && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowFinance(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <FinanceCalculator
              productPrice={boat.price}
              productName={boat.name}
            />
          </div>
        </div>
      )}
    </>
  )
}