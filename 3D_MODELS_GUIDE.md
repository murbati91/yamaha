# 3D Models Setup Guide for Yamaha Bahrain

## 🎮 Adding 3D Models to Your Products

### Step 1: Prepare Your 3D Models

#### Supported Formats:
- **GLB** (recommended) - Single file, includes textures
- **GLTF** - Separate files for model and textures

#### Model Requirements:
- File size: Under 10MB for optimal loading
- Polygons: 50,000 - 200,000 for best performance
- Textures: 2K resolution recommended
- Format: PBR materials preferred

### Step 2: Where to Get 3D Models

#### Option A: Free Resources
1. **Sketchfab** (https://sketchfab.com)
   - Search for "boat 3d model free"
   - Filter by "Downloadable"
   - Look for CC0 or CC-BY licenses

2. **TurboSquid** (https://www.turbosquid.com)
   - Free 3D models section
   - Filter by file format (GLB/GLTF)

3. **CGTrader** (https://www.cgtrader.com)
   - Free 3D models category
   - High-quality boat and motorcycle models

#### Option B: Create Your Own
1. **Photogrammetry**
   - Use Polycam or RealityCapture
   - Take 100+ photos of the product
   - Process into 3D model

2. **3D Scanning**
   - Use professional 3D scanner
   - Best for accurate models

3. **CAD Conversion**
   - Convert existing CAD files
   - Use Blender or 3DS Max

### Step 3: File Organization

Create this structure in your project:

```
yamaha-bahrain/
└── public/
    └── models/
        ├── boats/
        │   ├── hook-32.glb
        │   ├── mahar-31.glb
        │   ├── flash.glb
        │   └── ...
        ├── motorcycles/
        │   ├── yzf-r1.glb
        │   ├── mt-10.glb
        │   ├── mt-09.glb
        │   └── ...
        └── jetskis/
            ├── gp1800r.glb
            ├── vx-cruiser.glb
            └── ...
```

### Step 4: Update Product Data

Add model paths to your products in `assetCatalog.js`:

```javascript
boats: [
  {
    id: 'hook-32',
    name: 'Hook 32',
    modelPath: '/models/boats/hook-32.glb', // Add this line
    // ... rest of product data
  }
]
```

### Step 5: Optimize 3D Models

Use these tools to optimize before adding:

1. **GLTF Pipeline** (https://github.com/CesiumGS/gltf-pipeline)
   ```bash
   npm install -g gltf-pipeline
   gltf-pipeline -i input.glb -o output.glb -d
   ```

2. **Blender** (Free)
   - Import model
   - Decimate modifier to reduce polygons
   - Export as GLB with compression

3. **Online Tools**
   - https://gltf.report/ - Analyze and optimize
   - https://sandbox.babylonjs.com/ - Test models

### Example 3D Models to Download

#### Boats:
1. Speed Boat: https://sketchfab.com/3d-models/speed-boat-0f0e2b5f7e424ea3b0c0e0b5a6b5e5a5
2. Yacht: https://sketchfab.com/3d-models/yacht-free-3d-model
3. Fishing Boat: https://sketchfab.com/3d-models/fishing-boat-low-poly

#### Motorcycles:
1. Sport Bike: https://sketchfab.com/3d-models/sport-bike-free
2. Cruiser: https://sketchfab.com/3d-models/motorcycle-cruiser
3. Adventure Bike: https://sketchfab.com/3d-models/adventure-motorcycle

#### Jet Skis:
1. Jet Ski: https://sketchfab.com/3d-models/jet-ski-free-download
2. Sea Scooter: https://sketchfab.com/3d-models/sea-scooter-3d-model

### Step 6: Test Your Models

1. Place the GLB file in `/public/models/`
2. Update the product with `modelPath`
3. Open the 3D configurator
4. Check loading and performance

### Troubleshooting

#### Model Not Loading:
- Check file path is correct
- Ensure file is in public folder
- Check browser console for errors
- Verify file size < 10MB

#### Performance Issues:
- Reduce polygon count
- Compress textures
- Use GLB instead of GLTF
- Enable draco compression

#### Material Issues:
- Use PBR materials
- Check texture paths
- Ensure metalness/roughness maps

### Advanced Features

#### Adding Animations:
```javascript
// In your model component
const { animations } = useGLTF(modelPath);
const { actions } = useAnimations(animations, modelRef);

useEffect(() => {
  actions?.idle?.play();
}, [actions]);
```

#### Dynamic Part Colors:
```javascript
// Color specific parts
scene.traverse((child) => {
  if (child.name === 'Hull') {
    child.material.color.set(primaryColor);
  }
});
```

#### LOD (Level of Detail):
- Create 3 versions: high, medium, low
- Load based on device performance
- Switch based on camera distance

### Recommended Workflow

1. **Find/Create Model**
   - Download from Sketchfab
   - Or create with photogrammetry

2. **Optimize in Blender**
   - Reduce polygons to ~100k
   - Bake textures to 2K
   - Export as GLB

3. **Test Locally**
   - Place in /public/models/
   - Update product data
   - Test in configurator

4. **Deploy**
   - Commit to git
   - Push to deploy

### Performance Tips

- **Target Specs:**
  - File size: 3-5MB
  - Polygons: 50k-150k
  - Textures: 2048x2048
  - Draw calls: < 50

- **Mobile Optimization:**
  - Use compressed textures
  - Reduce shadow resolution
  - Limit real-time reflections
  - Use baked lighting

### Example Implementation

```javascript
// In assetCatalog.js
export const assetCatalog = {
  boats: [
    {
      id: 'hook-32',
      name: 'Hook 32',
      category: 'Performance Boat',
      modelPath: '/models/boats/hook-32.glb', // 3D model
      images: {
        main: '/images/boats/hook-32-main.jpg',
        angles: [
          '/images/boats/hook-32-side.jpg',
          '/images/boats/hook-32-rear.jpg'
        ]
      },
      specs: {
        length: "31' 10\"",
        beam: "8' 6\"",
        weight: '2100 kg',
        capacity: 8
      },
      price: 65000,
      description: 'High-performance patrol boat'
    }
  ]
};
```

## 🚀 Quick Start

1. Download a free boat model from Sketchfab
2. Save as `hook-32.glb` in `/public/models/boats/`
3. Add `modelPath: '/models/boats/hook-32.glb'` to the Hook 32 product
4. Open the configurator to see your 3D model!

---

Need help? Contact support or check the console for detailed error messages.
