#!/bin/bash
# Install Three.js and React Three Fiber dependencies

echo "Installing 3D dependencies for Yamaha Bahrain..."

# Navigate to project directory
cd C:/Users/Faisal/CascadeProjects/yamaha/yamaha-bahrain

# Install Three.js ecosystem
echo "Installing Three.js..."
pnpm add three @react-three/fiber @react-three/drei @react-three/postprocessing

# Install additional 3D utilities
echo "Installing 3D utilities..."
pnpm add @react-three/xr @react-three/rapier leva

echo "✅ All 3D dependencies installed successfully!"
echo ""
echo "Installed packages:"
echo "- three: 3D graphics library"
echo "- @react-three/fiber: React renderer for Three.js"
echo "- @react-three/drei: Useful helpers for React Three Fiber"
echo "- @react-three/postprocessing: Post-processing effects"
echo "- @react-three/xr: WebXR support for AR/VR"
echo "- @react-three/rapier: Physics engine"
echo "- leva: GUI controls for debugging"
