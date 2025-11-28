'use client'

import { membershipTiers } from '@/data/mockData'
import MembershipCard from '../wine/MembershipCard'
import SectionHeader from '../ui/SectionHeader'
import { useState } from 'react'

export default function MembershipsSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="bg-gradient-to-b from-black-950 via-black-900 to-black-950 section-padding relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold-600/8 rounded-full blur-3xl" />
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(212, 175, 55, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container-custom relative">
        <SectionHeader
          label="Beneficios Exclusivos"
          title="Club de Vinos Santa Cruz"
          subtitle="Únete a nuestra comunidad exclusiva y disfruta de beneficios únicos, acceso prioritario y experiencias memorables durante todo el año"
          theme="dark"
        />

        {/* Video Introduction Section */}
        <div className="mb-20 max-w-5xl mx-auto">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl group">
            {/* Video placeholder / thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-br from-black-800 to-black-900">
              <img
                src="/images/club-video-thumbnail.jpg"
                alt="Club de Vinos"
                className="w-full h-full object-cover opacity-60"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&auto=format&fit=crop'
                }}
              />
            </div>

            {/* Play button overlay */}
            {!isVideoPlaying && (
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group cursor-pointer"
              >
                <div className="relative">
                  {/* Pulsing rings */}
                  <div className="absolute inset-0 rounded-full bg-gold-500/20 animate-ping" />
                  <div className="absolute inset-0 rounded-full bg-gold-500/30 animate-pulse" />

                  {/* Play button */}
                  <div className="relative w-20 h-20 rounded-full bg-gold-500 flex items-center justify-center group-hover:bg-gold-400 transition-all duration-300 group-hover:scale-110">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Text overlay */}
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold mb-2">
                    Descubre el Club de Vinos
                  </h3>
                  <p className="font-[family-name:var(--font-raleway)] text-sm md:text-base opacity-90">
                    Mira cómo nuestros miembros disfrutan de experiencias exclusivas
                  </p>
                </div>
              </button>
            )}

            {/* Video iframe (shown when playing) */}
            {isVideoPlaying && (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Club de Vinos Santa Cruz"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Quick stats below video */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-gold-500 mb-2">
                2,500+
              </div>
              <div className="font-[family-name:var(--font-raleway)] text-sm text-gray-400 uppercase tracking-wider">
                Miembros Activos
              </div>
            </div>
            <div className="text-center">
              <div className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-gold-500 mb-2">
                50+
              </div>
              <div className="font-[family-name:var(--font-raleway)] text-sm text-gray-400 uppercase tracking-wider">
                Eventos Anuales
              </div>
            </div>
            <div className="text-center">
              <div className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-gold-500 mb-2">
                15%
              </div>
              <div className="font-[family-name:var(--font-raleway)] text-sm text-gray-400 uppercase tracking-wider">
                Descuento Miembros
              </div>
            </div>
          </div>
        </div>

        {/* Membership Grid - Perfectly aligned */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-24 items-end pt-8">
          {membershipTiers.map((tier) => (
            <div key={tier.id} className="h-full flex">
              <MembershipCard tier={tier} />
            </div>
          ))}
        </div>

        {/* CTA Section - Refined for dark background */}
        <div className="text-center pt-16 border-t border-white/10">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-300">
            <svg className="w-6 h-6 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-[family-name:var(--font-raleway)] font-light">
              Todos los planes incluyen envío gratis y acceso a eventos exclusivos
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
