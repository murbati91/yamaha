#!/bin/bash

# Navigate to the yamaha-bahrain directory
cd C:/Users/Faisal/CascadeProjects/yamaha/yamaha-bahrain

# Add all changes
git add .

# Commit with message
git commit -m "fix: add PostCSS config and ensure CSS processing on Vercel"

# Push to main branch
git push origin main

echo "✅ Changes committed and pushed successfully!"
echo "🚀 Deployment will start automatically on Vercel"
