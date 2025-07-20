import { useState, useEffect, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, ChevronDown, Play, ArrowRight, Eye, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { PageLoader, SectionLoader } from './components/LoadingSpinner'
import { HeroImage, ProductImage } from './components/OptimizedImage'
import { usePerformance, useNetworkStatus } from './hooks/usePerformance'
import { AccessibilityProvider, AccessibilityControls } from './components/AccessibilityProvider'
import './App.css'

// Lazy load heavy components for better performance
const ProductViewer3D = lazy(() => import('./components/ProductViewer3D'))
const ProductCustomizer = lazy(() => import('./components/ProductCustomizer'))

// Import assets
import yamahaLogo from './assets/images/yamaha-logo.png'
import yamahaRacingLogo from './assets/images/yamaha-racing-logo.png'
import yamahaR1Hero from './assets/images/yamaha-r1-hero.jpg'
import yamahaVmax from './assets/images/yamaha-vmax.jpg'
import racingTrackBg from './assets/images/racing-track-bg.jpg'

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeModel, setActiveModel] = useState('r1')
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [selectedMotorcycle, setSelectedMotorcycle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const performance = usePerformance()
  const networkStatus = useNetworkStatus()

  const motorcycles = [
    {
      id: 'r1',
      name: 'YZF-R1',
      tagline: 'Pure Racing DNA',
      image: yamahaR1Hero,
      specs: {
        engine: '998cc',
        power: '200hp',
        torque: '112.4 Nm',
        weight: '201kg'
      },
      price: 'Starting from BHD 8,500'
    },
    {
      id: 'vmax',
      name: 'VMAX',
      tagline: 'Maximum Power',
      image: yamahaVmax,
      specs: {
        engine: '1679cc',
        power: '200hp',
        torque: '167 Nm',
        weight: '310kg'
      },
      price: 'Starting from BHD 12,000'
    }
  ]

  const currentMotorcycle = motorcycles.find(m => m.id === activeModel)

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) setIsMenuOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const handleCustomize = (motorcycle) => {
    setSelectedMotorcycle(motorcycle)
    setShowCustomizer(true)
  }

  // Show loading screen
  if (isLoading) {
    return <PageLoader />
  }

  if (showCustomizer && selectedMotorcycle) {
    return (
      <Suspense fallback={<PageLoader />}>
        <ProductCustomizer 
          motorcycle={selectedMotorcycle}
          onClose={() => setShowCustomizer(false)}
        />
      </Suspense>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Performance indicator for development */}
      {import.meta.env.DEV && (
        <div className="fixed top-20 right-4 z-40 bg-black bg-opacity-80 text-white p-2 rounded text-xs no-print">
          <div>Load: {Math.round(performance.loadTime)}ms</div>
          <div>Network: {networkStatus.effectiveType}</div>
          <div>Online: {networkStatus.online ? '✓' : '✗'}</div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel racing-stripe" role="banner">
        <nav className="container mx-auto px-4 sm:px-6 py-4" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2 sm:space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src={yamahaLogo} alt="Yamaha Motor Company" className="h-6 sm:h-8 w-auto" />
              <span className="text-lg sm:text-xl font-bold text-white">BAHRAIN</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button 
                onClick={() => scrollToSection('models')}
                className="text-white hover:text-red-400 transition-colors text-sm lg:text-base"
                aria-label="View motorcycle models"
              >
                Models
              </button>
              <button 
                onClick={() => scrollToSection('experience')}
                className="text-white hover:text-red-400 transition-colors text-sm lg:text-base"
                aria-label="Explore 3D experience"
              >
                3D Experience
              </button>
              <button 
                onClick={() => scrollToSection('racing')}
                className="text-white hover:text-red-400 transition-colors text-sm lg:text-base"
                aria-label="Learn about racing heritage"
              >
                Racing
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-red-400 transition-colors text-sm lg:text-base"
                aria-label="Contact information"
              >
                Contact
              </button>
              <Button 
                className="btn-yamaha-secondary text-sm lg:text-base px-4 lg:px-6"
                aria-label="Book a test ride"
              >
                Book Test Ride
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setIsMenuOpen(!isMenuOpen)
              }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              id="mobile-menu"
              className="md:hidden mt-4 pb-4 border-t border-white/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              role="menu"
            >
              <div className="flex flex-col space-y-4 pt-4">
                <button 
                  onClick={() => scrollToSection('models')}
                  className="text-white hover:text-red-400 transition-colors py-2 w-full text-left"
                  role="menuitem"
                >
                  Models
                </button>
                <button 
                  onClick={() => scrollToSection('experience')}
                  className="text-white hover:text-red-400 transition-colors py-2 w-full text-left"
                  role="menuitem"
                >
                  3D Experience
                </button>
                <button 
                  onClick={() => scrollToSection('racing')}
                  className="text-white hover:text-red-400 transition-colors py-2 w-full text-left"
                  role="menuitem"
                >
                  Racing
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-white hover:text-red-400 transition-colors py-2 w-full text-left"
                  role="menuitem"
                >
                  Contact
                </button>
                <Button 
                  className="btn-yamaha-secondary w-full mt-4"
                  role="menuitem"
                  aria-label="Book a test ride"
                >
                  Book Test Ride
                </Button>
              </div>
            </motion.div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main id="main-content" tabIndex="-1">
        {/* Hero Section */}
        <section 
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${racingTrackBg})` }}
            role="img"
            aria-label="Racing track background"
          >
            <div className="absolute inset-0 hero-gradient"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              className="text-center lg:text-left order-2 lg:order-1"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-white">REV YOUR</span>
                <br />
                <span className="text-red-500">HEART</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Experience the ultimate fusion of power, precision, and passion with Yamaha's legendary motorcycles in Bahrain.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button 
                  onClick={() => scrollToSection('models')}
                  className="btn-yamaha-primary group w-full sm:w-auto"
                  aria-label="Explore motorcycle models"
                >
                  Explore Models
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
                <Button 
                  variant="outline" 
                  className="glass-panel text-white border-white/30 hover:bg-white/10 w-full sm:w-auto"
                  aria-label="Watch promotional video"
                >
                  <Play className="mr-2 h-4 w-4" aria-hidden="true" />
                  Watch Video
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Featured Motorcycle */}
            <motion.div 
              className="relative order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="relative">
                <HeroImage
                  src={currentMotorcycle.image}
                  alt={`${currentMotorcycle.name} motorcycle - ${currentMotorcycle.tagline}`}
                  className="w-full h-auto max-w-2xl mx-auto drop-shadow-2xl"
                />
                
                {/* Floating Specs Panel */}
                <motion.div 
                  className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 glass-panel p-3 sm:p-4 rounded-xl max-w-xs"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  role="region"
                  aria-labelledby="specs-heading"
                >
                  <h3 id="specs-heading" className="text-white font-bold text-base sm:text-lg mb-2">
                    {currentMotorcycle.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2" role="list">
                    {Object.entries(currentMotorcycle.specs).map(([key, value]) => (
                      <div key={key} className="spec-item" role="listitem">
                        <span className="spec-label text-xs sm:text-sm" aria-label={`${key}:`}>
                          {key}
                        </span>
                        <span className="spec-value text-xs sm:text-sm">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            role="button"
            tabIndex="0"
            aria-label="Scroll down to explore more content"
          >
            <div className="flex flex-col items-center text-white">
              <span className="text-xs sm:text-sm mb-2">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown size={20} className="sm:w-6 sm:h-6" aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 3D Experience Section */}
        <section 
          id="experience" 
          className="py-12 sm:py-20 bg-gradient-to-b from-background to-gray-900"
          aria-labelledby="experience-heading"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 id="experience-heading" className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
                <span className="text-white">IMMERSIVE</span>
                <br />
                <span className="text-red-500">3D EXPERIENCE</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                Explore every detail of our motorcycles in stunning 3D. Customize colors, add performance upgrades, and create your perfect ride.
              </p>
            </motion.div>

            {/* 3D Viewer */}
            <motion.div
              className="max-w-6xl mx-auto mb-8 sm:mb-12 motorcycle-viewer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              role="region"
              aria-label="3D motorcycle viewer"
            >
              <div className="p-4 sm:p-6">
                <Suspense fallback={<SectionLoader message="Loading 3D Experience..." />}>
                  <ProductViewer3D motorcycle={currentMotorcycle} className="rounded-xl" />
                </Suspense>
              </div>
            </motion.div>

            {/* Model Selector */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              role="group"
              aria-label="Select motorcycle model"
            >
              {motorcycles.map((motorcycle) => (
                <Button
                  key={motorcycle.id}
                  onClick={() => setActiveModel(motorcycle.id)}
                  className={`px-4 sm:px-6 py-3 rounded-lg transition-all text-sm sm:text-base ${
                    activeModel === motorcycle.id
                      ? 'btn-yamaha-primary'
                      : 'glass-panel text-white border-white/30 hover:bg-white/10'
                  }`}
                  aria-pressed={activeModel === motorcycle.id}
                  aria-label={`Select ${motorcycle.name} model`}
                >
                  {motorcycle.name}
                </Button>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                onClick={() => handleCustomize(currentMotorcycle)}
                className="btn-yamaha-secondary group w-full sm:w-auto"
                aria-label={`Customize ${currentMotorcycle.name} model`}
              >
                <Wrench className="mr-2 h-4 w-4" aria-hidden="true" />
                Customize This Model
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                className="glass-panel text-white border-white/30 hover:bg-white/10 w-full sm:w-auto"
                aria-label={`View ${currentMotorcycle.name} in augmented reality`}
              >
                <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
                View in AR
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Models Section */}
        <section 
          id="models" 
          className="py-12 sm:py-20 bg-gradient-to-b from-gray-900 to-background"
          aria-labelledby="models-heading"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 id="models-heading" className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
                <span className="text-white">CHOOSE YOUR</span>
                <br />
                <span className="text-red-500">LEGEND</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                From track-bred superbikes to muscle cruisers, discover the Yamaha that matches your passion.
              </p>
            </motion.div>

            {/* Model Cards */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto" role="list">
              {motorcycles.map((motorcycle, index) => (
                <motion.article
                  key={motorcycle.id}
                  className="product-card group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveModel(motorcycle.id)}
                  role="listitem"
                  tabIndex="0"
                  aria-labelledby={`motorcycle-${motorcycle.id}-title`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveModel(motorcycle.id)
                    }
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4 sm:mb-6">
                    <ProductImage
                      src={motorcycle.image}
                      alt={`${motorcycle.name} - ${motorcycle.tagline}`}
                      className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 id={`motorcycle-${motorcycle.id}-title`} className="text-xl sm:text-2xl font-bold text-white">
                        {motorcycle.name}
                      </h3>
                      <p className="text-red-400 text-sm sm:text-base">{motorcycle.tagline}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4" role="list" aria-label={`${motorcycle.name} specifications`}>
                      {Object.entries(motorcycle.specs).map(([key, value]) => (
                        <div key={key} className="spec-item" role="listitem">
                          <span className="spec-label capitalize text-xs sm:text-sm" aria-label={`${key}:`}>
                            {key}
                          </span>
                          <span className="spec-value text-xs sm:text-sm">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-white/10 gap-3">
                      <span className="text-base sm:text-lg font-semibold text-white" aria-label={`Price: ${motorcycle.price}`}>
                        {motorcycle.price}
                      </span>
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          variant="outline"
                          className="glass-panel text-white border-white/30 hover:bg-white/10 flex-1 sm:flex-none"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveModel(motorcycle.id)
                          }}
                          aria-label={`View ${motorcycle.name} in 3D`}
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" aria-hidden="true" />
                          View 3D
                        </Button>
                        <Button 
                          size="sm"
                          className="btn-yamaha-secondary flex-1 sm:flex-none"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCustomize(motorcycle)
                          }}
                          aria-label={`Customize ${motorcycle.name}`}
                        >
                          <Wrench className="w-3 h-3 sm:w-4 sm:h-4 mr-1" aria-hidden="true" />
                          Customize
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Racing Heritage Section */}
        <section 
          id="racing" 
          className="py-12 sm:py-20 carbon-fiber"
          aria-labelledby="racing-heading"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img src={yamahaRacingLogo} alt="Yamaha Factory Racing logo" className="h-12 sm:h-16 mb-6 sm:mb-8" />
                <h2 id="racing-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
                  BORN ON THE
                  <br />
                  <span className="text-red-500">RACETRACK</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
                  Every Yamaha motorcycle carries the DNA of our racing heritage. From MotoGP victories to World Superbike championships, our track experience translates directly to the street.
                </p>
                <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8" role="list" aria-label="Racing achievements">
                  <div className="text-center" role="listitem">
                    <div className="text-2xl sm:text-3xl font-bold text-red-500" aria-label="500 plus race wins">500+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Race Wins</div>
                  </div>
                  <div className="text-center" role="listitem">
                    <div className="text-2xl sm:text-3xl font-bold text-red-500" aria-label="50 plus championships">50+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Championships</div>
                  </div>
                  <div className="text-center" role="listitem">
                    <div className="text-2xl sm:text-3xl font-bold text-red-500" aria-label="70 years of racing">70</div>
                    <div className="text-xs sm:text-sm text-gray-400">Years Racing</div>
                  </div>
                </div>
                <Button 
                  className="btn-yamaha-primary w-full sm:w-auto"
                  aria-label="Learn more about Yamaha racing heritage"
                >
                  Explore Racing Heritage
                </Button>
              </motion.div>
              
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="glass-panel p-6 sm:p-8 rounded-xl">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Latest Racing News</h3>
                  <div className="space-y-4" role="list">
                    <article className="border-b border-white/10 pb-4" role="listitem">
                      <h4 className="text-white font-semibold text-sm sm:text-base">Yamaha Dominates MotoGP Season</h4>
                      <p className="text-gray-400 text-xs sm:text-sm">Championship-winning performance continues...</p>
                    </article>
                    <article className="border-b border-white/10 pb-4" role="listitem">
                      <h4 className="text-white font-semibold text-sm sm:text-base">New R1M Track Edition</h4>
                      <p className="text-gray-400 text-xs sm:text-sm">Limited edition with racing upgrades...</p>
                    </article>
                    <article role="listitem">
                      <h4 className="text-white font-semibold text-sm sm:text-base">Bahrain Track Day Events</h4>
                      <p className="text-gray-400 text-xs sm:text-sm">Join us at Bahrain International Circuit...</p>
                    </article>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          className="py-12 sm:py-20 bg-gradient-to-b from-background to-gray-900"
          aria-labelledby="contact-heading"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 id="contact-heading" className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
                <span className="text-white">GET IN</span>
                <br />
                <span className="text-red-500">TOUCH</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                Ready to experience the thrill? Visit our showroom, book a test ride, or get in touch with our experts.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6 sm:space-y-8"
              >
                <div className="glass-panel p-6 sm:p-8 rounded-xl">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Visit Our Showroom</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                      <div>
                        <h4 className="text-white font-semibold">Yamaha Bahrain Showroom</h4>
                        <p className="text-gray-300">Building 123, Road 456<br />Manama, Kingdom of Bahrain</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                      <div>
                        <h4 className="text-white font-semibold">Opening Hours</h4>
                        <p className="text-gray-300">Saturday - Thursday: 8:00 AM - 8:00 PM<br />Friday: 2:00 PM - 8:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                      <div>
                        <h4 className="text-white font-semibold">Contact Info</h4>
                        <p className="text-gray-300">
                          <a href="tel:+97312345678" className="hover:text-white transition-colors">+973 1234 5678</a><br />
                          <a href="mailto:info@yamaha-bahrain.com" className="hover:text-white transition-colors">info@yamaha-bahrain.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6 sm:p-8 rounded-xl">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button className="btn-yamaha-primary w-full">
                      Book Test Ride
                    </Button>
                    <Button variant="outline" className="glass-panel text-white border-white/30 hover:bg-white/10 w-full">
                      Schedule Service
                    </Button>
                    <Button variant="outline" className="glass-panel text-white border-white/30 hover:bg-white/10 w-full">
                      Get Quote
                    </Button>
                    <Button variant="outline" className="glass-panel text-white border-white/30 hover:bg-white/10 w-full">
                      Find Dealer
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="glass-panel p-6 sm:p-8 rounded-xl">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Send us a Message</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="+973 XXXX XXXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-2">
                        I'm interested in
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors"
                      >
                        <option value="">Select your interest</option>
                        <option value="test-ride">Test Ride</option>
                        <option value="purchase">Purchase</option>
                        <option value="service">Service</option>
                        <option value="parts">Parts & Accessories</option>
                        <option value="financing">Financing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors resize-vertical"
                        placeholder="Tell us more about your requirements..."
                      ></textarea>
                    </div>
                    <Button type="submit" className="btn-yamaha-primary w-full">
                      Send Message
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black py-8 sm:py-12" role="contentinfo">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1">
              <img src={yamahaLogo} alt="Yamaha Motor Company" className="h-6 sm:h-8 mb-3 sm:mb-4" />
              <p className="text-gray-400 text-sm sm:text-base">
                Revs Your Heart - Experience the passion of motorcycling with Yamaha Bahrain.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Models</h4>
              <nav aria-label="Motorcycle models">
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Sport Bikes</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cruisers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Adventure</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Scooters</a></li>
                </ul>
              </nav>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
              <nav aria-label="Services">
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Test Rides</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Service Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Parts & Accessories</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Financing</a></li>
                </ul>
              </nav>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
              <address className="space-y-2 text-gray-400 text-sm not-italic">
                <div>Manama, Bahrain</div>
                <div>
                  <a href="tel:+97312345678" className="hover:text-white transition-colors">
                    +973 1234 5678
                  </a>
                </div>
                <div>
                  <a href="mailto:info@yamaha-bahrain.com" className="hover:text-white transition-colors">
                    info@yamaha-bahrain.com
                  </a>
                </div>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Yamaha Bahrain. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Accessibility Controls */}
      <AccessibilityControls />
    </div>
  )
}

function App() {
  return (
    <AccessibilityProvider>
      <AppContent />
    </AccessibilityProvider>
  )
}

export default App

