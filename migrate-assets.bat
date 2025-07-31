@echo off
setlocal enabledelayedexpansion

echo 🚀 Yamaha Asset Migration Script
echo ================================
echo.

REM Source and destination directories
set "SOURCE_DIR=C:\Users\Faisal\CascadeProjects\Yamaha-extractpic"
set "DEST_DIR=C:\Users\Faisal\CascadeProjects\yamaha\yamaha-bahrain\public\images"

echo 📁 Source: %SOURCE_DIR%
echo 📁 Destination: %DEST_DIR%
echo.

REM Create destination directories
echo 📂 Creating directory structure...
if not exist "%DEST_DIR%\products\jet-skis" mkdir "%DEST_DIR%\products\jet-skis"
if not exist "%DEST_DIR%\products\boats" mkdir "%DEST_DIR%\products\boats"
if not exist "%DEST_DIR%\products\accessories" mkdir "%DEST_DIR%\products\accessories"
if not exist "%DEST_DIR%\products\motorcycles" mkdir "%DEST_DIR%\products\motorcycles"
if not exist "%DEST_DIR%\products\utility" mkdir "%DEST_DIR%\products\utility"
if not exist "%DEST_DIR%\heroes" mkdir "%DEST_DIR%\heroes"

echo.
echo 📋 Copying assets...

REM Copy Jet Ski images
echo   • Copying Jet Ski images...
copy "%SOURCE_DIR%\Motor & Marine\gp1800svho.jpg" "%DEST_DIR%\products\jet-skis\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\82_2025_GP1800C-B_WHRB_NA_00_YY_45.jpg" "%DEST_DIR%\products\jet-skis\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\82_2025_FX1800B-B_WH_NA_00_YY_48.jpg" "%DEST_DIR%\products\jet-skis\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\vxcr2023.jpg" "%DEST_DIR%\products\jet-skis\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\vx2023.jpg" "%DEST_DIR%\products\jet-skis\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\82_2025_VX1900B-B_PRMN_NA_00_YY_21.jpg" "%DEST_DIR%\products\jet-skis\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\82_2025_VX1900B-B_PRMN_NA_00_YY_34.jpg" "%DEST_DIR%\products\jet-skis\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\superjet2024.jpg" "%DEST_DIR%\products\jet-skis\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\82_2025_JB1050B-B_LYMN_NA_00_YY_36 (1).jpg" "%DEST_DIR%\products\jet-skis\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\82_2025_JB1050B-B_LYMN_NA_00_YY_56 (1).jpg" "%DEST_DIR%\products\jet-skis\" >nul 2>&1

REM Copy Boat images
echo   • Copying Boat images...
copy "%SOURCE_DIR%\Motor & Marine\275sd2025.jpg" "%DEST_DIR%\products\boats\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\275sdx.webp" "%DEST_DIR%\products\boats\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\275sdx_selected.jpg" "%DEST_DIR%\products\boats\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\ar250.webp" "%DEST_DIR%\products\boats\" >nul 2>&1

REM Copy Pearl Craft images
echo   • Copying Pearl Craft images...
copy "%SOURCE_DIR%\Pearl Craft\hook32.png" "%DEST_DIR%\products\boats\" >nul 2>&1
copy "%SOURCE_DIR%\Pearl Craft\flash23.png" "%DEST_DIR%\products\boats\" >nul 2>&1
copy "%SOURCE_DIR%\Pearl Craft\flash23.jpg" "%DEST_DIR%\products\boats\" >nul 2>&1
copy "%SOURCE_DIR%\Pearl Craft\mahar31.png" "%DEST_DIR%\products\boats\" >nul 2>&1
copy "%SOURCE_DIR%\Pearl Craft\MAHAR31.webp" "%DEST_DIR%\products\boats\" >nul 2>&1
copy "%SOURCE_DIR%\Pearl Craft\coastguard.png" "%DEST_DIR%\products\boats\" >nul 2>&1
copy "%SOURCE_DIR%\Pearl Craft\demo.JPG" "%DEST_DIR%\products\boats\" >nul 2>&1
copy "%SOURCE_DIR%\Pearl Craft\demo2.JPG" "%DEST_DIR%\products\boats\" >nul 2>&1
copy "%SOURCE_DIR%\Pearl Craft\977ffba9-e9e2-4e8f-8c8c-9bc890316990.JPG" "%DEST_DIR%\products\boats\" >nul 2>&1

REM Copy Accessory images
echo   • Copying Accessory images...
copy "%SOURCE_DIR%\Motor & Marine\seascooter.jpg" "%DEST_DIR%\products\accessories\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\JOBE2P.jpg" "%DEST_DIR%\products\accessories\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\2seaterph_003.jpg" "%DEST_DIR%\products\accessories\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\hotseat.jpg" "%DEST_DIR%\products\accessories\" >nul 2>&1

REM Copy Motorcycle images
echo   • Copying Motorcycle images...
copy "%SOURCE_DIR%\Motor & Marine\Yamaha-Tenere-700-Extreme-Edition.jpg" "%DEST_DIR%\products\motorcycles\" >nul 2>&1

REM Copy Utility images
echo   • Copying Utility images...
copy "%SOURCE_DIR%\Motor & Marine\Yamaha-Electric-Concierge-4-Seat-Action-Image-1.jpg.webp" "%DEST_DIR%\products\utility\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\golf2.jpg" "%DEST_DIR%\products\utility\" >nul 2>&1

REM Copy Hero/Background images
echo   • Copying Hero images...
copy "%SOURCE_DIR%\Motor & Marine\by8i2921-scaled-1.jpg" "%DEST_DIR%\heroes\" >nul 2>&1
copy "%SOURCE_DIR%\Motor & Marine\fxcrho2023.png" "%DEST_DIR%\heroes\" >nul 2>&1

echo.
echo ✅ Asset migration completed!
echo.
echo 📊 Summary:
echo   - Jet Ski images copied
echo   - Boat images copied
echo   - Pearl Craft images copied
echo   - Accessory images copied
echo   - Motorcycle images copied
echo   - Utility images copied
echo.
echo 💡 Note: Some images may need to be renamed or optimized for web use.
echo.
pause
