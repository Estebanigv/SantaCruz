'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Experience {
  id: string
  slug: string
  title: string
  shortTitle: string
  category: 'tours-vino' | 'experiencias' | 'eventos'
  description: string
  highlights: string[]
  duration: string
  price: number
  priceType: string
  image: string
}

const experiences: Experience[] = [
  // TOURS VINO
  {
    id: '1',
    slug: 'tour-gran-chaman',
    title: 'Tour Gran Chamán',
    shortTitle: 'Gran Chamán',
    category: 'tours-vino',
    description: 'Degustación de cuatro vinos Gran Reserva con recorrido por bodega, teleférico y Cerro de las Culturas.',
    highlights: ['4 vinos Gran Reserva', 'Recorrido por bodega', 'Teleférico incluido', 'Cerro de las Culturas'],
    duration: '2 horas',
    price: 43000,
    priceType: 'persona',
    image: '/images/Tours y Expériencias/Tours de vinos, Gran Chaman.webp',
  },
  {
    id: '2',
    slug: 'tour-grandes-vinos',
    title: 'Tour Grandes Vinos',
    shortTitle: 'Grandes Vinos',
    category: 'tours-vino',
    description: 'Nuestra selección más exclusiva: Santa Cruz Terrazas, Make Make, Tupu y Pequeña Escala.',
    highlights: ['Vinos íconos exclusivos', 'Santa Cruz Terrazas', 'Make Make & Tupu', 'Pequeña Escala'],
    duration: '2 horas',
    price: 54000,
    priceType: 'persona',
    image: '/images/Tours y Expériencias/Tours grandes vinos.webp',
  },
  {
    id: '3',
    slug: 'tour-pequena-escala',
    title: 'Tour Pequeña Escala',
    shortTitle: 'Pequeña Escala',
    category: 'tours-vino',
    description: 'Conoce nuestras apuestas enológicas con maridaje de quesos y productos locales.',
    highlights: ['Apuestas enológicas', 'Maridaje de quesos', 'Productos locales', 'Experiencia íntima'],
    duration: '1 hora',
    price: 45000,
    priceType: 'persona',
    image: '/images/Tours y Expériencias/Tours pequeña escala.webp',
  },
  {
    id: '4',
    slug: 'tour-experiencia-santa-cruz',
    title: 'Experiencia Santa Cruz',
    shortTitle: 'Exp. Santa Cruz',
    category: 'tours-vino',
    description: 'Cinco vinos premium con maridaje especial, recorrido completo por bodega y teleférico.',
    highlights: ['5 vinos premium', 'Maridaje especial', 'Bodega completa', 'Teleférico'],
    duration: '2.5 horas',
    price: 90000,
    priceType: 'persona',
    image: '/images/Tours y Expériencias/Tours Experiencia Santa Cruz.webp',
  },
  // EXPERIENCIAS
  {
    id: '5',
    slug: 'paseo-vinedo-carruaje',
    title: 'Paseo en Carruaje',
    shortTitle: 'Carruaje',
    category: 'experiencias',
    description: 'Recorrido tradicional por el viñedo conociendo las variedades de uva y la fauna local.',
    highlights: ['Carruaje tradicional', 'Viñedos', 'Fauna local', 'Fotografías'],
    duration: '30 min',
    price: 11000,
    priceType: 'persona',
    image: '/images/Tours y Expériencias/Paseo por viñedo en carruaje.webp',
  },
  {
    id: '6',
    slug: 'museo-vino-autos',
    title: 'Museos del Vino & Autos',
    shortTitle: 'Museos',
    category: 'experiencias',
    description: 'Más de 80 autos históricos y 2.000 m² de historia enológica mundial con degustación incluida.',
    highlights: ['+80 autos históricos', 'DeLorean original', '2.000 m² de museo', 'Degustación incluida'],
    duration: '2-4 horas',
    price: 19000,
    priceType: 'persona',
    image: '/images/Tours y Expériencias/Museo del vino & Museo de Autos y Motos..webp',
  },
  {
    id: '7',
    slug: 'teleferico-cerro-culturas',
    title: 'Teleférico & Cerro Culturas',
    shortTitle: 'Teleférico',
    category: 'experiencias',
    description: 'Vista panorámica del valle, aldeas Mapuche, Aymara y Rapa Nui, museo astronómico.',
    highlights: ['Teleférico suizo', 'Aldeas ancestrales', 'Museo astronómico', 'Vista panorámica'],
    duration: '1 hora',
    price: 21000,
    priceType: 'persona',
    image: '/images/Tours y Expériencias/Paseo teleférico y Cerro de las Culturas.webp',
  },
  {
    id: '8',
    slug: 'tour-astronomico-ancestral',
    title: 'Tour Astronómico',
    shortTitle: 'Astronómico',
    category: 'experiencias',
    description: 'Observación nocturna con telescopios profesionales y conexión con la cosmovisión ancestral.',
    highlights: ['Telescopios profesionales', 'Cielos limpios', 'Cosmovisión ancestral', 'Guía experto'],
    duration: '2 horas',
    price: 35000,
    priceType: 'persona',
    image: '/images/Tours y Expériencias/Tour Astronómico Ancestral.webp',
  },
  {
    id: '9',
    slug: 'sunset-eno-astronomico',
    title: 'Sunset Eno-Astronómico',
    shortTitle: 'Sunset',
    category: 'experiencias',
    description: 'Atardecer con degustación premium y observación astronómica bajo las estrellas del valle.',
    highlights: ['Atardecer en el valle', 'Degustación premium', 'Observación estelar', 'Cena incluida'],
    duration: '4 horas',
    price: 85000,
    priceType: 'persona',
    image: '/images/Tours y Expériencias/Sunset Eno-Astronómico.webp',
  },
  {
    id: '10',
    slug: 'full-day-familia',
    title: 'Full Day Familia',
    shortTitle: 'Full Day Familia',
    category: 'experiencias',
    description: 'Museos, almuerzo gourmet, Tour Gran Chamán y teleférico. Ideal para familias.',
    highlights: ['Todos los museos', 'Almuerzo gourmet', 'Tour Gran Chamán', 'Teleférico'],
    duration: '6 horas',
    price: 265000,
    priceType: '2 adultos + 2 niños',
    image: '/images/Tours y Expériencias/Full Day Familia.webp',
  },
  {
    id: '11',
    slug: 'full-day-para-dos',
    title: 'Full Day Para Dos',
    shortTitle: 'Para Dos',
    category: 'experiencias',
    description: 'Museos, almuerzo en Restaurante Loló, Tour Grandes Vinos y teleférico al atardecer.',
    highlights: ['Experiencia romántica', 'Almuerzo en Loló', 'Tour Grandes Vinos', 'Atardecer'],
    duration: '6 horas',
    price: 210000,
    priceType: 'pareja',
    image: '/images/Tours y Expériencias/Full Day para Dos.webp',
  },
  {
    id: '12',
    slug: 'dos-dias-vina-santa-cruz',
    title: 'Dos Días en la Viña',
    shortTitle: 'Dos Días',
    category: 'experiencias',
    description: 'Experiencia completa con alojamiento en cabañas étnicas, tours, gastronomía y astronomía.',
    highlights: ['Alojamiento étnico', 'Todos los tours', 'Gastronomía completa', 'Astronomía nocturna'],
    duration: '2 días',
    price: 450000,
    priceType: 'pareja',
    image: '/images/Tours y Expériencias/Dos Días en Viña Santa Cruz.webp',
  },
  // EVENTOS
  {
    id: '13',
    slug: 'eventos-corporativos',
    title: 'Eventos Corporativos',
    shortTitle: 'Corporativos',
    category: 'eventos',
    description: 'Espacios únicos para reuniones empresariales, team building y celebraciones corporativas.',
    highlights: ['Salones equipados', 'Catering gourmet', 'Actividades team building', 'Entorno natural'],
    duration: 'Personalizado',
    price: 0,
    priceType: 'cotizar',
    image: '/images/Tours y Expériencias/Full Day para Dos.webp',
  },
  {
    id: '14',
    slug: 'matrimonios',
    title: 'Matrimonios',
    shortTitle: 'Matrimonios',
    category: 'eventos',
    description: 'Celebra tu boda en un entorno mágico rodeado de viñedos y con vista al valle de Colchagua.',
    highlights: ['Ceremonia en viñedos', 'Banquete gourmet', 'Alojamiento disponible', 'Decoración personalizada'],
    duration: 'Personalizado',
    price: 0,
    priceType: 'cotizar',
    image: '/images/Tours y Expériencias/Sunset Eno-Astronómico.webp',
  },
  {
    id: '15',
    slug: 'celebraciones-privadas',
    title: 'Celebraciones Privadas',
    shortTitle: 'Celebraciones',
    category: 'eventos',
    description: 'Cumpleaños, aniversarios y celebraciones especiales en un ambiente exclusivo.',
    highlights: ['Espacios privados', 'Menú personalizado', 'Degustación de vinos', 'Servicio premium'],
    duration: 'Personalizado',
    price: 0,
    priceType: 'cotizar',
    image: '/images/Tours y Expériencias/Tours Experiencia Santa Cruz.webp',
  },
]

const categories = [
  { id: 'tours-vino', label: 'Tours Vino', color: '#722F37' },
  { id: 'experiencias', label: 'Experiencias', color: '#2D5A47' },
  { id: 'eventos', label: 'Eventos', color: '#B8860B' },
]

export default function ToursSection() {
  const [activeCategory, setActiveCategory] = useState<string>('tours-vino')
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)

  const filteredExperiences = experiences.filter(exp => exp.category === activeCategory)
  const totalExperiences = filteredExperiences.length

  const formatPrice = (price: number) => price.toLocaleString('es-CL')

  const getCategoryColor = (catId: string) => {
    return categories.find(c => c.id === catId)?.color || '#B8860B'
  }

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Reset selection when category changes
  useEffect(() => {
    setSelectedExperience(null)
    setExpandedCard(null)
  }, [activeCategory])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleExpandCard = (expId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedCard(expandedCard === expId ? null : expId)
  }

  // Scroll to detail panel when experience is selected
  useEffect(() => {
    if (selectedExperience && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }, [selectedExperience])

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!selectedExperience) return

      const target = e.target as HTMLElement
      // Check if click is outside the detail panel and outside the cards
      const isOutsidePanel = detailRef.current && !detailRef.current.contains(target)
      const isOutsideCards = !target.closest('[data-experience-card]')

      if (isOutsidePanel && isOutsideCards) {
        setSelectedExperience(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [selectedExperience])

  // Close panel with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedExperience) {
        setSelectedExperience(null)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [selectedExperience])

  const handleSelectExperience = (exp: Experience) => {
    setSelectedExperience(selectedExperience?.id === exp.id ? null : exp)
  }

  return (
    <section
      ref={sectionRef}
      id="experiencias"
      className="relative pt-16 pb-16 md:pt-24 md:pb-20 overflow-hidden bg-transparent"
    >
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 -left-40 w-80 h-80 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, ${getCategoryColor(activeCategory)}15 0%, transparent 70%)`,
            transition: 'background 0.8s ease-out'
          }}
        />
        <div
          className="absolute bottom-20 -right-40 w-96 h-96 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${getCategoryColor(activeCategory)}10 0%, transparent 70%)`,
            transition: 'background 0.8s ease-out'
          }}
        />
      </div>

      {/* Header */}
      <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Label with decorative lines - Gold color */}
        <div className="flex items-center gap-4 mb-6 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500" />
            <div className="relative px-6 py-3">
              <div className="absolute inset-0 bg-gold-500/10 backdrop-blur-sm rounded-full" />
              <span className="relative font-[family-name:var(--font-raleway)] text-xs font-semibold tracking-[0.3em] uppercase text-gold-600">
                Experiencias Únicas
              </span>
            </div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-500" />
          </div>
        </div>
        <h2 className="font-[family-name:var(--font-raleway)] text-4xl md:text-5xl lg:text-6xl text-gray-900 font-light tracking-tight mb-5">
          Vive el Valle de Colchagua
        </h2>
        <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto mb-6">
          Descubre experiencias diseñadas para conectar con la esencia del vino y la cultura chilena
        </p>
        {/* Decorative dots and line - Gold */}
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gold-400" />
          <span className="w-16 h-0.5 bg-gold-400" />
          <span className="w-2 h-2 rounded-full bg-gold-400" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className={`container-custom mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex justify-center">
          <div className="inline-flex gap-2 p-1.5 bg-gray-100/80 rounded-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-400 rounded-full ${
                  activeCategory === cat.id
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{
                  backgroundColor: activeCategory === cat.id ? cat.color : 'transparent',
                  transform: activeCategory === cat.id ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Cards Grid */}
      <div className={`container-custom transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className={`flex flex-wrap gap-5 md:gap-6 ${
          totalExperiences <= 3 ? 'justify-center' : 'justify-start'
        }`}>
          {filteredExperiences.map((exp, index) => {
            const isSelected = selectedExperience?.id === exp.id
            const isHovered = hoveredCard === exp.id

            return (
              <div
                key={exp.id}
                data-experience-card
                onMouseEnter={() => setHoveredCard(exp.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative transition-all duration-500 ease-out rounded-xl overflow-hidden bg-white w-[calc(50%-10px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] ${
                  isSelected ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  boxShadow: isHovered
                    ? '0 20px 40px -15px rgba(0,0,0,0.15)'
                    : '0 2px 15px -5px rgba(0,0,0,0.06)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  // Ring color is applied via className
                  maxWidth: '280px'
                }}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className={`object-cover transition-all duration-500 ease-out ${
                      isHovered ? 'scale-103' : 'scale-100'
                    }`}
                    style={{ transform: isHovered ? 'scale(1.03)' : 'scale(1)' }}
                  />
                </div>

                {/* Content Panel */}
                <div className="p-4">
                  {/* Category & Duration row */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[10px] tracking-widest uppercase font-semibold"
                      style={{ color: getCategoryColor(exp.category) }}
                    >
                      {categories.find(c => c.id === exp.category)?.label}
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {exp.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-[family-name:var(--font-raleway)] text-base text-gray-900 font-semibold mb-3 leading-snug">
                    {exp.title}
                  </h3>

                  {/* Action link */}
                  <button
                    onClick={() => handleSelectExperience(exp)}
                    className="group/btn flex items-center gap-1.5 text-xs font-medium transition-all duration-300 hover:gap-2"
                    style={{ color: getCategoryColor(exp.category) }}
                  >
                    <span>{isSelected ? 'Cerrar' : 'Ver experiencia'}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-all duration-300 ${isSelected ? '' : 'group-hover/btn:translate-x-0.5'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {isSelected ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      )}
                    </svg>
                  </button>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 ease-out"
                  style={{
                    backgroundColor: getCategoryColor(exp.category),
                    width: isHovered || isSelected ? '100%' : '0%'
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Counter */}
        <div className="flex justify-center mt-8">
          <span className="text-gray-400 text-sm tracking-wider">
            {String(totalExperiences).padStart(2, '0')} experiencias disponibles
          </span>
        </div>
      </div>

      {/* Expandable Detail Panel */}
      <div
        ref={detailRef}
        className={`transition-all ease-out overflow-hidden ${
          selectedExperience
            ? 'max-h-[800px] opacity-100 mt-12 duration-700'
            : 'max-h-0 opacity-0 mt-0 duration-500'
        }`}
        style={{
          transitionTimingFunction: selectedExperience ? 'cubic-bezier(0.4, 0, 0.2, 1)' : 'cubic-bezier(0.4, 0, 1, 1)'
        }}
      >
        {selectedExperience && (
          <div className="container-custom">
            <div
              className="bg-white rounded-3xl overflow-hidden shadow-2xl"
              style={{
                boxShadow: `0 30px 60px -20px ${getCategoryColor(selectedExperience.category)}30`
              }}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image - Left side */}
                <div className="relative w-full lg:w-1/2 h-[350px] lg:h-[550px] overflow-hidden">
                  <Image
                    src={selectedExperience.image}
                    alt={selectedExperience.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Category badge */}
                  <div className="absolute top-6 left-6">
                    <span
                      className="text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-full font-medium"
                      style={{
                        backgroundColor: getCategoryColor(selectedExperience.category),
                        color: 'white'
                      }}
                    >
                      {categories.find(c => c.id === selectedExperience.category)?.label}
                    </span>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">{selectedExperience.duration}</span>
                  </div>
                </div>

                {/* Info - Right side */}
                <div className="w-full lg:w-1/2 p-8 md:p-10 lg:p-14 flex flex-col justify-center relative">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedExperience(null)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-300 hover:rotate-90"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Title */}
                  <h3 className="font-[family-name:var(--font-raleway)] text-3xl md:text-4xl text-gray-900 font-semibold tracking-tight mb-4">
                    {selectedExperience.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {selectedExperience.description}
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {selectedExperience.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100"
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getCategoryColor(selectedExperience.category) }}
                        />
                        <span className="text-gray-700 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-8 p-6 bg-gray-50 rounded-2xl">
                    <div className="flex items-baseline gap-2">
                      {selectedExperience.price > 0 ? (
                        <>
                          <span className="font-[family-name:var(--font-raleway)] text-4xl text-gray-900 font-bold">
                            ${formatPrice(selectedExperience.price)}
                          </span>
                          <span className="text-gray-500 text-sm">/ {selectedExperience.priceType}</span>
                        </>
                      ) : (
                        <span className="font-[family-name:var(--font-raleway)] text-2xl text-gray-900 font-semibold">
                          Solicitar cotización
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    {/* Botón principal - Reserva */}
                    <button
                      onClick={() => {
                        console.log('Reservar:', selectedExperience)
                      }}
                      className="group relative flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-[family-name:var(--font-raleway)] font-semibold tracking-wide overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
                      style={{
                        backgroundColor: getCategoryColor(selectedExperience.category),
                        boxShadow: `0 10px 30px -10px ${getCategoryColor(selectedExperience.category)}80`
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                      <svg className="relative w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="relative">Reserva</span>
                    </button>

                    {/* Botón secundario - Ver más */}
                    <Link
                      href={`/experiencias/${selectedExperience.slug}`}
                      className="group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border-2 font-[family-name:var(--font-raleway)] font-medium tracking-wide transition-all duration-300 hover:bg-gray-50"
                      style={{
                        borderColor: getCategoryColor(selectedExperience.category),
                        color: getCategoryColor(selectedExperience.category)
                      }}
                    >
                      <span>Ver Más</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ver todas link */}
      <div className={`container-custom mt-14 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex justify-center">
          <Link
            href="/experiencias"
            className="group inline-flex items-center gap-3 px-8 py-3.5 border border-gray-300 text-gray-700 font-[family-name:var(--font-raleway)] font-medium text-sm tracking-wide rounded-full transition-all duration-300 hover:border-gold-500 hover:text-gold-600 hover:shadow-md"
          >
            <span>Ver Todas las Experiencias</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
