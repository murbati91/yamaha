#!/bin/bash

echo "🚀 Installing Enhancement Dependencies..."
echo ""

# TypeScript and types
echo "📦 Installing TypeScript..."
pnpm add -D typescript @types/react @types/react-dom @types/three @types/react-router-dom

# Testing
echo "🧪 Installing Testing Libraries..."
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/ui

# Development tools
echo "🛠️ Installing Development Tools..."
pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional

# Analytics and monitoring
echo "📊 Installing Analytics (Note: These are placeholder packages)..."
# Note: Google Analytics would be added via script tags, not npm

# i18n
echo "🌍 Installing Internationalization..."
pnpm add react-i18next i18next i18next-browser-languagedetector i18next-http-backend

# Additional utilities
echo "🔧 Installing Additional Utilities..."
pnpm add axios react-intersection-observer react-helmet-async

# PWA
echo "📱 Installing PWA Support..."
pnpm add -D vite-plugin-pwa workbox-window

echo ""
echo "✅ All dependencies installed!"
echo ""

# Create test setup
echo "📝 Creating test configuration..."

cat > vitest.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
EOF

# Create test setup file
mkdir -p src/test
cat > src/test/setup.js << 'EOF'
import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
EOF

# Create commitlint config
cat > commitlint.config.js << 'EOF'
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'ci',
      ],
    ],
  },
}
EOF

# Update package.json scripts
echo "📝 Updating package.json scripts..."

# Initialize git hooks
echo "🔗 Setting up Git hooks..."
pnpm exec husky install

echo ""
echo "🎉 Enhancement setup complete!"
echo ""
echo "Next steps:"
echo "1. Run 'pnpm test' to run tests"
echo "2. Run 'pnpm run dev' to start development server"
echo "3. The browser will open automatically at http://localhost:5173"
