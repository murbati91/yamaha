#!/bin/bash

echo "🔍 Checking Yamaha Bahrain Build Process..."
echo "=========================================="

# Navigate to project directory
cd C:/Users/Faisal/CascadeProjects/yamaha/yamaha-bahrain

# 1. Check current branch and status
echo "📌 Git Status:"
git status --short
git branch --show-current

# 2. Check if all CSS files exist
echo -e "\n📁 CSS Files Check:"
if [ -f "src/index.css" ]; then
    echo "✅ src/index.css exists"
    echo "   Size: $(wc -c < src/index.css) bytes"
else
    echo "❌ src/index.css NOT FOUND!"
fi

if [ -f "postcss.config.js" ]; then
    echo "✅ postcss.config.js exists"
else
    echo "❌ postcss.config.js NOT FOUND!"
fi

if [ -f "tailwind.config.js" ]; then
    echo "✅ tailwind.config.js exists"
else
    echo "❌ tailwind.config.js NOT FOUND!"
fi

# 3. Check node modules
echo -e "\n📦 Dependencies Check:"
if [ -d "node_modules/tailwindcss" ]; then
    echo "✅ Tailwind CSS installed"
else
    echo "❌ Tailwind CSS NOT installed!"
fi

if [ -d "node_modules/postcss" ]; then
    echo "✅ PostCSS installed"
else
    echo "❌ PostCSS NOT installed!"
fi

if [ -d "node_modules/autoprefixer" ]; then
    echo "✅ Autoprefixer installed"
else
    echo "❌ Autoprefixer NOT installed!"
fi

# 4. Run build locally
echo -e "\n🏗️  Running Local Build..."
pnpm run build

# 5. Check build output
echo -e "\n📊 Build Output Analysis:"
if [ -d "dist" ]; then
    echo "✅ dist folder created"
    echo "   Contents:"
    ls -la dist/
    echo -e "\n   CSS Files in dist:"
    find dist -name "*.css" -type f -exec echo "   - {}" \; -exec head -n 5 {} \;
    echo -e "\n   Total size: $(du -sh dist | cut -f1)"
else
    echo "❌ dist folder NOT created!"
fi

# 6. Check for CSS in index.html
echo -e "\n🔍 Checking dist/index.html for CSS references:"
if [ -f "dist/index.html" ]; then
    echo "CSS links found:"
    grep -E '<link.*\.css' dist/index.html || echo "   ❌ No CSS links found!"
    echo -e "\nInline styles:"
    grep -E '<style>' dist/index.html || echo "   ❌ No inline styles found!"
fi

echo -e "\n✅ Build check complete!"
echo "=========================================="