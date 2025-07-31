import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ArrowRight, Play, Pause, Volume2, VolumeX,
  Maximize2, Grid, List, Filter, Search, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { assetCatalog } from '@/data/assetCatalog';
import Advanced3DConfigurator from './Advanced3DConfigurator';

const ModelShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModel, setSelectedModel] = useState(null);
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Combine all products
  const allProducts = [
    ...assetCatalog.jetSkis,
    ...assetCatalog.boats,
    ...assetCatalog.pearlCraft,
    ...assetCatalog.motorcycles
  ];

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'boats' && (product.category.includes('Boat') || assetCatalog.pearlCraft.includes(product))) ||
      (selectedCategory === 'motorcycles' && assetCatalog.motorcycles.includes(product)) ||
      (selectedCategory === 'jetskis' && assetCatalog.jetSkis.includes(product));
    
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'All Models', count: allProducts.length },
    { id: 'boats', name: 'Boats', count: assetCatalog.boats.length + assetCatalog.pearlCraft.length },
    { id: 'motorcycles', name: 'Motorcycles', count: assetCatalog.motorcycles.length },
    { id: 'jetskis', name: 'Jet Skis', count: assetCatalog.jetSkis.length }
  ];

  const handleModelClick = (product) => {
    setSelectedModel(product);
    setShowConfigurator(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/yamaha-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              EXPLORE IN 3D
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience Yamaha & Pearl Craft's premium collection with our revolutionary 3D configurator
            </p>
            <Button 
              className="btn-yamaha-primary text-lg px-8 py-6 group"
              onClick={() => document.getElementById('models').scrollIntoView({ behavior: 'smooth' })}
            >
              View Collection
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Video Controls */}
          <div className="absolute bottom-8 right-8 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="glass-panel text-white border-white/30"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="glass-panel text-white border-white/30"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Model Gallery Section */}
      <section id="models" className="py-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              3D MODEL GALLERY
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-400"
            >
              Click any model to customize in real-time
            </motion.p>
          </div>

          {/* Filters and Search */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    className={selectedCategory === category.id 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'text-white border-white/20 hover:bg-white/10'
                    }
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                    <span className="ml-2 text-xs opacity-60">({category.count})</span>
                  </Button>
                ))}
              </div>

              {/* Search and View Controls */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search models..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                
                <div className="flex gap-1 glass-panel rounded-lg p-1">
                  <Button
                    size="sm"
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    className={viewMode === 'grid' ? 'bg-red-600' : 'text-white hover:bg-white/10'}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    className={viewMode === 'list' ? 'bg-red-600' : 'text-white hover:bg-white/10'}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Model Grid/List */}
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProducts.map((product, index) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                    onClick={() => handleModelClick(product)}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-800/50 to-black/50 backdrop-blur-sm border border-white/10 hover:border-red-500/50 transition-all duration-500">
                      {/* 3D Preview */}
                      <div className="relative h-64 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
                        <img
                          src={product.images.main}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        
                        {/* 3D Badge */}
                        <div className="absolute top-4 right-4 glass-panel px-3 py-1 rounded-full flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-xs text-white">3D Ready</span>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-center">
                            <Maximize2 className="w-8 h-8 text-white mb-2 mx-auto" />
                            <p className="text-white font-semibold">View in 3D</p>
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">{product.category}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-red-500">
                            {typeof product.price === 'number' 
                              ? `BD ${product.price.toLocaleString()}`
                              : product.price
                            }
                          </span>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredProducts.map((product, index) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="glass-panel rounded-xl p-6 flex items-center gap-6 cursor-pointer hover:bg-white/5 transition-all"
                    onClick={() => handleModelClick(product)}
                  >
                    <img
                      src={product.images.main}
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{product.category}</p>
                      <p className="text-gray-300 text-sm">{product.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-red-500 block">
                        {typeof product.price === 'number' 
                          ? `BD ${product.price.toLocaleString()}`
                          : product.price
                        }
                      </span>
                      <Button className="btn-yamaha-primary mt-2">
                        Configure 3D
                      </Button>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No models found matching your criteria</p>
              <Button
                variant="outline"
                className="mt-4 text-white border-white/30 hover:bg-white/10"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 3D Configurator Modal */}
      {showConfigurator && selectedModel && (
        <Advanced3DConfigurator
          product={selectedModel}
          onClose={() => {
            setShowConfigurator(false);
            setSelectedModel(null);
          }}
        />
      )}
    </div>
  );
};

export default ModelShowcase;
