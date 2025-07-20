import { motion } from 'framer-motion'

export default function LoadingSpinner({ size = 'md', color = 'yamaha-blue' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const colorClasses = {
    'yamaha-blue': 'border-blue-600',
    'yamaha-red': 'border-red-600',
    white: 'border-white'
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-gray-300 ${colorClasses[color]} border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="xl" color="yamaha-red" />
        <motion.p 
          className="text-white mt-4 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading Yamaha Experience...
        </motion.p>
      </div>
    </div>
  )
}

export function SectionLoader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <LoadingSpinner size="lg" color="yamaha-blue" />
      <p className="text-gray-400 mt-4">{message}</p>
    </div>
  )
}

