#!/bin/bash
# Git push script for 3D Configurator Update

echo "🚀 Preparing to deploy 3D Configurator to Vercel..."

# Navigate to project directory
cd C:/Users/Faisal/CascadeProjects/yamaha/yamaha-bahrain

# Check git status
echo "📋 Checking git status..."
git status

# Add all changes
echo "📦 Adding all changes..."
git add .

# Commit with descriptive message
echo "💾 Committing changes..."
git commit -m "feat: Add Advanced 3D Configurator with Three.js

- Implement Midnight Express-style 3D product viewer
- Add support for GLB/GLTF 3D models
- Create fallback to product images when no 3D model
- Add real-time color customization on 3D models
- Implement professional studio lighting
- Add camera controls (orbit, zoom, auto-rotate)
- Create model showcase page with grid/list views
- Add 3D/Image view toggle
- Create directory structure for 3D models
- Update product catalog to support modelPath
- Add mobile-optimized touch controls
- Include loading progress indicators
- Add comprehensive documentation

Ready for 3D model integration tomorrow!"

# Push to main branch
echo "🌐 Pushing to GitHub..."
git push origin main

echo "✅ Push complete! Vercel will now deploy automatically."
echo ""
echo "📱 Your site will be updated at:"
echo "   https://yamaha.bahrain-ai.com"
echo ""
echo "⏱️  Deployment usually takes 1-2 minutes."
echo ""
echo "🎮 New features available:"
echo "   - Click '3D Showcase' button in navigation"
echo "   - Click any product to see 3D configurator"
echo "   - Toggle between 3D and image views"
echo "   - Customize colors in real-time"
echo ""
echo "📦 Tomorrow: Add actual 3D models to /public/models/"
