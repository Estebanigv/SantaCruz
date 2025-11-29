'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { featuredWines, tours } from '@/data/mockData'
import { Wine } from '@/types'
import SectionHeader from '../ui/SectionHeader'
import gsap from 'gsap'
import { ShoppingCart, Heart, X, User, Download, Grid2X2, LayoutList } from 'lucide-react'
import Link from 'next/link'
import { useModal } from '@/contexts/ModalContext'

interface FeaturedWinesSectionProps {
  isAdult?: boolean | null
}

export default function FeaturedWinesSection({ isAdult = true }: FeaturedWinesSectionProps) {
  const { setIsModalOpen } = useModal()
  const [expandedWine, setExpandedWine] = useState<Wine | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showExpandedContent, setShowExpandedContent] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loginPromptWineId, setLoginPromptWineId] = useState<string | null>(null)
  const [gridView, setGridView] = useState<'single' | 'double'>('double') // 'single' = 1 col, 'double' = 2 cols
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const overlayRef = useRef<HTMLDivElement>(null)
  const expandedCardRef = useRef<HTMLDivElement>(null)
  const originalCardRect = useRef<DOMRect | null>(null)
  const gridRect = useRef<DOMRect | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleFavorite = useCallback((wineId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    const isLoggedIn = false

    if (!isLoggedIn) {
      // Mostrar tooltip local sobre esta tarjeta específica
      setLoginPromptWineId(wineId)
      setTimeout(() => setLoginPromptWineId(null), 3000)
      return
    }

    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(wineId)) {
        newFavorites.delete(wineId)
      } else {
        newFavorites.add(wineId)
      }
      return newFavorites
    })
  }, [])

  const handleAddToCart = useCallback((wine: Wine, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
  }, [])

  const handleExpand = useCallback((wine: Wine, index: number) => {
    if (isAnimating || expandedWine) return
    setIsAnimating(true)

    const card = cardsRef.current[index]
    const grid = gridRef.current
    if (!card || !grid) return

    originalCardRect.current = card.getBoundingClientRect()
    gridRect.current = grid.getBoundingClientRect()
    setExpandedWine(wine)
    setExpandedIndex(index)
    setIsModalOpen(true)
  }, [isAnimating, expandedWine, setIsModalOpen])

  useEffect(() => {
    if (!expandedWine || expandedIndex === null) return

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    const selectedCard = cards[expandedIndex]
    const otherCards = cards.filter((_, i) => i !== expandedIndex)
    const overlay = overlayRef.current
    const expandedCard = expandedCardRef.current

    if (!selectedCard || !overlay || !expandedCard || !originalCardRect.current || !gridRect.current) return

    const rect = originalCardRect.current
    // Grid rect is available in gridRect.current if needed

    // Calcular el centro del viewport visible
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const isMobile = viewportWidth < 768

    // Tamaño deseado de la tarjeta expandida - responsive
    const isSmallMobile = viewportWidth <= 375 // iPhone 13 mini, SE, etc
    const maxWidth = isMobile
      ? viewportWidth - 16 // En móvil: 8px de margen a cada lado
      : Math.min(1100, viewportWidth - 80) // En desktop: máximo 1100px con 40px a cada lado
    const maxHeight = isMobile
      ? viewportHeight - (isSmallMobile ? 20 : 40) // Más espacio en pantallas pequeñas
      : Math.min(580, viewportHeight - 80) // En desktop: máximo 580px

    // Posición centrada exacta
    const centeredLeft = Math.round((viewportWidth - maxWidth) / 2)
    const centeredTop = Math.round((viewportHeight - maxHeight) / 2)

    gsap.set(expandedCard, {
      position: 'fixed',
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      opacity: 1,
      rotateY: 0,
      zIndex: 50,
    })

    gsap.set(selectedCard, { opacity: 0 })

    const tl = gsap.timeline({
      onComplete: () => {
        setShowExpandedContent(true)
        setIsAnimating(false)
      }
    })

    tl.to(overlay, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    }, 0)

    otherCards.forEach((card) => {
      tl.to(card, {
        opacity: 0.3,
        scale: 0.95,
        filter: 'blur(4px)',
        duration: 0.4,
        ease: 'power2.out',
      }, 0)
    })

    // Animar hacia el centro exacto del viewport
    tl.to(expandedCard, {
      left: centeredLeft,
      top: centeredTop,
      width: maxWidth,
      height: maxHeight,
      duration: 0.6,
      ease: 'power3.inOut',
    }, 0.1)

  }, [expandedWine, expandedIndex])

  const handleCollapse = useCallback(() => {
    if (isAnimating || !expandedWine || expandedIndex === null) return
    setIsAnimating(true)
    setShowExpandedContent(false)

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    const selectedCard = cards[expandedIndex]
    const otherCards = cards.filter((_, i) => i !== expandedIndex)
    const overlay = overlayRef.current
    const expandedCard = expandedCardRef.current

    if (!selectedCard || !overlay || !expandedCard || !originalCardRect.current) return

    // Usar la posición original guardada de la tarjeta
    const targetRect = originalCardRect.current

    const tl = gsap.timeline({
      onComplete: () => {
        setExpandedWine(null)
        setExpandedIndex(null)
        setIsAnimating(false)
        setIsModalOpen(false)
        // Restaurar todas las tarjetas
        cards.forEach(card => {
          gsap.set(card, { clearProps: 'all' })
        })
        if (expandedCard) {
          gsap.set(expandedCard, { clearProps: 'all' })
        }
        // Limpiar la referencia
        originalCardRect.current = null
      }
    })

    // 1. La tarjeta expandida se contrae de vuelta a su posición original
    tl.to(expandedCard, {
      left: targetRect.left,
      top: targetRect.top,
      width: targetRect.width,
      height: targetRect.height,
      duration: 0.5,
      ease: 'power3.inOut',
    }, 0)

    // 2. Fade out del overlay
    tl.to(overlay, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.out',
    }, 0.1)

    // 3. Las otras tarjetas vuelven a la normalidad
    otherCards.forEach((card) => {
      tl.to(card, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.35,
        ease: 'power2.out',
      }, 0.1)
    })

    // 4. Al final, la tarjeta expandida desaparece y la original aparece
    tl.to(expandedCard, {
      opacity: 0,
      duration: 0.1,
      ease: 'power2.in',
    }, 0.4)

    tl.to(selectedCard, {
      opacity: 1,
      duration: 0.1,
      ease: 'power2.out',
    }, 0.45)

  }, [isAnimating, expandedWine, expandedIndex, setIsModalOpen])

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-CL')}`
  }

  // Only show alternative content if user explicitly confirmed they are a minor
  // isAdult === null means not verified yet, show wines by default
  // isAdult === true means verified adult, show wines
  // isAdult === false means verified minor, show alternative (no alcohol content)
  if (isAdult === false) {
    return <MinorAlternativeSection />
  }

  return (
    <section className="bg-transparent py-12 md:py-16 relative overflow-hidden">
      {/* Subtle pattern overlay - very transparent to let watercolor show through */}
      <div className="absolute inset-0 opacity-[0.01]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div ref={containerRef} className="container-custom relative">
        <SectionHeader
          label="Nuestra Selección"
          title="Vinos Destacados"
          subtitle="Descubre nuestra cuidadosa selección de vinos premium del Valle de Colchagua"
        />

        {/* View toggle - only visible on mobile */}
        <div className="flex justify-end mb-4 md:hidden">
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setGridView('double')}
              className={`flex items-center justify-center w-9 h-9 rounded-md transition-all duration-200 ${
                gridView === 'double'
                  ? 'bg-white text-gold-600 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              aria-label="Vista de 2 columnas"
            >
              <Grid2X2 className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setGridView('single')}
              className={`flex items-center justify-center w-9 h-9 rounded-md transition-all duration-200 ${
                gridView === 'single'
                  ? 'bg-white text-gold-600 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              aria-label="Vista de 1 columna"
            >
              <LayoutList className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div
          ref={gridRef}
          className="relative"
          style={{ perspective: '1500px', perspectiveOrigin: '50% 50%' }}
        >
          <div className={`grid gap-3 sm:gap-6 lg:gap-8 lg:grid-cols-4 ${gridView === 'single' ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {featuredWines.map((wine, index) => (
              <div
                key={wine.id}
                ref={(el) => { cardsRef.current[index] = el }}
                className="relative"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <WineCardFront
                    wine={wine}
                    onViewDetails={() => handleExpand(wine, index)}
                    onFavorite={() => handleFavorite(wine.id)}
                    onAddToCart={() => handleAddToCart(wine)}
                    isFavorite={favorites.has(wine.id)}
                    showLoginPrompt={loginPromptWineId === wine.id}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <button
            onClick={() => alert('Página en construcción - Próximamente disponible')}
            className="group inline-flex items-center gap-3 px-8 py-3.5 border border-gray-300 text-gray-700 font-[family-name:var(--font-raleway)] font-medium text-sm tracking-wide rounded-full transition-all duration-300 hover:border-gold-500 hover:text-gold-600 hover:shadow-md"
          >
            <span>Ver Toda la Colección</span>
            <span className="text-[10px] px-2 py-1 bg-gold-100 text-gold-700 rounded-full font-medium">Próximamente</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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

      {isMounted && expandedWine && createPortal(
        <>
          <div
            ref={overlayRef}
            className="fixed inset-0 bg-black/30 z-[49] backdrop-blur-[3px]"
            style={{ opacity: 0 }}
            onClick={handleCollapse}
          />

          <div
            ref={expandedCardRef}
            className="fixed rounded-xl overflow-hidden shadow-2xl bg-white"
          >
            <WineCardExpanded
              wine={expandedWine}
              onClose={handleCollapse}
              formatPrice={formatPrice}
              onFavorite={() => handleFavorite(expandedWine.id)}
              onAddToCart={() => handleAddToCart(expandedWine)}
              isFavorite={favorites.has(expandedWine.id)}
              showLoginPrompt={loginPromptWineId === expandedWine.id}
              isVisible={showExpandedContent}
            />
          </div>
        </>,
        document.body
      )}
    </section>
  )
}

function WineCardFront({
  wine,
  onViewDetails,
  onFavorite,
  onAddToCart,
  isFavorite,
  showLoginPrompt
}: {
  wine: Wine
  onViewDetails: () => void
  onFavorite: () => void
  onAddToCart: () => void
  isFavorite: boolean
  showLoginPrompt: boolean
}) {
  const [revealProgress, setRevealProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const grayLayerRef = useRef<HTMLDivElement>(null)
  const wineImageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isTouchDeviceRef = useRef(false)
  const isInteractingRef = useRef(false)

  // Cleanup effect for timeouts and animations
  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current)
      }
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [])

  const handleHover = useCallback((isEntering: boolean, fromTouch = false) => {
    // Prevent mouse events if this is a touch device and we're not coming from touch
    if (isTouchDeviceRef.current && !fromTouch) {
      return
    }

    setIsHovered(isEntering)
    isInteractingRef.current = isEntering

    const grayLayer = grayLayerRef.current
    const wineImg = wineImageRef.current
    const video = videoRef.current

    if (!grayLayer) return

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // Use faster animations for touch devices
    const isTouchDevice = isTouchDeviceRef.current

    if (isEntering) {
      // Play video IMMEDIATELY for instant feedback
      if (video) {
        video.currentTime = 0
        video.play().catch(() => {})
      }

      const tl = gsap.timeline()
      timelineRef.current = tl

      tl.to({ progress: revealProgress }, {
        progress: 100,
        duration: isTouchDevice ? 0.35 : 0.8,
        ease: isTouchDevice ? 'power2.out' : 'power3.out',
        onUpdate: function() {
          setRevealProgress(this.targets()[0].progress)
        }
      }, 0)

      tl.to(grayLayer, {
        opacity: 0,
        duration: isTouchDevice ? 0.25 : 0.6,
        ease: 'power2.out',
      }, isTouchDevice ? 0.05 : 0.15)

      if (wineImg) {
        tl.to(wineImg, {
          scale: 1.08,
          y: -10,
          duration: isTouchDevice ? 0.3 : 0.7,
          ease: 'power2.out',
        }, 0)
      }
    } else {
      // Pause video
      if (video) {
        video.pause()
      }

      const tl = gsap.timeline()
      timelineRef.current = tl

      tl.to({ progress: revealProgress }, {
        progress: 0,
        duration: isTouchDevice ? 0.25 : 0.5,
        ease: 'power2.in',
        onUpdate: function() {
          setRevealProgress(this.targets()[0].progress)
        }
      }, 0)

      tl.to(grayLayer, {
        opacity: 1,
        duration: isTouchDevice ? 0.2 : 0.4,
        ease: 'power2.in',
      }, isTouchDevice ? 0.05 : 0.1)

      if (wineImg) {
        tl.to(wineImg, {
          scale: 1,
          y: 0,
          duration: isTouchDevice ? 0.25 : 0.5,
          ease: 'power2.inOut',
        }, 0)
      }
    }
  }, [revealProgress])

  const generateClipPath = (progress: number) => {
    if (progress <= 0) return 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
    if (progress >= 100) return 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

    const baseY = progress
    const wave1 = Math.sin((progress / 100) * Math.PI * 2) * 3
    const wave2 = Math.cos((progress / 100) * Math.PI * 1.5) * 2
    const wave3 = Math.sin((progress / 100) * Math.PI * 3) * 2

    const p1 = Math.max(0, Math.min(100, baseY + wave1))
    const p2 = Math.max(0, Math.min(100, baseY + wave2 + 1))
    const p3 = Math.max(0, Math.min(100, baseY + wave3))
    const p4 = Math.max(0, Math.min(100, baseY - wave1 + 1))
    const p5 = Math.max(0, Math.min(100, baseY + wave2))

    return `polygon(0% 0%, 25% 0%, 50% 0%, 75% 0%, 100% 0%, 100% ${p5}%, 75% ${p4}%, 50% ${p3}%, 25% ${p2}%, 0% ${p1}%)`
  }

  const formatPrice = (price: number) => `$${price.toLocaleString('es-CL')}`

  // Touch handlers with proper event management
  const handleTouchStart = useCallback(() => {
    // Mark as touch device
    isTouchDeviceRef.current = true

    // Clear any existing timeout
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current)
    }

    // Toggle hover effect
    if (!isInteractingRef.current) {
      handleHover(true, true)
      // Auto-reset after 1.2 seconds for snappy UX
      touchTimeoutRef.current = setTimeout(() => {
        if (isInteractingRef.current) {
          handleHover(false, true)
        }
      }, 1200)
    } else {
      handleHover(false, true)
    }
  }, [handleHover])

  const handleMouseEnter = useCallback(() => {
    // Only process if not a touch device
    if (!isTouchDeviceRef.current) {
      handleHover(true, false)
    }
  }, [handleHover])

  const handleMouseLeave = useCallback(() => {
    // Only process if not a touch device
    if (!isTouchDeviceRef.current) {
      handleHover(false, false)
    }
  }, [handleHover])

  return (
    <div
      className="flex flex-col h-full wine-card-interactive"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      style={{ touchAction: 'manipulation' }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-white" style={{ isolation: 'isolate' }}>
        {/* Barra de login en la parte superior - horizontal */}
        {showLoginPrompt && (
          <div className="absolute top-0 left-0 right-0 z-30 animate-fade-in">
            <div className="bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 flex items-center justify-center gap-2">
              <User className="w-3 h-3 text-gold-400" strokeWidth={2} />
              <span className="text-xs">Inicia sesión para guardar favoritos</span>
              <button className="text-gold-400 hover:text-gold-300 font-medium transition-colors text-xs ml-1">
                Iniciar →
              </button>
            </div>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onFavorite()
          }}
          className="absolute top-2.5 right-2.5 z-20 w-7 h-7 flex items-center justify-center bg-white/80 hover:bg-white hover:scale-110 rounded-full shadow-sm transition-all duration-200 group"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-200 ${isFavorite ? 'text-red-500 fill-red-500 scale-110' : 'text-gray-400 group-hover:text-red-400'}`}
            strokeWidth={1.5}
          />
        </button>

        {/* Gray Background */}
        <div ref={grayLayerRef} className="absolute inset-0">
          <img
            src={wine.grayBg}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* Color Background with clip-path reveal */}
        <div
          className="absolute inset-0"
          style={{ clipPath: generateClipPath(revealProgress) }}
        >
          {/* Static color image as base */}
          <img
            src={wine.colorBg}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            style={{ filter: 'saturate(0.85) brightness(1.02)' }}
          />

          {/* Video layer - shows animated clouds on hover (only for wines with video) */}
          {wine.videoBg && (
            <video
              ref={videoRef}
              src={wine.videoBg}
              muted
              loop
              playsInline
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity ${isHovered ? 'opacity-100 duration-300' : 'opacity-0 duration-400'}`}
              style={{ willChange: 'opacity' }}
            />
          )}

          {/* Fallback smoke effect for wines without video */}
          {!wine.videoBg && (
            <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              {/* Capa de humo 1 - movimiento lento */}
              <div
                className={`absolute inset-0 ${isHovered ? 'animate-smoke-drift-1' : ''}`}
                style={{
                  background: 'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(255,255,255,0.18) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
                  filter: 'blur(18px)',
                }}
              />
              {/* Capa de humo 2 - movimiento medio */}
              <div
                className={`absolute inset-0 ${isHovered ? 'animate-smoke-drift-2' : ''}`}
                style={{
                  background: 'radial-gradient(ellipse 70% 50% at 60% 70%, rgba(255,255,255,0.12) 0%, transparent 45%), radial-gradient(ellipse 50% 70% at 30% 30%, rgba(212,175,55,0.1) 0%, transparent 50%)',
                  filter: 'blur(22px)',
                }}
              />
              {/* Capa de humo 3 - movimiento rápido */}
              <div
                className={`absolute inset-0 ${isHovered ? 'animate-smoke-drift-3' : ''}`}
                style={{
                  background: 'radial-gradient(ellipse 90% 40% at 40% 90%, rgba(255,255,255,0.1) 0%, transparent 40%), radial-gradient(ellipse 40% 60% at 70% 50%, rgba(255,255,255,0.08) 0%, transparent 45%)',
                  filter: 'blur(25px)',
                }}
              />
            </div>
          )}
        </div>

        {/* Wine Bottle */}
        <div
          ref={wineImageRef}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none py-4"
        >
          <img
            src={wine.image}
            alt={wine.name}
            loading="lazy"
            decoding="async"
            className="w-auto object-contain"
            style={{
              height: '280px',
              maxHeight: '85%',
              filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.4))',
            }}
          />
        </div>
      </div>

      {/* Wine Info - responsive */}
      <div className="p-2.5 sm:p-5 flex flex-col flex-1">
        <h3 className="text-sm sm:text-lg font-medium text-gray-900 mb-0.5 sm:mb-1 line-clamp-1">
          {wine.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 line-clamp-1">{wine.varietal}</p>

        <div className="mt-auto">
          {/* Price - responsive */}
          <div className="flex items-baseline gap-1 sm:gap-1.5 mb-2 sm:mb-4">
            <span className="text-base sm:text-xl font-semibold text-gold-600">
              {formatPrice(wine.price)}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400">CLP</span>
          </div>

          {/* Actions - responsive */}
          <div className="flex gap-1.5 sm:gap-3">
            <button
              onClick={onViewDetails}
              className="flex-1 py-1.5 sm:py-2.5 text-[10px] sm:text-sm font-medium text-gray-600 border border-gray-200 rounded-md sm:rounded-lg hover:border-gold-400 hover:text-gold-600 transition-colors duration-200"
            >
              Ver Detalles
            </button>

            {/* Botón carrito */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToCart()
                }}
                className="group/cart btn-shimmer btn-ripple relative w-8 h-8 sm:w-11 sm:h-11 flex items-center justify-center bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_100%] text-white rounded-md sm:rounded-lg overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:shadow-gold-500/40 hover:scale-110 hover:bg-right active:scale-95"
              >
                {/* Efecto de brillo que cruza el botón */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/cart:translate-x-full transition-transform duration-700 ease-out skew-x-12" />
                {/* Ícono con animación de wiggle */}
                <ShoppingCart
                  className="relative w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover/cart:rotate-12 group-active/cart:scale-90"
                  strokeWidth={1.5}
                />
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WineCardExpanded({
  wine,
  onClose,
  formatPrice,
  onFavorite,
  onAddToCart,
  isFavorite,
  showLoginPrompt,
  isVisible,
}: {
  wine: Wine
  onClose: () => void
  formatPrice: (price: number) => string
  onFavorite: () => void
  onAddToCart: () => void
  isFavorite: boolean
  showLoginPrompt: boolean
  isVisible: boolean
}) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [isVisible])

  return (
    <div ref={contentRef} className="flex flex-col md:flex-row h-full overflow-hidden" style={{ opacity: isVisible ? 1 : 0 }}>
      {/* Close button - absolute on mobile, in header on desktop */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-20 w-9 h-9 md:hidden flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg transition-all duration-200"
      >
        <X className="w-5 h-5 text-gray-600" strokeWidth={2} />
      </button>

      {/* Top - Bottle with background (HERO - 50% height on mobile) */}
      <div className="h-[50%] md:h-full md:w-[42%] relative flex items-center justify-center flex-shrink-0">
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={wine.expandedBg || wine.colorBg}
            alt=""
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
            style={{ filter: wine.expandedBg ? 'none' : 'saturate(0.85) brightness(1.02)', opacity: wine.expandedBg ? 1 : 0.85 }}
          />
        </div>
        {/* Wine bottle - BIGGER on mobile */}
        <img
          src={wine.image}
          alt={wine.name}
          loading="eager"
          decoding="async"
          className="relative z-10 h-[90%] w-auto object-contain"
          style={{ filter: 'drop-shadow(0 25px 40px rgba(0, 0, 0, 0.35))' }}
        />
      </div>

      {/* Bottom - Details (50% height on mobile, scrollable) */}
      <div className="h-[50%] md:h-full md:flex-1 md:w-[58%] px-4 py-3 md:p-4 lg:p-5 flex flex-col relative bg-white overflow-y-auto">
        {/* Desktop close & favorite buttons */}
        <div className="hidden md:flex absolute top-4 right-4 items-center gap-3 z-10">
          <div className="relative">
            <button
              onClick={onFavorite}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 ${
                isFavorite
                  ? 'bg-red-50 text-red-500'
                  : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-400'
              }`}
            >
              <Heart
                className={`w-5 h-5 transition-all duration-200 ${isFavorite ? 'fill-current' : ''}`}
                strokeWidth={1.5}
              />
            </button>
            {showLoginPrompt && (
              <div className="absolute top-full right-0 mt-2 animate-fade-in z-30">
                <div className="bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg text-xs whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-gold-400" strokeWidth={2} />
                    <span>Inicia sesión</span>
                  </div>
                  <button className="mt-1 text-gold-400 hover:text-gold-300 font-medium transition-colors text-[10px]">
                    Iniciar Sesión →
                  </button>
                  <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-900/95 rotate-45" />
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 hover:scale-110 rounded-full transition-all duration-200"
          >
            <X className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
          </button>
        </div>

        {/* Header - more compact on mobile */}
        <div className="mb-2 md:mb-4 pr-0 md:pr-24 flex items-start justify-between">
          <div>
            <p className="text-gold-600 text-xs md:text-xs font-semibold uppercase tracking-wider mb-0.5">
              {wine.varietal}
            </p>
            <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-gray-900">
              {wine.name}
            </h2>
            <div className="h-0.5 w-8 md:w-10 bg-gold-400 mt-1.5" />
          </div>
          {/* Mobile favorite button */}
          <button
            onClick={onFavorite}
            className={`md:hidden w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 ${
              isFavorite
                ? 'bg-red-50 text-red-500'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-all duration-200 ${isFavorite ? 'fill-current' : ''}`}
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* Description - compact on mobile */}
        <div className="mb-2 md:mb-5">
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-none">
            {wine.description || 'Descripción no disponible.'}
          </p>
        </div>

        {/* Characteristics - inline on mobile */}
        <div className="flex flex-wrap gap-2 md:grid md:grid-cols-2 md:gap-2 mb-3 md:mb-5">
          <div className="bg-gray-50 rounded-full md:rounded px-3 py-1.5 md:px-3 md:py-2 flex md:block items-center gap-1.5">
            <p className="text-[10px] md:text-[10px] text-gray-400 uppercase tracking-wide">Añada</p>
            <p className="font-medium text-gray-800 text-xs md:text-sm">{wine.vintage}</p>
          </div>
          <div className="bg-gray-50 rounded-full md:rounded px-3 py-1.5 md:px-3 md:py-2 flex md:block items-center gap-1.5">
            <p className="text-[10px] md:text-[10px] text-gray-400 uppercase tracking-wide">Crianza</p>
            <p className="font-medium text-gray-800 text-xs md:text-sm">12 meses</p>
          </div>
          <div className="bg-gray-50 rounded-full md:rounded px-3 py-1.5 md:px-3 md:py-2 flex md:block items-center gap-1.5">
            <p className="text-[10px] md:text-[10px] text-gray-400 uppercase tracking-wide">Temp.</p>
            <p className="font-medium text-gray-800 text-xs md:text-sm">16-18°C</p>
          </div>
          <div className="bg-gray-50 rounded-full md:rounded px-3 py-1.5 md:px-3 md:py-2 flex md:block items-center gap-1.5">
            <p className="text-[10px] md:text-[10px] text-gray-400 uppercase tracking-wide">Maridaje</p>
            <p className="font-medium text-gray-800 text-xs md:text-sm">Carnes, quesos</p>
          </div>
        </div>

        {/* Price & Actions - sticky at bottom on mobile */}
        <div className="mt-auto pt-3 md:pt-4 border-t border-gray-100">
          {/* Price */}
          <div className="mb-2 md:mb-3">
            <span className="text-xl md:text-xl lg:text-2xl font-semibold text-gold-600">
              {formatPrice(wine.price)}
            </span>
            <span className="text-gray-400 text-xs md:text-sm ml-2">CLP</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 md:gap-2">
            {/* Botón Añadir al Carro */}
            <button
              onClick={onAddToCart}
              className="group/btn btn-shimmer btn-ripple relative flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 bg-[length:200%_100%] text-white text-sm font-medium py-3 px-4 rounded-lg overflow-hidden transition-all duration-300 ease-out shadow-lg hover:shadow-2xl hover:shadow-gold-500/40 hover:scale-[1.02] hover:bg-right active:scale-[0.98]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out skew-x-12" />
              <ShoppingCart
                className="relative w-4 h-4 transition-all duration-300 group-hover/btn:rotate-12"
                strokeWidth={1.5}
              />
              <span className="relative whitespace-nowrap">Añadir al Carrito</span>
            </button>

            {/* Botón Descargar Ficha Técnica */}
            <button
              onClick={(e) => e.preventDefault()}
              disabled
              className="group/dl flex items-center justify-center gap-1.5 py-3 px-4 border border-gray-200 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed opacity-50 whitespace-nowrap"
            >
              <Download
                className="w-4 h-4 flex-shrink-0"
                strokeWidth={1.5}
              />
              <span className="sm:hidden">Ficha</span>
              <span className="hidden sm:inline">Ficha Técnica</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Alternative section for users under legal drinking age
// Shows cultural experiences that don't include wine/alcohol
function MinorAlternativeSection() {
  // Filter tours to only show cultural experiences (no wine tours)
  // IDs: 5 = Carruaje, 6 = Museo, 7 = Teleférico
  const culturalExperiences = tours.filter((tour) => tour.category === 'cultural')

  const formatPrice = (price: number) => `$${price.toLocaleString('es-CL')}`

  return (
    <section className="bg-transparent py-12 md:py-16 relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.01]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom relative">
        <SectionHeader
          label="Experiencias para Todos"
          title="Descubre el Valle"
          subtitle="Explora nuestras actividades culturales y de aventura para toda la familia"
        />

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {culturalExperiences.map((tour) => (
            <Link
              key={tour.id}
              href={`/experiencias?categoria=cultural`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Duration badge */}
                <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 shadow-lg">
                  {tour.duration}
                </div>
                {/* Title on image */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-gold-300 transition-colors">
                    {tour.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                  {tour.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-gold-600">
                    {formatPrice(tour.price)}
                    <span className="text-xs text-gray-400 ml-1">/ persona</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-gold-600 group-hover:text-gold-700 transition-colors">
                    Ver más
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/experiencias?categoria=cultural"
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-gold-600 to-gold-500 text-white font-[family-name:var(--font-raleway)] font-medium text-sm tracking-wide rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <span>Ver Todas las Experiencias</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
