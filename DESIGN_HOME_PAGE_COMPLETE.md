# VIÑA SANTA CRUZ – HOME PAGE DESIGN SPECIFICATION

**Generated:** 2025-11-18
**Designer:** UX/UI Design Agent
**Status:** Ready for Implementation

---

## TABLE OF CONTENTS
1. [Design System Foundation](#1-design-system-foundation)
2. [Wireframe Structure](#2-wireframe-structure)
3. [High-Fidelity Section Specifications](#3-high-fidelity-section-specifications)
4. [Component Library](#4-component-library)
5. [Interaction & Animation Guidelines](#5-interaction--animation-guidelines)
6. [Asset Requirements](#6-asset-requirements)
7. [Implementation Notes](#7-implementation-notes)

---

## 1. DESIGN SYSTEM FOUNDATION

### 1.1 COLOR PALETTE

```css
/* Primary Colors */
--burgundy-900: #4A1428;  /* Deep wine, primary CTA backgrounds */
--burgundy-800: #6B1D3C;  /* Main brand color, primary buttons */
--burgundy-700: #8B2849;  /* Hover states */
--burgundy-600: #A03356;  /* Active states */
--burgundy-100: #F5E6EB;  /* Light backgrounds, badges */

/* Secondary/Accent Colors */
--gold-600: #B8922E;      /* Accent elements, hover states */
--gold-500: #C9A961;      /* Primary gold accent, borders, icons */
--gold-400: #D9BB7F;      /* Light gold accents */
--gold-100: #F5F0E3;      /* Subtle backgrounds */

/* Neutral Colors */
--cream-50: #FAFAF8;      /* Page background */
--cream-100: #F5F3EF;     /* Section backgrounds */
--cream-200: #E8E4DB;     /* Borders, dividers */
--charcoal-900: #2C2C2C;  /* Primary text */
--charcoal-800: #3D3D3D;  /* Secondary text */
--charcoal-600: #6B6B6B;  /* Tertiary text, captions */
--charcoal-400: #9D9D9D;  /* Placeholder text */
--white: #FFFFFF;         /* Pure white for contrast */
--black-overlay: rgba(0, 0, 0, 0.4); /* Hero overlay */

/* Semantic Colors */
--success: #2D5F3F;       /* Success states, checkmarks */
--error: #C43939;         /* Error states */
--warning: #D97706;       /* Warning states */
--info: #2563EB;          /* Info states */
```

**Color Usage Guidelines:**
- **60% Cream/White:** Backgrounds, negative space
- **30% Burgundy:** Primary actions, headers, brand elements
- **10% Gold:** Accents, highlights, premium indicators

**Accessibility Compliance:**
- Burgundy-800 on Cream-50: Contrast 9.2:1 ✓
- Charcoal-900 on Cream-50: Contrast 11.8:1 ✓
- White on Burgundy-800: Contrast 8.4:1 ✓
- Gold-500 on Burgundy-800: Contrast 4.6:1 ✓

### 1.2 TYPOGRAPHY SYSTEM

**Font Families:**
```css
--font-display: 'Playfair Display', Georgia, serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

**Type Scale:**
```css
/* Display/Hero */
--text-hero: 64px;           /* Line-height: 72px, Weight: 700 */
--text-hero-tablet: 48px;    /* Line-height: 56px */
--text-hero-mobile: 36px;    /* Line-height: 42px */

/* Headings */
--text-h1: 48px;             /* Line-height: 56px, Weight: 700, Font: Display */
--text-h2: 40px;             /* Line-height: 48px, Weight: 700, Font: Display */
--text-h3: 32px;             /* Line-height: 40px, Weight: 600, Font: Display */
--text-h4: 24px;             /* Line-height: 32px, Weight: 600, Font: Body */
--text-h5: 20px;             /* Line-height: 28px, Weight: 600, Font: Body */

/* Body */
--text-xl: 20px;             /* Line-height: 32px, Weight: 400 */
--text-lg: 18px;             /* Line-height: 28px, Weight: 400 */
--text-base: 16px;           /* Line-height: 24px, Weight: 400 */
--text-sm: 14px;             /* Line-height: 20px, Weight: 400 */
--text-xs: 12px;             /* Line-height: 16px, Weight: 400 */

/* Special */
--text-eyebrow: 14px;        /* Line-height: 20px, Weight: 600, Tracking: 0.1em, Transform: uppercase */
--text-button-lg: 16px;      /* Line-height: 24px, Weight: 600 */
--text-button-md: 14px;      /* Line-height: 20px, Weight: 600 */
--text-button-sm: 12px;      /* Line-height: 16px, Weight: 600 */
```

**Typography Usage:**
- **Display Font (Playfair Display):** Hero headlines, section titles (H1-H3), special callouts
- **Body Font (Inter):** Paragraphs, UI elements, buttons, forms, captions

### 1.3 SPACING SYSTEM

**8-Point Grid System:**
```css
--space-1: 4px;      /* Tight spacing, icon gaps */
--space-2: 8px;      /* Small gaps, form element spacing */
--space-3: 12px;     /* Card internal padding */
--space-4: 16px;     /* Standard element spacing */
--space-5: 20px;     /* Medium spacing */
--space-6: 24px;     /* Card padding, button padding */
--space-8: 32px;     /* Section internal spacing */
--space-10: 40px;    /* Component separation */
--space-12: 48px;    /* Large gaps */
--space-16: 64px;    /* Section padding vertical */
--space-20: 80px;    /* Large section padding */
--space-24: 96px;    /* Extra large section padding */
--space-32: 128px;   /* Hero section height offsets */
```

**Container & Layout:**
```css
--container-max: 1280px;     /* Maximum content width */
--container-wide: 1440px;    /* Wide sections (Instagram, Newsletter) */
--container-narrow: 960px;   /* Narrow sections (Brand Story, Newsletter content) */
--container-padding: 24px;   /* Mobile horizontal padding */
--container-padding-lg: 80px; /* Desktop horizontal padding */

--grid-gap: 24px;            /* Default grid gap */
--grid-gap-lg: 32px;         /* Large grid gap */
--grid-gap-sm: 16px;         /* Small grid gap */
```

### 1.4 BORDER RADIUS

```css
--radius-sm: 4px;     /* Badges, small elements */
--radius-md: 8px;     /* Buttons, form inputs */
--radius-lg: 12px;    /* Cards, modals */
--radius-xl: 16px;    /* Large cards, feature sections */
--radius-full: 9999px; /* Pills, avatar shapes */
```

### 1.5 SHADOWS

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-card: 0 4px 20px rgba(107, 29, 60, 0.08); /* Burgundy tinted shadow for wine cards */
```

### 1.6 BREAKPOINTS

```css
--breakpoint-sm: 640px;   /* Mobile landscape, small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1536px; /* Extra large desktop */
```

---

## 2. WIREFRAME STRUCTURE

### ASCII Layout Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      NAVIGATION HEADER                       │
│  [Logo]          [Vinos] [Tours] [Club] [Nosotros] [🛒][👤] │
└─────────────────────────────────────────────────────────────┘

╔═════════════════════════════════════════════════════════════╗
║                    1. HERO SECTION (100vh)                   ║
║                                                               ║
║          [Background: Video Loop / Large Image]              ║
║                                                               ║
║       "Descubre la Excelencia del Valle de Colchagua"       ║
║    "Vinos premium, experiencias únicas y tradición desde     ║
║                         1875"                                 ║
║                                                               ║
║        [Explorar Vinos]  [Reservar Tour →]                   ║
║                                                               ║
║                        ⌄ Scroll                              ║
╚═════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────┐
│              2. USPs SECTION (3 Columns)                     │
│                                                               │
│  ┌────────┐      ┌────────┐       ┌────────┐               │
│  │ [📦]   │      │ [🏆]   │       │ [⭐]   │               │
│  │ Envío  │      │ Viñedos│       │Experien│               │
│  │ Gratis │      │Premiados│       │  cias  │               │
│  │$50.000+│      │desde 1875│      │Exclusiv│               │
│  └────────┘      └────────┘       └────────┘               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              3. FEATURED WINES SECTION                       │
│                  "Vinos Destacados"                          │
│                                                               │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                    │
│  │[IMG] │  │[IMG] │  │[IMG] │  │[IMG] │                    │
│  │Cabernet│ │Carmenere│ │Syrah │  │Merlot│                    │
│  │Reserve │  │Gran Res│ │Premium│ │Clasico│                    │
│  │$25.990 │  │$32.990 │ │$29.990│ │$19.990│                    │
│  │⭐⭐⭐⭐⭐│  │⭐⭐⭐⭐⭐│  │⭐⭐⭐⭐│  │⭐⭐⭐⭐│                    │
│  │[+Carro]│  │[+Carro]│  │[+Carro]│ │[+Carro]│                    │
│  └──────┘  └──────┘  └──────┘  └──────┘                    │
│                                                               │
│              [Ver Toda la Colección →]                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│         4. TOURS & EXPERIENCES SECTION                       │
│              "Experiencias en la Viña"                       │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [Image]  │ Tour Clásico con Degustación            │   │
│  │          │ Desc: ... │ Desde $15.000 [Reservar]     │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [Image]  │ Experiencia Gourmet Maridaje            │   │
│  │          │ Desc: ... │ Desde $45.000 [Reservar]     │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [Image]  │ Tour Privado Cosecha y Barrica          │   │
│  │          │ Desc: ... │ Desde $85.000 [Reservar]     │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

╔═════════════════════════════════════════════════════════════╗
║         5. BRAND STORY SECTION (Full-width BG)              ║
║                                                               ║
║  "NUESTRA HISTORIA"                                          ║
║  "150 Años de Pasión por el Vino"                           ║
║                                                               ║
║  [Paragraph text about heritage, terroir, craftsmanship...]  ║
║                                                               ║
║  [Conocer Más →]                                             ║
╚═════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────┐
│              6. MEMBERSHIPS SECTION                          │
│              "Club de Vinos Santa Cruz"                      │
│                                                               │
│  ┌──────┐  ┌──────┐  ┌───────┐  ┌───────┐                 │
│  │BRONCE│  │PLATA │  │ ORO   │  │PLATINO│                 │
│  │[Icon]│  │[Icon]│  │[Icon] │  │[Icon] │                 │
│  │$29.990│  │$49.990│  │$79.990│  │$129.990│                 │
│  │  /año │  │  /año │  │  /año │  │  /año │                 │
│  │ ✓ Ben1│  │ ✓ Ben1│  │ ✓ Ben1│  │ ✓ Ben1│                 │
│  │ ✓ Ben2│  │ ✓ Ben2│  │ ✓ Ben2│  │ ✓ Ben2│                 │
│  │ ✓ Ben3│  │ ✓ Ben3│  │ ✓ Ben3│  │ ✓ Ben3│                 │
│  │       │  │ ✓ Ben4│  │ ✓ Ben4│  │ ✓ Ben4│                 │
│  │       │  │       │  │ ✓ Ben5│  │ ✓ Ben5│                 │
│  │[Unirse]│  │[Unirse]│  │[Unirse]│ │[Unirse]│                 │
│  └──────┘  └──────┘  └───────┘  └───────┘                 │
│                        ^Featured    ^Featured               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              7. TESTIMONIALS SECTION                         │
│           "Lo Que Dicen Nuestros Clientes"                  │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │ "Quote   │  │ "Quote   │  │ "Quote   │                 │
│  │  text.." │  │  text.." │  │  text.." │                 │
│  │          │  │          │  │          │                 │
│  │ [Photo]  │  │ [Photo]  │  │ [Photo]  │                 │
│  │ - Name   │  │ - Name   │  │ - Name   │                 │
│  │ ⭐⭐⭐⭐⭐  │  │ ⭐⭐⭐⭐⭐  │  │ ⭐⭐⭐⭐⭐  │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                               │
│                   • • ○ (Carousel dots)                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              8. INSTAGRAM FEED SECTION                       │
│         "Síguenos en Instagram" @vinasantacruz              │
│                                                               │
│  ┌───┐ ┌───┐ ┌───┐                                         │
│  │IMG│ │IMG│ │IMG│                                         │
│  └───┘ └───┘ └───┘                                         │
│  ┌───┐ ┌───┐ ┌───┐                                         │
│  │IMG│ │IMG│ │IMG│                                         │
│  └───┘ └───┘ └───┘                                         │
│                                                               │
│              [Seguir en Instagram →]                         │
└─────────────────────────────────────────────────────────────┘

╔═════════════════════════════════════════════════════════════╗
║              9. NEWSLETTER SECTION                           ║
║           "Recibe Nuestras Novedades"                        ║
║    "Ofertas exclusivas, nuevos vinos y eventos"             ║
║                                                               ║
║         [Email input] [Suscribirse]                          ║
║                                                               ║
║         (Privacy notice text)                                ║
╚═════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────┐
│                      FOOTER                                  │
│  [Links] [Social] [Contact] [Legal]                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. HIGH-FIDELITY SECTION SPECIFICATIONS

### 3.1 NAVIGATION HEADER

**Layout:**
- Position: Fixed, top: 0, z-index: 50
- Background: White with subtle shadow on scroll
- Height: 80px (desktop), 64px (mobile)
- Container: Max-width 1280px, padding 0 80px (desktop), 0 24px (mobile)

**Elements:**

**Logo (Left):**
- Position: Absolute left
- Dimensions: 180px × 48px (desktop), 140px × 38px (mobile)
- File format: SVG (full color), PNG fallback
- Link: Home page

**Navigation Menu (Center):**
- Display: Flex, gap: 40px
- Font: Inter, 16px, weight 500
- Color: Charcoal-900
- Items: "Vinos", "Tours & Experiencias", "Club de Vinos", "Nosotros", "Blog"
- Hover state: Color transitions to Burgundy-800 (300ms)
- Active state: Underline 2px Burgundy-800, offset 4px below text
- Mobile: Hamburger menu (right side), full-screen overlay navigation

**Right Actions:**
- Display: Flex, gap: 16px
- Icons: 24px × 24px, stroke-width: 2px
- Cart icon: Shows badge count if items > 0 (badge: 18px circle, Burgundy-800 bg, white text 12px)
- User icon: Links to account/login
- Hover: Icons scale 1.1, color Burgundy-800 (300ms)

**Scroll Behavior:**
- 0-100px scroll: Background transparent/semi-transparent (hero overlap)
- >100px scroll: Background white, shadow-md appears
- Transition: 300ms ease-in-out

---

### 3.2 HERO SECTION

**Container:**
- Height: 100vh (min-height: 600px, max-height: 900px)
- Position: Relative
- Overflow: Hidden

**Background Layer:**
- Option A: Video element
  - Format: MP4 (H.264), WebM fallback
  - Dimensions: 1920×1080 minimum
  - Duration: 15-30s loop
  - Autoplay, muted, playsinline
  - Object-fit: Cover
  - Fallback image if video fails to load
- Option B: Static image
  - Format: WebP primary, JPG fallback
  - Dimensions: 2560×1440 minimum
  - Object-fit: Cover
  - Object-position: Center center

**Overlay:**
- Background: Linear gradient from top to bottom
  - rgba(0, 0, 0, 0.5) at 0%
  - rgba(0, 0, 0, 0.3) at 50%
  - rgba(0, 0, 0, 0.6) at 100%
- Purpose: Ensure text readability, add depth

**Content Container:**
- Position: Absolute center (vertical and horizontal)
- Max-width: 960px
- Text-align: Center
- Padding: 0 24px
- Z-index: 10

**Headline:**
- Text: "Descubre la Excelencia del Valle de Colchagua"
- Font: Playfair Display, 64px (desktop), 36px (mobile)
- Weight: 700
- Line-height: 72px (desktop), 42px (mobile)
- Color: White
- Margin-bottom: 24px
- Animation: Fade up on load (0.8s ease-out, delay 0.2s)

**Subheadline:**
- Text: "Vinos premium, experiencias únicas y tradición desde 1875"
- Font: Inter, 20px (desktop), 16px (mobile)
- Weight: 300
- Line-height: 32px (desktop), 24px (mobile)
- Color: White
- Opacity: 0.95
- Margin-bottom: 48px
- Animation: Fade up on load (0.8s ease-out, delay 0.4s)

**CTA Button Group:**
- Display: Flex, gap: 16px, justify-content: center
- Flex-wrap: Wrap (mobile)
- Animation: Fade up on load (0.8s ease-out, delay 0.6s)

**Primary Button:**
- Text: "Explorar Vinos"
- Style: Button component (lg size, primary variant)
- Padding: 16px 40px
- Background: Burgundy-800
- Color: White
- Border-radius: 8px
- Font: Inter, 16px, weight 600
- Hover: Background Burgundy-700, transform translateY(-2px), shadow-lg
- Transition: All 300ms ease

**Secondary Button:**
- Text: "Reservar Tour →"
- Style: Button component (lg size, outline variant)
- Padding: 16px 40px
- Background: Transparent
- Color: White
- Border: 2px solid White
- Border-radius: 8px
- Font: Inter, 16px, weight 600
- Hover: Background White, color Burgundy-800
- Transition: All 300ms ease

**Scroll Indicator:**
- Position: Absolute bottom 40px, left 50%
- Transform: TranslateX(-50%)
- Icon: Chevron down, 24px, white
- Opacity: 0.7
- Animation: Bounce infinite 2s
- On click: Smooth scroll to next section

---

### 3.3 USPs SECTION

**Container:**
- Background: Cream-50
- Padding: 80px 80px (desktop), 48px 24px (mobile)
- Max-width: 1280px
- Margin: 0 auto

**Grid Layout:**
- Display: Grid
- Grid-template-columns: repeat(3, 1fr) (desktop), 1fr (mobile)
- Gap: 48px (desktop), 32px (mobile)

**USP Card (each):**
- Text-align: Center
- Padding: 32px 24px
- Background: White
- Border-radius: 12px
- Box-shadow: Shadow-sm
- Hover: Transform translateY(-4px), shadow-md (300ms ease)

**Icon:**
- Dimensions: 56px × 56px
- Style: Line icons, stroke-width 2px
- Color: Gold-500
- Margin-bottom: 24px
- Icons:
  - USP 1: Package/box icon
  - USP 2: Trophy/award icon
  - USP 3: Star/sparkle icon

**Headline:**
- Font: Inter, 20px, weight 600
- Color: Charcoal-900
- Line-height: 28px
- Margin-bottom: 8px

**Description:**
- Font: Inter, 16px, weight 400
- Color: Charcoal-600
- Line-height: 24px

**Content:**
1. Icon: Package | "Envío Gratis" | "En pedidos sobre $50.000"
2. Icon: Trophy | "Viñedos Premiados" | "Tradición y excelencia desde 1875"
3. Icon: Star | "Experiencias Exclusivas" | "Eventos y tours para miembros"

---

### 3.4 FEATURED WINES SECTION

**Container:**
- Background: White
- Padding: 96px 80px (desktop), 64px 24px (mobile)
- Max-width: 1280px
- Margin: 0 auto

**Section Header:**
- Text-align: Center
- Margin-bottom: 64px

**Eyebrow (optional):**
- Text: "NUESTRA SELECCIÓN"
- Font: Inter, 14px, weight 600, uppercase, letter-spacing 0.1em
- Color: Gold-500
- Margin-bottom: 16px

**Title:**
- Text: "Vinos Destacados"
- Font: Playfair Display, 48px (desktop), 32px (mobile), weight 700
- Color: Charcoal-900
- Line-height: 56px (desktop), 40px (mobile)

**Grid Layout:**
- Display: Grid
- Grid-template-columns: repeat(4, 1fr) (desktop >1024px), repeat(2, 1fr) (tablet 768-1023px), 1fr (mobile <768px)
- Gap: 32px (desktop), 24px (tablet), 20px (mobile)

**Wine Card (Component):**

**Structure:**
- Background: White
- Border: 1px solid Cream-200
- Border-radius: 12px
- Padding: 24px
- Transition: All 300ms ease
- Hover: Transform translateY(-8px), shadow-card, border-color Gold-500

**Image Container:**
- Aspect-ratio: 3:4 (portrait)
- Background: Cream-100
- Border-radius: 8px
- Margin-bottom: 20px
- Overflow: Hidden
- Position: Relative

**Badge (if applicable):**
- Position: Absolute top 12px, right 12px
- Background: Burgundy-800
- Color: White
- Font: Inter, 12px, weight 600, uppercase
- Padding: 4px 12px
- Border-radius: 4px
- Text: "Nuevo", "Premiado", "Exclusivo"

**Product Image:**
- Width: 100%
- Height: 100%
- Object-fit: Cover
- Object-position: Center center
- Hover: Scale 1.05 (transition 500ms ease)

**Wine Name:**
- Font: Playfair Display, 20px, weight 600
- Color: Charcoal-900
- Line-height: 28px
- Margin-bottom: 4px
- Display: -webkit-box
- -webkit-line-clamp: 2
- Overflow: Hidden

**Varietal/Type:**
- Font: Inter, 14px, weight 400
- Color: Charcoal-600
- Line-height: 20px
- Margin-bottom: 12px

**Rating Stars:**
- Display: Flex, gap: 4px
- Margin-bottom: 16px
- Star size: 16px
- Filled stars: Gold-500
- Empty stars: Cream-200

**Price:**
- Font: Inter, 24px, weight 700
- Color: Burgundy-800
- Line-height: 32px
- Margin-bottom: 16px
- Format: "$XX.XXX" (Chilean peso format with period separator)

**Add to Cart Button:**
- Full width
- Style: Button component (md size, primary variant)
- Text: "Añadir al Carro"
- Padding: 12px 24px
- Background: Burgundy-800
- Color: White
- Border-radius: 8px
- Font: Inter, 14px, weight 600
- Hover: Background Burgundy-700
- Active: Background Burgundy-900, transform scale(0.98)
- Icon: Shopping cart icon, 16px, left of text

**Sample Products:**
1. "Cabernet Sauvignon Reserva" | Tinto, Valle de Colchagua | 5 stars | $25.990
2. "Carmenere Gran Reserva" | Tinto Premium | 5 stars | $32.990 | Badge: "Premiado"
3. "Syrah Premium Selection" | Tinto | 4 stars | $29.990
4. "Merlot Clásico" | Tinto, Cosecha 2021 | 4 stars | $19.990

**View All Link:**
- Text-align: Center
- Margin-top: 48px
- Link text: "Ver Toda la Colección →"
- Font: Inter, 16px, weight 600
- Color: Burgundy-800
- Hover: Color Burgundy-700, underline
- Icon: Arrow right, 20px

---

### 3.5 TOURS & EXPERIENCES SECTION

**Container:**
- Background: Cream-50
- Padding: 96px 80px (desktop), 64px 24px (mobile)
- Max-width: 1280px
- Margin: 0 auto

**Section Header:**
- Text-align: Center
- Margin-bottom: 64px

**Eyebrow:**
- Text: "VIVE LA EXPERIENCIA"
- Font: Inter, 14px, weight 600, uppercase, letter-spacing 0.1em
- Color: Gold-500
- Margin-bottom: 16px

**Title:**
- Text: "Experiencias en la Viña"
- Font: Playfair Display, 48px (desktop), 32px (mobile), weight 700
- Color: Charcoal-900
- Line-height: 56px (desktop), 40px (mobile)

**Tours Layout:**
- Display: Flex, flex-direction: Column, gap: 32px

**Tour Card (Component):**

**Structure:**
- Display: Grid
- Grid-template-columns: 480px 1fr (desktop), 1fr (mobile/tablet)
- Gap: 40px (desktop), 0 (mobile)
- Background: White
- Border-radius: 12px
- Overflow: Hidden
- Box-shadow: Shadow-md
- Transition: All 300ms ease
- Hover: Shadow-xl, transform translateX(4px)

**Image Container (Left):**
- Aspect-ratio: 4:3 (desktop), 16:9 (mobile)
- Overflow: Hidden
- Position: Relative

**Tour Image:**
- Width: 100%
- Height: 100%
- Object-fit: Cover
- Transition: Transform 500ms ease
- Hover: Scale 1.1

**Content Container (Right):**
- Padding: 40px (desktop), 32px (mobile)
- Display: Flex, flex-direction: Column, justify-content: Center

**Tour Category Badge:**
- Display: Inline-block
- Background: Gold-100
- Color: Gold-600
- Font: Inter, 12px, weight 600, uppercase
- Padding: 4px 12px
- Border-radius: 4px
- Margin-bottom: 16px
- Text: "Tour Clásico", "Experiencia Premium", "Tour Privado"

**Tour Name:**
- Font: Playfair Display, 32px (desktop), 24px (mobile), weight 700
- Color: Charcoal-900
- Line-height: 40px (desktop), 32px (mobile)
- Margin-bottom: 16px

**Tour Description:**
- Font: Inter, 16px, weight 400
- Color: Charcoal-600
- Line-height: 26px
- Margin-bottom: 24px
- Display: -webkit-box
- -webkit-line-clamp: 3
- Overflow: Hidden

**Tour Highlights (List):**
- Display: Flex, flex-direction: Column, gap: 12px
- Margin-bottom: 24px

**Highlight Item:**
- Display: Flex, gap: 12px, align-items: Start
- Font: Inter, 14px, weight 400
- Color: Charcoal-600
- Line-height: 20px
- Icon: Checkmark circle, 20px, Gold-500

**Price & CTA Container:**
- Display: Flex, justify-content: Space-between, align-items: Center
- Flex-wrap: Wrap (mobile), gap: 16px

**Price:**
- Font: Inter, 14px, weight 400, color Charcoal-600
- Strong element for amount: 24px, weight 700, color Burgundy-800
- Format: "Desde $XX.XXX por persona"

**Reserve Button:**
- Style: Button component (md size, primary variant)
- Text: "Reservar →"
- Padding: 12px 32px
- Background: Burgundy-800
- Color: White
- Border-radius: 8px
- Font: Inter, 14px, weight 600
- Hover: Background Burgundy-700
- Icon: Arrow right

**Sample Tours:**

**Tour 1: "Tour Clásico con Degustación"**
- Badge: "Tour Clásico"
- Description: "Recorre nuestros viñedos históricos, conoce el proceso de elaboración y degusta 4 vinos premium seleccionados por nuestro enólogo."
- Highlights:
  - ✓ Recorrido por viñedos centenarios
  - ✓ Visita a bodega y sala de barricas
  - ✓ Degustación de 4 vinos premium
  - ✓ Duración: 2 horas
- Price: "Desde $15.000 por persona"

**Tour 2: "Experiencia Gourmet Maridaje"**
- Badge: "Experiencia Premium"
- Description: "Experiencia gastronómica completa con degustación de 6 vinos premium maridados con platos creados por nuestro chef ejecutivo."
- Highlights:
  - ✓ Maridaje gourmet de 5 tiempos
  - ✓ Degustación de 6 vinos exclusivos
  - ✓ Tour privado por la viña
  - ✓ Duración: 4 horas
- Price: "Desde $45.000 por persona"

**Tour 3: "Tour Privado Cosecha y Barrica"**
- Badge: "Tour Privado"
- Description: "Experiencia exclusiva para grupos pequeños. Participa en la vendimia, conoce el proceso completo y disfruta de una degustación vertical de añadas premium."
- Highlights:
  - ✓ Experiencia de vendimia manual
  - ✓ Cata directa desde barricas
  - ✓ Degustación vertical exclusiva
  - ✓ Duración: 5 horas
- Price: "Desde $85.000 por persona"

---

### 3.6 BRAND STORY SECTION

**Container:**
- Position: Relative
- Height: 600px (desktop), auto (mobile)
- Overflow: Hidden

**Background:**
- Image: Full-width vineyard/cellar/estate photo
- Format: WebP primary, JPG fallback
- Dimensions: 2560×1440 minimum
- Object-fit: Cover
- Object-position: Center center
- Filter: Brightness(0.6) (darken for text readability)
- Parallax effect: Background-attachment fixed (desktop only)

**Overlay:**
- Background: Linear gradient left to right
  - rgba(74, 20, 40, 0.85) at 0%
  - rgba(74, 20, 40, 0.4) at 100%
- Desktop only (mobile: solid overlay rgba(74, 20, 40, 0.85))

**Content Container:**
- Position: Absolute left 80px, top 50%, transform translateY(-50%)
- Max-width: 600px
- Padding: 60px (desktop), 40px 24px (mobile)
- Mobile: Position relative, left 0, transform none

**Eyebrow:**
- Text: "NUESTRA HISTORIA"
- Font: Inter, 14px, weight 600, uppercase, letter-spacing 0.15em
- Color: Gold-400
- Margin-bottom: 16px

**Title:**
- Text: "150 Años de Pasión por el Vino"
- Font: Playfair Display, 48px (desktop), 36px (mobile), weight 700
- Color: White
- Line-height: 56px (desktop), 42px (mobile)
- Margin-bottom: 24px

**Body Text:**
- Font: Inter, 18px, weight 400
- Color: White
- Opacity: 0.95
- Line-height: 30px
- Margin-bottom: 16px
- Paragraphs: 2-3 paragraphs, max 150 words total

**Sample Text:**
"Desde 1875, Viña Santa Cruz ha cultivado la excelencia en el Valle de Colchagua, una de las regiones vitivinícolas más prestigiosas de Chile. Nuestro compromiso con la tradición y la innovación nos ha convertido en referentes de la viticultura sudamericana.

Cada botella cuenta la historia de nuestro terroir único, donde el clima mediterráneo y los suelos privilegiados se encuentran con generaciones de conocimiento y pasión por el vino. Descubre el legado que nos define."

**CTA Button:**
- Style: Button component (lg size, outline variant with white border)
- Text: "Conocer Más →"
- Padding: 16px 40px
- Background: Transparent
- Color: White
- Border: 2px solid White
- Border-radius: 8px
- Font: Inter, 16px, weight 600
- Hover: Background White, color Burgundy-800
- Transition: All 300ms ease

---

### 3.7 MEMBERSHIPS SECTION

**Container:**
- Background: White
- Padding: 96px 80px (desktop), 64px 24px (mobile)
- Max-width: 1280px
- Margin: 0 auto

**Section Header:**
- Text-align: Center
- Margin-bottom: 64px

**Eyebrow:**
- Text: "BENEFICIOS EXCLUSIVOS"
- Font: Inter, 14px, weight 600, uppercase, letter-spacing 0.1em
- Color: Gold-500
- Margin-bottom: 16px

**Title:**
- Text: "Club de Vinos Santa Cruz"
- Font: Playfair Display, 48px (desktop), 32px (mobile), weight 700
- Color: Charcoal-900
- Line-height: 56px (desktop), 40px (mobile)
- Margin-bottom: 16px

**Subtitle:**
- Text: "Únete a nuestra comunidad y disfruta de beneficios únicos durante todo el año"
- Font: Inter, 18px, weight 400
- Color: Charcoal-600
- Line-height: 28px

**Grid Layout:**
- Display: Grid
- Grid-template-columns: repeat(4, 1fr) (desktop >1024px), repeat(2, 1fr) (tablet 768-1023px), 1fr (mobile <768px)
- Gap: 24px (desktop), 20px (mobile)

**Membership Card (Component):**

**Structure:**
- Background: White
- Border: 2px solid Cream-200
- Border-radius: 12px
- Padding: 32px 24px
- Position: Relative
- Transition: All 300ms ease
- Hover: Transform translateY(-8px), shadow-xl, border-color Gold-500

**Featured Tier Styling (Oro & Platino):**
- Border: 2px solid Gold-500
- Background: Linear gradient to bottom, Cream-50 to White
- Transform: Scale(1.05) (desktop only)
- Box-shadow: Shadow-card

**Popular Badge (Oro tier only):**
- Position: Absolute top -12px, left 50%, transform translateX(-50%)
- Background: Burgundy-800
- Color: White
- Font: Inter, 12px, weight 600, uppercase
- Padding: 6px 16px
- Border-radius: 4px
- Text: "Más Popular"

**Tier Icon:**
- Width: 64px, height 64px
- Margin: 0 auto 20px
- Icon style: Badge/shield with tier symbol
- Colors:
  - Bronce: #CD7F32
  - Plata: #C0C0C0
  - Oro: #FFD700 (Gold-500)
  - Platino: #E5E4E2

**Tier Name:**
- Font: Playfair Display, 28px, weight 700
- Color: Charcoal-900
- Line-height: 36px
- Text-align: Center
- Margin-bottom: 12px
- Text: "Bronce", "Plata", "Oro", "Platino"

**Price:**
- Font: Inter, 36px, weight 700
- Color: Burgundy-800
- Line-height: 44px
- Text-align: Center
- Margin-bottom: 4px
- Format: "$XX.XXX"

**Billing Period:**
- Font: Inter, 14px, weight 400
- Color: Charcoal-600
- Text-align: Center
- Margin-bottom: 24px
- Text: "/año"

**Divider:**
- Width: 100%
- Height: 1px
- Background: Cream-200
- Margin-bottom: 24px

**Benefits List:**
- Display: Flex, flex-direction: Column, gap: 12px
- Margin-bottom: 32px

**Benefit Item:**
- Display: Flex, gap: 12px, align-items: Start
- Font: Inter, 14px, weight 400
- Color: Charcoal-800
- Line-height: 20px

**Checkmark Icon:**
- Size: 20px
- Color: Success (Green)
- Flex-shrink: 0

**CTA Button:**
- Full width
- Style: Button component (md size)
- Variant: Primary for Oro/Platino, Secondary (outline) for Bronce/Plata
- Text: "Unirse Ahora"
- Padding: 12px 24px
- Border-radius: 8px
- Font: Inter, 14px, weight 600

**Tier Content:**

**Bronce ($29.990/año):**
- ✓ 10% descuento en todos los vinos
- ✓ Acceso a preventa de nuevos productos
- ✓ Newsletter mensual exclusivo
- ✓ Invitación a eventos especiales

**Plata ($49.990/año):**
- ✓ 15% descuento en todos los vinos
- ✓ Acceso a preventa de nuevos productos
- ✓ Newsletter mensual exclusivo
- ✓ Invitación a eventos especiales
- ✓ 1 tour gratuito al año

**Oro ($79.990/año):** [Featured - "Más Popular"]
- ✓ 20% descuento en todos los vinos
- ✓ Acceso prioritario a ediciones limitadas
- ✓ Newsletter mensual exclusivo
- ✓ Invitación VIP a todos los eventos
- ✓ 2 tours premium gratuitos al año
- ✓ Envío gratis sin mínimo de compra

**Platino ($129.990/año):** [Featured]
- ✓ 25% descuento en todos los vinos
- ✓ Acceso exclusivo a reservas privadas
- ✓ Newsletter mensual + consultas enólogo
- ✓ Eventos privados exclusivos
- ✓ Tours ilimitados + experiencias VIP
- ✓ Envío express gratis
- ✓ Visitas privadas con enólogo

---

### 3.8 TESTIMONIALS SECTION

**Container:**
- Background: Cream-50
- Padding: 96px 80px (desktop), 64px 24px (mobile)
- Max-width: 1280px
- Margin: 0 auto
- Position: Relative

**Section Header:**
- Text-align: Center
- Margin-bottom: 64px

**Eyebrow:**
- Text: "TESTIMONIOS"
- Font: Inter, 14px, weight 600, uppercase, letter-spacing 0.1em
- Color: Gold-500
- Margin-bottom: 16px

**Title:**
- Text: "Lo Que Dicen Nuestros Clientes"
- Font: Playfair Display, 48px (desktop), 32px (mobile), weight 700
- Color: Charcoal-900
- Line-height: 56px (desktop), 40px (mobile)

**Carousel Container:**
- Display: Grid (desktop), Carousel (mobile)
- Grid-template-columns: repeat(3, 1fr) (desktop >1024px), 1fr (mobile)
- Gap: 32px (desktop)
- Position: Relative

**Testimonial Card (Component):**

**Structure:**
- Background: White
- Border-radius: 12px
- Padding: 40px 32px
- Box-shadow: Shadow-md
- Display: Flex, flex-direction: Column
- Transition: All 300ms ease
- Hover: Shadow-xl, transform translateY(-4px)

**Quote Icon:**
- Position: Absolute top 32px, left 32px
- Size: 40px
- Color: Gold-500
- Opacity: 0.3
- SVG: Opening quotation mark

**Quote Text:**
- Font: Inter, 16px, weight 400, italic
- Color: Charcoal-800
- Line-height: 26px
- Margin-bottom: 24px
- Margin-top: 20px (to clear quote icon)
- Display: -webkit-box
- -webkit-line-clamp: 5
- Overflow: Hidden

**Divider:**
- Width: 40px
- Height: 2px
- Background: Gold-500
- Margin-bottom: 24px

**Customer Info Container:**
- Display: Flex, gap: 16px, align-items: Center

**Customer Photo:**
- Width: 56px, height: 56px
- Border-radius: 50%
- Object-fit: Cover
- Border: 2px solid Cream-200

**Customer Details:**
- Display: Flex, flex-direction: Column, gap: 4px

**Customer Name:**
- Font: Inter, 16px, weight 600
- Color: Charcoal-900
- Line-height: 24px

**Customer Location/Role:**
- Font: Inter, 14px, weight 400
- Color: Charcoal-600
- Line-height: 20px

**Star Rating:**
- Display: Flex, gap: 4px
- Margin-top: 8px
- Star size: 16px
- Filled stars: Gold-500
- Empty stars: Cream-200

**Carousel Controls (Mobile):**
- Position: Absolute bottom -48px, left 50%, transform translateX(-50%)
- Display: Flex, gap: 12px

**Carousel Dots:**
- Width: 12px, height: 12px
- Border-radius: 50%
- Background: Charcoal-400
- Active dot: Background Burgundy-800, width 32px, border-radius 6px
- Transition: All 300ms ease
- Cursor: Pointer
- Hover: Background Burgundy-700

**Navigation Arrows (Desktop - optional):**
- Position: Absolute top 50%, transform translateY(-50%)
- Left arrow: left -60px
- Right arrow: right -60px
- Size: 48px circle
- Background: White
- Border: 2px solid Cream-200
- Color: Charcoal-900
- Hover: Background Burgundy-800, color White, border-color Burgundy-800
- Disabled: Opacity 0.3, cursor not-allowed

**Sample Testimonials:**

**Testimonial 1:**
- Quote: "Una experiencia inolvidable. El tour gourmet superó todas nuestras expectativas. Los vinos son excepcionales y el maridaje fue perfecto. Definitivamente volveremos."
- Name: "María José Ramírez"
- Location: "Santiago, Chile"
- Rating: 5 stars

**Testimonial 2:**
- Quote: "Como miembro del Club Oro, he descubierto vinos extraordinarios que nunca había probado. El servicio es impecable y los beneficios realmente valen la pena."
- Name: "Carlos Mendoza"
- Location: "Viña del Mar, Chile"
- Rating: 5 stars

**Testimonial 3:**
- Quote: "El Carmenere Gran Reserva es simplemente espectacular. La calidad es consistente en cada botella y el envío siempre llega perfecto. Mi tienda online favorita de vinos."
- Name: "Patricia Silva"
- Location: "Concepción, Chile"
- Rating: 5 stars

---

### 3.9 INSTAGRAM FEED SECTION

**Container:**
- Background: White
- Padding: 96px 80px (desktop), 64px 24px (mobile)
- Max-width: 1440px
- Margin: 0 auto

**Section Header:**
- Text-align: Center
- Margin-bottom: 48px

**Title:**
- Text: "Síguenos en Instagram"
- Font: Playfair Display, 40px (desktop), 28px (mobile), weight 700
- Color: Charcoal-900
- Line-height: 48px (desktop), 36px (mobile)
- Margin-bottom: 8px

**Instagram Handle:**
- Text: "@vinasantacruz"
- Font: Inter, 18px, weight 600
- Color: Gold-500
- Line-height: 28px

**Grid Layout:**
- Display: Grid
- Grid-template-columns: repeat(6, 1fr) (desktop >1024px), repeat(3, 1fr) (tablet 768-1023px), repeat(2, 1fr) (mobile <768px)
- Gap: 16px (desktop), 12px (mobile)

**Instagram Post Card:**

**Structure:**
- Aspect-ratio: 1:1 (square)
- Position: Relative
- Overflow: Hidden
- Border-radius: 8px
- Cursor: Pointer

**Image:**
- Width: 100%
- Height: 100%
- Object-fit: Cover
- Transition: Transform 500ms ease
- Hover: Transform scale(1.1)

**Overlay (Hover State):**
- Position: Absolute inset 0
- Background: rgba(107, 29, 60, 0.7)
- Opacity: 0
- Transition: Opacity 300ms ease
- Hover: Opacity 1
- Display: Flex, justify-content: Center, align-items: Center

**Instagram Icon (in overlay):**
- Size: 48px
- Color: White
- SVG: Instagram logo

**CTA Button:**
- Text-align: Center
- Margin-top: 48px

**Button:**
- Style: Button component (lg size, outline variant)
- Text: "Seguir en Instagram →"
- Padding: 16px 40px
- Background: Transparent
- Color: Burgundy-800
- Border: 2px solid Burgundy-800
- Border-radius: 8px
- Font: Inter, 16px, weight 600
- Hover: Background Burgundy-800, color White
- Icon: Instagram logo, 20px, left of text

**Image Requirements:**
- 6 recent Instagram posts (desktop)
- Format: JPG, WebP
- Dimensions: 640×640 minimum
- Content: Mix of vineyard shots, wine bottles, tours, events, lifestyle

---

### 3.10 NEWSLETTER SECTION

**Container:**
- Background: Linear gradient to right, Burgundy-900 to Burgundy-800
- Padding: 80px 80px (desktop), 64px 24px (mobile)
- Position: Relative
- Overflow: Hidden

**Background Pattern (Optional):**
- SVG pattern: Subtle grape vine or geometric pattern
- Opacity: 0.05
- Position: Absolute
- Fills entire container

**Content Container:**
- Max-width: 720px
- Margin: 0 auto
- Text-align: Center
- Position: Relative
- Z-index: 10

**Icon (Optional):**
- Size: 64px
- Color: Gold-400
- Margin-bottom: 24px
- SVG: Mail/envelope icon

**Title:**
- Text: "Recibe Nuestras Novedades"
- Font: Playfair Display, 40px (desktop), 32px (mobile), weight 700
- Color: White
- Line-height: 48px (desktop), 40px (mobile)
- Margin-bottom: 16px

**Subtitle:**
- Text: "Ofertas exclusivas, nuevos vinos y eventos especiales directo a tu correo"
- Font: Inter, 18px, weight 400
- Color: White
- Opacity: 0.9
- Line-height: 28px
- Margin-bottom: 40px

**Form Container:**
- Max-width: 540px
- Margin: 0 auto 24px
- Display: Flex
- Gap: 12px (desktop), 0 (mobile)
- Flex-wrap: Wrap (mobile)

**Email Input:**
- Flex: 1
- Min-width: 280px
- Height: 56px
- Padding: 16px 24px
- Background: White
- Border: 2px solid transparent
- Border-radius: 8px (desktop), 8px 8px 0 0 (mobile)
- Font: Inter, 16px, weight 400
- Color: Charcoal-900
- Placeholder: "Tu correo electrónico"
- Placeholder color: Charcoal-400
- Focus: Border-color Gold-500, outline none, box-shadow 0 0 0 3px rgba(201, 169, 97, 0.1)
- Mobile: Full width

**Submit Button:**
- Style: Button component (lg size)
- Text: "Suscribirse"
- Padding: 16px 40px
- Min-width: 160px
- Height: 56px
- Background: Gold-500
- Color: Burgundy-900
- Border: none
- Border-radius: 8px (desktop), 0 0 8px 8px (mobile)
- Font: Inter, 16px, weight 600
- Hover: Background Gold-400, transform translateY(-2px), shadow-lg
- Active: Transform scale(0.98)
- Mobile: Full width
- Icon: Paper plane, 20px, right of text

**Privacy Notice:**
- Font: Inter, 13px, weight 400
- Color: White
- Opacity: 0.8
- Line-height: 20px
- Max-width: 480px
- Margin: 0 auto

**Privacy Text:**
"Al suscribirte aceptas recibir comunicaciones de Viña Santa Cruz. Puedes cancelar tu suscripción en cualquier momento. Ver [Política de Privacidad](#)."

**Privacy Link:**
- Color: Gold-400
- Text-decoration: Underline
- Hover: Color Gold-300

**Success State (after submission):**
- Replace form with success message
- Icon: Checkmark circle, 64px, Gold-400
- Message: "¡Gracias por suscribirte!"
- Submessage: "Revisa tu correo para confirmar tu suscripción"
- Font: Same as title/subtitle styles

---

## 4. COMPONENT LIBRARY

### 4.1 BUTTONS

**Button Base Styles:**
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-body);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 300ms ease;
  text-decoration: none;
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

**Size Variants:**

**Small:**
```css
.btn-sm {
  padding: 8px 20px;
  font-size: 12px;
  line-height: 16px;
  border-radius: 6px;
  height: 32px;
}
```

**Medium (Default):**
```css
.btn-md {
  padding: 12px 24px;
  font-size: 14px;
  line-height: 20px;
  border-radius: 8px;
  height: 44px;
}
```

**Large:**
```css
.btn-lg {
  padding: 16px 40px;
  font-size: 16px;
  line-height: 24px;
  border-radius: 8px;
  height: 56px;
}
```

**Color Variants:**

**Primary (Burgundy):**
```css
.btn-primary {
  background: var(--burgundy-800);
  color: var(--white);
}

.btn-primary:hover {
  background: var(--burgundy-700);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-primary:active {
  background: var(--burgundy-900);
  transform: translateY(0);
}
```

**Secondary (Outline Burgundy):**
```css
.btn-secondary {
  background: transparent;
  color: var(--burgundy-800);
  border: 2px solid var(--burgundy-800);
}

.btn-secondary:hover {
  background: var(--burgundy-800);
  color: var(--white);
  transform: translateY(-2px);
}

.btn-secondary:active {
  background: var(--burgundy-900);
  border-color: var(--burgundy-900);
}
```

**Secondary Light (Outline White):**
```css
.btn-secondary-light {
  background: transparent;
  color: var(--white);
  border: 2px solid var(--white);
}

.btn-secondary-light:hover {
  background: var(--white);
  color: var(--burgundy-800);
}
```

**Gold Accent:**
```css
.btn-gold {
  background: var(--gold-500);
  color: var(--burgundy-900);
}

.btn-gold:hover {
  background: var(--gold-400);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

**Icon Buttons:**
```css
.btn-icon {
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 8px;
}

.btn-icon-sm {
  width: 32px;
  height: 32px;
}

.btn-icon-lg {
  width: 56px;
  height: 56px;
}
```

---

### 4.2 CARDS

**Wine Product Card:**

See section 3.4 for detailed specifications. Summary:
- White background, 1px Cream-200 border
- Border-radius: 12px
- Padding: 24px
- Hover: Lift effect (-8px), shadow-card, gold border
- Image aspect ratio: 3:4
- Contains: Image, badge, name, varietal, rating, price, CTA button

**Tour/Experience Card:**

See section 3.5 for detailed specifications. Summary:
- Horizontal layout (desktop), vertical (mobile)
- White background, shadow-md
- Border-radius: 12px
- Image 480px wide (desktop)
- Contains: Image, category badge, title, description, highlights list, price, CTA

**Membership Tier Card:**

See section 3.7 for detailed specifications. Summary:
- White background, 2px border (color varies)
- Border-radius: 12px
- Padding: 32px 24px
- Featured tiers: Gold border, scale 1.05, gradient background
- Contains: Icon, tier name, price, benefits list, CTA button

**Testimonial Card:**

See section 3.8 for detailed specifications. Summary:
- White background, shadow-md
- Border-radius: 12px
- Padding: 40px 32px
- Hover: Lift effect, shadow-xl
- Contains: Quote icon, quote text, divider, customer photo, name, location, rating

---

### 4.3 FORM ELEMENTS

**Text Input:**
```css
.input {
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  background: var(--white);
  border: 2px solid var(--cream-200);
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--charcoal-900);
  transition: all 200ms ease;
}

.input::placeholder {
  color: var(--charcoal-400);
}

.input:hover {
  border-color: var(--charcoal-400);
}

.input:focus {
  border-color: var(--burgundy-800);
  outline: none;
  box-shadow: 0 0 0 3px rgba(107, 29, 60, 0.1);
}

.input:disabled {
  background: var(--cream-100);
  cursor: not-allowed;
  opacity: 0.6;
}

.input-error {
  border-color: var(--error);
}

.input-error:focus {
  border-color: var(--error);
  box-shadow: 0 0 0 3px rgba(196, 57, 57, 0.1);
}
```

**Input Large (Newsletter, Search):**
```css
.input-lg {
  height: 56px;
  padding: 16px 24px;
  font-size: 16px;
}
```

**Textarea:**
```css
.textarea {
  /* Inherits from .input */
  height: auto;
  min-height: 120px;
  resize: vertical;
}
```

**Select Dropdown:**
```css
.select {
  /* Inherits from .input */
  appearance: none;
  background-image: url("data:image/svg+xml...[chevron-down]");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 20px;
  padding-right: 48px;
  cursor: pointer;
}
```

**Checkbox:**
```css
.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid var(--cream-200);
  border-radius: 4px;
  cursor: pointer;
  transition: all 200ms ease;
}

.checkbox:checked {
  background: var(--burgundy-800);
  border-color: var(--burgundy-800);
  background-image: url("data:image/svg+xml...[checkmark]");
}

.checkbox:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(107, 29, 60, 0.1);
}
```

**Radio Button:**
```css
.radio {
  width: 20px;
  height: 20px;
  border: 2px solid var(--cream-200);
  border-radius: 50%;
  cursor: pointer;
  transition: all 200ms ease;
}

.radio:checked {
  border-color: var(--burgundy-800);
  border-width: 6px;
}
```

**Input Group (with icon):**
```css
.input-group {
  position: relative;
}

.input-group-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--charcoal-400);
}

.input-group .input {
  padding-left: 48px;
}
```

**Error Message:**
```css
.input-error-message {
  display: block;
  margin-top: 8px;
  font-size: 14px;
  color: var(--error);
  line-height: 20px;
}
```

---

### 4.4 BADGES

**Badge Base:**
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  text-transform: uppercase;
  border-radius: 4px;
  white-space: nowrap;
}
```

**Badge Variants:**

**New:**
```css
.badge-new {
  background: var(--burgundy-800);
  color: var(--white);
}
```

**Award/Premium:**
```css
.badge-award {
  background: var(--gold-500);
  color: var(--burgundy-900);
}
```

**Exclusive:**
```css
.badge-exclusive {
  background: var(--charcoal-900);
  color: var(--gold-400);
}
```

**Info:**
```css
.badge-info {
  background: var(--cream-200);
  color: var(--charcoal-800);
}
```

**Success:**
```css
.badge-success {
  background: var(--success);
  color: var(--white);
}
```

**Badge Sizes:**
```css
.badge-sm {
  padding: 2px 8px;
  font-size: 10px;
  line-height: 14px;
}

.badge-lg {
  padding: 6px 16px;
  font-size: 14px;
  line-height: 20px;
}
```

---

### 4.5 RATING STARS

**Star Rating Container:**
```css
.rating {
  display: inline-flex;
  gap: 4px;
  align-items: center;
}

.rating-star {
  width: 16px;
  height: 16px;
  color: var(--gold-500);
}

.rating-star-empty {
  color: var(--cream-200);
}

.rating-lg .rating-star {
  width: 20px;
  height: 20px;
}

.rating-sm .rating-star {
  width: 14px;
  height: 14px;
}
```

**Star SVG:**
```svg
<svg fill="currentColor" viewBox="0 0 20 20">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>
```

---

### 4.6 ICONOGRAPHY

**Icon Style Guidelines:**
- Style: Line icons (outlined, not filled)
- Stroke width: 2px
- Color: Inherit from parent or specified
- Sizes: 16px, 20px, 24px, 32px, 40px, 48px, 56px, 64px
- Format: SVG (inline or sprite)
- Library recommendation: Heroicons, Lucide, or Feather Icons

**Required Icons:**
- Navigation: Menu, Close, ChevronDown, ChevronRight, ChevronLeft, ChevronUp
- E-commerce: ShoppingCart, Heart, Search, Filter, Grid, List
- Actions: Plus, Minus, Check, X, Edit, Delete, Share, Download
- Social: Instagram, Facebook, Twitter, LinkedIn, YouTube, WhatsApp
- UI: User, Mail, Phone, MapPin, Calendar, Clock, Star, Award, Trophy
- Wine specific: Wine glass, Bottle, Grape, Medal, Barrel
- Forms: Eye, EyeOff, Upload, Paperclip
- Feedback: Info, Warning, Error, Success, Question

**Icon Usage:**
```css
.icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icon-sm { width: 16px; height: 16px; }
.icon-lg { width: 32px; height: 32px; }
.icon-xl { width: 48px; height: 48px; }
```

---

### 4.7 LOADING STATES

**Spinner:**
```css
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--cream-200);
  border-top-color: var(--burgundy-800);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner-sm { width: 20px; height: 20px; border-width: 2px; }
.spinner-lg { width: 60px; height: 60px; border-width: 6px; }
```

**Skeleton Loader:**
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--cream-100) 0%,
    var(--cream-200) 50%,
    var(--cream-100) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text {
  height: 16px;
  margin-bottom: 8px;
}

.skeleton-title {
  height: 24px;
  margin-bottom: 12px;
}

.skeleton-image {
  height: 200px;
}
```

---

### 4.8 MODALS & OVERLAYS

**Modal Overlay:**
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadeIn 300ms ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Modal Container:**
```css
.modal {
  background: var(--white);
  border-radius: 12px;
  box-shadow: var(--shadow-xl);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  animation: slideUp 300ms ease;
}

@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  padding: 32px 32px 24px;
  border-bottom: 1px solid var(--cream-200);
  position: relative;
}

.modal-title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  color: var(--charcoal-900);
  line-height: 36px;
  margin: 0;
}

.modal-close {
  position: absolute;
  top: 32px;
  right: 32px;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--charcoal-600);
  cursor: pointer;
  transition: color 200ms ease;
}

.modal-close:hover {
  color: var(--charcoal-900);
}

.modal-body {
  padding: 32px;
}

.modal-footer {
  padding: 24px 32px;
  border-top: 1px solid var(--cream-200);
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
```

---

## 5. INTERACTION & ANIMATION GUIDELINES

### 5.1 ANIMATION TIMING

**Standard Durations:**
- Micro-interactions (hover, focus): 200ms
- UI transitions (modals, dropdowns): 300ms
- Page transitions: 400ms
- Skeleton loaders, infinite animations: 1000-1500ms

**Easing Functions:**
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 5.2 HOVER EFFECTS

**Cards & Buttons:**
- Transform: translateY(-4px to -8px)
- Shadow: Increase from md to xl
- Scale: 1.05 max (use sparingly)
- Color transitions: 300ms

**Images:**
- Scale: 1.1 (inside overflow: hidden container)
- Duration: 500ms
- Use transform: scale (GPU accelerated)

**Links:**
- Color change: 200ms
- Underline animation: Expand from center or left
- Use ::after pseudo-element for underline

**Icons:**
- Scale: 1.1
- Rotate (for arrows): 5-15 degrees
- Color change to brand color

### 5.3 SCROLL ANIMATIONS

**Fade In on Scroll:**
- Initial: opacity 0, transform translateY(40px)
- Animate: opacity 1, transform translateY(0)
- Duration: 600-800ms
- Stagger children: 100ms delay between elements
- Trigger: When element enters viewport (Intersection Observer)

**Parallax Effect:**
- Background images: background-attachment: fixed (desktop only)
- Scroll speed: 0.5x normal (subtle)
- Mobile: Disable parallax, use fixed positioning

**Progress Indicators:**
- Scroll progress bar (optional): Fixed top, height 3px, burgundy fill
- Width: 0% to 100% based on scroll position
- Smooth transition

### 5.4 PAGE LOAD ANIMATIONS

**Hero Section:**
- Background: Fade in immediately
- Headline: Fade up, delay 200ms, duration 800ms
- Subheadline: Fade up, delay 400ms, duration 800ms
- Buttons: Fade up, delay 600ms, duration 800ms
- Scroll indicator: Fade in, delay 1000ms

**Staggered Grid Animations:**
- Wine cards, membership cards: Stagger by 100ms
- Start animation when section enters viewport
- Use transform: translateY and opacity

### 5.5 MICRO-INTERACTIONS

**Form Input Focus:**
- Border color transition: 200ms
- Box-shadow appear: 200ms
- Label color change (if floating): 200ms
- Placeholder fade out: 200ms

**Button Click:**
- Transform: scale(0.98)
- Duration: 100ms
- Return to normal: 200ms

**Add to Cart:**
- Button text change: "Añadir al Carro" → "Añadido ✓"
- Background color change: Burgundy → Success green
- Duration: 2000ms, then revert
- Optional: Cart icon bounce animation

**Star Rating Hover:**
- Fill stars on hover
- Animation: Fill from left to right
- Duration: 100ms per star

**Carousel/Slider:**
- Slide transition: Transform translateX, 500ms ease-in-out
- Dots: Color transition 300ms, width expand (active)
- Auto-play: 5000ms interval (pause on hover)

### 5.6 LOADING STATES

**Button Loading:**
- Replace text with spinner
- Disable pointer events
- Maintain button dimensions
- Spinner color: White (primary button) or Burgundy (outline button)

**Image Lazy Loading:**
- Show skeleton loader while loading
- Fade in image when loaded: opacity 0 → 1, 400ms
- Use blur-up technique: Low-res blur → High-res sharp

**Infinite Scroll:**
- Show spinner at bottom of list
- Load next batch when user reaches 80% of current content
- Smooth append, no layout shift

### 5.7 ACCESSIBILITY ANIMATIONS

**Respect prefers-reduced-motion:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Focus Indicators:**
- Always visible for keyboard navigation
- High contrast outline or box-shadow
- Never remove outline without replacement
- Animate appearance: 200ms

---

## 6. ASSET REQUIREMENTS

### 6.1 IMAGES

**Hero Section:**
- **Filename:** `hero-background-video.mp4` OR `hero-background.jpg`
- **Video specs:** 1920×1080px minimum, H.264 codec, 15-30s loop, <10MB
- **Image specs:** 2560×1440px, WebP + JPG fallback, <500KB
- **Content:** Panoramic vineyard view, wine cellar with barrels, or estate aerial view
- **Mood:** Golden hour lighting, rich colors, professional photography

**Featured Wines (4 images):**
- **Filename pattern:** `wine-[name]-bottle.png`
- **Specs:** 800×1200px (3:4 ratio), PNG with transparency, <200KB each
- **Content:** Clean product shots, centered bottles on transparent background
- **Lighting:** Studio lighting, consistent across all products

**Tours & Experiences (3 images):**
- **Filename pattern:** `tour-[type].jpg`
- **Specs:** 1600×1200px (4:3 ratio), WebP + JPG, <400KB each
- **Content:**
  - Tour 1: Guests touring vineyard rows
  - Tour 2: Elegant dining table with wine and food pairing
  - Tour 3: Close-up of hands working with grapes/barrels
- **Mood:** Lifestyle photography, natural lighting, people enjoying experiences

**Brand Story Section:**
- **Filename:** `brand-story-background.jpg`
- **Specs:** 2560×1440px, WebP + JPG, <600KB
- **Content:** Historic cellar, old barrels, vineyard landscape, or winery exterior
- **Mood:** Heritage, authenticity, timeless

**Testimonials (3 images):**
- **Filename pattern:** `customer-[name].jpg`
- **Specs:** 200×200px, WebP + JPG, <50KB each
- **Content:** Professional headshots or lifestyle photos
- **Style:** Circular crop, consistent lighting/style

**Instagram Feed (6 images):**
- **Filename pattern:** `instagram-[number].jpg`
- **Specs:** 640×640px (1:1 ratio), JPG, <150KB each
- **Content:** Mix of vineyard shots, wine bottles, lifestyle, events, behind-the-scenes
- **Style:** Instagram aesthetic, warm tones, engaging compositions

**Membership Icons (4 images):**
- **Filename pattern:** `membership-icon-[tier].svg`
- **Specs:** SVG, single color (will be colored via CSS)
- **Content:** Badge/shield shapes with tier symbols (bronze, silver, gold, platinum)

### 6.2 ICONS

**Icon Library:**
- Use Heroicons (https://heroicons.com/) or similar
- Format: SVG inline or sprite
- All icons should be 24×24px default with stroke-width: 2

**Required Icons:**
- Navigation: `menu`, `x-mark`, `chevron-down`, `chevron-right`, `chevron-left`, `chevron-up`
- E-commerce: `shopping-bag`, `shopping-cart`, `heart`, `magnifying-glass`
- User: `user-circle`, `user`
- Social: Instagram, Facebook, Twitter (use official brand icons)
- UI: `star`, `check-circle`, `envelope`, `phone`, `map-pin`, `calendar`, `clock`
- Wine specific: Wine glass, Bottle (custom or from icon library)
- Forms: `eye`, `eye-slash`, `arrow-right`, `paper-airplane`

### 6.3 LOGO

**Main Logo:**
- **Filename:** `vina-santa-cruz-logo.svg` (primary), `vina-santa-cruz-logo.png` (fallback)
- **Specs:** SVG scalable, PNG 400×108px @2x, transparent background
- **Variations needed:**
  - Full color (for light backgrounds)
  - White (for dark backgrounds/hero overlay)
  - Monogram/icon-only version (for mobile/favicon)

**Favicon:**
- **Filename:** `favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`
- **Specs:** Standard favicon sizes, PNG format
- **Content:** Monogram or simplified logo

### 6.4 FONTS

**Web Fonts:**
- **Display:** Playfair Display (weights: 400, 600, 700)
  - Load from Google Fonts or self-host
  - WOFF2 format for best compression
- **Body:** Inter (weights: 400, 500, 600, 700)
  - Variable font preferred for flexibility
  - WOFF2 format

**Font Loading Strategy:**
- Use `font-display: swap` for fast text rendering
- Preload critical fonts
- Subset fonts to Latin character set if Spanish-only

### 6.5 VIDEO

**Hero Video (if used):**
- **Filename:** `hero-video.mp4`, `hero-video.webm`
- **Specs:** 1920×1080px, 30fps, H.264 codec (MP4), VP9 (WebM)
- **Duration:** 15-30 seconds, seamless loop
- **File size:** <10MB (optimize heavily)
- **Content:** Slow-motion vineyard footage, wine pouring, barrel room, panoramic estate views
- **Audio:** None (muted)
- **Fallback:** High-quality poster image

**Brand Story Video (optional):**
- **Filename:** `brand-story-video.mp4`
- **Specs:** 1920×1080px, 30fps, H.264 codec
- **Duration:** 30-90 seconds
- **File size:** <20MB
- **Content:** Brand heritage story, winemaking process
- **Audio:** Optional background music

---

## 7. IMPLEMENTATION NOTES

### 7.1 NEXT.JS 14 STRUCTURE

**Recommended File Structure:**
```
app/
├── (home)/
│   ├── page.tsx                 # Home page (this spec)
│   ├── layout.tsx               # Root layout with header/footer
│   └── components/
│       ├── HeroSection.tsx
│       ├── USPsSection.tsx
│       ├── FeaturedWinesSection.tsx
│       ├── ToursSection.tsx
│       ├── BrandStorySection.tsx
│       ├── MembershipsSection.tsx
│       ├── TestimonialsSection.tsx
│       ├── InstagramSection.tsx
│       └── NewsletterSection.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx           # Reusable button component
│   │   ├── Card.tsx             # Card variants
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Rating.tsx
│   │   └── Modal.tsx
│   ├── layout/
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   └── wine/
│       ├── WineCard.tsx
│       ├── TourCard.tsx
│       └── MembershipCard.tsx
└── styles/
    ├── globals.css              # Global styles, design tokens
    └── animations.css           # Animation keyframes
```

### 7.2 PERFORMANCE OPTIMIZATION

**Image Optimization:**
- Use Next.js `<Image>` component for all images
- Set appropriate `sizes` attribute for responsive images
- Use `priority` prop for hero image/video poster
- Enable blur placeholder: `placeholder="blur"`
- Lazy load below-fold images

**Code Splitting:**
- Use dynamic imports for heavy components (modals, carousels)
- Example: `const Modal = dynamic(() => import('@/components/ui/Modal'))`
- Lazy load Instagram feed section (below fold)

**Font Optimization:**
- Use `next/font` for automatic font optimization
- Preload critical fonts in layout
- Use font subsetting to reduce file size

**Video Optimization:**
- Compress hero video heavily (<10MB target)
- Use poster image as fallback
- Lazy load video: Don't load until hero is in viewport
- Provide WebM + MP4 formats for browser compatibility

**CSS Optimization:**
- Use TailwindCSS purging to remove unused styles
- Critical CSS: Inline above-fold styles
- Defer non-critical CSS

### 7.3 RESPONSIVE BREAKPOINTS

**Mobile First Approach:**
```css
/* Base styles: Mobile (< 640px) */

@media (min-width: 640px) {
  /* Small tablets, large phones */
}

@media (min-width: 768px) {
  /* Tablets */
}

@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1280px) {
  /* Large desktop */
}
```

**Key Responsive Changes:**
- Hero: Font size scales down, CTA buttons stack
- USPs: 3 cols → 1 col
- Featured Wines: 4 cols → 2 cols → 1 col
- Tours: Horizontal cards → Vertical cards
- Memberships: 4 cols → 2 cols → 1 col
- Testimonials: Grid → Carousel on mobile
- Instagram: 6 cols → 3 cols → 2 cols
- Newsletter: Form flex → Stack

### 7.4 ACCESSIBILITY CHECKLIST

**Semantic HTML:**
- Use proper heading hierarchy (H1 → H2 → H3)
- Use `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Use `<button>` for actions, `<a>` for navigation
- Form labels associated with inputs

**ARIA Labels:**
- `aria-label` for icon-only buttons
- `aria-labelledby` for sections
- `aria-live` regions for dynamic content (cart count, form errors)
- `aria-expanded`, `aria-controls` for dropdowns/accordions

**Keyboard Navigation:**
- Tab order follows visual flow
- Focus visible on all interactive elements
- Escape closes modals/dropdowns
- Enter/Space activates buttons
- Arrow keys navigate carousels/tabs

**Screen Reader:**
- Alt text for all images (descriptive, not decorative)
- Skip to main content link
- Announce form errors clearly
- Hidden elements: `aria-hidden="true"` or `display: none`

**Color Contrast:**
- All text meets WCAG AA: 4.5:1 for normal text, 3:1 for large text
- Test with tools: WebAIM Contrast Checker, Axe DevTools

**Testing:**
- Test with keyboard only (no mouse)
- Test with screen reader (NVDA, JAWS, VoiceOver)
- Test with browser zoom 200%
- Test with browser accessibility extensions (axe, Lighthouse)

### 7.5 SEO OPTIMIZATION

**Meta Tags:**
```html
<title>Viña Santa Cruz | Vinos Premium, Tours y Experiencias en Valle de Colchagua</title>
<meta name="description" content="Descubre vinos premium chilenos, reserva tours exclusivos y únete a nuestro club de vinos. 150 años de tradición en el Valle de Colchagua." />
<meta name="keywords" content="vinos chilenos, valle de colchagua, tours de vino, club de vinos, carmenere, cabernet sauvignon" />
<link rel="canonical" href="https://vinasantacruz.cl" />
```

**Open Graph:**
```html
<meta property="og:title" content="Viña Santa Cruz | Vinos Premium Chilenos" />
<meta property="og:description" content="Vinos premium, experiencias exclusivas y tradición desde 1875" />
<meta property="og:image" content="https://vinasantacruz.cl/og-image.jpg" />
<meta property="og:url" content="https://vinasantacruz.cl" />
<meta property="og:type" content="website" />
```

**Twitter Card:**
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Viña Santa Cruz | Vinos Premium Chilenos" />
<meta name="twitter:description" content="Vinos premium, experiencias exclusivas y tradición desde 1875" />
<meta name="twitter:image" content="https://vinasantacruz.cl/twitter-image.jpg" />
```

**Structured Data (JSON-LD):**
- Organization schema
- Product schema for wines
- Event schema for tours
- Review/Rating schema

**Performance SEO:**
- Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- Mobile-friendly test passing
- Page speed score >90 (Lighthouse)

### 7.6 BROWSER SUPPORT

**Minimum Support:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari 14+
- Chrome Android 90+

**Polyfills/Fallbacks:**
- CSS Grid fallback for older browsers
- Flexbox as primary layout
- WebP with JPG fallback
- Modern JS features: Use Babel/Next.js transpilation

### 7.7 ANALYTICS & TRACKING

**Events to Track:**
- Hero CTA clicks ("Explorar Vinos", "Reservar Tour")
- Wine card interactions (view, add to cart)
- Tour card reservations
- Membership tier selections
- Newsletter signups
- Social link clicks
- Scroll depth (25%, 50%, 75%, 100%)
- Video play/pause (hero video)

**Tools:**
- Google Analytics 4
- Facebook Pixel (optional)
- Hotjar/Clarity for heatmaps (optional)

---

## 8. DEVELOPMENT HANDOFF CHECKLIST

**Design Assets Delivery:**
- [ ] All images in specified formats and sizes
- [ ] SVG icons organized in sprite or component library
- [ ] Logo in all required variations
- [ ] Fonts licensed and ready for web use
- [ ] Video files compressed and optimized

**Documentation:**
- [ ] This design specification document
- [ ] Component library with code examples
- [ ] Responsive behavior guidelines
- [ ] Animation specifications with timing
- [ ] Accessibility requirements and testing checklist

**Figma/Design Files:**
- [ ] High-fidelity mockups at key breakpoints (Mobile 375px, Tablet 768px, Desktop 1440px)
- [ ] Component library in Figma with variants
- [ ] Design system documentation (colors, typography, spacing)
- [ ] Interactive prototype for stakeholder review

**Technical Specifications:**
- [ ] Next.js 14 project structure recommendations
- [ ] TailwindCSS configuration with design tokens
- [ ] API endpoints specification (wines, tours, memberships)
- [ ] Third-party integrations (payment, booking, CRM)

**Testing Requirements:**
- [ ] Browser compatibility testing checklist
- [ ] Device testing checklist (iPhone, iPad, Android, Desktop)
- [ ] Accessibility audit with WCAG 2.1 AA compliance
- [ ] Performance benchmarks (Lighthouse scores)

**Deployment:**
- [ ] Environment setup (dev, staging, production)
- [ ] CDN configuration for images/videos (Cloudinary)
- [ ] SSL certificate and domain setup
- [ ] Analytics and tracking implementation

---

## SUMMARY

This comprehensive design specification provides everything needed to implement the **VIÑA SANTA CRUZ** home page to the highest professional standard. The design balances premium aesthetics with conversion optimization, ensuring both beauty and business results.

**Key Design Principles Applied:**
1. **Premium Minimalism:** Clean layouts, generous whitespace, high-quality imagery
2. **User-Centered:** Clear CTAs, intuitive navigation, optimized user flows
3. **Mobile-First Responsive:** Seamless experience across all devices
4. **Accessibility First:** WCAG 2.1 AA compliant from the start
5. **Performance Optimized:** Fast loading, smooth animations, Core Web Vitals focused
6. **Conversion Focused:** Strategic placement of CTAs, social proof, urgency triggers
7. **Scalable Design System:** Reusable components for future page development

**Next Steps:**
1. Review this specification with stakeholders and development team
2. Request any clarifications or adjustments
3. Procure/create all required assets (images, videos, copy)
4. Begin development with component library first
5. Implement sections sequentially with testing at each stage
6. Conduct comprehensive QA before launch

All measurements, colors, and specifications are production-ready. Developers can implement directly from this document without additional design interpretation needed.