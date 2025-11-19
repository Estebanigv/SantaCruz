import SectionHeader from '../ui/SectionHeader'

export default function TripAdvisorSection() {
  return (
    <section className="bg-white section-padding relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.3) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="container-custom relative">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeader
            label="Opiniones de Nuestros Visitantes"
            title="Experiencias que Hablan por Sí Solas"
          />

          {/* TripAdvisor Widget */}
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-12 mb-12">
            <div className="flex flex-col items-center gap-8">
              {/* TripAdvisor Logo */}
              <div className="flex items-center gap-4">
                <svg className="w-16 h-16" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="90" fill="#00AA6C"/>
                  <circle cx="70" cy="100" r="35" fill="white"/>
                  <circle cx="130" cy="100" r="35" fill="white"/>
                  <circle cx="70" cy="100" r="20" fill="black"/>
                  <circle cx="130" cy="100" r="20" fill="black"/>
                </svg>
                <div className="text-left">
                  <div className="font-[family-name:var(--font-raleway)] text-2xl font-bold text-black-900">TripAdvisor</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-[#00AA6C]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
                <div className="text-center">
                  <div className="font-[family-name:var(--font-raleway)] text-5xl font-extralight text-gold-600 mb-2">4.8</div>
                  <div className="font-[family-name:var(--font-raleway)] text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">Calificación</div>
                </div>
                <div className="text-center">
                  <div className="font-[family-name:var(--font-raleway)] text-5xl font-extralight text-gold-600 mb-2">2,500+</div>
                  <div className="font-[family-name:var(--font-raleway)] text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">Opiniones</div>
                </div>
                <div className="text-center">
                  <div className="font-[family-name:var(--font-raleway)] text-5xl font-extralight text-gold-600 mb-2">95%</div>
                  <div className="font-[family-name:var(--font-raleway)] text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">Recomiendan</div>
                </div>
              </div>

              {/* CTA */}
              <a
                href="https://www.tripadvisor.cl/Attraction_Review-Vina-Santa-Cruz"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-10 py-4 bg-[#00AA6C] text-white font-[family-name:var(--font-raleway)] font-medium tracking-[0.15em] uppercase text-xs rounded-sm overflow-hidden transition-all duration-500 hover:bg-[#008f5a] hover:shadow-2xl hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Ver Todas las Opiniones
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* Featured Review */}
          <div className="bg-gradient-to-br from-gold-50 to-cream-50 border border-gold-200 rounded-xl p-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-1 mb-4 justify-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="font-[family-name:var(--font-raleway)] text-lg text-gray-700 leading-relaxed font-light mb-6 italic" style={{ lineHeight: '1.8' }}>
              &ldquo;Una experiencia inolvidable. El tour en teleférico es espectacular, los museos son fascinantes y la degustación de vinos superó todas nuestras expectativas. El personal es increíblemente amable y conocedor. ¡Altamente recomendado!&rdquo;
            </p>
            <div className="font-[family-name:var(--font-raleway)] text-sm text-gray-600">
              <span className="font-medium">— María José R.</span>, Santiago de Chile
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
