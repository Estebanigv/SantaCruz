import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Viña Santa Cruz',
  description:
    'Términos y condiciones de uso del sitio web de Viña Santa Cruz. Conoce las reglas y condiciones para utilizar nuestros servicios.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container-custom py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-sm text-gray-500 mb-12">Última actualización: Enero 2025</p>

          <div className="prose prose-lg max-w-none">
            {/* Aceptación de Términos */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                1. Aceptación de los Términos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Bienvenido a Viña Santa Cruz. Al acceder y utilizar este sitio web
                (www.vinasantacruz.cl), usted acepta estar sujeto a estos Términos y Condiciones de
                Uso, todas las leyes y regulaciones aplicables, y acepta que es responsable del
                cumplimiento de todas las leyes locales aplicables.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a
                este sitio. Los materiales contenidos en este sitio web están protegidos por las
                leyes de propiedad intelectual y derechos de autor aplicables.
              </p>
            </section>

            {/* Uso del Sitio Web */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                2. Uso del Sitio Web
              </h2>
              <h3 className="font-[family-name:var(--font-raleway)] text-xl font-medium text-gray-900 mb-3">
                2.1 Licencia de Uso
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Se le concede permiso para descargar temporalmente una copia de los materiales en el
                sitio web de Viña Santa Cruz solo para visualización transitoria personal y no
                comercial. Esta es la concesión de una licencia, no una transferencia de título, y
                bajo esta licencia usted no puede:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Modificar o copiar los materiales</li>
                <li>
                  Usar los materiales para cualquier propósito comercial o para exhibición pública
                </li>
                <li>
                  Intentar descompilar o realizar ingeniería inversa de cualquier software contenido
                  en el sitio web
                </li>
                <li>Eliminar cualquier derecho de autor u otras notaciones de propiedad</li>
                <li>
                  Transferir los materiales a otra persona o "reflejar" los materiales en cualquier
                  otro servidor
                </li>
              </ul>

              <h3 className="font-[family-name:var(--font-raleway)] text-xl font-medium text-gray-900 mb-3">
                2.2 Restricción de Edad
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Al acceder a ciertas secciones de este sitio web que contienen información sobre
                productos alcohólicos, usted declara y garantiza que:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Es mayor de 18 años de edad</li>
                <li>Tiene la capacidad legal para aceptar estos términos</li>
                <li>
                  Cumple con todas las leyes locales aplicables sobre consumo de bebidas alcohólicas
                </li>
              </ul>
            </section>

            {/* Reservas y Compras */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                3. Reservas y Compras
              </h2>
              <h3 className="font-[family-name:var(--font-raleway)] text-xl font-medium text-gray-900 mb-3">
                3.1 Tours y Experiencias
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Al realizar una reserva para tours o experiencias en Viña Santa Cruz:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Todas las reservas están sujetas a disponibilidad</li>
                <li>Los precios mostrados están en pesos chilenos (CLP)</li>
                <li>Las confirmaciones se enviarán por correo electrónico</li>
                <li>
                  Las cancelaciones deben realizarse con al menos 48 horas de anticipación para
                  reembolso completo
                </li>
                <li>Nos reservamos el derecho de cancelar tours por condiciones climáticas adversas</li>
              </ul>

              <h3 className="font-[family-name:var(--font-raleway)] text-xl font-medium text-gray-900 mb-3">
                3.2 Restaurante Loló
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Para reservas en nuestro restaurante:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Las reservas se mantienen por 15 minutos después de la hora programada</li>
                <li>Se requiere confirmación por correo electrónico o teléfono</li>
                <li>Para grupos de más de 8 personas, contacte directamente al restaurante</li>
                <li>Las modificaciones deben realizarse con al menos 24 horas de anticipación</li>
              </ul>

              <h3 className="font-[family-name:var(--font-raleway)] text-xl font-medium text-gray-900 mb-3">
                3.3 Alojamiento
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Para reservas de hotel:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Check-in: 15:00 hrs / Check-out: 12:00 hrs</li>
                <li>Políticas de cancelación específicas se indican en cada reserva</li>
                <li>Se requiere tarjeta de crédito válida para garantizar la reserva</li>
                <li>Los precios pueden variar según temporada y disponibilidad</li>
              </ul>
            </section>

            {/* Club de Vinos */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                4. Club de Vinos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                La membresía del Club de Vinos está sujeta a:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Verificación de mayoría de edad (18+ años)</li>
                <li>Términos y condiciones específicos del programa de membresía</li>
                <li>Los beneficios pueden cambiar previa notificación a los miembros</li>
                <li>
                  Las membresías son personales e intransferibles salvo autorización expresa
                </li>
              </ul>
            </section>

            {/* Propiedad Intelectual */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                5. Propiedad Intelectual
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Todo el contenido incluido en este sitio web, tales como texto, gráficos, logos,
                iconos de botones, imágenes, clips de audio, descargas digitales y compilaciones de
                datos, es propiedad de Viña Santa Cruz o de sus proveedores de contenido y está
                protegido por las leyes internacionales de derechos de autor.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                La compilación de todo el contenido en este sitio es propiedad exclusiva de Viña
                Santa Cruz y está protegida por las leyes internacionales de derechos de autor.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Marcas, logos y marcas de servicio mostradas en el Sitio son propiedad registrada de
                Viña Santa Cruz. No se permite el uso de estas marcas sin el consentimiento previo
                por escrito de Viña Santa Cruz.
              </p>
            </section>

            {/* Enlaces de Terceros */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                6. Enlaces a Sitios de Terceros
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nuestro sitio web puede contener enlaces a sitios web de terceros, incluyendo:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Google My Business</li>
                <li>LinkedIn</li>
                <li>TripAdvisor</li>
                <li>YouTube y Vimeo (para contenido de video)</li>
                <li>Redes sociales (Instagram, Facebook)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Viña Santa Cruz no tiene control sobre el contenido de esos sitios y no asume
                ninguna responsabilidad por ellos. La inclusión de cualquier enlace no implica
                respaldo por parte de Viña Santa Cruz.
              </p>
            </section>

            {/* Limitación de Responsabilidad */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                7. Limitación de Responsabilidad
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                En ningún caso Viña Santa Cruz o sus proveedores serán responsables de ningún daño
                (incluyendo, sin limitación, daños por pérdida de datos o beneficios, o debido a
                interrupción del negocio) que surjan del uso o la imposibilidad de usar los
                materiales en el sitio web de Viña Santa Cruz.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Viña Santa Cruz no garantiza que:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>El servicio satisfaga sus requisitos</li>
                <li>El servicio esté disponible de forma ininterrumpida, oportuna y segura</li>
                <li>Los resultados que se puedan obtener sean precisos o confiables</li>
                <li>Se corrijan todos los errores del software</li>
              </ul>
            </section>

            {/* Precisión de Materiales */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                8. Precisión de los Materiales
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Los materiales que aparecen en el sitio web de Viña Santa Cruz podrían incluir
                errores técnicos, tipográficos o fotográficos. Viña Santa Cruz no garantiza que
                ninguno de los materiales en su sitio web sean precisos, completos o actuales. Viña
                Santa Cruz puede realizar cambios en los materiales contenidos en su sitio web en
                cualquier momento sin previo aviso.
              </p>
            </section>

            {/* Certificaciones */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                9. Certificaciones y Reconocimientos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Viña Santa Cruz muestra en su sitio web logos y certificaciones relacionadas con:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Sustentabilidad y prácticas ambientales</li>
                <li>Neuroaccesibilidad</li>
                <li>Calidad y premios de la industria vitivinícola</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Estas certificaciones son propiedad de sus respectivos organismos certificadores y
                están sujetas a renovación periódica según sus términos.
              </p>
            </section>

            {/* Idiomas */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                10. Idiomas Disponibles
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Este sitio web está disponible en español, inglés y portugués. En caso de cualquier
                discrepancia entre traducciones, la versión en español prevalecerá.
              </p>
            </section>

            {/* Modificaciones */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                11. Modificaciones de los Términos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Viña Santa Cruz puede revisar estos Términos de Uso del sitio web en cualquier
                momento sin previo aviso. Al utilizar este sitio web, usted acepta estar sujeto a la
                versión actual de estos Términos y Condiciones de Uso.
              </p>
            </section>

            {/* Ley Aplicable */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                12. Ley Aplicable
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Estos términos y condiciones se rigen por las leyes de la República de Chile y
                usted se somete irrevocablemente a la jurisdicción exclusiva de los tribunales de
                ese país.
              </p>
            </section>

            {/* Contacto */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                13. Información de Contacto
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Si tiene alguna pregunta sobre estos Términos y Condiciones, puede contactarnos:
              </p>
              <div className="bg-cream-50 p-6 rounded-lg">
                <p className="text-gray-900 font-medium mb-2">Viña Santa Cruz</p>
                <p className="text-gray-700">
                  Email:{' '}
                  <a href="mailto:contacto@vinasantacruz.cl" className="text-gold-600 hover:underline">
                    contacto@vinasantacruz.cl
                  </a>
                </p>
                <p className="text-gray-700">
                  Teléfono:{' '}
                  <a href="tel:+56722123456" className="text-gold-600 hover:underline">
                    +56 72 212 3456
                  </a>
                </p>
                <p className="text-gray-700">Valle de Colchagua, Región de O'Higgins, Chile</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
