import type { Product } from '@/types'

export const STATIC_PRODUCTS: Product[] = [
  {
    _id: '1',
    name: 'Deutschland Heimtrikot 2026',
    nameTranslations: { en: 'Germany Home Jersey 2026', es: 'Camiseta Local Alemania 2026' },
    slug: 'deutschland-heimtrikot-2026',
    description: 'Offizielles Fan-Trikot der deutschen Nationalmannschaft in Weiß mit schwarzen Akzenten. Leichtes, atmungsaktives Material – perfekt für Stadion und Alltag.',
    descriptionTranslations: {
      en: 'Official fan jersey of the German national team in white with black accents. Lightweight, breathable material – perfect for the stadium and everyday use.',
      es: 'Camiseta oficial de aficionado de la selección alemana en blanco con acentos negros. Material ligero y transpirable, perfecto para el estadio y el uso diario.',
    },
    price: 79.99,
    category: 'trikots',
    team: 'deutschland',
    images: [],
    variants: [
      { size: 'S', color: 'Weiß', stock: 50, sku: 'DEU-HOME-S' },
      { size: 'M', color: 'Weiß', stock: 75, sku: 'DEU-HOME-M' },
      { size: 'L', color: 'Weiß', stock: 60, sku: 'DEU-HOME-L' },
      { size: 'XL', color: 'Weiß', stock: 40, sku: 'DEU-HOME-XL' },
    ],
    totalStock: 225,
    rating: 4.8,
    numReviews: 124,
    isFeatured: true,
    material: '100% Polyester',
    tags: ['deutschland', 'trikot', 'wm2026', 'heimtrikot'],
    createdAt: '2026-01-01',
  },
  {
    _id: '2',
    name: 'Brasilien Fan-Shirt',
    nameTranslations: { en: 'Brazil Fan Shirt', es: 'Camiseta Fan Brasil' },
    slug: 'brasilien-fan-shirt-2026',
    description: 'Farbenfrohes Fan-Shirt im brasilianischen Stil – Gelb/Grün. 100% Baumwolle, angenehm zu tragen.',
    descriptionTranslations: {
      en: 'Colorful fan shirt in Brazilian style – yellow/green. 100% cotton, comfortable to wear.',
      es: 'Camiseta de aficionado colorida al estilo brasileño – amarillo/verde. 100% algodón, cómoda de llevar.',
    },
    price: 39.99,
    category: 'tshirts',
    team: 'brasilien',
    images: [],
    variants: [
      { size: 'S', color: 'Gelb', stock: 80, sku: 'BRA-FAN-S' },
      { size: 'M', color: 'Gelb', stock: 100, sku: 'BRA-FAN-M' },
      { size: 'L', color: 'Gelb', stock: 90, sku: 'BRA-FAN-L' },
      { size: 'XL', color: 'Gelb', stock: 60, sku: 'BRA-FAN-XL' },
    ],
    totalStock: 330,
    rating: 4.5,
    numReviews: 89,
    isFeatured: true,
    material: '100% Baumwolle',
    tags: ['brasilien', 'fanshirt', 'wm2026'],
    createdAt: '2026-01-02',
  },
  {
    _id: '3',
    name: 'Argentinien Hoodie',
    nameTranslations: { en: 'Argentina Hoodie', es: 'Sudadera Argentina' },
    slug: 'argentinien-hoodie-2026',
    description: 'Gemütlicher Hoodie in den argentinischen Nationalfarben Hellblau/Weiß. 80% Baumwolle, 20% Polyester.',
    descriptionTranslations: {
      en: 'Cozy hoodie in the Argentine national colors light blue/white.',
      es: 'Sudadera acogedora en los colores nacionales argentinos celeste/blanco.',
    },
    price: 59.99,
    category: 'hoodies',
    team: 'argentinien',
    images: [],
    variants: [
      { size: 'S', color: 'Hellblau', stock: 45, sku: 'ARG-HOOD-S' },
      { size: 'M', color: 'Hellblau', stock: 65, sku: 'ARG-HOOD-M' },
      { size: 'L', color: 'Hellblau', stock: 55, sku: 'ARG-HOOD-L' },
      { size: 'XL', color: 'Hellblau', stock: 35, sku: 'ARG-HOOD-XL' },
    ],
    totalStock: 200,
    rating: 4.7,
    numReviews: 67,
    isFeatured: true,
    material: '80% Baumwolle, 20% Polyester',
    tags: ['argentinien', 'hoodie', 'wm2026'],
    createdAt: '2026-01-03',
  },
  {
    _id: '4',
    name: 'Frankreich Trainingsjacke',
    nameTranslations: { en: 'France Training Jacket', es: 'Chaqueta de Entrenamiento Francia' },
    slug: 'frankreich-trainingsjacke-2026',
    description: 'Leichte Trainingsjacke in Blau-Weiß-Rot – perfekt für kühle Stadionabende. Mit Reißverschluss und zwei Seitentaschen.',
    descriptionTranslations: {
      en: 'Lightweight training jacket in blue-white-red – perfect for cool stadium evenings.',
      es: 'Chaqueta de entrenamiento ligera en azul-blanco-rojo, perfecta para noches frescas en el estadio.',
    },
    price: 69.99,
    category: 'jacken',
    team: 'frankreich',
    images: [],
    variants: [
      { size: 'S', color: 'Blau', stock: 30, sku: 'FRA-JAC-S' },
      { size: 'M', color: 'Blau', stock: 50, sku: 'FRA-JAC-M' },
      { size: 'L', color: 'Blau', stock: 45, sku: 'FRA-JAC-L' },
      { size: 'XL', color: 'Blau', stock: 25, sku: 'FRA-JAC-XL' },
    ],
    totalStock: 150,
    rating: 4.6,
    numReviews: 43,
    isFeatured: true,
    material: '100% Polyester',
    tags: ['frankreich', 'jacke', 'wm2026'],
    createdAt: '2026-01-04',
  },
  {
    _id: '5',
    name: 'Spanien Cap',
    nameTranslations: { en: 'Spain Cap', es: 'Gorra España' },
    slug: 'spanien-cap-2026',
    description: 'Stilvolle Cap in Rot mit goldenem Akzent – für alle Spanien-Fans. Einheitsgröße mit verstellbarem Riemen.',
    descriptionTranslations: {
      en: 'Stylish cap in red with gold accent – for all Spain fans. One size fits all.',
      es: 'Gorra elegante en rojo con acento dorado – para todos los aficionados de España.',
    },
    price: 24.99,
    category: 'caps',
    team: 'spanien',
    images: [],
    variants: [
      { size: 'OneSize', color: 'Rot', stock: 200, sku: 'ESP-CAP-OS' },
    ],
    totalStock: 200,
    rating: 4.4,
    numReviews: 31,
    isFeatured: false,
    material: '100% Baumwolle',
    tags: ['spanien', 'cap', 'wm2026'],
    createdAt: '2026-01-05',
  },
  {
    _id: '6',
    name: 'WM 2026 Limited Edition T-Shirt',
    nameTranslations: { en: 'WC 2026 Limited Edition T-Shirt', es: 'Camiseta Edición Limitada CM 2026' },
    slug: 'wm-2026-limited-edition-tshirt',
    description: 'Exklusives T-Shirt zur Fußball-Weltmeisterschaft 2026 – nur in limitierter Stückzahl erhältlich! Hochwertige Verarbeitung, 100% Bio-Baumwolle.',
    descriptionTranslations: {
      en: 'Exclusive T-Shirt for the 2026 Football World Cup – available in limited quantities only!',
      es: '¡Camiseta exclusiva para la Copa Mundial de Fútbol 2026 – disponible en cantidades limitadas!',
    },
    price: 49.99,
    discountPrice: 39.99,
    category: 'limited',
    team: 'neutral',
    images: [],
    variants: [
      { size: 'S', color: 'Schwarz', stock: 25, sku: 'LTD-2026-S' },
      { size: 'M', color: 'Schwarz', stock: 25, sku: 'LTD-2026-M' },
      { size: 'L', color: 'Schwarz', stock: 25, sku: 'LTD-2026-L' },
    ],
    totalStock: 75,
    rating: 4.9,
    numReviews: 12,
    isLimited: true,
    isFeatured: true,
    material: '100% Bio-Baumwolle',
    tags: ['limited', 'wm2026', 'exklusiv'],
    saleEndsAt: '2026-07-19',
    createdAt: '2026-01-06',
  },
  {
    _id: '7',
    name: 'England Schal',
    nameTranslations: { en: 'England Scarf', es: 'Bufanda Inglaterra' },
    slug: 'england-schal-2026',
    description: 'Klassischer Fußballschal in Rot-Weiß für alle England-Fans. Weiches Acryl-Material, ideal für kühle Spieltage.',
    descriptionTranslations: {
      en: 'Classic football scarf in red and white for all England fans.',
      es: 'Bufanda clásica de fútbol en rojo y blanco para todos los aficionados de Inglaterra.',
    },
    price: 19.99,
    category: 'schals',
    team: 'england',
    images: [],
    variants: [
      { size: 'OneSize', color: 'Rot/Weiß', stock: 150, sku: 'ENG-SCARF-OS' },
    ],
    totalStock: 150,
    rating: 4.3,
    numReviews: 28,
    isFeatured: false,
    material: 'Acryl',
    tags: ['england', 'schal', 'wm2026'],
    createdAt: '2026-01-07',
  },
  {
    _id: '8',
    name: 'WM 2026 Kinder-Trikot',
    nameTranslations: { en: 'WC 2026 Kids Jersey', es: 'Camiseta Infantil CM 2026' },
    slug: 'wm-2026-kinder-trikot',
    description: 'Buntes Kindertrikot für die kleinen Fußballfans – leicht, weich und strapazierfähig. In Größen 128–164.',
    descriptionTranslations: {
      en: 'Colorful kids jersey for the little football fans – lightweight, soft and durable.',
      es: 'Camiseta infantil colorida para los pequeños aficionados al fútbol – ligera, suave y duradera.',
    },
    price: 34.99,
    category: 'kinder',
    team: 'neutral',
    images: [],
    variants: [
      { size: '128', color: 'Gemischt', stock: 60, sku: 'KID-TRK-128' },
      { size: '140', color: 'Gemischt', stock: 70, sku: 'KID-TRK-140' },
      { size: '152', color: 'Gemischt', stock: 55, sku: 'KID-TRK-152' },
      { size: '164', color: 'Gemischt', stock: 45, sku: 'KID-TRK-164' },
    ],
    totalStock: 230,
    rating: 4.7,
    numReviews: 56,
    isFeatured: true,
    material: '100% Polyester',
    tags: ['kinder', 'trikot', 'wm2026'],
    createdAt: '2026-01-08',
  },
]

export function filterProducts(products: Product[], params: {
  category?: string
  team?: string
  search?: string
  minPrice?: string
  maxPrice?: string
}) {
  return products.filter(p => {
    if (params.category && p.category !== params.category) return false
    if (params.team && p.team !== params.team) return false
    if (params.minPrice && p.price < Number(params.minPrice)) return false
    if (params.maxPrice && p.price > Number(params.maxPrice)) return false
    if (params.search) {
      const q = params.search.toLowerCase()
      if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q) && !p.tags?.some(t => t.includes(q))) return false
    }
    return true
  })
}

export function sortProducts(products: Product[], sort: string) {
  const list = [...products]
  if (sort === 'price_asc') return list.sort((a, b) => a.price - b.price)
  if (sort === 'price_desc') return list.sort((a, b) => b.price - a.price)
  if (sort === 'rating') return list.sort((a, b) => b.rating - a.rating)
  if (sort === 'newest') return list.sort((a, b) => a._id > b._id ? -1 : 1)
  return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
}
