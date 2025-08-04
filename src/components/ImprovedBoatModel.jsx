import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Float } from '@react-three/drei'

// Improved Boat Model Component
export function ImprovedBoatModel({ colors, boatType = 'sport' }) {
  const meshRef = useRef()
  const hullRef = useRef()
  
  useEffect(() => {
    // Create custom hull geometry with proper boat shape
    if (hullRef.current) {
      const hull = hullRef.current
      
      // Create hull shape with curved bottom
      const shape = new THREE.Shape()
      
      // Boat profile (side view)
      shape.moveTo(-2, 0.5)
      shape.lineTo(-2, -0.3)
      shape.quadraticCurveTo(-1.8, -0.5, -1.5, -0.5) // Curved bottom
      shape.lineTo(1.5, -0.5)
      shape.quadraticCurveTo(2, -0.4, 2.2, 0) // Pointed bow
      shape.lineTo(2.2, 0.5)
      shape.lineTo(-2, 0.5)
      
      const extrudeSettings = {
        steps: 2,
        depth: 1.2,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 2
      }
      
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      geometry.center()
      geometry.rotateX(Math.PI / 2)
      geometry.rotateY(Math.PI / 2)
      
      hull.geometry = geometry
    }
  }, [])
  
  // Gentle rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })
  
  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <group ref={meshRef} scale={1.2}>
        {/* Main Hull */}
        <mesh ref={hullRef} castShadow receiveShadow>
          <meshStandardMaterial 
            color={colors.hull}
            metalness={0.6}
            roughness={0.2}
            envMapIntensity={1}
          />
        </mesh>
        
        {/* Hull Bottom Paint */}
        <mesh position={[0, -0.45, 0]} castShadow>
          <boxGeometry args={[4.5, 0.1, 1.3]} />
          <meshStandardMaterial 
            color={colors.hullBottom}
            metalness={0.3}
            roughness={0.5}
          />
        </mesh>
        
        {/* Deck */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[4, 0.1, 1.1]} />
          <meshStandardMaterial 
            color={colors.deck}
            metalness={0.2}
            roughness={0.7}
          />
        </mesh>
        
        {/* Windshield/Console */}
        <group position={[0.8, 0.7, 0]}>
          {/* Console Base */}
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.8, 0.7]} />
            <meshStandardMaterial 
              color={colors.console}
              metalness={0.4}
              roughness={0.3}
            />
          </mesh>
          
          {/* Windshield */}
          <mesh position={[0.2, 0.6, 0]}>
            <boxGeometry args={[0.05, 0.6, 0.7]} />
            <meshPhysicalMaterial 
              color="#87CEEB"
              transparent
              opacity={0.3}
              metalness={0.1}
              roughness={0}
              envMapIntensity={1}
            />
          </mesh>
        </group>
        
        {/* Seats */}
        <group>
          {/* Front Seats */}
          <mesh position={[0.5, 0.85, 0.3]} castShadow>
            <boxGeometry args={[0.6, 0.25, 0.35]} />
            <meshStandardMaterial 
              color={colors.seats}
              metalness={0.1}
              roughness={0.8}
            />
          </mesh>
          <mesh position={[0.5, 1, 0.3]} castShadow>
            <boxGeometry args={[0.1, 0.4, 0.35]} />
            <meshStandardMaterial 
              color={colors.seats}
              metalness={0.1}
              roughness={0.8}
            />
          </mesh>
          
          <mesh position={[0.5, 0.85, -0.3]} castShadow>
            <boxGeometry args={[0.6, 0.25, 0.35]} />
            <meshStandardMaterial 
              color={colors.seats}
              metalness={0.1}
              roughness={0.8}
            />
          </mesh>
          <mesh position={[0.5, 1, -0.3]} castShadow>
            <boxGeometry args={[0.1, 0.4, 0.35]} />
            <meshStandardMaterial 
              color={colors.seats}
              metalness={0.1}
              roughness={0.8}
            />
          </mesh>
          
          {/* Rear Bench */}
          <mesh position={[-1, 0.85, 0]} castShadow>
            <boxGeometry args={[0.8, 0.25, 0.9]} />
            <meshStandardMaterial 
              color={colors.seats}
              metalness={0.1}
              roughness={0.8}
            />
          </mesh>
        </group>
        
        {/* T-Top / Hardtop */}
        {colors.hardtop !== 'none' && (
          <group position={[0.2, 1.2, 0]}>
            {/* Front Posts */}
            <mesh position={[0.8, 0.5, 0.4]}>
              <cylinderGeometry args={[0.04, 0.04, 1.2]} />
              <meshStandardMaterial 
                color={colors.hardtop} 
                metalness={0.8} 
                roughness={0.2} 
              />
            </mesh>
            <mesh position={[0.8, 0.5, -0.4]}>
              <cylinderGeometry args={[0.04, 0.04, 1.2]} />
              <meshStandardMaterial 
                color={colors.hardtop} 
                metalness={0.8} 
                roughness={0.2} 
              />
            </mesh>
            
            {/* Rear Posts */}
            <mesh position={[-0.4, 0.5, 0.4]}>
              <cylinderGeometry args={[0.04, 0.04, 1.2]} />
              <meshStandardMaterial 
                color={colors.hardtop} 
                metalness={0.8} 
                roughness={0.2} 
              />
            </mesh>
            <mesh position={[-0.4, 0.5, -0.4]}>
              <cylinderGeometry args={[0.04, 0.04, 1.2]} />
              <meshStandardMaterial 
                color={colors.hardtop} 
                metalness={0.8} 
                roughness={0.2} 
              />
            </mesh>
            
            {/* Top Canvas/Hard Top */}
            <mesh position={[0.2, 1.1, 0]} castShadow>
              <boxGeometry args={[2, 0.08, 1.2]} />
              <meshStandardMaterial 
                color={colors.hardtop === '#FFFFFF' ? '#F5F5F5' : colors.hardtop}
                metalness={0.3} 
                roughness={0.5} 
              />
            </mesh>
          </group>
        )}
        
        {/* Twin Outboard Motors */}
        <group position={[-2.3, -0.1, 0]}>
          {/* Motor 1 */}
          <group position={[0, 0, 0.35]}>
            <mesh castShadow>
              <boxGeometry args={[0.35, 1.2, 0.25]} />
              <meshStandardMaterial 
                color={colors.motor}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
            {/* Motor Head */}
            <mesh position={[0, 0.7, 0]}>
              <boxGeometry args={[0.3, 0.4, 0.2]} />
              <meshStandardMaterial 
                color={colors.motor}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
            {/* Propeller Housing */}
            <mesh position={[0, -0.7, 0]}>
              <cylinderGeometry args={[0.12, 0.08, 0.3]} />
              <meshStandardMaterial 
                color={colors.motorAccent}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>
          
          {/* Motor 2 */}
          <group position={[0, 0, -0.35]}>
            <mesh castShadow>
              <boxGeometry args={[0.35, 1.2, 0.25]} />
              <meshStandardMaterial 
                color={colors.motor}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
            {/* Motor Head */}
            <mesh position={[0, 0.7, 0]}>
              <boxGeometry args={[0.3, 0.4, 0.2]} />
              <meshStandardMaterial 
                color={colors.motor}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
            {/* Propeller Housing */}
            <mesh position={[0, -0.7, 0]}>
              <cylinderGeometry args={[0.12, 0.08, 0.3]} />
              <meshStandardMaterial 
                color={colors.motorAccent}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>
        </group>
        
        {/* Rub Rail */}
        <mesh position={[0, 0.2, 0]}>
          <torusGeometry args={[2.2, 0.03, 8, 50]} />
          <meshStandardMaterial 
            color={colors.rubRail}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
        
        {/* Bow Rail */}
        <group position={[2, 0.8, 0]}>
          <mesh>
            <torusGeometry args={[0.5, 0.02, 8, 20, Math.PI]} />
            <meshStandardMaterial 
              color="#C0C0C0"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>
        
        {/* Details */}
        <group>
          {/* Hull Graphics/Stripes */}
          <mesh position={[0, 0.1, 0.61]}>
            <boxGeometry args={[3.5, 0.2, 0.01]} />
            <meshStandardMaterial 
              color={colors.accent}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0.1, -0.61]}>
            <boxGeometry args={[3.5, 0.2, 0.01]} />
            <meshStandardMaterial 
              color={colors.accent}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      </group>
    </Float>
  )
}