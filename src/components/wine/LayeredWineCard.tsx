'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import Rating from '../ui/Rating'

interface LayeredWineCardProps {
  name: string
  varietal: string
  price: number
  rating: number
  wineImage: string
  grayBg: string
  colorBg: string
  description?: string
  onViewDetails?: () => void
}

export default function LayeredWineCard({
  name,
  varietal,
  price,
  rating,
  wineImage,
  grayBg,
  colorBg,
  description: _description, // eslint-disable-line @typescript-eslint/no-unused-vars
  onViewDetails,
}: LayeredWineCardProps) {
  const grayLayerRef = useRef<HTMLDivElement>(null)
  const wineImageRef = useRef<HTMLDivElement>(null)
  const colorLayerRef = useRef<HTMLDivElement>(null)
  const [buttonFillProgress, setButtonFillProgress] = useState(0)
  const buttonFillIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [revealProgress, setRevealProgress] = useState(0)

  const handleHover = (isEntering: boolean) => {
    const grayLayer = grayLayerRef.current
    const wineImg = wineImageRef.current
    const colorLayer = colorLayerRef.current

    if (!grayLayer || !colorLayer) return

    // Kill previous timeline
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    if (isEntering) {
      const tl = gsap.timeline()
      timelineRef.current = tl

      // Elegant wipe reveal from top to bottom with easing
      tl.to({ progress: revealProgress }, {
        progress: 100,
        duration: 0.8,
        ease: 'power3.out',
        onUpdate: function() {
          setRevealProgress(this.targets()[0].progress)
        }
      }, 0)

      // Fade out gray layer smoothly
      tl.to(grayLayer, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, 0.15)

      // BOTTLE PROTAGONIST - Dramatic lift and presence
      if (wineImg) {
        // Strong scale and lift - bottle "pops" forward
        tl.to(wineImg, {
          scale: 1.12,
          y: -15,
          duration: 0.7,
          ease: 'power2.out',
        }, 0.05)

        // Dramatic shadow - bottle floats above the card
        tl.to(wineImg.querySelector('img'), {
          filter: 'drop-shadow(0 35px 45px rgba(0, 0, 0, 0.5)) drop-shadow(0 18px 25px rgba(0, 0, 0, 0.35)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.2))',
          duration: 0.6,
        }, 0.05)
      }
    } else {
      const tl = gsap.timeline()
      timelineRef.current = tl

      // Reverse wipe - elegant retraction
      tl.to({ progress: revealProgress }, {
        progress: 0,
        duration: 0.5,
        ease: 'power2.in',
        onUpdate: function() {
          setRevealProgress(this.targets()[0].progress)
        }
      }, 0)

      // Fade in gray background
      tl.to(grayLayer, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.in',
      }, 0.1)

      // Reset wine bottle smoothly
      if (wineImg) {
        tl.to(wineImg, {
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        }, 0)

        tl.to(wineImg.querySelector('img'), {
          filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.35))',
          duration: 0.4,
        }, 0)
      }
    }
  }

  // Generate organic clip-path based on progress
  const generateClipPath = (progress: number) => {
    if (progress <= 0) return 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
    if (progress >= 100) return 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

    // Create organic wave effect - multiple points along the bottom edge
    const baseY = progress
    const wave1 = Math.sin((progress / 100) * Math.PI * 2) * 3
    const wave2 = Math.cos((progress / 100) * Math.PI * 1.5) * 2
    const wave3 = Math.sin((progress / 100) * Math.PI * 3) * 2

    // 5 points along bottom for organic look
    const p1 = Math.max(0, Math.min(100, baseY + wave1))
    const p2 = Math.max(0, Math.min(100, baseY + wave2 + 1))
    const p3 = Math.max(0, Math.min(100, baseY + wave3))
    const p4 = Math.max(0, Math.min(100, baseY - wave1 + 1))
    const p5 = Math.max(0, Math.min(100, baseY + wave2))

    return `polygon(0% 0%, 25% 0%, 50% 0%, 75% 0%, 100% 0%, 100% ${p5}%, 75% ${p4}%, 50% ${p3}%, 25% ${p2}%, 0% ${p1}%)`
  }

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

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleMouseLeave = () => {
    // Auto-reset: return to front when mouse leaves the card
    if (isFlipped) {
      setIsFlipped(false)
    }
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-CL')}`
  }

  return (
    <div
      ref={containerRef}
      className="perspective-1000 w-full min-h-[580px]"
      style={{ perspective: '1000px' }}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative w-full min-h-[580px] transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 group bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-500 hover:border-gold-500 hover:shadow-card-hover hover:-translate-y-2 flex flex-col"
          style={{ backfaceVisibility: 'hidden' }}
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
      {/* Image Container with elegant wipe reveal */}
      <div className="relative aspect-[3/4] overflow-hidden bg-white">
        {/* Favorite button - top left, very subtle */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 left-3 z-20 p-2 transition-all duration-300 group"
        >
          <svg
            className={`w-5 h-5 transition-all duration-300 ${
              isFavorite
                ? 'fill-gold-500 text-gold-500'
                : 'fill-none text-gray-400 group-hover:text-gold-500 group-hover:scale-110'
            }`}
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Layer 1: Gray Background (visible initially) */}
        <div
          ref={grayLayerRef}
          className="absolute inset-0"
        >
          <img
            src={grayBg}
            alt="Background"
            className="w-full h-full object-cover opacity-65"
          />
        </div>

        {/* Layer 2: Color Background with animated clip-path reveal */}
        <div
          ref={colorLayerRef}
          className="absolute inset-0"
          style={{
            clipPath: generateClipPath(revealProgress),
          }}
        >
          <img
            src={colorBg}
            alt="Color Background"
            className="w-full h-full object-cover"
            style={{
              filter: 'saturate(0.8) brightness(1.05)',
            }}
          />
        </div>

        {/* Layer 3: Wine Bottle (always on top) */}
        <div
          ref={wineImageRef}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none py-4"
        >
          <img
            src={wineImage}
            alt={name}
            className="w-auto object-contain"
            style={{
              height: '280px',
              maxHeight: '85%',
              filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.35))',
            }}
          />
        </div>
      </div>

      {/* Wine Info */}
      <div className="p-6 flex flex-col flex-1">
        {/* Wine Info - Fixed height area */}
        <div className="flex-1">
          <h3 className="font-[family-name:var(--font-raleway)] text-xl font-semibold text-black-900 mb-2 line-clamp-2 leading-tight tracking-wide">
            {name}
          </h3>

          <p className="font-[family-name:var(--font-raleway)] text-sm text-gray-600 mb-4 font-medium">
            {varietal}
          </p>

          {/* Rating - only show if rating > 0 */}
          {rating > 0 && (
            <div className="mb-4">
              <Rating value={rating} />
            </div>
          )}
        </div>

        {/* Price - Always at bottom */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-2xl font-bold text-gold-600 font-mono leading-none">
              {formatPrice(price)}
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
            onClick={onViewDetails || handleFlip}
            className="w-full mt-2 text-sm text-gray-600 hover:text-gold-600 transition-colors duration-300 font-medium"
          >
            Ver Detalles →
          </button>
        </div>
      </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white via-cream-50 to-gold-50 border border-gold-200 rounded-lg overflow-hidden h-full flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Close button */}
          <button
            onClick={handleFlip}
            className="absolute top-3 right-3 z-20 w-7 h-7 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-gold-500 hover:text-white transition-all duration-300"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Vertical Layout: Bottle on top, Details below */}

          {/* Top - Wine Bottle with label visible */}
          <div className="relative h-[45%] flex items-center justify-center pt-8 pb-4">
            <img
              src={wineImage}
              alt={name}
              className="h-full w-auto object-contain drop-shadow-xl"
            />
          </div>

          {/* Bottom - Wine Details */}
          <div className="flex-1 px-6 pb-6 flex flex-col">
            {/* Title */}
            <h3 className="font-[family-name:var(--font-raleway)] text-lg font-bold text-gold-700 mb-1 tracking-wide leading-tight text-center">
              {name}
            </h3>

            {/* Varietal */}
            <p className="font-[family-name:var(--font-raleway)] text-xs text-gray-600 text-center mb-3 font-medium">
              {varietal}
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent mb-3" />

            {/* Description - compact */}
            <p className="font-[family-name:var(--font-raleway)] text-xs text-gray-700 leading-relaxed text-center mb-3">
              Vino excepcional de terrazas privilegiadas. Estructura compleja con taninos sedosos y notas de frutas negras maduras.
            </p>

            {/* Characteristics - inline */}
            <div className="flex justify-center gap-4 mb-3">
              <div className="text-center">
                <p className="text-xs text-gray-500">Crianza</p>
                <p className="text-xs font-semibold text-gray-800">12 meses</p>
              </div>
              <div className="w-px bg-gray-300" />
              <div className="text-center">
                <p className="text-xs text-gray-500">Guarda</p>
                <p className="text-xs font-semibold text-gray-800">5-8 años</p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <p className="text-2xl font-bold text-gold-600 font-mono leading-none">
                {formatPrice(price)}
              </p>
              <span className="font-[family-name:var(--font-raleway)] text-xs text-gray-500 self-end pb-1">
                CLP
              </span>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-2">
              {/* Add to Cart Button - subtle */}
              <button
                className="relative w-full inline-flex items-center justify-center px-4 py-2 bg-white text-gray-700 font-medium rounded-md border border-gold-300 overflow-hidden transition-all duration-300 hover:border-gold-500 hover:bg-gold-50 hover:shadow-sm font-[family-name:var(--font-raleway)] text-sm group"
                onClick={() => {}}
              >
                <svg
                  className="w-4 h-4 mr-2 text-gold-600 group-hover:text-gold-700 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-gray-700 group-hover:text-gold-700 transition-colors">
                  Añadir al Carro
                </span>
              </button>

              {/* Back button */}
              <button
                onClick={handleFlip}
                className="w-full text-center text-xs text-gray-500 hover:text-gold-600 font-medium transition-colors duration-300"
              >
                ← Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
