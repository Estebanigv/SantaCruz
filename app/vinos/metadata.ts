import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vinos Premium Chilenos - Catálogo Viña Santa Cruz',
  description:
    'Descubre nuestra selección de vinos premium del Valle de Colchagua. Carmenere, Cabernet Sauvignon, Merlot, Syrah y variedades exclusivas. 150 años de tradición vitivinícola chilena.',
  keywords: [
    'vinos chilenos premium',
    'vinos valle colchagua',
    'carmenere chile',
    'cabernet sauvignon chileno',
    'comprar vinos santa cruz',
    'vinos reserva chile',
    'vinos gran reserva colchagua',
    'merlot valle colchagua',
    'syrah chile',
    'vinos tintos premium',
    'viña santa cruz catálogo',
    'vinos chilenos online',
  ],
  openGraph: {
    title: 'Vinos Premium Chilenos Valle de Colchagua | Viña Santa Cruz',
    description:
      'Descubre nuestra selección de vinos premium del Valle de Colchagua. Carmenere, Cabernet Sauvignon, Merlot y variedades exclusivas.',
    url: 'https://www.vinasantacruz.cl/vinos',
    siteName: 'Viña Santa Cruz',
    images: [
      {
        url: 'https://www.vinasantacruz.cl/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vinos Premium Viña Santa Cruz - Valle de Colchagua',
      },
    ],
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vinos Premium Chilenos Valle de Colchagua | Viña Santa Cruz',
    description: 'Descubre vinos premium de 150 años de tradición vitivinícola en el Valle de Colchagua.',
    images: ['https://www.vinasantacruz.cl/images/og-image.jpg'],
    creator: '@vinasantacruz',
  },
  alternates: {
    canonical: 'https://www.vinasantacruz.cl/vinos',
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
