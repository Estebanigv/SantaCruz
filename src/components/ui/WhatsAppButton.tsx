'use client'

import { useState, useEffect, useRef } from 'react'

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  // TODO: Connect to real WhatsApp when ready
  // const phoneNumber = "56912345678"
  // const message = encodeURIComponent("Hola, me gustaría obtener información sobre las experiencias en Viña Santa Cruz.")

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Hide on scroll down, show on scroll up or when stopped
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Scrolling down - hide
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false)
      }
      // Scrolling up - show
      else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      // Show after scroll stops (800ms delay)
      scrollTimeout.current = setTimeout(() => {
        setIsVisible(true)
      }, 800)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  // Subtle pulse every 8 seconds (only when visible)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isVisible) {
        setIsPulsing(true)
        setTimeout(() => setIsPulsing(false), 1000)
      }
    }, 8000)
    return () => clearInterval(interval)
  }, [isVisible])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
    console.log('Opening WhatsApp...')
  }

  return (
    <button
      onClick={handleClick}
      className={`
        fixed z-50 cursor-pointer transition-all duration-500 ease-out
        ${isMobile ? 'bottom-4 right-3' : 'bottom-6 right-6'}
        ${isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }
      `}
      aria-label="Contactar vía WhatsApp"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Pulse ring */}
        <div
          className={`
            absolute inset-0 rounded-full bg-[#25D366]
            transition-all duration-1000
            ${isPulsing ? 'scale-150 opacity-0' : 'scale-100 opacity-0'}
          `}
        />

        {/* Main button - pequeño en móvil */}
        <div
          className={`
            relative rounded-full bg-[#25D366]
            flex items-center justify-center
            shadow-lg hover:shadow-xl
            transition-all duration-300
            ${isMobile ? 'w-11 h-11' : 'w-14 h-14 hover:scale-110'}
            ${isPulsing ? 'scale-105' : 'scale-100'}
          `}
        >
          <svg
            className={`
              text-white transition-transform duration-300
              ${isMobile ? 'w-5 h-5' : 'w-7 h-7'}
              ${isHovered && !isMobile ? 'rotate-12' : ''}
            `}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.76-1.84-.2-.48-.41-.42-.56-.43-.14 0-.3-.01-.46-.01z" />
          </svg>

          {/* Glow effect on hover (desktop only) */}
          {!isMobile && (
            <div
              className={`
                absolute inset-0 rounded-full bg-[#25D366] blur-xl -z-10
                transition-opacity duration-300
                ${isHovered ? 'opacity-30' : 'opacity-0'}
              `}
            />
          )}
        </div>

        {/* Tooltip - solo desktop */}
        {!isMobile && (
          <div
            className={`
              absolute right-full mr-4 top-1/2 -translate-y-1/2
              transition-all duration-300
              ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
            `}
          >
            <div className="bg-gray-900/95 backdrop-blur-sm text-white px-5 py-2.5 rounded-lg shadow-xl">
              <span className="text-sm font-light tracking-wide whitespace-nowrap">
                Comunícate con nosotros
              </span>
            </div>
            {/* Arrow */}
            <div className="absolute left-full top-1/2 -translate-y-1/2">
              <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[6px] border-l-gray-900/95" />
            </div>
          </div>
        )}
      </div>
    </button>
  )
}
