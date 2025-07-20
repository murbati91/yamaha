import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Check, Star, Zap, Shield, Gauge } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import ProductViewer3D from './ProductViewer3D'

const customizationOptions = {
  colors: [
    { id: 'yamaha-blue', name: 'Yamaha Racing Blue', value: '#0066cc', premium: false },
    { id: 'racing-red', name: 'Racing Red', value: '#E31937', premium: false },
    { id: 'midnight-black', name: 'Midnight Black', value: '#1a1a1a', premium: false },
    { id: 'pearl-white', name: 'Pearl White', value: '#f8f8ff', premium: true },
    { id: 'metallic-silver', name: 'Metallic Silver', value: '#c0c0c0', premium: true },
    { id: 'neon-yellow', name: 'Racing Yellow', value: '#ffff00', premium: true }
  ],
  performance: [
    { 
      id: 'exhaust-akrapovic', 
      name: 'Akrapovic Exhaust System', 
      price: 1200, 
      description: 'Premium titanium exhaust for enhanced performance',
      icon: Zap,
      benefits: ['+15hp', 'Weight reduction', 'Enhanced sound']
    },
    { 
      id: 'suspension-ohlins', 
      name: 'Öhlins Suspension Kit', 
      price: 2500, 
      description: 'Professional-grade adjustable suspension',
      icon: Gauge,
      benefits: ['Improved handling', 'Track-ready', 'Adjustable damping']
    },
    { 
      id: 'brakes-brembo', 
      name: 'Brembo Brake Upgrade', 
      price: 1800, 
      description: 'Racing-spec brake calipers and discs',
      icon: Shield,
      benefits: ['Shorter stopping distance', 'Fade resistance', 'Track proven']
    }
  ],
  accessories: [
    { id: 'windscreen-touring', name: 'Touring Windscreen', price: 250 },
    { id: 'seat-comfort', name: 'Comfort Seat', price: 400 },
    { id: 'luggage-system', name: 'Luggage System', price: 600 },
    { id: 'led-lights', name: 'LED Light Kit', price: 300 },
    { id: 'carbon-fiber-kit', name: 'Carbon Fiber Body Kit', price: 1500 }
  ]
}

function CustomizationStep({ title, children, isActive, onNext, onPrev, isLast }) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="glass-panel p-6 rounded-xl">
        <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
        {children}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={onPrev}
            className="glass-panel text-white border-white/30 hover:bg-white/10"
          >
            Previous
          </Button>
          <Button
            onClick={onNext}
            className="btn-yamaha-primary"
          >
            {isLast ? 'Complete Configuration' : 'Next Step'}
            {!isLast && <ChevronRight className="ml-2 w-4 h-4" />}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

function ColorSelection({ selectedColor, onColorSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {customizationOptions.colors.map((color) => (
        <motion.div
          key={color.id}
          className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
            selectedColor === color.id 
              ? 'border-red-500 bg-white/10' 
              : 'border-white/20 hover:border-white/40'
          }`}
          onClick={() => onColorSelect(color.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-full border-2 border-white/30"
              style={{ backgroundColor: color.value }}
            />
            <div>
              <div className="text-white font-medium">{color.name}</div>
              {color.premium && (
                <div className="flex items-center text-yellow-400 text-sm">
                  <Star className="w-3 h-3 mr-1" />
                  Premium
                </div>
              )}
            </div>
          </div>
          {selectedColor === color.id && (
            <motion.div
              className="absolute top-2 right-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Check className="w-5 h-5 text-red-500" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

function PerformanceUpgrades({ selectedUpgrades, onUpgradeToggle }) {
  return (
    <div className="space-y-4">
      {customizationOptions.performance.map((upgrade) => {
        const Icon = upgrade.icon
        const isSelected = selectedUpgrades.includes(upgrade.id)
        
        return (
          <motion.div
            key={upgrade.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              isSelected 
                ? 'border-red-500 bg-white/10' 
                : 'border-white/20 hover:border-white/40'
            }`}
            onClick={() => onUpgradeToggle(upgrade.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Icon className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{upgrade.name}</h4>
                  <p className="text-gray-300 text-sm mt-1">{upgrade.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {upgrade.benefits.map((benefit, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">+BHD {upgrade.price}</div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Check className="w-5 h-5 text-red-500 ml-auto mt-1" />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function AccessorySelection({ selectedAccessories, onAccessoryToggle }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {customizationOptions.accessories.map((accessory) => {
        const isSelected = selectedAccessories.includes(accessory.id)
        
        return (
          <motion.div
            key={accessory.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              isSelected 
                ? 'border-red-500 bg-white/10' 
                : 'border-white/20 hover:border-white/40'
            }`}
            onClick={() => onAccessoryToggle(accessory.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">{accessory.name}</h4>
                <div className="text-gray-300 text-sm">+BHD {accessory.price}</div>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Check className="w-5 h-5 text-red-500" />
                </motion.div>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function ConfigurationSummary({ 
  motorcycle, 
  selectedColor, 
  selectedUpgrades, 
  selectedAccessories,
  onSaveConfiguration,
  onRequestQuote 
}) {
  const colorOption = customizationOptions.colors.find(c => c.id === selectedColor)
  const upgradeOptions = customizationOptions.performance.filter(u => selectedUpgrades.includes(u.id))
  const accessoryOptions = customizationOptions.accessories.filter(a => selectedAccessories.includes(a.id))
  
  const basePrice = parseInt(motorcycle.price.replace(/[^\d]/g, ''))
  const upgradesTotal = upgradeOptions.reduce((sum, upgrade) => sum + upgrade.price, 0)
  const accessoriesTotal = accessoryOptions.reduce((sum, accessory) => sum + accessory.price, 0)
  const totalPrice = basePrice + upgradesTotal + accessoriesTotal

  return (
    <div className="space-y-6">
      <div className="glass-panel p-4 rounded-lg">
        <h4 className="text-white font-semibold mb-3">Configuration Summary</h4>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Base Model</span>
            <span className="text-white font-medium">{motorcycle.name}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Color</span>
            <div className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full border border-white/30"
                style={{ backgroundColor: colorOption?.value }}
              />
              <span className="text-white">{colorOption?.name}</span>
            </div>
          </div>
          
          {upgradeOptions.length > 0 && (
            <div>
              <div className="text-gray-300 mb-2">Performance Upgrades</div>
              {upgradeOptions.map(upgrade => (
                <div key={upgrade.id} className="flex justify-between items-center ml-4">
                  <span className="text-gray-400 text-sm">{upgrade.name}</span>
                  <span className="text-white text-sm">+BHD {upgrade.price}</span>
                </div>
              ))}
            </div>
          )}
          
          {accessoryOptions.length > 0 && (
            <div>
              <div className="text-gray-300 mb-2">Accessories</div>
              {accessoryOptions.map(accessory => (
                <div key={accessory.id} className="flex justify-between items-center ml-4">
                  <span className="text-gray-400 text-sm">{accessory.name}</span>
                  <span className="text-white text-sm">+BHD {accessory.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="border-t border-white/20 mt-4 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-white font-bold text-lg">Total Price</span>
            <span className="text-red-500 font-bold text-xl">BHD {totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <Button
          onClick={onSaveConfiguration}
          variant="outline"
          className="flex-1 glass-panel text-white border-white/30 hover:bg-white/10"
        >
          Save Configuration
        </Button>
        <Button
          onClick={onRequestQuote}
          className="flex-1 btn-yamaha-secondary"
        >
          Request Quote
        </Button>
      </div>
    </div>
  )
}

export default function ProductCustomizer({ motorcycle, onClose }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedColor, setSelectedColor] = useState('yamaha-blue')
  const [selectedUpgrades, setSelectedUpgrades] = useState([])
  const [selectedAccessories, setSelectedAccessories] = useState([])

  const steps = [
    { title: 'Choose Color', component: 'color' },
    { title: 'Performance Upgrades', component: 'performance' },
    { title: 'Accessories', component: 'accessories' },
    { title: 'Review & Configure', component: 'summary' }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete configuration
      handleSaveConfiguration()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleUpgradeToggle = (upgradeId) => {
    setSelectedUpgrades(prev => 
      prev.includes(upgradeId) 
        ? prev.filter(id => id !== upgradeId)
        : [...prev, upgradeId]
    )
  }

  const handleAccessoryToggle = (accessoryId) => {
    setSelectedAccessories(prev => 
      prev.includes(accessoryId) 
        ? prev.filter(id => id !== accessoryId)
        : [...prev, accessoryId]
    )
  }

  const handleSaveConfiguration = () => {
    // In a real app, this would save to backend
    console.log('Configuration saved:', {
      motorcycle: motorcycle.id,
      color: selectedColor,
      upgrades: selectedUpgrades,
      accessories: selectedAccessories
    })
    alert('Configuration saved successfully!')
  }

  const handleRequestQuote = () => {
    // In a real app, this would send quote request
    alert('Quote request sent! We will contact you within 24 hours.')
  }

  const renderStepContent = () => {
    switch (steps[currentStep].component) {
      case 'color':
        return (
          <ColorSelection 
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
          />
        )
      case 'performance':
        return (
          <PerformanceUpgrades 
            selectedUpgrades={selectedUpgrades}
            onUpgradeToggle={handleUpgradeToggle}
          />
        )
      case 'accessories':
        return (
          <AccessorySelection 
            selectedAccessories={selectedAccessories}
            onAccessoryToggle={handleAccessoryToggle}
          />
        )
      case 'summary':
        return (
          <ConfigurationSummary 
            motorcycle={motorcycle}
            selectedColor={selectedColor}
            selectedUpgrades={selectedUpgrades}
            selectedAccessories={selectedAccessories}
            onSaveConfiguration={handleSaveConfiguration}
            onRequestQuote={handleRequestQuote}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 3D Viewer */}
          <div className="order-2 lg:order-1">
            <ProductViewer3D motorcycle={motorcycle} />
          </div>
          
          {/* Customization Panel */}
          <div className="order-1 lg:order-2">
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index <= currentStep 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-1 mx-2 ${
                        index < currentStep ? 'bg-red-500' : 'bg-gray-600'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-white text-sm">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <CustomizationStep
                key={currentStep}
                title={steps[currentStep].title}
                isActive={true}
                onNext={handleNext}
                onPrev={handlePrev}
                isLast={currentStep === steps.length - 1}
              >
                {renderStepContent()}
              </CustomizationStep>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

