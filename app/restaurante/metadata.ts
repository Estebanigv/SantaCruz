import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Restaurante Valle de Colchagua - Gastronomía y Vinos',
  description:
    'Disfruta de una experiencia gastronómica única en nuestro restaurante del Valle de Colchagua. Cocina local, maridajes perfectos con nuestros vinos premium y vistas espectaculares.',
  keywords: [
    'restaurante valle colchagua',
    'gastronomía viña santa cruz',
    'maridaje vino y comida',
    'restaurante viña chile',
    'cocina local colchagua',
    'almuerzo en viña',
    'experiencia gastronómica vino',
    'restaurante enoturismo',
    'comida típica colchagua',
    'reservas restaurante viña',
  ],
  openGraph: {
    title: 'Restaurante Valle de Colchagua | Viña Santa Cruz',
    description:
      'Experiencia gastronómica única con cocina local, maridajes perfectos y vistas espectaculares del Valle de Colchagua.',
    url: 'https://www.vinasantacruz.cl/restaurante',
    siteName: 'Viña Santa Cruz',
    images: [
      {
        url: 'https://www.vinasantacruz.cl/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Restaurante Viña Santa Cruz - Valle de Colchagua',
      },
    ],
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurante Valle de Colchagua | Viña Santa Cruz',
    description: 'Gastronomía local, maridajes perfectos y vistas espectaculares del Valle de Colchagua.',
    images: ['https://www.vinasantacruz.cl/images/og-image.jpg'],
    creator: '@vinasantacruz',
  },
  alternates: {
    canonical: 'https://www.vinasantacruz.cl/restaurante',
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
