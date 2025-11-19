'use client'

import { useEffect, useRef, useState } from 'react'

export default function USPsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const usps = [
    {
      number: '01',
      title: '100% Solar',
      description: 'Primera viña de Chile con energía 100% renovable. Pioneros en sustentabilidad y compromiso ambiental con el medio ambiente.'
    },
    {
      number: '02',
      title: 'Experiencia Única',
      description: 'Teleférico panorámico con vista 360°, Museo del Automóvil y Museo del Vino en un solo lugar.'
    },
    {
      number: '03',
      title: 'Valle de Colchagua',
      description: 'En el corazón de Lolol, una de las regiones vitivinícolas más prestigiosas de Chile.'
    }
  ]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-white to-cream-50 py-32 md:py-40"
    >
      <div className="container-custom relative">
        {/* Modern minimalist grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 lg:gap-28">
          {usps.map((usp, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Clean, minimal design */}
              <div className="relative text-center flex flex-col items-center">
                {/* Number - Thin and elegant with fixed height */}
                <div className="mb-8 flex items-center justify-center" style={{ height: '7rem' }}>
                  <div
                    className="font-[family-name:var(--font-raleway)] text-gold-500/40 group-hover:text-gold-500/60 transition-colors duration-500"
                    style={{
                      fontSize: '7rem',
                      fontWeight: '200',
                      lineHeight: '1',
                    }}
                  >
                    {usp.number}
                  </div>
                </div>

                {/* Title - Clean and modern with fixed height */}
                <div className="mb-6" style={{ minHeight: '4rem' }}>
                  <h3 className="font-[family-name:var(--font-raleway)] text-2xl md:text-3xl font-light text-black-900 leading-tight tracking-wider uppercase">
                    {usp.title}
                  </h3>
                </div>

                {/* Subtle accent line */}
                <div className="w-16 h-px bg-gold-500/30 mb-6 mx-auto" />

                {/* Description */}
                <p className="text-base text-gray-600 leading-relaxed font-light" style={{ lineHeight: '1.8' }}>
                  {usp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
