# 🚢 Adding 3D Boat Models to Yamaha Bahrain

## 📁 Current Issue
The 3D configurator is using procedurally generated geometry instead of realistic boat models because no 3D model files are present in the project.

## 🎯 Solution: Add Real 3D Models

### 1. **File Structure**
Place your 3D models in:
```
public/models/boats/
├── hook-32.glb
├── flash.glb
├── mahar-31.glb
└── ...
```

### 2. **Supported Formats**
- **Recommended**: `.glb` (Binary GLTF) - Smaller file size, includes textures
- **Alternative**: `.gltf` (JSON GLTF) - Human-readable, separate texture files

### 3. **Where to Get 3D Boat Models**

#### Free Resources:
1. **Sketchfab** (https://sketchfab.com)
   - Search for "boat" or "speedboat"
   - Filter by "Downloadable" and "Free"
   - Download as GLTF/GLB

2. **TurboSquid** (https://www.turbosquid.com)
   - Free 3D models section
   - Search for boats

3. **CGTrader** (https://www.cgtrader.com)
   - Free 3D models available
   - Good quality boat models

4. **Poly Haven** (https://polyhaven.com)
   - High-quality free models

#### Create Your Own:
1. **Photogrammetry**: Use photos of actual boats
   - Tools: Meshroom, RealityCapture
   
2. **3D Modeling Software**:
   - Blender (Free) - https://www.blender.org
   - Export as GLB format

3. **AI-Generated Models**:
   - Use tools like Meshy.ai or Kaedim3D
   - Convert boat images to 3D models

### 4. **Optimizing Models for Web**

```bash
# Install gltf-pipeline
npm install -g gltf-pipeline

# Optimize your model
gltf-pipeline -i boat.gltf -o boat-optimized.glb -d
```

**Target Specifications:**
- File size: < 5MB per model
- Polygons: < 50,000 for smooth performance
- Textures: 2048x2048 max

### 5. **Update Asset Catalog**

Add model paths to your boat data:

```javascript
// src/data/assetCatalog.js
export const assetCatalog = {
  pearlCraft: [
    {
      id: 'hook-32',
      name: 'Hook 32',
      modelPath: '/models/boats/hook-32.glb', // Add this
      // ... rest of data
    }
  ]
}
```

### 6. **Quick Solution: Download Example Models**

Here are some boat models you can use:

1. **Generic Speedboat**: 
   ```
   https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/speedboat/model.gltf
   ```

2. **Simple Boat**:
   ```
   https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb
   ```

### 7. **Testing Your Models**

1. Place the `.glb` file in `public/models/boats/`
2. Update your boat data with the model path
3. Refresh the configurator
4. The real 3D model should now appear

## 🚀 Immediate Action Items

1. **For Testing**: Download a free boat model from Sketchfab
2. **Name it**: `hook-32.glb`
3. **Place in**: `public/models/boats/`
4. **Test**: Open the configurator for Hook 32

## 💡 Pro Tips

- Keep models under 5MB for fast loading
- Use Draco compression for large models
- Pre-load models for better UX
- Consider LOD (Level of Detail) for mobile

## 📞 Need Help?

If you need custom 3D models created:
- Contact local 3D artists
- Use services like Fiverr or Upwork
- Consider hiring a 3D modeler for accurate Pearl Craft models

---

Until you add real models, the improved procedural model will provide a better visual than the basic boxes.