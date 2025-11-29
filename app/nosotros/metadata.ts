import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nosotros - Historia y Tradición Vitivinícola desde 1875',
  description:
    'Conoce la historia de Viña Santa Cruz, 150 años de tradición vitivinícola en el Valle de Colchagua. Descubre nuestra filosofía, sustentabilidad y compromiso con la excelencia enológica chilena.',
  keywords: [
    'historia viña santa cruz',
    'tradición vitivinícola chile',
    'valle de colchagua historia',
    'viña familiar chile',
    'sustentabilidad vitivinícola',
    'filosofía viña santa cruz',
    'patrimonio vitivinícola chileno',
    'bodega histórica colchagua',
    '150 años tradición vino',
    'cultura del vino chile',
  ],
  openGraph: {
    title: 'Nosotros - 150 Años de Tradición Vitivinícola | Viña Santa Cruz',
    description:
      'Conoce la historia de Viña Santa Cruz, 150 años de tradición en el Valle de Colchagua. Filosofía, sustentabilidad y excelencia enológica.',
    url: 'https://www.vinasantacruz.cl/nosotros',
    siteName: 'Viña Santa Cruz',
    images: [
      {
        url: 'https://www.vinasantacruz.cl/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Historia Viña Santa Cruz - Valle de Colchagua',
      },
    ],
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nosotros - 150 Años de Tradición Vitivinícola | Viña Santa Cruz',
    description: '150 años de tradición vitivinícola en el corazón del Valle de Colchagua.',
    images: ['https://www.vinasantacruz.cl/images/og-image.jpg'],
    creator: '@vinasantacruz',
  },
  alternates: {
    canonical: 'https://www.vinasantacruz.cl/nosotros',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
