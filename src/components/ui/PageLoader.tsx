'use client'

import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Hide loader when page is loaded
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false)
      }, 800) // Small delay for smooth transition
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black-950 transition-opacity duration-700"
      style={{ opacity: isLoading ? 1 : 0 }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Wine Bottle SVG Animation */}
        <div className="relative w-28 h-52">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Bottle cap/cork */}
            <rect
              x="42"
              y="5"
              width="16"
              height="8"
              rx="1"
              fill="#8B4513"
              stroke="#D4AF37"
              strokeWidth="0.5"
              className="opacity-90"
            />

            {/* Bottle outline - classic Bordeaux shape */}
            <path
              d="M 45 13 L 45 20 L 42 25 L 40 35 L 38 50 L 38 145 C 38 152 40 155 50 155 C 60 155 62 152 62 145 L 62 50 L 60 35 L 58 25 L 55 20 L 55 13 Z"
              stroke="#2F4F2F"
              strokeWidth="2"
              fill="rgba(25, 50, 25, 0.3)"
              className="opacity-90"
            />

            {/* Glass reflection - left side */}
            <path
              d="M 42 30 Q 43 50 43 80 L 43 140"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1.5"
              fill="none"
              className="opacity-60"
            />

            {/* Wine fill - animated */}
            <defs>
              <clipPath id="bottle-clip">
                <path d="M 45 13 L 45 20 L 42 25 L 40 35 L 38 50 L 38 145 C 38 152 40 155 50 155 C 60 155 62 152 62 145 L 62 50 L 60 35 L 58 25 L 55 20 L 55 13 Z" />
              </clipPath>
            </defs>

            <g clipPath="url(#bottle-clip)">
              <rect
                x="35"
                y="155"
                width="30"
                height="170"
                fill="url(#wine-gradient)"
                className="wine-fill"
              />
            </g>

            {/* Wine gradient - deep red */}
            <defs>
              <linearGradient id="wine-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#3D0C02" />
                <stop offset="40%" stopColor="#6B1212" />
                <stop offset="80%" stopColor="#8B0000" />
                <stop offset="100%" stopColor="#A52A2A" />
              </linearGradient>
            </defs>

            {/* Label - elegant */}
            <g className="opacity-70">
              <rect
                x="41"
                y="75"
                width="18"
                height="30"
                rx="1"
                fill="rgba(212, 175, 55, 0.1)"
                stroke="#D4AF37"
                strokeWidth="0.8"
              />
              <line x1="44" y1="83" x2="56" y2="83" stroke="#D4AF37" strokeWidth="0.3" />
              <line x1="44" y1="88" x2="56" y2="88" stroke="#D4AF37" strokeWidth="0.3" />
              <line x1="46" y1="93" x2="54" y2="93" stroke="#D4AF37" strokeWidth="0.3" />
            </g>

            {/* Neck highlight */}
            <path
              d="M 46 15 L 46 22"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1"
              className="opacity-40"
            />
          </svg>
        </div>

        {/* Logo or Text */}
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-light text-gold-500 tracking-[0.3em] mb-2">
            VIÑA SANTA CRUZ
          </h2>
          <div className="flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" style={{ animationDelay: '200ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" style={{ animationDelay: '400ms' }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fillWine {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0%);
          }
        }

        .wine-fill {
          animation: fillWine 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
