#!/bin/bash
# Script to copy Pearl Craft boat images to Yamaha Bahrain project

echo "Copying Pearl Craft boat images..."

# Source directory
SOURCE_DIR="C:/Users/Faisal/CascadeProjects/Yamaha-extractpic/Pearl Craft"

# Destination directory
DEST_DIR="C:/Users/Faisal/CascadeProjects/yamaha/yamaha-bahrain/public/images/products/boats"

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Copy specific boat images
echo "Copying hook32.png..."
cp "$SOURCE_DIR/hook32.png" "$DEST_DIR/hook32.png"

echo "Copying flash23.png..."
cp "$SOURCE_DIR/flash23.png" "$DEST_DIR/flash23.png"

echo "Copying flash23.jpg..."
cp "$SOURCE_DIR/flash23.jpg" "$DEST_DIR/flash23.jpg"

echo "Copying mahar31.png..."
cp "$SOURCE_DIR/mahar31.png" "$DEST_DIR/mahar31.png"

echo "Copying coastguard.png..."
cp "$SOURCE_DIR/coastguard.png" "$DEST_DIR/coastguard.png"

echo "Copying demo images..."
cp "$SOURCE_DIR/demo.JPG" "$DEST_DIR/demo.JPG"
cp "$SOURCE_DIR/demo2.JPG" "$DEST_DIR/demo2.JPG"

echo "Copying additional boat images..."
cp "$SOURCE_DIR/977ffba9-e9e2-4e8f-8c8c-9bc890316990.JPG" "$DEST_DIR/977ffba9-e9e2-4e8f-8c8c-9bc890316990.JPG"
cp "$SOURCE_DIR/43d422c5-131a-40e4-9420-1566c08fa656.jpeg" "$DEST_DIR/43d422c5-131a-40e4-9420-1566c08fa656.jpeg"
cp "$SOURCE_DIR/552e9c35-a184-47bd-aba7-d8b71db1b5c0.jpeg" "$DEST_DIR/552e9c35-a184-47bd-aba7-d8b71db1b5c0.jpeg"
cp "$SOURCE_DIR/a531805e-8832-4825-adf0-aac537456db8 2.JPG" "$DEST_DIR/a531805e-8832-4825-adf0-aac537456db8_2.JPG"

echo "✅ All Pearl Craft images copied successfully!"
echo "Destination: $DEST_DIR"
