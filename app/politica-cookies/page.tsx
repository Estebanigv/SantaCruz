import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies | Viña Santa Cruz',
  description:
    'Política de cookies de Viña Santa Cruz. Información sobre cómo utilizamos las cookies en nuestro sitio web.',
}

export default function CookiesPolicyPage() {
  return (
    <main className="min-h-screen bg-white pt-32">
      <div className="container-custom py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Política de Cookies
          </h1>
          <p className="text-sm text-gray-500 mb-12">Última actualización: Noviembre 2025</p>

          <div className="prose prose-lg max-w-none">
            {/* Introducción */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                1. ¿Qué son las Cookies?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo
                (ordenador, tablet o móvil) cuando visita un sitio web. Las cookies permiten que el
                sitio web recuerde sus acciones y preferencias (como idioma, tamaño de fuente y
                otras preferencias de visualización) durante un período de tiempo, para que no tenga
                que volver a configurarlas cada vez que regrese al sitio o navegue de una página a
                otra.
              </p>
              <p className="text-gray-700 leading-relaxed">
                En Viña Santa Cruz (www.vinasantacruz.cl) utilizamos cookies para mejorar su
                experiencia de navegación, analizar el tráfico del sitio y personalizar el
                contenido.
              </p>
            </section>

            {/* Tipos de Cookies */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                2. Tipos de Cookies que Utilizamos
              </h2>

              <h3 className="font-[family-name:var(--font-raleway)] text-xl font-medium text-gray-900 mb-3">
                2.1 Cookies Esenciales
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Estas cookies son necesarias para el funcionamiento básico del sitio web. Sin ellas,
                el sitio no puede funcionar correctamente.
              </p>
              <div className="bg-cream-50 p-4 rounded-lg mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-gray-900 font-medium">Cookie</th>
                      <th className="text-left py-2 text-gray-900 font-medium">Propósito</th>
                      <th className="text-left py-2 text-gray-900 font-medium">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-100">
                      <td className="py-2">session_id</td>
                      <td className="py-2">Mantiene la sesión del usuario</td>
                      <td className="py-2">Sesión</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">age_verified</td>
                      <td className="py-2">Recuerda la verificación de edad</td>
                      <td className="py-2">30 días</td>
                    </tr>
                    <tr>
                      <td className="py-2">cookie_consent</td>
                      <td className="py-2">Guarda preferencias de cookies</td>
                      <td className="py-2">1 año</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-[family-name:var(--font-raleway)] text-xl font-medium text-gray-900 mb-3">
                2.2 Cookies de Rendimiento y Análisis
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro
                sitio web, proporcionando información sobre las áreas visitadas, el tiempo de visita
                y cualquier problema encontrado.
              </p>
              <div className="bg-cream-50 p-4 rounded-lg mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-gray-900 font-medium">Cookie</th>
                      <th className="text-left py-2 text-gray-900 font-medium">Propósito</th>
                      <th className="text-left py-2 text-gray-900 font-medium">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-100">
                      <td className="py-2">_ga</td>
                      <td className="py-2">Google Analytics - Distingue usuarios</td>
                      <td className="py-2">2 años</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">_ga_*</td>
                      <td className="py-2">Google Analytics 4 - Estado de sesión</td>
                      <td className="py-2">2 años</td>
                    </tr>
                    <tr>
                      <td className="py-2">_gid</td>
                      <td className="py-2">Google Analytics - Distingue usuarios</td>
                      <td className="py-2">24 horas</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-[family-name:var(--font-raleway)] text-xl font-medium text-gray-900 mb-3">
                2.3 Cookies de Funcionalidad
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Estas cookies permiten que el sitio recuerde las elecciones que hace (como su nombre
                de usuario, idioma o región) y proporcione características mejoradas y más
                personalizadas.
              </p>
              <div className="bg-cream-50 p-4 rounded-lg mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-gray-900 font-medium">Cookie</th>
                      <th className="text-left py-2 text-gray-900 font-medium">Propósito</th>
                      <th className="text-left py-2 text-gray-900 font-medium">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-100">
                      <td className="py-2">language</td>
                      <td className="py-2">Preferencia de idioma</td>
                      <td className="py-2">1 año</td>
                    </tr>
                    <tr>
                      <td className="py-2">user_preferences</td>
                      <td className="py-2">Preferencias de visualización</td>
                      <td className="py-2">1 año</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-[family-name:var(--font-raleway)] text-xl font-medium text-gray-900 mb-3">
                2.4 Cookies de Marketing y Publicidad
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Estas cookies se utilizan para mostrarle anuncios más relevantes para usted y sus
                intereses. También se utilizan para limitar el número de veces que ve un anuncio y
                ayudar a medir la efectividad de las campañas publicitarias.
              </p>
              <div className="bg-cream-50 p-4 rounded-lg mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-gray-900 font-medium">Cookie</th>
                      <th className="text-left py-2 text-gray-900 font-medium">Propósito</th>
                      <th className="text-left py-2 text-gray-900 font-medium">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-100">
                      <td className="py-2">_fbp</td>
                      <td className="py-2">Facebook Pixel - Seguimiento</td>
                      <td className="py-2">3 meses</td>
                    </tr>
                    <tr>
                      <td className="py-2">_gcl_au</td>
                      <td className="py-2">Google Ads - Conversiones</td>
                      <td className="py-2">3 meses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Cookies de Terceros */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                3. Cookies de Terceros
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Algunas cookies son establecidas por servicios de terceros que aparecen en nuestras
                páginas. Estos servicios incluyen:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>
                  <strong>Google Analytics:</strong> Para análisis de tráfico web
                </li>
                <li>
                  <strong>Google Maps:</strong> Para mostrar mapas de ubicación
                </li>
                <li>
                  <strong>YouTube:</strong> Para reproducción de videos
                </li>
                <li>
                  <strong>Redes Sociales:</strong> Botones de compartir de Instagram, Facebook,
                  LinkedIn y X (Twitter)
                </li>
                <li>
                  <strong>TripAdvisor:</strong> Para mostrar reseñas y calificaciones
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                No tenemos control sobre estas cookies. Para más información sobre cómo estos
                terceros utilizan las cookies, consulte sus respectivas políticas de privacidad.
              </p>
            </section>

            {/* Gestión de Cookies */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                4. Cómo Gestionar las Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Puede controlar y/o eliminar las cookies como desee. Puede eliminar todas las
                cookies que ya están en su ordenador y puede configurar la mayoría de los
                navegadores para que no las acepten.
              </p>

              <h3 className="font-[family-name:var(--font-raleway)] text-xl font-medium text-gray-900 mb-3">
                4.1 Configuración del Navegador
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                La mayoría de los navegadores le permiten:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Ver qué cookies tiene y eliminarlas individualmente</li>
                <li>Bloquear cookies de terceros</li>
                <li>Bloquear cookies de sitios específicos</li>
                <li>Bloquear todas las cookies</li>
                <li>Eliminar todas las cookies al cerrar el navegador</li>
              </ul>

              <h3 className="font-[family-name:var(--font-raleway)] text-xl font-medium text-gray-900 mb-3">
                4.2 Enlaces de Configuración por Navegador
              </h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-600 hover:underline"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-600 hover:underline"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-600 hover:underline"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-600 hover:underline"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                <strong>Nota:</strong> Si elimina las cookies, es posible que tenga que configurar
                manualmente algunas preferencias cada vez que visite el sitio y que algunas
                funcionalidades no estén disponibles.
              </p>
            </section>

            {/* Consentimiento */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                5. Su Consentimiento
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Al utilizar nuestro sitio web, usted acepta el uso de cookies de acuerdo con esta
                Política de Cookies. Cuando visite nuestro sitio por primera vez, se le mostrará un
                banner de cookies donde podrá:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Aceptar todas las cookies</li>
                <li>Rechazar las cookies no esenciales</li>
                <li>Personalizar sus preferencias de cookies</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Puede cambiar sus preferencias de cookies en cualquier momento a través de la
                configuración de su navegador.
              </p>
            </section>

            {/* Actualizaciones */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                6. Actualizaciones de esta Política
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en
                las cookies que utilizamos o por otras razones operativas, legales o regulatorias.
                Le recomendamos que visite esta página regularmente para estar informado sobre el
                uso de cookies.
              </p>
            </section>

            {/* Contacto */}
            <section className="mb-12">
              <h2 className="font-[family-name:var(--font-raleway)] text-2xl font-semibold text-gray-900 mb-4">
                7. Contacto
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Si tiene preguntas sobre nuestra Política de Cookies, puede contactarnos:
              </p>
              <div className="bg-cream-50 p-6 rounded-lg">
                <p className="text-gray-900 font-medium mb-2">Viña Santa Cruz</p>
                <p className="text-gray-700">
                  Email:{' '}
                  <a
                    href="mailto:contacto@vinasantacruz.cl"
                    className="text-gold-600 hover:underline"
                  >
                    contacto@vinasantacruz.cl
                  </a>
                </p>
                <p className="text-gray-700">
                  Ventas:{' '}
                  <a href="tel:+56928842042" className="text-gold-600 hover:underline">
                    +56 9 2884 2042
                  </a>
                </p>
                <p className="text-gray-700">
                  Tours:{' '}
                  <a href="tel:+56972188755" className="text-gold-600 hover:underline">
                    +56 9 7218 8755
                  </a>
                </p>
                <p className="text-gray-700">Lolol, Valle de Colchagua, Región de O&apos;Higgins, Chile</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
