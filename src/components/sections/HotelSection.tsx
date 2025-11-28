'use client'

import SectionHeader from '../ui/SectionHeader'

export default function HotelSection() {
  const amenities = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      title: 'Habitaciones Confortables',
      description: 'Espacios diseñados para tu descanso en el corazón del valle',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
          />
        </svg>
      ),
      title: 'Vista Privilegiada',
      description: 'Despierta con vistas panorámicas a viñedos y montañas',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
      title: 'Experiencias Incluidas',
      description: 'Tours, degustaciones y acceso a todas las instalaciones',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: 'Servicio Personalizado',
      description: 'Atención exclusiva para hacer tu estadía inolvidable',
    },
  ]

  return (
    <section className="relative bg-gradient-to-b from-white to-cream-50 section-padding overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative">
        <SectionHeader
          label="Alojamiento"
          title="Hotel Viña Santa Cruz"
          subtitle="Hospédate en el corazón del Valle de Colchagua y vive la experiencia completa del enoturismo"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-black-900 mb-6">
              Tu Refugio Entre Viñedos
            </h3>
            <p
              className="font-[family-name:var(--font-raleway)] text-gray-700 text-base leading-relaxed mb-6"
              style={{ lineHeight: '1.8' }}
            >
              Nuestro hotel boutique ofrece una experiencia única donde el confort se encuentra con
              la naturaleza. Cada habitación ha sido cuidadosamente diseñada para brindarte el
              descanso que mereces, con vistas espectaculares a los viñedos y la cordillera de los
              Andes.
            </p>
            <p
              className="font-[family-name:var(--font-raleway)] text-gray-700 text-base leading-relaxed mb-8"
              style={{ lineHeight: '1.8' }}
            >
              Disfruta de acceso exclusivo a nuestras instalaciones, tours privados por los viñedos
              al amanecer, degustaciones guiadas por nuestros enólogos, y la exquisita gastronomía
              del Restaurante Loló.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/hotel"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white font-[family-name:var(--font-raleway)] font-medium tracking-[0.15em] uppercase text-xs rounded-sm transition-all duration-300 hover:shadow-lg"
              >
                Ver Disponibilidad
              </a>
              <a
                href="mailto:reservas@vinasantacruz.cl"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 hover:border-gold-500 text-gray-700 hover:text-gold-600 font-[family-name:var(--font-raleway)] font-medium tracking-[0.15em] uppercase text-xs rounded-sm transition-all duration-300"
              >
                Consultar Reserva
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative group">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/images/hotel-placeholder.jpg"
                alt="Hotel Viña Santa Cruz"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop'
                }}
              />
            </div>
            {/* Decorative gold accent */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold-500 rounded-lg opacity-10 -z-10" />
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-black-900 text-center mb-12">
            Lo Que Incluye Tu Estadía
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity) => (
              <div key={amenity.title} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-100 text-gold-600 mb-4 group-hover:bg-gold-600 group-hover:text-white transition-all duration-300">
                  {amenity.icon}
                </div>
                <h4 className="font-[family-name:var(--font-raleway)] text-base font-semibold text-black-900 mb-2">
                  {amenity.title}
                </h4>
                <p className="font-[family-name:var(--font-raleway)] text-sm text-gray-600 leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offer Banner */}
        <div className="mt-12 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 rounded-xl p-8 text-center text-white">
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold mb-3">
            Oferta Especial de Temporada
          </h3>
          <p className="font-[family-name:var(--font-raleway)] text-base mb-6 opacity-95">
            Reserva 2 noches o más y obtén un tour privado por nuestros viñedos sin costo adicional
          </p>
          <a
            href="/hotel#reservar"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-gold-600 hover:bg-cream-50 font-[family-name:var(--font-raleway)] font-semibold tracking-[0.15em] uppercase text-xs rounded-sm transition-all duration-300 hover:shadow-lg"
          >
            Reservar Ahora
          </a>
        </div>
      </div>
    </section>
  )
}
