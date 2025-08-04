#!/bin/bash

echo "🚀 Deploying 3D Configurator Improvements..."
echo "=========================================="

# Navigate to project
cd C:/Users/Faisal/CascadeProjects/yamaha/yamaha-bahrain

# Create directories if they don't exist
echo "📁 Creating model directories..."
mkdir -p public/models/boats
mkdir -p public/models/jetskis
mkdir -p public/models/motorcycles

# Stage all changes
echo "📝 Staging changes..."
git add -A

# Commit
echo "💾 Committing..."
git commit -m "fix: improve 3D boat model and add support for GLB files
- Replace basic geometry with improved boat shape
- Add support for loading .glb/.gltf models
- Add auto-rotation for better viewing
- Add shadows and better lighting
- Create guide for adding 3D models
- Add fallback to procedural model if files missing"

# Push
echo "🚀 Pushing to Vercel..."
git push origin main

echo ""
echo "✅ Deployment triggered!"
echo ""
echo "📋 Next Steps to Add Real 3D Models:"
echo "1. Download boat models from Sketchfab (free)"
echo "2. Save as .glb format"
echo "3. Place in public/models/boats/"
echo "4. Name as: hook-32.glb, flash.glb, etc."
echo ""
echo "🔍 To download a test model:"
echo "1. Visit: https://yamaha.bahrain-ai.com"
echo "2. Open console (F12)"
echo "3. Run: fetch('/download-boat-model.js').then(r=>r.text()).then(eval)"
echo ""
echo "=========================================="