'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function USPsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const linesRef = useRef<(HTMLDivElement | null)[]>([])
  const iconsRef = useRef<(SVGSVGElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate decorative lines
      linesRef.current.forEach((line, index) => {
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.inOut',
              delay: index * 0.1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
              },
            }
          )
        }
      })

      // Animate items with sophisticated stagger
      itemsRef.current.forEach((item, index) => {
        if (item) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          })

          tl.fromTo(
            item,
            {
              opacity: 0,
              y: 60,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              delay: index * 0.15,
            }
          )
        }
      })

      // Animate icons with rotation and scale
      iconsRef.current.forEach((icon, index) => {
        if (icon) {
          gsap.fromTo(
            icon,
            {
              opacity: 0,
              scale: 0.5,
              rotate: -15,
            },
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.8,
              ease: 'back.out(1.7)',
              delay: index * 0.15 + 0.3,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const usps = [
    {
      id: 'solar',
      title: '100% Solar',
      subtitle: 'Energía Limpia',
      description: 'Primera viña 100% solar de Chile',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          {/* Sun icon - elegant and minimal */}
          <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="32" cy="32" r="7" fill="currentColor" opacity="0.2" />
          {/* Sun rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            const x1 = 32 + Math.cos(rad) * 18
            const y1 = 32 + Math.sin(rad) * 18
            const x2 = 32 + Math.cos(rad) * 24
            const y2 = 32 + Math.sin(rad) * 24
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )
          })}
        </svg>
      ),
    },
    {
      id: 'sustainability',
      title: 'Sustentabilidad',
      subtitle: 'Compromiso Verde',
      description: 'Comprometidos con el medio ambiente',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          {/* Leaf icon - organic and elegant */}
          <path
            d="M32 10C32 10 20 16 20 32C20 40 24 48 32 54C40 48 44 40 44 32C44 16 32 10 32 10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinejoin="round"
          />
          <path
            d="M32 10C32 10 44 16 44 32"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M32 54Q26 40 32 26"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.3"
          />
          <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.5" />
        </svg>
      ),
    },
    {
      id: 'accessibility',
      title: 'Neuroaccesibilidad',
      subtitle: 'Inclusión Total',
      description: 'Experiencias inclusivas para todos',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          {/* Heart with people icon - inclusive and warm */}
          <path
            d="M32 50C32 50 14 38 14 26C14 20 18 16 22 16C26 16 30 20 32 24C34 20 38 16 42 16C46 16 50 20 50 26C50 38 32 50 32 50Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinejoin="round"
          />
          {/* Three people silhouettes inside */}
          <circle cx="32" cy="28" r="3" fill="currentColor" opacity="0.4" />
          <circle cx="24" cy="30" r="2.5" fill="currentColor" opacity="0.3" />
          <circle cx="40" cy="30" r="2.5" fill="currentColor" opacity="0.3" />
          <path
            d="M28 36C28 34 30 32 32 32C34 32 36 34 36 36"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      ),
    },
    {
      id: 'responsible',
      title: 'Turismo Responsable',
      subtitle: 'Certificación',
      description: 'Certificación de turismo sostenible',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          {/* Shield with checkmark - trust and certification */}
          <path
            d="M32 10L46 16C46 16 48 26 46 36C44 46 32 54 32 54C32 54 20 46 18 36C16 26 18 16 18 16L32 10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinejoin="round"
          />
          <path
            d="M32 10L42 14.5C42 14.5 43.5 23 42 31.5C40.5 40 32 47 32 47"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinejoin="round"
            opacity="0.3"
          />
          {/* Checkmark */}
          <path
            d="M25 32L30 37L40 26"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        </svg>
      ),
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-10 md:py-12"
    >
      {/* Ambient gradient overlays - very subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C4A052]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5A7D3A]/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Grid with decorative lines */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {/* Vertical decorative lines between columns - desktop only */}
          {[1, 2, 3].map((i) => (
            <div
              key={`line-${i}`}
              ref={(el) => { linesRef.current[i - 1] = el }}
              className="hidden lg:block absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C4A052]/20 to-transparent origin-top"
              style={{ left: `${i * 25}%` }}
            />
          ))}

          {usps.map((usp, index) => (
            <div
              key={usp.id}
              ref={(el) => { itemsRef.current[index] = el }}
              className="group relative"
            >
              {/* Card container with glassmorphism hover effect */}
              <div className="relative h-full flex flex-col items-center text-center px-3 py-6 rounded-2xl transition-all duration-700 hover:bg-white/40 hover:backdrop-blur-sm hover:shadow-[0_8px_30px_rgba(196,160,82,0.12)]">
                {/* Icon container */}
                <div className="relative mb-5">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C4A052]/20 to-[#5A7D3A]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Main icon circle */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-white to-gray-50 border border-[#C4A052]/30 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] group-hover:border-[#C4A052]/60 group-hover:shadow-[0_8px_30px_rgba(196,160,82,0.2)] transition-all duration-700 group-hover:scale-110">
                    {/* Inner decorative ring */}
                    <div className="absolute inset-2 rounded-full border border-[#5A7D3A]/10 group-hover:border-[#5A7D3A]/20 transition-colors duration-700" />

                    {/* SVG icon */}
                    <div
                      ref={(el) => { iconsRef.current[index] = el }}
                      className="w-10 h-10 md:w-12 md:h-12 text-[#C4A052] group-hover:text-[#D4AF37] transition-colors duration-500"
                    >
                      {usp.icon}
                    </div>
                  </div>

                  {/* Bottom accent dot */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C4A052] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1">
                  {/* Subtitle */}
                  <div className="relative inline-block">
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#5A7D3A] font-semibold group-hover:text-[#2D5016] transition-colors duration-500">
                      {usp.subtitle}
                    </p>
                    <div className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5A7D3A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Title */}
                  <h3 className="font-[family-name:var(--font-raleway)] text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#2D5016] transition-colors duration-500 leading-tight tracking-wide">
                    {usp.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-[13px] text-gray-600 group-hover:text-gray-700 leading-relaxed max-w-[200px] mx-auto transition-colors duration-500">
                    {usp.description}
                  </p>
                </div>

                {/* Decorative corner accents - only visible on hover */}
                <div className="absolute top-3 left-3 w-6 h-6 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#C4A052] to-transparent" />
                  <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-[#C4A052] to-transparent" />
                </div>
                <div className="absolute bottom-3 right-3 w-6 h-6 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                  <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[#C4A052] to-transparent" />
                  <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-[#C4A052] to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-8 md:mt-10 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-[#C4A052]/30 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C4A052] shadow-[0_0_12px_rgba(196,160,82,0.5)]" />
        </div>
      </div>
    </section>
  )
}
