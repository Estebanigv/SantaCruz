'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Send, ChevronRight } from 'lucide-react'
import { WebPageSchema, BreadcrumbSchema, LocalBusinessSchema } from '@/components/seo/StructuredData'

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const asuntoOptions = [
    'Reserva de Experiencias',
    'Compra de Vinos',
    'Eventos Corporativos',
    'Matrimonios y Celebraciones',
    'Visitas Grupales',
    'Prensa y Medios',
    'Otro'
  ]

  return (
    <>
      {/* SEO: Structured Data for Contact Page */}
      <WebPageSchema
        name="Contacto - Viña Santa Cruz"
        description="Contáctanos para reservar tours, experiencias de enoturismo o eventos en Viña Santa Cruz. Ubicados en Ruta I-72 Km 25, Lolol, Valle de Colchagua."
        url="https://www.vinasantacruz.cl/contacto"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: 'https://www.vinasantacruz.cl' },
          { name: 'Contacto', url: 'https://www.vinasantacruz.cl/contacto' },
        ]}
      />
      <LocalBusinessSchema />

      <main className="min-h-screen">
        {/* Hero Section - Elegant and Minimal */}
      <section className="relative h-[45vh] min-h-[350px] md:h-[50vh] md:min-h-[400px] overflow-hidden">
        <Image
          src="/images/Tours y Expériencias/Paseo teleférico y Cerro de las Culturas.webp"
          alt="Viña Santa Cruz - Valle de Colchagua"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-gold-400 text-xs md:text-sm uppercase tracking-[0.4em] mb-4 font-light">
            Valle de Colchagua, Chile
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Contáctanos
          </h1>
          <div className="w-20 h-px bg-gold-500 mb-4" />
          <p className="text-white/70 text-sm md:text-base max-w-md font-light">
            Estamos aquí para crear experiencias memorables
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative bg-[#faf9f6]">
        {/* Decorative element */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Left Column - Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Section Title */}
              <div>
                <p className="text-gold-600 text-xs uppercase tracking-[0.3em] mb-2 font-medium">
                  Información
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-gray-900 mb-4">
                  Visítanos
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Te invitamos a conocer nuestra viña en el corazón del Valle de Colchagua,
                  a solo 180 km de Santiago.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Location */}
                <div className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-gold-200 hover:shadow-md transition-all duration-300">
                  <div className="w-11 h-11 bg-gold-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-gold-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Ubicación</h3>
                    <p className="text-gray-600 text-sm">Ruta I-72 Km 25, Lolol</p>
                    <p className="text-gray-500 text-sm">Región de O&apos;Higgins, Chile</p>
                  </div>
                </div>

                {/* Phone */}
                <a
                  href="tel:+56722821519"
                  className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-gold-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 bg-gold-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-gold-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                    <p className="text-gray-600 text-sm">+56 72 282 1519</p>
                    <p className="text-gray-500 text-sm">Reservas y consultas</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:contacto@vinasantacruz.cl"
                  className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-gold-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 bg-gold-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-gold-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600 text-sm">contacto@vinasantacruz.cl</p>
                    <p className="text-gray-500 text-sm">Respondemos en 24-48 horas</p>
                  </div>
                </a>

                {/* Hours */}
                <div className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-gold-200 hover:shadow-md transition-all duration-300">
                  <div className="w-11 h-11 bg-gold-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 transition-colors duration-300">
                    <Clock className="w-5 h-5 text-gold-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horario</h3>
                    <p className="text-gray-600 text-sm">Martes a Domingo</p>
                    <p className="text-gray-500 text-sm">10:00 - 18:00 hrs</p>
                  </div>
                </div>
              </div>

              {/* Map Link - Elegant */}
              <div className="pt-4">
                <Link
                  href="https://www.google.com/maps/dir//Viña+Santa+Cruz,+Lolol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-gray-700 hover:text-gold-600 transition-colors"
                >
                  <span className="text-sm font-medium">Ver en Google Maps</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </Link>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
                {/* Form Header */}
                <div className="mb-8">
                  <p className="text-gold-600 text-xs uppercase tracking-[0.3em] mb-2 font-medium">
                    Formulario
                  </p>
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-gray-900 mb-2">
                    Envíanos un mensaje
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Complete el formulario y nos pondremos en contacto a la brevedad
                  </p>
                </div>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-gray-900 mb-2">
                      Mensaje enviado
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Gracias por contactarnos. Te responderemos pronto.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' })
                      }}
                      className="text-gold-600 text-sm font-medium hover:text-gold-700 transition-colors underline underline-offset-4"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="nombre" className="block text-sm text-gray-700 mb-2">
                          Nombre completo <span className="text-gold-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-gold-500/30 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                          Correo electrónico <span className="text-gold-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-gold-500/30 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    {/* Phone & Subject Row */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="telefono" className="block text-sm text-gray-700 mb-2">
                          Teléfono <span className="text-gray-400 text-xs">(opcional)</span>
                        </label>
                        <input
                          type="tel"
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-gold-500/30 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                          placeholder="+56 9 1234 5678"
                        />
                      </div>
                      <div>
                        <label htmlFor="asunto" className="block text-sm text-gray-700 mb-2">
                          Asunto <span className="text-gold-500">*</span>
                        </label>
                        <select
                          id="asunto"
                          name="asunto"
                          value={formData.asunto}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-gold-500/30 focus:bg-white transition-all text-gray-900 appearance-none cursor-pointer"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            backgroundSize: '1.25rem'
                          }}
                        >
                          <option value="">Selecciona una opción</option>
                          {asuntoOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="mensaje" className="block text-sm text-gray-700 mb-2">
                        Mensaje <span className="text-gold-500">*</span>
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-gold-500/30 focus:bg-white transition-all text-gray-900 resize-none placeholder:text-gray-400"
                        placeholder="¿En qué podemos ayudarte?"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <>
                            <span>Enviar mensaje</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Full Width */}
      <section className="relative">
        <div className="h-[400px] md:h-[450px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.8!2d-71.6233!3d-34.4728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966409d8e59aaf53%3A0x4a4b3e40da81e6a4!2sVi%C3%B1a%20Santa%20Cruz!5e0!3m2!1ses!2scl!4v1701234567890!5m2!1ses!2scl"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale-[30%]"
          />
        </div>
        {/* Overlay Card */}
        <div className="absolute bottom-6 left-4 right-4 md:left-8 md:right-auto md:bottom-8 md:max-w-sm">
          <div className="bg-white rounded-xl shadow-lg p-5 md:p-6 border border-gray-100">
            <h3 className="font-[family-name:var(--font-playfair)] text-lg text-gray-900 mb-2">
              Viña Santa Cruz
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Ruta I-72 Km 25, Lolol<br />
              Región de O&apos;Higgins, Chile
            </p>
            <Link
              href="https://www.google.com/maps/dir//Viña+Santa+Cruz,+Lolol"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors"
            >
              <span>Cómo llegar</span>
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA - Minimal */}
      <section className="bg-gray-900 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-3">
            Contacto directo
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-white mb-6">
            ¿Prefieres hablar con nosotros?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+56722821519"
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={2} />
              <span>+56 72 282 1519</span>
            </a>
            <a
              href="mailto:contacto@vinasantacruz.cl"
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 border border-white/30 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              <Mail className="w-4 h-4" strokeWidth={2} />
              <span>contacto@vinasantacruz.cl</span>
            </a>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}
