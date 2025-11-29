import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experiencias y Tours de Vino Valle Colchagua',
  description:
    'Reserva tours exclusivos de vino y enoturismo en Valle de Colchagua. Degustaciones premium, teleférico, noches astronómicas, full days familiares y experiencias culturales únicas.',
  keywords: [
    'tours de vino valle colchagua',
    'enoturismo chile',
    'degustación vinos colchagua',
    'experiencias viña santa cruz',
    'teleférico valle colchagua',
    'tours guiados viñedos chile',
    'noches astronómicas colchagua',
    'full day familia viña',
    'tours premium vino chile',
    'actividades enoturismo',
    'eventos viña santa cruz',
    'paseos culturales colchagua',
  ],
  openGraph: {
    title: 'Experiencias y Tours de Vino Valle Colchagua | Viña Santa Cruz',
    description:
      'Reserva tours exclusivos de vino y enoturismo en Valle de Colchagua. Degustaciones, teleférico, noches astronómicas y experiencias culturales únicas.',
    url: 'https://www.vinasantacruz.cl/experiencias',
    siteName: 'Viña Santa Cruz',
    images: [
      {
        url: 'https://www.vinasantacruz.cl/images/webp/Telferico.webp',
        width: 1200,
        height: 630,
        alt: 'Experiencias y Tours de Vino - Viña Santa Cruz Valle de Colchagua',
      },
    ],
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experiencias y Tours de Vino Valle Colchagua | Viña Santa Cruz',
    description: 'Reserva tours exclusivos de enoturismo y vive experiencias únicas en el Valle de Colchagua.',
    images: ['https://www.vinasantacruz.cl/images/webp/Telferico.webp'],
    creator: '@vinasantacruz',
  },
  alternates: {
    canonical: 'https://www.vinasantacruz.cl/experiencias',
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
