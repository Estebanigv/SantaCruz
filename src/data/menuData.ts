// Carta Loló - Restaurante Viña Santa Cruz
// Datos extraídos del PDF oficial

export interface MenuItem {
  name: string
  price: number
  description?: string
  pairing?: string // Maridaje sugerido
  isVegan?: boolean
  isSignature?: boolean // Plato destacado
  isWeekendOnly?: boolean
}

export interface MenuSection {
  id: string
  title: string
  subtitle?: string
  items: MenuItem[]
}

export interface WineItem {
  name: string
  varietal: string
  priceGlass?: number
  priceBottle?: number
}

export interface WineCategory {
  id: string
  title: string
  wines: WineItem[]
}

// Historia de Loló
export const loloHistory = {
  title: 'La Historia de Loló',
  subtitle: 'El Restaurante de Viña Santa Cruz',
  paragraphs: [
    'Hace unos 10.000 años por el campo de Lolol transitaban gonfoterios (elefantes americanos), tigres dientes de sable y gliptodontes (armadillos gigantes). Estos extintos animales eran cazados por grupos humanos nómadas que en ciertas temporadas pasaban por esta zona rica en vegetales, consumiendo entre ellos el fruto del espino llamado quirinca, árbol que está presente entre la región de Atacama y del Bio-Bio en nuestro país.',
    'Este fruto era machacado con palos sobre piedras, las cuales al desgastarse creaban tacitas u hoyos que servían como una especie de mortero. La mayor concentración de estas piedras, que cuentan la historia alimentaria de nuestros antepasados, se encuentra en Punta la Piedra, a 4,5 km de Viña Santa Cruz, en la comuna de Lolol.',
    'Al llegar los mapuches denominaron esta zona como Lo Lo, \'lugar de muchos hoyos\'. Con la llegada de los españoles, así como muchas localidades con nombre mapuche, fue adaptada al español, quedando finalmente como Lolol.',
    'Hoy como equipo, inspirados por nuestro entorno y por las creaciones del chef lololino Marcos Baeza, damos un gran paso en nuestra cocina, llevando a la mesa una comida honesta, acompañada con excelentes vinos que enaltecen los productos de origen local. Así nace Loló, la renovada propuesta gastronómica de Viña Santa Cruz.'
  ]
}

// Vinos por Copa y Botella
export const wineCategories: WineCategory[] = [
  {
    id: 'premium',
    title: 'Premium & Edición Limitada',
    wines: [
      { name: 'Santa Cruz Terrazas', varietal: 'Petit Verdot', priceBottle: 55000 },
      { name: 'Tupu - Edición Limitada', varietal: 'Cabernet Sauvignon, Malbec y Syrah', priceGlass: 8000, priceBottle: 30000 },
      { name: 'Make Make', varietal: 'Tempranillo, Mourvedre, Garnacha', priceGlass: 7500, priceBottle: 25000 },
    ]
  },
  {
    id: 'pequena-escala',
    title: 'Pequeña Escala',
    wines: [
      { name: 'Fortificado', varietal: 'Touriga Nacional', priceGlass: 9000, priceBottle: 35000 },
      { name: 'Touriga Nacional', varietal: 'Touriga Nacional', priceGlass: 8000, priceBottle: 25000 },
      { name: 'Garnacha', varietal: 'Garnacha', priceGlass: 6500, priceBottle: 25000 },
      { name: 'País', varietal: 'País', priceGlass: 6500, priceBottle: 25000 },
    ]
  },
  {
    id: 'kultrun',
    title: 'Kultrun',
    wines: [
      { name: 'Kultrun', varietal: 'Brut Nature, Método Tradicional, País', priceGlass: 6000, priceBottle: 20000 },
    ]
  },
  {
    id: 'gran-chaman',
    title: 'Gran Chamán',
    wines: [
      { name: 'Gran Chamán', varietal: 'Cabernet Sauvignon, Syrah, Malbec, Merlot', priceGlass: 5500, priceBottle: 9000 },
    ]
  },
  {
    id: 'chaman-gran-reserva',
    title: 'Chamán Gran Reserva',
    wines: [
      { name: 'Malbec', varietal: 'Malbec', priceGlass: 5500, priceBottle: 9000 },
      { name: 'Carménère', varietal: 'Carménère', priceGlass: 5500, priceBottle: 9000 },
      { name: 'Cabernet Sauvignon', varietal: 'Cabernet Sauvignon', priceGlass: 5500, priceBottle: 9000 },
    ]
  },
  {
    id: 'chaman-reserva',
    title: 'Chamán Reserva',
    wines: [
      { name: 'Cabernet Sauvignon', varietal: 'Cabernet Sauvignon', priceGlass: 3500, priceBottle: 7500 },
      { name: 'Carménère, Cabernet Sauvignon', varietal: 'Blend', priceGlass: 3500, priceBottle: 7500 },
      { name: 'Rosé', varietal: 'Rosé', priceGlass: 3500, priceBottle: 7500 },
      { name: 'Sauvignon Blanc', varietal: 'Sauvignon Blanc', priceGlass: 3500, priceBottle: 7500 },
    ]
  },
]

// Coctelería
export const cocktails: MenuSection = {
  id: 'cocteleria',
  title: 'Coctelería',
  subtitle: 'Cócteles de autor con vinos Viña Santa Cruz',
  items: [
    { name: 'Pisco Sour', price: 6000, description: 'Pisco, jugo de limón, jarabe simple, hielo.' },
    { name: 'Mojito Colchagüino', price: 6000, description: 'Nuestra versión del clásico mojito, pero con Chamán Sauvignon Blanc.' },
    { name: 'Mojito Kultrun', price: 7000, description: 'Nuestra versión del clásico mojito, pero con espumante Kultrun.' },
    { name: 'Negroni del Chamán', price: 7500, description: 'Chamán Carménère, jarabe de vino, Campari, Gin, naranja.' },
    { name: 'Mimosa Kultrun', price: 7500, description: 'Espumante y pulpa de mango.' },
    { name: 'Rosé Sour', price: 5500, description: 'Una versión propia del típico sour, pero con nuestro Chamán Rosé.' },
    { name: 'Rossini Kultrun', price: 6500, description: 'Espumante y pulpa de frutilla.' },
    { name: 'Tinto de Verano', price: 6000, description: 'Chamán Reserva Cabernet Sauvignon, bebida de Limón y hielo.' },
    { name: 'Espíritus de Colchagua', price: 5000, description: 'Licores locales de diferentes macerados.' },
    { name: 'Blanc Tonic', price: 6500, description: 'Chamán Sauvignon Blanc, agua tónica, rodajas de pepino, menta, goma y hielo.' },
    { name: 'Vaina Fortificada', price: 6500, description: 'Pequeña Escala Fortificado, cacao en polvo, coñac y jarabe simple.' },
    { name: 'Rosé Tonic', price: 6500, description: 'Chamán Rosé, agua tónica, rodajas de limón, romero, goma y hielo.' },
    { name: 'Aperol Spritz', price: 7500, description: 'Nuestro espumante Kultrun, Aperol, rodaja de naranja.' },
    { name: 'Tintonic', price: 6500, description: 'Chamán Cabernet Sauvignon, agua tónica, rodajas de naranja, goma y hielo.' },
    { name: 'Carmenere Sour', price: 6500, description: 'Nuestro Carmenere Gran Reserva en versión sour.' },
    { name: 'Sangría', price: 6500, description: 'Nuestro red Blend Chamán con fruta macerada y goma.' },
    { name: 'Blanc Margarita', price: 7200, description: 'El clásico margarita pero con la intervención de nuestro Chamán Reserva Sauvignon Blanc.' },
    { name: 'Obsesión Malbec', price: 7500, description: 'Cóctel cremoso en base a Chamán Gran Reserva Malbec, ron Habana Club y leche condensada.' },
    { name: 'Atardecer Garnacha', price: 7500, description: 'Aperitivo seco con whisky, Pequeña Escala Garnacha, jugo de naranja y toques de vermouth.' },
    { name: 'Sandía Espumosa', price: 7900, description: 'Refrescante y frutoso en base a gin, espumante Kultrun Brut Nature y jugo de sandía.' },
    { name: 'Cosmos Rosé', price: 7500, description: 'Chamán Rosé, vodka, jugo de arándanos, limón y triple sec.' },
    { name: 'Mojito de Uva Sin Alcohol', price: 7500, description: 'Jugo Tamaya Malbec, Moscatel o Sauvignon Blanc, limón, menta y un toque de soda.' },
  ]
}

// Licores
export const spirits: MenuSection = {
  id: 'licores',
  title: 'Licores',
  items: [
    { name: 'Pisco Mistral Nobel 40°', price: 4900 },
    { name: 'Pisco Alto del Carmen 40°', price: 4900 },
    { name: 'Whisky Johnny Walker Red Label', price: 5800 },
    { name: 'Whisky Johnny Walker Black Label', price: 9000 },
    { name: 'Gin Tanqueray', price: 5500 },
    { name: 'Gin Bombay Sapphire', price: 6000 },
    { name: 'Vermouth Dolin', price: 6200 },
    { name: 'Vodka Absolut', price: 6200 },
  ]
}

// Ensaladas
export const salads: MenuSection = {
  id: 'ensaladas',
  title: 'Ensaladas',
  items: [
    { name: 'Ensalada de la Viña', price: 14800, pairing: 'Chamán Reserva Sauvignon Blanc' },
    { name: 'Ensalada Lolol', price: 14800, description: 'Mix verde con huevos de codorniz, queso de cabra, palta, tomate cherry fresco y aderezo de higos.', pairing: 'Pequeña Escala País', isSignature: true },
  ]
}

// Entradas Frías
export const coldStarters: MenuSection = {
  id: 'entradas-frias',
  title: 'Entradas Frías',
  items: [
    { name: 'Ceviche de Bucalemu', price: 16000, pairing: 'Chamán Reserva Rosé' },
    { name: 'Locos con Mayonesa y Salsa Verde', price: 27500, pairing: 'Kultrun Extra Brut', isSignature: true },
    { name: 'Ceviche de Cochayuyo', price: 12800, pairing: 'Chamán Reserva Sauvignon Blanc', isVegan: true },
  ]
}

// Entradas Calientes
export const hotStarters: MenuSection = {
  id: 'entradas-calientes',
  title: 'Entradas Calientes',
  items: [
    { name: 'Mollejas con Chimichurri de Ajos Asados y Harina Tostada', price: 17800, pairing: 'Pequeña Escala Garnacha' },
    { name: 'Empanadas del Chef', price: 15500, description: 'Mix de 4 empanadas fritas: pino, queso, prieta papaya y champiñón berenjena.', pairing: 'Gran Chamán' },
    { name: 'La Parrillera', price: 18500, description: 'Plancha con prieta, arrollado de huaso, longaniza y papa cocida.', pairing: 'Pequeña Escala País', isSignature: true },
    { name: 'Camarones con Centolla Trufada', price: 20500, pairing: 'Kultrun Extra Brut', isSignature: true },
  ]
}

// Platos Principales
export const mainCourses: MenuSection = {
  id: 'principales',
  title: 'Principales',
  items: [
    { name: 'Asado de Tira al Cedrón', price: 25400, description: 'Costilla de vacuno sellado a las brasas y cocinado por 4 horas en cocción lenta, servido en su salsa al vino rosé, hierba de cedrón y harina tostada.', pairing: 'Santa Cruz Terrazas', isSignature: true },
    { name: 'Arroz Costino', price: 21500, description: 'Calamar, camarón, ostión, langostino, salsa de ostras, cebollín, champiñón, zapallo italiano, berenjena y aceite de sésamo.', pairing: 'Gran Chamán Selección del Enólogo y Viticultor' },
    { name: 'Costillar de Cerdo al Horno de Barro', price: 19800, description: 'Cocinado por 3 horas en horno de barro, con leña de Carménère.', pairing: 'Tupu, Edición Limitada', isSignature: true },
    { name: 'Pollo de Grano Enguindado', price: 25800, description: 'Pollo de granja local entero con licor de guinda Espíritus de Colchagua, sobre cama de puré rústico.', pairing: 'Pequeña Escala Touriga Nacional', isSignature: true },
    { name: 'Cazuela de Osobuco', price: 18500, description: 'Cazuela clásica con papa, zapallo camote, choclo, arroz, porotos verdes y osobuco de vacuno. Sabores que evocan la infancia.', pairing: 'Gran Chamán Cabernet Sauvignon' },
    { name: 'Pastel de Choclo Loló', price: 20500, description: 'Clásica preparación en base a choclos y carne de chivo.', pairing: 'Chamán Gran Reserva Carménère', isSignature: true },
    { name: 'Pastel de Choclo Vegano', price: 15500, description: 'Ratatouille de verduras asado con pastelera de choclo y aceitunas.', pairing: 'Chamán Gran Reserva Carménère', isVegan: true },
    { name: 'Paila Loló', price: 22500, description: 'Mariscal caliente con pulpo, locos, anillos de calamar, camarón, ostión, almeja, choro maltón, piure y langostino.', pairing: 'Chamán Reserva Sauvignon Blanc', isSignature: true },
    { name: 'Salmón a la Mantequilla', price: 22500, description: 'Salmón con mantequilla, alcaparras y espárragos salteados.', pairing: 'Make Make' },
    { name: 'Pejerreyes con Charquicán Costino', price: 18500, description: 'Pejerreyes fritos, acompañados de charquicán, con trozos de cochayuyo y cebolla fresca.', pairing: 'Chamán Reserva Rosé' },
  ]
}

// De la Parrilla (Solo fines de semana)
export const grill: MenuSection = {
  id: 'parrilla',
  title: 'De la Parrilla',
  subtitle: 'Solo fines de semana',
  items: [
    { name: 'Lomo Vetado - 400 gr', price: 27500, pairing: 'Tupu, Edición Limitada', isWeekendOnly: true },
    { name: 'Filete de Res - 300 gr', price: 25800, pairing: 'Santa Cruz Terrazas', isWeekendOnly: true },
    { name: 'Longanizas - 2 unidades', price: 11800, pairing: 'Chamán Gran Reserva Cabernet Sauvignon', isWeekendOnly: true },
    { name: 'Prietas - 2 unidades', price: 11800, pairing: 'Gran Chamán', isWeekendOnly: true },
  ]
}

// Para Acompañar
export const sides: MenuSection = {
  id: 'acompanar',
  title: 'Para Acompañar',
  items: [
    { name: 'A la Chilena', price: 5200, description: 'Tomates colchagüinos, cebolla morada, cilantro y ají verde.' },
    { name: 'Pastelera de Choclo', price: 6000, description: 'Cremoso en base a choclo con albahaca fresca.' },
    { name: 'Papas Chilotas con Mote', price: 6200, description: 'Papas cocidas y salteadas servidas sobre mote cremoso.', isSignature: true },
    { name: 'Papas Fritas', price: 5500 },
    { name: 'Vegetales Asados', price: 5500, description: 'Zapallo italiano, berenjena, pimentones, champiñón y cebolla morada.', isSignature: true },
  ]
}

// Para los Niños
export const kids: MenuSection = {
  id: 'ninos',
  title: 'Para los Niños',
  items: [
    { name: 'Spaghetti con Salsa Boloñesa', price: 9800 },
    { name: 'Pollo Apanado con Papas Fritas', price: 10900 },
    { name: 'Filete - 180 gr con Papas Fritas o Arroz', price: 18900 },
  ]
}

// Postres
export const desserts: MenuSection = {
  id: 'postres',
  title: 'Postres',
  items: [
    { name: 'Helado Artesanal', price: 6800 },
    { name: 'Helados Artesanales Sin Azúcar', price: 6800 },
    { name: 'Peras al Sauvignon Blanc', price: 6800, isSignature: true },
    { name: 'Papayas a la Crema', price: 7500 },
    { name: 'Leche Asada', price: 6800 },
    { name: 'Celestinos con Helado', price: 6800 },
  ]
}

// Para Beber
export const beverages: MenuSection = {
  id: 'bebidas',
  title: 'Para Beber',
  items: [
    { name: 'Agua Prisma con o sin gas', price: 2900 },
    { name: 'Jugo de Uva Prensado en Frío', price: 3500, description: 'Malbec o Sauvignon Blanc' },
    { name: 'Jugo Natural de Frutas', price: 4500 },
    { name: 'Bebidas', price: 2500 },
    { name: 'Néctar de Fruta', price: 2500 },
    { name: 'Bebida Energética', price: 3500 },
  ]
}

// Cervezas
export const beers: MenuSection = {
  id: 'cervezas',
  title: 'Cervezas',
  items: [
    { name: 'Kunstmann 0 - Sin Alcohol', price: 4000 },
    { name: 'Austral Lager o Calafate', price: 4000 },
    { name: 'Kunstmann Torobayo', price: 4000 },
  ]
}

// Cafetería
export const coffee: MenuSection = {
  id: 'cafeteria',
  title: 'Cafetería',
  items: [
    { name: 'Espresso', price: 2500 },
    { name: 'Ristreto', price: 2500 },
    { name: 'Americano', price: 2500 },
    { name: 'Cortado', price: 4000 },
    { name: 'Capuccino', price: 4000 },
    { name: 'Mocaccino', price: 4500 },
  ]
}

// Navegación del menú
export const menuNavigation = [
  { id: 'vinos', label: 'Vinos', icon: 'wine' },
  { id: 'cocteleria', label: 'Coctelería', icon: 'cocktail' },
  { id: 'ensaladas', label: 'Ensaladas', icon: 'salad' },
  { id: 'entradas', label: 'Entradas', icon: 'starter' },
  { id: 'principales', label: 'Principales', icon: 'main' },
  { id: 'parrilla', label: 'Parrilla', icon: 'grill' },
  { id: 'acompanar', label: 'Acompañar', icon: 'side' },
  { id: 'ninos', label: 'Niños', icon: 'kids' },
  { id: 'postres', label: 'Postres', icon: 'dessert' },
  { id: 'bebidas', label: 'Bebidas', icon: 'drink' },
  { id: 'cervezas', label: 'Cervezas', icon: 'beer' },
  { id: 'cafeteria', label: 'Cafetería', icon: 'coffee' },
]
