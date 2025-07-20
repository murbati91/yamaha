#!/bin/bash

# Yamaha Bahrain Website - Setup Script for Unix/Mac
# This script will install dependencies and start the development server

echo "🏍️  Yamaha Bahrain Website Setup"
echo "================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    echo "Please update Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if pnpm is installed, if not install it
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm package manager..."
    npm install -g pnpm
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install pnpm. Please install it manually:"
        echo "npm install -g pnpm"
        exit 1
    fi
fi

echo "✅ pnpm $(pnpm -v) detected"

# Install dependencies
echo ""
echo "📦 Installing project dependencies..."
pnpm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Build the project
echo ""
echo "🔨 Building the project..."
pnpm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi

echo "✅ Project built successfully"

# Start the development server
echo ""
echo "🚀 Starting development server..."
echo "The website will open at http://localhost:5173"
echo "Press Ctrl+C to stop the server"
echo ""

pnpm run dev --host

echo ""
echo "👋 Development server stopped. Thank you for using Yamaha Bahrain!"

