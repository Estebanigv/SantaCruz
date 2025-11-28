'use client'

import { useState, useEffect } from 'react'

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const [showInitialLabel, setShowInitialLabel] = useState(true)

  // TODO: Connect to real WhatsApp when ready
  // const phoneNumber = "56912345678" // Reemplazar con el número real de la viña
  // const message = encodeURIComponent("Estimados, me gustaría obtener información sobre las experiencias en Viña Santa Cruz. Gracias.")

  // Hide label permanently on first scroll or when mouse passes half of the banner
  useEffect(() => {
    let hasHidden = false

    const hideLabel = () => {
      if (!hasHidden) {
        hasHidden = true
        setShowInitialLabel(false)
        // Remove listeners after hiding
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }

    const handleScroll = () => {
      hideLabel()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const heroHeight = window.innerHeight
      // If mouse Y position is past half of the hero/banner
      if (e.clientY > heroHeight * 0.5) {
        hideLabel()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Subtle pulse animation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true)
      setTimeout(() => setIsPulsing(false), 600)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <button
      onClick={(e) => e.preventDefault()}
      className="fixed bottom-6 right-6 z-50 group cursor-pointer"
      aria-label="Contactar vía WhatsApp"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Pulse ring animation */}
        <div
          className={`absolute inset-0 rounded-full bg-[#25D366] transition-all duration-600 ${
            isPulsing ? 'scale-125 opacity-0' : 'scale-100 opacity-0'
          }`}
        />

        {/* Main button - Elegant design */}
        <div
          className={`relative w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 ${
            isPulsing ? 'scale-105' : 'scale-100'
          }`}
        >
          {/* WhatsApp Icon */}
          <svg
            className={`w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-12 ${
              isPulsing ? 'scale-110' : 'scale-100'
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.76-1.84-.2-.48-.41-.42-.56-.43-.14 0-.3-.01-.46-.01z" />
          </svg>

          {/* Elegant glow effect */}
          <div
            className={`absolute inset-0 rounded-full bg-gold-500 blur-2xl transition-opacity duration-500 -z-10 ${
              isHovered ? 'opacity-30' : 'opacity-0'
            }`}
          />
        </div>

        {/* Tooltip - Refined and formal */}
        <div
          className={`absolute right-full mr-5 top-1/2 -translate-y-1/2 transition-all duration-300 ${
            (isHovered || showInitialLabel) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
          }`}
        >
          <div className="bg-black-900 text-white px-6 py-3 rounded-xl shadow-2xl border border-gold-500/20 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gold-500" />
              <span className="font-[family-name:var(--font-raleway)] text-sm font-light tracking-wide whitespace-nowrap">
                Comunícate con nosotros
              </span>
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-black-900" />
          </div>
        </div>
      </div>
    </button>
  )
}
