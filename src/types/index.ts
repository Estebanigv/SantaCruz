export interface Wine {
  id: string
  sku: string
  name: string
  varietal: string
  category: 'tinto' | 'blanco' | 'rosado' | 'espumante'
  vintage?: number
  price: number
  image: string
  grayBg?: string
  colorBg?: string
  videoBg?: string
  expandedBg?: string
  rating: number
  badge?: 'nuevo' | 'premiado' | 'exclusivo' | 'icono'
  description?: string
}

export interface Tour {
  id: string
  slug: string
  name: string
  category: 'vino' | 'cultural' | 'premium'
  description: string
  highlights: string[]
  duration: string
  price: number
  priceType: 'persona' | 'pareja' | 'familia' | 'grupo'
  priceNote?: string
  image: string
  maxCapacity?: number
  minPersons?: number
  schedule?: string
  featured?: boolean
  badge?: 'popular' | 'nuevo' | 'exclusivo'
}

export interface MembershipTier {
  id: string
  name: 'bronce' | 'plata' | 'oro' | 'platino'
  price: number
  benefits: string[]
  featured?: boolean
  popular?: boolean
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  location: string
  rating: number
  image?: string
}

export interface InstagramPost {
  id: string
  image: string
  link: string
}
