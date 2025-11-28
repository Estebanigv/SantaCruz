import { Tour } from '@/types'
import Button from '../ui/Button'
import Image from 'next/image'

interface TourCardProps {
  tour: Tour
  featured?: boolean
  compact?: boolean
  onReserve?: (tour: Tour) => void
}

export default function TourCard({ tour, featured = false, compact = false, onReserve }: TourCardProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CL')
  }

  const categoryLabels = {
    vino: 'Tour de Vinos',
    cultural: 'Experiencia Cultural',
    premium: 'Experiencia Premium',
  }

  const categoryColors = {
    vino: 'from-wine-600/20 to-wine-800/20 border-wine-500/30',
    cultural: 'from-emerald-600/20 to-emerald-800/20 border-emerald-500/30',
    premium: 'from-gold-500/20 to-gold-700/20 border-gold-500/30',
  }

  const badgeStyles = {
    popular: 'bg-gold-500 text-black-900',
    nuevo: 'bg-emerald-500 text-white',
    exclusivo: 'bg-wine-600 text-white',
  }

  const priceTypeLabels = {
    persona: '/ persona',
    pareja: '/ 2 personas',
    familia: '/ familia',
    grupo: '/ grupo',
  }

  const categoryIcons = {
    vino: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    cultural: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
    premium: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  }

  // Compact version for grid pages
  if (compact) {
    return (
      <div className="group relative bg-gradient-to-br from-gray-900 to-black-800 border border-gray-800 rounded-xl overflow-hidden transition-all duration-500 hover:border-gold-500/50 hover:shadow-xl hover:shadow-gold-500/10">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={tour.image}
            alt={tour.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-900 via-black-900/40 to-transparent" />

          {/* Category Badge */}
          <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-full bg-gradient-to-r ${categoryColors[tour.category]} backdrop-blur-md border text-white text-[10px] font-medium uppercase tracking-wider flex items-center gap-1.5`}>
            {categoryIcons[tour.category]}
            {categoryLabels[tour.category]}
          </div>

          {/* Special Badge */}
          {tour.badge && (
            <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full ${badgeStyles[tour.badge]} text-[10px] font-bold uppercase tracking-wider`}>
              {tour.badge === 'popular' ? 'Popular' : tour.badge === 'nuevo' ? 'Nuevo' : 'Exclusivo'}
            </div>
          )}

          {/* Price */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-baseline gap-1">
              <span className="font-[family-name:var(--font-raleway)] text-2xl font-light text-white">
                {formatPrice(tour.price)}
              </span>
              <span className="text-white/60 text-xs">{priceTypeLabels[tour.priceType]}</span>
            </div>
            {tour.priceNote && (
              <span className="text-white/50 text-[10px]">{tour.priceNote}</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white mb-2 line-clamp-1">
            {tour.name}
          </h3>

          <p className="font-[family-name:var(--font-raleway)] text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {tour.description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {tour.duration}
            </span>
            {tour.schedule && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {tour.schedule}
              </span>
            )}
          </div>

          {/* CTA */}
          <Button
            variant="gold"
            size="sm"
            className="w-full"
            onClick={() => onReserve?.(tour)}
          >
            Reservar
          </Button>
        </div>
      </div>
    )
  }

  // Full card for homepage featured
  return (
    <div
      className={`group relative bg-gradient-to-br from-gray-900 to-black-800 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-700 hover:border-gold-500 hover:shadow-gold-subtle ${featured ? 'lg:col-span-2' : ''}`}
    >
      {/* Ambient glow effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.1), transparent 70%)`,
        }}
      />

      <div className={`grid ${featured ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} h-full`}>
        {/* Visual Section */}
        <div className={`relative ${featured ? 'h-96 lg:h-full' : 'h-80'} overflow-hidden bg-gradient-to-br from-black-900 to-black-950`}>
          <div className="absolute inset-0">
            <Image
              src={tour.image}
              alt={tour.name}
              fill
              className="object-cover brightness-110 contrast-105 saturate-110 group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={featured}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black-900/80 via-black-900/40 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-6 left-6 z-10">
            <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${categoryColors[tour.category]} backdrop-blur-md border text-white font-[family-name:var(--font-raleway)] text-xs font-medium uppercase tracking-[0.15em] flex items-center gap-2`}>
              {categoryIcons[tour.category]}
              {categoryLabels[tour.category]}
            </div>
          </div>

          {/* Special Badge */}
          {tour.badge && (
            <div className={`absolute top-6 right-6 z-10 px-3 py-1.5 rounded-full ${badgeStyles[tour.badge]} text-xs font-bold uppercase tracking-wider`}>
              {tour.badge === 'popular' ? 'Más Popular' : tour.badge === 'nuevo' ? 'Nuevo' : 'Exclusivo'}
            </div>
          )}

          {/* Price */}
          <div className="absolute bottom-8 left-6 z-10">
            <div className="flex items-baseline gap-3">
              <span className="font-[family-name:var(--font-raleway)] text-5xl md:text-6xl font-extralight text-white leading-none drop-shadow-2xl">
                {formatPrice(tour.price)}
              </span>
              <span className="font-[family-name:var(--font-raleway)] text-white/70 text-sm font-light">
                {priceTypeLabels[tour.priceType]}
              </span>
            </div>
            {tour.priceNote && (
              <span className="font-[family-name:var(--font-raleway)] text-white/50 text-xs mt-1 block">
                {tour.priceNote}
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 lg:p-12 flex flex-col justify-between">
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-semibold text-white mb-6 leading-tight">
              {tour.name}
            </h3>

            <p
              className="font-[family-name:var(--font-raleway)] text-gray-400 text-base leading-relaxed mb-10 font-light"
              style={{ lineHeight: '1.8' }}
            >
              {tour.description}
            </p>

            {/* Highlights */}
            <div className="space-y-3 mb-10">
              {tour.highlights.slice(0, 4).map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 group/item">
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
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tour.duration}
                </span>
                {tour.schedule && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    {tour.schedule}
                  </span>
                )}
              </div>

              <Button
                variant="gold"
                size="md"
                className="group-hover:shadow-gold-glow"
                onClick={() => onReserve?.(tour)}
              >
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
