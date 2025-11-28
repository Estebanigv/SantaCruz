'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHoveringTop, setIsHoveringTop] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lastMouseMove, setLastMouseMove] = useState(Date.now())
  const headerRef = useRef<HTMLElement>(null)
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cart context
  const { totalItems, openCart } = useCart()

  // User state - TODO: Connect to real auth state management
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
      // But always show if hovering near top or at the very top
      if (!isHoveringTop) {
        const scrollDiff = scrollY - lastScrollY
        if (scrollDiff > 5 && scrollY > 80) {
          // Scrolling down - hide navbar
          setIsVisible(false)
        } else if (scrollDiff < -5 || scrollY < 80) {
          // Scrolling up or near top - show navbar
          setIsVisible(true)
        }
      }
      setLastScrollY(scrollY)
    }

    // Detect mouse near top of screen to show header
    const handleMouseMove = (e: MouseEvent) => {
      const threshold = 80 // pixels from top
      setLastMouseMove(Date.now())

      // Clear existing inactivity timeout
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current)
      }

      if (e.clientY <= threshold) {
        setIsHoveringTop(true)
        setIsVisible(true)
      } else if (e.clientY > 150) {
        setIsHoveringTop(false)
      }

      // Set new inactivity timeout - hide navbar after 3 seconds of no mouse movement
      // Only if not at the top of the page
      if (window.scrollY > 80) {
        inactivityTimeoutRef.current = setTimeout(() => {
          if (!isHoveringTop) {
            setIsVisible(false)
          }
        }, 3000)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current)
      }
    }
  }, [lastScrollY, isHoveringTop])

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

  const leftNavigation = [
    { label: 'Vinos', href: '/vinos' },
    { label: 'Gastronomía', href: '/#gastronomia' },
  ]

  const rightNavigation = [
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Experiencias', href: '/experiencias' },
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
          WebkitBackdropFilter: isScrolled
            ? 'blur(8px) saturate(110%)'
            : 'blur(4px) saturate(105%)',
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition:
            'transform 0.3s ease-out, background 0.5s ease-out, backdrop-filter 0.5s ease-out',
        }}
      >
        {/* Scroll progress indicator - Minimal, hidden on mobile */}
        <div
          className="hidden md:block absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-300"
          style={{
            width: `${scrollProgress * 100}%`,
            opacity: scrollProgress > 0.01 ? 0.6 : 0,
          }}
        />

        <nav className="w-full px-2 sm:px-4 md:px-4 lg:px-6 xl:px-8">
          <div className="relative flex items-center justify-between md:justify-center h-16 sm:h-20 md:h-20 lg:h-24 xl:h-28">
            {/* Left Navigation - Desktop (next to logo on left) */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-6 absolute left-1/2 -translate-x-[calc(100%+85px)] lg:-translate-x-[calc(100%+100px)] xl:-translate-x-[calc(100%+130px)]">
              {leftNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative cursor-pointer whitespace-nowrap py-2"
                  onMouseEnter={() => setActiveLink(item.href)}
                  onMouseLeave={() => setActiveLink(null)}
                >
                  <span
                    className="relative z-10 font-[family-name:var(--font-raleway)] font-semibold tracking-[0.08em] lg:tracking-[0.1em] xl:tracking-[0.12em] uppercase transition-all duration-300 text-white hover:text-gold-400 text-[10px] lg:text-[11px] xl:text-[13px]"
                    style={{
                      textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                    }}
                  >
                    {item.label}
                  </span>

                  {/* Elegant underline with gold accent */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-300 ease-out rounded-full"
                    style={{
                      width: activeLink === item.href ? '100%' : '0%',
                      opacity: activeLink === item.href ? 1 : 0,
                    }}
                  />
                </Link>
              ))}
            </div>

            {/* Logo - Absolute Center */}
            <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
              <Link
                href="/"
                className="group relative z-10 flex items-center"
                onMouseEnter={() => setActiveLink('logo')}
                onMouseLeave={() => setActiveLink(null)}
              >
                <div className="relative flex items-center">
                  <img
                    src="/images/Logotipos/Logo Viña Full Blanco V Horizontal.png"
                    alt="Viña Santa Cruz"
                    className={`h-8 md:h-9 lg:h-11 xl:h-14 w-auto object-contain transition-all duration-500 ease-out ${
                      activeLink === 'logo' ? 'opacity-100 scale-105' : 'opacity-95 scale-100'
                    }`}
                    style={{
                      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))',
                    }}
                  />
                </div>
              </Link>
            </div>

            {/* Right Navigation - Desktop (next to logo on right) */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-6 absolute left-1/2 translate-x-[85px] lg:translate-x-[100px] xl:translate-x-[130px]">
              {rightNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative cursor-pointer whitespace-nowrap py-2"
                  onMouseEnter={() => setActiveLink(item.href)}
                  onMouseLeave={() => setActiveLink(null)}
                >
                  <span
                    className="relative z-10 font-[family-name:var(--font-raleway)] font-semibold tracking-[0.08em] lg:tracking-[0.1em] xl:tracking-[0.12em] uppercase transition-all duration-300 text-white hover:text-gold-400 text-[10px] lg:text-[11px] xl:text-[13px]"
                    style={{
                      textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                    }}
                  >
                    {item.label}
                  </span>

                  {/* Elegant underline with gold accent */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-300 ease-out rounded-full"
                    style={{
                      width: activeLink === item.href ? '100%' : '0%',
                      opacity: activeLink === item.href ? 1 : 0,
                    }}
                  />
                </Link>
              ))}
            </div>

            {/* Utilities - far right */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2 xl:gap-4 absolute right-1 lg:right-4 xl:right-6">
              {/* Language Selector - hidden on md, visible on lg+ */}
              <div
                className="relative hidden lg:block"
                onMouseEnter={() => setActiveLink('lang')}
                onMouseLeave={() => setActiveLink(null)}
              >
                <button
                  className="flex items-center gap-1.5 text-white/90 hover:text-white transition-all duration-300 font-[family-name:var(--font-raleway)] font-medium tracking-wider uppercase"
                  style={{
                    fontSize: '11px',
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                    />
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

                {/* Dropdown */}
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
                    {['ES', 'EN', 'PT'].map((lang, idx) => (
                      <button
                        key={lang}
                        className={`w-full px-4 py-2 font-[family-name:var(--font-raleway)] text-xs tracking-wider transition-all duration-200 text-left ${
                          idx === 0 ? 'text-white font-medium' : 'text-white/40 hover:text-white/80'
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

              {/* User Icon */}
              {!isAuthenticated ? (
                <button
                  type="button"
                  className="group relative p-1.5 lg:p-2 hover:bg-white/10 rounded-full transition-all duration-300 cursor-pointer"
                  aria-label="Iniciar sesión"
                  onClick={(e) => e.preventDefault()}
                >
                  <svg
                    className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-white/90 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  className="group relative p-1 hover:bg-white/10 rounded-full transition-all duration-300 cursor-pointer"
                  aria-label="Mi perfil"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-gold-500 flex items-center justify-center">
                    <span className="font-[family-name:var(--font-raleway)] font-semibold text-black text-[10px] lg:text-xs">
                      {userName ? userName.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                </button>
              )}

              {/* Shopping Cart Icon */}
              <button
                type="button"
                className="group relative p-1.5 lg:p-2 hover:bg-white/10 rounded-full transition-all duration-300 cursor-pointer"
                aria-label={`Carrito de compras${totalItems > 0 ? ` (${totalItems} items)` : ''}`}
                onClick={openCart}
              >
                <svg
                  className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-white/90 group-hover:text-white transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                {/* Badge showing cart item count */}
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 lg:w-4 lg:h-4 bg-gold-500 text-black text-[8px] lg:text-[9px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* CTA Button - Contacto */}
              <Link
                href="/contacto"
                className="group relative px-3 lg:px-5 py-1.5 lg:py-2 border border-white/50 rounded-full overflow-hidden hover:border-gold-400 cursor-pointer ml-0.5 lg:ml-1 transition-all duration-300"
                onMouseEnter={() => setActiveLink('cta')}
                onMouseLeave={() => setActiveLink(null)}
                style={{
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                <span
                  className={`relative z-10 font-[family-name:var(--font-raleway)] text-[9px] lg:text-[11px] font-semibold tracking-[0.08em] lg:tracking-[0.12em] uppercase transition-colors duration-300 ${
                    activeLink === 'cta' ? 'text-black' : 'text-white'
                  }`}
                  style={{
                    textShadow: activeLink === 'cta' ? 'none' : '0 1px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  Contacto
                </span>

                {/* Gold fill from left to right */}
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-300"
                  style={{
                    width: activeLink === 'cta' ? '100%' : '0%',
                  }}
                />
              </Link>
            </div>

            {/* Mobile Logo */}
            <Link href="/" className="md:hidden group relative z-10 flex items-center flex-shrink-0 ml-2">
              <div className="relative">
                <img
                  src="/images/Logotipos/Logo Viña Full Blanco V Horizontal.webp"
                  alt="Viña Santa Cruz"
                  className="h-11 sm:h-12 w-auto object-contain"
                  style={{
                    maxWidth: '200px',
                    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))'
                  }}
                />
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group flex-shrink-0"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute left-0 w-full h-[2px] bg-white rounded-full transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0 rotate-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}
                />
                <span
                  className={`absolute left-0 w-full h-[2px] bg-white rounded-full transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0 rotate-0'
                  }`}
                />
              </div>

              {/* Ripple effect on click */}
              <div
                className={`absolute inset-0 rounded-full bg-white/10 transition-all duration-300 ${
                  isMobileMenuOpen ? 'scale-150 opacity-0' : 'scale-100 opacity-0'
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Immersive fullscreen */}
      {mounted && (
        <div
          className={`fixed inset-0 z-40 md:hidden transition-all duration-700 ${
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
              background:
                'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(15,15,15,0.98) 50%, rgba(0,0,0,0.98) 100%)',
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
          <div className="relative flex flex-col items-center justify-center h-full px-4 sm:px-8">
            {/* Decorative top line */}
            <div
              className={`absolute top-24 sm:top-32 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 ${
                isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
            />

            <nav className="space-y-4 sm:space-y-6 text-center">
              {[...leftNavigation, ...rightNavigation].map((item, index) => (
                <div
                  key={item.href}
                  className={`transition-all duration-700 ${
                    isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                  }`}
                  style={{ transitionDelay: `${100 + index * 80}ms` }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group relative inline-block cursor-pointer"
                  >
                    <span className="block text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-white group-hover:text-white/80 transition-all duration-500">
                      {item.label}
                    </span>

                    {/* Animated underline */}
                    <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-gradient-to-r from-white/0 via-white to-white/0 group-hover:w-full transition-all duration-700" />
                  </Link>
                </div>
              ))}
            </nav>

            <div
              className={`mt-16 transition-all duration-700 delay-500 ${
                isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Link
                href="/contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group relative inline-flex items-center px-10 py-4 rounded-full overflow-hidden bg-transparent border-none cursor-pointer"
              >
                <div className="absolute inset-0 bg-white transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-white blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                <span className="relative z-10 text-base font-semibold text-black tracking-wide">
                  Contacto
                </span>
              </Link>
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
