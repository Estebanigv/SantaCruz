import type { Metadata } from 'next'
import { Playfair_Display, Inter, Raleway } from 'next/font/google'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import PageLoader from '../src/components/ui/PageLoader'
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
  title: 'Viña Santa Cruz | Vinos Premium, Tours y Experiencias en Valle de Colchagua',
  description: 'Descubre vinos premium chilenos, reserva tours exclusivos y únete a nuestro club de vinos. 150 años de tradición en el Valle de Colchagua.',
  keywords: 'vinos chilenos, valle de colchagua, tours de vino, club de vinos, carmenere, cabernet sauvignon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} ${raleway.variable}`}>
      <body>
        <PageLoader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
