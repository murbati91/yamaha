// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const API_KEY = import.meta.env.VITE_API_KEY || ''

// Request interceptor
const requestInterceptor = (config) => {
  // Add API key to headers
  if (API_KEY) {
    config.headers['X-API-Key'] = API_KEY
  }
  
  // Add auth token if exists
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  
  return config
}

// Response interceptor
const responseInterceptor = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }))
    throw new Error(error.message || `HTTP error! status: ${response.status}`)
  }
  return response.json()
}

// API Client
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }

    // Apply request interceptor
    const finalConfig = requestInterceptor(config)

    try {
      const response = await fetch(url, finalConfig)
      return await responseInterceptor(response)
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // HTTP methods
  get(endpoint, options) {
    return this.request(endpoint, { ...options, method: 'GET' })
  }

  post(endpoint, data, options) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  put(endpoint, data, options) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  delete(endpoint, options) {
    return this.request(endpoint, { ...options, method: 'DELETE' })
  }
}

// Create default instance
export const apiClient = new ApiClient()

// API Endpoints
export const api = {
  // Products
  products: {
    getAll: () => apiClient.get('/products'),
    getById: (id) => apiClient.get(`/products/${id}`),
    getByCategory: (category) => apiClient.get(`/products/category/${category}`),
  },

  // Customization
  customization: {
    getOptions: (productId) => apiClient.get(`/customization/${productId}`),
    saveConfiguration: (data) => apiClient.post('/customization/save', data),
    getConfiguration: (id) => apiClient.get(`/customization/config/${id}`),
  },

  // Dealers
  dealers: {
    getAll: () => apiClient.get('/dealers'),
    getNearest: (lat, lng) => apiClient.get(`/dealers/nearest?lat=${lat}&lng=${lng}`),
    getById: (id) => apiClient.get(`/dealers/${id}`),
  },

  // Contact
  contact: {
    sendMessage: (data) => apiClient.post('/contact', data),
    requestTestDrive: (data) => apiClient.post('/contact/test-drive', data),
    requestBrochure: (productId) => apiClient.get(`/brochure/${productId}`),
  },

  // Finance
  finance: {
    calculateEMI: (data) => apiClient.post('/finance/calculate', data),
    applyFinance: (data) => apiClient.post('/finance/apply', data),
  },

  // Newsletter
  newsletter: {
    subscribe: (email) => apiClient.post('/newsletter/subscribe', { email }),
    unsubscribe: (token) => apiClient.post('/newsletter/unsubscribe', { token }),
  },
}

// Mock API for development
export const mockApi = {
  products: {
    getAll: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      return {
        data: [
          {
            id: 'r1',
            name: 'YZF-R1',
            tagline: 'Pure Racing DNA',
            category: 'supersport',
            price: 8500,
            currency: 'BHD',
            specs: {
              engine: '998cc',
              power: '200hp',
              torque: '112.4 Nm',
              weight: '201kg',
              topSpeed: '299 km/h',
              fuelCapacity: '17L',
            },
            features: [
              'Crossplane Crankshaft',
              'Quick Shift System',
              'Traction Control',
              'Slide Control',
              'Launch Control',
              'Wheelie Control',
            ],
            images: ['/images/r1-1.jpg', '/images/r1-2.jpg', '/images/r1-3.jpg'],
            model3D: '/models/r1.glb',
          },
          {
            id: 'vmax',
            name: 'VMAX',
            tagline: 'Maximum Power',
            category: 'cruiser',
            price: 9500,
            currency: 'BHD',
            specs: {
              engine: '1679cc',
              power: '200hp',
              torque: '166.8 Nm',
              weight: '310kg',
              topSpeed: '220 km/h',
              fuelCapacity: '15L',
            },
            features: [
              'V4 Engine',
              'Slipper Clutch',
              'ABS',
              'Traction Control',
              'Ride-by-Wire',
              'Multiple Riding Modes',
            ],
            images: ['/images/vmax-1.jpg', '/images/vmax-2.jpg', '/images/vmax-3.jpg'],
            model3D: '/models/vmax.glb',
          },
        ],
      }
    },
  },
  dealers: {
    getAll: async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return {
        data: [
          {
            id: 1,
            name: 'Yamaha Manama Showroom',
            address: 'Building 123, Road 456, Manama 789',
            phone: '+973 1234 5678',
            email: 'manama@yamaha-bahrain.com',
            coordinates: { lat: 26.2285, lng: 50.5860 },
            openingHours: {
              weekdays: '8:00 AM - 8:00 PM',
              saturday: '9:00 AM - 6:00 PM',
              sunday: 'Closed',
            },
          },
          {
            id: 2,
            name: 'Yamaha Riffa Service Center',
            address: 'Building 456, Road 789, Riffa 123',
            phone: '+973 8765 4321',
            email: 'riffa@yamaha-bahrain.com',
            coordinates: { lat: 26.1290, lng: 50.5550 },
            openingHours: {
              weekdays: '8:00 AM - 6:00 PM',
              saturday: '9:00 AM - 4:00 PM',
              sunday: 'Closed',
            },
          },
        ],
      }
    },
  },
}

// Use mock API in development
export default import.meta.env.DEV ? mockApi : api
