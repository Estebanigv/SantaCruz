import { testimonials } from '@/data/mockData'
// import Rating from '../ui/Rating'
import SectionHeader from '../ui/SectionHeader'

export default function TestimonialsSection() {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <section className="bg-gradient-to-b from-cream-50 to-white section-padding">
      <div className="container-custom">
        <SectionHeader
          label="Testimonios"
          title="Lo Que Dicen Nuestros Clientes"
        />

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative bg-white rounded-sm p-10 md:p-12 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100"
            >
              {/* Google Icon */}
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-[family-name:var(--font-raleway)] text-xs text-gray-500 uppercase tracking-[0.15em] font-medium">Reseña de Google</span>
              </div>

              {/* Stars - Google style */}
              <div className="mb-6">
                {renderStars(testimonial.rating)}
              </div>

              {/* Quote Text */}
              <p className="font-[family-name:var(--font-raleway)] text-base text-gray-700 leading-relaxed mb-8 font-light line-clamp-6" style={{ lineHeight: '1.8' }}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Divider */}
              <div className="w-12 h-px bg-gradient-to-r from-gold-500 to-transparent mb-8 opacity-40" />

              {/* Customer Info */}
              <div className="flex items-center gap-4">
                {/* Photo */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-100 to-cream-100 border border-gold-200 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gold-600/50" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h4 className="font-[family-name:var(--font-raleway)] text-sm font-medium text-black-900">
                    {testimonial.name}
                  </h4>
                  <p className="font-[family-name:var(--font-raleway)] text-xs text-gray-500 font-light">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
