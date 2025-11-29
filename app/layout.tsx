import type { Metadata } from 'next'
import { Playfair_Display, Inter, Raleway } from 'next/font/google'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import PageLoader from '../src/components/ui/PageLoader'
import AgeVerificationModal from '../src/components/ui/AgeVerificationModal'
import ScaleDetector from '../src/components/ui/ScaleDetector'
import { CartProvider } from '../src/contexts/CartContext'
import { AgeProvider } from '../src/contexts/AgeContext'
import { ModalProvider } from '../src/contexts/ModalContext'
import WhatsAppButton from '../src/components/ui/WhatsAppButton'
import CartSidebar from '../src/components/cart/CartSidebar'
import '../src/styles/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif'],
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-raleway',
  display: 'swap',
  preload: true,
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vinasantacruz.cl'),
  title: {
    default: 'Viña Santa Cruz | Vinos Premium y Enoturismo Valle de Colchagua',
    template: '%s | Viña Santa Cruz',
  },
  description:
    'Descubre vinos premium chilenos, reserva tours exclusivos de enoturismo y vive experiencias únicas en el Valle de Colchagua. 150 años de tradición vitivinícola en Chile.',
  keywords: [
    'viña santa cruz',
    'vinos chilenos premium',
    'valle de colchagua',
    'enoturismo chile',
    'tours de vino colchagua',
    'degustación vinos chile',
    'carmenere valle colchagua',
    'cabernet sauvignon chile',
    'club de vinos chile',
    'experiencias enológicas',
    'turismo del vino chile',
    'viñedos valle colchagua',
    'restaurante viña chile',
    'teleférico colchagua',
    'vinos reserva chilenos',
  ],
  authors: [{ name: 'Viña Santa Cruz' }],
  creator: 'Viña Santa Cruz',
  publisher: 'Viña Santa Cruz',
  applicationName: 'Viña Santa Cruz',
  category: 'food & drink',
  classification: 'Enoturismo, Vinos Premium, Turismo Chile',
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
        url: 'https://www.vinasantacruz.cl/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Viña Santa Cruz - Vinos Premium y Enoturismo Valle de Colchagua Chile',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vinasantacruz',
    creator: '@vinasantacruz',
    title: 'Viña Santa Cruz | Vinos Premium y Enoturismo Valle de Colchagua',
    description:
      'Descubre vinos premium chilenos y vive experiencias únicas de enoturismo en el Valle de Colchagua.',
    images: ['https://www.vinasantacruz.cl/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.vinasantacruz.cl',
    languages: {
      'es-CL': 'https://www.vinasantacruz.cl',
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  other: {
    'geo.region': 'CL-LI',
    'geo.placename': 'Valle de Colchagua',
    'geo.position': '-34.4728;-71.6233',
    'ICBM': '-34.4728, -71.6233',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} ${raleway.variable}`}>
      <body>
        <AgeProvider>
          <CartProvider>
            <ModalProvider>
              <ScaleDetector />
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
