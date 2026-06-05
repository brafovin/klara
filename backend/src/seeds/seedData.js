require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const Coupon = require('../models/Coupon');

const products = [
  {
    name: 'Deutschland Heimtrikot 2026',
    nameTranslations: { en: 'Germany Home Jersey 2026', es: 'Camiseta Local Alemania 2026', de: 'Deutschland Heimtrikot 2026' },
    slug: 'deutschland-heimtrikot-2026',
    description: 'Offizielles Fan-Trikot der deutschen Nationalmannschaft in Weiß mit schwarzen Akzenten.',
    descriptionTranslations: {
      en: 'Official fan jersey of the German national team in white with black accents.',
      es: 'Camiseta oficial de aficionado de la selección alemana en blanco con acentos negros.'
    },
    price: 79.99,
    category: 'trikots',
    team: 'deutschland',
    images: [
      { url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600', alt: 'Deutschland Trikot' }
    ],
    variants: [
      { size: 'S', color: 'Weiß', stock: 50, sku: 'DEU-HOME-S' },
      { size: 'M', color: 'Weiß', stock: 75, sku: 'DEU-HOME-M' },
      { size: 'L', color: 'Weiß', stock: 60, sku: 'DEU-HOME-L' },
      { size: 'XL', color: 'Weiß', stock: 40, sku: 'DEU-HOME-XL' }
    ],
    totalStock: 225,
    rating: 4.8,
    numReviews: 124,
    isFeatured: true,
    material: '100% Polyester',
    weight: 0.25,
    tags: ['deutschland', 'trikot', 'wm2026', 'heimtrikot']
  },
  {
    name: 'Brasilien Fan-Shirt',
    nameTranslations: { en: 'Brazil Fan Shirt', es: 'Camiseta Fan Brasil' },
    slug: 'brasilien-fan-shirt-2026',
    description: 'Farbenfrohes Fan-Shirt im brasilianischen Stil – Gelb/Grün.',
    descriptionTranslations: {
      en: 'Colorful fan shirt in Brazilian style – yellow/green.',
      es: 'Camiseta de aficionado colorida al estilo brasileño – amarillo/verde.'
    },
    price: 39.99,
    category: 'tshirts',
    team: 'brasilien',
    images: [
      { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600', alt: 'Brasilien Shirt' }
    ],
    variants: [
      { size: 'S', color: 'Gelb', stock: 80, sku: 'BRA-FAN-S' },
      { size: 'M', color: 'Gelb', stock: 100, sku: 'BRA-FAN-M' },
      { size: 'L', color: 'Gelb', stock: 90, sku: 'BRA-FAN-L' },
      { size: 'XL', color: 'Gelb', stock: 60, sku: 'BRA-FAN-XL' }
    ],
    totalStock: 330,
    rating: 4.5,
    numReviews: 89,
    isFeatured: true,
    material: '100% Baumwolle',
    weight: 0.2,
    tags: ['brasilien', 'fanshirt', 'wm2026']
  },
  {
    name: 'Argentinien Hoodie',
    nameTranslations: { en: 'Argentina Hoodie', es: 'Sudadera Argentina' },
    slug: 'argentinien-hoodie-2026',
    description: 'Gemütlicher Hoodie in den argentinischen Nationalfarben Hellblau/Weiß.',
    descriptionTranslations: {
      en: 'Cozy hoodie in the Argentine national colors light blue/white.',
      es: 'Sudadera acogedora en los colores nacionales argentinos celeste/blanco.'
    },
    price: 59.99,
    category: 'hoodies',
    team: 'argentinien',
    images: [
      { url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600', alt: 'Argentinien Hoodie' }
    ],
    variants: [
      { size: 'S', color: 'Hellblau', stock: 45, sku: 'ARG-HOOD-S' },
      { size: 'M', color: 'Hellblau', stock: 65, sku: 'ARG-HOOD-M' },
      { size: 'L', color: 'Hellblau', stock: 55, sku: 'ARG-HOOD-L' },
      { size: 'XL', color: 'Hellblau', stock: 35, sku: 'ARG-HOOD-XL' }
    ],
    totalStock: 200,
    rating: 4.7,
    numReviews: 67,
    isFeatured: true,
    material: '80% Baumwolle, 20% Polyester',
    weight: 0.5,
    tags: ['argentinien', 'hoodie', 'wm2026']
  },
  {
    name: 'Frankreich Trainingsjacke',
    nameTranslations: { en: 'France Training Jacket', es: 'Chaqueta de Entrenamiento Francia' },
    slug: 'frankreich-trainingsjacke-2026',
    description: 'Leichte Trainingsjacke in Blau-Rot-Weiß – perfekt für kühle Stadionabende.',
    descriptionTranslations: {
      en: 'Lightweight training jacket in blue-red-white – perfect for cool stadium evenings.',
      es: 'Chaqueta de entrenamiento ligera en azul-rojo-blanco – perfecta para noches frescas en el estadio.'
    },
    price: 69.99,
    category: 'jacken',
    team: 'frankreich',
    images: [
      { url: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600', alt: 'Frankreich Jacke' }
    ],
    variants: [
      { size: 'S', color: 'Blau', stock: 30, sku: 'FRA-JAC-S' },
      { size: 'M', color: 'Blau', stock: 50, sku: 'FRA-JAC-M' },
      { size: 'L', color: 'Blau', stock: 45, sku: 'FRA-JAC-L' },
      { size: 'XL', color: 'Blau', stock: 25, sku: 'FRA-JAC-XL' }
    ],
    totalStock: 150,
    rating: 4.6,
    numReviews: 43,
    isFeatured: true,
    material: '100% Polyester',
    weight: 0.4,
    tags: ['frankreich', 'jacke', 'wm2026']
  },
  {
    name: 'Spanien Cap',
    nameTranslations: { en: 'Spain Cap', es: 'Gorra España' },
    slug: 'spanien-cap-2026',
    description: 'Stilvolle Cap in Rot mit dem spanischen Fußball-Motiv.',
    descriptionTranslations: {
      en: 'Stylish cap in red with the Spanish football motif.',
      es: 'Gorra elegante en rojo con el motivo del fútbol español.'
    },
    price: 24.99,
    category: 'caps',
    team: 'spanien',
    images: [
      { url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600', alt: 'Spanien Cap' }
    ],
    variants: [
      { size: 'OneSize', color: 'Rot', stock: 200, sku: 'ESP-CAP-OS' }
    ],
    totalStock: 200,
    rating: 4.4,
    numReviews: 31,
    isFeatured: false,
    material: '100% Baumwolle',
    weight: 0.15,
    tags: ['spanien', 'cap', 'wm2026']
  },
  {
    name: 'WM 2026 Limited Edition T-Shirt',
    nameTranslations: { en: 'WC 2026 Limited Edition T-Shirt', es: 'Camiseta Edición Limitada CM 2026' },
    slug: 'wm-2026-limited-edition-tshirt',
    description: 'Exklusives T-Shirt zur Fußball-Weltmeisterschaft 2026 – nur in limitierter Stückzahl erhältlich!',
    descriptionTranslations: {
      en: 'Exclusive T-Shirt for the 2026 Football World Cup – available in limited quantities only!',
      es: '¡Camiseta exclusiva para la Copa Mundial de Fútbol 2026 – disponible en cantidades limitadas!'
    },
    price: 49.99,
    discountPrice: 39.99,
    category: 'limited',
    team: 'neutral',
    images: [
      { url: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600', alt: 'Limited Edition Shirt' }
    ],
    variants: [
      { size: 'S', color: 'Weiß', stock: 25, sku: 'LTD-2026-S' },
      { size: 'M', color: 'Weiß', stock: 25, sku: 'LTD-2026-M' },
      { size: 'L', color: 'Weiß', stock: 25, sku: 'LTD-2026-L' }
    ],
    totalStock: 75,
    rating: 4.9,
    numReviews: 12,
    isLimited: true,
    isFeatured: true,
    material: '100% Baumwolle',
    weight: 0.2,
    tags: ['limited', 'wm2026', 'exklusiv'],
    saleEndsAt: new Date('2026-07-19')
  },
  {
    name: 'England Schal',
    nameTranslations: { en: 'England Scarf', es: 'Bufanda Inglaterra' },
    slug: 'england-schal-2026',
    description: 'Klassischer Fußballschal in Rot-Weiß für England-Fans.',
    descriptionTranslations: {
      en: 'Classic football scarf in red and white for England fans.',
      es: 'Bufanda clásica de fútbol en rojo y blanco para los aficionados de Inglaterra.'
    },
    price: 19.99,
    category: 'schals',
    team: 'england',
    images: [
      { url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600', alt: 'England Schal' }
    ],
    variants: [
      { size: 'OneSize', color: 'Rot/Weiß', stock: 150, sku: 'ENG-SCARF-OS' }
    ],
    totalStock: 150,
    rating: 4.3,
    numReviews: 28,
    material: 'Acryl',
    weight: 0.18,
    tags: ['england', 'schal', 'wm2026']
  },
  {
    name: 'WM 2026 Kinder-Trikot',
    nameTranslations: { en: 'WC 2026 Kids Jersey', es: 'Camiseta Infantil CM 2026' },
    slug: 'wm-2026-kinder-trikot',
    description: 'Buntes Kindertrikot für die kleinen Fußballfans – in verschiedenen Teamfarben.',
    descriptionTranslations: {
      en: 'Colorful kids jersey for the little football fans – in various team colors.',
      es: 'Camiseta infantil colorida para los pequeños aficionados al fútbol – en varios colores de equipo.'
    },
    price: 34.99,
    category: 'kinder',
    team: 'neutral',
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600', alt: 'Kinder Trikot' }
    ],
    variants: [
      { size: '128', color: 'Gemischt', stock: 60, sku: 'KID-TRK-128' },
      { size: '140', color: 'Gemischt', stock: 70, sku: 'KID-TRK-140' },
      { size: '152', color: 'Gemischt', stock: 55, sku: 'KID-TRK-152' },
      { size: '164', color: 'Gemischt', stock: 45, sku: 'KID-TRK-164' }
    ],
    totalStock: 230,
    rating: 4.7,
    numReviews: 56,
    isFeatured: true,
    material: '100% Polyester',
    weight: 0.18,
    tags: ['kinder', 'trikot', 'wm2026']
  }
];

const coupons = [
  { code: 'WM2026', discount: 10, type: 'percentage', minOrder: 30, maxUses: 1000, isActive: true },
  { code: 'FANSHOP15', discount: 15, type: 'percentage', minOrder: 50, maxUses: 500, isActive: true },
  { code: 'FREESHIP', discount: 4.99, type: 'fixed', minOrder: 0, maxUses: 200, isActive: true }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wm2026shop');
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    await User.deleteMany({});
    await Coupon.deleteMany({});

    await Product.insertMany(products);
    console.log('Products seeded:', products.length);

    await User.create({
      name: 'Admin',
      email: 'admin@wm2026shop.de',
      password: 'Admin1234!',
      role: 'admin'
    });
    console.log('Admin user created: admin@wm2026shop.de / Admin1234!');

    await Coupon.insertMany(coupons);
    console.log('Coupons seeded:', coupons.length);

    console.log('Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
