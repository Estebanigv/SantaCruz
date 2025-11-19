import HeroSection from '@/components/sections/HeroSection'
import USPsSection from '@/components/sections/USPsSection'
import FeaturedWinesSection from '@/components/sections/FeaturedWinesSection'
import ToursSection from '@/components/sections/ToursSection'
import BrandStorySection from '@/components/sections/BrandStorySection'
import MembershipsSection from '@/components/sections/MembershipsSection'
import TripAdvisorSection from '@/components/sections/TripAdvisorSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import InstagramSection from '@/components/sections/InstagramSection'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <USPsSection />
      <ToursSection />
      <BrandStorySection />
      <FeaturedWinesSection />
      <MembershipsSection />
      <TripAdvisorSection />
      <TestimonialsSection />
      <InstagramSection />

      {/* WhatsApp floating button */}
      <WhatsAppButton />
    </main>
  )
}
