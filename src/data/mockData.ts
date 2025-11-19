import { Wine, Tour, MembershipTier, Testimonial, InstagramPost } from '../types'

export const featuredWines: Wine[] = [
  {
    id: '1',
    sku: 'VSC-CAB-001',
    name: 'Cabernet Sauvignon Reserva',
    varietal: 'Cabernet Sauvignon',
    category: 'tinto',
    vintage: 2021,
    price: 25990,
    image: '/images/wines/cabernet-reserva.jpg',
    rating: 5,
    description: 'Tinto elegante del Valle de Colchagua con notas de frutos rojos y especias.'
  },
  {
    id: '2',
    sku: 'VSC-CAR-002',
    name: 'Carmenere Gran Reserva',
    varietal: 'Carmenere',
    category: 'tinto',
    vintage: 2020,
    price: 32990,
    image: '/images/wines/carmenere-gran-reserva.jpg',
    rating: 5,
    badge: 'premiado',
    description: 'Carmenere premium con 12 meses en barrica francesa.'
  },
  {
    id: '3',
    sku: 'VSC-SYR-003',
    name: 'Syrah Premium Selection',
    varietal: 'Syrah',
    category: 'tinto',
    vintage: 2021,
    price: 29990,
    image: '/images/wines/syrah-premium.jpg',
    rating: 4,
    description: 'Syrah intenso con notas especiadas y taninos sedosos.'
  },
  {
    id: '4',
    sku: 'VSC-MER-004',
    name: 'Merlot Clásico',
    varietal: 'Merlot',
    category: 'tinto',
    vintage: 2022,
    price: 19990,
    image: '/images/wines/merlot-clasico.jpg',
    rating: 4,
    description: 'Merlot suave y frutal, ideal para el día a día.'
  }
]

export const tours: Tour[] = [
  {
    id: '1',
    slug: 'tour-icono',
    name: 'Tour Ícono',
    category: 'premium',
    description: 'Nuestra experiencia insignia que combina teleférico panorámico, museos exclusivos y degustación de vinos premium en el corazón de Colchagua.',
    highlights: [
      'Paseo en teleférico con vista 360°',
      'Museo del Automóvil y Museo del Vino',
      'Degustación de vinos premium',
      'Recorrido por viñedos solares'
    ],
    duration: '3 horas',
    price: 28000,
    image: '/images/tours/tour-icono.jpg'
  },
  {
    id: '2',
    slug: 'full-day-familia',
    name: 'Full Day Familia',
    category: 'clasico',
    description: 'Día completo de experiencias para toda la familia. Incluye teleférico, museos, almuerzo en nuestro restaurante y degustación para adultos.',
    highlights: [
      'Actividades para toda la familia',
      'Almuerzo en Restaurante Santa Cruz',
      'Acceso a Museo del Automóvil',
      'Visita a plantas solares'
    ],
    duration: 'Día completo',
    price: 45000,
    image: '/images/tours/full-day.jpg'
  },
  {
    id: '3',
    slug: 'experiencia-corporativa',
    name: 'Experiencia Corporativa',
    category: 'privado',
    description: 'Evento corporativo personalizado con banquetería, espacios privados, actividades team building y la mejor vista del Valle de Colchagua.',
    highlights: [
      'Espacios privados exclusivos',
      'Banquetería personalizada',
      'Actividades de team building',
      'Degustación guiada por sommelier'
    ],
    duration: 'Personalizable',
    price: 120000,
    image: '/images/tours/corporativo.jpg'
  }
]

export const membershipTiers: MembershipTier[] = [
  {
    id: '1',
    name: 'bronce',
    price: 29990,
    benefits: [
      '10% descuento en todos los vinos',
      'Acceso a preventa de nuevos productos',
      'Newsletter mensual exclusivo',
      'Invitación a eventos especiales'
    ]
  },
  {
    id: '2',
    name: 'plata',
    price: 49990,
    benefits: [
      '15% descuento en todos los vinos',
      'Acceso a preventa de nuevos productos',
      'Newsletter mensual exclusivo',
      'Invitación a eventos especiales',
      '1 tour gratuito al año'
    ]
  },
  {
    id: '3',
    name: 'oro',
    price: 79990,
    featured: true,
    popular: true,
    benefits: [
      '20% descuento en todos los vinos',
      'Acceso prioritario a ediciones limitadas',
      'Newsletter mensual exclusivo',
      'Invitación VIP a todos los eventos',
      '2 tours premium gratuitos al año',
      'Envío gratis sin mínimo de compra'
    ]
  },
  {
    id: '4',
    name: 'platino',
    price: 129990,
    featured: true,
    benefits: [
      '25% descuento en todos los vinos',
      'Acceso exclusivo a reservas privadas',
      'Newsletter mensual + consultas enólogo',
      'Eventos privados exclusivos',
      'Tours ilimitados + experiencias VIP',
      'Envío express gratis',
      'Visitas privadas con enólogo'
    ]
  }
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Una experiencia inolvidable. El tour gourmet superó todas nuestras expectativas. Los vinos son excepcionales y el maridaje fue perfecto. Definitivamente volveremos.',
    name: 'María José Ramírez',
    location: 'Santiago, Chile',
    rating: 5,
    image: '/images/testimonials/maria-jose.jpg'
  },
  {
    id: '2',
    quote: 'Como miembro del Club Oro, he descubierto vinos extraordinarios que nunca había probado. El servicio es impecable y los beneficios realmente valen la pena.',
    name: 'Carlos Mendoza',
    location: 'Viña del Mar, Chile',
    rating: 5,
    image: '/images/testimonials/carlos.jpg'
  },
  {
    id: '3',
    quote: 'El Carmenere Gran Reserva es simplemente espectacular. La calidad es consistente en cada botella y el envío siempre llega perfecto. Mi tienda online favorita de vinos.',
    name: 'Patricia Silva',
    location: 'Concepción, Chile',
    rating: 5,
    image: '/images/testimonials/patricia.jpg'
  }
]

export const instagramPosts: InstagramPost[] = [
  { id: '1', image: '/images/instagram/post-1.jpg', link: '#' },
  { id: '2', image: '/images/instagram/post-2.jpg', link: '#' },
  { id: '3', image: '/images/instagram/post-3.jpg', link: '#' },
  { id: '4', image: '/images/instagram/post-4.jpg', link: '#' },
  { id: '5', image: '/images/instagram/post-5.jpg', link: '#' },
  { id: '6', image: '/images/instagram/post-6.jpg', link: '#' },
]
