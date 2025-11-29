'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)
  const [isInHeroSection, setIsInHeroSection] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    const section = sectionRef.current

    if (!cursor || !section) return

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        duration: 0.4,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
      })

      const target = e.target as HTMLElement
      const isOverInteractive =
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.closest('header') !== null ||
        target.closest('nav') !== null

      setIsHoveringInteractive(isOverInteractive)
    }

    const handleMouseEnter = () => setIsInHeroSection(true)
    const handleMouseLeave = () => setIsInHeroSection(false)

    section.addEventListener('mouseenter', handleMouseEnter)
    section.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      section.removeEventListener('mouseenter', handleMouseEnter)
      section.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {/* GSAP Custom Cursor - Santa Cruz Icon (only visible in hero section) */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[100] transition-opacity duration-300"
        style={{
          width: '55px',
          height: '55px',
          left: '-27.5px',
          top: '-27.5px',
          opacity: isInHeroSection && !isHoveringInteractive ? 1 : 0,
        }}
      >
        {/* Santa Cruz Icon with subtle glow */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Glow effect layer - subtle golden illumination */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at center, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.15) 40%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />

          {/* Santa Cruz SVG Icon - Clean design with subtle shadow */}
          <svg
            viewBox="0 0 394.8 394.33"
            className="w-full h-full relative z-10"
            style={{
              filter:
                'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 4px rgba(212, 175, 55, 0.2))',
            }}
          >
            <path
              fill="rgba(255, 255, 255, 0.9)"
              d="M197.66,394.33c-51.04,0-96.31-32.26-112.66-80.3-.85-2.49-1.95-3.55-4.73-4.5C32.11,292.89-.15,247.57,0,196.74c.15-50.65,32.57-95.66,80.66-112,2.42-.82,3.39-1.72,4.13-3.85,8.28-23.75,23.07-43.87,42.76-58.17C147.23,8.44,170.93.59,196.09.03c24.14-.53,48.76,7.07,69.31,21.44,20.57,14.37,36.26,34.95,44.19,57.94,1.13,3.27,2.46,4.66,5.48,5.71,48.7,17.07,80,62.04,79.73,114.57-.24,48.65-33.39,93.87-80.62,109.96-2.41.82-3.45,1.87-4.28,4.32-16.26,48.04-61.34,80.33-112.18,80.36h-.06ZM198.49,5c-.77,0-1.52,0-2.29.03-49.52,1.11-90.41,30.81-106.69,77.52-1.26,3.61-3.36,5.62-7.24,6.94C36.2,105.13,5.15,148.24,5,196.76c-.15,48.69,30.76,92.11,76.9,108.04,4.21,1.46,6.48,3.66,7.83,7.62,15.66,46.01,59.03,76.91,107.93,76.91h.06c48.69-.03,91.87-30.96,107.44-76.96,1.32-3.91,3.54-6.14,7.4-7.45,45.24-15.42,77-58.7,77.23-105.25.25-50.37-29.73-93.48-76.39-109.83-4.46-1.56-6.93-4.11-8.55-8.8-15.3-44.37-59.78-76.03-106.37-76.03Z"
            />
            <path
              fill="rgba(255, 255, 255, 0.9)"
              d="M166.02,280.94c4.48-6.26,8.62-12.29,13.04-18.12,1.92-2.53,2.65-5.08,2.61-8.23-.14-12.07-.06-24.14-.06-36.22,0-1.24,0-2.49,0-4-1.37-.07-2.48-.18-3.59-.18-13.01-.01-26.02-.08-39.02.07-1.92.02-4.05.74-5.68,1.77-6.39,4.05-12.61,8.36-19.28,12.83v-62.82c3.37,2.37,6.79,4.27,9.6,6.83,7.24,6.6,15.47,8.8,25.22,8.11,10.31-.73,20.71-.19,31.07-.22.22,0,.43-.12,1.05-.31.05-.96.17-2.05.17-3.15.01-12.53.09-25.07-.08-37.6-.02-1.89-.81-4.03-1.9-5.61-3.93-5.67-8.14-11.14-12.23-16.69-.51-.7-.94-1.45-1.66-2.58h62.56c-4.15,6.17-7.92,12.03-11.98,17.69-1.97,2.75-2.82,5.51-2.77,8.91.17,12.19.07,24.37.07,36.56,0,1.25,0,2.5,0,3.79.68.17,1.11.38,1.54.38,13.93.02,27.86.07,41.79-.04,1.35-.01,2.83-.82,4-1.62,6.62-4.51,13.16-9.13,20.15-14.01v63.32c-3.74-2.52-7.41-4.46-10.44-7.12-7.61-6.69-16.19-9.05-26.29-8.21-8.8.73-17.72.15-26.58.15h-4.01c-.07,1.43-.16,2.54-.16,3.65-.01,12.42-.08,24.84.07,37.25.02,1.92.67,4.07,1.69,5.71,4.07,6.53,8.39,12.9,12.86,19.69h-61.77Z"
            />
          </svg>
        </div>
      </div>

      <section
        ref={sectionRef}
        className="relative overflow-hidden h-[100svh] min-h-[600px] max-h-[900px] sm:max-h-none"
      >
        {/* Background Image - Optimized with Next.js Image */}
        <div className="absolute inset-0">
          {/* Loading placeholder with corkscrew */}
          <div
            className={`absolute inset-0 z-10 flex items-center justify-center bg-[#1a1a1a] transition-opacity duration-700 ${
              imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <img
                src="/images/ICONOS/preloaderMenada.gif"
                alt="Cargando..."
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
              />
            </div>
          </div>

          <Image
            src="/images/principal-optimized.webp"
            alt="Viña Santa Cruz - Valle de Colchagua"
            fill
            priority
            quality={85}
            sizes="100vw"
            className={`object-cover object-[center_35%] sm:object-[center_30%] transition-opacity duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              filter: 'brightness(0.95) contrast(1.05) saturate(1.1)',
            }}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Minimal gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.2) 100%)',
            }}
          />
        </div>

        {/* Content - text at top, buttons at bottom, center clear */}
        <div className="relative z-30 h-full flex flex-col">
          {/* Text at top */}
          <div className="flex-none pt-28 sm:pt-32 md:pt-36 lg:pt-40 text-center px-6 sm:px-8">
            {/* Main Heading */}
            <h1
              className={`font-[family-name:var(--font-raleway)] text-white mb-4 sm:mb-5 transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: '1.2',
                letterSpacing: 'clamp(0.08em, 0.12em, 0.15em)',
                textShadow: '0 4px 20px rgba(0,0,0,0.6)',
                transitionDelay: '200ms',
                fontWeight: '300',
              }}
            >
              MÁS QUE VINO
              <br />
              <span className="text-gold-400" style={{ fontWeight: '300' }}>
                TE ESPERA
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`font-[family-name:var(--font-raleway)] text-white/95 text-base sm:text-lg md:text-xl max-w-2xl mx-auto transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                letterSpacing: 'clamp(0.02em, 0.05em, 0.05em)',
                textShadow: '0 3px 15px rgba(0,0,0,0.8)',
                transitionDelay: '400ms',
                fontWeight: '400',
                lineHeight: '1.7',
              }}
            >
              Descubre experiencias únicas en el corazón del
              <br className="hidden sm:block" />
              <span
                className="text-white font-bold bg-gradient-to-r from-gold-500 to-gold-400 bg-clip-text text-transparent inline-block mt-1 sm:mt-0 sm:inline"
                style={{
                  letterSpacing: '0.12em',
                  textShadow: 'none',
                  WebkitTextStroke: '0.5px rgba(212, 175, 55, 0.3)',
                  filter: 'drop-shadow(0 2px 8px rgba(212, 175, 55, 0.5))',
                }}
              >
                Valle de Colchagua
              </span>
            </p>
          </div>

          {/* Empty space in center - keeps vineyard visible */}
          <div className="flex-1" />

          {/* Buttons at bottom - Animated CTAs */}
          <div className="flex-none pb-20 sm:pb-24 md:pb-28 lg:pb-32 text-center px-6 sm:px-8">
            <div
              className={`flex flex-col gap-4 sm:flex-row sm:gap-5 md:gap-6 justify-center items-stretch sm:items-center transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <button
                onClick={(e) => e.preventDefault()}
                className="group relative inline-flex items-center justify-center gap-2.5 min-w-[200px] sm:min-w-[220px] px-8 sm:px-10 md:px-12 py-4 sm:py-4 md:py-4.5 min-h-[56px] bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-white font-[family-name:var(--font-raleway)] font-semibold tracking-[0.12em] sm:tracking-[0.15em] uppercase text-sm sm:text-sm md:text-base rounded-full overflow-hidden transition-all duration-500 cursor-pointer shadow-lg shadow-gold-500/30 hover:shadow-xl hover:shadow-gold-500/40 hover:scale-105 active:scale-95"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                <svg className="relative w-5 h-5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="relative">Reserva</span>
              </button>

              <button
                onClick={(e) => e.preventDefault()}
                className="group relative inline-flex items-center justify-center gap-2.5 min-w-[200px] sm:min-w-[220px] px-8 sm:px-10 md:px-12 py-4 sm:py-4 md:py-4.5 min-h-[56px] bg-white/10 backdrop-blur-sm border-2 border-white/80 text-white font-[family-name:var(--font-raleway)] font-semibold tracking-[0.12em] sm:tracking-[0.15em] uppercase text-sm sm:text-sm md:text-base rounded-full overflow-hidden transition-all duration-500 cursor-pointer hover:bg-white hover:text-gray-900 hover:scale-105 active:scale-95"
              >
                <svg className="relative w-5 h-5 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="relative">Ver Vinos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator - Minimal */}
        <button
          onClick={scrollToNextSection}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 group"
          aria-label="Scroll to next section"
        >
          <div className="flex flex-col items-center gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/80 font-light">
              Descubrir
            </span>
            <svg
              className="w-5 h-5 text-white/80 transition-transform duration-300 group-hover:translate-y-1 animate-bounce"
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
    </>
  )
}
