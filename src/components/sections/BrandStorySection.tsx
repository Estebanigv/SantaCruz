'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import SectionHeader from '../ui/SectionHeader'

export default function BrandStorySection() {
  const [buttonFillProgress, setButtonFillProgress] = useState<{[key: string]: number}>({})
  const intervalsRef = useRef<{[key: string]: NodeJS.Timeout}>({})

  const handleButtonHover = (buttonId: string, isEntering: boolean) => {
    // Clear any existing interval for this button
    if (intervalsRef.current[buttonId]) {
      clearInterval(intervalsRef.current[buttonId])
      delete intervalsRef.current[buttonId]
    }

    if (isEntering) {
      // Animate fill from 0 to 100 over time
      let progress = 0
      const interval = setInterval(() => {
        progress += 5
        setButtonFillProgress(prev => ({ ...prev, [buttonId]: progress }))
        if (progress >= 100) {
          clearInterval(interval)
          delete intervalsRef.current[buttonId]
        }
      }, 20)
      intervalsRef.current[buttonId] = interval
    } else {
      // Reset immediately
      setButtonFillProgress(prev => ({ ...prev, [buttonId]: 0 }))
    }
  }

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Decorative grape image - left side */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-[600px] opacity-12 pointer-events-none hidden lg:block z-0">
        <Image
          src="/images/Uva2.png"
          alt="Decorative grape"
          fill
          className="object-contain"
          sizes="33vw"
        />
      </div>

      {/* Split layout: Image left, Content right - Jordan style */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px] relative z-10">
        {/* Image Section */}
        <div className="relative h-96 lg:h-auto overflow-hidden bg-gradient-to-br from-gray-900 to-black-800">
          {/* Background Image - Grape Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/Uva2.png"
              alt="Viña Santa Cruz - Uvas"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Light overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-black-900/20 to-black-900/10" />

          {/* Decorative element - more subtle */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <svg viewBox="0 0 200 200" className="w-96 h-96 text-gold-500">
              <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Content Section - Generous padding like Jordan */}
        <div className="flex items-center px-8 lg:px-16 xl:px-24 py-16 lg:py-20">
          <div className="max-w-xl">
            <SectionHeader
              label="Nuestra Historia"
              title="Experiencia Única en Colchagua"
              align="left"
            />

            <div className="space-y-6 mb-12">
              <p className="font-[family-name:var(--font-raleway)] text-lg text-gray-600 leading-relaxed font-light" style={{ lineHeight: '1.8' }}>
                En el corazón de Lolol, Región de O&apos;Higgins, te espera mucho más que una viña. Somos la primera viña 100% solar de Chile, pioneros en sustentabilidad y enoturismo de clase mundial.
              </p>

              <p className="font-[family-name:var(--font-raleway)] text-lg text-gray-600 leading-relaxed font-light" style={{ lineHeight: '1.8' }}>
                Vive experiencias únicas: recorre nuestros viñedos en teleférico, explora el Museo del Automóvil y el Museo del Vino, y degusta vinos premium con la mejor vista del Valle de Colchagua.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 mb-14">
              {/* Nuestra Historia - Water fill from left to right */}
              <a
                href="/nosotros"
                className="relative inline-flex items-center justify-center px-10 py-4 bg-black text-white font-[family-name:var(--font-raleway)] font-medium tracking-[0.15em] uppercase text-xs rounded-sm overflow-hidden transition-all duration-300"
                onMouseEnter={() => handleButtonHover('historia', true)}
                onMouseLeave={() => handleButtonHover('historia', false)}
              >
                <span
                  className="relative z-10 transition-colors duration-500"
                  style={{
                    color: (buttonFillProgress['historia'] || 0) > 50 ? 'white' : 'white'
                  }}
                >
                  Nuestra Historia
                </span>
                {/* Water filling from left to right with wave motion */}
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600"
                  style={{
                    width: `${buttonFillProgress['historia'] || 0}%`,
                    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {/* Animated wave edge */}
                  <div
                    className="absolute right-0 inset-y-0 w-8"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5))',
                      transform: `translateX(${Math.sin((buttonFillProgress['historia'] || 0) / 15) * 4}px)`,
                      transition: 'transform 0.3s ease-out',
                    }}
                  />
                </div>
              </a>

              {/* Visitar la Viña - Water fill from left to right */}
              <a
                href="/tours"
                className="relative inline-flex items-center justify-center px-10 py-4 border border-black/30 text-black font-[family-name:var(--font-raleway)] font-light tracking-[0.15em] uppercase text-xs rounded-sm overflow-hidden transition-all duration-300"
                onMouseEnter={() => handleButtonHover('tours', true)}
                onMouseLeave={() => handleButtonHover('tours', false)}
              >
                <span
                  className="relative z-10 transition-colors duration-500"
                  style={{
                    color: (buttonFillProgress['tours'] || 0) > 50 ? 'white' : 'black'
                  }}
                >
                  Visitar la Viña
                </span>
                {/* Water filling from left to right with wave motion */}
                <div
                  className="absolute inset-y-0 left-0 bg-black"
                  style={{
                    width: `${buttonFillProgress['tours'] || 0}%`,
                    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {/* Animated wave edge */}
                  <div
                    className="absolute right-0 inset-y-0 w-8"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.5))',
                      transform: `translateX(${Math.sin((buttonFillProgress['tours'] || 0) / 15) * 4}px)`,
                      transition: 'transform 0.3s ease-out',
                    }}
                  />
                </div>
              </a>
            </div>

            {/* Stats - Ultra Elegant */}
            <div className="pt-10 border-t border-gray-200 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="font-[family-name:var(--font-raleway)] text-4xl md:text-5xl font-extralight text-gold-600 mb-2">100%</div>
                <div className="font-[family-name:var(--font-raleway)] text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">Solar</div>
              </div>
              <div className="text-center">
                <div className="font-[family-name:var(--font-raleway)] text-4xl md:text-5xl font-extralight text-gold-600 mb-2">2</div>
                <div className="font-[family-name:var(--font-raleway)] text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">Museos</div>
              </div>
              <div className="text-center">
                <div className="font-[family-name:var(--font-raleway)] text-4xl md:text-5xl font-extralight text-gold-600 mb-2">360°</div>
                <div className="font-[family-name:var(--font-raleway)] text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">Vista</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
