'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface SocialLinkLiquidProps {
  name: string
  href: string
  icon: React.ReactNode
}

export default function SocialLinkLiquid({
  name,
  href,
  icon,
}: SocialLinkLiquidProps) {
  const containerRef = useRef<HTMLAnchorElement>(null)
  const liquidRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const liquid = liquidRef.current

    if (!container || !liquid) return

    const handleMouseEnter = () => {
      // Liquid fill animation from bottom to top
      gsap.to(liquid, {
        scaleY: 1,
        duration: 0.6,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      // Liquid drains out
      gsap.to(liquid, {
        scaleY: 0,
        duration: 0.5,
        ease: 'power2.in',
      })
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <a
      ref={containerRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-11 h-11 rounded-lg border border-gray-800 bg-gray-900/30 flex items-center justify-center text-gray-400 overflow-hidden"
      aria-label={name}
    >
      {/* Liquid fill background */}
      <div
        ref={liquidRef}
        className="absolute inset-0 bg-gradient-to-t from-gold-500 via-gold-400 to-gold-300 origin-bottom"
        style={{ transform: 'scaleY(0)' }}
      />

      {/* Icon */}
      <div className="relative z-10 transition-colors duration-300 group-hover:text-black-900">
        {icon}
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-lg border-2 border-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </a>
  )
}
