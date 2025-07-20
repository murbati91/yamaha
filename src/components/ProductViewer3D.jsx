import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import { RotateCcw, ZoomIn, ZoomOut, Palette, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

// Enhanced 3D Motorcycle Model Component with realistic geometry
function MotorcycleModel({ color = '#0066cc', model = 'r1' }) {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  // Enhanced motorcycle models with more realistic geometry
  const getModelGeometry = () => {
    if (model === 'vmax') {
      return (
        <group ref={groupRef} scale={[1, 1, 1]} position={[0, -0.5, 0]}>
          {/* VMAX - Cruiser style with enhanced details */}
          
          {/* Main body frame */}
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[3.2, 0.8, 1]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.9} 
              roughness={0.1} 
              envMapIntensity={1}
            />
          </mesh>
          
          {/* Engine block */}
          <mesh position={[0.2, 0, 0]} castShadow>
            <boxGeometry args={[1.8, 1.2, 1.4]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
          </mesh>
          
          {/* Front wheel */}
          <group position={[-1.4, -0.3, 0]}>
            <mesh rotation={[Math.PI/2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.7, 0.7, 0.35]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Brake disc */}
            <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.2]}>
              <cylinderGeometry args={[0.5, 0.5, 0.05]} />
              <meshStandardMaterial color="#666" metalness={1} roughness={0.1} />
            </mesh>
          </group>
          
          {/* Rear wheel */}
          <group position={[1.4, -0.3, 0]}>
            <mesh rotation={[Math.PI/2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.8, 0.8, 0.4]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Brake disc */}
            <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.25]}>
              <cylinderGeometry args={[0.6, 0.6, 0.05]} />
              <meshStandardMaterial color="#666" metalness={1} roughness={0.1} />
            </mesh>
          </group>
          
          {/* Handlebars */}
          <mesh position={[-1.5, 0.8, 0]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.03, 0.03, 1.2]} />
            <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
          </mesh>
          
          {/* Exhaust pipes */}
          <mesh position={[0.8, -0.2, -0.6]} rotation={[0, Math.PI/4, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 1.5]} />
            <meshStandardMaterial color="#444" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0.8, -0.2, 0.6]} rotation={[0, -Math.PI/4, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 1.5]} />
            <meshStandardMaterial color="#444" metalness={0.9} roughness={0.2} />
          </mesh>
          
          {/* Seat */}
          <mesh position={[0.3, 0.9, 0]}>
            <boxGeometry args={[1.2, 0.15, 0.8]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
          </mesh>
          
          {/* Fuel tank */}
          <mesh position={[-0.3, 0.7, 0]}>
            <sphereGeometry args={[0.6, 16, 8]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.9} 
              roughness={0.1} 
              envMapIntensity={1}
            />
          </mesh>
        </group>
      )
    } else {
      return (
        <group ref={groupRef} scale={[1, 1, 1]} position={[0, -0.5, 0]}>
          {/* R1 - Sport bike style with enhanced realistic details */}
          
          {/* Main fairing - sleek aerodynamic shape */}
          <mesh position={[-0.2, 0.4, 0]} rotation={[0, 0, -0.1]} castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.8, 1.1]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.95} 
              roughness={0.05} 
              envMapIntensity={1.5}
            />
          </mesh>
          
          {/* Front nose cone */}
          <mesh position={[-1.3, 0.4, 0]} rotation={[0, 0, -0.2]} castShadow>
            <coneGeometry args={[0.4, 0.8, 8]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.95} 
              roughness={0.05} 
              envMapIntensity={1.5}
            />
          </mesh>
          
          {/* Side fairings */}
          <mesh position={[0, 0.2, -0.6]} rotation={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[1.8, 0.6, 0.15]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.9} 
              roughness={0.1} 
              envMapIntensity={1.2}
            />
          </mesh>
          <mesh position={[0, 0.2, 0.6]} rotation={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[1.8, 0.6, 0.15]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.9} 
              roughness={0.1} 
              envMapIntensity={1.2}
            />
          </mesh>
          
          {/* Engine block - more detailed */}
          <mesh position={[0.1, -0.15, 0]} castShadow>
            <boxGeometry args={[1.4, 0.9, 0.8]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
          </mesh>
          
          {/* Engine cylinders */}
          <mesh position={[-0.2, 0.1, -0.3]} rotation={[Math.PI/2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.6]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[-0.2, 0.1, 0]} rotation={[Math.PI/2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.6]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[-0.2, 0.1, 0.3]} rotation={[Math.PI/2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.6]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
          </mesh>
          
          {/* Front wheel - sport bike style */}
          <group position={[-1.3, -0.45, 0]}>
            <mesh rotation={[Math.PI/2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.55, 0.55, 0.25]} />
              <meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.05} />
            </mesh>
            {/* Brake disc - larger for sport bike */}
            <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.15]}>
              <cylinderGeometry args={[0.42, 0.42, 0.03]} />
              <meshStandardMaterial color="#888" metalness={1} roughness={0.1} />
            </mesh>
            {/* Brake caliper */}
            <mesh position={[0.3, 0.3, 0.2]}>
              <boxGeometry args={[0.15, 0.2, 0.1]} />
              <meshStandardMaterial color="#ff6b35" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
          
          {/* Rear wheel - wider for sport bike */}
          <group position={[1.3, -0.45, 0]}>
            <mesh rotation={[Math.PI/2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.65, 0.65, 0.35]} />
              <meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.05} />
            </mesh>
            {/* Brake disc */}
            <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.2]}>
              <cylinderGeometry args={[0.48, 0.48, 0.03]} />
              <meshStandardMaterial color="#888" metalness={1} roughness={0.1} />
            </mesh>
            {/* Chain sprocket */}
            <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0, -0.2]}>
              <cylinderGeometry args={[0.25, 0.25, 0.02]} />
              <meshStandardMaterial color="#666" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
          
          {/* Windscreen - more aerodynamic */}
          <mesh position={[-1.1, 0.9, 0]} rotation={[0.15, 0, 0]} castShadow>
            <boxGeometry args={[0.5, 0.7, 0.02]} />
            <meshStandardMaterial 
              color="#87ceeb" 
              transparent 
              opacity={0.85} 
              metalness={0.1} 
              roughness={0.05}
            />
          </mesh>
          
          {/* Clip-on handlebars */}
          <mesh position={[-1.2, 0.65, -0.35]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3]} />
            <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[-1.2, 0.65, 0.35]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3]} />
            <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Exhaust system - under-tail */}
          <mesh position={[1.1, -0.2, 0]} rotation={[0, Math.PI/8, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 1.0]} />
            <meshStandardMaterial color="#333" metalness={0.95} roughness={0.1} />
          </mesh>
          
          {/* Exhaust tip */}
          <mesh position={[1.8, 0.1, 0]}>
            <cylinderGeometry args={[0.08, 0.06, 0.2]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
          </mesh>
          
          {/* Racing seat */}
          <mesh position={[0.3, 0.75, 0]} rotation={[0, 0, -0.05]}>
            <boxGeometry args={[0.9, 0.1, 0.55]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
          </mesh>
          
          {/* Fuel tank - more aerodynamic */}
          <mesh position={[-0.5, 0.6, 0]} scale={[1.2, 0.8, 1]}>
            <sphereGeometry args={[0.45, 16, 8]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.95} 
              roughness={0.05} 
              envMapIntensity={1.5}
            />
          </mesh>
          
          {/* Front forks - inverted */}
          <mesh position={[-1.3, 0.05, -0.25]} rotation={[0.1, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.9]} />
            <meshStandardMaterial color="#gold" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[-1.3, 0.05, 0.25]} rotation={[0.1, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.9]} />
            <meshStandardMaterial color="#gold" metalness={0.9} roughness={0.1} />
          </mesh>
          
          {/* Swing arm */}
          <mesh position={[0.8, -0.3, 0]}>
            <boxGeometry args={[1.2, 0.08, 0.12]} />
            <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Rear shock */}
          <mesh position={[0.6, 0.1, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.03, 0.03, 0.6]} />
            <meshStandardMaterial color="#ff6b35" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Headlight */}
          <mesh position={[-1.4, 0.5, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
          </mesh>
          
          {/* Tail light */}
          <mesh position={[1.6, 0.6, 0]}>
            <boxGeometry args={[0.05, 0.15, 0.3]} />
            <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.2} />
          </mesh>
        </group>
      )
    }
  }

  return getModelGeometry()
}

// Loading component
function LoadingSpinner() {
  return (
    <Html center>
      <div className="yamaha-spinner"></div>
    </Html>
  )
}

// Color picker component
function ColorPicker({ selectedColor, onColorChange, colors }) {
  return (
    <motion.div 
      className="absolute top-4 right-4 glass-panel p-4 rounded-lg"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="text-white text-sm font-semibold mb-3 flex items-center">
        <Palette className="w-4 h-4 mr-2" />
        Colors
      </h4>
      <div className="grid grid-cols-3 gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
              selectedColor === color.value 
                ? 'border-white scale-110' 
                : 'border-gray-400 hover:border-white hover:scale-105'
            }`}
            style={{ backgroundColor: color.value }}
            onClick={() => onColorChange(color.value)}
            title={color.name}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Control panel component
function ControlPanel({ onReset, onZoomIn, onZoomOut }) {
  return (
    <motion.div 
      className="absolute bottom-4 left-4 glass-panel p-3 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex space-x-2">
        <Button
          size="sm"
          variant="ghost"
          className="text-white hover:bg-white/20"
          onClick={onReset}
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-white hover:bg-white/20"
          onClick={onZoomIn}
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-white hover:bg-white/20"
          onClick={onZoomOut}
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  )
}

// Specs overlay component
function SpecsOverlay({ motorcycle, isVisible }) {
  if (!isVisible) return null

  return (
    <motion.div 
      className="absolute bottom-4 right-4 glass-panel p-4 rounded-lg max-w-xs"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <h4 className="text-white font-bold text-lg mb-3">{motorcycle.name}</h4>
      <div className="space-y-2">
        {Object.entries(motorcycle.specs).map(([key, value]) => (
          <div key={key} className="spec-item">
            <span className="spec-label capitalize">{key}</span>
            <span className="spec-value">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-white/20">
        <div className="text-lg font-semibold text-white">{motorcycle.price}</div>
      </div>
    </motion.div>
  )
}

export default function ProductViewer3D({ motorcycle, className = "" }) {
  const [selectedColor, setSelectedColor] = useState('#0066cc')
  const [showSpecs, setShowSpecs] = useState(true)
  const controlsRef = useRef()

  const colors = [
    { name: 'Yamaha Blue', value: '#0066cc' },
    { name: 'Racing Red', value: '#E31937' },
    { name: 'Midnight Black', value: '#1a1a1a' },
    { name: 'Pearl White', value: '#f8f8ff' },
    { name: 'Metallic Silver', value: '#c0c0c0' },
    { name: 'Neon Yellow', value: '#ffff00' }
  ]

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(0.8)
      controlsRef.current.update()
    }
  }

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(0.8)
      controlsRef.current.update()
    }
  }

  return (
    <div className={`relative w-full h-96 md:h-[600px] canvas-container ${className}`}>
      <Canvas
        shadows
        camera={{ position: [3, 1.5, 4], fov: 45 }}
        className="bg-gradient-to-b from-gray-900 to-black rounded-xl"
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.3} />
        <spotLight 
          position={[8, 8, 8]} 
          angle={0.2} 
          penumbra={1} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize={[2048, 2048]}
        />
        <spotLight 
          position={[-5, 5, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.8} 
          color="#4a90e2"
        />
        <pointLight position={[-8, -5, -8]} intensity={0.4} color="#ff6b35" />
        <directionalLight 
          position={[0, 10, 0]} 
          intensity={0.5} 
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        
        <Suspense fallback={<LoadingSpinner />}>
          <MotorcycleModel color={selectedColor} model={motorcycle.id} />
          <Environment preset="city" />
          <ContactShadows 
            opacity={0.4} 
            scale={10} 
            blur={1} 
            far={10} 
            resolution={256} 
            color="#000000" 
          />
        </Suspense>
        
        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      <ColorPicker 
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
        colors={colors}
      />

      <ControlPanel 
        onReset={handleReset}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />

      <SpecsOverlay 
        motorcycle={motorcycle}
        isVisible={showSpecs}
      />

      {/* Toggle specs button */}
      <motion.button
        className="absolute top-4 left-4 glass-panel p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
        onClick={() => setShowSpecs(!showSpecs)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Toggle Specifications"
      >
        <Settings className="w-4 h-4" />
      </motion.button>
    </div>
  )
}

