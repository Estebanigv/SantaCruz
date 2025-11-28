'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAge } from '@/contexts/AgeContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [showAgeReset, setShowAgeReset] = useState(false)
  const { resetVerification } = useAge()

  const handleResetAgeVerification = () => {
    resetVerification()
  }

  const footerLinks = {
    experiencias: [
      { label: 'Tours y Degustaciones', href: '/experiencias' },
      { label: 'Restaurante', href: '/restaurante' },
      { label: 'Hotel', href: '/hotel' },
      { label: 'Reservar', href: '/reservas' },
    ],
    vinos: [
      { label: 'Vinos Tintos', href: '/vinos?categoria=tinto' },
      { label: 'Vinos Blancos', href: '/vinos?categoria=blanco' },
      { label: 'Vinos Rosados', href: '/vinos?categoria=rosado' },
      { label: 'Espumantes', href: '/vinos?categoria=espumante' },
    ],
    nosotros: [
      { label: 'Nuestra Historia', href: '/nosotros' },
      { label: 'Viñedos', href: '/nosotros#vinedos' },
      { label: 'Sustentabilidad', href: '/nosotros#sustentabilidad' },
      { label: 'Certificaciones', href: '/nosotros#certificaciones' },
    ],
    contacto: [
      { label: 'Contacto', href: '/contacto' },
      { label: 'Cómo Llegar', href: '/contacto#ubicacion' },
      { label: 'Términos y Condiciones', href: '/terminos-condiciones' },
      { label: 'Política de Privacidad', href: '/politica-privacidad' },
    ],
  }

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/vinasantacruz/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/vinasantacruz',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@vinasantacruz',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/channel/UC5VEykUgSoNIyqeqPCHR_kA',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/vina-santa-cruz/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-gradient-to-b from-black-900 to-black-950 text-white relative overflow-hidden">
      {/* Decorative top border with gold gradient */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative container-custom py-12 sm:py-16 md:py-20 lg:py-28">
        {/* Top Section: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 mb-12 sm:mb-16 lg:mb-20 pb-8 sm:pb-12 lg:pb-16 border-b border-gray-800/50">
          {/* Brand Column - Ultra elegant */}
          <div>
            <Link href="/" className="inline-block group mb-6 sm:mb-8">
              <img
                src="/images/logo_vsc_png_byw.png"
                alt="Viña Santa Cruz"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain filter brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity duration-500"
              />
            </Link>

            <p
              className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-md"
              style={{ lineHeight: '1.8' }}
            >
              Primera viña 100% solar de Chile. Enoturismo premium en Lolol, Valle de Colchagua.
            </p>

            {/* Contact info */}
            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 md:mb-10">
              <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
                <svg
                  className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:ventas@vinasantacruz.cl"
                  className="hover:text-gold-500 transition-colors"
                >
                  ventas@vinasantacruz.cl
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <svg
                  className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div className="flex flex-col gap-1">
                  <span className="hover:text-gold-500 transition-colors">
                    Ventas: +56 9 2884 2042
                  </span>
                  <span className="hover:text-gold-500 transition-colors">
                    Tours: +56 9 7218 8755
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links - Modern & Elegant */}
            <div className="mb-6 sm:mb-8">
              <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-3 sm:mb-5 font-semibold">
                Síguenos
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-9 h-9 sm:w-11 sm:h-11 rounded-lg border border-gray-800 bg-gray-900/30 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold-500 transition-all duration-500 overflow-hidden"
                    aria-label={social.name}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">{social.icon}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter - Premium design */}
          <div className="flex flex-col justify-center">
            <div className="max-w-lg">
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                Newsletter Exclusivo
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                Suscríbete y recibe ofertas especiales, lanzamientos exclusivos y contenido premium.
              </p>

              {/* Newsletter form - Ultra modern */}
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />

                <div className="relative flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="flex-1 bg-gray-900/80 border border-gray-800 rounded-lg px-4 sm:px-5 py-3 sm:py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500 focus:bg-gray-900 transition-all duration-300 backdrop-blur-sm"
                  />
                  <button className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-black-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm transition-all duration-300 hover:shadow-gold-glow whitespace-nowrap">
                    Suscribir
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-600 mt-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>100% seguro. Sin spam.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid - Clean & organized */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-8 mb-10 sm:mb-12 lg:mb-16">
          {/* Experiencias */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-4 sm:mb-6 text-gold-500 uppercase tracking-[0.15em]">
              Experiencias
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.experiencias.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-all duration-300 inline-block relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vinos */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-4 sm:mb-6 text-gold-500 uppercase tracking-[0.15em]">
              Vinos
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.vinos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-all duration-300 inline-block relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nosotros */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-4 sm:mb-6 text-gold-500 uppercase tracking-[0.15em]">
              Nosotros
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.nosotros.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-all duration-300 inline-block relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-4 sm:mb-6 text-gold-500 uppercase tracking-[0.15em]">
              Contacto
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.contacto.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-all duration-300 inline-block relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Minimal & elegant */}
        <div className="pt-6 sm:pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4">
              <p className="text-xs sm:text-sm text-gray-600">
                © {currentYear} Viña Santa Cruz
              </p>
              {/* Subtle review links */}
              <span className="hidden sm:inline text-gray-700">·</span>
              <a
                href="https://www.tripadvisor.cl/Attraction_Review-g7300025-d1414952-Reviews-Vina_Santa_Cruz-Lolol_O_Higgins_Region.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-600 hover:text-[#00AA6C] transition-colors duration-300 flex items-center gap-1"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="11" fill="#00AA6C"/>
                  <circle cx="8" cy="12" r="4" fill="white"/>
                  <circle cx="16" cy="12" r="4" fill="white"/>
                  <circle cx="8" cy="12" r="2" fill="#00AA6C"/>
                  <circle cx="16" cy="12" r="2" fill="#00AA6C"/>
                </svg>
                TripAdvisor
              </a>
              <a
                href="https://g.page/r/vinasantacruz/review"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-600 hover:text-blue-400 transition-colors duration-300 flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              <Link
                href="/terminos-condiciones"
                className="text-sm text-gray-500 hover:text-gold-500 transition-all duration-300 relative group"
              >
                <span className="relative">
                  Términos
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
              <Link
                href="/politica-privacidad"
                className="text-sm text-gray-500 hover:text-gold-500 transition-all duration-300 relative group"
              >
                <span className="relative">
                  Privacidad
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
              <Link
                href="/politica-cookies"
                className="text-sm text-gray-500 hover:text-gold-500 transition-all duration-300 relative group"
              >
                <span className="relative">
                  Cookies
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
              <span className="text-gray-700">·</span>
              {/* Age verification reset button */}
              <div className="relative">
                <button
                  onClick={() => setShowAgeReset(!showAgeReset)}
                  className="text-sm text-gray-500 hover:text-gold-500 transition-all duration-300 relative group"
                >
                  <span className="relative">
                    Verificación de edad
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
                  </span>
                </button>
                {showAgeReset && (
                  <div className="absolute bottom-full right-0 mb-2 p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-xl min-w-[240px] z-50">
                    <p className="text-sm text-gray-300 mb-3">
                      ¿Deseas cambiar tu respuesta de verificación de edad?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleResetAgeVerification}
                        className="flex-1 px-3 py-2 bg-gold-500 text-black text-sm font-medium rounded hover:bg-gold-400 transition-colors"
                      >
                        Sí, cambiar
                      </button>
                      <button
                        onClick={() => setShowAgeReset(false)}
                        className="flex-1 px-3 py-2 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
