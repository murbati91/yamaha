import { useState, useEffect, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Play, ArrowRight, Eye, Wrench, Calculator, Images, Anchor, Layers, Ship, Sparkles, ChevronRight, Star, Globe, Shield, Award, Zap, TrendingUp, Users, BadgeCheck, Navigation } from 'lucide-react'
import './App.css'

// UI Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

// Import assets
import yamahaLogo from '@/assets/images/yamaha-logo.png'
import { assetCatalog } from '@/data/assetCatalog'

// Lazy load components
const BoatShowcase = lazy(() => import('@/components/BoatShowcase'))
const PremiumBoatConfigurator = lazy(() => import('@/components/PremiumBoatConfigurator'))
const FinanceCalculator = lazy(() => import('@/components/FinanceCalculator'))
const PremiumImageGallery = lazy(() => import('@/components/PremiumImageGallery'))
const BoatComparisonTool = lazy(() => import('@/components/BoatComparisonTool'))

// Navigation Component with modern design
function NavigationBar({ isScrolled }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-lg shadow-lg' 
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img src={yamahaLogo} alt="Yamaha" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <div className="text-white font-bold text-lg">YAMAHA</div>
              <div className="text-red-500 text-xs font-medium tracking-wider">BAHRAIN</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {['Products', 'Pearl Craft', 'Gallery', 'About', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-white/80 hover:text-white font-medium transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full" />
                </motion.a>
              ))}
            </nav>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-white">
                <Globe className="h-5 w-5" />
              </Button>
              <Button variant="gradient" className="shadow-lg">
                <Sparkles className="mr-2 h-4 w-4" />
                3D Configurator
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black/95 backdrop-blur-lg"
            >
              <div className="container mx-auto px-4 py-6 space-y-4">
                {['Products', 'Pearl Craft', 'Gallery', 'About', 'Contact'].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="block py-3 text-white/80 hover:text-white font-medium transition-colors"
                    whileHover={{ x: 10 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <Button variant="gradient" className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  3D Configurator
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

// Hero Section with modern parallax effect
function HeroSection({ featuredBoat, onConfiguratorOpen }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, #dc2626 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, #1e40af 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, #dc2626 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Animated particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{
              y: [null, -window.innerHeight],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear'
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <Badge variant="gradient" className="mb-4 animate-pulse">
              <Sparkles className="mr-1 h-3 w-3" />
              New 3D Experience
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-white">PEARL CRAFT</span>
              <br />
              <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                EXCELLENCE
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Experience the future of boat customization with our cutting-edge 3D configurator. 
              Design your dream vessel in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                size="lg" 
                variant="glow"
                onClick={() => onConfiguratorOpen(featuredBoat)}
                className="group"
              >
                <Wrench className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Launch 3D Configurator
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: Users, value: '1000+', label: 'Happy Customers' },
                { icon: Award, value: '30+', label: 'Years Experience' },
                { icon: Shield, value: '5', label: 'Military Contracts' }
              ].map(({ icon: Icon, value, label }) => (
                <motion.div
                  key={label}
                  className="text-center lg:text-left"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-2 justify-center lg:justify-start mb-1">
                    <Icon className="h-5 w-5 text-red-500" />
                    <span className="text-2xl font-bold text-white">{value}</span>
                  </div>
                  <p className="text-sm text-gray-400">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* 3D Preview */}
          <motion.div
            className="relative"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`
            }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={featuredBoat.images.main}
                alt={featuredBoat.name}
                className="w-full h-auto"
              />
              
              {/* Floating UI Elements */}
              <motion.div
                className="absolute top-4 right-4 bg-black/80 backdrop-blur-md rounded-lg p-3"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 text-white">
                  <Navigation className="h-5 w-5 text-red-500" />
                  <span className="font-bold">{featuredBoat.name}</span>
                </div>
                <p className="text-sm text-gray-300">{featuredBoat.category}</p>
              </motion.div>
              
              <motion.div
                className="absolute bottom-4 left-4 right-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-300">Starting from</p>
                        <p className="text-2xl font-bold text-white">
                          BHD {featuredBoat.price?.toLocaleString()}
                        </p>
                      </div>
                      <Button 
                        variant="gradient" 
                        size="sm"
                        onClick={() => onConfiguratorOpen(featuredBoat)}
                      >
                        Customize
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            {/* 3D Badge */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-white font-bold text-xl">3D</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-8 w-8 text-white/50" />
      </motion.div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Wrench,
      title: '3D Configurator',
      description: 'Customize every detail with our Midnight Express-style configurator',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Eye,
      title: '360° Views',
      description: 'See every angle with interactive 360-degree product views',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'See prices and specs update instantly as you customize',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Military Grade',
      description: 'Trusted by National Guard, US Navy, and Coast Guard',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      title: 'Performance',
      description: 'High-performance boats with speeds up to 61 knots',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: BadgeCheck,
      title: 'Quality Assured',
      description: '30+ years of excellence in boat manufacturing',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ]
  
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4 border-red-500/50 text-red-500">
            Features
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Experience the Future of
            <br />
            <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              Boat Shopping
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with premium craftsmanship
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-gray-700 transition-all group hover:shadow-2xl">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} p-2.5 mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Products Section with Tabs
function ProductsSection({ onBoatView, onCustomize, onFinance }) {
  const [activeCategory, setActiveCategory] = useState('pearlCraft')
  
  const categories = [
    { id: 'pearlCraft', name: 'Pearl Craft', icon: Ship },
    { id: 'boats', name: 'Sport Boats', icon: Anchor },
    { id: 'jetSkis', name: 'Jet Skis', icon: Navigation },
    { id: 'motorcycles', name: 'Motorcycles', icon: Zap },
  ]
  
  const currentProducts = assetCatalog[activeCategory] || []
  
  return (
    <section id="products" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4 border-blue-500/50 text-blue-500">
            Products
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Explore Our
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Premium Collection
            </span>
          </h2>
        </motion.div>
        
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="w-full max-w-2xl mx-auto mb-8 bg-gray-900/50 backdrop-blur-sm h-auto p-1">
            {categories.map(({ id, name, icon: Icon }) => (
              <TabsTrigger
                key={id}
                value={id}
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-blue-600 data-[state=active]:text-white py-3"
              >
                <Icon className="mr-2 h-4 w-4" />
                {name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-gray-700 transition-all group overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={product.images.main}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      {/* Overlay with Actions */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4 space-y-2">
                          <Button
                            variant="default"
                            className="w-full bg-white text-black hover:bg-gray-100"
                            onClick={() => onBoatView(product)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          {(activeCategory === 'pearlCraft' || activeCategory === 'boats') && (
                            <Button
                              variant="gradient"
                              className="w-full"
                              onClick={() => onCustomize(product)}
                            >
                              <Wrench className="mr-2 h-4 w-4" />
                              3D Configurator
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                        <Badge variant="default" className="bg-black/80 backdrop-blur-sm">
                          {product.category}
                        </Badge>
                        {(activeCategory === 'pearlCraft' || activeCategory === 'boats') && (
                          <Badge variant="gradient" className="animate-pulse">
                            3D
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        {product.name}
                        <Star className="h-5 w-5 text-yellow-500" />
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      {product.specs && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="text-sm">
                              <span className="text-gray-500">{key}:</span>
                              <span className="text-white ml-1 font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    
                    <CardFooter className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Starting from</p>
                        <p className="text-xl font-bold text-white">
                          {typeof product.price === 'number' 
                            ? `BHD ${product.price.toLocaleString()}`
                            : product.price
                          }
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-700 hover:bg-gray-800"
                        onClick={() => onFinance(product)}
                      >
                        <Calculator className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

// CTA Section
function CTASection({ onConfiguratorOpen }) {
  return (
    <section className="py-20 bg-gradient-to-r from-red-600 to-blue-600 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-white/5 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * 400,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * 400,
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear'
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Build Your Dream Boat?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Experience the future of boat customization with our revolutionary 3D configurator
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="default"
              className="bg-white text-black hover:bg-gray-100"
              onClick={() => onConfiguratorOpen(assetCatalog.pearlCraft[0])}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Launch Configurator
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Navigation className="mr-2 h-5 w-5" />
              Schedule Test Ride
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {['National Guard', 'US Navy', 'Coast Guard'].map((org) => (
              <div key={org} className="flex items-center gap-2 text-white/60">
                <Shield className="h-5 w-5" />
                <span className="font-medium">{org}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main App Component
function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedBoat, setSelectedBoat] = useState(null)
  const [showBoatShowcase, setShowBoatShowcase] = useState(false)
  const [showConfigurator, setShowConfigurator] = useState(false)
  const [showFinanceCalculator, setShowFinanceCalculator] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const featuredBoat = assetCatalog.pearlCraft[0]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const handleBoatView = (boat) => {
    setSelectedBoat(boat)
    setShowBoatShowcase(true)
  }

  const handleCustomize = (boat) => {
    setSelectedBoat(boat)
    setShowConfigurator(true)
  }

  const handleFinance = (boat) => {
    setSelectedBoat(boat)
    setShowFinanceCalculator(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div className="text-center">
          <motion.div
            className="w-20 h-20 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-white text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading Excellence...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <NavigationBar isScrolled={isScrolled} />
      
      <HeroSection 
        featuredBoat={featuredBoat}
        onConfiguratorOpen={handleCustomize}
      />
      
      <FeaturesSection />
      
      <ProductsSection
        onBoatView={handleBoatView}
        onCustomize={handleCustomize}
        onFinance={handleFinance}
      />
      
      <CTASection onConfiguratorOpen={handleCustomize} />
      
      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src={yamahaLogo} alt="Yamaha" className="h-8 mb-4" />
              <p className="text-gray-400 text-sm">
                Experience the perfect harmony of style and functionality. Sail with confidence!
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Pearl Craft Boats</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sport Boats</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Jet Skis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">3D Configurator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Finance Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Test Rides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Service Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Manama, Bahrain</li>
                <li><a href="tel:+97312345678" className="hover:text-white transition-colors">+973 1234 5678</a></li>
                <li><a href="mailto:marine@yamaha-bahrain.com" className="hover:text-white transition-colors">marine@yamaha-bahrain.com</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-900 text-center text-sm text-gray-400">
            <p>&copy; 2024 Yamaha Bahrain & Pearl Craft. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showBoatShowcase && selectedBoat && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <div className="text-white">Loading...</div>
          </div>
        }>
          <BoatShowcase
            boat={selectedBoat}
            onClose={() => {
              setShowBoatShowcase(false)
              setSelectedBoat(null)
            }}
          />
        </Suspense>
      )}

      {showConfigurator && selectedBoat && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <div className="text-white">Loading configurator...</div>
          </div>
        }>
          <PremiumBoatConfigurator
            boat={selectedBoat}
            onClose={() => {
              setShowConfigurator(false)
              setSelectedBoat(null)
            }}
          />
        </Suspense>
      )}

      {showFinanceCalculator && selectedBoat && (
        <Dialog open={showFinanceCalculator} onOpenChange={setShowFinanceCalculator}>
          <DialogContent className="max-w-4xl bg-gray-900 text-white border-gray-800">
            <DialogHeader>
              <DialogTitle>Finance Calculator</DialogTitle>
              <DialogDescription>
                Calculate your monthly payments for {selectedBoat.name}
              </DialogDescription>
            </DialogHeader>
            <Suspense fallback={<div className="text-white">Loading...</div>}>
              <FinanceCalculator
                productPrice={selectedBoat.price}
                productName={selectedBoat.name}
              />
            </Suspense>
          </DialogContent>
        </Dialog>
      )}

      {showGallery && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <div className="text-white">Loading gallery...</div>
          </div>
        }>
          <Dialog open={showGallery} onOpenChange={setShowGallery}>
            <DialogContent className="max-w-7xl h-[90vh] bg-gray-900 text-white border-gray-800">
              <DialogHeader>
                <DialogTitle>Gallery</DialogTitle>
              </DialogHeader>
              <PremiumImageGallery />
            </DialogContent>
          </Dialog>
        </Suspense>
      )}

      {showComparison && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <div className="text-white">Loading comparison tool...</div>
          </div>
        }>
          <BoatComparisonTool
            onClose={() => setShowComparison(false)}
            initialBoats={assetCatalog.pearlCraft.slice(0, 2)}
          />
        </Suspense>
      )}
    </div>
  )
}

export default App