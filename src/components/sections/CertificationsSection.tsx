export default function CertificationsSection() {
  const certifications = [
    {
      name: '100% Solar',
      description: 'Primera viña 100% solar de Chile',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ),
    },
    {
      name: 'Sustentabilidad',
      description: 'Comprometidos con el medio ambiente',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path d="M12 21c-4.97 0-9-4.03-9-9 0-4.97 8-12 9-12s9 7.03 9 12c0 4.97-4.03 9-9 9z" />
          <path d="M12 21V11M12 11c-2 0-4 1-4 3M12 11c2 0 4 1 4 3" />
        </svg>
      ),
    },
    {
      name: 'Neuroaccesibilidad',
      description: 'Experiencias inclusivas para todos',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4l2 2" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          <path d="M8 12h.01M16 12h.01M12 16h.01M12 8h.01" />
        </svg>
      ),
    },
    {
      name: 'Turismo Responsable',
      description: 'Certificación de turismo sostenible',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path d="M9 12l2 2 4-4" />
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.73 0 3.35.49 4.72 1.34" />
          <path d="M21 5l-9 9" />
        </svg>
      ),
    },
  ]

  return (
    <section className="bg-white py-16 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.4) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom relative">
        <div className="max-w-5xl mx-auto">
          {/* Grid of Certifications */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="group flex flex-col items-center text-center p-4 md:p-6"
              >
                {/* Icon container with elegant border */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gray-200 flex items-center justify-center mb-4 text-gray-700 group-hover:border-gold-400 group-hover:text-gold-600 transition-all duration-300">
                  {cert.icon}
                </div>
                <h3 className="font-[family-name:var(--font-raleway)] text-sm font-semibold text-gray-900 mb-1.5 tracking-wide">
                  {cert.name}
                </h3>
                <p className="font-[family-name:var(--font-raleway)] text-xs text-gray-500 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
