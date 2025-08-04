// Quick script to help download a sample boat model
// Run this in your browser console while on the Yamaha site

async function downloadSampleBoatModel() {
  console.log('🚢 Downloading sample boat model...');
  
  try {
    // This is a simple boat model for testing
    const modelUrl = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/LittlestTokyo.glb';
    
    const response = await fetch(modelUrl);
    const blob = await response.blob();
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-boat.glb';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log('✅ Download started! Place this file in public/models/boats/');
    console.log('📝 Rename it to match your boat ID (e.g., hook-32.glb)');
  } catch (error) {
    console.error('❌ Download failed:', error);
  }
}

// Instructions for manual download
console.log(`
🎯 To add 3D models to your configurator:

1. Download free boat models from:
   - Sketchfab: https://sketchfab.com/search?q=boat&type=models&features=downloadable
   - TurboSquid: https://www.turbosquid.com/Search/3D-Models/free/boat
   
2. Save as .glb format

3. Place in: public/models/boats/

4. Name the file to match your boat ID:
   - hook-32.glb
   - flash.glb
   - mahar-31.glb

5. The configurator will automatically load the model!

Run downloadSampleBoatModel() to get a test model.
`);