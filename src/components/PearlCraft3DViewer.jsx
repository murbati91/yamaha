import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ZoomIn, ZoomOut, RotateCw, Maximize2, Info, 
  Camera, Play, Pause, ChevronLeft, ChevronRight,
  Anchor, Gauge, Fuel, Users, Waves, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const PearlCraft3DViewer = ({ boat, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [showSpecs, setShowSpecs] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const viewerRef = useRef(null);
  const autoRotateInterval = useRef(null);

  // Get all images for the boat
  const allImages = [boat.images.main, ...(boat.images.angles || [])];

  // Spec icons mapping
  const specIcons = {
    length: Anchor,
    beam: Waves,
    power: Gauge,
    fuel: Fuel,
    capacity: Users,
    draft: Shield,
    topSpeed: Gauge
  };

  // Auto-rotate functionality
  useEffect(() => {
    if (isAutoRotating && allImages.length > 1) {
      autoRotateInterval.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      }, 3000);
    }
    return () => {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current);
      }
    };
  }, [isAutoRotating, allImages.length]);

  // Fullscreen handling
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Touch/Mouse controls
  const handleDragStart = (e) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    const x = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const y = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    setDragStart({ x, y });
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const x = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const deltaX = x - dragStart.x;
    
    // Calculate image index based on drag distance
    const sensitivity = 50; // pixels per image
    const imageOffset = Math.floor(deltaX / sensitivity);
    const newIndex = (currentImageIndex - imageOffset + allImages.length) % allImages.length;
    
    if (newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex);
      setDragStart({ x, y: dragStart.y });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Zoom controls
  const handleZoom = (delta) => {
    setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
          setIsAutoRotating(false);
          break;
        case 'ArrowRight':
          setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
          setIsAutoRotating(false);
          break;
        case '+':
        case '=':
          handleZoom(0.2);
          break;
        case '-':
          handleZoom(-0.2);
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [allImages.length, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl"
        ref={viewerRef}
      >
        <div className="relative w-full h-full flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4 sm:p-6"
          >
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                    <Anchor className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">PEARL CRAFT</span>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">{boat.name}</h2>
                  <p className="text-sm text-gray-300">{boat.category} Boat</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  onClick={() => setShowSpecs(!showSpecs)}
                >
                  <Info className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  onClick={toggleFullscreen}
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Main Viewer */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            <motion.div
              className="relative w-full h-full max-w-7xl mx-auto px-4"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <motion.img
                key={currentImageIndex}
                src={allImages[currentImageIndex]}
                alt={`${boat.name} view ${currentImageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-contain select-none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: zoom,
                  rotate: rotation
                }}
                transition={{ duration: 0.3 }}
                draggable={false}
              />

              {/* Image Navigation */}
              {allImages.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                    onClick={() => {
                      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
                      setIsAutoRotating(false);
                    }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                    onClick={() => {
                      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
                      setIsAutoRotating(false);
                    }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Specs Overlay */}
              <AnimatePresence>
                {showSpecs && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="absolute left-4 sm:left-8 bottom-24 sm:bottom-32 glass-panel p-4 sm:p-6 rounded-xl max-w-sm"
                  >
                    <h3 className="text-lg font-bold text-white mb-4">Specifications</h3>
                    <div className="space-y-3">
                      {Object.entries(boat.specs).map(([key, value]) => {
                        const Icon = specIcons[key] || Info;
                        return (
                          <div key={key} className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-red-500" />
                            <div>
                              <p className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                              <p className="text-sm text-white font-medium">{value}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <p className="text-xs text-gray-400">Price</p>
                      <p className="text-lg font-bold text-red-500">{boat.price}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Features for Military/Coast Guard Models */}
              {boat.id === 'mahar31' && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute right-4 sm:right-8 bottom-24 sm:bottom-32 glass-panel p-4 sm:p-6 rounded-xl max-w-sm"
                >
                  <h3 className="text-lg font-bold text-white mb-4">Military Features</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Self-bailing cockpit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Heavy duty rub rail</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>1250 GPH bilge pump</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Stainless steel bollards</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-400 mt-4">
                    Trusted by National Guard since 1994
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Controls */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6"
          >
            <div className="container mx-auto">
              {/* Image Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex justify-center gap-2 mb-4">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-red-500 scale-110' 
                          : 'border-white/20 hover:border-white/40'
                      }`}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setIsAutoRotating(false);
                      }}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="glass-panel text-white border-white/30"
                  onClick={() => handleZoom(-0.2)}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="glass-panel text-white border-white/30"
                  onClick={() => handleZoom(0.2)}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                
                {allImages.length > 1 && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass-panel text-white border-white/30"
                    onClick={() => setIsAutoRotating(!isAutoRotating)}
                  >
                    {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="outline"
                  className="glass-panel text-white border-white/30"
                  onClick={() => setRotation(prev => prev + 90)}
                >
                  <RotateCw className="w-4 h-4" />
                </Button>
                
                <Button
                  className="btn-yamaha-primary"
                  onClick={() => {
                    // Trigger contact form with product info
                    window.dispatchEvent(new CustomEvent('requestQuote', { 
                      detail: { product: boat } 
                    }));
                  }}
                >
                  Request Quote
                </Button>
              </div>

              {/* Instructions */}
              <p className="text-center text-xs text-gray-400 mt-4">
                Drag to rotate • Use arrow keys to navigate • Press ESC to close
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PearlCraft3DViewer;
