@echo off
setlocal enabledelayedexpansion

REM Yamaha Bahrain Website - Setup Script for Windows
REM This script will install dependencies and start the development server

echo.
echo 🏍️  Yamaha Bahrain Website Setup
echo =================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected: 
node --version

REM Check if pnpm is installed, if not install it
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing pnpm package manager...
    npm install -g pnpm
    if errorlevel 1 (
        echo ❌ Failed to install pnpm. Please install it manually:
        echo npm install -g pnpm
        pause
        exit /b 1
    )
)

echo ✅ pnpm detected:
pnpm --version

REM Install dependencies
echo.
echo 📦 Installing project dependencies...
pnpm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies. Please check your internet connection and try again.
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Build the project
echo.
echo 🔨 Building the project...
pnpm run build

if errorlevel 1 (
    echo ❌ Build failed. Please check the error messages above.
    pause
    exit /b 1
)

echo ✅ Project built successfully

REM Start the development server
echo.
echo 🚀 Starting development server...
echo The website will open at http://localhost:5173
echo Press Ctrl+C to stop the server
echo.

pnpm run dev --host

echo.
echo 👋 Development server stopped. Thank you for using Yamaha Bahrain!
pause

