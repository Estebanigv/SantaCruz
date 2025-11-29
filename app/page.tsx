'use client'

import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'
import USPsSection from '@/components/sections/USPsSection'
import FeaturedWinesSection from '@/components/sections/FeaturedWinesSection'
import { useAge } from '@/contexts/AgeContext'
import { OrganizationSchema, LocalBusinessSchema, WebPageSchema } from '@/components/seo/StructuredData'

// Lazy load non-critical sections
const ToursSection = dynamic(() => import('@/components/sections/ToursSection'), {
  loading: () => <div className="h-96" />,
})
const RestaurantSection = dynamic(() => import('@/components/sections/RestaurantSection'), {
  loading: () => <div className="h-96" />,
})
const BrandStorySection = dynamic(() => import('@/components/sections/BrandStorySection'), {
  loading: () => <div className="h-96" />,
})
const InstagramSection = dynamic(() => import('@/components/sections/InstagramSection'), {
  loading: () => <div className="h-96" />,
})
const WhatsAppButton = dynamic(() => import('@/components/ui/WhatsAppButton'))

export default function HomePage() {
  const { isAdult } = useAge()

  return (
    <>
      {/* SEO: Structured Data for Homepage */}
      <OrganizationSchema />
      <LocalBusinessSchema />
      <WebPageSchema
        name="Viña Santa Cruz - Vinos Premium y Enoturismo en Valle de Colchagua"
        description="Descubre vinos premium chilenos, reserva tours exclusivos de enoturismo y vive experiencias únicas. 150 años de tradición vitivinícola en el Valle de Colchagua."
        url="https://www.vinasantacruz.cl"
      />

      <main>
        <HeroSection />

      {/* Wrapper with watercolor background - extends through wines section */}
      <div className="relative bg-gradient-to-b from-[#faf8f5] via-[#faf8f5] via-60% to-white">
        {/* Watercolor Background - Starting at top with blur, fading down smoothly through wines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Diffuse blur layer at top - creates soft transition from banner */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/images/webp/backgorund vinos destacados.webp')`,
              backgroundSize: '130%',
              backgroundPosition: 'center -5%',
              backgroundRepeat: 'no-repeat',
              opacity: 0.08,
              filter: 'blur(8px)',
              maskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 10%, transparent 25%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 10%, transparent 25%)',
            }}
          />
          {/* Main watercolor layer - extends further down with reduced opacity for better text readability */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/images/webp/backgorund vinos destacados.webp')`,
              backgroundSize: '120%',
              backgroundPosition: 'center top',
              backgroundRepeat: 'no-repeat',
              opacity: 0.10,
              filter: 'blur(1px)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 3%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.2) 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 3%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.2) 85%, transparent 100%)',
            }}
          />
        </div>

        {/* Content sections */}
        <USPsSection />
        <FeaturedWinesSection isAdult={isAdult} />
        <RestaurantSection isAdult={isAdult} />
      </div>
      <BrandStorySection />
      <ToursSection isAdult={isAdult} />
      <InstagramSection />

        {/* WhatsApp floating button */}
        <WhatsAppButton />
      </main>
    </>
  )
}
