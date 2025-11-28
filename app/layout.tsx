import type { Metadata } from 'next'
import { Playfair_Display, Inter, Raleway } from 'next/font/google'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import PageLoader from '../src/components/ui/PageLoader'
import AgeVerificationModal from '../src/components/ui/AgeVerificationModal'
import { CartProvider } from '../src/contexts/CartContext'
import { AgeProvider } from '../src/contexts/AgeContext'
import { ModalProvider } from '../src/contexts/ModalContext'
import WhatsAppButton from '../src/components/ui/WhatsAppButton'
import CartSidebar from '../src/components/cart/CartSidebar'
// import PageTransition from '../src/components/PageTransition'
import '../src/styles/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vinasantacruz.cl'),
  title: {
    default: 'Viña Santa Cruz | Vinos Premium y Enoturismo Valle de Colchagua',
    template: '%s | Viña Santa Cruz',
  },
  description:
    'Descubre vinos premium chilenos, reserva tours exclusivos de enoturismo y vive experiencias únicas. 150 años de tradición vitivinícola en el Valle de Colchagua, Chile.',
  keywords: [
    'viña santa cruz',
    'vinos chilenos premium',
    'valle de colchagua',
    'enoturismo chile',
    'tours de vino',
    'degustación de vinos',
    'carmenere',
    'cabernet sauvignon',
    'club de vinos',
    'experiencias enológicas',
    'turismo del vino',
    'viñedos chile',
  ],
  authors: [{ name: 'Viña Santa Cruz' }],
  creator: 'Viña Santa Cruz',
  publisher: 'Viña Santa Cruz',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://www.vinasantacruz.cl',
    siteName: 'Viña Santa Cruz',
    title: 'Viña Santa Cruz | Vinos Premium y Enoturismo Valle de Colchagua',
    description:
      'Descubre vinos premium chilenos, reserva tours exclusivos de enoturismo y vive experiencias únicas. 150 años de tradición vitivinícola en el Valle de Colchagua.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Viña Santa Cruz - Valle de Colchagua',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viña Santa Cruz | Vinos Premium y Enoturismo Valle de Colchagua',
    description:
      'Descubre vinos premium chilenos y vive experiencias únicas de enoturismo en el Valle de Colchagua.',
    images: ['/images/og-image.jpg'],
    creator: '@vinasantacruz',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.vinasantacruz.cl',
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} ${raleway.variable}`}>
      <body>
        <AgeProvider>
          <CartProvider>
            <ModalProvider>
              <PageLoader />
              <AgeVerificationModal />
              <Header />
              {children}
              <Footer />
              <CartSidebar />
              <WhatsAppButton />
            </ModalProvider>
          </CartProvider>
        </AgeProvider>
      </body>
    </html>
  )
}
