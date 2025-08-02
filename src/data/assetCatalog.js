// Asset Catalog System
// This file manages all assets from Yamaha-extractpic directory

export const assetCatalog = {
  jetSkis: [
    {
      id: 'gp1800svho',
      name: 'GP1800R SVHO',
      category: 'Performance',
      images: {
        main: '/images/products/jet-skis/gp1800svho.jpg',
        gallery: [
          '/images/products/jet-skis/82_2025_GP1800C-B_WHRB_NA_00_YY_45.jpg'
        ],
        '360': []
      },
      specs: {
        engine: '1,812cc SVHO',
        horsepower: '250hp',
        seating: '3 riders',
        fuelCapacity: '70L',
        storage: '114L'
      },
      price: 6500,
      description: 'The ultimate racing machine on water'
    },
    {
      id: 'fx-cruiser',
      name: 'FX Cruiser SVHO',
      category: 'Luxury Performance',
      images: {
        main: '/images/products/jet-skis/82_2025_FX1800B-B_WH_NA_00_YY_48.jpg',
        gallery: [],
        '360': []
      },
      specs: {
        engine: '1,812cc SVHO',
        horsepower: '250hp',
        seating: '3 riders',
        fuelCapacity: '70L',
        storage: '125L'
      },
      price: 7200,
      description: 'Luxury meets performance'
    },
    {
      id: 'vx-cruiser',
      name: 'VX Cruiser HO',
      category: 'Recreation',
      images: {
        main: '/images/products/jet-skis/vxcr2023.jpg',
        gallery: [
          '/images/products/jet-skis/82_2025_VX1900B-B_PRMN_NA_00_YY_21.jpg',
          '/images/products/jet-skis/82_2025_VX1900B-B_PRMN_NA_00_YY_34.jpg'
        ],
        '360': []
      },
      specs: {
        engine: '1,812cc HO',
        horsepower: '180hp',
        seating: '3 riders',
        fuelCapacity: '70L',
        storage: '114L'
      },
      price: 4800,
      description: 'The perfect balance of fun and function'
    },
    {
      id: 'superjet',
      name: 'SuperJet',
      category: 'Stand-up',
      images: {
        main: '/images/products/jet-skis/superjet2024.jpg',
        gallery: [
          '/images/products/jet-skis/82_2025_SJ1050-B_WH_NA_10_YY_01.tiff'
        ],
        '360': []
      },
      specs: {
        engine: '1,049cc TR-1',
        horsepower: '100hp',
        seating: 'Stand-up',
        fuelCapacity: '19L',
        weight: '170kg'
      },
      price: 3500,
      description: 'Pure stand-up excitement'
    },
    {
      id: 'jetblaster',
      name: 'JetBlaster',
      category: 'Freestyle',
      images: {
        main: '/images/products/jet-skis/82_2025_JB1050B-B_LYMN_NA_00_YY_36 (1).jpg',
        gallery: [
          '/images/products/jet-skis/82_2025_JB1050B-B_LYMN_NA_00_YY_56 (1).jpg'
        ],
        '360': []
      },
      specs: {
        engine: '1,049cc TR-1',
        horsepower: '110hp',
        seating: '2 riders',
        fuelCapacity: '34L',
        weight: '237kg'
      },
      price: 3900,
      description: 'Designed for tricks and fun'
    }
  ],
  
  boats: [
    {
      id: '275sd',
      name: '275SD',
      category: 'Sport Deck',
      type: 'sport',
      images: {
        main: '/images/products/boats/275sd2025.jpg',
        gallery: [
          '/images/products/boats/275sdx.webp',
          '/images/products/boats/275sdx_selected.jpg'
        ],
        '360': []
      },
      specs: {
        length: '27.5 ft',
        beam: '8.5 ft',
        capacity: '12 persons',
        fuelCapacity: '200L',
        engines: 'Twin 1.8L SVHO',
        weight: '3,200 kg',
        draft: '3.2 ft'
      },
      performance: {
        topSpeed: '55 mph',
        cruiseSpeed: '35 mph',
        range: '200 nm'
      },
      features: {
        standard: [
          'Twin Yamaha 1.8L SVHO Engines',
          'Connext Touchscreen Display',
          'Swim Platform with Mat',
          'Bimini Top',
          'Premium Sound System',
          'GPS Navigation',
          'Anchor System',
          'Cooler Storage'
        ],
        optional: [
          { name: 'Wakeboard Tower', price: 4500, description: 'Aluminum tower with board racks' },
          { name: 'Premium Audio Upgrade', price: 2500, description: 'JL Audio system with subwoofer' },
          { name: 'Underwater LED Lights', price: 1500, description: 'RGB color changing lights' },
          { name: 'Teak Swim Platform', price: 3000, description: 'Genuine teak wood platform' }
        ]
      },
      price: 45000,
      description: 'Ultimate day boating experience'
    },
    {
      id: 'ar250',
      name: 'AR250',
      category: 'Sport Boat',
      type: 'sport',
      images: {
        main: '/images/products/boats/ar250.webp',
        gallery: [],
        '360': []
      },
      specs: {
        length: '25 ft',
        beam: '8.2 ft',
        capacity: '10 persons',
        fuelCapacity: '150L',
        engines: 'Twin 1.8L HO',
        weight: '2,800 kg',
        draft: '2.8 ft'
      },
      performance: {
        topSpeed: '50 mph',
        cruiseSpeed: '30 mph',
        range: '180 nm'
      },
      features: {
        standard: [
          'Twin Yamaha 1.8L HO Engines',
          'Connext Display',
          'Swim Platform',
          'Bimini Top',
          'Stereo System',
          'No-Wake Mode',
          'Cruise Assist',
          'Storage Compartments'
        ],
        optional: [
          { name: 'Forward Swept Tower', price: 3500, description: 'Aluminum wakeboard tower' },
          { name: 'Ballast System', price: 2000, description: 'Integrated ballast for wake sports' },
          { name: 'Tower Speakers', price: 1200, description: 'Tower mounted speakers' }
        ]
      },
      price: 38000,
      description: 'Sporty and versatile'
    }
  ],
  
  pearlCraft: [
    {
      id: 'hook32',
      name: 'Hook 32',
      category: 'Performance',
      type: 'performance',
      modelPath: '/models/boats/hook-32.glb',
      images: {
        main: '/images/products/boats/hook32.png',
        gallery: [
          '/images/products/boats/977ffba9-e9e2-4e8f-8c8c-9bc890316990.JPG',
          '/images/products/boats/demo.JPG',
          '/images/heroes/by8i2921-scaled-1.jpg',
          '/images/boats/photo-1559827260-dc66d52bef19.avif'
        ],
        '360': [
          '/images/products/boats/hook32-360-1.jpg',
          '/images/products/boats/hook32-360-2.jpg',
          '/images/products/boats/hook32-360-3.jpg',
          '/images/products/boats/hook32-360-4.jpg'
        ]
      },
      specs: {
        length: "31' 10\"",
        beam: "8' 6\"",
        draft: '18"',
        weight: '2,100 kg',
        fuel: '205 US Gallons',
        power: '700 HP',
        capacity: '8 persons',
        hull: 'Deep-V Fiberglass'
      },
      performance: {
        topSpeed: '61 knots',
        cruiseSpeed: '45 knots',
        range: '250 nm'
      },
      features: {
        standard: [
          'Twin Yamaha 350HP Engines',
          'GPS Navigation System',
          'VHF Radio',
          'Bimini Top',
          'Swim Platform',
          'Anchor System',
          'LED Navigation Lights',
          'Bilge Pump',
          'Live Bait Well',
          'Rod Holders',
          'Fish Box',
          'Fresh Water System'
        ],
        optional: [
          { name: 'T-Top Hardtop', price: 8000, description: 'Powder coated aluminum T-top with electronics box' },
          { name: 'Premium Sound System', price: 3500, description: 'JL Audio marine speakers with amplifier' },
          { name: 'Underwater Lights', price: 2000, description: 'RGB LED underwater lighting system' },
          { name: 'Teak Decking', price: 5000, description: 'Premium teak wood decking throughout' },
          { name: 'Outriggers', price: 4500, description: 'Professional grade fishing outriggers' },
          { name: 'Fighting Chair', price: 6000, description: 'Tournament grade fighting chair' }
        ]
      },
      price: 85000,
      description: 'Premier speed and performance boat trusted by military and coast guard'
    },
    {
      id: 'flash23',
      name: 'Flash 23',
      category: 'Agile Sport',
      type: 'sport',
      images: {
        main: '/images/products/boats/flash23.png',
        gallery: [
          '/images/products/boats/flash23.jpg',
          '/images/boats/photo-1525160354320-d8e92641c563.avif'
        ],
        '360': []
      },
      specs: {
        length: '23 ft',
        beam: "8' 3\"",
        draft: '16"',
        weight: '1,430 kg',
        fuel: '63 US Gallons',
        power: '400 HP',
        capacity: '5 persons',
        hull: 'Modified-V Fiberglass'
      },
      performance: {
        topSpeed: '52 knots',
        cruiseSpeed: '38 knots',
        range: '180 nm'
      },
      features: {
        standard: [
          'Twin Yamaha 200HP Engines',
          'Digital Gauges',
          'VHF Radio',
          'Bimini Top',
          'Swim Ladder',
          'Navigation Lights',
          'Bilge Pump',
          'Cooler Storage',
          'Ski Tow Bar'
        ],
        optional: [
          { name: 'Wakeboard Tower', price: 4000, description: 'Aluminum tower with board racks' },
          { name: 'Sound System', price: 2000, description: 'Marine audio system' },
          { name: 'LED Deck Lights', price: 1200, description: 'LED courtesy lighting' },
          { name: 'Ski Locker', price: 800, description: 'Dedicated ski/wakeboard storage' }
        ]
      },
      price: 45000,
      description: 'Dynamic and agile boat perfect for water sports'
    },
    {
      id: 'mahar31',
      name: 'Mahar 31',
      category: 'Shallow Water Patrol',
      type: 'patrol',
      images: {
        main: '/images/products/boats/mahar31.png',
        gallery: [
          '/images/products/boats/MAHAR31.webp',
          '/images/products/boats/coastguard.png',
          '/images/boats/photo-1571008887538-b36bb32f4571.avif'
        ],
        '360': []
      },
      specs: {
        length: "30' 10\"",
        beam: "7' 10\"",
        draft: '9"',
        weight: '1,400 kg',
        fuel: '110 US Gallons',
        power: '600 HP',
        capacity: '6 persons',
        hull: 'Shallow Draft Design'
      },
      performance: {
        topSpeed: '55 knots',
        cruiseSpeed: '40 knots',
        range: '220 nm'
      },
      features: {
        standard: [
          'Twin Yamaha 300HP Engines',
          'Military Grade Electronics',
          'Dual VHF Radios',
          'Radar System',
          'Spotlight',
          'Siren & PA System',
          'Heavy Duty Rub Rail',
          'Self-Bailing Cockpit',
          'Weapon Mounts',
          'First Aid Station',
          'Fire Suppression System'
        ],
        optional: [
          { name: 'FLIR Thermal Camera', price: 15000, description: 'Night vision thermal imaging' },
          { name: 'Armor Package', price: 20000, description: 'Ballistic protection panels' },
          { name: 'Advanced Radar', price: 12000, description: 'Long range radar system' },
          { name: 'Satellite Communication', price: 8000, description: 'Satellite phone and data' }
        ]
      },
      price: 125000,
      description: 'Advanced shallow water boat designed for Coast Guard and military applications'
    }
  ],
  
  accessories: [
    {
      id: 'seascooter',
      name: 'Sea Scooter',
      category: 'Water Toys',
      images: {
        main: '/images/products/accessories/seascooter.jpg',
        gallery: [],
        '360': []
      },
      price: 850,
      description: 'Underwater propulsion device'
    },
    {
      id: 'jobe-2seater',
      name: 'Jobe 2-Seater Towable',
      category: 'Towables',
      images: {
        main: '/images/products/accessories/JOBE2P.jpg',
        gallery: ['/images/products/accessories/2seaterph_003.jpg'],
        '360': []
      },
      price: 280,
      description: 'Fun for the whole family'
    },
    {
      id: 'jobe-hotseat',
      name: 'Jobe Hot Seat',
      category: 'Towables',
      images: {
        main: '/images/products/accessories/hotseat.jpg',
        gallery: [],
        '360': []
      },
      price: 180,
      description: 'Single rider towable'
    }
  ],
  
  motorcycles: [
    {
      id: 'yzf-r1-2025',
      name: 'YZF-R1',
      category: 'Supersport',
      images: {
        main: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        gallery: [
          'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800',
          'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=800'
        ],
        '360': []
      },
      specs: {
        engine: '998cc CP4',
        power: '200hp',
        torque: '112.4 Nm',
        weight: '201kg',
        topSpeed: '299 km/h',
        electronics: 'IMU, TC, QSS'
      },
      price: 18999,
      description: 'MotoGP-inspired superbike with crossplane technology'
    },
    {
      id: 'yzf-r1m-2025',
      name: 'YZF-R1M',
      category: 'Supersport',
      images: {
        main: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
        gallery: [
          'https://images.unsplash.com/photo-1580310614729-ccd69652491d?w=800'
        ],
        '360': []
      },
      specs: {
        engine: '998cc CP4',
        power: '200hp',
        suspension: 'Öhlins Electronic',
        electronics: 'Full suite',
        carbon: 'Bodywork',
        dataLogging: 'GPS enabled'
      },
      price: 27699,
      description: 'Ultimate track weapon with electronic suspension'
    },
    {
      id: 'mt-10-2025',
      name: 'MT-10',
      category: 'Hyper Naked',
      images: {
        main: 'https://images.unsplash.com/photo-1525160354320-d8e92641c563?w=800',
        gallery: [
          'https://images.unsplash.com/photo-1591378603223-e15b45a81640?w=800'
        ],
        '360': []
      },
      specs: {
        engine: '998cc CP4',
        power: '165hp',
        torque: '112 Nm',
        weight: '212kg',
        electronics: '6-axis IMU',
        modes: '3 riding modes'
      },
      price: 14799,
      description: 'The apex predator of the Dark Side'
    },
    {
      id: 'mt-09-2025',
      name: 'MT-09',
      category: 'Hyper Naked',
      images: {
        main: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800',
        gallery: [
          'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=800'
        ],
        '360': []
      },
      specs: {
        engine: '889cc CP3',
        power: '117hp',
        torque: '93 Nm',
        weight: '189kg',
        display: '5" TFT',
        quickshifter: 'Up & Down'
      },
      price: 10799,
      description: 'Triple-cylinder torque monster'
    },
    {
      id: 'mt-07-2025',
      name: 'MT-07',
      category: 'Hyper Naked',
      images: {
        main: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        gallery: [
          'https://images.unsplash.com/photo-1591378603223-e15b45a81640?w=800'
        ],
        '360': []
      },
      specs: {
        engine: '689cc CP2',
        power: '73.4hp',
        torque: '67 Nm',
        weight: '184kg',
        fuelCapacity: '14L',
        abs: 'Standard'
      },
      price: 8599,
      description: 'The perfect entry to the Dark Side'
    },
    {
      id: 'tenere-700',
      name: 'Ténéré 700 Extreme',
      category: 'Adventure',
      images: {
        main: '/images/products/motorcycles/Yamaha-Tenere-700-Extreme-Edition.jpg',
        gallery: [],
        '360': []
      },
      specs: {
        engine: '689cc',
        power: '72hp',
        torque: '68Nm',
        weight: '204kg'
      },
      price: 4200,
      description: 'Go anywhere adventure bike'
    }
  ],
  
  utility: [
    {
      id: 'concierge-4',
      name: 'Electric Concierge 4-Seat',
      category: 'Golf Cart',
      images: {
        main: '/images/products/utility/Yamaha-Electric-Concierge-4-Seat-Action-Image-1.jpg.webp',
        gallery: ['/images/products/utility/golf2.jpg'],
        '360': []
      },
      specs: {
        seating: '4 persons',
        power: 'Electric 48V',
        range: '50km',
        topSpeed: '30km/h'
      },
      price: 8500,
      description: 'Premium electric golf cart'
    }
  ]
};

// Helper functions
export const getAllProducts = () => {
  return [
    ...assetCatalog.jetSkis,
    ...assetCatalog.boats,
    ...assetCatalog.pearlCraft,
    ...assetCatalog.accessories,
    ...assetCatalog.motorcycles,
    ...assetCatalog.utility
  ];
};

export const getProductById = (id) => {
  return getAllProducts().find(product => product.id === id);
};

export const getProductsByCategory = (category) => {
  return getAllProducts().filter(product => 
    product.category.toLowerCase().includes(category.toLowerCase())
  );
};

export const getProductImages = (productId) => {
  const product = getProductById(productId);
  if (!product) return [];
  
  const images = [product.images.main];
  if (product.images.gallery) {
    images.push(...product.images.gallery);
  }
  if (product.images['360']) {
    images.push(...product.images['360']);
  }
  return images;
};