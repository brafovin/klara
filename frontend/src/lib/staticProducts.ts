import type { Product } from '@/types'

export const STATIC_PRODUCTS: Product[] = [
  // ===== DEUTSCHLAND =====
  {
    _id: '1', name: 'Deutschland Heimtrikot 2026',
    nameTranslations: { en: 'Germany Home Jersey 2026', es: 'Camiseta Local Alemania 2026' },
    slug: 'deutschland-heimtrikot-2026',
    description: 'Offizielles Fan-Trikot der deutschen Nationalmannschaft in Weiß mit schwarzen Akzenten. Leichtes, atmungsaktives Material – perfekt für Stadion und Alltag.',
    descriptionTranslations: { en: 'Official fan jersey of the German national team in white with black accents. Lightweight, breathable material.', es: 'Camiseta oficial de aficionado de la selección alemana en blanco con acentos negros.' },
    price: 79.99, category: 'trikots', team: 'deutschland', images: [],
    variants: [
      { size: 'S', color: 'Weiß', stock: 50, sku: 'DEU-HOME-S' },
      { size: 'M', color: 'Weiß', stock: 75, sku: 'DEU-HOME-M' },
      { size: 'L', color: 'Weiß', stock: 60, sku: 'DEU-HOME-L' },
      { size: 'XL', color: 'Weiß', stock: 40, sku: 'DEU-HOME-XL' },
      { size: 'XXL', color: 'Weiß', stock: 25, sku: 'DEU-HOME-XXL' },
    ],
    totalStock: 250, rating: 4.8, numReviews: 124, isFeatured: true,
    material: '100% Polyester', tags: ['deutschland', 'trikot', 'wm2026'], createdAt: '2026-01-01',
  },
  {
    _id: '2', name: 'Deutschland Fan-Hoodie',
    nameTranslations: { en: 'Germany Fan Hoodie', es: 'Sudadera Fan Alemania' },
    slug: 'deutschland-fan-hoodie',
    description: 'Warmer Hoodie in Schwarz mit deutschem Wappen – ideal für kühle Stadionabende.',
    descriptionTranslations: { en: 'Warm hoodie in black with the German crest – ideal for cool stadium evenings.', es: 'Sudadera cálida en negro con el escudo alemán.' },
    price: 64.99, category: 'hoodies', team: 'deutschland', images: [],
    variants: [
      { size: 'S', color: 'Schwarz', stock: 40, sku: 'DEU-HOOD-S' },
      { size: 'M', color: 'Schwarz', stock: 60, sku: 'DEU-HOOD-M' },
      { size: 'L', color: 'Schwarz', stock: 55, sku: 'DEU-HOOD-L' },
      { size: 'XL', color: 'Schwarz', stock: 35, sku: 'DEU-HOOD-XL' },
    ],
    totalStock: 190, rating: 4.6, numReviews: 58, isFeatured: false,
    material: '80% Baumwolle, 20% Polyester', tags: ['deutschland', 'hoodie', 'wm2026'], createdAt: '2026-01-02',
  },

  // ===== BRASILIEN =====
  {
    _id: '3', name: 'Brasilien Fan-Shirt',
    nameTranslations: { en: 'Brazil Fan Shirt', es: 'Camiseta Fan Brasil' },
    slug: 'brasilien-fan-shirt-2026',
    description: 'Farbenfrohes Fan-Shirt im brasilianischen Stil – Gelb/Grün. 100% Baumwolle, angenehm zu tragen.',
    descriptionTranslations: { en: 'Colorful fan shirt in Brazilian style – yellow/green.', es: 'Camiseta de aficionado colorida al estilo brasileño.' },
    price: 39.99, category: 'tshirts', team: 'brasilien', images: [],
    variants: [
      { size: 'S', color: 'Gelb', stock: 80, sku: 'BRA-TS-S' },
      { size: 'M', color: 'Gelb', stock: 100, sku: 'BRA-TS-M' },
      { size: 'L', color: 'Gelb', stock: 90, sku: 'BRA-TS-L' },
      { size: 'XL', color: 'Gelb', stock: 60, sku: 'BRA-TS-XL' },
    ],
    totalStock: 330, rating: 4.5, numReviews: 89, isFeatured: true,
    material: '100% Baumwolle', tags: ['brasilien', 'tshirt', 'wm2026'], createdAt: '2026-01-03',
  },
  {
    _id: '4', name: 'Brasilien Heimtrikot 2026',
    nameTranslations: { en: 'Brazil Home Jersey 2026', es: 'Camiseta Local Brasil 2026' },
    slug: 'brasilien-heimtrikot-2026',
    description: 'Klassisches Brasilien-Trikot in Gold-Gelb mit grünen Akzenten – der Traum jedes Fußballfans.',
    descriptionTranslations: { en: 'Classic Brazil jersey in gold-yellow with green accents.', es: 'Camiseta clásica de Brasil en amarillo dorado con acentos verdes.' },
    price: 84.99, category: 'trikots', team: 'brasilien', images: [],
    variants: [
      { size: 'S', color: 'Gelb', stock: 45, sku: 'BRA-TRK-S' },
      { size: 'M', color: 'Gelb', stock: 70, sku: 'BRA-TRK-M' },
      { size: 'L', color: 'Gelb', stock: 65, sku: 'BRA-TRK-L' },
      { size: 'XL', color: 'Gelb', stock: 40, sku: 'BRA-TRK-XL' },
    ],
    totalStock: 220, rating: 4.7, numReviews: 102, isFeatured: true,
    material: '100% Polyester', tags: ['brasilien', 'trikot', 'wm2026'], createdAt: '2026-01-04',
  },

  // ===== ARGENTINIEN =====
  {
    _id: '5', name: 'Argentinien Hoodie',
    nameTranslations: { en: 'Argentina Hoodie', es: 'Sudadera Argentina' },
    slug: 'argentinien-hoodie-2026',
    description: 'Gemütlicher Hoodie in den argentinischen Nationalfarben Hellblau/Weiß.',
    descriptionTranslations: { en: 'Cozy hoodie in Argentine national colors light blue/white.', es: 'Sudadera acogedora en los colores nacionales argentinos.' },
    price: 59.99, category: 'hoodies', team: 'argentinien', images: [],
    variants: [
      { size: 'S', color: 'Hellblau', stock: 45, sku: 'ARG-HOOD-S' },
      { size: 'M', color: 'Hellblau', stock: 65, sku: 'ARG-HOOD-M' },
      { size: 'L', color: 'Hellblau', stock: 55, sku: 'ARG-HOOD-L' },
      { size: 'XL', color: 'Hellblau', stock: 35, sku: 'ARG-HOOD-XL' },
    ],
    totalStock: 200, rating: 4.7, numReviews: 67, isFeatured: true,
    material: '80% Baumwolle, 20% Polyester', tags: ['argentinien', 'hoodie', 'wm2026'], createdAt: '2026-01-05',
  },
  {
    _id: '6', name: 'Argentinien Trikot – Weltmeister Edition',
    nameTranslations: { en: 'Argentina Jersey – World Champion Edition', es: 'Camiseta Argentina – Edición Campeón Mundial' },
    slug: 'argentinien-trikot-2026',
    description: 'Das ikonische Argentinien-Trikot mit Querstreifen – jetzt in der WM-2026-Edition.',
    descriptionTranslations: { en: 'The iconic Argentina jersey with horizontal stripes – now in the WM 2026 edition.', es: 'La icónica camiseta argentina con rayas horizontales.' },
    price: 89.99, category: 'trikots', team: 'argentinien', images: [],
    variants: [
      { size: 'S', color: 'Hellblau/Weiß', stock: 55, sku: 'ARG-TRK-S' },
      { size: 'M', color: 'Hellblau/Weiß', stock: 80, sku: 'ARG-TRK-M' },
      { size: 'L', color: 'Hellblau/Weiß', stock: 70, sku: 'ARG-TRK-L' },
      { size: 'XL', color: 'Hellblau/Weiß', stock: 45, sku: 'ARG-TRK-XL' },
    ],
    totalStock: 250, rating: 4.9, numReviews: 188, isFeatured: true,
    material: '100% Polyester', tags: ['argentinien', 'trikot', 'wm2026'], createdAt: '2026-01-06',
  },

  // ===== FRANKREICH =====
  {
    _id: '7', name: 'Frankreich Trainingsjacke',
    nameTranslations: { en: 'France Training Jacket', es: 'Chaqueta de Entrenamiento Francia' },
    slug: 'frankreich-trainingsjacke-2026',
    description: 'Leichte Trainingsjacke in Blau-Weiß-Rot – perfekt für kühle Stadionabende.',
    descriptionTranslations: { en: 'Lightweight training jacket in blue-white-red.', es: 'Chaqueta de entrenamiento ligera en azul-blanco-rojo.' },
    price: 69.99, category: 'jacken', team: 'frankreich', images: [],
    variants: [
      { size: 'S', color: 'Blau', stock: 30, sku: 'FRA-JAC-S' },
      { size: 'M', color: 'Blau', stock: 50, sku: 'FRA-JAC-M' },
      { size: 'L', color: 'Blau', stock: 45, sku: 'FRA-JAC-L' },
      { size: 'XL', color: 'Blau', stock: 25, sku: 'FRA-JAC-XL' },
    ],
    totalStock: 150, rating: 4.6, numReviews: 43, isFeatured: true,
    material: '100% Polyester', tags: ['frankreich', 'jacke', 'wm2026'], createdAt: '2026-01-07',
  },
  {
    _id: '8', name: 'Frankreich Trikot 2026',
    nameTranslations: { en: 'France Jersey 2026', es: 'Camiseta Francia 2026' },
    slug: 'frankreich-trikot-2026',
    description: 'Das elegante Frankreich-Trikot in Dunkelblau – das Design der Weltmeister.',
    descriptionTranslations: { en: 'The elegant France jersey in dark blue – the design of world champions.', es: 'La elegante camiseta de Francia en azul oscuro.' },
    price: 79.99, category: 'trikots', team: 'frankreich', images: [],
    variants: [
      { size: 'S', color: 'Blau', stock: 40, sku: 'FRA-TRK-S' },
      { size: 'M', color: 'Blau', stock: 65, sku: 'FRA-TRK-M' },
      { size: 'L', color: 'Blau', stock: 55, sku: 'FRA-TRK-L' },
      { size: 'XL', color: 'Blau', stock: 30, sku: 'FRA-TRK-XL' },
    ],
    totalStock: 190, rating: 4.7, numReviews: 76, isFeatured: false,
    material: '100% Polyester', tags: ['frankreich', 'trikot', 'wm2026'], createdAt: '2026-01-08',
  },

  // ===== SPANIEN =====
  {
    _id: '9', name: 'Spanien Cap',
    nameTranslations: { en: 'Spain Cap', es: 'Gorra España' },
    slug: 'spanien-cap-2026',
    description: 'Stilvolle Cap in Rot mit goldenem Akzent – für alle Spanien-Fans. Einheitsgröße.',
    descriptionTranslations: { en: 'Stylish cap in red with gold accent.', es: 'Gorra elegante en rojo con acento dorado.' },
    price: 24.99, category: 'caps', team: 'spanien', images: [],
    variants: [{ size: 'OneSize', color: 'Rot', stock: 200, sku: 'ESP-CAP-OS' }],
    totalStock: 200, rating: 4.4, numReviews: 31, isFeatured: false,
    material: '100% Baumwolle', tags: ['spanien', 'cap', 'wm2026'], createdAt: '2026-01-09',
  },
  {
    _id: '10', name: 'Spanien Trikot 2026',
    nameTranslations: { en: 'Spain Jersey 2026', es: 'Camiseta España 2026' },
    slug: 'spanien-trikot-2026',
    description: 'Das klassische Spanien-Trikot in Rot und Gold – für alle La-Roja-Fans.',
    descriptionTranslations: { en: 'The classic Spain jersey in red and gold – for all La Roja fans.', es: 'La clásica camiseta de España en rojo y dorado.' },
    price: 79.99, category: 'trikots', team: 'spanien', images: [],
    variants: [
      { size: 'S', color: 'Rot', stock: 50, sku: 'ESP-TRK-S' },
      { size: 'M', color: 'Rot', stock: 75, sku: 'ESP-TRK-M' },
      { size: 'L', color: 'Rot', stock: 60, sku: 'ESP-TRK-L' },
      { size: 'XL', color: 'Rot', stock: 40, sku: 'ESP-TRK-XL' },
    ],
    totalStock: 225, rating: 4.6, numReviews: 54, isFeatured: false,
    material: '100% Polyester', tags: ['spanien', 'trikot', 'wm2026'], createdAt: '2026-01-10',
  },

  // ===== ENGLAND =====
  {
    _id: '11', name: 'England Schal',
    nameTranslations: { en: 'England Scarf', es: 'Bufanda Inglaterra' },
    slug: 'england-schal-2026',
    description: 'Klassischer Fußballschal in Rot-Weiß für alle England-Fans. Weiches Acryl-Material.',
    descriptionTranslations: { en: 'Classic football scarf in red and white for England fans.', es: 'Bufanda clásica de fútbol en rojo y blanco.' },
    price: 19.99, category: 'schals', team: 'england', images: [],
    variants: [{ size: 'OneSize', color: 'Rot/Weiß', stock: 150, sku: 'ENG-SCARF-OS' }],
    totalStock: 150, rating: 4.3, numReviews: 28, isFeatured: false,
    material: 'Acryl', tags: ['england', 'schal', 'wm2026'], createdAt: '2026-01-11',
  },
  {
    _id: '12', name: 'England Trikot 2026',
    nameTranslations: { en: 'England Jersey 2026', es: 'Camiseta Inglaterra 2026' },
    slug: 'england-trikot-2026',
    description: 'Das ikonische weiße England-Trikot mit rotem St. George Kreuz-Detail.',
    descriptionTranslations: { en: 'The iconic white England jersey with red St. George Cross detail.', es: 'La icónica camiseta blanca de Inglaterra.' },
    price: 74.99, category: 'trikots', team: 'england', images: [],
    variants: [
      { size: 'S', color: 'Weiß', stock: 55, sku: 'ENG-TRK-S' },
      { size: 'M', color: 'Weiß', stock: 80, sku: 'ENG-TRK-M' },
      { size: 'L', color: 'Weiß', stock: 70, sku: 'ENG-TRK-L' },
      { size: 'XL', color: 'Weiß', stock: 45, sku: 'ENG-TRK-XL' },
    ],
    totalStock: 250, rating: 4.5, numReviews: 93, isFeatured: false,
    material: '100% Polyester', tags: ['england', 'trikot', 'wm2026'], createdAt: '2026-01-12',
  },

  // ===== PORTUGAL =====
  {
    _id: '13', name: 'Portugal Trikot 2026',
    nameTranslations: { en: 'Portugal Jersey 2026', es: 'Camiseta Portugal 2026' },
    slug: 'portugal-trikot-2026',
    description: 'Das feurige Portugal-Trikot in Dunkelrot mit grünen Akzenten. Die Farben der Seleção!',
    descriptionTranslations: { en: 'The fiery Portugal jersey in dark red with green accents.', es: 'La ardiente camiseta de Portugal en rojo oscuro con acentos verdes.' },
    price: 79.99, category: 'trikots', team: 'portugal', images: [],
    variants: [
      { size: 'S', color: 'Rot', stock: 40, sku: 'POR-TRK-S' },
      { size: 'M', color: 'Rot', stock: 65, sku: 'POR-TRK-M' },
      { size: 'L', color: 'Rot', stock: 55, sku: 'POR-TRK-L' },
      { size: 'XL', color: 'Rot', stock: 35, sku: 'POR-TRK-XL' },
    ],
    totalStock: 195, rating: 4.7, numReviews: 82, isFeatured: true,
    material: '100% Polyester', tags: ['portugal', 'trikot', 'wm2026'], createdAt: '2026-01-13',
  },
  {
    _id: '14', name: 'Portugal Fan-Jacke',
    nameTranslations: { en: 'Portugal Fan Jacket', es: 'Chaqueta Fan Portugal' },
    slug: 'portugal-fan-jacke',
    description: 'Stilvolle Portugal-Fan-Jacke in Rot-Grün. Perfekt für die WM in Nordamerika.',
    descriptionTranslations: { en: 'Stylish Portugal fan jacket in red-green.', es: 'Elegante chaqueta de aficionado de Portugal en rojo-verde.' },
    price: 74.99, category: 'jacken', team: 'portugal', images: [],
    variants: [
      { size: 'S', color: 'Rot/Grün', stock: 30, sku: 'POR-JAC-S' },
      { size: 'M', color: 'Rot/Grün', stock: 45, sku: 'POR-JAC-M' },
      { size: 'L', color: 'Rot/Grün', stock: 40, sku: 'POR-JAC-L' },
      { size: 'XL', color: 'Rot/Grün', stock: 25, sku: 'POR-JAC-XL' },
    ],
    totalStock: 140, rating: 4.5, numReviews: 34, isFeatured: false,
    material: '100% Polyester', tags: ['portugal', 'jacke', 'wm2026'], createdAt: '2026-01-14',
  },

  // ===== NIEDERLANDE =====
  {
    _id: '15', name: 'Niederlande Trikot 2026',
    nameTranslations: { en: 'Netherlands Jersey 2026', es: 'Camiseta Países Bajos 2026' },
    slug: 'niederlande-trikot-2026',
    description: 'Das leuchtend orangefarbene Oranje-Trikot – unverkennbar und feurig!',
    descriptionTranslations: { en: 'The bright orange Oranje jersey – unmistakable and fiery!', es: 'La brillante camiseta naranja Oranje – ¡inconfundible y ardiente!' },
    price: 79.99, category: 'trikots', team: 'niederlande', images: [],
    variants: [
      { size: 'S', color: 'Orange', stock: 50, sku: 'NED-TRK-S' },
      { size: 'M', color: 'Orange', stock: 75, sku: 'NED-TRK-M' },
      { size: 'L', color: 'Orange', stock: 65, sku: 'NED-TRK-L' },
      { size: 'XL', color: 'Orange', stock: 40, sku: 'NED-TRK-XL' },
    ],
    totalStock: 230, rating: 4.6, numReviews: 61, isFeatured: true,
    material: '100% Polyester', tags: ['niederlande', 'trikot', 'wm2026'], createdAt: '2026-01-15',
  },
  {
    _id: '16', name: 'Niederlande Fan-Hoodie',
    nameTranslations: { en: 'Netherlands Fan Hoodie', es: 'Sudadera Fan Países Bajos' },
    slug: 'niederlande-hoodie-2026',
    description: 'Knalliger Oranje-Hoodie für alle Holland-Fans. Jetzt bist du bereit!',
    descriptionTranslations: { en: 'Vibrant orange hoodie for all Holland fans.', es: 'Sudadera naranja vibrante para todos los aficionados de Holanda.' },
    price: 59.99, category: 'hoodies', team: 'niederlande', images: [],
    variants: [
      { size: 'S', color: 'Orange', stock: 40, sku: 'NED-HOOD-S' },
      { size: 'M', color: 'Orange', stock: 60, sku: 'NED-HOOD-M' },
      { size: 'L', color: 'Orange', stock: 50, sku: 'NED-HOOD-L' },
      { size: 'XL', color: 'Orange', stock: 30, sku: 'NED-HOOD-XL' },
    ],
    totalStock: 180, rating: 4.4, numReviews: 39, isFeatured: false,
    material: '80% Baumwolle, 20% Polyester', tags: ['niederlande', 'hoodie', 'wm2026'], createdAt: '2026-01-16',
  },

  // ===== ITALIEN =====
  {
    _id: '17', name: 'Italien Trikot 2026 – Azzurri',
    nameTranslations: { en: 'Italy Jersey 2026 – Azzurri', es: 'Camiseta Italia 2026 – Azzurri' },
    slug: 'italien-trikot-2026',
    description: 'Das weltberühmte Azzurri-Trikot der Squadra Azzurra. Tiefblau und klassisch elegant.',
    descriptionTranslations: { en: 'The world-famous Azzurri jersey of the Squadra Azzurra. Deep blue and classically elegant.', es: 'La mundialmente famosa camiseta Azzurri de la Squadra Azzurra.' },
    price: 79.99, category: 'trikots', team: 'italien', images: [],
    variants: [
      { size: 'S', color: 'Blau', stock: 45, sku: 'ITA-TRK-S' },
      { size: 'M', color: 'Blau', stock: 70, sku: 'ITA-TRK-M' },
      { size: 'L', color: 'Blau', stock: 60, sku: 'ITA-TRK-L' },
      { size: 'XL', color: 'Blau', stock: 35, sku: 'ITA-TRK-XL' },
    ],
    totalStock: 210, rating: 4.7, numReviews: 95, isFeatured: true,
    material: '100% Polyester', tags: ['italien', 'trikot', 'wm2026'], createdAt: '2026-01-17',
  },

  // ===== KROATIEN =====
  {
    _id: '18', name: 'Kroatien Schachbrett-Trikot 2026',
    nameTranslations: { en: 'Croatia Checkered Jersey 2026', es: 'Camiseta Cuadros Croacia 2026' },
    slug: 'kroatien-trikot-2026',
    description: 'Das legendäre kroatische Schachbrett-Trikot in Rot-Weiß. Eines der schönsten Trikots der Welt.',
    descriptionTranslations: { en: 'The legendary Croatian checkered jersey in red-white. One of the most beautiful jerseys in the world.', es: 'La legendaria camiseta de cuadros croata en rojo-blanco.' },
    price: 84.99, category: 'trikots', team: 'kroatien', images: [],
    variants: [
      { size: 'S', color: 'Rot/Weiß', stock: 50, sku: 'CRO-TRK-S' },
      { size: 'M', color: 'Rot/Weiß', stock: 75, sku: 'CRO-TRK-M' },
      { size: 'L', color: 'Rot/Weiß', stock: 65, sku: 'CRO-TRK-L' },
      { size: 'XL', color: 'Rot/Weiß', stock: 40, sku: 'CRO-TRK-XL' },
    ],
    totalStock: 230, rating: 4.8, numReviews: 112, isFeatured: true,
    material: '100% Polyester', tags: ['kroatien', 'trikot', 'wm2026'], createdAt: '2026-01-18',
  },

  // ===== MAROKKO =====
  {
    _id: '19', name: 'Marokko Trikot 2026 – Atlas Lions',
    nameTranslations: { en: 'Morocco Jersey 2026 – Atlas Lions', es: 'Camiseta Marruecos 2026 – Leones del Atlas' },
    slug: 'marokko-trikot-2026',
    description: 'Das Trikot der Atlas Lions – Marokkos Nationalmannschaft in feurigem Rot-Grün.',
    descriptionTranslations: { en: 'The jersey of the Atlas Lions – Morocco\'s national team in fiery red-green.', es: 'La camiseta de los Leones del Atlas en ardiente rojo-verde.' },
    price: 74.99, category: 'trikots', team: 'marokko', images: [],
    variants: [
      { size: 'S', color: 'Rot', stock: 35, sku: 'MAR-TRK-S' },
      { size: 'M', color: 'Rot', stock: 55, sku: 'MAR-TRK-M' },
      { size: 'L', color: 'Rot', stock: 50, sku: 'MAR-TRK-L' },
      { size: 'XL', color: 'Rot', stock: 30, sku: 'MAR-TRK-XL' },
    ],
    totalStock: 170, rating: 4.6, numReviews: 44, isFeatured: false,
    material: '100% Polyester', tags: ['marokko', 'trikot', 'wm2026'], createdAt: '2026-01-19',
  },

  // ===== USA =====
  {
    _id: '20', name: 'USA Heimtrikot 2026',
    nameTranslations: { en: 'USA Home Jersey 2026', es: 'Camiseta Local USA 2026' },
    slug: 'usa-heimtrikot-2026',
    description: 'Das Stars-and-Stripes-Trikot der US-Nationalmannschaft. Gastgeber-Nation der WM 2026!',
    descriptionTranslations: { en: 'The Stars and Stripes jersey of the US national team. Host nation of WC 2026!', es: 'La camiseta de barras y estrellas de la selección estadounidense. ¡Nación anfitriona del CM 2026!' },
    price: 79.99, category: 'trikots', team: 'usa', images: [],
    variants: [
      { size: 'S', color: 'Blau', stock: 60, sku: 'USA-TRK-S' },
      { size: 'M', color: 'Blau', stock: 90, sku: 'USA-TRK-M' },
      { size: 'L', color: 'Blau', stock: 75, sku: 'USA-TRK-L' },
      { size: 'XL', color: 'Blau', stock: 50, sku: 'USA-TRK-XL' },
    ],
    totalStock: 275, rating: 4.5, numReviews: 67, isFeatured: true,
    material: '100% Polyester', tags: ['usa', 'trikot', 'wm2026', 'gastgeber'], createdAt: '2026-01-20',
  },
  {
    _id: '21', name: 'USA Fan-Cap',
    nameTranslations: { en: 'USA Fan Cap', es: 'Gorra Fan USA' },
    slug: 'usa-fan-cap',
    description: 'Die patriotische USA-Cap in Blau mit Rot-Weiß-Akzenten. Go USA!',
    descriptionTranslations: { en: 'The patriotic USA cap in blue with red-white accents. Go USA!', es: 'La patriótica gorra de USA en azul con acentos rojo-blanco.' },
    price: 27.99, category: 'caps', team: 'usa', images: [],
    variants: [{ size: 'OneSize', color: 'Blau', stock: 180, sku: 'USA-CAP-OS' }],
    totalStock: 180, rating: 4.3, numReviews: 28, isFeatured: false,
    material: '100% Baumwolle', tags: ['usa', 'cap', 'wm2026'], createdAt: '2026-01-21',
  },

  // ===== MEXIKO =====
  {
    _id: '22', name: 'Mexiko Trikot 2026 – El Tri',
    nameTranslations: { en: 'Mexico Jersey 2026 – El Tri', es: 'Camiseta México 2026 – El Tri' },
    slug: 'mexiko-trikot-2026',
    description: 'Das El-Tri-Trikot in sattem Grün mit Rot-Weiß-Akzenten. Viva México!',
    descriptionTranslations: { en: 'The El Tri jersey in deep green with red-white accents. Viva México!', es: 'La camiseta del Tri en verde intenso con acentos rojo-blanco. ¡Viva México!' },
    price: 74.99, category: 'trikots', team: 'mexiko', images: [],
    variants: [
      { size: 'S', color: 'Grün', stock: 45, sku: 'MEX-TRK-S' },
      { size: 'M', color: 'Grün', stock: 70, sku: 'MEX-TRK-M' },
      { size: 'L', color: 'Grün', stock: 60, sku: 'MEX-TRK-L' },
      { size: 'XL', color: 'Grün', stock: 38, sku: 'MEX-TRK-XL' },
    ],
    totalStock: 213, rating: 4.6, numReviews: 59, isFeatured: true,
    material: '100% Polyester', tags: ['mexiko', 'trikot', 'wm2026', 'gastgeber'], createdAt: '2026-01-22',
  },

  // ===== JAPAN =====
  {
    _id: '23', name: 'Japan Trikot 2026 – Samurai Blue',
    nameTranslations: { en: 'Japan Jersey 2026 – Samurai Blue', es: 'Camiseta Japón 2026 – Samurai Blue' },
    slug: 'japan-trikot-2026',
    description: 'Das elegante Japan-Trikot mit dem charakteristischen Origami-Muster der Samurai Blue.',
    descriptionTranslations: { en: 'The elegant Japan jersey with the characteristic Origami pattern of the Samurai Blue.', es: 'La elegante camiseta de Japón con el característico patrón Origami de los Samurai Blue.' },
    price: 79.99, category: 'trikots', team: 'japan', images: [],
    variants: [
      { size: 'S', color: 'Weiß', stock: 40, sku: 'JPN-TRK-S' },
      { size: 'M', color: 'Weiß', stock: 60, sku: 'JPN-TRK-M' },
      { size: 'L', color: 'Weiß', stock: 55, sku: 'JPN-TRK-L' },
      { size: 'XL', color: 'Weiß', stock: 35, sku: 'JPN-TRK-XL' },
    ],
    totalStock: 190, rating: 4.7, numReviews: 73, isFeatured: false,
    material: '100% Polyester', tags: ['japan', 'trikot', 'wm2026'], createdAt: '2026-01-23',
  },

  // ===== SENEGAL =====
  {
    _id: '24', name: 'Senegal Trikot 2026 – Lions du Sénégal',
    nameTranslations: { en: 'Senegal Jersey 2026 – Lions of Senegal', es: 'Camiseta Senegal 2026' },
    slug: 'senegal-trikot-2026',
    description: 'Das strahlend weiße Senegal-Trikot mit grün-roten Akzenten der stolzen Lions du Sénégal.',
    descriptionTranslations: { en: 'The brilliant white Senegal jersey with green-red accents of the proud Lions of Senegal.', es: 'La brillante camiseta blanca de Senegal con acentos verde-rojo.' },
    price: 69.99, category: 'trikots', team: 'senegal', images: [],
    variants: [
      { size: 'S', color: 'Grün', stock: 35, sku: 'SEN-TRK-S' },
      { size: 'M', color: 'Grün', stock: 55, sku: 'SEN-TRK-M' },
      { size: 'L', color: 'Grün', stock: 48, sku: 'SEN-TRK-L' },
      { size: 'XL', color: 'Grün', stock: 30, sku: 'SEN-TRK-XL' },
    ],
    totalStock: 168, rating: 4.5, numReviews: 32, isFeatured: false,
    material: '100% Polyester', tags: ['senegal', 'trikot', 'wm2026'], createdAt: '2026-01-24',
  },

  // ===== SPECIAL =====
  {
    _id: '25', name: 'WM 2026 Limited Edition T-Shirt',
    nameTranslations: { en: 'WC 2026 Limited Edition T-Shirt', es: 'Camiseta Edición Limitada CM 2026' },
    slug: 'wm-2026-limited-edition-tshirt',
    description: 'Exklusives T-Shirt zur Fußball-WM 2026 – nur in limitierter Stückzahl! 100% Bio-Baumwolle.',
    descriptionTranslations: { en: 'Exclusive T-Shirt for WC 2026 – limited quantities only! 100% organic cotton.', es: 'Camiseta exclusiva para el CM 2026 – ¡cantidades limitadas! 100% algodón orgánico.' },
    price: 49.99, discountPrice: 39.99, category: 'limited', team: 'neutral', images: [],
    variants: [
      { size: 'S', color: 'Schwarz', stock: 25, sku: 'LTD-2026-S' },
      { size: 'M', color: 'Schwarz', stock: 25, sku: 'LTD-2026-M' },
      { size: 'L', color: 'Schwarz', stock: 25, sku: 'LTD-2026-L' },
    ],
    totalStock: 75, rating: 4.9, numReviews: 12, isLimited: true, isFeatured: true,
    material: '100% Bio-Baumwolle', tags: ['limited', 'wm2026', 'exklusiv'], saleEndsAt: '2026-07-19', createdAt: '2026-01-25',
  },
  {
    _id: '26', name: 'WM 2026 Kinder-Trikot',
    nameTranslations: { en: 'WC 2026 Kids Jersey', es: 'Camiseta Infantil CM 2026' },
    slug: 'wm-2026-kinder-trikot',
    description: 'Buntes Kindertrikot für die kleinen Fußballfans – leicht, weich und strapazierfähig.',
    descriptionTranslations: { en: 'Colorful kids jersey for the little football fans – lightweight, soft and durable.', es: 'Camiseta infantil colorida para los pequeños aficionados al fútbol.' },
    price: 34.99, category: 'kinder', team: 'neutral', images: [],
    variants: [
      { size: '128', color: 'Gemischt', stock: 60, sku: 'KID-TRK-128' },
      { size: '140', color: 'Gemischt', stock: 70, sku: 'KID-TRK-140' },
      { size: '152', color: 'Gemischt', stock: 55, sku: 'KID-TRK-152' },
      { size: '164', color: 'Gemischt', stock: 45, sku: 'KID-TRK-164' },
    ],
    totalStock: 230, rating: 4.7, numReviews: 56, isFeatured: true,
    material: '100% Polyester', tags: ['kinder', 'trikot', 'wm2026'], createdAt: '2026-01-26',
  },
  {
    _id: '27', name: 'Südkorea Trikot 2026 – Taeguk Warriors',
    nameTranslations: { en: 'South Korea Jersey 2026 – Taeguk Warriors', es: 'Camiseta Corea del Sur 2026' },
    slug: 'suedkorea-trikot-2026',
    description: 'Das traditionelle weiße Südkorea-Trikot der Taeguk Warriors – mit Tigermuster-Details.',
    descriptionTranslations: { en: 'The traditional white South Korea jersey of the Taeguk Warriors.', es: 'La tradicional camiseta blanca de Corea del Sur.' },
    price: 74.99, category: 'trikots', team: 'suedkorea', images: [],
    variants: [
      { size: 'S', color: 'Weiß', stock: 35, sku: 'KOR-TRK-S' },
      { size: 'M', color: 'Weiß', stock: 55, sku: 'KOR-TRK-M' },
      { size: 'L', color: 'Weiß', stock: 48, sku: 'KOR-TRK-L' },
      { size: 'XL', color: 'Weiß', stock: 30, sku: 'KOR-TRK-XL' },
    ],
    totalStock: 168, rating: 4.5, numReviews: 38, isFeatured: false,
    material: '100% Polyester', tags: ['suedkorea', 'trikot', 'wm2026'], createdAt: '2026-01-27',
  },
  {
    _id: '28', name: 'Australien Trikot 2026 – Socceroos',
    nameTranslations: { en: 'Australia Jersey 2026 – Socceroos', es: 'Camiseta Australia 2026 – Socceroos' },
    slug: 'australien-trikot-2026',
    description: 'Das grün-goldene Socceroos-Trikot – stolz wie ein Känguru!',
    descriptionTranslations: { en: 'The green-gold Socceroos jersey – proud as a kangaroo!', es: '¡La camiseta verde-dorada de los Socceroos – orgullosa como un canguro!' },
    price: 69.99, category: 'trikots', team: 'australien', images: [],
    variants: [
      { size: 'S', color: 'Grün', stock: 35, sku: 'AUS-TRK-S' },
      { size: 'M', color: 'Grün', stock: 52, sku: 'AUS-TRK-M' },
      { size: 'L', color: 'Grün', stock: 45, sku: 'AUS-TRK-L' },
      { size: 'XL', color: 'Grün', stock: 28, sku: 'AUS-TRK-XL' },
    ],
    totalStock: 160, rating: 4.4, numReviews: 27, isFeatured: false,
    material: '100% Polyester', tags: ['australien', 'trikot', 'wm2026'], createdAt: '2026-01-28',
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
