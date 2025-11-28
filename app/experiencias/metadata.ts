import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experiencias y Tours de Vino',
  description:
    'Reserva tours exclusivos de vino, experiencias culturales y eventos premium en el Valle de Colchagua. Degustaciones, teleférico, noches astronómicas y actividades únicas.',
  keywords: [
    'tours de vino valle colchagua',
    'enoturismo chile',
    'degustación de vinos',
    'experiencias viña santa cruz',
    'teleférico valle colchagua',
    'tours guiados viñedos',
    'noches astronómicas',
    'full day familia',
    'tours premium vino',
    'actividades enoturismo',
  ],
  openGraph: {
    title: 'Experiencias y Tours de Vino - Viña Santa Cruz',
    description:
      'Reserva tours exclusivos de vino, experiencias culturales y eventos premium en el Valle de Colchagua.',
    url: 'https://www.vinasantacruz.cl/experiencias',
    images: [
      {
        url: '/images/webp/Telferico.webp',
        width: 1200,
        height: 630,
        alt: 'Experiencias Viña Santa Cruz - Valle de Colchagua',
      },
    ],
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experiencias y Tours de Vino - Viña Santa Cruz',
    description: 'Reserva tours exclusivos y vive experiencias únicas en el Valle de Colchagua.',
    images: ['/images/webp/Telferico.webp'],
  },
  alternates: {
    canonical: 'https://www.vinasantacruz.cl/experiencias',
  },
}
