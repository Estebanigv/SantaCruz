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
      // Liquid fill animation from bottom
      gsap.to(liquid, {
        scaleY: 1,
        duration: 0.8,
        ease: 'power2.out',
      })

      // Icon animation - explosive entrance with multiple effects
      gsap.fromTo(
        icon,
        {
          scale: 0.8,
          rotation: -15,
        },
        {
          opacity: 1,
          scale: 1.4,
          rotation: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        }
      )

      // Continuous floating/pulsing animation
      gsap.to(icon, {
        y: -8,
        scale: 1.45,
        duration: 0.8,
        delay: 0.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Continuous subtle rotation
      gsap.to(icon, {
        rotation: 10,
        duration: 1.2,
        delay: 0.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Animate icon color to white with strong glow
      gsap.to(icon.querySelectorAll('svg'), {
        color: '#ffffff',
        filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.8))',
        duration: 0.5,
      })

      // Text animations
      if (title) {
        gsap.to(title, {
          color: '#ffffff',
          duration: 0.5,
          delay: 0.2,
        })
      }

      if (username) {
        gsap.to(username, {
          color: 'rgba(255, 255, 255, 0.9)',
          duration: 0.5,
          delay: 0.2,
        })
      }

      // Show button
      if (button) {
        gsap.to(button, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.3,
        })
      }
    } else {
      // Drain liquid out
      gsap.to(liquid, {
        scaleY: 0,
        duration: 0.6,
        ease: 'power2.in',
      })

      // Reset icon with smooth animation - stop all continuous animations
      gsap.to(icon, {
        opacity: 0.25,
        scale: 1,
        rotation: 0,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })

      // Reset icon color and remove glow
      gsap.to(icon.querySelectorAll('svg'), {
        color: '#D1D5DB',
        filter: 'none',
        duration: 0.5,
      })

      // Reset text colors
      if (title) {
        gsap.to(title, {
          color: '#111827',
          duration: 0.4,
        })
      }

      if (username) {
        gsap.to(username, {
          color: '#6B7280',
          duration: 0.4,
        })
      }

      // Hide button
      if (button) {
        gsap.to(button, {
          opacity: 0,
          y: 10,
          duration: 0.3,
        })
      }
    }
  }

  const socialLinks = [
    {
      name: 'Instagram',
      username: '@vinasantacruz',
      href: 'https://instagram.com/vinasantacruz',
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
      href: 'https://facebook.com/vinasantacruz',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      bgColor: 'bg-blue-600',
    },
    {
      name: 'YouTube',
      username: '@vinasantacruz',
      href: 'https://youtube.com/@vinasantacruz',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      bgColor: 'bg-red-600',
    },
    {
      name: 'Twitter',
      username: '@vinasantacruz',
      href: 'https://twitter.com/vinasantacruz',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      bgColor: 'bg-sky-500',
    },
  ]

  return (
    <section className="bg-gradient-to-b from-white to-cream-50 section-padding">
      <div className="container-custom">
        <SectionHeader
          label="Síguenos"
          title="Nuestras Redes Sociales"
          subtitle="Únete a nuestra comunidad y descubre contenido exclusivo, eventos especiales y las últimas novedades"
        />

        {/* Social Networks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
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
