'use client'

import { useState } from 'react'

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-28 right-6 z-40">
      {/* Menu Items - minimal and elegant */}
      <div
        className={`flex flex-col gap-2 mb-3 transition-all duration-400 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        {/* Reserva Tour */}
        <a
          href="/tours"
          className="group relative flex items-center justify-end"
        >
          {/* Label */}
          <div className="mr-3 bg-black-900/95 text-white px-4 py-2 rounded-lg shadow-xl border border-white/10 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            <span className="font-[family-name:var(--font-raleway)] text-xs font-light tracking-wider">
              Reserva Tour
            </span>
          </div>

          {/* Icon Button - smaller and more subtle */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </a>

        {/* Ver Vinos */}
        <a
          href="/vinos"
          className="group relative flex items-center justify-end"
        >
          {/* Label */}
          <div className="mr-3 bg-black-900/95 text-white px-4 py-2 rounded-lg shadow-xl border border-white/10 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            <span className="font-[family-name:var(--font-raleway)] text-xs font-light tracking-wider">
              Ver Vinos
            </span>
          </div>

          {/* Icon Button - smaller and more subtle */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-900 to-red-950 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
        </a>
      </div>

      {/* Main Toggle Button - smaller and more subtle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-12 h-12 rounded-full bg-black-900/80 backdrop-blur-md flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105"
        aria-label="Menú de reservas"
      >
        {/* Simple icon */}
        <div className="relative w-5 h-5 flex items-center justify-center">
          <svg
            className={`w-5 h-5 text-white transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>
    </div>
  )
}
