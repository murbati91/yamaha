import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Palette, Anchor, Shield, Music, Navigation, 
  Wifi, Camera, Fish, Save, Share2, ShoppingCart,
  Check, ChevronRight, Sparkles, Gauge
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/helpers';

const BoatCustomizer = ({ boat, onClose }) => {
  const [currentView, setCurrentView] = useState('exterior');
  const [selectedOptions, setSelectedOptions] = useState({
    hullColor: 'classic-white',
    stripe: 'yamaha-racing',
    engine: 'standard',
    seating: 'standard',
    electronics: [],
    accessories: []
  });
  const [totalPrice, setTotalPrice] = useState(boat.price || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Customization options
  const customOptions = {
    hullColors: [
      { id: 'classic-white', name: 'Classic White', hex: '#FFFFFF', price: 0 },
      { id: 'pearl-white', name: 'Pearl White', hex: '#F8F8FF', price: 500 },
      { id: 'midnight-black', name: 'Midnight Black', hex: '#0A0A0A', price: 800 },
      { id: 'ocean-blue', name: 'Ocean Blue', hex: '#1E40AF', price: 800 },
      { id: 'racing-red', name: 'Racing Red', hex: '#DC2626', price: 800 },
      { id: 'gunmetal-gray', name: 'Gunmetal Gray', hex: '#4B5563', price: 600 }
    ],
    stripes: [
      { id: 'none', name: 'No Stripes', price: 0 },
      { id: 'yamaha-racing', name: 'Yamaha Racing', price: 1200 },
      { id: 'pearl-craft', name: 'Pearl Craft Signature', price: 1500 },
      { id: 'carbon-fiber', name: 'Carbon Fiber', price: 2500 },
      { id: 'custom', name: 'Custom Design', price: 3000 }
    ],
    engines: [
      { id: 'standard', name: 'Standard Configuration', price: 0 },
      { id: 'twin-300', name: 'Twin 300HP Upgrade', price: 12000 },
      { id: 'twin-350', name: 'Twin 350HP Racing', price: 18000 }
    ],
    seating: [
      { id: 'standard', name: 'Standard Seating', price: 0 },
      { id: 'premium-leather', name: 'Premium Leather', price: 3500 },
      { id: 'racing-buckets', name: 'Racing Bucket Seats', price: 5000 },
      { id: 'luxury-lounge', name: 'Luxury Lounge Package', price: 8000 }
    ],
    electronics: [
      { id: 'garmin-gps', name: 'Garmin GPS System', price: 2500, icon: Navigation },
      { id: 'fusion-audio', name: 'Fusion Marine Audio', price: 3500, icon: Music },
      { id: 'flir-camera', name: 'FLIR Night Vision', price: 8000, icon: Camera },
      { id: 'starlink', name: 'Starlink Maritime', price: 5000, icon: Wifi },
      { id: 'fish-finder', name: 'Advanced Fish Finder', price: 2000, icon: Fish },
      { id: 'radar', name: 'Marine Radar System', price: 4500, icon: Shield }
    ],
    accessories: [
      { id: 'bimini-top', name: 'Bimini Top', price: 1500 },
      { id: 'wakeboard-tower', name: 'Wakeboard Tower', price: 3500 },
      { id: 'underwater-lights', name: 'Underwater LED Lights', price: 2000 },
      { id: 'anchor-windlass', name: 'Electric Anchor Windlass', price: 3000 },
      { id: 'teak-decking', name: 'Teak Decking', price: 8000 },
      { id: 'custom-cover', name: 'Custom Boat Cover', price: 1200 }
    ]
  };

  // Calculate total price
  useEffect(() => {
    let basePrice = typeof boat.price === 'number' ? boat.price : 50000;
    
    // Add hull color
    const hullColor = customOptions.hullColors.find(c => c.id === selectedOptions.hullColor);
    if (hullColor) basePrice += hullColor.price;
    
    // Add stripe
    const stripe = customOptions.stripes.find(s => s.id === selectedOptions.stripe);
    if (stripe) basePrice += stripe.price;
    
    // Add engine
    const engine = customOptions.engines.find(e => e.id === selectedOptions.engine);
    if (engine) basePrice += engine.price;
    
    // Add seating
    const seating = customOptions.seating.find(s => s.id === selectedOptions.seating);
    if (seating) basePrice += seating.price;
    
    // Add electronics
    selectedOptions.electronics.forEach(elecId => {
      const elec = customOptions.electronics.find(e => e.id === elecId);
      if (elec) basePrice += elec.price;
    });
    
    // Add accessories
    selectedOptions.accessories.forEach(accId => {
      const acc = customOptions.accessories.find(a => a.id === accId);
      if (acc) basePrice += acc.price;
    });
    
    setTotalPrice(basePrice);
  }, [selectedOptions, boat.price]);

  const toggleElectronic = (id) => {
    setSelectedOptions(prev => ({
      ...prev,
      electronics: prev.electronics.includes(id)
        ? prev.electronics.filter(e => e !== id)
        : [...prev.electronics, id]
    }));
  };

  const toggleAccessory = (id) => {
    setSelectedOptions(prev => ({
      ...prev,
      accessories: prev.accessories.includes(id)
        ? prev.accessories.filter(a => a !== id)
        : [...prev.accessories, id]
    }));
  };

  const handleSaveConfiguration = () => {
    setIsLoading(true);
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      setShowSummary(true);
    }, 1500);
  };

  const handleRequestQuote = () => {
    const configuration = {
      boat,
      customization: selectedOptions,
      totalPrice
    };
    
    // Trigger quote request
    window.dispatchEvent(new CustomEvent('requestCustomQuote', { 
      detail: configuration 
    }));
    
    // You could also save to localStorage
    localStorage.setItem('boatConfiguration', JSON.stringify(configuration));
    
    alert('Your configuration has been saved. Our team will contact you with a detailed quote.');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto"
      >
        <div className="min-h-screen p-4 sm:p-6">
          {/* Header */}
          <div className="container mx-auto mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Customize Your {boat.name}
                </h2>
                <p className="text-gray-400 mt-2">Build your dream boat</p>
              </div>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={onClose}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>

          <div className="container mx-auto grid lg:grid-cols-3 gap-8">
            {/* Left Panel - Options */}
            <div className="lg:col-span-2 space-y-6">
              {/* View Tabs */}
              <div className="flex gap-2">
                {['exterior', 'interior', 'performance', 'electronics'].map((view) => (
                  <Button
                    key={view}
                    size="sm"
                    variant={currentView === view ? 'default' : 'outline'}
                    className={currentView === view 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'text-white border-white/20 hover:bg-white/10'
                    }
                    onClick={() => setCurrentView(view)}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </Button>
                ))}
              </div>

              {/* Customization Options */}
              <div className="glass-panel rounded-xl p-6">
                {currentView === 'exterior' && (
                  <div className="space-y-8">
                    {/* Hull Color */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Palette className="w-5 h-5 text-red-500" />
                        Hull Color
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                        {customOptions.hullColors.map((color) => (
                          <button
                            key={color.id}
                            className={`relative group ${
                              selectedOptions.hullColor === color.id ? 'ring-2 ring-red-500' : ''
                            }`}
                            onClick={() => setSelectedOptions(prev => ({ ...prev, hullColor: color.id }))}
                          >
                            <div 
                              className="w-full h-16 rounded-lg border-2 border-white/20 transition-all group-hover:scale-105"
                              style={{ backgroundColor: color.hex }}
                            />
                            <p className="text-xs text-gray-300 mt-2">{color.name}</p>
                            {color.price > 0 && (
                              <p className="text-xs text-red-400">+{formatCurrency(color.price)}</p>
                            )}
                            {selectedOptions.hullColor === color.id && (
                              <div className="absolute top-1 right-1 bg-red-500 rounded-full p-1">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Stripes */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-red-500" />
                        Graphics & Stripes
                      </h3>
                      <div className="space-y-3">
                        {customOptions.stripes.map((stripe) => (
                          <label
                            key={stripe.id}
                            className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedOptions.stripe === stripe.id
                                ? 'border-red-500 bg-red-500/10'
                                : 'border-white/20 hover:border-white/40'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="stripe"
                                value={stripe.id}
                                checked={selectedOptions.stripe === stripe.id}
                                onChange={() => setSelectedOptions(prev => ({ ...prev, stripe: stripe.id }))}
                                className="text-red-500"
                              />
                              <span className="text-white">{stripe.name}</span>
                            </div>
                            {stripe.price > 0 && (
                              <span className="text-red-400">+{formatCurrency(stripe.price)}</span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentView === 'interior' && (
                  <div className="space-y-8">
                    {/* Seating */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Seating Options</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {customOptions.seating.map((seat) => (
                          <label
                            key={seat.id}
                            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedOptions.seating === seat.id
                                ? 'border-red-500 bg-red-500/10'
                                : 'border-white/20 hover:border-white/40'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <input
                                type="radio"
                                name="seating"
                                value={seat.id}
                                checked={selectedOptions.seating === seat.id}
                                onChange={() => setSelectedOptions(prev => ({ ...prev, seating: seat.id }))}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <h4 className="text-white font-medium">{seat.name}</h4>
                                {seat.price > 0 && (
                                  <p className="text-red-400 text-sm mt-1">+{formatCurrency(seat.price)}</p>
                                )}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentView === 'performance' && (
                  <div className="space-y-8">
                    {/* Engine Options */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Gauge className="w-5 h-5 text-red-500" />
                        Engine Configuration
                      </h3>
                      <div className="space-y-4">
                        {customOptions.engines.map((engine) => (
                          <label
                            key={engine.id}
                            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedOptions.engine === engine.id
                                ? 'border-red-500 bg-red-500/10'
                                : 'border-white/20 hover:border-white/40'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="engine"
                                  value={engine.id}
                                  checked={selectedOptions.engine === engine.id}
                                  onChange={() => setSelectedOptions(prev => ({ ...prev, engine: engine.id }))}
                                />
                                <div>
                                  <h4 className="text-white font-medium">{engine.name}</h4>
                                  {engine.id === 'twin-350' && (
                                    <p className="text-sm text-gray-400">Maximum performance package</p>
                                  )}
                                </div>
                              </div>
                              {engine.price > 0 && (
                                <span className="text-red-400 font-semibold">+{formatCurrency(engine.price)}</span>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentView === 'electronics' && (
                  <div className="space-y-8">
                    {/* Electronics */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Marine Electronics</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {customOptions.electronics.map((item) => {
                          const Icon = item.icon;
                          return (
                            <label
                              key={item.id}
                              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                selectedOptions.electronics.includes(item.id)
                                  ? 'border-red-500 bg-red-500/10'
                                  : 'border-white/20 hover:border-white/40'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <input
                                  type="checkbox"
                                  checked={selectedOptions.electronics.includes(item.id)}
                                  onChange={() => toggleElectronic(item.id)}
                                  className="mt-1"
                                />
                                <Icon className="w-5 h-5 text-red-500" />
                                <div className="flex-1">
                                  <h4 className="text-white font-medium">{item.name}</h4>
                                  <p className="text-red-400 text-sm mt-1">+{formatCurrency(item.price)}</p>
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Accessories */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Accessories</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {customOptions.accessories.map((item) => (
                          <label
                            key={item.id}
                            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedOptions.accessories.includes(item.id)
                                ? 'border-red-500 bg-red-500/10'
                                : 'border-white/20 hover:border-white/40'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                checked={selectedOptions.accessories.includes(item.id)}
                                onChange={() => toggleAccessory(item.id)}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <h4 className="text-white font-medium">{item.name}</h4>
                                <p className="text-red-400 text-sm mt-1">+{formatCurrency(item.price)}</p>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Summary */}
            <div className="lg:col-span-1">
              <div className="glass-panel rounded-xl p-6 sticky top-6">
                {/* Boat Preview */}
                <div className="mb-6">
                  <img 
                    src={boat.images.main} 
                    alt={boat.name}
                    className="w-full rounded-lg"
                  />
                </div>

                {/* Configuration Summary */}
                <h3 className="text-xl font-semibold text-white mb-4">Your Configuration</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Base Price</span>
                    <span className="text-white">{formatCurrency(boat.price || 0)}</span>
                  </div>
                  
                  {/* Selected Options */}
                  {selectedOptions.hullColor !== 'classic-white' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Hull Color</span>
                      <span className="text-white">
                        +{formatCurrency(customOptions.hullColors.find(c => c.id === selectedOptions.hullColor)?.price || 0)}
                      </span>
                    </div>
                  )}
                  
                  {selectedOptions.stripe !== 'none' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Graphics</span>
                      <span className="text-white">
                        +{formatCurrency(customOptions.stripes.find(s => s.id === selectedOptions.stripe)?.price || 0)}
                      </span>
                    </div>
                  )}
                  
                  {selectedOptions.electronics.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Electronics ({selectedOptions.electronics.length})</span>
                      <span className="text-white">
                        +{formatCurrency(
                          selectedOptions.electronics.reduce((sum, id) => {
                            const item = customOptions.electronics.find(e => e.id === id);
                            return sum + (item?.price || 0);
                          }, 0)
                        )}
                      </span>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t border-white/20">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-white">Total Price</span>
                      <span className="text-2xl font-bold text-red-500">
                        {formatCurrency(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button 
                    className="btn-yamaha-primary w-full"
                    onClick={handleSaveConfiguration}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Configuration
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full text-white border-white/30 hover:bg-white/10"
                    onClick={handleRequestQuote}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Request Quote
                  </Button>
                  
                  <Button 
                    variant="ghost"
                    className="w-full text-gray-400 hover:text-white"
                    onClick={() => {
                      const config = JSON.stringify(selectedOptions);
                      navigator.clipboard.writeText(config);
                      alert('Configuration copied to clipboard!');
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Configuration
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Modal */}
          {showSummary && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowSummary(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-panel rounded-xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Configuration Saved!</h3>
                  <p className="text-gray-300 mb-6">
                    Your custom {boat.name} configuration has been saved. Our team will contact you within 24 hours with a detailed quote.
                  </p>
                  <Button 
                    className="btn-yamaha-primary"
                    onClick={() => {
                      setShowSummary(false);
                      onClose();
                    }}
                  >
                    Done
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BoatCustomizer;
