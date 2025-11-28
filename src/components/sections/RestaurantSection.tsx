'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react'

interface RestaurantSectionProps {
  isAdult?: boolean | null
}

export default function RestaurantSection({ isAdult = true }: RestaurantSectionProps) {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMenuModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuModalOpen])
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: 'Horarios',
      description: 'Martes a Domingo',
      highlight: '12:00 - 16:00 hrs',
      isHighlighted: true,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: 'Capacidad',
      description: 'Hasta 120 personas',
      highlight: 'Salones privados',
      isHighlighted: false,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      title: 'Reservas',
      description: 'Reserva con anticipación',
      highlight: '+56 9 7218 8755',
      isHighlighted: true,
    },
  ]

  return (
    <section id="gastronomia" className="relative bg-transparent pt-6 pb-16 md:pt-8 md:pb-20 overflow-hidden scroll-mt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.3) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="container-custom relative">
        {/* Custom Header with Logo */}
        <div className="text-center mb-12 md:mb-16">
          {/* Label with decorative lines */}
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500" />
              <div className="relative px-6 py-3 text-gold-600">
                <div className="absolute inset-0 bg-gold-500/5 backdrop-blur-sm rounded-full" />
                <span className="relative font-[family-name:var(--font-raleway)] text-xs font-semibold tracking-[0.3em] uppercase">
                  Gastronomía
                </span>
              </div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-500" />
            </div>
          </div>
          {/* Loló Logo prominently displayed */}
          <div className="flex flex-col items-center justify-center mb-4">
            <img
              src="/images/Logotipos/Logo-Lolo.svg"
              alt="Loló - Cocina de Origen"
              className="h-16 md:h-20 lg:h-24 w-auto object-contain"
            />
          </div>
          <p className="font-[family-name:var(--font-raleway)] text-gray-600 text-base md:text-lg max-w-2xl mx-auto mt-4">
            Cocina chilena contemporánea con productos locales y de temporada, maridada con nuestros mejores vinos
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="w-2 h-2 rounded-full bg-gold-400" />
            <span className="w-16 h-0.5 bg-gold-400" />
            <span className="w-2 h-2 rounded-full bg-gold-400" />
          </div>
        </div>

        {/* Video + Content Layout - Video extends to the left */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 items-stretch relative">
            {/* Video - Extends beyond container to the left */}
            <div className="relative lg:-ml-[8vw] order-2 lg:order-1">
              {/* Video Container with design elements */}
              <div className="relative h-full">
                {/* Gold corner accents */}
                <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold-400/60 rounded-tl-2xl hidden lg:block z-10" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-gold-400/60 rounded-br-2xl hidden lg:block z-10" />

                {/* Main video */}
                <div className="h-full min-h-[350px] lg:min-h-0 rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border-2 border-white/50 relative z-[1]">
                  <video
                    src="/video/video-restaurant x4 ultra.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ minHeight: '100%' }}
                  />
                </div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl lg:rounded-2xl shadow-[0_0_80px_-20px_rgba(180,150,80,0.4)] pointer-events-none" />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center py-8 lg:py-0 px-4 lg:px-0 order-1 lg:order-2">
              <p
                className="font-[family-name:var(--font-raleway)] text-gray-700 text-lg leading-relaxed mb-8"
                style={{ lineHeight: '1.8' }}
              >
                Ubicado en el corazón de Viña Santa Cruz, el{' '}
                <span className="font-semibold text-black-900">Restaurante Loló</span> ofrece una
                experiencia gastronómica única que combina la cocina tradicional chilena con toques
                contemporáneos. Nuestro chef utiliza ingredientes frescos de productores locales para
                crear platos {isAdult ? 'que complementan perfectamente nuestros vinos premium' : 'llenos de sabor y tradición'}.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {features.map((feature) => (
                  <div key={feature.title} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 bg-gold-100 text-gold-600">
                      {feature.icon}
                    </div>
                    <h3 className="font-[family-name:var(--font-raleway)] text-sm font-bold text-black-900 mb-2 tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="font-[family-name:var(--font-raleway)] text-xs text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    {feature.highlight && (
                      <p className={`font-[family-name:var(--font-raleway)] text-sm mt-1 font-semibold ${feature.isHighlighted ? 'text-gold-600' : 'text-gray-700'}`}>
                        {feature.highlight}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsMenuModalOpen(true)}
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white font-[family-name:var(--font-raleway)] font-medium tracking-[0.15em] uppercase text-xs rounded-sm transition-all duration-300 hover:shadow-lg cursor-pointer"
                >
                  <span>Ver Carta</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
                <a
                  href="https://wa.me/56972188755?text=Hola,%20me%20gustaría%20hacer%20una%20reserva%20en%20el%20Restaurante%20Loló"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 hover:border-gold-500 text-gray-700 hover:text-gold-600 font-[family-name:var(--font-raleway)] font-medium tracking-[0.15em] uppercase text-xs rounded-sm transition-all duration-300"
                >
                  Reserva
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Specialties Section - Professional Design */}
        <div className="mt-20 bg-gradient-to-br from-cream-50 to-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-black-900 text-center mb-3">
              Especialidades del Chef
            </h3>
            <p className="font-[family-name:var(--font-raleway)] text-sm text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Cada plato es una expresión de nuestra pasión por la gastronomía chilena y el maridaje perfecto
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Carnes Premium */}
              <div className="group relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl group-hover:bg-gold-500/10 transition-all duration-500" />
                <div className="relative bg-white rounded-lg p-6 border border-gray-100 group-hover:border-gold-200 transition-all duration-300 group-hover:shadow-lg">
                  <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-gold-100 to-gold-50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h4 className="font-[family-name:var(--font-raleway)] text-lg font-bold text-black-900 mb-3">
                    Carnes Premium
                  </h4>
                  <p className="font-[family-name:var(--font-raleway)] text-sm text-gray-600 leading-relaxed mb-4">
                    {isAdult
                      ? 'Cortes selectos maridados con nuestros mejores Carmenere y Cabernet Sauvignon'
                      : 'Cortes selectos preparados por nuestro chef con técnicas tradicionales chilenas'}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gold-600 font-medium">
                    <span className="w-8 h-px bg-gold-300" />
                    <span>{isAdult ? 'Maridaje incluido' : 'Receta tradicional'}</span>
                  </div>
                </div>
              </div>

              {/* Pescados y Mariscos */}
              <div className="group relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl group-hover:bg-gold-500/10 transition-all duration-500" />
                <div className="relative bg-white rounded-lg p-6 border border-gray-100 group-hover:border-gold-200 transition-all duration-300 group-hover:shadow-lg">
                  <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-gold-100 to-gold-50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h4 className="font-[family-name:var(--font-raleway)] text-lg font-bold text-black-900 mb-3">
                    Pescados y Mariscos
                  </h4>
                  <p className="font-[family-name:var(--font-raleway)] text-sm text-gray-600 leading-relaxed mb-4">
                    {isAdult
                      ? 'Productos frescos del Pacífico con nuestros vinos blancos y rosados'
                      : 'Productos frescos del Pacífico preparados con ingredientes locales'}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gold-600 font-medium">
                    <span className="w-8 h-px bg-gold-300" />
                    <span>Del mar a tu mesa</span>
                  </div>
                </div>
              </div>

              {/* Postres Artesanales */}
              <div className="group relative">
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl group-hover:bg-gold-500/10 transition-all duration-500" />
                <div className="relative bg-white rounded-lg p-6 border border-gray-100 group-hover:border-gold-200 transition-all duration-300 group-hover:shadow-lg">
                  <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-gold-100 to-gold-50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h4 className="font-[family-name:var(--font-raleway)] text-lg font-bold text-black-900 mb-3">
                    Postres Artesanales
                  </h4>
                  <p className="font-[family-name:var(--font-raleway)] text-sm text-gray-600 leading-relaxed mb-4">
                    {isAdult
                      ? 'Creaciones dulces que armonizan con nuestros vinos de cosecha tardía'
                      : 'Creaciones dulces elaboradas con ingredientes naturales y recetas tradicionales'}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gold-600 font-medium">
                    <span className="w-8 h-px bg-gold-300" />
                    <span>Final perfecto</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu PDF Modal */}
      {isMounted && isMenuModalOpen && createPortal(
        <MenuPDFModal onClose={() => setIsMenuModalOpen(false)} />,
        document.body
      )}
    </section>
  )
}

// PDF Menu Modal Component
function MenuPDFModal({ onClose }: { onClose: () => void }) {
  const [scale, setScale] = useState(1)
  // Start from page 2
  const pdfUrl = '/Carta Loló/Carta-Lolo-2025-Oct-2-30x15cm-web.pdf'

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 2))
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5))

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'Carta-Lolo-2025.pdf'
    link.click()
  }

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content - Responsive */}
      <div className="relative w-full max-w-6xl h-[95vh] sm:h-[92vh] md:h-[90vh] bg-white rounded-lg sm:rounded-xl shadow-2xl overflow-hidden animate-scale-in flex flex-col">
        {/* Header - Compact on mobile */}
        <div className="flex-shrink-0 flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-white border-b border-gray-100">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="/images/Logotipos/Logo-Lolo.svg"
              alt="Loló"
              className="h-6 sm:h-8 md:h-10 w-auto"
            />
            <div className="hidden xs:block">
              <h3 className="font-[family-name:var(--font-playfair)] text-sm sm:text-lg md:text-xl font-semibold text-gray-900">
                Carta Loló
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">Temporada 2025</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Zoom Controls - Hidden on very small screens */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-white rounded transition-colors"
                title="Alejar"
              >
                <ZoomOut className="w-4 h-4 text-gray-600" />
              </button>
              <span className="px-2 text-xs text-gray-600 font-medium min-w-[3rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-white rounded transition-colors"
                title="Acercar"
              >
                <ZoomIn className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Mobile Zoom Controls */}
            <div className="flex md:hidden items-center gap-1">
              <button
                onClick={handleZoomOut}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Alejar"
              >
                <ZoomOut className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={handleZoomIn}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Acercar"
              >
                <ZoomIn className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-gold-500 hover:bg-gold-600 text-white text-xs font-medium rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Descargar</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Cerrar"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* PDF Viewer - Responsive with page=2 */}
        <div className="flex-1 overflow-auto bg-gray-100 p-2 sm:p-3 md:p-4">
          <div
            className="w-full h-full min-h-[500px] sm:min-h-[600px] flex items-start justify-center"
            style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
          >
            <iframe
              src={`${pdfUrl}#page=2&toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              className="w-full h-full bg-white rounded-lg shadow-lg"
              style={{ minHeight: 'calc(100vh - 120px)' }}
              title="Carta Loló"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
