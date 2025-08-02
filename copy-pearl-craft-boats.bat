@echo off
echo Copying Pearl Craft boat images to Yamaha project...

set SOURCE_DIR=C:\Users\Faisal\CascadeProjects\Yamaha-extractpic\Pearl Craft
set DEST_DIR=C:\Users\Faisal\CascadeProjects\yamaha\yamaha-bahrain\public\images\products\boats

:: Create destination directory if it doesn't exist
if not exist "%DEST_DIR%" mkdir "%DEST_DIR%"

:: Copy Pearl Craft images
echo Copying Pearl Craft boat images...
copy "%SOURCE_DIR%\*.jpg" "%DEST_DIR%\" >nul 2>&1
copy "%SOURCE_DIR%\*.JPG" "%DEST_DIR%\" >nul 2>&1
copy "%SOURCE_DIR%\*.jpeg" "%DEST_DIR%\" >nul 2>&1
copy "%SOURCE_DIR%\*.png" "%DEST_DIR%\" >nul 2>&1

echo Pearl Craft images copied successfully!
echo.
echo Copied files to: %DEST_DIR%
pause