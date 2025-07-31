import { useState, useEffect, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, ChevronDown, Play, ArrowRight, Eye, Wrench, Calculator, Images, Anchor, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageLoader, SectionLoader } from '@/components/LoadingSpinner'
import { HeroImage, ProductImage } from '@/components/OptimizedImage'
import { usePerformance, useNetworkStatus } from '@/hooks/usePerformance'
import { AccessibilityProvider, AccessibilityControls } from '@/components/AccessibilityProvider'
import SEO from '@/components/SEO'
import LiveChat from '@/components/LiveChat'
import FinanceCalculator from '@/components/FinanceCalculator'
import EnhancedProductViewer from '@/components/EnhancedProductViewer'
import PremiumImageGallery from '@/components/PremiumImageGallery'
import api from '@/services/api'
import analytics, { trackEvent, trackPerformance } from '@/services/analytics'
import { formatCurrency } from '@/utils/helpers'
import { assetCatalog, getAllProducts } from '@/data/assetCatalog'
import './App.css'

// Lazy load heavy components for better performance
const ProductViewer3D = lazy(() => import('@/components/ProductViewer3D'))
const ProductCustomizer = lazy(() => import('@/components/ProductCustomizer'))
const PearlCraft3DViewer = lazy(() => import('@/components/PearlCraft3DViewer'))
const BoatComparisonTool = lazy(() => import('@/components/BoatComparisonTool'))
const BoatCustomizer = lazy(() => import('@/components/BoatCustomizer'))
const ModelShowcase = lazy(() => import('@/components/ModelShowcase'))

// Import assets
import yamahaLogo from '@/assets/images/yamaha-logo.png'
import yamahaRacingLogo from '@/assets/images/yamaha-racing-logo.png'

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('jetSkis')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [showProductViewer, setShowProductViewer] = useState(false)
  const [showFinanceCalculator, setShowFinanceCalculator] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [showBoatComparison, setShowBoatComparison] = useState(false)
  const [showPearlCraft3D, setShowPearlCraft3D] = useState(false)
  const [showBoatCustomizer, setShowBoatCustomizer] = useState(false)
  const [showModelShowcase, setShowModelShowcase] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const performance = usePerformance()
  const networkStatus = useNetworkStatus()

  // Initialize analytics and load initial data
  useEffect(() => {
    // Initialize analytics
    analytics.init()
    trackPerformance()
    
    // Track page view
    analytics.pageView(window.location.pathname, document.title)
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  // Get current category products
  const getCurrentProducts = () => {
    return assetCatalog[activeCategory] || []
  }

  const currentProducts = getCurrentProducts()
  const featuredProduct = currentProducts[0] || assetCatalog.jetSkis[0]

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleProductView = (product) => {
    setSelectedProduct(product)
    // Use specialized viewer for Pearl Craft boats
    if (assetCatalog.pearlCraft.some(boat => boat.id === product.id)) {
      setShowPearlCraft3D(true)
    } else {
      setShowProductViewer(true)
    }
    trackEvent.viewProduct(product)
  }

  const handleCustomize = (product) => {
    setSelectedProduct(product)
    // Use boat customizer for boats and Pearl Craft
    if (assetCatalog.boats.some(boat => boat.id === product.id) || 
        assetCatalog.pearlCraft.some(boat => boat.id === product.id)) {
      setShowBoatCustomizer(true)
    } else {
      setShowCustomizer(true)
    }
    trackEvent.customize3D(product.id, 'start')
  }

  const handleFinanceCalculator = (product) => {
    setSelectedProduct(product)
    setShowFinanceCalculator(true)
    trackEvent.clickMenu('Finance Calculator')
  }

  // Show loading screen
  if (isLoading) {
    return <PageLoader />
  }

  // Show model showcase
  if (showModelShowcase) {
    return (
      <Suspense fallback={<PageLoader />}>
        <ModelShowcase />
        <Button
          className="fixed top-4 right-4 z-50 glass-panel"
          variant="ghost"
          onClick={() => setShowModelShowcase(false)}
        >
          <X className="w-6 h-6" />
        </Button>
      </Suspense>
    );
  }

  // Show gallery view
  if (showGallery) {
    return (
      <div className="min-h-screen bg-black">
        <div className="fixed top-0 left-0 right-0 z-50 glass-panel">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={yamahaLogo} alt="Yamaha" className="h-8" />
              <span className="text-xl font-bold text-white">Gallery</span>
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowGallery(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>
        <PremiumImageGallery />
      </div>
    )
  }

  // Show customizer
  if (showCustomizer && selectedProduct) {
    return (
      <Suspense fallback={<PageLoader />}>
        <ProductCustomizer 
          product={selectedProduct}
          onClose={() => setShowCustomizer(false)}
        />
      </Suspense>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* SEO Component */}
      <SEO 
        title="Yamaha Bahrain - Marine Products, Boats & Jet Skis | Official Dealer"
        description="Discover Yamaha's premium marine products in Bahrain. Official dealer for jet skis, boats, and marine accessories. Test rides and financing available."
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel racing-stripe">
        <nav className="container mx-auto px-4 sm:px-6 py-4">
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
                onClick={() => scrollToSection('products')}
                className="nav-link flex items-center"
              >
                <span className="flex items-center">
                  Products <ChevronDown className="w-4 h-4 ml-1" />
                </span>
              </button>
              <button 
                onClick={() => setShowModelShowcase(true)}
                className="nav-link flex items-center gap-2 text-red-400 font-semibold"
              >
                <Play className="w-4 h-4" />
                3D Showcase
              </button>
              <button 
                onClick={() => setShowGallery(true)}
                className="nav-link flex items-center gap-2"
              >
                <Images className="w-4 h-4" />
                Gallery
              </button>
              <button 
                onClick={() => setShowBoatComparison(true)}
                className="nav-link flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                Compare
              </button>
              <button 
                onClick={() => {
                  setShowFinanceCalculator(true)
                  trackEvent.clickMenu('Finance Calculator')
                }}
                className="nav-link flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Finance
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="nav-link"
              >
                Contact
              </button>
              <Button 
                className="btn-yamaha-secondary"
                onClick={() => trackEvent.clickCTA('Book Test Ride', 'header')}
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
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              className="md:hidden mt-4 pb-4 border-t border-white/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col space-y-4 pt-4">
                <button 
                  onClick={() => scrollToSection('products')}
                  className="text-white hover:text-red-400 transition-colors py-2 w-full text-left"
                >
                  Products
                </button>
                <button 
                  onClick={() => setShowModelShowcase(true)}
                  className="text-red-400 hover:text-red-300 transition-colors py-2 w-full text-left font-semibold"
                >
                  3D Showcase
                </button>
                <button 
                  onClick={() => setShowGallery(true)}
                  className="text-white hover:text-red-400 transition-colors py-2 w-full text-left"
                >
                  Gallery
                </button>
                <button 
                  onClick={() => setShowBoatComparison(true)}
                  className="text-white hover:text-red-400 transition-colors py-2 w-full text-left"
                >
                  Compare Boats
                </button>
                <button 
                  onClick={() => setShowFinanceCalculator(true)}
                  className="text-white hover:text-red-400 transition-colors py-2 w-full text-left"
                >
                  Finance Calculator
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-white hover:text-red-400 transition-colors py-2 w-full text-left"
                >
                  Contact
                </button>
                <Button className="btn-yamaha-secondary w-full mt-4">
                  Book Test Ride
                </Button>
              </div>
            </motion.div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <img 
              src="/images/heroes/by8i2921-scaled-1.jpg" 
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 hero-gradient"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-white">MAKE WAVES</span>
                <br />
                <span className="text-red-500">IN BAHRAIN</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Experience the ultimate marine adventure with Yamaha's premium jet skis, boats, and water sports equipment.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button 
                  onClick={() => scrollToSection('products')}
                  className="btn-yamaha-primary group"
                >
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  onClick={() => setShowGallery(true)}
                  variant="outline" 
                  className="glass-panel text-white border-white/30 hover:bg-white/10"
                >
                  <Images className="mr-2 h-4 w-4" />
                  View Gallery
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Featured Product */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="relative">
                <img
                  src={featuredProduct.images.main}
                  alt={featuredProduct.name}
                  className="w-full h-auto max-w-2xl mx-auto drop-shadow-2xl"
                />
                
                {/* Product Info Card */}
                <motion.div 
                  className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 glass-panel p-3 sm:p-4 rounded-xl max-w-xs"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">
                    {featuredProduct.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">
                    {featuredProduct.category}
                  </p>
                  {typeof featuredProduct.price === 'number' && (
                    <p className="text-red-500 font-bold">
                      {formatCurrency(featuredProduct.price)}
                    </p>
                  )}
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
          >
            <div className="flex flex-col items-center text-white">
              <span className="text-xs sm:text-sm mb-2">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown size={20} className="sm:w-6 sm:h-6" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-12 sm:py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
                <span className="text-white">OUR</span>
                <br />
                <span className="text-red-500">PRODUCTS</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                From high-performance jet skis to luxury boats, discover the perfect watercraft for your adventure.
              </p>
            </motion.div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {[
                { id: 'jetSkis', name: 'Jet Skis', icon: '🏍️' },
                { id: 'boats', name: 'Boats', icon: '🚤' },
                { id: 'pearlCraft', name: 'Pearl Craft', icon: '⛵' },
                { id: 'motorcycles', name: 'Motorcycles', icon: '🏍️' },
                { id: 'accessories', name: 'Accessories', icon: '🎯' }
              ].map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  className={activeCategory === category.id 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'text-white border-white/20 hover:bg-white/10'
                  }
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {currentProducts.map((product, index) => (
                <motion.article
                  key={product.id}
                  className="product-card group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => handleProductView(product)}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={product.images.main}
                      alt={product.name}
                      className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {product.name}
                      </h3>
                      <p className="text-red-400 text-sm sm:text-base">{product.category}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {product.specs && (
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                          <div key={key} className="spec-item">
                            <span className="spec-label capitalize text-xs sm:text-sm">
                              {key}
                            </span>
                            <span className="spec-value text-xs sm:text-sm">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-gray-300 text-sm">
                      {product.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-white/10 gap-3">
                      <span className="text-base sm:text-lg font-semibold text-white">
                        {typeof product.price === 'number' 
                          ? formatCurrency(product.price)
                          : product.price
                        }
                      </span>
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          variant="outline"
                          className="glass-panel text-white border-white/30 hover:bg-white/10"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleProductView(product)
                          }}
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          View
                        </Button>
                        {(activeCategory === 'boats' || activeCategory === 'pearlCraft') && (
                          <Button 
                            size="sm"
                            variant="outline"
                            className="glass-panel text-white border-white/30 hover:bg-white/10"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCustomize(product)
                            }}
                          >
                            <Wrench className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            Customize
                          </Button>
                        )}
                        <Button 
                          size="sm"
                          className="btn-yamaha-secondary"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleFinanceCalculator(product)
                          }}
                        >
                          <Calculator className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Finance
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Button
                onClick={() => setShowGallery(true)}
                className="btn-yamaha-primary"
                size="lg"
              >
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Pearl Craft Section */}
        <section className="py-12 sm:py-20 carbon-fiber">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                    <Anchor className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">PEARL CRAFT</h3>
                    <p className="text-gray-400">Bahrain's Premier Boat Manufacturer</p>
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
                  PEARL CRAFT
                  <br />
                  <span className="text-red-500">EXCELLENCE</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
                  Since 1992, Pearl Craft has been Bahrain's premier boat manufacturer, trusted by the National Guard, US Navy, and Coast Guard.
                </p>
                <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-red-500">30+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-red-500">1000+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Boats Built</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-red-500">5</div>
                    <div className="text-xs sm:text-sm text-gray-400">Military Contracts</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => {
                      setActiveCategory('pearlCraft')
                      scrollToSection('products')
                    }}
                    className="btn-yamaha-primary"
                  >
                    Explore Pearl Craft Boats
                  </Button>
                  <Button 
                    onClick={() => setShowBoatComparison(true)}
                    variant="outline"
                    className="glass-panel text-white border-white/30 hover:bg-white/10"
                  >
                    <Layers className="w-4 h-4 mr-2" />
                    Compare Models
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {assetCatalog.pearlCraft.slice(0, 4).map((boat, index) => (
                  <motion.div
                    key={boat.id}
                    className="glass-panel p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleProductView(boat)}
                  >
                    <img 
                      src={boat.images.main} 
                      alt={boat.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="text-white font-semibold">{boat.name}</h4>
                    <p className="text-gray-400 text-sm">{boat.category}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 sm:py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
                <span className="text-white">GET IN</span>
                <br />
                <span className="text-red-500">TOUCH</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Visit our showroom, book a test ride, or get expert advice on choosing your perfect watercraft.
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
                      <Anchor className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-semibold">Yamaha Marine Bahrain</h4>
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
                          <a href="mailto:marine@yamaha-bahrain.com" className="hover:text-white transition-colors">marine@yamaha-bahrain.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6 sm:p-8 rounded-xl">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      className="btn-yamaha-primary w-full"
                      onClick={() => trackEvent.clickCTA('Book Test Ride', 'contact')}
                    >
                      Book Test Ride
                    </Button>
                    <Button 
                      variant="outline" 
                      className="glass-panel text-white border-white/30 hover:bg-white/10 w-full"
                      onClick={() => trackEvent.clickCTA('Schedule Service', 'contact')}
                    >
                      Schedule Service
                    </Button>
                    <Button 
                      variant="outline" 
                      className="glass-panel text-white border-white/30 hover:bg-white/10 w-full"
                      onClick={() => trackEvent.requestBrochure('general')}
                    >
                      Get Brochure
                    </Button>
                    <Button 
                      variant="outline" 
                      className="glass-panel text-white border-white/30 hover:bg-white/10 w-full"
                      onClick={() => setShowFinanceCalculator(true)}
                    >
                      Calculate Finance
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
                  <form 
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                      trackEvent.submitForm('contact_form')
                    }}
                  >
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
                          required
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
                          required
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
                        required
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
                        required
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
                        required
                      >
                        <option value="">Select your interest</option>
                        <option value="jet-ski">Jet Ski Purchase</option>
                        <option value="boat">Boat Purchase</option>
                        <option value="test-ride">Test Ride</option>
                        <option value="service">Service & Maintenance</option>
                        <option value="parts">Parts & Accessories</option>
                        <option value="financing">Financing Options</option>
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
                    <Button 
                      type="submit" 
                      className="btn-yamaha-primary w-full"
                    >
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
      <footer className="bg-black py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1">
              <img src={yamahaLogo} alt="Yamaha Motor Company" className="h-6 sm:h-8 mb-3 sm:mb-4" />
              <p className="text-gray-400 text-sm sm:text-base">
                Making Waves - Experience the thrill of Yamaha marine products in Bahrain.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Products</h4>
              <nav>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Jet Skis</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Boats</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pearl Craft</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
                </ul>
              </nav>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
              <nav>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Test Rides</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Service Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Parts & Service</a></li>
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
                  <a href="mailto:marine@yamaha-bahrain.com" className="hover:text-white transition-colors">
                    marine@yamaha-bahrain.com
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

      {/* Modals */}
      {/* Enhanced Product Viewer */}
      {showProductViewer && selectedProduct && (
        <EnhancedProductViewer
          product={selectedProduct}
          onClose={() => setShowProductViewer(false)}
        />
      )}

      {/* Pearl Craft 3D Viewer */}
      {showPearlCraft3D && selectedProduct && (
        <Suspense fallback={<PageLoader />}>
          <PearlCraft3DViewer
            boat={selectedProduct}
            onClose={() => setShowPearlCraft3D(false)}
          />
        </Suspense>
      )}

      {/* Boat Comparison Tool */}
      {showBoatComparison && (
        <Suspense fallback={<PageLoader />}>
          <BoatComparisonTool
            onClose={() => setShowBoatComparison(false)}
            initialBoats={activeCategory === 'pearlCraft' ? assetCatalog.pearlCraft.slice(0, 2) : []}
          />
        </Suspense>
      )}

      {/* Boat Customizer */}
      {showBoatCustomizer && selectedProduct && (
        <Suspense fallback={<PageLoader />}>
          <BoatCustomizer
            boat={selectedProduct}
            onClose={() => setShowBoatCustomizer(false)}
          />
        </Suspense>
      )}

      {/* Finance Calculator Modal */}
      {showFinanceCalculator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowFinanceCalculator(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <FinanceCalculator 
              productPrice={selectedProduct?.price || 8500}
              productName={selectedProduct?.name || 'Yamaha Product'}
            />
          </motion.div>
        </div>
      )}

      {/* Accessibility Controls */}
      <AccessibilityControls />

      {/* Live Chat Widget */}
      <LiveChat />
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
