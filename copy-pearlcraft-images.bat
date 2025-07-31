@echo off
REM Script to copy Pearl Craft boat images to Yamaha Bahrain project

echo Copying Pearl Craft boat images...

REM Source directory
set SOURCE_DIR=C:\Users\Faisal\CascadeProjects\Yamaha-extractpic\Pearl Craft

REM Destination directory
set DEST_DIR=C:\Users\Faisal\CascadeProjects\yamaha\yamaha-bahrain\public\images\products\boats

REM Create destination directory if it doesn't exist
if not exist "%DEST_DIR%" mkdir "%DEST_DIR%"

REM Copy specific boat images
echo Copying hook32.png...
copy "%SOURCE_DIR%\hook32.png" "%DEST_DIR%\hook32.png"

echo Copying flash23.png...
copy "%SOURCE_DIR%\flash23.png" "%DEST_DIR%\flash23.png"

echo Copying flash23.jpg...
copy "%SOURCE_DIR%\flash23.jpg" "%DEST_DIR%\flash23.jpg"

echo Copying mahar31.png...
copy "%SOURCE_DIR%\mahar31.png" "%DEST_DIR%\mahar31.png"

echo Copying coastguard.png...
copy "%SOURCE_DIR%\coastguard.png" "%DEST_DIR%\coastguard.png"

echo Copying demo images...
copy "%SOURCE_DIR%\demo.JPG" "%DEST_DIR%\demo.JPG"
copy "%SOURCE_DIR%\demo2.JPG" "%DEST_DIR%\demo2.JPG"

echo Copying additional boat images...
copy "%SOURCE_DIR%\977ffba9-e9e2-4e8f-8c8c-9bc890316990.JPG" "%DEST_DIR%\977ffba9-e9e2-4e8f-8c8c-9bc890316990.JPG"
copy "%SOURCE_DIR%\43d422c5-131a-40e4-9420-1566c08fa656.jpeg" "%DEST_DIR%\43d422c5-131a-40e4-9420-1566c08fa656.jpeg"
copy "%SOURCE_DIR%\552e9c35-a184-47bd-aba7-d8b71db1b5c0.jpeg" "%DEST_DIR%\552e9c35-a184-47bd-aba7-d8b71db1b5c0.jpeg"
copy "%SOURCE_DIR%\a531805e-8832-4825-adf0-aac537456db8 2.JPG" "%DEST_DIR%\a531805e-8832-4825-adf0-aac537456db8_2.JPG"

echo.
echo All Pearl Craft images copied successfully!
echo Destination: %DEST_DIR%

pause
