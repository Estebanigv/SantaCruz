'use client'

import { useEffect } from 'react'

export default function ScaleDetector() {
  useEffect(() => {
    const detectAndApplyScale = () => {
      // Detectar la escala del sistema
      // devicePixelRatio > 1 indica que hay escalado
      // En una pantalla 1920x1080 con 150% de escala:
      // - window.screen.width = 1920 (resolución real)
      // - window.innerWidth = ~1280 (viewport efectivo)
      // - devicePixelRatio = 1.5 (150%)

      const dpr = window.devicePixelRatio || 1
      const screenWidth = window.screen.width
      const innerWidth = window.innerWidth

      // Calcular la escala efectiva
      // Si DPR es 1.5 (150%) y estamos en una pantalla grande, aplicar zoom
      const isHighScaleDesktop = dpr >= 1.25 && screenWidth >= 1920 && innerWidth <= 1400

      if (isHighScaleDesktop) {
        // Calcular el zoom para compensar (target: que se vea como al 100-110%)
        // Con escala 150% (dpr 1.5), aplicamos zoom 0.75 para volver a ~100%
        // O zoom 0.8 para ~110%
        const zoomFactor = 1 / dpr * 1.1 // Aproximadamente 73% para 150%, resultando en ~110% visual
        const clampedZoom = Math.max(0.7, Math.min(0.85, zoomFactor))

        document.documentElement.style.zoom = String(clampedZoom)
      } else {
        // Resetear zoom si no aplica
        document.documentElement.style.zoom = '1'
      }
    }

    // Ejecutar al cargar
    detectAndApplyScale()

    // Re-ejecutar si cambia el tamaño de ventana
    window.addEventListener('resize', detectAndApplyScale)

    return () => {
      window.removeEventListener('resize', detectAndApplyScale)
      document.documentElement.style.zoom = '1'
    }
  }, [])

  return null
}
