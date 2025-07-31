import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, Minus, Info, Download, Share2,
  Anchor, Gauge, Fuel, Users, Waves, Shield, 
  DollarSign, Zap, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { assetCatalog } from '@/data/assetCatalog';

const BoatComparisonTool = ({ onClose, initialBoats = [] }) => {
  const [selectedBoats, setSelectedBoats] = useState(initialBoats);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Get all boats including Pearl Craft
  const allBoats = [
    ...assetCatalog.boats,
    ...assetCatalog.pearlCraft
  ];

  // Spec icons mapping
  const specIcons = {
    length: Anchor,
    beam: Waves,
    power: Gauge,
    fuel: Fuel,
    capacity: Users,
    draft: Shield,
    topSpeed: Zap,
    engines: Activity,
    fuelCapacity: Fuel,
    horsepower: Gauge
  };

  // Add/Remove boat from comparison
  const toggleBoat = (boat) => {
    if (selectedBoats.find(b => b.id === boat.id)) {
      setSelectedBoats(selectedBoats.filter(b => b.id !== boat.id));
    } else if (selectedBoats.length < 3) {
      setSelectedBoats([...selectedBoats, boat]);
    }
  };

  // Get all unique specs across selected boats
  const getAllSpecs = () => {
    const specs = new Set();
    selectedBoats.forEach(boat => {
      Object.keys(boat.specs || {}).forEach(key => specs.add(key));
    });
    return Array.from(specs);
  };

  // Export comparison as PDF/Image
  const exportComparison = () => {
    // Implementation for export functionality
    alert('Export feature coming soon!');
  };

  // Share comparison
  const shareComparison = () => {
    const boatIds = selectedBoats.map(b => b.id).join(',');
    const url = `${window.location.origin}/compare?boats=${boatIds}`;
    navigator.clipboard.writeText(url);
    alert('Comparison link copied to clipboard!');
  };

  // Normalize spec values for comparison
  const normalizeSpec = (value) => {
    if (typeof value === 'string') {
      // Extract numeric values from strings
      const match = value.match(/(\d+)/);
      return match ? parseInt(match[1]) : value;
    }
    return value;
  };

  // Compare spec values
  const compareSpecs = (spec, boats) => {
    const values = boats.map(boat => normalizeSpec(boat.specs?.[spec]));
    const numericValues = values.filter(v => typeof v === 'number');
    
    if (numericValues.length === values.length) {
      const max = Math.max(...numericValues);
      const min = Math.min(...numericValues);
      return { max, min, isNumeric: true };
    }
    
    return { isNumeric: false };
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto">
      <div className="min-h-screen p-4 sm:p-6">
        {/* Header */}
        <div className="container mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Boat Comparison</h2>
              <p className="text-gray-400 mt-2">Compare up to 3 boats side by side</p>
            </div>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              size="sm"
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              className={activeCategory === 'all' 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'text-white border-white/20 hover:bg-white/10'
              }
              onClick={() => setActiveCategory('all')}
            >
              All Boats
            </Button>
            <Button
              size="sm"
              variant={activeCategory === 'sport' ? 'default' : 'outline'}
              className={activeCategory === 'sport' 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'text-white border-white/20 hover:bg-white/10'
              }
              onClick={() => setActiveCategory('sport')}
            >
              Sport Boats
            </Button>
            <Button
              size="sm"
              variant={activeCategory === 'pearlcraft' ? 'default' : 'outline'}
              className={activeCategory === 'pearlcraft' 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'text-white border-white/20 hover:bg-white/10'
              }
              onClick={() => setActiveCategory('pearlcraft')}
            >
              Pearl Craft
            </Button>
          </div>

          {/* Boat Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {allBoats
              .filter(boat => 
                activeCategory === 'all' || 
                (activeCategory === 'sport' && !assetCatalog.pearlCraft.includes(boat)) ||
                (activeCategory === 'pearlcraft' && assetCatalog.pearlCraft.includes(boat))
              )
              .map(boat => {
                const isSelected = selectedBoats.find(b => b.id === boat.id);
                const isDisabled = !isSelected && selectedBoats.length >= 3;
                
                return (
                  <motion.div
                    key={boat.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      className={`relative w-full glass-panel p-4 rounded-xl transition-all ${
                        isSelected 
                          ? 'ring-2 ring-red-500 bg-red-500/10' 
                          : isDisabled
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-white/5'
                      }`}
                      onClick={() => !isDisabled && toggleBoat(boat)}
                    >
                      <img 
                        src={boat.images.main} 
                        alt={boat.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="text-white font-semibold text-sm">{boat.name}</h4>
                      <p className="text-gray-400 text-xs">{boat.category}</p>
                      
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  </motion.div>
                );
              })}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedBoats.length > 0 && (
          <div className="container mx-auto">
            <div className="glass-panel rounded-xl overflow-hidden">
              {/* Action Buttons */}
              <div className="p-4 border-b border-white/10 flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-white border-white/20 hover:bg-white/10"
                  onClick={exportComparison}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-white border-white/20 hover:bg-white/10"
                  onClick={shareComparison}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-4 text-left text-gray-400 font-medium">Feature</th>
                      {selectedBoats.map(boat => (
                        <th key={boat.id} className="p-4 text-center">
                          <div className="space-y-2">
                            <img 
                              src={boat.images.main} 
                              alt={boat.name}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <h3 className="text-white font-bold">{boat.name}</h3>
                            <p className="text-gray-400 text-sm">{boat.category}</p>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-gray-400 hover:text-white"
                              onClick={() => toggleBoat(boat)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Price Row */}
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-400 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Price
                      </td>
                      {selectedBoats.map(boat => (
                        <td key={boat.id} className="p-4 text-center">
                          <span className="text-lg font-bold text-red-500">
                            {typeof boat.price === 'number' 
                              ? `BD ${boat.price.toLocaleString()}`
                              : boat.price
                            }
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Specs Rows */}
                    {getAllSpecs().map(spec => {
                      const Icon = specIcons[spec] || Info;
                      const comparison = compareSpecs(spec, selectedBoats);
                      
                      return (
                        <tr key={spec} className="border-b border-white/10">
                          <td className="p-4 text-gray-400 flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <span className="capitalize">
                              {spec.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          </td>
                          {selectedBoats.map(boat => {
                            const value = boat.specs?.[spec];
                            const numericValue = normalizeSpec(value);
                            const isMax = comparison.isNumeric && numericValue === comparison.max;
                            const isMin = comparison.isNumeric && numericValue === comparison.min;
                            
                            return (
                              <td key={boat.id} className="p-4 text-center">
                                {value ? (
                                  <span className={`
                                    ${isMax ? 'text-green-500 font-bold' : ''}
                                    ${isMin && comparison.max !== comparison.min ? 'text-gray-500' : ''}
                                    ${!isMax && !isMin ? 'text-white' : ''}
                                  `}>
                                    {value}
                                  </span>
                                ) : (
                                  <Minus className="w-4 h-4 text-gray-600 mx-auto" />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}

                    {/* Special Features Row */}
                    <tr>
                      <td className="p-4 text-gray-400">Special Features</td>
                      {selectedBoats.map(boat => (
                        <td key={boat.id} className="p-4">
                          <ul className="text-sm text-gray-300 space-y-1">
                            {boat.id === 'hook32' && (
                              <>
                                <li>• Military Grade</li>
                                <li>• 61 knots top speed</li>
                                <li>• Supplied to Navy</li>
                              </>
                            )}
                            {boat.id === 'flash23' && (
                              <>
                                <li>• Agile & Dynamic</li>
                                <li>• Shallow water capable</li>
                                <li>• Family friendly</li>
                              </>
                            )}
                            {boat.id === 'mahar31' && (
                              <>
                                <li>• Coast Guard spec</li>
                                <li>• Self-bailing cockpit</li>
                                <li>• 9" draft only</li>
                              </>
                            )}
                            {boat.id === '275sd' && (
                              <>
                                <li>• Sport Deck design</li>
                                <li>• Twin engines</li>
                                <li>• 12 person capacity</li>
                              </>
                            )}
                            {boat.id === 'ar250' && (
                              <>
                                <li>• Wakeboard tower</li>
                                <li>• Premium sound</li>
                                <li>• Sport performance</li>
                              </>
                            )}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* CTA Section */}
              <div className="p-6 border-t border-white/10 text-center">
                <p className="text-gray-400 mb-4">
                  Need help choosing the right boat? Our marine experts are here to assist.
                </p>
                <div className="flex justify-center gap-4">
                  <Button className="btn-yamaha-primary">
                    Schedule Consultation
                  </Button>
                  <Button 
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10"
                  >
                    Download Brochure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {selectedBoats.length === 0 && (
          <div className="container mx-auto text-center py-12">
            <div className="glass-panel rounded-xl p-12">
              <Anchor className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Select boats to compare
              </h3>
              <p className="text-gray-400">
                Choose up to 3 boats from the grid above to see a detailed comparison
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoatComparisonTool;
