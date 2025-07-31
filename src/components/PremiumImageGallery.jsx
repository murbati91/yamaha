import { useEffect, useRef, useState } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import PhotoSwipe from 'photoswipe'
import 'photoswipe/style.css'
import { motion } from 'framer-motion'
import { ZoomIn, Grid, List, Filter, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { assetCatalog, getAllProducts } from '@/data/assetCatalog'
import { trackEvent } from '@/services/analytics'

const PremiumImageGallery = () => {
  const galleryRef = useRef(null)
  const [filter, setFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [lightbox, setLightbox] = useState(null)

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'jetskis', name: 'Jet Skis' },
    { id: 'boats', name: 'Boats' },
    { id: 'pearlcraft', name: 'Pearl Craft' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'motorcycles', name: 'Motorcycles' },
    { id: 'utility', name: 'Utility' }
  ]

  // Get filtered products
  const getFilteredProducts = () => {
    if (filter === 'all') return getAllProducts()
    
    switch (filter) {
      case 'jetskis': return assetCatalog.jetSkis
      case 'boats': return assetCatalog.boats
      case 'pearlcraft': return assetCatalog.pearlCraft
      case 'accessories': return assetCatalog.accessories
      case 'motorcycles': return assetCatalog.motorcycles
      case 'utility': return assetCatalog.utility
      default: return getAllProducts()
    }
  }

  const filteredProducts = getFilteredProducts()

  // Initialize PhotoSwipe
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#premium-gallery',
      children: 'a',
      pswpModule: PhotoSwipe,
      
      // Options
      showHideAnimationType: 'fade',
      bgOpacity: 0.95,
      spacing: 0.1,
      allowPanToNext: true,
      pinchToClose: true,
      closeOnVerticalDrag: true,
      
      // UI Options
      arrowPrev: true,
      arrowNext: true,
      zoom: true,
      close: true,
      counter: true,
      
      // Custom UI
      uiElements: [
        {
          name: 'download-button',
          order: 9,
          isButton: true,
          html: {
            isCustomSVG: true,
            inner: '<path d="M15 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7l-5-5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2v5h5M12 18v-6M9 15l3 3 3-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
            outlineID: 'pswp__icn-download'
          },
          appendTo: 'bar',
          onClick: (e, el, pswpInstance) => {
            const currSlide = pswpInstance.currSlide
            const link = document.createElement('a')
            link.href = currSlide.data.src
            link.download = currSlide.data.alt || 'yamaha-product.jpg'
            link.click()
            trackEvent.track('gallery_image_download')
          }
        }
      ],
      
      // Custom styling
      paddingFn: () => {
        return { top: 40, bottom: 40, left: 40, right: 40 }
      }
    })

    // Custom caption
    lightbox.on('uiRegister', function() {
      lightbox.pswp.ui.registerElement({
        name: 'custom-caption',
        appendTo: 'root',
        onInit: (el, pswp) => {
          lightbox.pswp.on('change', () => {
            const currSlide = lightbox.pswp.currSlide
            el.innerHTML = currSlide.data.element?.getAttribute('data-caption') || ''
          })
        }
      })
    })

    lightbox.init()
    setLightbox(lightbox)

    return () => {
      lightbox.destroy()
    }
  }, [])

  // Generate gallery items
  const generateGalleryItems = () => {
    const items = []
    
    filteredProducts.forEach(product => {
      // Add main image
      items.push({
        product,
        src: product.images.main,
        caption: `${product.name} - ${product.category}`,
        isMain: true
      })
      
      // Add additional angles
      if (product.images.angles) {
        product.images.angles.forEach((angle, index) => {
          items.push({
            product,
            src: angle,
            caption: `${product.name} - View ${index + 2}`,
            isMain: false
          })
        })
      }
    })
    
    return items
  }

  const galleryItems = generateGalleryItems()

  const handleImageClick = (item) => {
    trackEvent.viewProduct(item.product)
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Product Gallery
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our complete collection of Yamaha marine products, boats, and accessories
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                onClick={() => setFilter(category.id)}
                variant={filter === category.id ? 'default' : 'outline'}
                className={filter === category.id 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'text-white border-white/20 hover:bg-white/10'
                }
              >
                {category.name}
                {filter === category.id && (
                  <Badge className="ml-2 bg-white/20">
                    {filter === 'all' 
                      ? galleryItems.length 
                      : filteredProducts.length
                    }
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* View Mode */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' 
                ? 'bg-white/10 text-white' 
                : 'text-white/60 hover:text-white'
              }
            >
              <Grid className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' 
                ? 'bg-white/10 text-white' 
                : 'text-white/60 hover:text-white'
              }
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          id="premium-gallery"
          ref={galleryRef}
          className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-6'
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {galleryItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.src}
              data-pswp-width={1920}
              data-pswp-height={1080}
              data-caption={item.caption}
              onClick={() => handleImageClick(item)}
              className={`group relative overflow-hidden rounded-lg ${
                viewMode === 'list' 
                  ? 'flex gap-6 bg-gray-900 p-4' 
                  : 'block aspect-[4/3]'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={viewMode === 'list' ? 'w-48 h-32' : 'relative h-full'}>
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {item.product.category}
                    </p>
                    {item.product.price && (
                      <p className="text-red-500 font-bold mt-1">
                        {typeof item.product.price === 'number' 
                          ? `BHD ${item.product.price.toLocaleString()}`
                          : item.product.price
                        }
                      </p>
                    )}
                  </div>
                  
                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4">
                    <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Badge for main images */}
                {item.isMain && viewMode === 'grid' && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600 text-white">
                      Main
                    </Badge>
                  </div>
                )}
              </div>

              {/* List View Details */}
              {viewMode === 'list' && (
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-xl mb-2">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {item.product.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    {item.product.specs && Object.entries(item.product.specs).slice(0, 3).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-gray-500 capitalize">{key}:</span>
                        <span className="text-white ml-2 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                  {item.product.price && (
                    <p className="text-red-500 font-bold text-xl mt-4">
                      {typeof item.product.price === 'number' 
                        ? `BHD ${item.product.price.toLocaleString()}`
                        : item.product.price
                      }
                    </p>
                  )}
                </div>
              )}
            </motion.a>
          ))}
        </motion.div>

        {/* Empty State */}
        {galleryItems.length === 0 && (
          <div className="text-center py-20">
            <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No products found in this category</p>
          </div>
        )}
      </div>

      {/* Custom PhotoSwipe Styles */}
      <style jsx global>{`
        .pswp {
          --pswp-bg: #0A0A0A;
          --pswp-placeholder-bg: #1A1A1A;
          --pswp-icon-color: #FFFFFF;
          --pswp-icon-color-secondary: #9CA3AF;
          --pswp-icon-stroke-color: #DC2626;
          --pswp-icon-stroke-width: 2;
        }
        
        .pswp__custom-caption {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          color: white;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          text-align: center;
          max-width: 90%;
        }
        
        .pswp__button--download {
          background: url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M28%2020V25.3333C28%2026.0406%2027.719%2026.7189%2027.219%2027.219C26.7189%2027.719%2026.0406%2028%2025.3333%2028H6.66667C5.95942%2028%205.28115%2027.719%204.78105%2027.219C4.28095%2026.7189%204%2026.0406%204%2025.3333V20%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M9.33337%2013.3333L16%2020L22.6667%2013.3333%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M16%2020V4%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E') center/24px no-repeat !important;
        }
      `}</style>
    </div>
  )
}

export default PremiumImageGallery
