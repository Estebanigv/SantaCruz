'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function VinosPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [progressAnimated, setProgressAnimated] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const tasks = [
    { name: 'Estructura de la página', status: 'done' },
    { name: 'Vinos destacados (4 productos)', status: 'done' },
    { name: 'Listado completo de vinos', status: 'pending' },
    { name: 'Precios y disponibilidad', status: 'pending' },
    { name: 'Descripciones y fichas técnicas', status: 'pending' },
    { name: 'Imágenes a color', status: 'pending' },
    { name: 'Imágenes en blanco y negro', status: 'pending' },
    { name: 'Categorías de vinos', status: 'pending' },
  ]

  const completedTasks = tasks.filter(t => t.status === 'done').length
  const totalTasks = tasks.length
  const progress = Math.round((completedTasks / totalTasks) * 100)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgressAnimated(progress)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible, progress])

  return (
    <main className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      {/* Contenido principal */}
      <div className="flex items-center justify-center px-6 py-20">
      <div className={`max-w-md w-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-[family-name:var(--font-raleway)] text-4xl font-bold text-white mb-2">
            Vinos
          </h1>
          <p className="font-[family-name:var(--font-raleway)] text-gray-400">
            Esta página está en proceso...
          </p>
        </div>

        {/* Progress Circle */}
        <div className="flex justify-center mb-10">
          <div className="relative w-40 h-40">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - progressAnimated / 100)}`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#b8860b" />
                </linearGradient>
              </defs>
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-[family-name:var(--font-raleway)] text-4xl font-bold text-white">
                {progressAnimated}%
              </span>
              <span className="font-[family-name:var(--font-raleway)] text-xs text-gray-400 uppercase tracking-wider">
                Completado
              </span>
            </div>
          </div>
        </div>

        {/* Tasks Summary */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <span className="font-[family-name:var(--font-raleway)] text-sm font-medium text-white">
              Progreso
            </span>
            <span className="font-[family-name:var(--font-raleway)] text-sm text-gray-400">
              {completedTasks} de {totalTasks}
            </span>
          </div>

          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center gap-3">
                {task.status === 'done' ? (
                  <div className="w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex-shrink-0" />
                )}
                <span className={`font-[family-name:var(--font-raleway)] text-sm ${
                  task.status === 'done' ? 'text-white' : 'text-gray-500'
                }`}>
                  {task.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-raleway)] text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors"
          >
            Ver página principal
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
      </div>
    </main>
  )
}
