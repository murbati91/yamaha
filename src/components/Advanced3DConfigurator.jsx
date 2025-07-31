import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows,
  Html,
  Center,
  useGLTF,
  Stage,
  Backdrop,
  Lightformer,
  Loader,
  useProgress,
  PerspectiveCamera,
  Float
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { 
  X, Palette, Settings, Camera, Download, Share2, 
  Maximize2, Play, Pause, Info, ShoppingCart,
  RotateCw, Box, Image, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/helpers';

// 3D Model Loader Component
const Model3D = ({ modelPath, color, scale = 1, position = [0, 0, 0] }) => {
  const { scene, nodes, materials } = useGLTF(modelPath);
  const modelRef = useRef();
  
  // Apply color to model
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          // Apply custom color to specific parts
          if (child.material && child.name.toLowerCase().includes('hull')) {
            child.material = new THREE.MeshStandardMaterial({
              color: new THREE.Color(color),
              metalness: 0.8,
              roughness: 0.2,
            });
          }
        }
      });
    }
  }, [scene, color]);
  
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.1;
    }
  });
  
  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={scale} 
      position={position}
      castShadow
      receiveShadow
    />
  );
};

// Fallback component when no 3D model is available
const Placeholder3D = ({ product, primaryColor, accentColor }) => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={meshRef}>
        {/* Product image on a 3D card */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4, 3, 0.1]} />
          <meshStandardMaterial color={primaryColor} metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Product image texture */}
        <Html
          position={[0, 0, 0.06]}
          transform
          occlude
          style={{
            width: '380px',
            height: '280px',
          }}
        >
          <img 
            src={product.images?.main || '/images/placeholder.jpg'} 
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
        </Html>
        
        {/* Accent stripe */}
        <mesh position={[0, -1.4, 0.06]} castShadow>
          <boxGeometry args={[4, 0.2, 0.02]} />
          <meshStandardMaterial 
            color={accentColor} 
            metalness={0.9} 
            roughness={0.1}
            emissive={accentColor}
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Loading component
const LoadingScreen = () => {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-red-500 animate-spin mb-4" />
        <div className="text-white text-xl font-semibold mb-2">Loading 3D Model</div>
        <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-gray-400 text-sm mt-2">{Math.round(progress)}%</div>
      </div>
    </Html>
  );
};

const Advanced3DConfigurator = ({ product, onClose }) => {
  const [currentView, setCurrentView] = useState('configurator');
  const [viewMode, setViewMode] = useState('3d'); // '3d', 'image', 'ar'
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({
    primaryColor: '#FFFFFF',
    deckColor: '#FFFFFF',
    seatColor: '#FFFFFF',
    accentColor: '#DC2626',
    engine: 'standard',
    accessories: {},
    packages: []
  });
  const [totalPrice, setTotalPrice] = useState(product.price || 0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef();

  // Check if product has 3D model
  const has3DModel = product.modelPath || product.model3d;
  
  const isBoat = product.category?.toLowerCase().includes('boat') || 
                 product.category?.toLowerCase().includes('craft');
  const isMotorcycle = product.category?.toLowerCase().includes('bike') || 
                       product.category?.toLowerCase().includes('cycle') ||
                       product.category?.toLowerCase().includes('sport');

  // Configuration options
  const configOptions = {
    colors: {
      hull: [
        { id: 'white', name: 'Arctic White', hex: '#FFFFFF', price: 0 },
        { id: 'black', name: 'Midnight Black', hex: '#0A0A0A', price: 500 },
        { id: 'blue', name: 'Ocean Blue', hex: '#1E40AF', price: 800 },
        { id: 'red', name: 'Racing Red', hex: '#DC2626', price: 800 },
        { id: 'silver', name: 'Titanium Silver', hex: '#9CA3AF', price: 1200 },
        { id: 'green', name: 'British Racing Green', hex: '#14532D', price: 1500 }
      ],
      deck: [
        { id: 'white', name: 'White', hex: '#FFFFFF', price: 0 },
        { id: 'gray', name: 'Gray', hex: '#6B7280', price: 200 },
        { id: 'beige', name: 'Beige', hex: '#D4B896', price: 300 },
        { id: 'teak', name: 'Teak Brown', hex: '#8B4513', price: 500 }
      ],
      seats: [
        { id: 'white', name: 'White Leather', hex: '#FFFFFF', price: 0 },
        { id: 'black', name: 'Black Leather', hex: '#1F1F1F', price: 200 },
        { id: 'tan', name: 'Tan Leather', hex: '#D2691E', price: 300 },
        { id: 'red', name: 'Red Sport', hex: '#DC2626', price: 400 }
      ],
      accent: [
        { id: 'red', name: 'Yamaha Red', hex: '#DC2626', price: 0 },
        { id: 'blue', name: 'Yamaha Blue', hex: '#1E40AF', price: 200 },
        { id: 'carbon', name: 'Carbon Fiber', hex: '#1F1F1F', price: 1500 },
        { id: 'gold', name: 'Championship Gold', hex: '#FFD700', price: 2000 }
      ]
    },
    engines: isBoat ? [
      { id: 'standard', name: 'Standard Twin 250HP', price: 0 },
      { id: 'upgrade1', name: 'Twin 300HP Performance', price: 12000 },
      { id: 'upgrade2', name: 'Twin 350HP Racing', price: 25000 },
      { id: 'quad', name: 'Quad 300HP Extreme', price: 65000 }
    ] : [
      { id: 'standard', name: 'Standard Configuration', price: 0 },
      { id: 'performance', name: 'Performance Kit', price: 2500 },
      { id: 'racing', name: 'Racing Edition', price: 5000 }
    ],
    packages: isBoat ? [
      { id: 'luxury', name: 'Luxury Package', price: 15000, items: ['Premium Seating', 'JL Audio', 'LED Lighting'] },
      { id: 'fishing', name: 'Fishing Package', price: 8000, items: ['Fish Finder', 'Rod Holders', 'Live Well'] },
      { id: 'watersport', name: 'Water Sports Package', price: 12000, items: ['Wake Tower', 'Ballast System', 'Board Racks'] }
    ] : [
      { id: 'touring', name: 'Touring Package', price: 3000, items: ['Panniers', 'Comfort Seat', 'GPS Mount'] },
      { id: 'track', name: 'Track Package', price: 4500, items: ['Quick Shifter', 'Rearsets', 'Track Fairings'] },
      { id: 'carbon', name: 'Carbon Package', price: 8000, items: ['Carbon Wheels', 'Carbon Bodywork', 'Titanium Exhaust'] }
    ]
  };

  // Calculate total price
  useEffect(() => {
    let basePrice = typeof product.price === 'number' ? product.price : 50000;
    
    const primaryColor = configOptions.colors.hull.find(c => c.hex === selectedOptions.primaryColor);
    if (primaryColor) basePrice += primaryColor.price;
    
    if (isBoat) {
      const deckColor = configOptions.colors.deck.find(c => c.hex === selectedOptions.deckColor);
      if (deckColor) basePrice += deckColor.price;
      
      const seatColor = configOptions.colors.seats.find(c => c.hex === selectedOptions.seatColor);
      if (seatColor) basePrice += seatColor.price;
    }
    
    const accentColor = configOptions.colors.accent.find(c => c.hex === selectedOptions.accentColor);
    if (accentColor) basePrice += accentColor.price;
    
    const engine = configOptions.engines.find(e => e.id === selectedOptions.engine);
    if (engine) basePrice += engine.price;
    
    selectedOptions.packages.forEach(pkgId => {
      const pkg = configOptions.packages.find(p => p.id === pkgId);
      if (pkg) basePrice += pkg.price;
    });
    
    setTotalPrice(basePrice);
  }, [selectedOptions, product.price, isBoat]);

  const togglePackage = (pkgId) => {
    setSelectedOptions(prev => ({
      ...prev,
      packages: prev.packages.includes(pkgId)
        ? prev.packages.filter(p => p !== pkgId)
        : [...prev.packages, pkgId]
    }));
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleShare = () => {
    const config = btoa(JSON.stringify(selectedOptions));
    const url = `${window.location.origin}/configure/${product.id}?config=${config}`;
    navigator.clipboard.writeText(url);
    alert('Configuration link copied to clipboard!');
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={viewerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 via-black to-gray-900"
      >
        <div className="relative w-full h-full">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src="/images/logos/yamaha-logo.png" alt="Yamaha" className="h-8" />
                  <div>
                    <h2 className="text-xl font-bold text-white">{product.name} Configurator</h2>
                    <p className="text-sm text-gray-400">
                      {has3DModel ? '3D Model' : 'Product Visualization'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* View Mode Toggle */}
                  <div className="flex gap-1 bg-black/50 rounded-lg p-1">
                    <Button
                      size="sm"
                      variant={viewMode === '3d' ? 'default' : 'ghost'}
                      className={viewMode === '3d' ? 'bg-red-600 text-white' : 'text-white hover:bg-white/10'}
                      onClick={() => setViewMode('3d')}
                    >
                      <Box className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === 'image' ? 'default' : 'ghost'}
                      className={viewMode === 'image' ? 'bg-red-600 text-white' : 'text-white hover:bg-white/10'}
                      onClick={() => setViewMode('image')}
                    >
                      <Image className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                    onClick={() => setAutoRotate(!autoRotate)}
                  >
                    {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                    onClick={handleFullscreen}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                    onClick={onClose}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex h-full">
            {/* 3D/Image Viewer */}
            <div className="flex-1 relative bg-gradient-to-br from-gray-900 to-black">
              {viewMode === '3d' ? (
                <Canvas
                  shadows
                  camera={{ position: [8, 4, 8], fov: 45 }}
                  className="w-full h-full"
                >
                  <Suspense fallback={<LoadingScreen />}>
                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <spotLight
                      position={[10, 10, 10]}
                      angle={0.3}
                      penumbra={1}
                      intensity={1}
                      castShadow
                      shadow-mapSize={[2048, 2048]}
                    />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />
                    
                    {/* Environment */}
                    <Environment preset="studio" />
                    
                    {/* 3D Model or Placeholder */}
                    <Center>
                      {has3DModel ? (
                        <Model3D 
                          modelPath={product.modelPath || `/models/${product.id}.glb`}
                          color={selectedOptions.primaryColor}
                        />
                      ) : (
                        <Placeholder3D
                          product={product}
                          primaryColor={selectedOptions.primaryColor}
                          accentColor={selectedOptions.accentColor}
                        />
                      )}
                    </Center>
                    
                    {/* Controls */}
                    <OrbitControls
                      enablePan={false}
                      enableZoom={true}
                      enableRotate={true}
                      autoRotate={autoRotate}
                      autoRotateSpeed={1}
                      maxPolarAngle={Math.PI / 2}
                      minPolarAngle={Math.PI / 4}
                      minDistance={5}
                      maxDistance={20}
                    />
                    
                    {/* Floor */}
                    <ContactShadows
                      position={[0, -2, 0]}
                      opacity={0.5}
                      scale={20}
                      blur={2}
                      far={10}
                      color="#000000"
                    />
                  </Suspense>
                </Canvas>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8">
                  <div className="max-w-4xl">
                    <img 
                      src={product.images?.main} 
                      alt={product.name}
                      className="w-full h-auto object-contain rounded-lg shadow-2xl"
                    />
                    {product.images?.angles && (
                      <div className="flex gap-4 mt-4 justify-center">
                        {product.images.angles.map((img, idx) => (
                          <img 
                            key={idx}
                            src={img} 
                            alt={`${product.name} angle ${idx + 1}`}
                            className="w-24 h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* 3D Model Info */}
              {viewMode === '3d' && !has3DModel && (
                <div className="absolute bottom-8 left-8 glass-panel rounded-lg p-4 max-w-md">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold mb-1">3D Model Not Available</p>
                      <p className="text-gray-400 text-sm">
                        We're working on adding a 3D model for this product. In the meantime, enjoy the product visualization.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Loading Progress */}
              <Loader />
            </div>

            {/* Configuration Panel */}
            <div className="w-96 bg-black/90 backdrop-blur-xl p-6 overflow-y-auto">
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <Button
                  size="sm"
                  variant={currentView === 'configurator' ? 'default' : 'outline'}
                  className={currentView === 'configurator' 
                    ? 'bg-red-600 hover:bg-red-700 flex-1' 
                    : 'text-white border-white/20 hover:bg-white/10 flex-1'
                  }
                  onClick={() => setCurrentView('configurator')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
                <Button
                  size="sm"
                  variant={currentView === 'summary' ? 'default' : 'outline'}
                  className={currentView === 'summary' 
                    ? 'bg-red-600 hover:bg-red-700 flex-1' 
                    : 'text-white border-white/20 hover:bg-white/10 flex-1'
                  }
                  onClick={() => setCurrentView('summary')}
                >
                  <Info className="w-4 h-4 mr-2" />
                  Summary
                </Button>
              </div>

              {currentView === 'configurator' ? (
                <div className="space-y-6">
                  {/* Hull Color (for boats) or Primary Color (for others) */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Palette className="w-5 h-5 text-red-500" />
                      {isBoat ? 'Hull Color' : 'Primary Color'}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {(isBoat ? configOptions.colors.hull : configOptions.colors.hull).map((color) => (
                        <button
                          key={color.id}
                          className={`relative group ${
                            selectedOptions.primaryColor === color.hex ? 'ring-2 ring-red-500' : ''
                          }`}
                          onClick={() => setSelectedOptions(prev => ({ ...prev, primaryColor: color.hex }))}
                        >
                          <div 
                            className="w-full h-20 rounded-lg border-2 border-white/20 transition-all group-hover:scale-105"
                            style={{ backgroundColor: color.hex }}
                          />
                          <p className="text-xs text-gray-300 mt-2">{color.name}</p>
                          {color.price > 0 && (
                            <p className="text-xs text-red-400">+{formatCurrency(color.price)}</p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Deck Color (boats only) */}
                  {isBoat && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Deck Color</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {configOptions.colors.deck.map((color) => (
                          <button
                            key={color.id}
                            className={`relative group ${
                              selectedOptions.deckColor === color.hex ? 'ring-2 ring-red-500' : ''
                            }`}
                            onClick={() => setSelectedOptions(prev => ({ ...prev, deckColor: color.hex }))}
                          >
                            <div 
                              className="w-full h-16 rounded-lg border-2 border-white/20 transition-all group-hover:scale-105"
                              style={{ backgroundColor: color.hex }}
                            />
                            <p className="text-xs text-gray-300 mt-2">{color.name}</p>
                            {color.price > 0 && (
                              <p className="text-xs text-red-400">+{formatCurrency(color.price)}</p>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Seats Color (boats only) */}
                  {isBoat && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Seat Color</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {configOptions.colors.seats.map((color) => (
                          <button
                            key={color.id}
                            className={`relative group ${
                              selectedOptions.seatColor === color.hex ? 'ring-2 ring-red-500' : ''
                            }`}
                            onClick={() => setSelectedOptions(prev => ({ ...prev, seatColor: color.hex }))}
                          >
                            <div 
                              className="w-full h-16 rounded-lg border-2 border-white/20 transition-all group-hover:scale-105"
                              style={{ backgroundColor: color.hex }}
                            />
                            <p className="text-xs text-gray-300 mt-2">{color.name}</p>
                            {color.price > 0 && (
                              <p className="text-xs text-red-400">+{formatCurrency(color.price)}</p>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Accent Color */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Accent Color</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {configOptions.colors.accent.map((color) => (
                        <button
                          key={color.id}
                          className={`relative group ${
                            selectedOptions.accentColor === color.hex ? 'ring-2 ring-red-500' : ''
                          }`}
                          onClick={() => setSelectedOptions(prev => ({ ...prev, accentColor: color.hex }))}
                        >
                          <div 
                            className="w-full h-16 rounded-lg border-2 border-white/20 transition-all group-hover:scale-105"
                            style={{ backgroundColor: color.hex }}
                          />
                          <p className="text-xs text-gray-300 mt-2">{color.name}</p>
                          {color.price > 0 && (
                            <p className="text-xs text-red-400">+{formatCurrency(color.price)}</p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Engine */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {isBoat ? 'Engine Configuration' : 'Performance'}
                    </h3>
                    <div className="space-y-3">
                      {configOptions.engines.map((engine) => (
                        <label
                          key={engine.id}
                          className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedOptions.engine === engine.id
                              ? 'border-red-500 bg-red-500/10'
                              : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="engine"
                              value={engine.id}
                              checked={selectedOptions.engine === engine.id}
                              onChange={() => setSelectedOptions(prev => ({ ...prev, engine: engine.id }))}
                              className="text-red-500"
                            />
                            <span className="text-white text-sm">{engine.name}</span>
                          </div>
                          {engine.price > 0 && (
                            <span className="text-red-400 text-sm">+{formatCurrency(engine.price)}</span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Packages */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Optional Packages</h3>
                    <div className="space-y-3">
                      {configOptions.packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedOptions.packages.includes(pkg.id)
                              ? 'border-red-500 bg-red-500/10'
                              : 'border-white/20 hover:border-white/40'
                          }`}
                          onClick={() => togglePackage(pkg.id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-white font-medium">{pkg.name}</h4>
                            <span className="text-red-400 text-sm">+{formatCurrency(pkg.price)}</span>
                          </div>
                          <ul className="text-xs text-gray-400 space-y-1">
                            {pkg.items.map((item, idx) => (
                              <li key={idx}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Configuration Summary */}
                  <div className="glass-panel rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Your Configuration</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Base Model</span>
                        <span className="text-white">{product.name}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{isBoat ? 'Hull Color' : 'Primary Color'}</span>
                        <span className="text-white">
                          {configOptions.colors.hull.find(c => c.hex === selectedOptions.primaryColor)?.name}
                        </span>
                      </div>
                      
                      {isBoat && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Deck Color</span>
                            <span className="text-white">
                              {configOptions.colors.deck.find(c => c.hex === selectedOptions.deckColor)?.name}
                            </span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Seat Color</span>
                            <span className="text-white">
                              {configOptions.colors.seats.find(c => c.hex === selectedOptions.seatColor)?.name}
                            </span>
                          </div>
                        </>
                      )}
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Accent Color</span>
                        <span className="text-white">
                          {configOptions.colors.accent.find(c => c.hex === selectedOptions.accentColor)?.name}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Engine/Performance</span>
                        <span className="text-white">
                          {configOptions.engines.find(e => e.id === selectedOptions.engine)?.name}
                        </span>
                      </div>
                      
                      {selectedOptions.packages.length > 0 && (
                        <div className="pt-3 border-t border-white/20">
                          <p className="text-gray-400 text-sm mb-2">Selected Packages:</p>
                          {selectedOptions.packages.map(pkgId => {
                            const pkg = configOptions.packages.find(p => p.id === pkgId);
                            return (
                              <div key={pkgId} className="text-sm text-white mb-1">
                                • {pkg?.name}
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      <div className="pt-4 mt-4 border-t border-white/20">
                        <div className="flex justify-between items-end">
                          <span className="text-lg font-semibold text-white">Total Price</span>
                          <span className="text-2xl font-bold text-red-500">
                            {formatCurrency(totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button 
                      className="btn-yamaha-primary w-full"
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('requestQuote', { 
                          detail: { 
                            product, 
                            configuration: selectedOptions,
                            totalPrice 
                          } 
                        }));
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Request Quote
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline"
                        className="text-white border-white/30 hover:bg-white/10"
                        onClick={handleShare}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="text-white border-white/30 hover:bg-white/10"
                        onClick={() => alert('Downloading configuration...')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  {/* 3D Model Notice */}
                  <div className="glass-panel rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">3D Models Available</h4>
                    <p className="text-gray-400 text-sm mb-3">
                      To add 3D models for products:
                    </p>
                    <ol className="text-gray-400 text-sm space-y-1">
                      <li>1. Save models as .glb or .gltf files</li>
                      <li>2. Place in: /public/models/</li>
                      <li>3. Name as: product-id.glb</li>
                    </ol>
                  </div>

                  {/* Contact Info */}
                  <div className="text-center text-sm text-gray-400">
                    <p>Need assistance?</p>
                    <p className="text-white">Call +973 1234 5678</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Advanced3DConfigurator;

// Preload all GLB models
useGLTF.preload('/models/hook-32.glb');
useGLTF.preload('/models/mahar-31.glb');
useGLTF.preload('/models/flash.glb');
useGLTF.preload('/models/yzf-r1.glb');
useGLTF.preload('/models/mt-10.glb');
useGLTF.preload('/models/gp1800r.glb');
