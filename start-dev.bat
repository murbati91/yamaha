@echo off
echo 🚀 Starting Yamaha Bahrain Enhanced Development Server...
echo.
echo 📦 Checking dependencies...
call pnpm install
echo.
echo 🌐 Opening browser at http://localhost:5173
echo.
echo 🔥 Starting development server with hot reload...
echo Press Ctrl+C to stop the server
echo.
call pnpm run dev --host
