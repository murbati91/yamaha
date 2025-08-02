# Yamaha Bahrain - Premium Boat & Marine Website

A cutting-edge website for Yamaha Bahrain featuring Pearl Craft boats with an advanced 3D configurator, built with React, Vite, Three.js, and shadcn/ui.

## 🚀 Features

### Premium 3D Boat Configurator
- **Midnight Express-style interface** with real-time 3D visualization
- **Comprehensive customization options**:
  - Hull color (6 options)
  - Hull bottom color
  - Deck color (4 options)
  - Seat colors (4 options)
  - Hardtop/T-top options
  - Motor colors and accents
  - Rub rail colors
  - Electronics packages
- **Real-time pricing** updates as you customize
- **Share & download** configurations
- **360° view controls** with zoom and rotation

### Modern UI/UX with shadcn/ui
- **Dynamic animations** with Framer Motion
- **Glass morphism effects** for modern aesthetics
- **Gradient buttons and badges** for visual appeal
- **Responsive design** for all devices
- **Dark theme** with high contrast
- **Smooth transitions** and micro-interactions

### Product Showcase
- **Tabbed navigation** for different product categories
- **Interactive product cards** with hover effects
- **Gallery view** with lightbox
- **360° product views** (prepared for implementation)
- **Comparison tool** for side-by-side analysis
- **Finance calculator** with monthly payment options

### Performance & Technical
- **Lazy loading** for optimal performance
- **Code splitting** with dynamic imports
- **Optimized 3D rendering** with Three.js
- **PWA-ready** architecture
- **SEO optimized** structure

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Zustand (prepared)
- **Form Handling**: React Hook Form

## 📦 Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd C:\Users\Faisal\CascadeProjects\yamaha\yamaha-bahrain

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

## 🏗️ Project Structure

```
yamaha-bahrain/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── tabs.jsx
│   │   │   └── ...
│   │   ├── PremiumBoatConfigurator.jsx
│   │   ├── BoatShowcase.jsx
│   │   ├── FinanceCalculator.jsx
│   │   └── ...
│   ├── data/
│   │   └── assetCatalog.js  # Product data
│   ├── hooks/
│   │   └── use-toast.js
│   ├── lib/
│   │   └── utils.js         # Utility functions
│   ├── App.jsx              # Main application
│   └── index.css            # Global styles
├── public/
│   └── images/              # Static assets
└── package.json
```

## 🎨 Design System

### Colors
- **Primary**: Red (#DC2626)
- **Secondary**: Blue (#1E40AF)
- **Background**: Black (#0A0A0A)
- **Surface**: Gray (#111111)
- **Text**: White (#FFFFFF)
- **Muted**: Gray (#9CA3AF)

### Typography
- **Headings**: System UI, bold
- **Body**: System UI, regular
- **Monospace**: Monaco, Consolas

### Components
- Modern card designs with glass morphism
- Gradient buttons with hover effects
- Animated badges and indicators
- Smooth transitions and micro-interactions

## 🚀 Deployment

The site auto-deploys to Vercel on push to main branch:

```bash
# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Deploy (automatic on push)
git push origin main
```

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Wide**: 1440px+

## 🔧 Configuration

### Environment Variables
```env
VITE_API_URL=your_api_url
VITE_PUBLIC_URL=https://yamaha.bahrain-ai.com
```

### Customization
- Update color scheme in `tailwind.config.js`
- Modify UI components in `src/components/ui/`
- Add new products in `src/data/assetCatalog.js`

## 📈 Future Enhancements

- [ ] AR/VR boat viewing
- [ ] AI-powered boat recommendations
- [ ] Virtual test drive simulator
- [ ] Integration with dealer inventory
- [ ] Multi-language support (Arabic)
- [ ] Customer portal with saved configurations
- [ ] Real-time availability checker
- [ ] Trade-in value calculator

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary to Yamaha Bahrain. All rights reserved.

## 👥 Team

- **Development**: Cascade Projects
- **Design**: Premium UI/UX with shadcn/ui
- **3D Models**: Pearl Craft boat models

## 📞 Support

For support, email support@yamaha-bahrain.com or contact the development team.

---

Built with ❤️ by Cascade Projects for Yamaha Bahrain