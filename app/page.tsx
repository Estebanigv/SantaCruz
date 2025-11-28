'use client'

import HeroSection from '@/components/sections/HeroSection'
import USPsSection from '@/components/sections/USPsSection'
import FeaturedWinesSection from '@/components/sections/FeaturedWinesSection'
import ToursSection from '@/components/sections/ToursSection'
import RestaurantSection from '@/components/sections/RestaurantSection'
import BrandStorySection from '@/components/sections/BrandStorySection'
import InstagramSection from '@/components/sections/InstagramSection'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { useAgeVerification } from '@/hooks/useAgeVerification'

export default function HomePage() {
  const { isAdult, isLoading } = useAgeVerification()

  // Don't render wine sections until age verification is loaded
  if (isLoading) {
    return null
  }

  return (
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
              backgroundImage: `url('/images/freepik__haz-esto-es-un-estilo-acurela-en-blanco-y-negro-qu__88624.png')`,
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
              backgroundImage: `url('/images/freepik__haz-esto-es-un-estilo-acurela-en-blanco-y-negro-qu__88624.png')`,
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
        <FeaturedWinesSection />
        <RestaurantSection isAdult={isAdult} />
      </div>
      <BrandStorySection />
      <ToursSection />
      <InstagramSection />

      {/* WhatsApp floating button */}
      <WhatsAppButton />
    </main>
  )
}
