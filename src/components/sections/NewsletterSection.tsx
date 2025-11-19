'use client'

import { useState, FormEvent } from 'react'
import Button from '../ui/Button'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter signup
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
    }, 5000)
  }

  return (
    <section className="relative bg-gradient-to-r from-burgundy-900 to-burgundy-800 section-padding overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 container-narrow text-center">
        {/* Icon */}
        <div className="text-gold-400 mb-6 flex justify-center">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        {!isSubmitted ? (
          <>
            {/* Title */}
            <h2 className="text-h2 md:text-h2 font-[family-name:var(--font-playfair)] font-bold text-white mb-4">
              Recibe Nuestras Novedades
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-white/90 mb-10">
              Ofertas exclusivas, nuevos vinos y eventos especiales directo a tu correo
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-[540px] mx-auto mb-6">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  required
                  className="flex-1 min-w-[280px] h-14 px-6 bg-white border-2 border-transparent rounded-lg md:rounded-r-none text-base text-charcoal-900 placeholder:text-charcoal-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/10 transition-all"
                />
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="md:rounded-l-none min-w-[160px]"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  }
                >
                  Suscribirse
                </Button>
              </div>
            </form>

            {/* Privacy Notice */}
            <p className="text-sm text-white/80 max-w-[480px] mx-auto leading-relaxed">
              Al suscribirte aceptas recibir comunicaciones de Viña Santa Cruz. Puedes cancelar tu
              suscripción en cualquier momento.{' '}
              <a
                href="/privacidad"
                className="text-gold-400 underline hover:text-gold-300 transition-colors"
              >
                Ver Política de Privacidad
              </a>
              .
            </p>
          </>
        ) : (
          <div className="py-8">
            {/* Success Icon */}
            <div className="text-gold-400 mb-4 flex justify-center">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-h3 font-[family-name:var(--font-playfair)] font-bold text-white mb-2">
              ¡Gracias por suscribirte!
            </h3>
            <p className="text-lg text-white/90">Revisa tu correo para confirmar tu suscripción</p>
          </div>
        )}
      </div>
    </section>
  )
}
