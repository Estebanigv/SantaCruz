'use client'

import { useState, useEffect } from 'react'
import { useAge } from '@/contexts/AgeContext'

export default function AgeVerificationModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { isVerified, setAge } = useAge()

  useEffect(() => {
    if (!isVerified) {
      setIsVisible(true)
    }
  }, [isVerified])

  const handleVerify = (isOfAge: boolean) => {
    setIsTransitioning(true)
    setAge(isOfAge)

    // Smooth transition out
    setTimeout(() => {
      setIsVisible(false)
    }, 800)
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[999] transition-all duration-800 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/images/principal.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <div className={`mb-12 transition-all duration-700 delay-200 ${isTransitioning ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <img
            src="/images/logo_vsc_png_byw.png"
            alt="Viña Santa Cruz"
            className="h-20 md:h-24 w-auto object-contain filter brightness-0 invert"
          />
        </div>

        {/* Main Card */}
        <div className={`max-w-2xl w-full transition-all duration-700 delay-300 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          {/* Welcome Message */}
          <div className="text-center mb-12">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-bold text-white mb-4">
              Bienvenido a Viña Santa Cruz
            </h1>
            <p className="font-[family-name:var(--font-raleway)] text-base md:text-lg text-white/90 leading-relaxed max-w-xl mx-auto">
              Para ofrecerte la mejor experiencia, necesitamos confirmar tu edad
            </p>
          </div>

          {/* Age Verification Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Adult Option */}
            <button
              onClick={() => handleVerify(true)}
              className="group relative bg-white/95 hover:bg-white backdrop-blur-sm rounded-xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-600 to-gold-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                {/* Text */}
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-black-900 mb-2">
                  Soy Mayor de Edad
                </h3>
                <p className="font-[family-name:var(--font-raleway)] text-sm text-gray-600">
                  Tengo la edad legal para consumir bebidas alcohólicas
                </p>
              </div>
            </button>

            {/* Minor Option */}
            <button
              onClick={() => handleVerify(false)}
              className="group relative bg-white/95 hover:bg-white backdrop-blur-sm rounded-xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-600 to-gray-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                {/* Text */}
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-black-900 mb-2">
                  Soy Menor de Edad
                </h3>
                <p className="font-[family-name:var(--font-raleway)] text-sm text-gray-600">
                  Ver contenido apropiado sin bebidas alcohólicas
                </p>
              </div>
            </button>
          </div>

          {/* Legal Notice */}
          <div className="text-center">
            <p className="font-[family-name:var(--font-raleway)] text-xs text-white/70 leading-relaxed max-w-lg mx-auto">
              <svg className="w-4 h-4 inline-block mr-1 mb-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Al continuar, confirmas que la información proporcionada es verídica. El consumo responsable de alcohol está dirigido exclusivamente a mayores de edad según las leyes de tu país.
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className={`mt-16 text-center transition-all duration-700 delay-400 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <p className="font-[family-name:var(--font-raleway)] text-xs text-white/50">
            Primera viña 100% solar de Chile • Valle de Colchagua • Lolol
          </p>
        </div>
      </div>
    </div>
  )
}
