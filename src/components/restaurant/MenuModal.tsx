'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, Wine, ChevronDown, Leaf, Download, Flame } from 'lucide-react'
import {
  wineCategories,
  cocktails,
  spirits,
  salads,
  coldStarters,
  hotStarters,
  mainCourses,
  grill,
  sides,
  kids,
  desserts,
  beverages,
  beers,
  coffee,
  menuNavigation,
  loloHistory,
  type MenuSection as MenuSectionType,
  type MenuItem,
} from '@/data/menuData'

interface MenuModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const [activeSection, setActiveSection] = useState('historia')
  const [isMounted, setIsMounted] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Extended navigation with historia
  const fullNavigation = [
    { id: 'historia', label: 'Historia', icon: 'book' },
    ...menuNavigation
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [activeSection])

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsNavOpen(false)
  }

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-CL')}`
  }

  const handleDownloadPDF = () => {
    const link = document.createElement('a')
    link.href = '/Carta Loló/Carta-Lolo-2025-Oct-2-30x15cm-web.pdf'
    link.download = 'Carta-Lolo-2025.pdf'
    link.click()
  }

  if (!isMounted || !isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-6xl h-[96vh] sm:h-[94vh] mx-2 sm:mx-4 bg-[#FDFBF7] rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col">

        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        {/* Header */}
        <div className="flex-shrink-0 relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div className="relative flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-gold-200/50">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-2 bg-gold-500/10 rounded-full blur-lg" />
                <img
                  src="/images/Logotipos/Logo-Lolo Horizontal.svg"
                  alt="Loló"
                  className="relative h-8 sm:h-10 w-auto"
                />
              </div>
              <div className="hidden sm:block">
                <h2 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Carta
                </h2>
                <p className="text-xs text-gold-600 font-medium tracking-[0.2em] uppercase">Cocina de Origen</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadPDF}
                className="group flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-600 hover:text-gold-700 border border-gray-200 hover:border-gold-300 rounded-full transition-all hover:shadow-sm"
              >
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Descargar PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:block px-6 py-3 bg-white/50 backdrop-blur-sm border-b border-gold-100/50">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide justify-center">
              {fullNavigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`relative px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all whitespace-nowrap rounded-full ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {activeSection === item.id && (
                    <span className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-500 rounded-full shadow-lg shadow-gold-500/25" />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation - Mobile */}
          <div className="md:hidden px-4 py-3 bg-white/50 backdrop-blur-sm border-b border-gold-100/50">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="w-full flex items-center justify-between px-5 py-3 bg-white rounded-xl text-sm font-semibold text-gray-700 shadow-sm border border-gray-100"
            >
              <span className="uppercase tracking-wide text-xs">{fullNavigation.find(n => n.id === activeSection)?.label || 'Seleccionar'}</span>
              <ChevronDown className={`w-4 h-4 text-gold-500 transition-transform ${isNavOpen ? 'rotate-180' : ''}`} />
            </button>

            {isNavOpen && (
              <div className="absolute left-4 right-4 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-20 max-h-[60vh] overflow-y-auto">
                {fullNavigation.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className={`w-full px-5 py-3.5 text-left text-sm font-medium transition-colors ${
                      idx !== fullNavigation.length - 1 ? 'border-b border-gray-50' : ''
                    } ${
                      activeSection === item.id
                        ? 'bg-gold-50 text-gold-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="uppercase tracking-wide text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-8 py-8 sm:py-10 max-w-5xl mx-auto">

            {/* Historia */}
            {activeSection === 'historia' && (
              <HistorySection />
            )}

            {/* Vinos */}
            {activeSection === 'vinos' && (
              <WineSection formatPrice={formatPrice} />
            )}

            {/* Coctelería */}
            {activeSection === 'cocteleria' && (
              <div className="space-y-12">
                <MenuSectionComponent section={cocktails} formatPrice={formatPrice} showPairing={false} />
                <div className="relative py-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gold-200/50" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-[#FDFBF7] text-xs text-gold-500 uppercase tracking-widest">Licores</span>
                  </div>
                </div>
                <MenuSectionComponent section={spirits} formatPrice={formatPrice} showPairing={false} columns={2} />
              </div>
            )}

            {/* Ensaladas */}
            {activeSection === 'ensaladas' && (
              <MenuSectionComponent section={salads} formatPrice={formatPrice} />
            )}

            {/* Entradas */}
            {activeSection === 'entradas' && (
              <div className="space-y-12">
                <MenuSectionComponent section={coldStarters} formatPrice={formatPrice} />
                <div className="relative py-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gold-200/50" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-[#FDFBF7] text-xs text-gold-500 uppercase tracking-widest flex items-center gap-2">
                      <Flame className="w-3 h-3" />
                      Calientes
                    </span>
                  </div>
                </div>
                <MenuSectionComponent section={hotStarters} formatPrice={formatPrice} showTitle={false} />
              </div>
            )}

            {/* Principales */}
            {activeSection === 'principales' && (
              <MenuSectionComponent section={mainCourses} formatPrice={formatPrice} />
            )}

            {/* Parrilla */}
            {activeSection === 'parrilla' && (
              <MenuSectionComponent section={grill} formatPrice={formatPrice} />
            )}

            {/* Acompañar */}
            {activeSection === 'acompanar' && (
              <MenuSectionComponent section={sides} formatPrice={formatPrice} columns={2} />
            )}

            {/* Niños */}
            {activeSection === 'ninos' && (
              <MenuSectionComponent section={kids} formatPrice={formatPrice} />
            )}

            {/* Postres */}
            {activeSection === 'postres' && (
              <MenuSectionComponent section={desserts} formatPrice={formatPrice} columns={2} />
            )}

            {/* Bebidas */}
            {activeSection === 'bebidas' && (
              <MenuSectionComponent section={beverages} formatPrice={formatPrice} columns={2} />
            )}

            {/* Cervezas */}
            {activeSection === 'cervezas' && (
              <MenuSectionComponent section={beers} formatPrice={formatPrice} columns={2} />
            )}

            {/* Cafetería */}
            {activeSection === 'cafeteria' && (
              <MenuSectionComponent section={coffee} formatPrice={formatPrice} columns={2} />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-6 py-3 bg-white/80 backdrop-blur-sm border-t border-gold-100/50 text-center">
          <p className="text-[10px] text-gray-400 tracking-wide">
            Precios en pesos chilenos • IVA incluido • Propina sugerida 10%
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

// History Section
function HistorySection() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Logo and title */}
      <div className="text-center mb-10">
        <img
          src="/images/Logotipos/Logo-Lolo Horizontal.svg"
          alt="Loló"
          className="h-14 sm:h-20 w-auto mx-auto mb-6"
        />
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-400" />
          <span className="text-gold-600 text-xs font-semibold tracking-[0.3em] uppercase">Cocina de Origen</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-400" />
        </div>
      </div>

      {/* Title */}
      <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
        {loloHistory.title}
      </h2>
      <p className="text-center text-gold-600 text-sm font-medium mb-8 tracking-wide">
        {loloHistory.subtitle}
      </p>

      {/* Story paragraphs */}
      <div className="space-y-6">
        {loloHistory.paragraphs.map((paragraph, idx) => (
          <p
            key={idx}
            className="font-[family-name:var(--font-raleway)] text-gray-600 text-base leading-[1.9] text-justify first-letter:text-3xl first-letter:font-[family-name:var(--font-playfair)] first-letter:font-bold first-letter:text-gold-600 first-letter:mr-1 first-letter:float-left"
            style={{ textIndent: idx > 0 ? '2em' : 0 }}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Decorative element */}
      <div className="flex items-center justify-center gap-3 mt-12">
        <div className="w-2 h-2 rounded-full bg-gold-400" />
        <div className="w-24 h-0.5 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400" />
        <div className="w-2 h-2 rounded-full bg-gold-400" />
      </div>
    </div>
  )
}

// Wine Section
function WineSection({ formatPrice }: { formatPrice: (price: number) => string }) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-400" />
          <Wine className="w-6 h-6 text-gold-500" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-400" />
        </div>
        <h3 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Vinos
        </h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Nuestra selección de vinos del Valle de Colchagua
        </p>
      </div>

      {/* Table Header */}
      <div className="hidden sm:grid sm:grid-cols-[1fr,90px,90px] gap-4 px-6 py-3 bg-gradient-to-r from-gold-50 to-transparent rounded-lg">
        <span className="text-xs font-bold text-gold-700 uppercase tracking-wider">Vino</span>
        <span className="text-xs font-bold text-gold-700 uppercase tracking-wider text-center">Copa</span>
        <span className="text-xs font-bold text-gold-700 uppercase tracking-wider text-center">Botella</span>
      </div>

      {/* Wine Categories */}
      {wineCategories.map((category, catIdx) => (
        <div key={category.id} className="space-y-1">
          {/* Category Header */}
          <div className="flex items-center gap-3 mb-4">
            <h4 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-gray-800">
              {category.title}
            </h4>
            <div className="flex-1 h-px bg-gradient-to-r from-gold-200 to-transparent" />
          </div>

          {/* Wines */}
          <div className="space-y-1">
            {category.wines.map((wine, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-1 sm:grid-cols-[1fr,90px,90px] gap-2 sm:gap-4 px-4 sm:px-6 py-4 rounded-lg transition-colors ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                } hover:bg-gold-50/50`}
              >
                <div>
                  <p className="font-semibold text-gray-900">{wine.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{wine.varietal}</p>
                </div>
                <div className="flex sm:block items-center gap-2 sm:text-center">
                  <span className="sm:hidden text-xs text-gray-400 w-16">Copa:</span>
                  <span className={`text-sm font-medium ${wine.priceGlass ? 'text-gray-700' : 'text-gray-300'}`}>
                    {wine.priceGlass ? formatPrice(wine.priceGlass) : '—'}
                  </span>
                </div>
                <div className="flex sm:block items-center gap-2 sm:text-center">
                  <span className="sm:hidden text-xs text-gray-400 w-16">Botella:</span>
                  <span className="text-sm font-bold text-gold-600">
                    {wine.priceBottle ? formatPrice(wine.priceBottle) : '—'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Divider between categories */}
          {catIdx < wineCategories.length - 1 && (
            <div className="pt-6" />
          )}
        </div>
      ))}
    </div>
  )
}

// Generic Menu Section
function MenuSectionComponent({
  section,
  formatPrice,
  showTitle = true,
  showPairing = true,
  columns = 1
}: {
  section: MenuSectionType
  formatPrice: (price: number) => string
  showTitle?: boolean
  showPairing?: boolean
  columns?: 1 | 2
}) {
  return (
    <div>
      {showTitle && (
        <div className="text-center mb-10">
          <h3 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {section.title}
          </h3>
          {section.subtitle && (
            <p className="text-sm text-gold-600 font-medium tracking-wide">{section.subtitle}</p>
          )}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-8 h-px bg-gold-300" />
            <div className="w-2 h-2 rounded-full bg-gold-400" />
            <div className="w-8 h-px bg-gold-300" />
          </div>
        </div>
      )}

      <div className={`grid gap-4 ${columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
        {section.items.map((item, idx) => (
          <MenuItemCard key={idx} item={item} formatPrice={formatPrice} showPairing={showPairing} />
        ))}
      </div>
    </div>
  )
}

// Menu Item Card
function MenuItemCard({
  item,
  formatPrice,
  showPairing = true
}: {
  item: MenuItem
  formatPrice: (price: number) => string
  showPairing?: boolean
}) {
  return (
    <div className="group relative bg-white rounded-xl p-5 border border-gray-100 hover:border-gold-200 hover:shadow-lg transition-all duration-300">
      {/* Signature highlight */}
      {item.isSignature && (
        <div className="absolute -top-px -right-px">
          <div className="w-16 h-16 overflow-hidden">
            <div className="absolute transform rotate-45 bg-gradient-to-r from-gold-500 to-gold-400 text-white text-[8px] font-bold py-0.5 right-[-35px] top-[10px] w-[100px] text-center shadow-sm">
              CHEF
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Name and badges */}
          <div className="flex items-start gap-2 flex-wrap mb-1">
            <h4 className="font-[family-name:var(--font-playfair)] font-bold text-gray-900 text-lg leading-tight">
              {item.name}
            </h4>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {item.isVegan && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-semibold rounded-full border border-green-100">
                <Leaf className="w-3 h-3" />
                Vegano
              </span>
            )}
            {item.isWeekendOnly && (
              <span className="px-2 py-0.5 bg-orange-50 text-orange-700 text-[10px] font-semibold rounded-full border border-orange-100">
                Solo fines de semana
              </span>
            )}
          </div>

          {/* Description */}
          {item.description && (
            <p className="text-sm text-gray-500 leading-relaxed mb-3">{item.description}</p>
          )}

          {/* Pairing */}
          {showPairing && item.pairing && (
            <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
              <Wine className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
              <span className="text-xs text-gold-600 font-medium truncate">{item.pairing}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="text-right flex-shrink-0 pl-4">
          <span className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-gold-600">
            {formatPrice(item.price)}
          </span>
        </div>
      </div>
    </div>
  )
}
