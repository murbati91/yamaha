@echo off
echo 🚀 Installing Enhanced Dependencies and Starting Server...
echo.

REM Install the new dependencies
echo 📦 Installing @google/model-viewer and photoswipe...
call pnpm add @google/model-viewer photoswipe

echo.
echo ✅ Dependencies installed!
echo.

REM Start the development server
echo 🌐 Starting development server...
echo The browser will open automatically at http://localhost:5173
echo.
echo 🎉 Your enhanced Yamaha Bahrain site is ready!
echo.
echo Features to try:
echo - Click any product to see the new 3D viewer
echo - Click "Gallery" in navigation for premium image browser
echo - Try the Finance Calculator on any product
echo - Watch for the Live Chat widget (appears after 5 seconds)
echo.
echo Press Ctrl+C to stop the server
echo.

call pnpm run dev
