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
      return () => {
        window.removeEventListener('load', handleLoad)
      }
    }
  }, [])

  if (!isLoading) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700"
      style={{
        opacity: isLoading ? 1 : 0,
        backgroundColor: '#222222'
      }}
    >
      {/* Loader content */}
      <div className="flex flex-col items-center justify-center gap-12">
        {/* CSS-only Santa Cruz cross spinner */}
        <div className="relative w-56 h-56">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32">
              <svg viewBox="0 0 100 100" className="animate-spin-slow">
                <path
                  fill="rgba(212, 175, 55, 0.8)"
                  d="M50,5 L55,45 L50,50 L45,45 Z M95,50 L55,55 L50,50 L55,45 Z M50,95 L45,55 L50,50 L55,55 Z M5,50 L45,45 L50,50 L45,55 Z"
                />
                <circle cx="50" cy="50" r="8" fill="rgba(212, 175, 55, 0.9)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Brand text */}
        <div className="text-center space-y-4">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-light text-gold-400/90 tracking-[0.2em]">
            VIÑA SANTA CRUZ
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-gold-500/40"></div>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"></div>
          </div>
        </div>

        {/* Animated dots */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gold-500/60 animate-bounce-dot" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-gold-500/60 animate-bounce-dot" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-gold-500/60 animate-bounce-dot" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.15;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-dot {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-bounce-dot {
          animation: bounce-dot 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
