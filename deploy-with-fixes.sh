#!/bin/bash

echo "🚀 Deploying Yamaha Bahrain with CSS Fixes..."
echo "============================================="

# Navigate to project
cd C:/Users/Faisal/CascadeProjects/yamaha/yamaha-bahrain

# 1. Create utils directory if it doesn't exist
echo "📁 Creating utils directory..."
mkdir -p src/utils

# 2. Stage all changes
echo "📝 Staging changes..."
git add -A

# 3. Commit with descriptive message
echo "💾 Committing..."
git commit -m "fix: comprehensive CSS loading solution for production
- Add CSS injection failsafe for production
- Add debug component for CSS diagnostics  
- Update Vite config to prevent CSS code splitting
- Force critical styles in main.jsx
- Add deployment verification script"

# 4. Push to trigger deployment
echo "🚀 Pushing to Vercel..."
git push origin main

echo ""
echo "✅ Deployment triggered!"
echo ""
echo "📋 Next Steps:"
echo "1. Wait 2-3 minutes for deployment to complete"
echo "2. Visit: https://yamaha.bahrain-ai.com?debug=true"
echo "   (This will show the debug panel)"
echo "3. Check the console for CSS diagnostics"
echo "4. Run verification script in console:"
echo "   - Open DevTools (F12)"
echo "   - Go to Console tab"
echo "   - Paste: fetch('/verify-deployment.js').then(r=>r.text()).then(eval)"
echo ""
echo "🔍 Alternative URLs to test:"
echo "- Test page: https://yamaha.bahrain-ai.com/test-dark-theme.html"
echo "- Main site: https://yamaha.bahrain-ai.com"
echo ""
echo "============================================="