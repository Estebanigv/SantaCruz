import { Tour } from '@/types'
import Button from '../ui/Button'
// import Badge from '../ui/Badge'
import Image from 'next/image'

interface TourCardProps {
  tour: Tour
  featured?: boolean
}

export default function TourCard({ tour, featured = false }: TourCardProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CL')
  }

  const categoryLabels = {
    clasico: 'Tour Clásico',
    premium: 'Experiencia Premium',
    privado: 'Tour Privado'
  }

  const categoryIcons = {
    clasico: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    premium: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    privado: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  }

  return (
    <div className={`group relative bg-gradient-to-br from-gray-900 to-black-800 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-700 hover:border-gold-500 hover:shadow-gold-subtle ${featured ? 'lg:col-span-2' : ''}`}>
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
           style={{
             background: `radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.1), transparent 70%)`
           }} />

      <div className={`grid ${featured ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} h-full`}>
        {/* Visual Section - With Real Image */}
        <div className={`relative ${featured ? 'h-96 lg:h-full' : 'h-80'} overflow-hidden bg-gradient-to-br from-black-900 to-black-950`}>
          {/* Background Image - Optimized with better brightness */}
          <div className="absolute inset-0">
            <Image
              src="/images/Telferico.png"
              alt={tour.name}
              fill
              className="object-cover brightness-110 contrast-105 saturate-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          </div>

          {/* Lighter gradient overlay for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black-900/80 via-black-900/40 to-transparent" />

          {/* Large Icon - Centered background element */}
          <div className="absolute inset-0 flex items-center justify-center text-white/5">
            {categoryIcons[tour.category]}
          </div>

          {/* Category badge - Modern glass morphism */}
          <div className="absolute top-6 left-6 z-10">
            <div className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-[family-name:var(--font-raleway)] text-xs font-medium uppercase tracking-[0.15em]">
              {categoryLabels[tour.category]}
            </div>
          </div>

          {/* Floating price tag - Without $ sign */}
          <div className="absolute bottom-8 left-6 z-10">
            <div className="flex items-baseline gap-3">
              <span className="font-[family-name:var(--font-raleway)] text-6xl md:text-7xl font-extralight text-white leading-none drop-shadow-2xl">
                {formatPrice(tour.price)}
              </span>
              <span className="font-[family-name:var(--font-raleway)] text-white/70 text-sm font-light">/ persona</span>
            </div>
          </div>
        </div>

        {/* Content Section - Modern layout */}
        <div className="p-10 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Title - Bold & modern */}
            <h3 className="font-[family-name:var(--font-raleway)] text-3xl lg:text-4xl font-light text-white mb-6 leading-tight tracking-wide">
              {tour.name}
            </h3>

            {/* Description */}
            <p className="font-[family-name:var(--font-raleway)] text-gray-400 text-base leading-relaxed mb-10 font-light" style={{ lineHeight: '1.8' }}>
              {tour.description}
            </p>

            {/* Highlights - Minimal design */}
            <div className="space-y-4 mb-10">
              {tour.highlights.slice(0, 3).map((highlight, index) => (
                <div key={index} className="flex items-start gap-4 group/item">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 group-hover/item:scale-150 transition-transform flex-shrink-0" />
                  <span className="font-[family-name:var(--font-raleway)] text-sm text-gray-300 leading-relaxed font-light group-hover/item:text-gold-400 transition-colors">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div>
            <div className="h-px bg-gradient-to-r from-gold-500/50 via-gold-500/20 to-transparent mb-6" />

            <div className="flex items-center justify-between gap-4">
              {/* Meta info */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  2-3h
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Grupos pequeños
                </span>
              </div>

              {/* CTA Button */}
              <Button
                variant="gold"
                size="md"
                className="group-hover:shadow-gold-glow"
              >
                Reservar →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
