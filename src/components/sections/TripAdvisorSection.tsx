export default function TripAdvisorSection() {
  return (
    <section className="bg-gradient-to-b from-white to-cream-50 py-16 relative overflow-hidden">
      <div className="container-custom relative">
        <div className="max-w-5xl mx-auto">
          {/* Two cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TripAdvisor Card */}
            <a
              href="https://www.tripadvisor.cl/Attraction_Review-g7300025-d1414952-Reviews-Vina_Santa_Cruz-Lolol_O_Higgins_Region.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 bg-white border border-gray-200 rounded-lg p-6 hover:border-[#00AA6C] hover:shadow-lg transition-all duration-300"
            >
              {/* TripAdvisor Logo */}
              <div className="flex-shrink-0">
                <svg className="w-14 h-14" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="90" fill="#00AA6C" />
                  <circle cx="70" cy="100" r="35" fill="white" />
                  <circle cx="130" cy="100" r="35" fill="white" />
                  <circle cx="70" cy="100" r="20" fill="black" />
                  <circle cx="130" cy="100" r="20" fill="black" />
                </svg>
              </div>

              {/* Rating and Stats */}
              <div className="flex-1">
                <p className="font-[family-name:var(--font-raleway)] text-xs text-gray-500 uppercase tracking-wider mb-1">
                  TripAdvisor
                </p>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-[#00AA6C]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm font-semibold text-gray-900">4.8</span>
                </div>
                <p className="font-[family-name:var(--font-raleway)] text-xs text-gray-500">
                  Basado en 2,500+ opiniones
                </p>
              </div>

              {/* Arrow */}
              <svg
                className="w-5 h-5 text-gray-300 group-hover:text-[#00AA6C] group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Google My Business Card */}
            <a
              href="https://g.page/r/vinasantacruz/review"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              {/* Google Logo */}
              <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>

              {/* Rating and Stats */}
              <div className="flex-1">
                <p className="font-[family-name:var(--font-raleway)] text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Google
                </p>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm font-semibold text-gray-900">4.7</span>
                </div>
                <p className="font-[family-name:var(--font-raleway)] text-xs text-gray-500">
                  Dejanos tu reseña
                </p>
              </div>

              {/* Arrow */}
              <svg
                className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
