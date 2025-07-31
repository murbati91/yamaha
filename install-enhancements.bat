@echo off
setlocal enabledelayedexpansion

echo 🚀 Installing Enhancement Dependencies...
echo.

REM TypeScript and types
echo 📦 Installing TypeScript...
call pnpm add -D typescript @types/react @types/react-dom @types/three @types/react-router-dom

REM Testing
echo 🧪 Installing Testing Libraries...
call pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/ui

REM Development tools
echo 🛠️ Installing Development Tools...
call pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional

REM i18n
echo 🌍 Installing Internationalization...
call pnpm add react-i18next i18next i18next-browser-languagedetector i18next-http-backend

REM Additional utilities
echo 🔧 Installing Additional Utilities...
call pnpm add axios react-intersection-observer react-helmet-async

REM PWA
echo 📱 Installing PWA Support...
call pnpm add -D vite-plugin-pwa workbox-window

echo.
echo ✅ All dependencies installed!
echo.

REM Create test setup
echo 📝 Creating test configuration...

(
echo import { defineConfig } from 'vite'
echo import react from '@vitejs/plugin-react'
echo import { resolve } from 'path'
echo.
echo export default defineConfig({
echo   plugins: [react()],
echo   test: {
echo     globals: true,
echo     environment: 'jsdom',
echo     setupFiles: './src/test/setup.js',
echo     css: true,
echo   },
echo   resolve: {
echo     alias: {
echo       '@': resolve(__dirname, './src'^),
echo     },
echo   },
echo }^)
) > vitest.config.js

REM Create test directory
if not exist "src\test" mkdir src\test

(
echo import '@testing-library/jest-dom'
echo import { expect, afterEach } from 'vitest'
echo import { cleanup } from '@testing-library/react'
echo import * as matchers from '@testing-library/jest-dom/matchers'
echo.
echo expect.extend(matchers^)
echo.
echo afterEach(^(^) =^> {
echo   cleanup(^)
echo }^)
) > src\test\setup.js

REM Create commitlint config
(
echo module.exports = {
echo   extends: ['@commitlint/config-conventional'],
echo   rules: {
echo     'type-enum': [
echo       2,
echo       'always',
echo       [
echo         'feat',
echo         'fix',
echo         'docs',
echo         'style',
echo         'refactor',
echo         'perf',
echo         'test',
echo         'chore',
echo         'revert',
echo         'ci',
echo       ],
echo     ],
echo   },
echo }
) > commitlint.config.js

echo.
echo 🎉 Enhancement setup complete!
echo.
echo Starting development server...
echo The browser will open automatically at http://localhost:5173
echo.

REM Start the dev server
call pnpm run dev

pause
