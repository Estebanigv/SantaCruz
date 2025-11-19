# SEO QUICK REFERENCE - VIÑA SANTA CRUZ
## Guía Rápida de Implementación

---

## META TAGS - PÁGINAS PRINCIPALES

### HOME PAGE
```html
<title>Viña Santa Cruz | Vinos Premium Valle del Maipo | Chile</title>
<meta name="description" content="Descubre vinos excepcionales del Valle del Maipo. Tours enológicos exclusivos, degustaciones privadas y enoturismo de lujo. Viña 100% sustentable.">

<!-- Open Graph -->
<meta property="og:title" content="Viña Santa Cruz | Vinos Premium del Valle del Maipo">
<meta property="og:description" content="Cuatro generaciones elaborando vinos excepcionales. Tours exclusivos, experiencias memorables y compromiso sustentable.">
<meta property="og:image" content="https://vinasantacruz.cl/images/og-home.jpg">
<meta property="og:url" content="https://vinasantacruz.cl">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Viña Santa Cruz | Vinos Premium Valle del Maipo">
<meta name="twitter:description" content="Cuatro generaciones de excelencia vinícola. Experiencias inolvidables en el corazón del Valle del Maipo.">
<meta name="twitter:image" content="https://vinasantacruz.cl/images/twitter-card-home.jpg">
```

### VINOS (CATEGORÍA)
```html
<title>Vinos Premium Valle del Maipo | Comprar Online | Santa Cruz</title>
<meta name="description" content="Explora vinos chilenos excepcionales. Carmenere, Cabernet, Syrah de viñedos propios. Envío gratis sobre $50.000. Reservas limitadas disponibles.">
<link rel="canonical" href="https://vinasantacruz.cl/vinos">
```

### PRODUCTO INDIVIDUAL
```html
<title>Carmenere Gran Reserva 2020 Valle del Maipo | $22.990</title>
<meta name="description" content="Carmenere excepcional de viñedos de 40 años. 92 puntos Descorchados. Notas de moras, chocolate y especias. Crianza 14 meses en roble. Compra online.">
<link rel="canonical" href="https://vinasantacruz.cl/vinos/carmenere-gran-reserva-2020">
```

### EXPERIENCIAS
```html
<title>Tours de Vino Valle del Maipo | Experiencias Premium | Chile</title>
<meta name="description" content="Tours enológicos exclusivos y experiencias vinícolas inolvidables. Degustaciones privadas, teleférico panorámico y museo del vino. Grupos reducidos.">
```

### HISTORIA
```html
<title>Nuestra Historia | Viña Familiar 4 Generaciones | Chile</title>
<meta name="description" content="46 años de tradición familiar en el Valle del Maipo. Cuatro generaciones dedicadas a elaborar vinos excepcionales con pasión, innovación y sustentabilidad.">
```

### SUSTENTABILIDAD
```html
<title>Viña Sustentable Carbon Negative | Vino Orgánico Chile 2024</title>
<meta name="description" content="Primera viña carbon negative de Chile. 60% orgánico certificado, 100% energía renovable, biodiversidad protegida. Compromiso real con futuras generaciones.">
```

---

## ESTRUCTURA H1-H3 POR PÁGINA

### HOME
```
H1: Descubre el Alma del Valle del Maipo

H2: Vinos que Celebran Nuestro Terroir
H2: Experiencias Vinícolas Inolvidables
  H3: Sumérgete en el Mundo del Vino
  H3: Vistas que Inspiran, Historia que Fascina
H2: Club Santa Cruz: Tu Pasaporte al Mundo del Vino
  H3: Membresía Bronce – Inicia tu Viaje
  H3: Membresía Plata – Eleva tu Experiencia
  H3: Membresía Oro – Privilegios Excepcionales
  H3: Membresía Diamante – Exclusividad Absoluta
H2: El Terroir que nos Define
H2: Compromiso con Nuestro Futuro
```

### VINOS (CATEGORÍA)
```
H1: Nuestra Colección de Vinos

H2: Línea Reserva – Excelencia Cotidiana
H2: Línea Gran Reserva – Complejidad Refinada
H2: Línea Reserva Especial – Arte Embotellado

H3: Carmenere: El Embajador de Chile
H3: Cabernet Sauvignon: Majestuosidad del Valle
H3: Syrah: Intensidad con Elegancia
H3: Malbec: Potencia Aterciopelada
H3: Sauvignon Blanc: Frescura Cristalina
H3: Chardonnay: Elegancia Versátil
```

### PRODUCTO INDIVIDUAL
```
H1: Viña Santa Cruz Carmenere Gran Reserva Valle del Maipo 2020

H2: La Esencia del Terroir Chileno en su Máxima Expresión
H2: Notas de Cata del Enólogo
  H3: Proceso de Elaboración
H2: Ficha Técnica
  H3: Potencial de Guarda
  H3: Temperatura de Servicio
H2: Maridajes Recomendados
H2: Premios y Reconocimientos
```

---

## KEYWORDS PRINCIPALES

### Transaccionales (Alta Prioridad)
1. comprar vino carmenere online chile
2. vino reserva valle del maipo precio
3. vinos chilenos premium envío gratis
4. tour viñedos valle del maipo precio
5. visita bodega degustación chile
6. cabernet sauvignon gran reserva chile

### Informacionales (Autoridad)
1. diferencia entre reserva y gran reserva vino
2. cómo elegir vino tinto calidad
3. maridaje vino tinto carnes
4. qué significa crianza en barrica
5. temperatura servir vino tinto
6. mejores viñas para visitar chile

### Diferenciador (Nicho)
1. vino orgánico chile certificado
2. viticultura sustentable chile
3. viña carbono neutral chile
4. vino biodinámico qué es
5. experiencias vendimia chile

---

## SCHEMA MARKUP - TEMPLATES ESENCIALES

### Organization (Homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "Winery",
  "name": "Viña Santa Cruz",
  "url": "https://vinasantacruz.cl",
  "logo": "https://vinasantacruz.cl/images/logo.png",
  "description": "Viña familiar del Valle del Maipo con 46 años de tradición.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Camino Santa Cruz Km 47",
    "addressLocality": "Valle del Maipo",
    "addressRegion": "Región Metropolitana",
    "addressCountry": "CL"
  },
  "telephone": "+56-2-2345-6789",
  "email": "contacto@vinasantacruz.cl",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "350"
  }
}
```

### Product (Vino Individual)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Viña Santa Cruz Carmenere Gran Reserva 2020",
  "description": "Carmenere excepcional de viñedos de 40 años.",
  "image": "https://vinasantacruz.cl/images/carmenere-2020.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Viña Santa Cruz"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://vinasantacruz.cl/vinos/carmenere-gran-reserva-2020",
    "priceCurrency": "CLP",
    "price": "22990",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "67"
  }
}
```

### BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://vinasantacruz.cl"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Vinos",
      "item": "https://vinasantacruz.cl/vinos"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Carmenere Gran Reserva 2020",
      "item": "https://vinasantacruz.cl/vinos/carmenere-gran-reserva-2020"
    }
  ]
}
```

---

## INTERNAL LINKING STRATEGY

### Estructura de Silos
```
HOME
├── VINOS
│   ├── Reserva
│   ├── Gran Reserva
│   ├── Reserva Especial
│   └── [Productos individuales]
├── EXPERIENCIAS
│   ├── Tours
│   ├── Catas
│   ├── Teleférico/Museo
│   └── Eventos Privados
├── CLUB SANTA CRUZ
│   ├── Bronce
│   ├── Plata
│   ├── Oro
│   └── Diamante
├── HISTORIA
├── SUSTENTABILIDAD
└── BLOG
```

### Anchor Text Distribution
- 30% Branded: "Viña Santa Cruz", "Santa Cruz"
- 25% Partial Match: "vinos premium del valle"
- 20% Exact Match: "vino carmenere valle del maipo"
- 15% Related: "experiencias vinícolas"
- 10% Generic: "ver más", "descubrir"

### Links por Página
- Homepage: 15-20 outbound links
- Hub Pages: 10-15 outbound links
- Product Pages: 5-8 outbound links
- Blog Posts: 5-10 outbound links

---

## IMAGE OPTIMIZATION

### File Naming
```
Formato: [marca]-[producto]-[descriptor]-[dimension].extension

✓ vina-santa-cruz-carmenere-gran-reserva-2020-botella-800x1200.jpg
✓ tour-clasico-vinedos-grupo-caminando-1920x1080.jpg
✓ valle-maipo-vinedos-atardecer-hero-1920x1080.webp

✗ IMG_12345.jpg
✗ foto-nueva-final-v2.jpg
```

### Alt Text
```
Formato: [Acción] + [Objeto] + [Contexto] + [Marca]

✓ "Botella Viña Santa Cruz Carmenere Gran Reserva 2020 Valle del Maipo"
✓ "Grupo turistas caminando entre hileras vides centenarias Viña Santa Cruz"
✓ "Copa vino tinto con viñedos Valle del Maipo y montañas Andes al fondo"

✗ "imagen de vino"
✗ "carmenere"
```

### Dimensiones Estándar
- Hero images: 1920x1080px
- Product images: 800x1200px o 1000x1000px
- Thumbnails: 400x400px
- OG images: 1200x630px

### Compresión
- Formato: WebP (primary), JPEG (fallback)
- Tamaño máximo: 200KB por imagen
- Quality: 80-85 para JPEG

---

## TECHNICAL SEO CHECKLIST

### URLs
```
✓ https://vinasantacruz.cl/vinos/carmenere-gran-reserva-2020
✓ https://vinasantacruz.cl/experiencias/tour-clasico

✗ https://vinasantacruz.cl/p?id=12345
✗ https://vinasantacruz.cl/producto.php?name=carmenere
```

### Canonical Tags
```html
<link rel="canonical" href="https://vinasantacruz.cl/vinos/carmenere-gran-reserva-2020">
```

### Hreflang (Multilingüe)
```html
<link rel="alternate" hreflang="es" href="https://vinasantacruz.cl/vinos">
<link rel="alternate" hreflang="en" href="https://vinasantacruz.cl/en/wines">
<link rel="alternate" hreflang="x-default" href="https://vinasantacruz.cl/en/wines">
```

### Robots.txt
```
User-agent: *
Disallow: /admin/
Disallow: /carrito/
Disallow: /checkout/
Allow: /vinos/
Allow: /experiencias/
Allow: /blog/

Sitemap: https://vinasantacruz.cl/sitemap.xml
```

### XML Sitemap Priority
- Homepage: 1.0
- Category Pages: 0.9
- Top Products: 0.8-0.9
- Standard Products: 0.7
- Blog Posts: 0.6
- Supporting Pages: 0.5

---

## CONTENT LENGTH GUIDELINES

| Tipo de Página | Mínimo | Ideal | Máximo |
|----------------|--------|-------|--------|
| Homepage | 800 | 1200-1500 | 2000 |
| Categoría Vinos | 600 | 800-1200 | 1800 |
| Producto Individual | 350 | 450-600 | 800 |
| Experiencia | 400 | 600-800 | 1200 |
| Blog Educativo | 1500 | 2000-2500 | 3500 |
| Historia | 1000 | 1500-2000 | 2500 |
| Sustentabilidad | 1200 | 1800-2200 | 3000 |

---

## KEYWORD PLACEMENT CHECKLIST

Para cada página, asegurar que la primary keyword aparezca en:

- [ ] Title tag
- [ ] H1 (exact o partial match)
- [ ] Primer párrafo (primeras 100 palabras)
- [ ] Al menos un H2
- [ ] Meta description
- [ ] URL slug
- [ ] Alt text imagen principal
- [ ] Último párrafo

**Keyword Density Target:** 0.8-1.5% (natural)

---

## CORE WEB VITALS TARGETS

### LCP (Largest Contentful Paint)
- **Target:** ≤ 2.5 segundos
- **Acciones:**
  - Hero images en WebP <200KB
  - Lazy load imágenes below fold
  - CDN para assets
  - Preload imágenes críticas

### FID (First Input Delay)
- **Target:** ≤ 100 milisegundos
- **Acciones:**
  - Defer JavaScript non-critical
  - Minimize JS execution time
  - Code splitting

### CLS (Cumulative Layout Shift)
- **Target:** ≤ 0.1
- **Acciones:**
  - Width/height en todas las imágenes
  - Reservar espacio para embeds
  - Font display: swap

---

## MOBILE OPTIMIZATION

### Touch Targets
- Mínimo: 44x44px
- Spacing: 8px entre elementos
- CTAs principales: 48x48px

### Font Sizes Mobile
- Body text: 16px mínimo
- H1: 24px
- H2: 20px
- H3: 18px
- Line height: 1.5-1.6

---

## IMPLEMENTATION ROADMAP

### Semana 1-2: Foundation
- [ ] Implementar estructura HTML semántica
- [ ] Configurar meta tags páginas principales
- [ ] Crear y submeter sitemaps XML
- [ ] Implementar robots.txt
- [ ] Configurar canonical tags

### Semana 3-4: On-Page
- [ ] Optimizar headings todas las páginas
- [ ] Mejorar content length páginas delgadas
- [ ] Implementar schema markup básico
- [ ] Optimizar imágenes (compression, alt text)
- [ ] Internal linking contextual

### Semana 5-8: Content
- [ ] Publicar primeros 8 blog posts
- [ ] Crear pillar pages
- [ ] Expandir descripciones productos top 10
- [ ] Agregar FAQ sections

### Semana 9-10: Technical
- [ ] Optimizar Core Web Vitals
- [ ] Implementar CDN
- [ ] Mobile optimization audit
- [ ] Structured data testing

### Semana 11-12: Monitoring
- [ ] Setup Google Search Console
- [ ] Setup Google Analytics 4
- [ ] Dashboard SEO KPIs
- [ ] Primera iteración A/B testing

---

## MONITORING KPIs

### Rankings (Semanal)
- Top 10 keywords
- Keywords objetivo (15-20)
- Tool: Google Search Console + Ahrefs

### Tráfico Orgánico (Semanal)
- Sessions
- Users
- Pageviews
- Bounce rate
- Avg. session duration

### Conversiones (Diario)
- Tasa conversión productos
- Tasa conversión experiencias
- Newsletter signups
- Form submissions

### Técnico (Mensual)
- Core Web Vitals
- Crawl errors
- Index coverage
- Mobile usability

---

## RECURSOS ADICIONALES

**Documentos Relacionados:**
- `SEO_OPTIMIZATION_COMPLETE.md` - Especificaciones completas
- `CONTENIDO_PREMIUM.md` - Copy optimizado por página
- `ESTRATEGIA_CONTENIDO.md` - Guidelines de brand voice

**Herramientas Recomendadas:**
- Google Search Console (free)
- Google Analytics 4 (free)
- PageSpeed Insights (free)
- Schema Markup Generator (free)
- Ahrefs o SEMrush (paid)
- Screaming Frog SEO Spider (freemium)

---

**Última actualización:** 18 Noviembre 2025
**Versión:** 1.0
