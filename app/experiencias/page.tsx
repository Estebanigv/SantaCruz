'use client'

import { useState, useMemo, useEffect, Suspense, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { tours } from '@/data/mockData'
import { Tour } from '@/types'
import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import { BreadcrumbSchema, EventSchema, WebPageSchema } from '@/components/seo/StructuredData'
import { useAgeVerification } from '@/hooks/useAgeVerification'
// Link removed - not currently used but may be needed later

type CategoryFilter = 'all' | 'vino' | 'cultural' | 'premium'

// Category type
interface Category {
  id: string
  name: string
  shortName: string
  description: string
  color: string
  borderColor: string
  bgColor: string
  image: string
}

// Category Card - Simple version (border handled by parent)
function CategoryCard({
  cat,
  tourCount,
  isActive,
  onClick,
  onMouseEnter,
  cardRef
}: {
  cat: Category
  tourCount: number
  isActive: boolean
  onClick: () => void
  onMouseEnter: () => void
  cardRef: (el: HTMLButtonElement | null) => void
}) {
  return (
    <button
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`group relative h-72 rounded-2xl overflow-hidden text-left transition-all duration-300 hover:shadow-2xl ${
        isActive ? 'ring-4 ring-gold-500 ring-offset-4' : ''
      }`}
    >
      <div className="absolute inset-0">
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className={`absolute inset-0 bg-gradient-to-t ${cat.color}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="relative h-full p-6 flex flex-col justify-end z-10">
        <h3 className="font-[family-name:var(--font-raleway)] text-2xl font-bold text-white mb-2">
          {cat.name}
        </h3>
        <p className="font-[family-name:var(--font-raleway)] text-white/80 text-sm mb-3 line-clamp-2">
          {cat.description}
        </p>
        <div className="flex items-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium group-hover:bg-white/30 transition-all">
            <span className="w-6 h-6 flex items-center justify-center bg-white text-gray-900 rounded-full text-xs font-bold">
              {tourCount}
            </span>
            Experiencias
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  )
}

// Categories Section with floating border
function CategoriesSection({
  categoryFilter,
  onCategoryClick,
  availableCategories
}: {
  categoryFilter: CategoryFilter
  onCategoryClick: (catId: string, isActive: boolean) => void
  availableCategories: typeof categories
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [borderPosition, setBorderPosition] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [isOnTitle, setIsOnTitle] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Initialize border position on title
  useEffect(() => {
    if (titleRef.current && !hasInteracted) {
      const rect = titleRef.current.getBoundingClientRect()
      const sectionRect = sectionRef.current?.getBoundingClientRect()
      if (sectionRect) {
        setBorderPosition({
          x: rect.left - sectionRect.left,
          y: rect.top - sectionRect.top,
          width: rect.width,
          height: rect.height
        })
      }
    }
  }, [hasInteracted])

  const handleCardHover = (index: number) => {
    const card = cardRefs.current[index]
    const section = sectionRef.current
    if (card && section) {
      const cardRect = card.getBoundingClientRect()
      const sectionRect = section.getBoundingClientRect()
      const offset = 8 // Pixels to extend beyond the card
      setBorderPosition({
        x: cardRect.left - sectionRect.left - offset,
        y: cardRect.top - sectionRect.top - offset,
        width: cardRect.width + (offset * 2),
        height: cardRect.height + (offset * 2)
      })
      setIsOnTitle(false)
      setHasInteracted(true)
    }
  }

  const handleTitleHover = () => {
    const title = titleRef.current
    const section = sectionRef.current
    if (title && section) {
      const titleRect = title.getBoundingClientRect()
      const sectionRect = section.getBoundingClientRect()
      setBorderPosition({
        x: titleRect.left - sectionRect.left,
        y: titleRect.top - sectionRect.top,
        width: titleRect.width,
        height: titleRect.height
      })
      setIsOnTitle(true)
    }
  }

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-white relative">
      {/* Floating border that moves between elements */}
      <div
        className="absolute pointer-events-none z-30"
        style={{
          left: borderPosition.x,
          top: borderPosition.y,
          width: borderPosition.width,
          height: borderPosition.height,
          borderRadius: isOnTitle ? '12px' : '20px',
          boxShadow: isOnTitle
            ? '0 0 0 2px rgba(212, 175, 55, 0.4), 0 0 15px rgba(212, 175, 55, 0.15)'
            : '0 0 0 3px rgba(212, 175, 55, 0.9), 0 0 25px rgba(212, 175, 55, 0.5), 0 0 50px rgba(212, 175, 55, 0.2)',
          transition: 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), top 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease, border-radius 0.25s ease',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {/* Elegant subtitle with lines */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold-400 to-gold-500" />
            <span className="text-gold-600 text-sm uppercase tracking-widest font-[family-name:var(--font-raleway)] font-semibold">
              No te pierdas
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-gold-400 to-gold-500" />
          </div>
          <div
            ref={titleRef}
            onMouseEnter={handleTitleHover}
            className="inline-block px-4 py-2 cursor-default"
          >
            <h2 className="font-[family-name:var(--font-raleway)] text-4xl md:text-5xl font-bold text-gray-900">
              Categorías de Experiencias
            </h2>
          </div>
        </div>

        <div className={`grid gap-6 ${availableCategories.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-3'}`}>
          {availableCategories.map((cat, index) => {
            const tourCount = tours.filter(t => t.category === cat.id).length
            const isActive = categoryFilter === cat.id

            return (
              <CategoryCard
                key={cat.id}
                cat={cat}
                tourCount={tourCount}
                isActive={isActive}
                onClick={() => onCategoryClick(cat.id, isActive)}
                onMouseEnter={() => handleCardHover(index)}
                cardRef={(el: HTMLButtonElement | null) => { cardRefs.current[index] = el }}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Category data with better info
const categories = [
  {
    id: 'vino',
    name: 'Tours de Vino',
    shortName: 'Vinos',
    description: 'Degustaciones guiadas por expertos, recorridos por la bodega y maridajes exclusivos',
    color: 'from-purple-900/70 via-wine-800/75 to-wine-600/60',
    borderColor: 'border-wine-500/30',
    bgColor: 'bg-wine-500/10',
    image: '/images/Tours y Expériencias/Tours grandes vinos.webp',
  },
  {
    id: 'cultural',
    name: 'Experiencias',
    shortName: 'Experiencias',
    description: 'Museos, teleférico, pueblos ancestrales y paisajes únicos del Valle de Colchagua',
    color: 'from-emerald-800/70 to-emerald-600/50',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
    image: '/images/Tours y Expériencias/Paseo teleférico y Cerro de las Culturas.webp',
  },
  {
    id: 'premium',
    name: 'Eventos',
    shortName: 'Eventos',
    description: 'Full days, noches astronómicas y escapadas exclusivas para parejas y familias',
    color: 'from-gold-700/70 to-gold-500/50',
    borderColor: 'border-gold-500/30',
    bgColor: 'bg-gold-500/10',
    image: '/images/Tours y Expériencias/Full Day Familia.webp',
  },
]

// Experience Card Component - Click to expand
function ExperienceCard({ tour, index, onViewDetails }: { tour: Tour; index: number; onViewDetails: (tour: Tour) => void }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const formatPrice = (price: number) => price.toLocaleString('es-CL')

  const categoryStyles: Record<string, { badge: string }> = {
    vino: { badge: 'bg-wine-600/80 text-white' },
    cultural: { badge: 'bg-emerald-600/80 text-white' },
    premium: { badge: 'bg-gold-500/90 text-black' },
  }

  const priceTypeLabels: Record<string, string> = {
    persona: '/ persona',
    pareja: '/ pareja',
    familia: '/ familia',
    grupo: '/ grupo',
  }

  const categoryLabels: Record<string, string> = {
    vino: 'Tour de Vinos',
    cultural: 'Experiencia',
    premium: 'Evento',
  }

  return (
    <div
      ref={cardRef}
      onClick={() => onViewDetails(tour)}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-gold-200"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 100}ms`,
      }}
    >
      {/* Image - Más grande con aspect ratio 1:1 (cuadrada) */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay mejorado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        {/* Category Badge - Rediseñado */}
        <div className={`absolute top-4 left-4 px-4 py-2 rounded-xl ${categoryStyles[tour.category].badge} text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg`}>
          {categoryLabels[tour.category]}
        </div>

        {/* Duration Badge - Nuevo diseño */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 text-xs font-medium shadow-lg">
          <svg className="w-3.5 h-3.5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {tour.duration}
        </div>

        {/* Título sobre la imagen */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-[family-name:var(--font-raleway)] text-xl font-bold text-white mb-1 drop-shadow-lg group-hover:text-gold-300 transition-colors">
            {tour.name}
          </h3>
        </div>

        {/* View Details Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90 px-5 py-2.5 bg-white rounded-full text-gray-900 text-sm font-semibold flex items-center gap-2 shadow-xl">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Ver Detalles
          </span>
        </div>
      </div>

      {/* Content - Más compacto */}
      <div className="p-5">
        <p className="font-[family-name:var(--font-raleway)] text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {tour.description}
        </p>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-baseline gap-1.5">
            <span className="font-[family-name:var(--font-raleway)] text-2xl font-bold text-gray-900">
              ${formatPrice(tour.price)}
            </span>
            <span className="text-gray-500 text-sm">{priceTypeLabels[tour.priceType]}</span>
          </div>

          <button className="flex items-center gap-1.5 px-4 py-2 bg-gold-500/10 hover:bg-gold-500 text-gold-700 hover:text-white text-sm font-semibold rounded-full transition-all duration-300 group-hover:shadow-lg">
            Reservar
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// Experience Detail Modal - Full information with booking form
function ExperienceDetailModal({
  tour,
  isOpen,
  onClose
}: {
  tour: Tour
  isOpen: boolean
  onClose: () => void
}) {
  const { addTour, openCart } = useCart()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('10:00')
  const [persons, setPersons] = useState(2)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const formatPrice = (price: number) => price.toLocaleString('es-CL')
  const totalPrice = tour.priceType === 'persona' ? tour.price * persons : tour.price

  const priceTypeLabels: Record<string, string> = {
    persona: '/ persona',
    pareja: '/ pareja',
    familia: '/ familia',
    grupo: '/ grupo',
  }

  const categoryLabels: Record<string, string> = {
    vino: 'Tour de Vinos',
    cultural: 'Experiencia',
    premium: 'Evento',
  }

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = 'hidden'
      setTimeout(() => setShowContent(true), 100)
    } else {
      setShowContent(false)
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    setShowContent(false)
    setTimeout(() => {
      setIsAnimating(false)
      onClose()
    }, 300)
  }

  const handleReserve = () => {
    if (!date) return
    addTour(tour, date, time, persons)
    openCart()
    handleClose()
  }

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, handleClose])

  if (!isOpen && !isAnimating) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: showContent ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)',
          backdropFilter: showContent ? 'blur(8px)' : 'blur(0px)',
        }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl pointer-events-auto"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
            {/* Left - Image */}
            <div className="relative w-full lg:w-1/2 h-64 lg:h-auto min-h-[300px]">
              <Image
                src={tour.image}
                alt={tour.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/30" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-4 py-2 bg-gold-500 text-black rounded-full text-sm font-bold uppercase tracking-wider">
                {categoryLabels[tour.category]}
              </div>

              {/* Duration on mobile */}
              <div className="absolute bottom-4 left-4 lg:hidden flex items-center gap-2 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{tour.duration}</span>
              </div>
            </div>

            {/* Right - Content */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
              {/* Header */}
              <div className="mb-6">
                <div className="hidden lg:flex items-center gap-2 text-gray-500 text-sm mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tour.duration}
                </div>
                <h2 className="font-[family-name:var(--font-raleway)] text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {tour.name}
                </h2>
                <div className="h-1 w-16 bg-gold-500 rounded-full" />
              </div>

              {/* Description */}
              <p className="font-[family-name:var(--font-raleway)] text-gray-600 leading-relaxed mb-6">
                {tour.description}
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-raleway)] text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  ¿Qué incluye?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tour.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-[family-name:var(--font-raleway)] text-gray-600 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Form */}
              <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                <h3 className="font-[family-name:var(--font-raleway)] text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Reservar Experiencia
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Fecha</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all text-sm"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Hora</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all text-sm"
                    >
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">14:00 PM</option>
                      <option value="15:00">15:00 PM</option>
                      <option value="16:00">16:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Persons */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Número de personas
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setPersons(Math.max(tour.minPersons || 1, persons - 1))}
                      className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-xl font-semibold text-gray-900 w-8 text-center">{persons}</span>
                    <button
                      onClick={() => setPersons(Math.min(tour.maxCapacity || 20, persons + 1))}
                      className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 text-sm">Total</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-[family-name:var(--font-raleway)] text-3xl font-bold text-gray-900">
                      ${formatPrice(totalPrice)}
                    </span>
                    <span className="text-gray-500 text-sm">{priceTypeLabels[tour.priceType]}</span>
                  </div>
                </div>

                <button
                  onClick={handleReserve}
                  disabled={!date}
                  className={`group/btn relative w-full flex items-center justify-center gap-2 font-medium py-4 rounded-full overflow-hidden transition-all duration-300 ease-out ${
                    date
                      ? 'bg-gold-500 hover:bg-gold-400 text-white shadow-lg hover:shadow-2xl hover:shadow-gold-500/40 hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-gray-100 border-2 border-dashed border-gray-300 text-gray-500 hover:border-gold-400 hover:text-gold-600 hover:bg-gold-50'
                  }`}
                >
                  {date && <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out skew-x-12" />}
                  {date ? (
                    <svg className="relative z-10 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ) : (
                    <svg className="relative z-10 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  <span className="relative z-10">{date ? 'Agregar al Carrito' : 'Selecciona una fecha arriba'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Featured Experience (Large Card)
function FeaturedExperience({ tour, onReserve }: { tour: Tour; onReserve: (tour: Tour) => void }) {
  const formatPrice = (price: number) => price.toLocaleString('es-CL')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isFading, setIsFading] = useState(false)

  const priceTypeLabels: Record<string, string> = {
    persona: '/ persona',
    pareja: '/ pareja',
    familia: '/ familia',
    grupo: '/ grupo',
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      // Start fade 1.2 seconds before the end
      if (video.duration - video.currentTime <= 1.2 && !isFading) {
        setIsFading(true)
      }
    }

    const handleEnded = () => {
      // Video ended, keep faded with logo visible for 2 seconds, then fade back in
      video.currentTime = 0
      video.play()
      setTimeout(() => {
        setIsFading(false)
      }, 2000)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [isFading])

  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[500px]">
        {/* Video Side */}
        <div className="relative h-80 lg:h-auto overflow-hidden bg-black">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: isFading ? 0 : 1 }}
          >
            <source src="/images/Vídeos/Teleférico.mp4" type="video/mp4" />
          </video>

          {/* Logo that appears during fade */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 pointer-events-none"
            style={{ opacity: isFading ? 1 : 0 }}
          >
            <div
              className="relative"
              style={{
                transform: isFading ? 'scale(1)' : 'scale(0.8)',
                transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {/* Glow effect behind logo */}
              <div
                className="absolute inset-0 blur-2xl rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
                  transform: 'scale(1.5)',
                  opacity: isFading ? 1 : 0,
                  transition: 'opacity 1s ease-out 0.3s',
                }}
              />
              <Image
                src="/images/logo_vsc_png_byw.png"
                alt="Viña Santa Cruz"
                width={280}
                height={280}
                className="object-contain relative z-10"
              />
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent lg:hidden" />

          {/* Badge with shimmer effect */}
          <div className="absolute top-6 left-6 z-10">
            <div className="relative px-4 py-2 bg-gold-500 text-black rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-2 overflow-hidden">
              {/* Animated shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="relative z-10">Experiencia Destacada</span>
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <span className="text-gold-400 text-sm uppercase tracking-widest mb-3 font-[family-name:var(--font-raleway)]">
            Premium • {tour.duration}
          </span>

          <h2 className="font-[family-name:var(--font-raleway)] text-3xl lg:text-4xl font-bold text-white mb-4">
            {tour.name}
          </h2>

          <p className="font-[family-name:var(--font-raleway)] text-gray-300 text-base leading-relaxed mb-8">
            {tour.description}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {tour.highlights.slice(0, 6).map((highlight, i) => (
              <div key={i} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-[family-name:var(--font-raleway)] text-gray-300 text-sm">{highlight}</span>
              </div>
            ))}
          </div>

          {/* Price and CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 border-t border-gray-800">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-raleway)] text-4xl font-bold text-white">
                  ${formatPrice(tour.price)}
                </span>
                <span className="text-gray-400">{priceTypeLabels[tour.priceType]}</span>
              </div>
              {tour.priceNote && (
                <span className="text-gray-500 text-sm">{tour.priceNote}</span>
              )}
            </div>

            <button
              onClick={() => onReserve(tour)}
              className="group/btn btn-shimmer relative flex items-center gap-2.5 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 bg-[length:200%_100%] text-white font-medium py-4 px-8 rounded-full overflow-hidden transition-all duration-300 ease-out shadow-lg hover:shadow-2xl hover:shadow-gold-500/40 hover:scale-105 hover:bg-right active:scale-[0.98]"
            >
              {/* Efecto de brillo que cruza el botón */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out skew-x-12" />
              <span className="relative z-10">Reservar Ahora</span>
              <svg className="relative z-10 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Booking Modal Component - Reserved for future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function BookingModal({ tour, isOpen, onClose }: { tour: Tour; isOpen: boolean; onClose: () => void }) {
  const { addTour, openCart } = useCart()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('10:00')
  const [persons, setPersons] = useState(2)

  const formatPrice = (price: number) => price.toLocaleString('es-CL')

  const totalPrice = tour.priceType === 'persona' ? tour.price * persons : tour.price

  const handleReserve = () => {
    addTour(tour, date, time, persons)
    openCart()
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="relative h-48">
            <Image src={tour.image} alt={tour.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-4 left-6 right-6">
              <h3 className="font-[family-name:var(--font-raleway)] text-2xl font-bold text-white">
                {tour.name}
              </h3>
              <p className="text-white/70 text-sm mt-1">{tour.duration}</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-5">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
              >
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">14:00 PM</option>
                <option value="15:00">15:00 PM</option>
                <option value="16:00">16:00 PM</option>
              </select>
            </div>

            {/* Persons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de personas
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setPersons(Math.max(tour.minPersons || 1, persons - 1))}
                  className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-2xl font-semibold text-gray-900 w-12 text-center">{persons}</span>
                <button
                  onClick={() => setPersons(Math.min(tour.maxCapacity || 20, persons + 1))}
                  className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Total</span>
                <span className="font-[family-name:var(--font-raleway)] text-3xl font-bold text-gray-900">
                  ${formatPrice(totalPrice)}
                </span>
              </div>

              <button
                onClick={handleReserve}
                disabled={!date}
                className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 disabled:from-gray-300 disabled:to-gray-300 text-white font-medium rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
              >
                {date ? 'Agregar al Carrito' : 'Selecciona una fecha'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function ExperienciasContent() {
  const searchParams = useSearchParams()
  const { isAdult } = useAgeVerification()
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const experiencesSectionRef = useRef<HTMLElement>(null)

  // Filter tours based on age - minors don't see wine tours
  const isMinor = isAdult === false

  // Available tours for the current user (minors can't see wine category)
  const availableTours = useMemo(() => {
    if (isMinor) {
      // For minors: only cultural and premium (events) tours, excluding those with wine tastings
      return tours.filter(tour => tour.category === 'cultural' || tour.category === 'premium')
    }
    return tours
  }, [isMinor])

  // Categories available for the current user
  const availableCategories = useMemo(() => {
    if (isMinor) {
      // For minors: only cultural and premium categories (no wine)
      return categories.filter(cat => cat.id !== 'vino')
    }
    return categories
  }, [isMinor])

  useEffect(() => {
    const categoria = searchParams.get('categoria')
    // For minors, don't allow 'vino' category
    if (categoria && ['vino', 'cultural', 'premium'].includes(categoria)) {
      if (isMinor && categoria === 'vino') {
        setCategoryFilter('all')
      } else {
        setCategoryFilter(categoria as CategoryFilter)
      }
    }
  }, [searchParams, isMinor])

  const filteredTours = useMemo(() => {
    if (categoryFilter === 'all') return availableTours
    return availableTours.filter(tour => tour.category === categoryFilter)
  }, [categoryFilter, availableTours])

  // Featured tour - for minors use Teleférico, for adults use the default
  const featuredTour = useMemo(() => {
    if (isMinor) {
      return availableTours.find(t => t.slug === 'teleferico-cerro-culturas') || availableTours[0]
    }
    return tours.find(t => t.slug === 'teleferico-cerro-culturas') || tours[0]
  }, [isMinor, availableTours])

  const handleViewDetails = (tour: Tour) => {
    setSelectedTour(tour)
    setIsBookingOpen(true)
  }

  const handleCategoryClick = useCallback((catId: string, isActive: boolean) => {
    setCategoryFilter(isActive ? 'all' : catId as CategoryFilter)
    // Scroll to experiences section
    setTimeout(() => {
      experiencesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [])

  const stats = [
    { value: '12+', label: 'Experiencias' },
    { value: '4.9', label: 'Calificación' },
    { value: '15K+', label: 'Visitantes/año' },
    { value: '2023', label: 'Premio Enoturismo' },
  ]

  return (
    <>
      {/* SEO: Structured Data for Experiences Page */}
      <WebPageSchema
        name="Experiencias y Tours de Vino - Viña Santa Cruz"
        description="Reserva tours exclusivos de vino, experiencias culturales y eventos premium en el Valle de Colchagua. Degustaciones, teleférico, noches astronómicas y más."
        url="https://www.vinasantacruz.cl/experiencias"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: 'https://www.vinasantacruz.cl' },
          { name: 'Experiencias', url: 'https://www.vinasantacruz.cl/experiencias' },
        ]}
      />
      {/* Featured Tour Schema */}
      <EventSchema
        name={featuredTour.name}
        description={featuredTour.description}
        image={`https://www.vinasantacruz.cl${featuredTour.image}`}
        price={featuredTour.price}
        url={`https://www.vinasantacruz.cl/experiencias/${featuredTour.slug}`}
      />

      <main className="min-h-screen bg-[#faf9f7]">
        {/* Hero Section - Full Screen */}
        <section className="relative h-screen min-h-[700px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/webp/Telferico.webp"
              alt="Experiencias Viña Santa Cruz"
              fill
              className="object-cover"
              style={{ objectPosition: 'center 35%' }}
              priority
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.45) 100%)',
              }}
            />
          </div>

          {/* Content - text at top, center clear, stats at bottom */}
          <div className="relative z-30 h-full flex flex-col justify-between">
            {/* Text at top */}
            <div className="pt-32 md:pt-40 text-center px-6">
              <h1 className="font-[family-name:var(--font-raleway)] text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-3"
                style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}
              >
                Vive la Experiencia
              </h1>
              <h2 className="font-[family-name:var(--font-raleway)] text-gold-400 text-3xl md:text-4xl lg:text-5xl font-semibold"
                style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}
              >
                Valle de Colchagua
              </h2>
            </div>

            {/* Stats at bottom */}
            <div className="pb-28 md:pb-36 text-center px-6">
              {/* Subtitle */}
              <p className="font-[family-name:var(--font-raleway)] text-white text-base md:text-lg max-w-xl mx-auto mb-10"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)', lineHeight: '1.8' }}
              >
                Degustaciones de vinos premium, noches astronómicas
                <br className="hidden sm:block" />
                y experiencias únicas bajo el cielo de Chile
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-10 md:gap-16">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="font-[family-name:var(--font-raleway)] text-3xl md:text-4xl font-bold text-white mb-1"
                      style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                    >
                      {stat.value}
                    </div>
                    <div className="font-[family-name:var(--font-raleway)] text-white/80 text-xs uppercase tracking-widest"
                      style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 group"
            aria-label="Scroll to next section"
          >
            <div className="flex flex-col items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white font-light">
                Explorar
              </span>
              <svg
                className="w-5 h-5 text-white animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        </section>

        {/* Categories Section */}
        <CategoriesSection
          categoryFilter={categoryFilter}
          onCategoryClick={handleCategoryClick}
          availableCategories={availableCategories}
        />

        {/* Featured Experience */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-gold-600 text-sm uppercase tracking-widest font-[family-name:var(--font-raleway)]">
                No te pierdas
              </span>
              <h2 className="font-[family-name:var(--font-raleway)] text-4xl md:text-5xl font-bold text-gray-900 mt-2">
                Experiencia Destacada
              </h2>
            </div>

            <FeaturedExperience tour={featuredTour} onReserve={handleViewDetails} />
          </div>
        </section>

        {/* All Experiences */}
        <section ref={experiencesSectionRef} className="py-24 px-4 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-0 w-72 h-72 bg-gold-400/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-wine-400/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header - Rediseñado */}
            <div className="text-center mb-16">
              {/* Decorative element */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold-400 to-gold-500" />
                <div className="w-3 h-3 rounded-full bg-gold-500 animate-pulse" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent via-gold-400 to-gold-500" />
              </div>

              <span className="inline-block px-4 py-2 bg-gold-500/10 text-gold-700 text-sm uppercase tracking-[0.2em] font-semibold rounded-full mb-4 font-[family-name:var(--font-raleway)]">
                {categoryFilter === 'all' ? 'Catálogo Completo' : categories.find(c => c.id === categoryFilter)?.shortName || ''}
              </span>

              <h2 className="font-[family-name:var(--font-raleway)] text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                {categoryFilter === 'all' ? 'Todas las Experiencias' : categories.find(c => c.id === categoryFilter)?.name || 'Experiencias'}
              </h2>

              <p className="font-[family-name:var(--font-raleway)] text-gray-500 text-lg max-w-2xl mx-auto">
                Selecciona la experiencia perfecta para ti y vive momentos inolvidables en el corazón del Valle de Colchagua
              </p>
            </div>

            {/* Filter Pills - Centrados y mejorados */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  categoryFilter === 'all'
                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/30'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                }`}
              >
                Todas ({availableTours.length})
              </button>
              {availableCategories.map((cat) => {
                const count = availableTours.filter(t => t.category === cat.id).length
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id as CategoryFilter)}
                    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                      categoryFilter === cat.id
                        ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/30'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {cat.shortName} ({count})
                  </button>
                )
              })}
            </div>

            {/* Results Info - Más elegante */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-200">
              <p className="font-[family-name:var(--font-raleway)] text-gray-500">
                Mostrando <span className="text-gray-900 font-bold text-lg">{filteredTours.length}</span> experiencias disponibles
              </p>
              {categoryFilter !== 'all' && (
                <button
                  onClick={() => setCategoryFilter('all')}
                  className="flex items-center gap-2 text-gold-600 hover:text-gold-700 font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Limpiar filtro
                </button>
              )}
            </div>

            {/* Grid - Mejorado */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour, index) => (
                <ExperienceCard
                  key={tour.id}
                  tour={tour}
                  index={index}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Experience Detail Modal */}
      {selectedTour && (
        <ExperienceDetailModal
          tour={selectedTour}
          isOpen={isBookingOpen}
          onClose={() => {
            setIsBookingOpen(false)
            setSelectedTour(null)
          }}
        />
      )}
    </>
  )
}

export default function ExperienciasPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando experiencias...</p>
        </div>
      </div>
    }>
      <ExperienciasContent />
    </Suspense>
  )
}
