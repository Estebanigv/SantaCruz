import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto - Reservas y Consultas Viña Santa Cruz',
  description:
    'Contáctanos para reservar tours de enoturismo, comprar vinos o consultas sobre eventos en Viña Santa Cruz. Ubicados en Ruta I-72 Km 25, Lolol, Valle de Colchagua. Tel: +56 72 282 1519',
  keywords: [
    'contacto viña santa cruz',
    'reservas tours vino colchagua',
    'ubicación viña santa cruz',
    'teléfono viña santa cruz',
    'email viña colchagua',
    'dirección valle colchagua',
    'horarios viña santa cruz',
    'cómo llegar valle colchagua',
    'reservar experiencias vino',
    'eventos viña santa cruz',
  ],
  openGraph: {
    title: 'Contacto - Viña Santa Cruz Valle de Colchagua',
    description:
      'Contáctanos para reservar tours, experiencias de enoturismo o eventos. Ruta I-72 Km 25, Lolol, Valle de Colchagua. Tel: +56 72 282 1519',
    url: 'https://www.vinasantacruz.cl/contacto',
    siteName: 'Viña Santa Cruz',
    images: [
      {
        url: 'https://www.vinasantacruz.cl/images/webp/Enoturismo-y-sustentabilidad.webp',
        width: 1200,
        height: 630,
        alt: 'Contacto Viña Santa Cruz - Valle de Colchagua',
      },
    ],
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto - Viña Santa Cruz Valle de Colchagua',
    description: 'Reserva tours, experiencias de enoturismo o consulta sobre eventos en el Valle de Colchagua.',
    images: ['https://www.vinasantacruz.cl/images/webp/Enoturismo-y-sustentabilidad.webp'],
    creator: '@vinasantacruz',
  },
  alternates: {
    canonical: 'https://www.vinasantacruz.cl/contacto',
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
