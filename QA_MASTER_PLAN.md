# PLAN MAESTRO DE QA - VIÑA SANTA CRUZ
## Plataforma Web Premium - Estrategia Completa de Testing

**Versión:** 1.0
**Fecha:** 2025-11-18
**Proyecto:** Viña Santa Cruz - Plataforma Web Premium
**Stack:** Next.js 14, PostgreSQL 15+, REST APIs (80+ endpoints)

---

## TABLA DE CONTENIDOS

1. [Estrategia General de Testing](#1-estrategia-general-de-testing)
2. [Test Cases Detallados por Funcionalidad](#2-test-cases-detallados-por-funcionalidad)
3. [Plan de Pruebas por Fase](#3-plan-de-pruebas-por-fase)
4. [Testing Específico por Tipo](#4-testing-específico-por-tipo)
5. [Test Data Strategy](#5-test-data-strategy)
6. [CI/CD Integration](#6-cicd-integration)
7. [Bug Tracking y Reporting](#7-bug-tracking-y-reporting)
8. [Apéndices](#8-apéndices)

---

## 1. ESTRATEGIA GENERAL DE TESTING

### 1.1 Test Pyramid Strategy

```
                     E2E Tests (5%)
                  ├─────────────┤
                  │  10-15 tests │
                  └─────────────┘

          Integration Tests (15%)
       ├──────────────────────────┤
       │        40-50 tests        │
       └──────────────────────────┘

            Unit Tests (80%)
├───────────────────────────────────────┤
│           200-300 tests                │
└───────────────────────────────────────┘
```

### 1.2 Tipos de Pruebas y Frameworks

#### Unit Testing (80% coverage target)

**Framework:** Vitest (recomendado para Next.js 14+)

**Alcance:**
- Funciones utilitarias (validaciones, formatters, helpers)
- Custom hooks (30+ hooks documentados)
- Servicios API (12 servicios)
- Componentes UI aislados (60+ componentes)
- Zustand stores (auth, cart, ui, filters)
- Schema validations (Zod schemas)

**Configuración:**
```javascript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData/*'
      ],
      thresholds: {
        global: {
          branches: 75,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

**Librerías adicionales:**
- @testing-library/react (Testing Library)
- @testing-library/user-event (simulación de interacciones)
- @testing-library/jest-dom (matchers adicionales)
- msw (Mock Service Worker para APIs)

---

#### Integration Testing (90% coverage target)

**Framework:** Vitest + React Testing Library

**Alcance:**
- Flujos multi-componente
- Interacciones con API (mocked)
- State management (Zustand + React Query)
- Form submissions (React Hook Form + Zod)
- Routing y navegación
- Protected routes y middleware
- Error boundaries

**Enfoque:**
- Testear componentes con sus dependencias reales
- Mock solo APIs externas
- Validar comunicación entre stores y componentes
- Verificar side effects (localStorage, cookies)

---

#### End-to-End Testing (Flujos críticos)

**Framework:** Playwright (recomendado)

**Alcance:**
- 10-15 flujos críticos de usuario
- Compra de vinos completa
- Reserva de tours
- Registro/login
- Suscripción a membresía
- Newsletter signup
- Formulario de contacto
- Age verification

**Configuración Playwright:**
```javascript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'test-results.xml' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  }
})
```

---

#### Performance Testing

**Framework:** Lighthouse CI + k6

**Métricas Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- FCP (First Contentful Paint): < 1.8s
- TTI (Time to Interactive): < 3.8s

**Herramientas:**
- Lighthouse CI (automatizado en pipeline)
- WebPageTest (manual)
- k6 (load testing)
- Next.js built-in analytics

**Configuración Lighthouse CI:**
```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/vinos',
        'http://localhost:3000/experiencias',
        'http://localhost:3000/vinos/carmenere-reserva-2020'
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
```

---

#### Security Testing

**Framework:** OWASP ZAP + Manual Testing

**Áreas críticas:**
- SQL Injection prevention
- XSS (Cross-Site Scripting)
- CSRF protection
- JWT validation
- OAuth security
- Payment gateway security (PCI-DSS compliance)
- Age verification bypass attempts
- Rate limiting
- Input sanitization
- File upload security (gallery)

**Herramientas:**
- OWASP ZAP (automated scanning)
- npm audit (vulnerabilidades de dependencias)
- Snyk (análisis de código)
- Manual penetration testing checklist

---

#### Accessibility Testing

**Framework:** axe-core + Manual Testing

**Estándar:** WCAG 2.1 AA compliance

**Herramientas:**
- @axe-core/playwright (automatizado)
- axe DevTools (Chrome extension)
- NVDA/JAWS (screen readers)
- Keyboard navigation testing

**Áreas clave:**
- Navegación por teclado completa
- Screen reader compatibility
- Color contrast (mínimo 4.5:1)
- Focus indicators visibles
- ARIA labels correctos
- Semantic HTML
- Form labels y error messages
- Alt text para imágenes

---

### 1.3 Coverage Targets

| Tipo de Testing | Target Coverage | Prioridad |
|-----------------|-----------------|-----------|
| Unit Tests | 80% | Alta |
| Integration Tests | 90% flujos críticos | Alta |
| E2E Tests | 100% happy paths críticos | Crítica |
| Performance | 100% páginas principales | Alta |
| Security | Checklist completo | Crítica |
| Accessibility | WCAG 2.1 AA | Alta |
| Cross-browser | Chrome, Firefox, Safari, Edge | Media |
| Responsive | Mobile, Tablet, Desktop | Alta |

---

### 1.4 Test Environment Strategy

#### Environments

1. **Local Development**
   - Docker compose con PostgreSQL local
   - Mocks para integraciones externas (MSW)
   - Hot reload habilitado

2. **CI/CD (GitHub Actions)**
   - PostgreSQL en contenedor
   - Tests automatizados en cada PR
   - Parallel execution

3. **Staging**
   - Base de datos staging con datos realistas
   - Integraciones en modo sandbox
   - Deploy automático desde branch `develop`

4. **Pre-production**
   - Réplica exacta de producción
   - Integraciones reales en modo test
   - Testing manual antes de release

---

## 2. TEST CASES DETALLADOS POR FUNCIONALIDAD

### 2.1 AUTENTICACIÓN Y USUARIOS

#### TC-AUTH-001: Registro de Usuario Nuevo

**Precondiciones:**
- Usuario no existe en la base de datos
- Email válido y disponible

**Pasos:**
1. Navegar a `/registro`
2. Ingresar nombre: "Juan Pérez"
3. Ingresar email: "juan.perez@example.com"
4. Ingresar contraseña: "SecurePass123!"
5. Confirmar contraseña: "SecurePass123!"
6. Aceptar términos y condiciones
7. Click en "Crear cuenta"

**Resultado Esperado:**
- Usuario creado exitosamente en la BD
- Email de confirmación enviado
- Redirección a página de verificación de email
- Mensaje: "Revisa tu correo para activar tu cuenta"

**Validaciones:**
- Email único en BD
- Contraseña hasheada (bcrypt)
- Token de verificación generado
- Registro en tabla `users` con `email_verified = false`

**Priority:** High
**Severity si falla:** Critical
**Automation:** Yes (E2E + Integration)

---

#### TC-AUTH-002: Login con Credenciales Válidas

**Precondiciones:**
- Usuario existe y está verificado
- Credenciales correctas

**Pasos:**
1. Navegar a `/login`
2. Ingresar email: "juan.perez@example.com"
3. Ingresar contraseña: "SecurePass123!"
4. Click en "Iniciar sesión"

**Resultado Esperado:**
- Login exitoso
- JWT generado y almacenado en httpOnly cookie
- Redirección a dashboard (`/dashboard`)
- Header muestra nombre de usuario

**Validaciones:**
- Token JWT válido con expiración correcta
- Session creada en `user_sessions` table
- `last_login` actualizado
- Store de Zustand actualizado con datos de usuario

**Priority:** Critical
**Severity si falla:** Critical
**Automation:** Yes (E2E + Unit)

---

#### TC-AUTH-003: Login con Credenciales Inválidas

**Pasos:**
1. Navegar a `/login`
2. Ingresar email: "juan.perez@example.com"
3. Ingresar contraseña incorrecta: "WrongPass123"
4. Click en "Iniciar sesión"

**Resultado Esperado:**
- Login rechazado
- Mensaje de error: "Email o contraseña incorrectos"
- No se genera JWT
- Rate limiting activado tras 5 intentos

**Validations:**
- Intento fallido registrado en `activity_logs`
- Counter de intentos incrementado
- Lockout temporal después de 5 intentos (15 minutos)

**Priority:** High
**Severity si falla:** High
**Automation:** Yes (E2E + Unit)

---

#### TC-AUTH-004: OAuth Login con Google

**Precondiciones:**
- Google OAuth configurado
- Cuenta de Google válida

**Pasos:**
1. Navegar a `/login`
2. Click en "Continuar con Google"
3. Seleccionar cuenta de Google
4. Autorizar permisos

**Resultado Esperado:**
- Login exitoso vía OAuth
- Usuario creado si no existe
- Redirección a `/dashboard`
- Profile picture cargado desde Google

**Validations:**
- OAuth token validado
- Usuario vinculado en tabla `oauth_connections`
- Email verificado automáticamente

**Priority:** Medium
**Severity si falla:** Medium
**Automation:** Partial (mock OAuth en tests)

---

#### TC-AUTH-005: Recuperación de Contraseña

**Pasos:**
1. Navegar a `/recuperar-contrasena`
2. Ingresar email registrado
3. Click en "Enviar enlace"
4. Abrir email recibido
5. Click en enlace de recuperación
6. Ingresar nueva contraseña
7. Confirmar nueva contraseña
8. Submit

**Resultado Esperado:**
- Email enviado con token de recuperación
- Token válido por 1 hora
- Contraseña actualizada exitosamente
- Sesiones anteriores invalidadas
- Redirección a login

**Validations:**
- Token único generado en `password_resets`
- Token expira después de 1 hora
- Password hasheado correctamente
- Email de confirmación de cambio enviado

**Priority:** High
**Severity si falla:** High
**Automation:** Yes (E2E)

---

#### TC-AUTH-006: Logout

**Precondiciones:**
- Usuario autenticado

**Pasos:**
1. Click en avatar en header
2. Click en "Cerrar sesión"

**Resultado Esperado:**
- Session invalidada
- JWT cookie eliminado
- Redirección a home
- Store de auth limpiado

**Validations:**
- Session marcada como `ended_at` en BD
- Cookie removido
- Zustand store reseteado

**Priority:** High
**Severity si falla:** Medium
**Automation:** Yes (E2E + Integration)

---

### 2.2 COMPRA DE VINOS (FLUJO CRÍTICO)

#### TC-WINE-001: Búsqueda y Filtrado de Vinos

**Pasos:**
1. Navegar a `/vinos`
2. Aplicar filtro: Categoría = "Tintos"
3. Aplicar filtro: Región = "Valle de Colchagua"
4. Aplicar filtro: Precio = "$10,000 - $20,000"
5. Ordenar por: "Mejor valorados"

**Resultado Esperado:**
- Resultados filtrados correctamente
- URL actualizada con query params
- Paginación funcional
- Contador muestra número correcto de resultados

**Validations:**
- API call: `GET /api/wines?category=red&region=colchagua&price_min=10000&price_max=20000&sort=rating`
- Filtros reflejados en Zustand store
- Resultados coinciden con criterios
- Performance: respuesta < 500ms

**Priority:** Critical
**Severity si falla:** High
**Automation:** Yes (E2E + Integration)

---

#### TC-WINE-002: Ver Detalle de Vino

**Pasos:**
1. Desde catálogo, click en vino "Carmenere Reserva 2020"
2. Verificar información completa cargada

**Resultado Esperado:**
- Página de detalle cargada: `/vinos/carmenere-reserva-2020`
- Información completa visible:
  - Nombre, año, región
  - Precio, stock disponible
  - Descripción, notas de cata
  - Maridaje sugerido
  - Reviews y rating promedio
  - Galería de imágenes
- Botón "Agregar al carrito" habilitado si hay stock

**Validations:**
- API call: `GET /api/wines/carmenere-reserva-2020`
- Meta tags SEO correctos
- Images lazy loaded
- Related wines mostrados

**Priority:** Critical
**Severity si falla:** High
**Automation:** Yes (E2E)

---

#### TC-WINE-003: Agregar Vino al Carrito

**Precondiciones:**
- Vino en stock disponible

**Pasos:**
1. En página de detalle del vino
2. Seleccionar cantidad: 3
3. Click en "Agregar al carrito"

**Resultado Esperado:**
- Vino agregado al carrito
- Contador del carrito actualizado (+3)
- Toast notification: "3 botellas agregadas al carrito"
- Botón cambia a "Agregado ✓" brevemente

**Validations:**
- Zustand cart store actualizado
- LocalStorage sincronizado
- Stock no excedido
- API call si usuario autenticado: `POST /api/cart/items`

**Priority:** Critical
**Severity si falla:** Critical
**Automation:** Yes (E2E + Integration)

---

#### TC-WINE-004: Ver y Modificar Carrito

**Precondiciones:**
- Carrito tiene productos

**Pasos:**
1. Click en ícono del carrito
2. Modificar cantidad de un producto
3. Eliminar un producto
4. Verificar totales

**Resultado Esperado:**
- Modal/sidebar del carrito se abre
- Productos listados correctamente
- Cambios de cantidad actualizan subtotales
- Eliminación remueve producto
- Totales calculados correctamente:
  - Subtotal
  - IVA (19%)
  - Envío (si aplica)
  - Total

**Validations:**
- Cálculos matemáticos correctos
- LocalStorage actualizado
- API sync si usuario autenticado
- Stock validado antes de permitir incremento

**Priority:** Critical
**Severity si falla:** Critical
**Automation:** Yes (E2E + Unit para cálculos)

---

#### TC-WINE-005: Checkout - Información de Envío

**Precondiciones:**
- Usuario autenticado
- Carrito con productos
- Usuario mayor de 18 años verificado

**Pasos:**
1. Click en "Proceder al checkout"
2. Completar formulario de envío:
   - Nombre completo
   - Dirección
   - Comuna
   - Región
   - Teléfono
3. Seleccionar método de envío
4. Click en "Continuar a pago"

**Resultado Esperado:**
- Formulario validado correctamente
- Cálculo de envío basado en región
- Información guardada en session
- Redirección a página de pago

**Validations:**
- Validación de Zod schema
- Verificación de edad (age_verified = true)
- Comuna válida para delivery
- API call: `POST /api/orders/calculate-shipping`

**Priority:** Critical
**Severity si falla:** Critical
**Automation:** Yes (E2E)

---

#### TC-WINE-006: Checkout - Pago con Transbank

**Precondiciones:**
- Información de envío completada
- Monto total correcto

**Pasos:**
1. Seleccionar método: "Tarjeta de crédito/débito (Transbank)"
2. Click en "Pagar $XX.XXX"
3. Redirección a Transbank
4. Completar pago en webpay (sandbox)
5. Retorno a sitio

**Resultado Esperado:**
- Redirección correcta a Transbank
- Callback URL correcto
- Pago procesado exitosamente
- Orden creada con estado "paid"
- Email de confirmación enviado
- Redirección a página de éxito: `/pedido/confirmacion/{order_id}`

**Validations:**
- Order creado en tabla `orders`
- Payment record en `payments` con status "completed"
- Stock decrementado
- Invoice generado
- Email transaccional enviado (Brevo)
- SMS confirmación enviado (Twilio)

**Priority:** Critical
**Severity si falla:** Critical
**Automation:** Partial (mock Transbank en tests, manual en staging)

---

#### TC-WINE-007: Orden Confirmada y Tracking

**Precondiciones:**
- Pago completado exitosamente

**Pasos:**
1. En página de confirmación, verificar:
   - Número de orden
   - Resumen de productos
   - Información de envío
   - Monto pagado
   - Tiempo estimado de entrega
2. Navegar a `/dashboard/pedidos`
3. Verificar orden aparece en historial
4. Click en orden para ver detalle

**Resultado Esperado:**
- Toda la información correcta
- Estado inicial: "Confirmado"
- Tracking code visible (cuando se asigne)
- Opción para descargar invoice
- Timeline de estados visible

**Validations:**
- Order details completos en BD
- Invoice PDF generado y accesible
- Activity log registrado
- Email con invoice adjunto

**Priority:** High
**Severity si falla:** High
**Automation:** Yes (E2E)

---

### 2.3 RESERVA DE TOURS (FLUJO CRÍTICO)

#### TC-TOUR-001: Búsqueda y Selección de Tour

**Pasos:**
1. Navegar a `/experiencias`
2. Filtrar por categoría: "Tours Enológicos"
3. Ver detalle de "Tour Premium con Cata"

**Resultado Esperado:**
- Catálogo de tours visible
- Filtros funcionales
- Detalle muestra:
  - Descripción completa
  - Duración
  - Precio por persona
  - Incluye/No incluye
  - Galería de fotos
  - Reviews
  - Calendario de disponibilidad

**Validations:**
- API call: `GET /api/tours/{slug}`
- Availability calendar actualizado
- Fechas pasadas deshabilitadas
- Slots disponibles por día

**Priority:** Critical
**Severity si falla:** High
**Automation:** Yes (E2E)

---

#### TC-TOUR-002: Realizar Reserva de Tour

**Precondiciones:**
- Usuario autenticado y mayor de 18 años
- Tour tiene disponibilidad

**Pasos:**
1. Seleccionar fecha en calendario
2. Seleccionar número de personas: 4
3. Completar formulario de reserva:
   - Nombre contacto
   - Teléfono
   - Email
   - Solicitudes especiales (opcional)
4. Aceptar términos de cancelación
5. Click en "Continuar a pago"
6. Pagar reserva (50% adelanto)
7. Confirmar

**Resultado Esperado:**
- Reserva creada con estado "pending"
- Pago procesado
- Confirmación por email y SMS
- Código de reserva generado
- Disponibilidad actualizada (slots decrementados)

**Validations:**
- Reservation creado en tabla `tour_reservations`
- Payment con tipo "tour_reservation"
- Slot availability actualizado
- Email con detalles de tour enviado
- Reminder scheduled para 24h antes

**Priority:** Critical
**Severity si falla:** Critical
**Automation:** Yes (E2E)

---

#### TC-TOUR-003: Cancelación de Reserva

**Preconditions:**
- Reserva existe
- Dentro del periodo de cancelación (48h antes)

**Pasos:**
1. Navegar a `/dashboard/reservas`
2. Click en reserva activa
3. Click en "Cancelar reserva"
4. Confirmar cancelación
5. Seleccionar razón (opcional)

**Resultado Esperado:**
- Reserva cancelada
- Estado cambia a "cancelled"
- Reembolso procesado (según política)
- Email de confirmación de cancelación
- Slots liberados

**Validations:**
- Status actualizado en BD
- Refund creado en `payments`
- Availability restaurado
- Cancellation fee calculado correctamente
- Activity log registrado

**Priority:** High
**Severity si falla:** High
**Automation:** Yes (E2E)

---

### 2.4 MEMBRESÍAS

#### TC-MEMBER-001: Ver Planes de Membresía

**Pasos:**
1. Navegar a `/membresias`
2. Comparar planes (Bronze, Silver, Gold, Platinum)

**Resultado Esperado:**
- 4 tiers visibles
- Tabla comparativa de beneficios
- Precios anuales/mensuales
- CTA "Suscribirse" en cada plan
- Beneficios destacados por tier

**Validations:**
- API call: `GET /api/memberships/tiers`
- Pricing correcto
- Features list completa
- Diseño responsive

**Priority:** High
**Severity si falla:** Medium
**Automation:** Yes (E2E + Visual regression)

---

#### TC-MEMBER-002: Suscripción a Membresía Gold

**Preconditions:**
- Usuario autenticado
- No tiene membresía activa

**Pasos:**
1. Click en "Suscribirse" en plan Gold
2. Seleccionar frecuencia: Anual ($150.000)
3. Revisar beneficios
4. Ingresar método de pago
5. Confirmar suscripción

**Resultado Esperado:**
- Membresía activada inmediatamente
- Primer pago procesado
- Email de bienvenida con código de miembro
- Beneficios habilitados
- Badge visible en perfil

**Validations:**
- Record en `memberships` con status "active"
- Subscription en `membership_subscriptions`
- Payment recurrente configurado
- Benefits registrados en `membership_benefits`
- User role actualizado

**Priority:** Critical
**Severity si falla:** Critical
**Automation:** Yes (E2E con mock de pagos recurrentes)

---

#### TC-MEMBER-003: Aplicar Descuento de Miembro en Compra

**Preconditions:**
- Usuario con membresía Gold activa
- Descuento: 15% en todos los vinos

**Pasos:**
1. Agregar vino al carrito (precio: $20.000)
2. Proceder a checkout
3. Verificar descuento aplicado automáticamente

**Resultado Esperado:**
- Descuento 15% visible en carrito
- Precio final: $17.000
- Badge "Miembro Gold" visible
- Descuento reflejado en order summary

**Validations:**
- Discount calculado correctamente
- Order item tiene `discount_applied`
- Invoice muestra descuento
- Activity log: discount_applied

**Priority:** High
**Severity si falla:** High
**Automation:** Yes (Integration + E2E)

---

### 2.5 FORMULARIOS Y CONTACTO

#### TC-FORM-001: Newsletter Signup

**Pasos:**
1. En footer, ingresar email en campo newsletter
2. Click en "Suscribirse"

**Resultado Esperado:**
- Email registrado en `newsletter_subscribers`
- Toast: "Te has suscrito exitosamente"
- Email de bienvenida enviado (Brevo)
- Doble opt-in requerido

**Validations:**
- Email único (no duplicados)
- Validation de formato de email
- Consent timestamp registrado
- Status inicial: "pending" (hasta confirmar)

**Priority:** Medium
**Severity si falla:** Low
**Automation:** Yes (E2E + Unit)

---

#### TC-FORM-002: Formulario de Contacto

**Pasos:**
1. Navegar a `/contacto`
2. Completar formulario:
   - Nombre: "María González"
   - Email: "maria@example.com"
   - Asunto: "Consulta sobre tours"
   - Mensaje: "Quisiera información sobre tours privados para 10 personas"
3. Click en "Enviar mensaje"

**Resultado Esperado:**
- Mensaje enviado exitosamente
- Registro en `contact_forms`
- Email enviado al equipo de ventas
- Auto-respuesta enviada al usuario
- Mensaje de confirmación en pantalla

**Validations:**
- Todos los campos validados (Zod)
- reCAPTCHA v3 validado
- Email format válido
- Rate limiting: max 3 mensajes por hora por IP

**Priority:** High
**Severity si falla:** Medium
**Automation:** Yes (E2E)

---

#### TC-FORM-003: Verificación de Edad (Age Gate)

**Pasos:**
1. Primera visita al sitio (sin cookie)
2. Modal de verificación de edad aparece
3. Ingresar fecha de nacimiento: "15/03/1990"
4. Click en "Confirmar"

**Resultado Esperado:**
- Edad calculada: 35 años (>18)
- Modal se cierra
- Cookie "age_verified" seteado (expires: 30 días)
- Acceso completo al sitio

**Validations:**
- Cálculo de edad correcto
- Cookie httpOnly seteado
- Modal no aparece en siguientes visitas
- Acceso bloqueado si < 18 años

**Priority:** Critical (legal requirement)
**Severity si falla:** Critical
**Automation:** Yes (E2E)

---

#### TC-FORM-004: Review de Vino

**Preconditions:**
- Usuario autenticado
- Usuario compró el vino previamente

**Pasos:**
1. En página de detalle del vino
2. Click en "Escribir reseña"
3. Ingresar rating: 4 estrellas
4. Título: "Excelente vino, muy equilibrado"
5. Comentario: "Compré este vino para una cena y fue un éxito..."
6. Upload foto (opcional)
7. Submit

**Resultado Esperado:**
- Review creado y visible (después de moderación)
- Rating promedio del vino actualizado
- Email de agradecimiento enviado
- Review aparece en perfil de usuario

**Validations:**
- Record en `wine_reviews`
- User puede reviewear solo si compró
- Rating promedio recalculado
- Profanity filter aplicado
- Image uploaded a Cloudinary

**Priority:** Medium
**Severity si falla:** Low
**Automation:** Partial (sin upload de imagen)

---

### 2.6 BLOG Y CONTENIDO

#### TC-BLOG-001: Listado de Artículos

**Pasos:**
1. Navegar a `/blog`
2. Verificar artículos cargados
3. Aplicar filtro por categoría: "Maridaje"
4. Buscar: "Carmenere"

**Resultado Esperado:**
- Artículos paginados (12 por página)
- Filtros funcionales
- Búsqueda retorna resultados relevantes
- Preview con imagen, título, excerpt, fecha

**Validations:**
- API call: `GET /api/blog/posts`
- SEO friendly URLs
- Images optimizadas (Next.js Image)
- Pagination funcional

**Priority:** Medium
**Severity si falla:** Low
**Automation:** Yes (E2E)

---

#### TC-BLOG-002: Ver Artículo Completo

**Pasos:**
1. Click en artículo
2. Verificar contenido completo
3. Scroll hasta comentarios

**Resultado Esperado:**
- Artículo renderizado correctamente
- Table of contents generado (si aplica)
- Social share buttons funcionales
- Related articles mostrados
- Comment section cargado

**Validations:**
- Meta tags correctos (OpenGraph, Twitter)
- Structured data (JSON-LD)
- Reading time calculado
- View count incrementado

**Priority:** Medium
**Severity si falla:** Low
**Automation:** Yes (E2E + SEO validation)

---

### 2.7 USUARIO Y DASHBOARD

#### TC-USER-001: Dashboard Overview

**Preconditions:**
- Usuario autenticado

**Pasos:**
1. Navegar a `/dashboard`
2. Verificar widgets principales

**Resultado Esperado:**
- Información de usuario visible
- Resumen de órdenes recientes
- Próximas reservas
- Membresía activa (si aplica)
- Quick actions disponibles

**Validations:**
- API call: `GET /api/user/dashboard`
- Data correcta del usuario
- Stats actualizados
- Navigation sidebar funcional

**Priority:** High
**Severity si falla:** Medium
**Automation:** Yes (E2E)

---

#### TC-USER-002: Editar Perfil

**Pasos:**
1. Navegar a `/dashboard/perfil`
2. Actualizar información:
   - Teléfono
   - Dirección por defecto
3. Upload foto de perfil
4. Guardar cambios

**Resultado Esperado:**
- Cambios guardados exitosamente
- Toast: "Perfil actualizado"
- Foto de perfil visible en header
- Información reflejada en BD

**Validations:**
- API call: `PATCH /api/user/profile`
- Image uploaded a Cloudinary
- User record actualizado
- Avatar URL actualizado

**Priority:** Medium
**Severity si falla:** Low
**Automation:** Partial (sin image upload)

---

#### TC-USER-003: Historial de Pedidos

**Preconditions:**
- Usuario tiene pedidos previos

**Pasos:**
1. Navegar a `/dashboard/pedidos`
2. Ver lista de pedidos
3. Click en pedido específico
4. Descargar invoice

**Resultado Esperado:**
- Pedidos listados cronológicamente
- Estados visibles (Confirmado, En tránsito, Entregado)
- Detalle completo de cada pedido
- PDF invoice descargable

**Validations:**
- API call: `GET /api/user/orders`
- Pagination funcional
- Invoice PDF generado correctamente
- Tracking info visible

**Priority:** High
**Severity si falla:** Medium
**Automation:** Yes (E2E sin download PDF)

---

## 3. PLAN DE PRUEBAS POR FASE

### 3.1 FASE 1 - MVP (Pre-Launch Testing)

**Objetivo:** Validar funcionalidades críticas para el lanzamiento inicial

**Timeline:** 3 semanas

**Scope:**

#### Semana 1: Funcionalidades Core
- Autenticación completa (registro, login, OAuth)
- Age verification
- Catálogo de vinos (búsqueda, filtros, detalle)
- Carrito de compras
- Newsletter signup
- Formulario de contacto

**Test Types:**
- Unit tests: 80% coverage
- Integration tests: flujos completos de auth y carrito
- E2E tests: 3 happy paths críticos
- Manual exploratory: 8 horas

**Exit Criteria:**
- 0 bugs críticos
- < 3 bugs high
- Performance: LCP < 2.5s en home
- Accessibility: 0 errores críticos de axe

---

#### Semana 2: Transacciones y Reservas
- Checkout completo (envío + pago)
- Integración Transbank (sandbox)
- Creación de órdenes
- Email transaccional (Brevo)
- Reserva de tours
- Confirmaciones SMS (Twilio)

**Test Types:**
- Integration tests: payment flows
- E2E tests: compra completa end-to-end
- Security testing: OWASP top 10
- Manual testing: payment edge cases

**Exit Criteria:**
- 0 bugs críticos en flujos de pago
- Transacciones exitosas en sandbox
- Emails recibidos correctamente
- Stock management funcional

---

#### Semana 3: Usuario y Contenido
- Dashboard de usuario
- Historial de pedidos
- Edición de perfil
- Blog (listado y detalle)
- Galería
- Membresías (info, no pago recurrente en MVP)

**Test Types:**
- E2E tests: user journeys completos
- Cross-browser testing: Chrome, Firefox, Safari
- Responsive testing: mobile, tablet, desktop
- Performance testing: Lighthouse CI

**Exit Criteria:**
- Todos los browsers principales soportados
- Mobile experience sin bloqueos
- Performance score > 90
- SEO score > 95

---

### 3.2 FASE 2 - POST-MVP (Feature Enhancement)

**Timeline:** 2 meses post-launch

**New Features to Test:**

#### Mes 1
- Sistema de reviews completo (con moderación)
- Wishlist
- Comparador de vinos
- Recomendaciones personalizadas
- Advanced filters (sabor, cuerpo, añada)

**Testing Strategy:**
- Regression testing completo (no romper MVP)
- A/B testing setup para recomendaciones
- Performance impact assessment
- User acceptance testing con grupo beta

---

#### Mes 2
- Membresías con pagos recurrentes
- Programa de puntos/loyalty
- Gift cards
- Suscripciones de vinos
- Social features (compartir reviews)

**Testing Strategy:**
- Subscription testing (mock recurring payments)
- Integration tests para loyalty engine
- Security audit completo
- Load testing (500 usuarios concurrentes)

---

### 3.3 FASE 3 - ESCALADO (Growth Phase)

**Timeline:** 6 meses post-launch

**Focus Areas:**

#### Performance Optimization
- Load testing: 5,000 usuarios concurrentes
- Database query optimization
- CDN configuration validation
- Cache strategy testing
- API rate limiting under load

**Tools:**
- k6 para load testing
- New Relic para APM
- Database slow query analysis

---

#### Advanced Features
- Multi-idioma (ES/EN)
- Multi-currency
- Integración con ERP
- Advanced analytics
- Marketing automation

**Testing Strategy:**
- Localization testing (i18n)
- Currency conversion accuracy
- ERP integration tests
- Analytics event validation
- Marketing automation flows

---

### 3.4 Testing Matrix by Phase

| Feature | MVP | Post-MVP | Escalado |
|---------|-----|----------|----------|
| Autenticación | ✓ Full | Regression | Regression |
| Compra de vinos | ✓ Full | Regression + Wishlist | Multi-currency |
| Reservas de tours | ✓ Full | Advanced booking | Dynamic pricing |
| Membresías | Info only | ✓ Recurring payments | Loyalty program |
| Blog | ✓ Basic | Comments + Social | SEO optimization |
| Performance | Basic (LCP<2.5s) | Optimized (LCP<2s) | ✓ Full load test |
| Security | Basic audit | ✓ Full audit | Pentesting |
| Accessibility | WCAG AA | WCAG AAA | WCAG AAA |
| Mobile | Responsive | ✓ PWA | Native app |

---

## 4. TESTING ESPECÍFICO POR TIPO

### 4.1 CROSS-BROWSER TESTING

**Browsers Target:**

| Browser | Version | Priority | Coverage |
|---------|---------|----------|----------|
| Chrome | Latest + 2 prev | Critical | 100% |
| Firefox | Latest + 1 prev | High | 100% |
| Safari | Latest | High | 100% |
| Edge | Latest | Medium | 90% |
| Chrome Mobile | Latest | Critical | 100% |
| Safari iOS | Latest | Critical | 100% |

**Testing Strategy:**

1. **Automated (Playwright):**
   - Run same E2E tests en 5 browsers
   - Visual regression testing con screenshots
   - Parallel execution en CI/CD

2. **Manual Testing:**
   - Payment flows en cada browser
   - CSS/Layout verificación
   - JavaScript feature compatibility

3. **Tools:**
   - Playwright (automatizado)
   - BrowserStack (manual en devices reales)
   - Can I Use (feature support research)

**Known Issues to Watch:**
- Safari: localStorage en private mode
- Firefox: flexbox gap property
- Edge: CSS grid legacy syntax
- iOS Safari: 100vh issue con address bar

---

### 4.2 RESPONSIVE TESTING

**Breakpoints:**
```css
mobile: 320px - 767px
tablet: 768px - 1023px
desktop: 1024px - 1439px
wide: 1440px+
```

**Test Matrix:**

| Device Category | Test Devices | Key Checks |
|----------------|--------------|------------|
| Mobile | iPhone 13, Pixel 5, Galaxy S21 | Touch targets, scroll, forms |
| Tablet | iPad Air, Galaxy Tab | Horizontal layout, navigation |
| Desktop | 1366x768, 1920x1080 | Full features, hover states |
| Wide | 2560x1440+ | Max-width containers, spacing |

**Critical Checks per Device:**

#### Mobile (< 768px)
- [ ] Hamburger menu funcional
- [ ] Forms usables sin zoom
- [ ] Touch targets mínimo 44x44px
- [ ] Carrito accesible sticky
- [ ] Imágenes optimizadas para mobile
- [ ] Checkout en single column
- [ ] Product cards en grid 1-2 columns

#### Tablet (768px - 1023px)
- [ ] Navigation híbrido (expandido o colapsable)
- [ ] Grid 2-3 columns en catálogos
- [ ] Forms en 2 columnas cuando aplique
- [ ] Landscape mode optimizado

#### Desktop (1024px+)
- [ ] Full navigation visible
- [ ] Hover states funcionales
- [ ] Grid 3-4 columns
- [ ] Sidebars visibles
- [ ] Multi-step forms en side-by-side

**Testing Tools:**
- Chrome DevTools responsive mode
- Playwright emulation
- BrowserStack real devices
- Manual testing en devices físicos

---

### 4.3 ACCESSIBILITY TESTING

**Standard:** WCAG 2.1 Level AA

**Testing Checklist:**

#### Keyboard Navigation
- [ ] Tab order lógico en todas las páginas
- [ ] Skip to main content link
- [ ] Todos los interactive elements accesibles por teclado
- [ ] Focus indicators visibles (min 2px outline)
- [ ] Modals trapean focus correctamente
- [ ] Escape key cierra modals/dropdowns
- [ ] Enter/Space activan botones
- [ ] Arrow keys en menus y carousels

#### Screen Reader Compatibility
- [ ] Semantic HTML (header, nav, main, footer)
- [ ] Headings jerárquicos (H1 > H2 > H3)
- [ ] Alt text descriptivo en todas las imágenes
- [ ] ARIA labels en interactive components
- [ ] ARIA live regions para mensajes dinámicos
- [ ] Form labels asociados correctamente
- [ ] Error messages anunciados
- [ ] Loading states anunciados

#### Visual Accessibility
- [ ] Color contrast mínimo 4.5:1 (texto normal)
- [ ] Color contrast mínimo 3:1 (texto grande)
- [ ] No transmitir información solo por color
- [ ] Text resizable hasta 200% sin pérdida de funcionalidad
- [ ] No parpadeos > 3 veces por segundo
- [ ] Zoom browser hasta 400% funcional

#### Forms Accessibility
- [ ] Todos los campos con label visible
- [ ] Placeholders no reemplazan labels
- [ ] Required fields indicados claramente
- [ ] Error messages específicos y vinculados al campo
- [ ] Success messages anunciados
- [ ] Autocomplete attributes correctos

**Testing Tools:**

1. **Automated:**
```bash
npm install --save-dev @axe-core/playwright

# En test file:
import { injectAxe, checkA11y } from '@axe-core/playwright'

test('Homepage is accessible', async ({ page }) => {
  await page.goto('/')
  await injectAxe(page)
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: { html: true }
  })
})
```

2. **Manual:**
- NVDA (Windows) - free
- JAWS (Windows) - commercial
- VoiceOver (macOS/iOS) - built-in
- ChromeVox extension

3. **Browser Extensions:**
- axe DevTools
- WAVE
- Lighthouse

**Priority Issues:**

| Level | Examples | Fix Timeline |
|-------|----------|--------------|
| Critical | Keyboard trap, no alt text en imágenes principales | Immediate |
| High | Poor contrast, missing form labels | 1 week |
| Medium | Non-semantic HTML, missing ARIA | 2 weeks |
| Low | Enhancement suggestions | Backlog |

---

### 4.4 PERFORMANCE TESTING

**Core Web Vitals Targets:**

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | < 2.5s | 75th percentile |
| FID (First Input Delay) | < 100ms | 75th percentile |
| CLS (Cumulative Layout Shift) | < 0.1 | 75th percentile |
| FCP (First Contentful Paint) | < 1.8s | 75th percentile |
| TTI (Time to Interactive) | < 3.8s | 75th percentile |
| TBT (Total Blocking Time) | < 300ms | 75th percentile |

**Pages to Test:**

1. **Home (/)**
   - Target: LCP < 2s
   - Hero image optimized
   - Critical CSS inlined
   - No render-blocking resources

2. **Product Listing (/vinos)**
   - Target: LCP < 2.5s
   - Lazy loading de imágenes
   - Virtual scrolling si > 100 productos
   - API response < 500ms

3. **Product Detail (/vinos/[slug])**
   - Target: LCP < 2s
   - Image gallery optimized
   - Related products lazy loaded
   - SSG para productos populares

4. **Checkout (/checkout)**
   - Target: TTI < 3s
   - Form validation instantánea
   - Minimal JavaScript
   - Payment SDK lazy loaded

**Testing Strategy:**

#### 1. Synthetic Monitoring (Lighthouse CI)

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/vinos',
        'http://localhost:3000/vinos/carmenere-reserva-2020',
        'http://localhost:3000/experiencias',
        'http://localhost:3000/checkout'
      ],
      numberOfRuns: 5,
      settings: {
        preset: 'desktop',
        throttling: {
          cpuSlowdownMultiplier: 1
        }
      }
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
```

#### 2. Real User Monitoring (RUM)

**Setup con Next.js:**
```typescript
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
```

**Track custom metrics:**
```typescript
// lib/performance.ts
export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Send to analytics
  if (metric.label === 'web-vital') {
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true
    })
  }
}
```

#### 3. Load Testing (k6)

**Script de ejemplo:**
```javascript
// loadtest/buy-wine-flow.js
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up to 100 users
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 500 },  // Spike to 500 users
    { duration: '5m', target: 500 },  // Stay at 500 users
    { duration: '2m', target: 0 }     // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.01']    // Error rate < 1%
  }
}

export default function() {
  // Homepage
  let res = http.get('https://vinasantacruz.com')
  check(res, { 'homepage status 200': (r) => r.status === 200 })
  sleep(1)

  // Wine catalog
  res = http.get('https://vinasantacruz.com/api/wines')
  check(res, { 'wines api status 200': (r) => r.status === 200 })
  sleep(2)

  // Wine detail
  res = http.get('https://vinasantacruz.com/api/wines/carmenere-reserva-2020')
  check(res, { 'wine detail status 200': (r) => r.status === 200 })
  sleep(3)

  // Add to cart (requires auth token)
  const payload = JSON.stringify({
    wineId: 'carmenere-reserva-2020',
    quantity: 2
  })

  res = http.post('https://vinasantacruz.com/api/cart/items', payload, {
    headers: { 'Content-Type': 'application/json' }
  })

  check(res, { 'add to cart status 201': (r) => r.status === 201 })
  sleep(1)
}
```

**Run load test:**
```bash
k6 run --out json=results.json loadtest/buy-wine-flow.js
```

#### 4. Database Performance

**Queries to Monitor:**
```sql
-- Slow query log
SELECT * FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 20;

-- Missing indexes
SELECT schemaname, tablename, attname, n_distinct, correlation
FROM pg_stats
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
AND n_distinct > 100
AND correlation < 0.1;
```

**Key Metrics:**
- Query response time: < 100ms (p95)
- Connection pool utilization: < 70%
- Index hit ratio: > 99%
- Cache hit ratio: > 95%

---

### 4.5 SECURITY TESTING

**Security Checklist:**

#### Authentication & Authorization
- [ ] Passwords hasheados con bcrypt (min 10 rounds)
- [ ] JWT tokens con expiración corta (15 min access, 7d refresh)
- [ ] Refresh token rotation implementado
- [ ] Session invalidation en logout
- [ ] Rate limiting en login (5 intentos/15 min)
- [ ] Account lockout después de 5 intentos fallidos
- [ ] OAuth tokens validados correctamente
- [ ] RBAC implementado (user, member, admin)
- [ ] Protected API routes requieren auth

#### Input Validation
- [ ] Server-side validation en todas las APIs
- [ ] SQL injection prevention (parametrized queries)
- [ ] XSS prevention (sanitize input, escape output)
- [ ] CSRF tokens en forms
- [ ] File upload validation (type, size, content)
- [ ] Email validation y sanitization
- [ ] Phone number validation
- [ ] Credit card validation (PCI-DSS compliant)

#### Data Protection
- [ ] HTTPS enforced (redirect HTTP to HTTPS)
- [ ] Secure cookies (httpOnly, secure, sameSite)
- [ ] Sensitive data encrypted at rest
- [ ] PII data masked en logs
- [ ] Database credentials en environment variables
- [ ] API keys no expuestos en frontend
- [ ] .env files en .gitignore
- [ ] Secrets management con vault

#### Payment Security
- [ ] PCI-DSS compliance (use payment provider SDKs)
- [ ] No almacenar CVV
- [ ] Tokenización de tarjetas
- [ ] 3D Secure habilitado
- [ ] Transacciones loggeadas
- [ ] Fraud detection activo
- [ ] Refund policy clara
- [ ] Webhook signatures validadas

#### API Security
- [ ] Rate limiting por IP y por usuario
- [ ] API versioning implementado
- [ ] CORS configurado correctamente
- [ ] Request size limits (prevent DoS)
- [ ] Response time monitoring (detect attacks)
- [ ] API keys rotados periódicamente
- [ ] Endpoint authentication
- [ ] Input/output schema validation

#### Dependencies
- [ ] npm audit sin vulnerabilidades high/critical
- [ ] Dependencias actualizadas regularmente
- [ ] Snyk monitoring activo
- [ ] License compliance verificado
- [ ] No usar deprecated packages

**Testing Tools:**

1. **OWASP ZAP (Automated Scanning)**
```bash
# Docker run
docker run -t owasp/zap2docker-stable zap-baseline.py \
  -t https://vinasantacruz.com \
  -r zap-report.html
```

2. **Manual Penetration Testing**

**SQL Injection Test:**
```
Input: admin' OR '1'='1
Expected: Input rejected, query parametrized
```

**XSS Test:**
```html
Input: <script>alert('XSS')</script>
Expected: Script tags escaped/sanitized
```

**CSRF Test:**
```
1. Login to app
2. Open malicious site that makes POST request
3. Expected: Request rejected (no CSRF token)
```

3. **npm audit**
```bash
npm audit --audit-level=moderate
npm audit fix
```

4. **Security Headers Check**
```bash
curl -I https://vinasantacruz.com
```

**Expected headers:**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Security Testing Schedule:**

| Test Type | Frequency | Owner |
|-----------|-----------|-------|
| npm audit | Every PR | CI/CD |
| OWASP ZAP scan | Weekly | QA Team |
| Manual penetration | Pre-release | Security Team |
| Dependency updates | Monthly | DevOps |
| Security audit completo | Quarterly | External Auditor |

---

### 4.6 LOCALIZATION TESTING (si aplica)

**Languages:** Español (ES), Inglés (EN)

**Testing Checklist:**

#### Content Translation
- [ ] Todas las strings traducidas
- [ ] No hardcoded text en componentes
- [ ] Pluralization rules correctas
- [ ] Date/time formats localizados
- [ ] Currency format correcto
- [ ] Phone number format regional

#### Layout & UI
- [ ] Text no truncado en diferentes idiomas
- [ ] Buttons con ancho suficiente
- [ ] RTL support (si aplica árabe/hebreo)
- [ ] Line height adecuado para idiomas
- [ ] Font support para caracteres especiales

#### Functional Testing
- [ ] Language switcher funcional
- [ ] Preferencia guardada en cookie
- [ ] URLs localizadas (/es/, /en/)
- [ ] SEO meta tags por idioma
- [ ] Emails en idioma correcto
- [ ] PDF invoices localizadas

**Tools:**
- next-intl o react-i18next
- Format.js para pluralization
- date-fns para dates localizados

---

## 5. TEST DATA STRATEGY

### 5.1 Database Seeds

**Objetivo:** Datos consistentes y realistas para testing

**Estructura de Seeds:**

```
seeds/
├── 01_users.sql
├── 02_wines.sql
├── 03_tours.sql
├── 04_blog_posts.sql
├── 05_memberships.sql
├── 06_orders.sql
├── 07_reservations.sql
├── 08_reviews.sql
└── 09_gallery.sql
```

**Seed Data Requirements:**

#### Users (10 test accounts)
```sql
-- seeds/01_users.sql
INSERT INTO users (email, password_hash, first_name, last_name, role, email_verified, age_verified) VALUES
-- Regular user (verified)
('user@test.com', '$2a$10$...', 'Juan', 'Pérez', 'user', true, true),
-- Member Gold
('member@test.com', '$2a$10$...', 'María', 'González', 'user', true, true),
-- Admin
('admin@test.com', '$2a$10$...', 'Admin', 'User', 'admin', true, true),
-- Unverified user
('unverified@test.com', '$2a$10$...', 'Pedro', 'Silva', 'user', false, false),
-- User with orders
('buyer@test.com', '$2a$10$...', 'Ana', 'López', 'user', true, true);
```

**Password for all:** `TestPass123!`

#### Wines (30 productos)
```sql
-- seeds/02_wines.sql
-- 10 tintos, 8 blancos, 6 rosados, 6 espumantes
-- Variedad de precios: $8.000 - $150.000
-- Stock variado: 0 (out of stock), 5 (low stock), 50+ (available)
-- Diferentes regiones: Valle de Colchagua, Casablanca, Maipo, etc.
-- Reviews y ratings variados
```

#### Tours (8 experiencias)
```sql
-- seeds/03_tours.sql
-- Tour clásico, premium, privado
-- Teleférico, museo, cata de vinos
-- Precios variados
-- Availability schedules
```

#### Orders (20 órdenes de prueba)
- Estados variados: pending, paid, shipped, delivered, cancelled
- Diferentes métodos de pago
- Órdenes de usuario de prueba
- Fechas distribuidas en últimos 3 meses

#### Reservations (15 reservas)
- Próximas y pasadas
- Estados: confirmed, pending, cancelled
- Diferentes tours

---

### 5.2 Mock Data para APIs Externas

**MSW (Mock Service Worker) Setup:**

```typescript
// mocks/handlers.ts
import { rest } from 'msw'

export const handlers = [
  // Mock Transbank
  rest.post('https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions',
    (req, res, ctx) => {
      return res(
        ctx.json({
          token: 'mock_token_12345',
          url: 'http://localhost:3000/api/payments/transbank/callback'
        })
      )
    }
  ),

  // Mock Brevo (email)
  rest.post('https://api.brevo.com/v3/smtp/email', (req, res, ctx) => {
    return res(
      ctx.json({
        messageId: 'mock_message_id'
      })
    )
  }),

  // Mock Twilio (SMS)
  rest.post('https://api.twilio.com/2010-04-01/Accounts/:accountSid/Messages.json',
    (req, res, ctx) => {
      return res(
        ctx.json({
          sid: 'mock_sms_sid',
          status: 'sent'
        })
      )
    }
  ),

  // Mock Cloudinary
  rest.post('https://api.cloudinary.com/v1_1/:cloudName/image/upload',
    (req, res, ctx) => {
      return res(
        ctx.json({
          secure_url: 'https://res.cloudinary.com/mock/image.jpg',
          public_id: 'mock_image_id'
        })
      )
    }
  ),

  // Mock Google OAuth
  rest.post('https://oauth2.googleapis.com/token', (req, res, ctx) => {
    return res(
      ctx.json({
        access_token: 'mock_google_token',
        id_token: 'mock_id_token'
      })
    )
  })
]
```

**MSW Setup:**
```typescript
// tests/setup.ts
import { setupServer } from 'msw/node'
import { handlers } from '../mocks/handlers'

export const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---

### 5.3 Test Environments Configuration

#### 1. Local Development
```env
# .env.local
DATABASE_URL=postgresql://postgres:password@localhost:5432/vinasantacruz_dev
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development

# Mock integrations
USE_MOCK_PAYMENT=true
USE_MOCK_EMAIL=true
USE_MOCK_SMS=true
```

#### 2. CI/CD Testing
```env
# .env.test
DATABASE_URL=postgresql://postgres:password@localhost:5432/vinasantacruz_test
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=test

# Always use mocks in CI
USE_MOCK_PAYMENT=true
USE_MOCK_EMAIL=true
USE_MOCK_SMS=true
USE_MOCK_STORAGE=true
```

#### 3. Staging
```env
# .env.staging
DATABASE_URL=postgresql://user:pass@staging-db.com:5432/vinasantacruz_staging
NEXT_PUBLIC_API_URL=https://staging.vinasantacruz.com/api
NODE_ENV=production

# Use sandbox/test modes for integrations
TRANSBANK_ENV=integration
BREVO_API_KEY=staging_key
TWILIO_TEST_MODE=true
CLOUDINARY_FOLDER=staging
```

#### 4. Production
```env
# .env.production (secured in Vercel)
DATABASE_URL=postgresql://user:pass@prod-db.com:5432/vinasantacruz_prod
NEXT_PUBLIC_API_URL=https://vinasantacruz.com/api
NODE_ENV=production

# Production credentials (never commit)
TRANSBANK_ENV=production
BREVO_API_KEY=<secret>
TWILIO_ACCOUNT_SID=<secret>
CLOUDINARY_CLOUD_NAME=<secret>
```

---

### 5.4 Test Accounts

#### User Accounts

| Email | Password | Role | Membership | Purpose |
|-------|----------|------|------------|---------|
| user@test.com | TestPass123! | user | None | Basic user testing |
| member-bronze@test.com | TestPass123! | user | Bronze | Bronze member benefits |
| member-silver@test.com | TestPass123! | user | Silver | Silver member benefits |
| member-gold@test.com | TestPass123! | user | Gold | Gold member benefits |
| member-platinum@test.com | TestPass123! | user | Platinum | Platinum member benefits |
| buyer@test.com | TestPass123! | user | None | User with order history |
| admin@test.com | TestPass123! | admin | None | Admin panel testing |
| unverified@test.com | TestPass123! | user | None | Email verification flow |

#### Payment Test Cards (Transbank Integration Environment)

| Card Number | CVV | Expiry | Expected Result |
|-------------|-----|--------|-----------------|
| 4051 8856 0000 0007 | 123 | 12/25 | Approved |
| 5186 0059 0000 0009 | 123 | 12/25 | Approved |
| 4051 8842 3000 0212 | 123 | 12/25 | Rejected |

---

## 6. CI/CD INTEGRATION

### 6.1 GitHub Actions Workflow

**File:** `.github/workflows/test.yml`

```yaml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  # Unit and Integration Tests
  unit-integration-tests:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: vinasantacruz_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run database migrations
        run: npm run db:migrate
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/vinasantacruz_test

      - name: Seed test database
        run: npm run db:seed:test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/vinasantacruz_test

      - name: Run unit tests
        run: npm run test:unit -- --coverage
        env:
          NODE_ENV: test

      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/vinasantacruz_test
          NODE_ENV: test

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          files: ./coverage/coverage-final.json
          flags: unittests
          name: codecov-umbrella

      - name: Check coverage thresholds
        run: npm run test:coverage:check

  # E2E Tests
  e2e-tests:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: vinasantacruz_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Setup database
        run: |
          npm run db:migrate
          npm run db:seed:test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/vinasantacruz_test

      - name: Build Next.js app
        run: npm run build
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/vinasantacruz_test

      - name: Run Playwright tests
        run: npm run test:e2e
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/vinasantacruz_test
          BASE_URL: http://localhost:3000

      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

  # Lighthouse Performance Tests
  lighthouse:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js app
        run: npm run build

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

      - name: Upload Lighthouse results
        uses: actions/upload-artifact@v3
        with:
          name: lighthouse-results
          path: .lighthouseci/

  # Security Scan
  security:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Run npm audit
        run: npm audit --audit-level=moderate

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

      - name: OWASP Dependency-Check
        uses: dependency-check/Dependency-Check_Action@main
        with:
          project: 'vinasantacruz'
          path: '.'
          format: 'HTML'

      - name: Upload Dependency-Check results
        uses: actions/upload-artifact@v3
        with:
          name: dependency-check-report
          path: reports/

  # Accessibility Tests
  accessibility:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js app
        run: npm run build

      - name: Run accessibility tests
        run: npm run test:a11y

      - name: Upload axe results
        uses: actions/upload-artifact@v3
        with:
          name: axe-results
          path: axe-results/

  # Type Checking
  typecheck:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run TypeScript type check
        run: npm run typecheck

      - name: Run ESLint
        run: npm run lint

  # Build Verification
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js app
        run: npm run build

      - name: Check build size
        run: |
          npm run analyze
          node scripts/check-bundle-size.js
```

---

### 6.2 Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",

    "test": "vitest",
    "test:unit": "vitest run --config vitest.config.unit.ts",
    "test:integration": "vitest run --config vitest.config.integration.ts",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:a11y": "playwright test --grep @a11y",
    "test:coverage": "vitest run --coverage",
    "test:coverage:check": "node scripts/check-coverage.js",
    "test:watch": "vitest",

    "lighthouse": "lhci autorun",
    "analyze": "ANALYZE=true next build",

    "db:migrate": "node scripts/migrate.js",
    "db:seed": "node scripts/seed.js",
    "db:seed:test": "node scripts/seed-test.js",
    "db:reset": "node scripts/reset-db.js",

    "typecheck": "tsc --noEmit",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",

    "precommit": "lint-staged",
    "prepare": "husky install"
  }
}
```

---

### 6.3 Pre-commit Hooks (Husky + Lint-staged)

**Setup:**
```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

**Configuration:**
```json
// package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "vitest related --run"
    ],
    "*.{json,md,yml}": [
      "prettier --write"
    ]
  }
}
```

---

### 6.4 Regression Testing Strategy

**Objetivo:** Detectar que nuevos cambios no rompan funcionalidad existente

**Approach:**

1. **Automated Regression Suite**
   - Ejecutar TODOS los tests en cada PR
   - Suite completa en merge a develop/main
   - Visual regression testing con Playwright screenshots

2. **Smoke Tests (Critical Paths)**
   - Ejecutar después de cada deploy
   - 5-10 minutos máximo
   - Cubrir flujos críticos:
     - Login
     - Compra de vino
     - Reserva de tour
     - Newsletter signup

3. **Visual Regression Testing**

**Setup con Playwright:**
```typescript
// tests/visual-regression.spec.ts
import { test, expect } from '@playwright/test'

test('Homepage visual regression', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    maxDiffPixels: 100
  })
})

test('Wine catalog visual regression', async ({ page }) => {
  await page.goto('/vinos')
  await expect(page).toHaveScreenshot('wine-catalog.png', {
    fullPage: true
  })
})
```

4. **Database Migration Testing**
   - Test migrations en staging antes de producción
   - Rollback plan documentado
   - Data integrity checks post-migration

---

### 6.5 Pre-deployment Checklist

**Automated Checks (CI/CD):**
- [ ] All tests passing (unit, integration, E2E)
- [ ] Coverage thresholds met (>80%)
- [ ] Lighthouse scores passing (>90)
- [ ] No security vulnerabilities (npm audit)
- [ ] Build successful
- [ ] Type checking passed
- [ ] Linting passed
- [ ] Bundle size within limits

**Manual Checks (QA Team):**
- [ ] Smoke tests passed in staging
- [ ] Critical user flows tested manually
- [ ] Payment flows tested (sandbox)
- [ ] Emails received correctly
- [ ] SMS notifications working
- [ ] Cross-browser testing completed
- [ ] Mobile testing completed
- [ ] Accessibility audit passed

**DevOps Checks:**
- [ ] Database migrations tested in staging
- [ ] Environment variables configured
- [ ] Secrets rotated if needed
- [ ] Backup strategy verified
- [ ] Rollback plan ready
- [ ] Monitoring alerts configured
- [ ] CDN cache invalidation plan
- [ ] DNS configured correctly

**Business Checks:**
- [ ] Stakeholder approval
- [ ] Legal compliance verified (age gate, privacy policy)
- [ ] Content reviewed and approved
- [ ] Pricing verified
- [ ] Terms and conditions updated
- [ ] Customer support team notified

---

## 7. BUG TRACKING Y REPORTING

### 7.1 Bug Report Template

**Title Format:** `[COMPONENT] Brief description of issue`

**Example:** `[Checkout] Payment fails when using discount code`

---

**Bug Report Template:**

```markdown
## Bug Summary
Brief, clear description of the issue

## Severity
- [ ] Critical (P0) - Production down, data loss, security breach
- [ ] High (P1) - Major functionality broken, workaround difficult
- [ ] Medium (P2) - Functionality impaired, workaround available
- [ ] Low (P3) - Minor issue, cosmetic, enhancement

## Priority
- [ ] Urgent - Fix immediately
- [ ] High - Fix in current sprint
- [ ] Medium - Fix in next sprint
- [ ] Low - Backlog

## Environment
- **URL:** https://vinasantacruz.com/checkout
- **Environment:** Production / Staging / Local
- **Browser:** Chrome 120.0.6099.109
- **OS:** Windows 11
- **Device:** Desktop / Mobile (iPhone 13)
- **User Role:** Authenticated user / Guest / Member Gold
- **Date/Time:** 2025-11-18 14:30 CLT

## Steps to Reproduce
1. Login as user@test.com
2. Add "Carmenere Reserva 2020" to cart
3. Navigate to checkout
4. Enter discount code "MEMBER15"
5. Click "Apply discount"
6. Click "Proceed to payment"
7. Select Transbank as payment method
8. Click "Pay"

## Expected Behavior
- Discount should be applied to total
- Payment should process successfully
- Order confirmation page should display

## Actual Behavior
- Discount code shows as "applied" but total doesn't change
- When clicking "Pay", error appears: "Invalid transaction amount"
- Payment fails and user stuck on checkout

## Screenshots/Videos
[Attach screenshots or screen recording]

## Console Errors
```javascript
Uncaught TypeError: Cannot read property 'total' of undefined
    at calculateTotal (checkout.tsx:156)
    at handlePayment (checkout.tsx:234)
```

## Network Logs
```
POST /api/payments/create 400 Bad Request
Response: {
  "error": "Invalid amount",
  "details": "Amount cannot be negative"
}
```

## Additional Context
- Issue started after deploy on 2025-11-17
- Affects only discount codes with > 10% discount
- Workaround: Remove discount code and payment works

## Related Issues
- Possibly related to #234 (Discount calculation bug)

## Assigned To
@backend-team

## Labels
`bug`, `checkout`, `payment`, `high-priority`
```

---

### 7.2 Severity Definitions

| Severity | Definition | Response Time | Examples |
|----------|------------|---------------|----------|
| **Critical (P0)** | System down, data loss, security breach | Immediate (< 1 hour) | - Site completely down<br>- Payment data exposed<br>- SQL injection vulnerability<br>- All orders failing |
| **High (P1)** | Major functionality broken, no workaround | Same day (< 4 hours) | - Checkout completely broken<br>- Users can't login<br>- Emails not sending<br>- Product images not loading |
| **Medium (P2)** | Functionality impaired, workaround exists | 2-3 days | - Filter not working on wine catalog<br>- Newsletter signup fails occasionally<br>- Discount code not applying<br>- Review submission slow |
| **Low (P3)** | Minor issue, cosmetic, enhancement | Next sprint (1-2 weeks) | - Button alignment off by 2px<br>- Typo in content<br>- Tooltip not showing<br>- Console warning message |

---

### 7.3 Bug Lifecycle

```
[New] → [Triaged] → [In Progress] → [Fixed] → [Testing] → [Verified] → [Closed]
                   ↘                                         ↓
                    [Rejected]                          [Reopened]
```

**Status Definitions:**

- **New:** Bug just reported, not yet reviewed
- **Triaged:** Bug reviewed, severity/priority assigned
- **In Progress:** Developer actively working on fix
- **Fixed:** Code fix completed, pushed to branch
- **Testing:** QA team testing the fix
- **Verified:** QA confirmed fix works
- **Closed:** Bug resolved and deployed
- **Rejected:** Not a bug, working as intended, or won't fix
- **Reopened:** Fix didn't work, issue persists

---

### 7.4 Bug Tracking Tool Configuration

**Recommended Tool:** GitHub Issues + Projects

**Labels Configuration:**

```yaml
# Type
- bug
- enhancement
- feature-request
- documentation
- question

# Severity
- severity:critical
- severity:high
- severity:medium
- severity:low

# Priority
- priority:urgent
- priority:high
- priority:medium
- priority:low

# Component
- component:frontend
- component:backend
- component:database
- component:api
- component:payment
- component:email
- component:auth

# Status
- status:new
- status:triaged
- status:in-progress
- status:needs-info
- status:blocked
- status:testing
- status:verified

# Browser/Device
- browser:chrome
- browser:firefox
- browser:safari
- device:mobile
- device:tablet
- device:desktop
```

**GitHub Issue Template:**

```yaml
# .github/ISSUE_TEMPLATE/bug_report.yml
name: Bug Report
description: Report a bug or issue
title: "[BUG] "
labels: ["bug", "status:new"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to report this bug!

  - type: dropdown
    id: severity
    attributes:
      label: Severity
      options:
        - Critical (P0)
        - High (P1)
        - Medium (P2)
        - Low (P3)
    validations:
      required: true

  - type: dropdown
    id: environment
    attributes:
      label: Environment
      options:
        - Production
        - Staging
        - Local Development
    validations:
      required: true

  - type: input
    id: url
    attributes:
      label: URL where bug occurs
      placeholder: https://vinasantacruz.com/...
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      description: Clear steps to reproduce the issue
      placeholder: |
        1. Go to...
        2. Click on...
        3. See error...
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What should happen?
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: What actually happens?
    validations:
      required: true

  - type: textarea
    id: logs
    attributes:
      label: Console Errors / Logs
      description: Any relevant error messages
      render: javascript

  - type: input
    id: browser
    attributes:
      label: Browser
      placeholder: Chrome 120.0.6099.109

  - type: input
    id: os
    attributes:
      label: Operating System
      placeholder: Windows 11 / macOS Sonoma / iOS 17
```

---

### 7.5 Defect Metrics Dashboard

**Key Metrics to Track:**

1. **Bug Discovery Rate**
   - Bugs found per sprint
   - Bugs found per release
   - Trend over time

2. **Bug Resolution Time**
   - Average time to fix by severity
   - Time in each status
   - SLA compliance

3. **Bug Distribution**
   - By component
   - By severity
   - By browser/device

4. **Escape Rate**
   - Bugs found in production vs staging
   - Bugs that reach customers

5. **Reopen Rate**
   - Percentage of bugs reopened
   - Indicates quality of fixes

**Example Dashboard Query (GitHub API):**
```javascript
// Get bug metrics
const metrics = {
  totalBugs: issues.filter(i => i.labels.includes('bug')).length,
  criticalBugs: issues.filter(i => i.labels.includes('severity:critical')).length,
  averageResolutionTime: calculateAverageTime(closedBugs),
  reopenRate: (reopenedBugs / closedBugs) * 100,
  escapeRate: (productionBugs / totalBugs) * 100
}
```

---

### 7.6 Root Cause Analysis (RCA) Template

**For Critical and High Severity Bugs:**

```markdown
# Root Cause Analysis

## Bug ID
#1234

## Title
Checkout payment failure with discount codes

## Date Reported
2025-11-18

## Impact
- 47 customers affected
- $38,500 in lost revenue (estimated)
- 127 customer support tickets

## Timeline
- **2025-11-17 18:00:** Deploy v2.3.0 to production
- **2025-11-17 19:15:** First customer report of payment failure
- **2025-11-17 19:30:** Support team escalates issue
- **2025-11-17 19:45:** Dev team notified
- **2025-11-17 20:00:** Issue identified
- **2025-11-17 20:30:** Hotfix deployed
- **2025-11-17 20:45:** Issue resolved

## Root Cause
In commit abc123, discount calculation logic was refactored.
A negative sign was added incorrectly, causing total to become
negative when discount exceeded 10%.

```typescript
// BEFORE (correct)
const total = subtotal - discount

// AFTER (bug)
const total = subtotal + (-discount)  // Wrong: double negative
```

## Why It Wasn't Caught
- Unit tests existed but tested only positive values
- Integration tests didn't include discount codes > 10%
- E2E tests used only small discount codes
- Code review missed the logic change

## Fix Implemented
1. Corrected calculation logic
2. Added unit tests for edge cases (discount > subtotal)
3. Added E2E test with 50% discount code
4. Updated code review checklist

## Preventive Measures
1. **Testing:** Add test cases for all discount ranges (0-100%)
2. **Code Review:** Math changes require extra reviewer
3. **Monitoring:** Add alert for negative order amounts
4. **Deployment:** Require smoke tests before releasing to 100%

## Action Items
- [ ] Update test suite with edge cases (@qa-team, due: 2025-11-20)
- [ ] Add monitoring alert (@devops, due: 2025-11-19)
- [ ] Review and update code review guidelines (@tech-lead, due: 2025-11-22)
- [ ] Training session on discount logic (@team, due: 2025-11-25)

## Lessons Learned
- Always test boundary conditions
- Math changes are high-risk
- Need better pre-deploy validation
```

---

## 8. APÉNDICES

### 8.1 Testing Glossary

**Terms:**

- **Acceptance Criteria:** Conditions that must be met for a feature to be considered complete
- **Black Box Testing:** Testing without knowledge of internal implementation
- **Code Coverage:** Percentage of code executed by tests
- **E2E Testing:** Testing complete user workflows from start to finish
- **Flaky Test:** Test that sometimes passes and sometimes fails without code changes
- **Happy Path:** Expected user flow without errors
- **Integration Testing:** Testing interactions between components
- **Mock:** Simulated object that mimics real object behavior
- **Regression Testing:** Re-running tests to ensure new changes didn't break existing functionality
- **Smoke Testing:** Quick tests to verify basic functionality
- **Stub:** Simple implementation of an interface used for testing
- **Test Fixture:** Fixed state used as baseline for tests
- **Unit Testing:** Testing individual functions or components in isolation
- **White Box Testing:** Testing with knowledge of internal implementation

---

### 8.2 Useful Testing Commands

```bash
# Run all tests
npm test

# Run specific test file
npm test src/components/WineCard.test.tsx

# Run tests matching pattern
npm test --grep "checkout"

# Run tests in watch mode
npm test --watch

# Run tests with coverage
npm test --coverage

# Run E2E tests
npm run test:e2e

# Run E2E in headed mode (see browser)
npm run test:e2e -- --headed

# Run specific E2E test
npm run test:e2e -- checkout.spec.ts

# Debug E2E test
npm run test:e2e -- --debug

# Run Lighthouse
npm run lighthouse

# Check bundle size
npm run analyze

# Database commands
npm run db:migrate
npm run db:seed
npm run db:reset

# Lint and format
npm run lint
npm run lint:fix
npm run format
```

---

### 8.3 Resources

**Documentation:**
- [Vitest Docs](https://vitest.dev/)
- [Playwright Docs](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [Next.js Testing](https://nextjs.org/docs/testing)

**Learning:**
- [Kent C. Dodds - Testing JavaScript](https://testingjavascript.com/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Web.dev - Web Vitals](https://web.dev/vitals/)

**Tools:**
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [OWASP ZAP](https://www.zaproxy.org/)
- [k6 Load Testing](https://k6.io/)

---

### 8.4 Contact and Escalation

**QA Team:**
- Lead QA: qa-lead@vinasantacruz.com
- QA Engineers: qa-team@vinasantacruz.com

**Escalation Path:**
1. Level 1: QA Engineer
2. Level 2: QA Lead
3. Level 3: Tech Lead / CTO

**Critical Bug Notification:**
- Slack: #critical-bugs
- Email: urgent@vinasantacruz.com
- Phone: +56 9 XXXX XXXX (on-call engineer)

---

## CONCLUSIÓN

Este plan de QA proporciona una estrategia completa y accionable para asegurar la calidad del proyecto Viña Santa Cruz.

**Próximos Pasos:**
1. Review y aprobación de este plan por stakeholders
2. Setup de herramientas y frameworks recomendados
3. Creación de test data y seeds
4. Implementación de suite de tests por fase
5. Configuración de CI/CD pipeline
6. Training del equipo en mejores prácticas de testing

**Métricas de Éxito:**
- 80%+ code coverage
- 0 bugs críticos en producción en primer mes
- Performance score > 90 en Lighthouse
- WCAG 2.1 AA compliance
- < 1% error rate en flujos críticos

---

**Versión:** 1.0
**Última actualización:** 2025-11-18
**Mantenido por:** QA Team
**Próxima revisión:** 2025-12-18
