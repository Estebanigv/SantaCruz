'use client'

// import Image from 'next/image'
import { Wine } from '@/types'
import Rating from '../ui/Rating'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import LayeredWineCard from './LayeredWineCard'
import { useState, useRef, useEffect } from 'react'

interface WineCardProps {
  wine: Wine
}

export default function WineCard({ wine }: WineCardProps) {
  const [buttonFillProgress, setButtonFillProgress] = useState(0)
  const buttonFillIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-CL')}`
  }

  const badgeVariant =
    wine.badge === 'premiado'
      ? 'award'
      : wine.badge === 'nuevo'
        ? 'new'
        : wine.badge === 'icono'
          ? 'exclusive'
          : 'exclusive'

  const handleButtonHover = (isEntering: boolean) => {
    if (buttonFillIntervalRef.current) {
      clearInterval(buttonFillIntervalRef.current)
    }

    if (isEntering) {
      buttonFillIntervalRef.current = setInterval(() => {
        setButtonFillProgress((prev) => {
          if (prev >= 100) {
            if (buttonFillIntervalRef.current) {
              clearInterval(buttonFillIntervalRef.current)
            }
            return 100
          }
          return prev + 5
        })
      }, 15)
    } else {
      buttonFillIntervalRef.current = setInterval(() => {
        setButtonFillProgress((prev) => {
          if (prev <= 0) {
            if (buttonFillIntervalRef.current) {
              clearInterval(buttonFillIntervalRef.current)
            }
            return 0
          }
          return prev - 5
        })
      }, 15)
    }
  }

  useEffect(() => {
    return () => {
      if (buttonFillIntervalRef.current) {
        clearInterval(buttonFillIntervalRef.current)
      }
    }
  }, [])

  // If wine has layered backgrounds, use LayeredWineCard
  if (wine.grayBg && wine.colorBg) {
    return (
      <LayeredWineCard
        name={wine.name}
        varietal={wine.varietal}
        price={wine.price}
        rating={wine.rating}
        wineImage={wine.image}
        grayBg={wine.grayBg}
        colorBg={wine.colorBg}
      />
    )
  }

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

          <p className="font-[family-name:var(--font-raleway)] text-sm text-gray-600 mb-4 font-medium min-h-[20px]">
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
          <div className="flex items-center gap-2 mb-4">
            <p className="text-2xl font-bold text-gold-600 font-mono leading-none">
              {formatPrice(wine.price)}
            </p>
            <span className="font-[family-name:var(--font-raleway)] text-xs text-gray-500 self-end pb-0.5">
              CLP
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-4" />

          {/* Add to Cart Button - Simple white with gold animation */}
          <button
            className="relative w-full inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg overflow-hidden transition-all duration-300 border border-gray-200 hover:border-gold-500 hover:shadow-md font-[family-name:var(--font-raleway)]"
            onMouseEnter={() => handleButtonHover(true)}
            onMouseLeave={() => handleButtonHover(false)}
            onClick={() => {}}
          >
            <span
              className="relative z-10 transition-colors duration-200"
              style={{
                color: buttonFillProgress > 50 ? 'white' : '#374151',
              }}
            >
              Añadir al Carro
            </span>
            {/* Gold filling from left to right */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600"
              style={{
                width: `${buttonFillProgress}%`,
                transition: 'width 0.15s ease-out',
              }}
            >
              {/* Animated wave edge */}
              <div
                className="absolute right-0 inset-y-0 w-8"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5))',
                  transform: `translateX(${Math.sin(buttonFillProgress / 15) * 4}px)`,
                }}
              />
            </div>
          </button>

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
