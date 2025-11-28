import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Viña Santa Cruz',
  description:
    'Política de privacidad y protección de datos personales de Viña Santa Cruz. Conoce cómo protegemos tu información.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container-custom py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Política de Privacidad
          </h1>
          <p className="text-sm text-gray-500 mb-12">Última actualización: Enero 2025</p>

          <div className="prose prose-lg max-w-none">
            {/* Introducción */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                1. Introducción
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Viña Santa Cruz (en adelante, "nosotros", "nuestro" o "la Viña") se compromete a
                proteger y respetar su privacidad. Esta Política de Privacidad explica cómo
                recopilamos, usamos, compartimos y protegemos su información personal cuando visita
                nuestro sitio web www.vinasantacruz.cl (el "Sitio").
              </p>
              <p className="text-gray-700 leading-relaxed">
                Al utilizar nuestro Sitio, usted acepta las prácticas descritas en esta Política de
                Privacidad. Si no está de acuerdo con estos términos, le recomendamos que no utilice
                nuestro Sitio.
              </p>
            </section>

            {/* Información que Recopilamos */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                2. Información que Recopilamos
              </h2>
              <h3 className="font-[family-name:var(--font-raleway)] text-xl font-medium text-gray-900 mb-3">
                2.1 Información que usted nos proporciona
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Recopilamos información que usted nos proporciona directamente cuando:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Realiza una reserva para tours o experiencias</li>
                <li>Se registra para el Club de Vinos</li>
                <li>Reserva una mesa en nuestro restaurante Loló</li>
                <li>Reserva alojamiento en nuestro hotel</li>
                <li>Se suscribe a nuestro boletín informativo</li>
                <li>Se comunica con nosotros a través de formularios de contacto</li>
                <li>Crea una cuenta en nuestro sitio web</li>
              </ul>

              <h3 className="font-[family-name:var(--font-raleway)] text-xl font-medium text-gray-900 mb-3">
                2.2 Información recopilada automáticamente
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cuando visita nuestro Sitio, recopilamos automáticamente cierta información,
                incluyendo:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Dirección IP y ubicación geográfica aproximada</li>
                <li>Tipo de navegador y sistema operativo</li>
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Fuente de referencia (cómo llegó a nuestro sitio)</li>
                <li>Cookies y tecnologías similares</li>
              </ul>
            </section>

            {/* Uso de la Información */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                3. Cómo Utilizamos su Información
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Utilizamos la información recopilada para los siguientes propósitos:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Procesar y gestionar sus reservas de tours, experiencias, restaurante y hotel</li>
                <li>Gestionar su membresía del Club de Vinos</li>
                <li>Enviarle confirmaciones, recordatorios y actualizaciones sobre sus reservas</li>
                <li>
                  Comunicarnos con usted sobre productos, servicios y eventos que puedan ser de su
                  interés
                </li>
                <li>Mejorar nuestro Sitio y personalizar su experiencia</li>
                <li>Analizar el uso del Sitio y realizar análisis estadísticos</li>
                <li>Prevenir fraudes y garantizar la seguridad del Sitio</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
              </ul>
            </section>

            {/* Compartir Información */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                4. Compartir su Información
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                No vendemos ni alquilamos su información personal a terceros. Podemos compartir su
                información únicamente en las siguientes circunstancias:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>
                  <strong>Proveedores de servicios:</strong> Compartimos información con proveedores
                  que nos ayudan a operar nuestro negocio (procesamiento de pagos, envío de correos
                  electrónicos, análisis web)
                </li>
                <li>
                  <strong>Requisitos legales:</strong> Cuando sea necesario para cumplir con la ley,
                  regulaciones o procesos legales
                </li>
                <li>
                  <strong>Protección de derechos:</strong> Para proteger nuestros derechos, propiedad
                  o seguridad, así como los de nuestros usuarios
                </li>
                <li>
                  <strong>Transacciones comerciales:</strong> En caso de fusión, venta o
                  transferencia de activos de la empresa
                </li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                5. Cookies y Tecnologías Similares
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro
                Sitio. Las cookies son pequeños archivos de texto que se almacenan en su dispositivo
                cuando visita un sitio web.
              </p>
              <h3 className="font-[family-name:var(--font-raleway)] text-xl font-medium text-gray-900 mb-3">
                Tipos de cookies que utilizamos:
              </h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>
                  <strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del
                  Sitio
                </li>
                <li>
                  <strong>Cookies de rendimiento:</strong> Nos ayudan a entender cómo los visitantes
                  interactúan con el Sitio
                </li>
                <li>
                  <strong>Cookies de funcionalidad:</strong> Permiten recordar sus preferencias
                </li>
                <li>
                  <strong>Cookies de marketing:</strong> Se utilizan para mostrarle contenido
                  relevante
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Puede controlar y gestionar las cookies a través de la configuración de su navegador.
              </p>
            </section>

            {/* Integración con Terceros */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                6. Integraciones con Terceros
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nuestro Sitio utiliza servicios de terceros que pueden recopilar información:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>
                  <strong>Google My Business:</strong> Para mostrar información de nuestra ubicación
                  y reseñas
                </li>
                <li>
                  <strong>LinkedIn:</strong> Para compartir contenido y conectar con nuestra
                  comunidad profesional
                </li>
                <li>
                  <strong>TripAdvisor:</strong> Para mostrar reseñas y calificaciones de visitantes
                </li>
                <li>
                  <strong>YouTube/Vimeo:</strong> Para alojar y mostrar videos institucionales
                </li>
                <li>
                  <strong>Google Drive:</strong> Para gestión interna de contenido
                </li>
              </ul>
            </section>

            {/* Seguridad */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                7. Seguridad de su Información
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger
                su información personal contra acceso no autorizado, alteración, divulgación o
                destrucción. Sin embargo, ningún método de transmisión por Internet o
                almacenamiento electrónico es 100% seguro.
              </p>
            </section>

            {/* Derechos del Usuario */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                8. Sus Derechos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                De acuerdo con la legislación chilena de protección de datos (Ley N° 19.628), usted
                tiene derecho a:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Acceder a sus datos personales que tenemos en nuestros registros</li>
                <li>Solicitar la corrección de datos inexactos o incompletos</li>
                <li>Solicitar la eliminación de sus datos personales</li>
                <li>Oponerse al procesamiento de sus datos personales</li>
                <li>Solicitar la portabilidad de sus datos</li>
                <li>Retirar su consentimiento en cualquier momento</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Para ejercer estos derechos, contáctenos a través de{' '}
                <a href="mailto:privacidad@vinasantacruz.cl" className="text-gold-600 hover:underline">
                  privacidad@vinasantacruz.cl
                </a>
              </p>
            </section>

            {/* Retención de Datos */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                9. Retención de Datos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Conservamos su información personal durante el tiempo necesario para cumplir con los
                propósitos descritos en esta política, a menos que la ley requiera o permita un
                período de retención más largo.
              </p>
            </section>

            {/* Menores de Edad */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                10. Menores de Edad
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Nuestro Sitio requiere verificación de mayoría de edad para el acceso a ciertas
                secciones relacionadas con productos alcohólicos. No recopilamos intencionalmente
                información de menores de 18 años sin el consentimiento parental apropiado.
              </p>
            </section>

            {/* Cambios a la Política */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                11. Cambios a esta Política
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier
                momento. Los cambios entrarán en vigor inmediatamente después de su publicación en
                el Sitio. Le recomendamos revisar periódicamente esta página para estar informado de
                cualquier cambio.
              </p>
            </section>

            {/* Contacto */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                12. Contacto
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Si tiene preguntas, comentarios o inquietudes sobre esta Política de Privacidad o
                sobre cómo manejamos su información personal, contáctenos:
              </p>
              <div className="bg-cream-50 p-6 rounded-lg">
                <p className="text-gray-900 font-medium mb-2">Viña Santa Cruz</p>
                <p className="text-gray-700">
                  Email:{' '}
                  <a
                    href="mailto:privacidad@vinasantacruz.cl"
                    className="text-gold-600 hover:underline"
                  >
                    privacidad@vinasantacruz.cl
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
