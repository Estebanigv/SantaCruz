'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Header() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const headerRef = useRef<HTMLElement>(null)

  // Cart and user state - TODO: Connect to real state management
  const [cartItemCount] = useState(0)
  const [isAuthenticated] = useState(false)
  const [userName] = useState('')

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      // Scroll progress for dynamic effects
      const maxScroll = docHeight - windowHeight
      const progress = Math.min(scrollY / maxScroll, 1)
      setScrollProgress(progress)

      // Header state with smooth threshold
      setIsScrolled(scrollY > 20)

      // Hide navbar when scrolling down, show when scrolling up
      if (scrollY > lastScrollY && scrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(scrollY)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const navigation = [
    { label: 'Vinos', href: '/vinos' },
    { label: 'Tours', href: '/tours' },
    { label: 'Club', href: '/club' },
    { label: 'Nosotros', href: '/nosotros' },
  ]

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out`}
        style={{
          background: isScrolled
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 70%, transparent 100%)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 70%, transparent 100%)',
          backdropFilter: isScrolled ? 'blur(8px) saturate(110%)' : 'blur(4px) saturate(105%)',
          WebkitBackdropFilter: isScrolled ? 'blur(8px) saturate(110%)' : 'blur(4px) saturate(105%)',
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease-out, background 0.5s ease-out, backdrop-filter 0.5s ease-out',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        }}
      >
        {/* Scroll progress indicator - Minimal */}
        <div
          className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-300"
          style={{
            width: `${scrollProgress * 100}%`,
            opacity: scrollProgress > 0.01 ? 0.6 : 0,
          }}
        />

        <nav className="container-custom">
          <div className="flex items-center justify-between h-20 md:h-24 relative">
            {/* Logo with magnetic hover effect */}
            <Link
              href="/"
              className="group relative z-10 flex items-center"
              onMouseEnter={() => setActiveLink('logo')}
              onMouseLeave={() => setActiveLink(null)}
            >
              <div className="relative">
                <img
                  src="/images/logo_vsc_png_byw.png"
                  alt="Viña Santa Cruz"
                  className={`h-12 md:h-14 w-auto object-contain filter brightness-0 invert transition-all duration-500 ease-out ${
                    activeLink === 'logo'
                      ? 'opacity-100 scale-105'
                      : 'opacity-95 scale-100'
                  }`}
                />
                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 blur-xl bg-white/30 rounded-full transition-all duration-500 ${
                    activeLink === 'logo' ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                  }`}
                />
              </div>
            </Link>

            {/* Desktop Navigation - Elegant & Refined */}
            <div className="hidden lg:flex items-center gap-12">
              {navigation.map((item) => (
                <button
                  key={item.href}
                  onClick={(e) => e.preventDefault()}
                  className="group relative cursor-pointer bg-transparent border-none"
                  onMouseEnter={() => setActiveLink(item.href)}
                  onMouseLeave={() => setActiveLink(null)}
                >
                  <span
                    className={`relative z-10 font-[family-name:var(--font-raleway)] font-medium tracking-[0.15em] uppercase transition-all duration-500 ${
                      activeLink === item.href
                        ? 'text-white'
                        : 'text-white'
                    }`}
                    style={{
                      fontSize: '13px',
                      textShadow: '0 1px 4px rgba(0,0,0,0.5)'
                    }}
                  >
                    {item.label}
                  </span>

                  {/* Minimal underline */}
                  <span
                    className="absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-400 ease-out"
                    style={{
                      width: activeLink === item.href ? '100%' : '0%',
                      opacity: activeLink === item.href ? 0.8 : 0,
                    }}
                  />
                </button>
              ))}

              {/* Language Selector - Minimal & Elegant */}
              <div
                className="relative"
                onMouseEnter={() => setActiveLink('lang')}
                onMouseLeave={() => setActiveLink(null)}
              >
                <button
                  className="flex items-center gap-2 text-white hover:text-white transition-all duration-300 font-[family-name:var(--font-raleway)] font-medium tracking-widest uppercase"
                  style={{
                    fontSize: '12px',
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  <span>ES</span>
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 ${
                      activeLink === 'lang' ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown - Minimal */}
                <div
                  className={`absolute top-full right-0 mt-3 w-24 rounded-lg overflow-hidden transition-all duration-300 ${
                    activeLink === 'lang'
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2'
                  }`}
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <div className="py-1">
                    {['ES', 'EN', 'FR', 'PT'].map((lang, idx) => (
                      <button
                        key={lang}
                        className={`w-full px-4 py-2 font-[family-name:var(--font-raleway)] text-xs tracking-wider transition-all duration-200 text-left ${
                          idx === 0
                            ? 'text-white font-medium'
                            : 'text-white/40 hover:text-white/80'
                        }`}
                        onClick={() => setActiveLink(null)}
                        disabled={idx !== 0}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Button - Fluid water fill animation */}
              <button
                onClick={(e) => e.preventDefault()}
                className="group relative px-8 py-2.5 border border-white/40 rounded-full overflow-hidden transition-all duration-0 hover:border-white cursor-pointer"
                onMouseEnter={() => setActiveLink('cta')}
                onMouseLeave={() => setActiveLink(null)}
                style={{
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                }}
              >
                <span className={`relative z-10 font-[family-name:var(--font-raleway)] text-xs font-medium tracking-[0.2em] uppercase transition-none ${
                  activeLink === 'cta' ? 'text-black' : 'text-white'
                }`}
                style={{
                  textShadow: activeLink === 'cta' ? 'none' : '0 1px 4px rgba(0,0,0,0.5)'
                }}
                >
                  Contacto
                </span>

                {/* Water fill from left to right */}
                <div
                  className="absolute inset-y-0 left-0 bg-white transition-none"
                  style={{
                    width: activeLink === 'cta' ? '100%' : '0%',
                  }}
                />
              </button>

              {/* User & Cart Icons - Conditional rendering based on state */}
              <div className="flex items-center gap-4 ml-2">
                {/* User Icon or Profile - Shows login when not authenticated, user name when authenticated */}
                {!isAuthenticated ? (
                  <button
                    type="button"
                    className="group relative flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-full transition-all duration-300 cursor-pointer"
                    aria-label="Iniciar sesión"
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg
                      className="w-4 h-4 text-white/90 group-hover:text-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span className="font-[family-name:var(--font-raleway)] font-normal text-white/90 group-hover:text-white text-xs tracking-wider uppercase transition-colors duration-300">
                      Ingresar
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="group relative flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-full transition-all duration-300 cursor-pointer"
                    aria-label="Mi perfil"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className="w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center">
                      <span className="font-[family-name:var(--font-raleway)] font-semibold text-black text-xs">
                        {userName ? userName.charAt(0).toUpperCase() : 'U'}
                      </span>
                    </div>
                    <span className="font-[family-name:var(--font-raleway)] font-normal text-white/90 group-hover:text-white text-xs tracking-wider transition-colors duration-300">
                      {userName || 'Usuario'}
                    </span>
                  </button>
                )}

                {/* Shopping Cart Icon - Only shows when cart has items */}
                {cartItemCount > 0 && (
                  <button
                    type="button"
                    className="group relative p-2 hover:bg-white/10 rounded-full transition-all duration-300 cursor-pointer"
                    aria-label={`Carrito de compras (${cartItemCount} items)`}
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg
                      className="w-5 h-5 text-white/90 group-hover:text-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    {/* Badge showing cart item count */}
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Menu Button - Morphing animation */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-12 h-12 flex items-center justify-center group"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute left-0 w-full h-[2px] bg-white rounded-full transition-all duration-300 ease-out ${
                    isMobileMenuOpen
                      ? 'top-1/2 -translate-y-1/2 rotate-45'
                      : 'top-0 rotate-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}
                />
                <span
                  className={`absolute left-0 w-full h-[2px] bg-white rounded-full transition-all duration-300 ease-out ${
                    isMobileMenuOpen
                      ? 'top-1/2 -translate-y-1/2 -rotate-45'
                      : 'bottom-0 rotate-0'
                  }`}
                />
              </div>

              {/* Ripple effect on click */}
              <div className={`absolute inset-0 rounded-full bg-white/10 transition-all duration-300 ${
                isMobileMenuOpen ? 'scale-150 opacity-0' : 'scale-100 opacity-0'
              }`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Immersive fullscreen */}
      {mounted && (
        <div
          className={`fixed inset-0 z-40 lg:hidden transition-all duration-700 ${
            isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          {/* Backdrop with animated gradient */}
          <div
            className={`absolute inset-0 transition-all duration-700 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(15,15,15,0.98) 50%, rgba(0,0,0,0.98) 100%)',
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {/* Animated orbs */}
            <div
              className={`absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl transition-all duration-1000 ${
                isMobileMenuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            />
            <div
              className={`absolute bottom-1/4 left-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl transition-all duration-1000 delay-200 ${
                isMobileMenuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            />
          </div>

          {/* Menu content */}
          <div className="relative flex flex-col items-center justify-center h-full px-8">
            {/* Decorative top line */}
            <div
              className={`absolute top-32 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 ${
                isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
            />

            <nav className="space-y-6 text-center">
              {navigation.map((item, index) => (
                <div
                  key={item.href}
                  className={`transition-all duration-700 ${
                    isMobileMenuOpen
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-8'
                  }`}
                  style={{ transitionDelay: `${100 + index * 80}ms` }}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setIsMobileMenuOpen(false)
                    }}
                    className="group relative inline-block bg-transparent border-none cursor-pointer"
                  >
                    <span className="block text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-white group-hover:text-white/80 transition-all duration-500">
                      {item.label}
                    </span>

                    {/* Animated underline */}
                    <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-gradient-to-r from-white/0 via-white to-white/0 group-hover:w-full transition-all duration-700" />
                  </button>
                </div>
              ))}
            </nav>

            <div
              className={`mt-16 transition-all duration-700 delay-500 ${
                isMobileMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsMobileMenuOpen(false)
                }}
                className="group relative inline-flex items-center px-10 py-4 rounded-full overflow-hidden bg-transparent border-none cursor-pointer"
              >
                <div className="absolute inset-0 bg-white transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-white blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                <span className="relative z-10 text-base font-semibold text-black tracking-wide">
                  Contacto
                </span>
              </button>
            </div>

            {/* Decorative bottom line */}
            <div
              className={`absolute bottom-32 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 delay-300 ${
                isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
            />
          </div>
        </div>
      )}
    </>
  )
}
