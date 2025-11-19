// import Image from 'next/image'
import { Wine } from '@/types'
import Rating from '../ui/Rating'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

interface WineCardProps {
  wine: Wine
}

export default function WineCard({ wine }: WineCardProps) {
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-CL')}`
  }

  const badgeVariant =
    wine.badge === 'premiado' ? 'award' : wine.badge === 'nuevo' ? 'new' : 'exclusive'

  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-500 hover:border-gold-500 hover:shadow-card-hover hover:-translate-y-2 flex flex-col h-full">
      {/* Image Container - Fixed aspect ratio */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-cream-50 to-gray-50 overflow-hidden">
        {wine.badge && (
          <div className="absolute top-4 right-4 z-10">
            <Badge variant={badgeVariant}>{wine.badge}</Badge>
          </div>
        )}

        {/* Elegant bottle silhouette */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream-100 to-gray-100 flex items-center justify-center transition-all duration-700 group-hover:scale-105">
          <svg
            className="w-24 h-24 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={0.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>

        {/* Subtle gold accent on hover */}
        <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/5 transition-all duration-500" />
      </div>

      {/* Content - Structured for equal height */}
      <div className="p-6 flex flex-col flex-1">
        {/* Wine Info - Fixed height area */}
        <div className="flex-1">
          <h3 className="font-[family-name:var(--font-raleway)] text-xl font-semibold text-black-900 mb-2 line-clamp-2 leading-tight tracking-wide">
            {wine.name}
          </h3>

          <p className="font-[family-name:var(--font-raleway)] text-sm text-gray-600 mb-4 font-medium">
            {wine.varietal}
            {wine.vintage && ` • ${wine.vintage}`}
          </p>

          {/* Rating */}
          <div className="mb-4">
            <Rating value={wine.rating} />
          </div>
        </div>

        {/* Price - Always at bottom */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-4">
            <p className="text-2xl font-bold text-gold-600 font-[family-name:var(--font-raleway)]">
              {formatPrice(wine.price)}
            </p>
            <span className="font-[family-name:var(--font-raleway)] text-xs text-gray-500">
              CLP
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-4" />

          {/* Add to Cart Button */}
          <Button variant="gold" size="md" className="w-full" onClick={() => {}}>
            Añadir al Carro
          </Button>

          {/* Quick view link */}
          <button
            onClick={(e) => e.preventDefault()}
            className="w-full mt-2 text-sm text-gray-600 hover:text-gold-600 transition-colors duration-300 font-medium"
          >
            Ver Detalles →
          </button>
        </div>
      </div>
    </div>
  )
}
