import { useState, useEffect, useRef, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Share2, Camera, RotateCw, ZoomIn, ZoomOut, Palette, Settings, Package, Anchor, ChevronRight, Check, Sparkles } from 'lucide-react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Center, useGLTF, Stage, PresentationControls, Float } from '@react-three/drei'
import * as THREE from 'three'
import { ImprovedBoatModel } from './ImprovedBoatModel'

// UI Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

// Boat Model Component
function BoatModel({ colors, boatType = 'sport' }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  // Create boat geometry programmatically
  const boatGeometry = useRef()
  const hullMaterial = useRef()
  const deckMaterial = useRef()
  const seatMaterial = useRef()
  const accentMaterial = useRef()
  
  useEffect(() => {
    // Update materials with new colors
    if (hullMaterial.current) {
      hullMaterial.current.color = new THREE.Color(colors.hull)
    }
    if (deckMaterial.current) {
      deckMaterial.current.color = new THREE.Color(colors.deck)
    }
    if (seatMaterial.current) {
      seatMaterial.current.color = new THREE.Color(colors.seats)
    }
    if (accentMaterial.current) {
      accentMaterial.current.color = new THREE.Color(colors.accent)
    }
  }, [colors])
  
  // Animate rotation
  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y += 0.005
    }
  })
  
  return (
    <Float
      speed={1}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <group ref={meshRef}>
        {/* Hull */}
        <mesh 
          position={[0, 0, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[4, 0.8, 1.5]} />
          <meshStandardMaterial 
            ref={hullMaterial}
            color={colors.hull}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Hull Bottom */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[4, 0.1, 1.5]} />
          <meshStandardMaterial 
            color={colors.hullBottom}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
        
        {/* Deck */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[3.8, 0.1, 1.4]} />
          <meshStandardMaterial 
            ref={deckMaterial}
            color={colors.deck}
            metalness={0.3}
            roughness={0.6}
          />
        </mesh>
        
        {/* Console */}
        <mesh position={[1, 1, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial 
            color={colors.console}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
        
        {/* Seats */}
        <group>
          <mesh position={[0.5, 0.8, 0.4]}>
            <boxGeometry args={[0.6, 0.3, 0.4]} />
            <meshStandardMaterial 
              ref={seatMaterial}
              color={colors.seats}
              metalness={0.1}
              roughness={0.8}
            />
          </mesh>
          <mesh position={[0.5, 0.8, -0.4]}>
            <boxGeometry args={[0.6, 0.3, 0.4]} />
            <meshStandardMaterial 
              color={colors.seats}
              metalness={0.1}
              roughness={0.8}
            />
          </mesh>
          <mesh position={[-0.5, 0.8, 0]}>
            <boxGeometry args={[0.8, 0.3, 1]} />
            <meshStandardMaterial 
              color={colors.seats}
              metalness={0.1}
              roughness={0.8}
            />
          </mesh>
        </group>
        
        {/* Hardtop/T-top */}
        {colors.hardtop !== 'none' && (
          <group position={[0, 2, 0]}>
            {/* Posts */}
            <mesh position={[1.2, -0.5, 0.5]}>
              <cylinderGeometry args={[0.05, 0.05, 1]} />
              <meshStandardMaterial color={colors.hardtop} metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[1.2, -0.5, -0.5]}>
              <cylinderGeometry args={[0.05, 0.05, 1]} />
              <meshStandardMaterial color={colors.hardtop} metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-0.8, -0.5, 0.5]}>
              <cylinderGeometry args={[0.05, 0.05, 1]} />
              <meshStandardMaterial color={colors.hardtop} metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-0.8, -0.5, -0.5]}>
              <cylinderGeometry args={[0.05, 0.05, 1]} />
              <meshStandardMaterial color={colors.hardtop} metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Top */}
            <mesh>
              <boxGeometry args={[2.5, 0.1, 1.5]} />
              <meshStandardMaterial color={colors.hardtop} metalness={0.5} roughness={0.3} />
            </mesh>
          </group>
        )}
        
        {/* Motors */}
        <group position={[-2.2, 0, 0]}>
          {/* Motor 1 */}
          <mesh position={[0, -0.2, 0.4]}>
            <boxGeometry args={[0.4, 1, 0.3]} />
            <meshStandardMaterial 
              color={colors.motor}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {/* Motor 2 */}
          <mesh position={[0, -0.2, -0.4]}>
            <boxGeometry args={[0.4, 1, 0.3]} />
            <meshStandardMaterial 
              color={colors.motor}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {/* Motor accents */}
          <mesh position={[0, 0.3, 0.4]}>
            <boxGeometry args={[0.3, 0.1, 0.25]} />
            <meshStandardMaterial 
              color={colors.motorAccent}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[0, 0.3, -0.4]}>
            <boxGeometry args={[0.3, 0.1, 0.25]} />
            <meshStandardMaterial 
              color={colors.motorAccent}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>
        
        {/* Rub Rail */}
        <mesh position={[0, 0.3, 0]}>
          <torusGeometry args={[2, 0.05, 8, 50]} />
          <meshStandardMaterial 
            color={colors.rubRail}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
        
        {/* Accent details */}
        <group>
          <mesh position={[1.8, 0.2, 0]}>
            <boxGeometry args={[0.3, 0.05, 1.4]} />
            <meshStandardMaterial 
              ref={accentMaterial}
              color={colors.accent}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[-1.8, 0.2, 0]}>
            <boxGeometry args={[0.3, 0.05, 1.4]} />
            <meshStandardMaterial 
              color={colors.accent}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>
      </group>
    </Float>
  )
}

// 3D Scene Component
function Scene({ colors, boatType, modelPath }) {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(5, 3, 5)
    camera.lookAt(0, 0, 0)
  }, [camera])
  
  // Try to load actual 3D model if path provided
  const Model3D = () => {
    if (modelPath) {
      try {
        const { scene } = useGLTF(modelPath)
        return <primitive object={scene} scale={0.01} />
      } catch (error) {
        console.warn('3D model not found, using procedural model:', error)
        return <ImprovedBoatModel colors={colors} boatType={boatType} />
      }
    }
    return <ImprovedBoatModel colors={colors} boatType={boatType} />
  }
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={0.5} castShadow />
      
      <Suspense fallback={<ImprovedBoatModel colors={colors} boatType={boatType} />}>
        <Model3D />
      </Suspense>
      
      <ContactShadows 
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
        position={[0, -1.5, 0]}
      />
      
      <Environment preset="sunset" />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

// Color Option Component
function ColorOption({ color, name, selected, onClick, price }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative cursor-pointer rounded-lg overflow-hidden ${
        selected ? 'ring-4 ring-red-500 ring-offset-2 ring-offset-gray-900' : ''
      }`}
      onClick={onClick}
    >
      <div 
        className="w-20 h-20 shadow-lg"
        style={{ backgroundColor: color }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
        <p className="text-xs font-medium text-white">{name}</p>
        {price > 0 && (
          <p className="text-xs text-green-400">+BHD {price}</p>
        )}
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}
    </motion.div>
  )
}

// Main Configurator Component
export default function PremiumBoatConfigurator({ boat, onClose }) {
  const [activeTab, setActiveTab] = useState('exterior')
  const [colors, setColors] = useState({
    hull: '#FFFFFF',
    hullBottom: '#FFFFFF',
    deck: '#F5F5F5',
    seats: '#FFFFFF',
    console: '#1A1A1A',
    hardtop: '#FFFFFF',
    arch: '#C0C0C0',
    handles: '#C0C0C0',
    motor: '#1A1A1A',
    motorAccent: '#C0C0C0',
    electronics: '#000000',
    rubRail: '#1A1A1A',
    accent: '#DC2626'
  })
  
  const [totalPrice, setTotalPrice] = useState(boat?.price || 45000)
  const [showShareDialog, setShowShareDialog] = useState(false)
  
  // Color options with prices
  const colorOptions = {
    hull: [
      { name: 'Arctic White', color: '#FFFFFF', price: 0 },
      { name: 'Midnight Black', color: '#0A0A0A', price: 500 },
      { name: 'Ocean Blue', color: '#1E40AF', price: 800 },
      { name: 'Racing Red', color: '#DC2626', price: 800 },
      { name: 'Titanium Silver', color: '#C0C0C0', price: 1200 },
      { name: 'British Racing Green', color: '#004225', price: 1500 }
    ],
    deck: [
      { name: 'Arctic White', color: '#FFFFFF', price: 0 },
      { name: 'Light Gray', color: '#F5F5F5', price: 0 },
      { name: 'Teak Brown', color: '#8B4513', price: 2000 },
      { name: 'Carbon Fiber', color: '#1A1A1A', price: 3000 }
    ],
    seats: [
      { name: 'Arctic White', color: '#FFFFFF', price: 0 },
      { name: 'Black', color: '#000000', price: 0 },
      { name: 'Tan', color: '#D2691E', price: 500 },
      { name: 'Red Sport', color: '#8B0000', price: 800 }
    ],
    hardtop: [
      { name: 'None', color: 'none', price: 0 },
      { name: 'White Powder Coat', color: '#FFFFFF', price: 8000 },
      { name: 'Black Powder Coat', color: '#000000', price: 8500 },
      { name: 'Polished Aluminum', color: '#C0C0C0', price: 12000 }
    ],
    motor: [
      { name: 'Standard Black', color: '#000000', price: 0 },
      { name: 'White', color: '#FFFFFF', price: 1000 },
      { name: 'Custom Match', color: '#DC2626', price: 2000 }
    ],
    motorAccent: [
      { name: 'Chrome', color: '#C0C0C0', price: 0 },
      { name: 'Black', color: '#000000', price: 500 },
      { name: 'Gold', color: '#FFD700', price: 1500 }
    ],
    rubRail: [
      { name: 'Black', color: '#000000', price: 0 },
      { name: 'White', color: '#FFFFFF', price: 300 },
      { name: 'Stainless', color: '#C0C0C0', price: 1200 }
    ]
  }
  
  // Calculate total price
  useEffect(() => {
    let additionalCost = 0
    
    // Add costs for each customization
    Object.entries(colors).forEach(([key, value]) => {
      const options = colorOptions[key]
      if (options) {
        const selected = options.find(opt => opt.color === value)
        if (selected) {
          additionalCost += selected.price
        }
      }
    })
    
    setTotalPrice((boat?.price || 45000) + additionalCost)
  }, [colors, boat])
  
  const handleColorChange = (category, color) => {
    setColors(prev => ({
      ...prev,
      [category]: color
    }))
  }
  
  const handleShare = () => {
    // Generate shareable link with configuration
    const config = btoa(JSON.stringify(colors))
    const url = `${window.location.origin}/configure/${boat.id}?config=${config}`
    navigator.clipboard.writeText(url)
    setShowShareDialog(true)
  }
  
  const handleDownload = () => {
    // Download configuration as image
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const link = document.createElement('a')
      link.download = `${boat.name}-configuration.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }
  
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-gray-900 border-b border-gray-800">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <Badge variant="gradient" className="animate-pulse">
                  <Sparkles className="mr-1 h-3 w-3" />
                  3D Configurator
                </Badge>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {boat?.name || 'Boat'} Configurator
                  </h1>
                  <p className="text-gray-400">Build your perfect {boat?.category || 'boat'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleShare}
                  className="text-gray-400 hover:text-white"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDownload}
                  className="text-gray-400 hover:text-white"
                >
                  <Download className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 flex">
            {/* 3D Viewer */}
            <div className="flex-1 relative bg-gradient-to-br from-blue-900/20 to-gray-900">
              {/* Model Loading Info */}
              {!boat?.modelPath && (
                <div className="absolute top-4 right-4 z-10">
                  <Card className="bg-yellow-900/90 backdrop-blur border-yellow-800 max-w-xs">
                    <CardContent className="p-3">
                      <p className="text-yellow-200 text-sm">
                        <span className="font-semibold">Note:</span> Using procedural 3D model. 
                        For realistic models, add .glb files to /public/models/boats/
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              <Canvas shadows camera={{ position: [5, 3, 5], fov: 50 }}>
                <Suspense fallback={
                  <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="#DC2626" />
                  </mesh>
                }>
                  <Scene 
                    colors={colors} 
                    boatType={boat?.type} 
                    modelPath={boat?.modelPath || `/models/boats/${boat?.id}.glb`}
                  />
                </Suspense>
              </Canvas>
              
              {/* View Controls */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-gray-800/80 backdrop-blur border-gray-700 text-white hover:bg-gray-700"
                >
                  <RotateCw className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-gray-800/80 backdrop-blur border-gray-700 text-white hover:bg-gray-700"
                >
                  <ZoomIn className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-gray-800/80 backdrop-blur border-gray-700 text-white hover:bg-gray-700"
                >
                  <ZoomOut className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-gray-800/80 backdrop-blur border-gray-700 text-white hover:bg-gray-700"
                >
                  <Camera className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Price Display */}
              <motion.div 
                className="absolute top-4 left-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gray-900/90 backdrop-blur border-gray-800">
                  <CardContent className="p-4">
                    <p className="text-gray-400 text-sm">Total Price</p>
                    <p className="text-3xl font-bold text-white">
                      BHD {totalPrice.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            {/* Configuration Panel */}
            <div className="w-96 bg-gray-900 border-l border-gray-800 overflow-y-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full rounded-none bg-gray-800 h-14">
                  <TabsTrigger 
                    value="exterior" 
                    className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-blue-600"
                  >
                    <Palette className="mr-2 h-4 w-4" />
                    EXTERIOR
                  </TabsTrigger>
                  <TabsTrigger 
                    value="interior"
                    className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-blue-600"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    INTERIOR
                  </TabsTrigger>
                </TabsList>
                
                <div className="p-6">
                  <TabsContent value="exterior" className="space-y-8 mt-0">
                    {/* Hull Color */}
                    <div>
                      <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-red-500 rounded-full" />
                        HULL COLOR
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {colorOptions.hull.map((option) => (
                          <ColorOption
                            key={option.name}
                            {...option}
                            selected={colors.hull === option.color}
                            onClick={() => handleColorChange('hull', option.color)}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Hull Bottom Color */}
                    <div>
                      <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full" />
                        HULL BOTTOM COLOR
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {colorOptions.hull.map((option) => (
                          <ColorOption
                            key={option.name}
                            {...option}
                            selected={colors.hullBottom === option.color}
                            onClick={() => handleColorChange('hullBottom', option.color)}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Deck Color */}
                    <div>
                      <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-500 rounded-full" />
                        DECK COLOR
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {colorOptions.deck.map((option) => (
                          <ColorOption
                            key={option.name}
                            {...option}
                            selected={colors.deck === option.color}
                            onClick={() => handleColorChange('deck', option.color)}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Hardtop */}
                    <div>
                      <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full" />
                        HARDTOP ROOF
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {colorOptions.hardtop.map((option) => (
                          <ColorOption
                            key={option.name}
                            {...option}
                            selected={colors.hardtop === option.color}
                            onClick={() => handleColorChange('hardtop', option.color)}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Motor Color */}
                    <div>
                      <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full" />
                        MOTOR COLOR
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {colorOptions.motor.map((option) => (
                          <ColorOption
                            key={option.name}
                            {...option}
                            selected={colors.motor === option.color}
                            onClick={() => handleColorChange('motor', option.color)}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Motor Accent */}
                    <div>
                      <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-purple-500 rounded-full" />
                        MOTOR ACCENT COLOR
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {colorOptions.motorAccent.map((option) => (
                          <ColorOption
                            key={option.name}
                            {...option}
                            selected={colors.motorAccent === option.color}
                            onClick={() => handleColorChange('motorAccent', option.color)}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Rub Rail */}
                    <div>
                      <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-orange-500 rounded-full" />
                        RUB RAIL COLOR
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {colorOptions.rubRail.map((option) => (
                          <ColorOption
                            key={option.name}
                            {...option}
                            selected={colors.rubRail === option.color}
                            onClick={() => handleColorChange('rubRail', option.color)}
                          />
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="interior" className="space-y-8 mt-0">
                    {/* Seat Color */}
                    <div>
                      <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-red-500 rounded-full" />
                        SEAT COLOR
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {colorOptions.seats.map((option) => (
                          <ColorOption
                            key={option.name}
                            {...option}
                            selected={colors.seats === option.color}
                            onClick={() => handleColorChange('seats', option.color)}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Console Color */}
                    <div>
                      <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full" />
                        CONSOLE COLOR
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        <ColorOption
                          name="Black"
                          color="#000000"
                          price={0}
                          selected={colors.console === '#000000'}
                          onClick={() => handleColorChange('console', '#000000')}
                        />
                        <ColorOption
                          name="White"
                          color="#FFFFFF"
                          price={500}
                          selected={colors.console === '#FFFFFF'}
                          onClick={() => handleColorChange('console', '#FFFFFF')}
                        />
                        <ColorOption
                          name="Carbon"
                          color="#1A1A1A"
                          price={2000}
                          selected={colors.console === '#1A1A1A'}
                          onClick={() => handleColorChange('console', '#1A1A1A')}
                        />
                      </div>
                    </div>
                    
                    {/* Electronics */}
                    <div>
                      <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full" />
                        ELECTRONICS PACKAGE
                      </h3>
                      <div className="space-y-3">
                        <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <input type="radio" name="electronics" className="mt-1" defaultChecked />
                              <div className="flex-1">
                                <p className="text-white font-medium">Standard Package</p>
                                <p className="text-gray-400 text-sm">12" Garmin display, VHF radio</p>
                                <p className="text-green-400 text-sm mt-1">Included</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <input type="radio" name="electronics" />
                              <div className="flex-1">
                                <p className="text-white font-medium">Premium Package</p>
                                <p className="text-gray-400 text-sm">16" Garmin display, radar, autopilot</p>
                                <p className="text-red-400 text-sm mt-1">+BHD 12,000</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <input type="radio" name="electronics" />
                              <div className="flex-1">
                                <p className="text-white font-medium">Ultimate Package</p>
                                <p className="text-gray-400 text-sm">Dual 16" displays, full Garmin suite</p>
                                <p className="text-red-400 text-sm mt-1">+BHD 25,000</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
              
              {/* Action Buttons */}
              <div className="p-6 border-t border-gray-800">
                <Button 
                  size="lg"
                  variant="gradient"
                  className="w-full mb-3"
                >
                  PROCEED TO CHECKOUT
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full border-gray-700 text-white hover:bg-gray-800"
                >
                  SAVE CONFIGURATION
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>Configuration Shared!</DialogTitle>
            <DialogDescription className="text-gray-400">
              Your boat configuration link has been copied to clipboard. Share it with friends or save it for later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowShareDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}