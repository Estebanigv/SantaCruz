'use client'

import { useRef } from 'react'
import SectionHeader from '../ui/SectionHeader'
import gsap from 'gsap'

export default function InstagramSection() {
  const cardsRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({})
  const liquidsRef = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const iconsRef = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const textsRef = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const handleCardHover = (cardId: string, isEntering: boolean) => {
    const liquid = liquidsRef.current[cardId]
    const icon = iconsRef.current[cardId]
    const title = textsRef.current[`${cardId}-title`]
    const username = textsRef.current[`${cardId}-username`]
    const button = textsRef.current[`${cardId}-button`]

    if (!liquid || !icon) return

    // Kill all running animations on these elements to prevent sticking
    gsap.killTweensOf([liquid, icon, title, username, button])
    if (icon) gsap.killTweensOf(icon.querySelectorAll('svg'))

    if (isEntering) {
      // Elegant liquid fill - smooth and refined
      gsap.to(liquid, {
        scaleY: 1,
        duration: 0.4,
        ease: 'power2.inOut',
      })

      // Icon animation - elegant fade and scale
      gsap.to(icon, {
        opacity: 1,
        scale: 1.2,
        duration: 0.35,
        ease: 'power2.out',
      })

      // Subtle floating animation - gentle and sophisticated
      gsap.to(icon, {
        y: -5,
        duration: 1.2,
        delay: 0.35,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Icon color to white with subtle glow
      gsap.to(icon.querySelectorAll('svg'), {
        color: '#ffffff',
        filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))',
        duration: 0.3,
      })

      // Text animations - elegant fade
      if (title) {
        gsap.to(title, {
          color: '#ffffff',
          duration: 0.3,
        })
      }

      if (username) {
        gsap.to(username, {
          color: 'rgba(255, 255, 255, 0.85)',
          duration: 0.3,
        })
      }

      // Show button - smooth appearance
      if (button) {
        gsap.to(button, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.15,
          ease: 'power2.out',
        })
      }
    } else {
      // Elegant fade out
      gsap.to(liquid, {
        scaleY: 0,
        duration: 0.35,
        ease: 'power2.inOut',
      })

      // Reset icon smoothly
      gsap.to(icon, {
        opacity: 0.25,
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      })

      // Reset icon color
      gsap.to(icon.querySelectorAll('svg'), {
        color: '#D1D5DB',
        filter: 'none',
        duration: 0.25,
      })

      // Reset text colors
      if (title) {
        gsap.to(title, {
          color: '#111827',
          duration: 0.25,
        })
      }

      if (username) {
        gsap.to(username, {
          color: '#6B7280',
          duration: 0.25,
        })
      }

      // Hide button elegantly
      if (button) {
        gsap.to(button, {
          opacity: 0,
          y: 8,
          duration: 0.2,
        })
      }
    }
  }

  const socialLinks = [
    {
      name: 'Instagram',
      username: '@vinasantacruz',
      href: 'https://www.instagram.com/vinasantacruz/',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500',
    },
    {
      name: 'Facebook',
      username: '/vinasantacruz',
      href: 'https://www.facebook.com/vinasantacruz',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      bgColor: 'bg-blue-600',
    },
    {
      name: 'LinkedIn',
      username: 'Viña Santa Cruz',
      href: 'https://www.linkedin.com/company/vina-santa-cruz/',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      bgColor: 'bg-[#0A66C2]',
    },
    {
      name: 'TikTok',
      username: '@vinasantacruz',
      href: 'https://www.tiktok.com/@vinasantacruz',
      icon: (
        <svg className="w-8 h-8 tiktok-icon" viewBox="0 0 24 24">
          <path className="tiktok-cyan" fill="currentColor" d="M9.37 23.5a7.14 7.14 0 0 1-7.14-7.14v-.07a7.14 7.14 0 0 1 7.14-7.14c.39 0 .77.03 1.14.09v3.63a3.6 3.6 0 0 0-1.14-.19 3.6 3.6 0 0 0 0 7.2 3.6 3.6 0 0 0 3.6-3.6V.5h3.47a6.2 6.2 0 0 0 3.71 5.57v3.53a9.63 9.63 0 0 1-3.71-.75v7.51a7.14 7.14 0 0 1-7.07 7.14z"/>
          <path className="tiktok-red" fill="currentColor" d="M10.87 22a5.64 5.64 0 0 0 5.64-5.64v-14.86h2.72a4.7 4.7 0 0 0 4.27 4.27v2.78a8.13 8.13 0 0 1-4.27-1.22v8.03a7.14 7.14 0 0 1-7.14 7.14 7.07 7.07 0 0 1-3.72-1.05A5.64 5.64 0 0 0 10.87 22z"/>
          <path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      ),
      bgColor: 'bg-black',
      isTikTok: true,
    },
    {
      name: 'YouTube',
      username: '@vinasantacruz',
      href: 'https://www.youtube.com/channel/UC5VEykUgSoNIyqeqPCHR_kA',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      bgColor: 'bg-red-600',
    },
  ]

  return (
    <section className="bg-gradient-to-b from-gray-100 to-gray-50 section-padding relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.5) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>
      <div className="container-custom relative">
        <SectionHeader
          label="Síguenos"
          title="Nuestras Redes Sociales"
          subtitle="Únete a nuestra comunidad y descubre contenido exclusivo, eventos especiales y las últimas novedades"
        />

        {/* Social Networks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => {
                cardsRef.current[social.name] = el
              }}
              className="group relative bg-white border border-gray-200 rounded-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-transparent overflow-hidden cursor-pointer w-full block h-56"
              onMouseEnter={() => handleCardHover(social.name, true)}
              onMouseLeave={() => handleCardHover(social.name, false)}
            >
              {/* Liquid fill background - animates from bottom */}
              <div
                ref={(el) => {
                  liquidsRef.current[social.name] = el
                }}
                className={`absolute inset-0 ${social.bgColor} origin-bottom`}
                style={{ transform: 'scaleY(0)' }}
              >
                {/* Wave effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
              </div>

              {/* Social Media Icon - positioned higher to avoid text overlap */}
              <div
                ref={(el) => {
                  iconsRef.current[social.name] = el
                }}
                className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300 opacity-25 pointer-events-none"
              >
                <div className="flex items-center justify-center scale-[1.4]">
                  {social.icon}
                </div>
              </div>

              {/* Content Container */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 pb-8">
                {/* Network Name */}
                <h3
                  ref={(el) => {
                    textsRef.current[`${social.name}-title`] = el
                  }}
                  className="font-[family-name:var(--font-raleway)] text-xl font-light text-center mb-1.5 text-black-900 tracking-wide"
                >
                  {social.name}
                </h3>

                {/* Username */}
                <p
                  ref={(el) => {
                    textsRef.current[`${social.name}-username`] = el
                  }}
                  className="font-[family-name:var(--font-raleway)] text-xs text-center text-gray-500 font-light mb-3"
                >
                  {social.username}
                </p>

                {/* Follow Button */}
                <div
                  ref={(el) => {
                    textsRef.current[`${social.name}-button`] = el
                  }}
                  className="flex items-center justify-center gap-2"
                  style={{ opacity: 0, transform: 'translateY(10px)' }}
                >
                  <span className="font-[family-name:var(--font-raleway)] text-xs uppercase tracking-[0.15em] text-white font-medium">
                    Seguir
                  </span>
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
