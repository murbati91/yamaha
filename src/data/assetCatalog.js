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
        angles: [
          '/images/products/jet-skis/82_2025_GP1800C-B_WHRB_NA_00_YY_45.jpg'
        ]
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
        angles: []
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
        angles: [
          '/images/products/jet-skis/82_2025_VX1900B-B_PRMN_NA_00_YY_21.jpg',
          '/images/products/jet-skis/82_2025_VX1900B-B_PRMN_NA_00_YY_34.jpg'
        ]
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
        angles: [
          '/images/products/jet-skis/82_2025_SJ1050-B_WH_NA_10_YY_01.tiff'
        ]
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
        angles: [
          '/images/products/jet-skis/82_2025_JB1050B-B_LYMN_NA_00_YY_56 (1).jpg'
        ]
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
      images: {
        main: '/images/products/boats/275sd2025.jpg',
        angles: [
          '/images/products/boats/275sdx.webp',
          '/images/products/boats/275sdx_selected.jpg'
        ]
      },
      specs: {
        length: '27.5 ft',
        beam: '8.5 ft',
        capacity: '12 persons',
        fuelCapacity: '200L',
        engines: 'Twin 1.8L SVHO'
      },
      price: 45000,
      description: 'Ultimate day boating experience'
    },
    {
      id: 'ar250',
      name: 'AR250',
      category: 'Sport Boat',
      images: {
        main: '/images/products/boats/ar250.webp',
        angles: []
      },
      specs: {
        length: '25 ft',
        beam: '8.2 ft',
        capacity: '10 persons',
        fuelCapacity: '150L',
        engines: 'Twin 1.8L HO'
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
      modelPath: '/models/boats/hook-32.glb', // Add 3D model here
      images: {
        main: '/images/products/boats/hook32.png',
        angles: [
          '/images/products/boats/977ffba9-e9e2-4e8f-8c8c-9bc890316990.JPG',
          '/images/products/boats/demo.JPG'
        ]
      },
      specs: {
        length: '31ft 10in',
        beam: '8ft 6in',
        power: '700 HP',
        fuel: '205 US Gallons',
        topSpeed: '61 knots'
      },
      price: 'On Request',
      description: 'Premier speed and performance boat'
    },
    {
      id: 'flash23',
      name: 'Flash 23',
      category: 'Agile',
      images: {
        main: '/images/products/boats/flash23.png',
        angles: [
          '/images/products/boats/flash23.jpg'
        ]
      },
      specs: {
        length: '23ft',
        beam: '8ft 3in',
        power: '400 HP',
        fuel: '63 US Gallons',
        capacity: '5 persons'
      },
      price: 'On Request',
      description: 'Dynamic and agile boat'
    },
    {
      id: 'mahar31',
      name: 'Mahar 31',
      category: 'Shallow Water',
      images: {
        main: '/images/products/boats/mahar31.png',
        angles: [
          '/images/products/boats/MAHAR31.webp',
          '/images/products/boats/coastguard.png'
        ]
      },
      specs: {
        length: '30ft 10in',
        beam: '7ft 10in',
        power: '600 HP',
        fuel: '110 US Gallons',
        draft: '9"'
      },
      price: 'On Request',
      description: 'Advanced shallow water boat for Coast Guard'
    }
  ],
  
  accessories: [
    {
      id: 'seascooter',
      name: 'Sea Scooter',
      category: 'Water Toys',
      images: {
        main: '/images/products/accessories/seascooter.jpg'
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
        angles: ['/images/products/accessories/2seaterph_003.jpg']
      },
      price: 280,
      description: 'Fun for the whole family'
    },
    {
      id: 'jobe-hotseat',
      name: 'Jobe Hot Seat',
      category: 'Towables',
      images: {
        main: '/images/products/accessories/hotseat.jpg'
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
        angles: [
          'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800',
          'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=800'
        ]
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
        angles: [
          'https://images.unsplash.com/photo-1580310614729-ccd69652491d?w=800'
        ]
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
        angles: [
          'https://images.unsplash.com/photo-1591378603223-e15b45a81640?w=800'
        ]
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
        angles: [
          'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=800'
        ]
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
        angles: [
          'https://images.unsplash.com/photo-1591378603223-e15b45a81640?w=800'
        ]
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
        main: '/images/products/motorcycles/Yamaha-Tenere-700-Extreme-Edition.jpg'
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
        angles: ['/images/products/utility/golf2.jpg']
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
  if (product.images.angles) {
    images.push(...product.images.angles);
  }
  return images;
};
