'use client'

import { featuredWines } from '@/data/mockData'
import WineCard from '../wine/WineCard'
import SectionHeader from '../ui/SectionHeader'

export default function FeaturedWinesSection() {
  return (
    <section className="bg-cream-50 section-padding relative overflow-hidden">
      {/* Subtle elegant pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(212, 175, 55, 0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom relative">
        <SectionHeader
          label="Nuestra Selección"
          title="Vinos Destacados"
          subtitle="Descubre nuestra cuidadosa selección de vinos premium del Valle de Colchagua"
        />

        {/* Wine Grid - Better alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredWines.map((wine) => (
            <WineCard key={wine.id} wine={wine} />
          ))}
        </div>

        {/* View All Link - Gold accent */}
        <div className="text-center mt-16">
          <button
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-3 text-base font-semibold text-gold-500 hover:text-gold-400 transition-all hover:gap-4 group bg-transparent border-none cursor-pointer"
          >
            Ver Toda la Colección
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
