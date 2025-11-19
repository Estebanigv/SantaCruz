import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    productos: [
      { label: 'Vinos Tintos', href: '/vinos?categoria=tinto' },
      { label: 'Vinos Blancos', href: '/vinos?categoria=blanco' },
      { label: 'Vinos Rosados', href: '/vinos?categoria=rosado' },
      { label: 'Espumantes', href: '/vinos?categoria=espumante' },
    ],
    experiencias: [
      { label: 'Tours Clásicos', href: '/tours#clasico' },
      { label: 'Experiencias Premium', href: '/tours#premium' },
      { label: 'Tours Privados', href: '/tours#privado' },
      { label: 'Eventos Corporativos', href: '/tours#corporativo' },
    ],
    club: [
      { label: 'Membresía Bronce', href: '/club#bronce' },
      { label: 'Membresía Plata', href: '/club#plata' },
      { label: 'Membresía Oro', href: '/club#oro' },
      { label: 'Membresía Platino', href: '/club#platino' },
    ],
    nosotros: [
      { label: 'Nuestra Historia', href: '/nosotros' },
      { label: 'Viñedos', href: '/nosotros#vinedos' },
      { label: 'Sustentabilidad', href: '/nosotros#sustentabilidad' },
      { label: 'Blog', href: '/blog' },
    ],
    ayuda: [
      { label: 'Contacto', href: '/contacto' },
      { label: 'Preguntas Frecuentes', href: '/faq' },
      { label: 'Envíos y Devoluciones', href: '/envios' },
      { label: 'Términos y Condiciones', href: '/terminos' },
      { label: 'Política de Privacidad', href: '/privacidad' },
    ],
  }

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/vinasantacruz',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/vinasantacruz',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/vinasantacruz',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/vinasantacruz',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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
      <div className="relative container-custom py-20 md:py-28">
        {/* Top Section: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20 pb-16 border-b border-gray-800/50">
          {/* Brand Column - Ultra elegant */}
          <div>
            <Link href="/" className="inline-block group mb-8">
              <img
                src="/images/logo_vsc_png_byw.png"
                alt="Viña Santa Cruz"
                className="h-16 md:h-20 w-auto object-contain filter brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity duration-500"
              />
            </Link>

            <p
              className="text-gray-400 text-base leading-relaxed mb-10 max-w-md"
              style={{ lineHeight: '1.8' }}
            >
              Primera viña 100% solar de Chile. Enoturismo premium en Lolol, Valle de Colchagua.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-10">
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
            <div className="mb-8">
              <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-5 font-semibold">
                Síguenos
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-11 h-11 rounded-lg border border-gray-800 bg-gray-900/30 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold-500 transition-all duration-500 overflow-hidden"
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
              <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-4">
                Newsletter Exclusivo
              </h3>
              <p className="text-gray-400 text-base mb-8 leading-relaxed">
                Suscríbete y recibe ofertas especiales, lanzamientos exclusivos y contenido premium.
              </p>

              {/* Newsletter form - Ultra modern */}
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />

                <div className="relative flex gap-3">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="flex-1 bg-gray-900/80 border border-gray-800 rounded-lg px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500 focus:bg-gray-900 transition-all duration-300 backdrop-blur-sm"
                  />
                  <button className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-black-900 px-8 py-4 rounded-lg font-bold text-sm transition-all duration-300 hover:shadow-gold-glow whitespace-nowrap">
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Products */}
          <div>
            <h4 className="font-semibold text-sm mb-6 text-gold-500 uppercase tracking-[0.15em]">
              Productos
            </h4>
            <ul className="space-y-3">
              {footerLinks.productos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-all duration-300 inline-block relative group"
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

          {/* Experiences */}
          <div>
            <h4 className="font-semibold text-sm mb-6 text-gold-500 uppercase tracking-[0.15em]">
              Experiencias
            </h4>
            <ul className="space-y-3">
              {footerLinks.experiencias.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-all duration-300 inline-block relative group"
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

          {/* Club */}
          <div>
            <h4 className="font-semibold text-sm mb-6 text-gold-500 uppercase tracking-[0.15em]">
              Club
            </h4>
            <ul className="space-y-3">
              {footerLinks.club.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-all duration-300 inline-block relative group"
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

          {/* About */}
          <div>
            <h4 className="font-semibold text-sm mb-6 text-gold-500 uppercase tracking-[0.15em]">
              Nosotros
            </h4>
            <ul className="space-y-3">
              {footerLinks.nosotros.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-all duration-300 inline-block relative group"
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

          {/* Help */}
          <div>
            <h4 className="font-semibold text-sm mb-6 text-gold-500 uppercase tracking-[0.15em]">
              Ayuda
            </h4>
            <ul className="space-y-3">
              {footerLinks.ayuda.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-all duration-300 inline-block relative group"
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
        <div className="pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <p className="text-sm text-gray-600">
              © {currentYear} Viña Santa Cruz. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-8">
              <Link
                href="/terminos"
                className="text-sm text-gray-500 hover:text-gold-500 transition-all duration-300 relative group"
              >
                <span className="relative">
                  Términos
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
              <Link
                href="/privacidad"
                className="text-sm text-gray-500 hover:text-gold-500 transition-all duration-300 relative group"
              >
                <span className="relative">
                  Privacidad
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-500 hover:text-gold-500 transition-all duration-300 relative group"
              >
                <span className="relative">
                  Cookies
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
