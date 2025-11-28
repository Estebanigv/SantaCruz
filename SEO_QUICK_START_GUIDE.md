# SEO Quick Start Guide - Viña Santa Cruz

## ✅ What's Been Implemented

All core SEO infrastructure is now in place. Here's what you have:

### Files Created/Modified:
1. `app/sitemap.ts` - XML sitemap for all pages
2. `public/robots.txt` - Search engine crawling instructions
3. `app/layout.tsx` - Enhanced with complete metadata
4. `app/page.tsx` - Homepage with structured data
5. `app/experiencias/page.tsx` - Tours page with event schemas
6. `app/experiencias/metadata.ts` - Page-specific metadata
7. `src/components/seo/StructuredData.tsx` - Reusable schema components

---

## 🚀 Next Steps (Priority Order)

### 1. Create Open Graph Image (30 minutes)
**Why:** Critical for social sharing and click-through rates

**Specifications:**
- Size: 1200 x 630 pixels
- Format: JPG (optimized)
- Location: `/public/images/og-image.jpg`

**Design Elements:**
- Viña Santa Cruz logo
- Tagline: "Valle de Colchagua | Enoturismo Premium"
- Beautiful vineyard background
- Text should be readable at thumbnail size

**Tools:**
- Canva (free template: "Facebook Post")
- Figma
- Photoshop

**Quick Template:**
```
Background: Vineyard sunset image
Logo: Top-left or center
Text Overlay:
  "Viña Santa Cruz"
  "Valle de Colchagua"
  "150 Años de Tradición"
```

---

### 2. Google Search Console Setup (15 minutes)

**Step-by-step:**

1. Go to: https://search.google.com/search-console
2. Add property: `https://www.vinasantacruz.cl`
3. Choose verification method: "HTML tag"
4. Copy the verification code
5. Update `app/layout.tsx`:
   ```typescript
   verification: {
     google: 'paste-your-code-here', // Replace this
   }
   ```
6. Deploy changes
7. Return to Search Console and verify
8. Submit sitemap: `https://www.vinasantacruz.cl/sitemap.xml`

**After Setup:**
- Monitor "Coverage" tab for indexation issues
- Check "Performance" tab for keyword rankings
- Review "Enhancements" for structured data errors

---

### 3. Google Analytics 4 Setup (20 minutes)

**Installation:**

1. Go to: https://analytics.google.com
2. Create GA4 property for your site
3. Get Measurement ID (format: G-XXXXXXXXXX)
4. Install in Next.js:

Create `app/GoogleAnalytics.tsx`:
```typescript
'use client'

import Script from 'next/script'

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
```

Then add to `app/layout.tsx`:
```typescript
import GoogleAnalytics from './GoogleAnalytics'

// Inside <body>:
<GoogleAnalytics GA_MEASUREMENT_ID="G-XXXXXXXXXX" />
```

**Events to Track:**
- Tour bookings (conversions)
- Wine clicks
- Contact form submissions
- WhatsApp button clicks

---

### 4. Image Alt Text Audit (1-2 hours)

**What to do:**
Review all `<Image>` components and ensure descriptive alt text.

**Examples:**

❌ Bad:
```tsx
<Image src="/wine.jpg" alt="wine" />
```

✅ Good:
```tsx
<Image
  src="/carmenere-reserva.jpg"
  alt="Vino Carmenere Reserva - Viña Santa Cruz Valle de Colchagua"
/>
```

**Alt Text Formula:**
`[Product/Scene] - [Brand] [Location/Context]`

**Keywords to Include:**
- viña santa cruz
- valle de colchagua
- vino chileno
- enoturismo

**Priority Images:**
1. Hero images (homepage, experiencias)
2. Featured wines
3. Tour cards
4. Restaurant images

---

### 5. Test Structured Data (15 minutes)

**Tools:**
1. **Rich Results Test:**
   - URL: https://search.google.com/test/rich-results
   - Test: `https://www.vinasantacruz.cl`
   - Test: `https://www.vinasantacruz.cl/experiencias`

2. **Schema Markup Validator:**
   - URL: https://validator.schema.org/
   - Paste your page HTML
   - Look for errors/warnings

**What to Check:**
- ✅ Organization schema loads
- ✅ LocalBusiness schema loads
- ✅ Event schemas for tours load
- ✅ Breadcrumb navigation appears
- ⚠️ Fix any errors immediately

---

## 📊 Monitoring Dashboard (Weekly Tasks)

### Week 1-4: Foundation Monitoring

**Google Search Console (Weekly):**
- [ ] Check "Coverage" - ensure all pages indexed
- [ ] Review "Performance" - track impressions/clicks
- [ ] Monitor "Core Web Vitals" - ensure all green
- [ ] Check "Enhancements" - fix structured data errors

**Key Metrics to Watch:**
1. **Impressions:** Should increase 20-30% monthly
2. **Average Position:** Should improve (lower number = better)
3. **Click-through Rate:** Target 3-5% for top positions
4. **Indexed Pages:** Should match sitemap count

---

### Month 2-6: Growth Monitoring

**Ranking Keywords (Use Ahrefs/Semrush):**
- viña santa cruz
- enoturismo valle colchagua
- tours de vino chile
- degustación vinos colchagua

**Traffic Goals:**
- Month 1: Establish baseline
- Month 2: +20% organic traffic
- Month 3: +50% organic traffic
- Month 6: +100% organic traffic

---

## 🎯 Content Strategy for SEO

### Blog Post Ideas (High SEO Value)

1. **"Guía Completa del Valle de Colchagua: Qué Hacer y Visitar"**
   - Target: "valle de colchagua turismo"
   - Length: 2,000+ words
   - Include: Map, tour recommendations, restaurant guide

2. **"Los 10 Mejores Vinos Chilenos: Carmenere, Cabernet y Más"**
   - Target: "mejores vinos chilenos"
   - Length: 1,500+ words
   - Include: Tasting notes, food pairings

3. **"Enoturismo en Chile: Experiencias Imperdibles"**
   - Target: "enoturismo chile"
   - Length: 1,800+ words
   - Include: Comparison of wine regions

4. **"Historia de Viña Santa Cruz: 150 Años de Tradición"**
   - Target: "historia viña santa cruz"
   - Length: 1,200+ words
   - Include: Timeline, family heritage

5. **"Maridaje Perfecto: Vinos Chilenos y Gastronomía Local"**
   - Target: "maridaje vinos chilenos"
   - Length: 1,500+ words
   - Include: Recipe suggestions

**Blog SEO Checklist:**
- [ ] Keyword in H1, H2 headers
- [ ] Meta description 155-160 chars
- [ ] Internal links to tours/wines
- [ ] External links to authoritative sources
- [ ] Images with alt text
- [ ] FAQ schema at bottom

---

## 🔗 Link Building Strategy

### Local Citations (High Priority)

1. **Tourism Directories:**
   - Chile Travel (https://chile.travel)
   - Colchagua Valley Tourism Board
   - Ruta del Vino (if applicable)

2. **Wine Directories:**
   - Wines of Chile (https://winesofchile.org)
   - Wine-Searcher
   - Vivino (business profile)

3. **Business Directories:**
   - Google My Business (mandatory)
   - Bing Places
   - Apple Maps

### Partnership Opportunities

1. **Hotel Partnerships:**
   - Local hotels in Santa Cruz
   - Exchange links/referrals

2. **Tourism Blogs:**
   - Guest posts on Chilean travel blogs
   - Wine tourism websites

3. **Event Listings:**
   - List tours on Eventbrite, local event calendars
   - Wine festival participation

---

## 🛠️ Technical SEO Maintenance

### Monthly Tasks

**Performance Check:**
```bash
# Run Lighthouse audit
npm run build
npm run start
# Open Chrome DevTools > Lighthouse > Generate Report
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

**Sitemap Update:**
- Add new tours to `@/data/mockData`
- Sitemap auto-regenerates on build
- Verify at: `/sitemap.xml`

**Robots.txt Review:**
- Check for blocked critical pages
- Update for new sections

---

## 📱 Mobile SEO Checklist

**Test on Real Devices:**
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet

**Mobile-Specific Checks:**
- [ ] Text readable without zooming
- [ ] Buttons/links easily tappable (48px min)
- [ ] No horizontal scrolling
- [ ] Fast loading (< 3s)
- [ ] Mobile-friendly test: https://search.google.com/test/mobile-friendly

---

## 💡 Pro Tips

### Quick Wins for Rankings

1. **Update Existing Content:**
   - Add 200-300 words to thin pages
   - Include target keywords naturally
   - Add internal links

2. **Optimize Images:**
   - Use descriptive filenames: `tour-degustacion-vinos-colchagua.webp`
   - Compress: < 200KB for heroes, < 100KB for content
   - Format: WebP with JPEG fallback

3. **Improve CTR:**
   - Add power words to meta titles: "Premium", "Exclusivo", "Auténtico"
   - Include numbers: "12 Experiencias", "150 Años"
   - Use emojis sparingly in descriptions (test first)

4. **Speed Optimizations:**
   - Enable gzip/brotli compression
   - Use CDN for images (Cloudflare, Vercel)
   - Minimize JavaScript bundles

---

## ❓ FAQ - Common Issues

### Q: "My sitemap isn't showing in Google Search Console"
**A:**
1. Check sitemap loads: `https://www.vinasantacruz.cl/sitemap.xml`
2. Verify robots.txt includes: `Sitemap: https://www.vinasantacruz.cl/sitemap.xml`
3. Manually submit in GSC: Sitemaps > Add new sitemap

### Q: "Pages aren't indexing"
**A:**
1. Check robots.txt isn't blocking
2. Ensure `robots: { index: true }` in metadata
3. Request indexing in GSC (URL Inspection tool)
4. Wait 3-7 days for natural crawling

### Q: "Structured data errors in GSC"
**A:**
1. Use Rich Results Test to debug
2. Check for missing required fields
3. Validate JSON-LD syntax
4. Common fix: Add missing image URLs

### Q: "Core Web Vitals failing"
**A:**
1. Run PageSpeed Insights for specifics
2. Common fixes:
   - Optimize images (compress, WebP)
   - Reduce JavaScript bundle
   - Add font-display: swap
   - Enable server compression

---

## 📞 Support Resources

**Tools:**
- Google Search Console: https://search.google.com/search-console
- PageSpeed Insights: https://pagespeed.web.dev/
- Rich Results Test: https://search.google.com/test/rich-results
- Schema Validator: https://validator.schema.org/

**Learning:**
- Google SEO Starter Guide: https://developers.google.com/search/docs/beginner/seo-starter-guide
- Search Central: https://developers.google.com/search/docs
- Next.js SEO: https://nextjs.org/learn/seo/introduction-to-seo

**Communities:**
- r/SEO (Reddit)
- Search Engine Journal
- Moz Blog

---

## ✅ 30-Day SEO Launch Checklist

### Week 1: Foundation
- [ ] Create OG image
- [ ] Set up Google Search Console
- [ ] Set up Google Analytics 4
- [ ] Submit sitemap
- [ ] Test all structured data

### Week 2: Optimization
- [ ] Audit all image alt text
- [ ] Verify mobile-friendliness
- [ ] Run PageSpeed Insights
- [ ] Fix any Core Web Vitals issues
- [ ] Claim Google My Business

### Week 3: Content
- [ ] Add FAQ section to homepage
- [ ] Write first blog post
- [ ] Internal linking audit
- [ ] Create XML sitemap for blog

### Week 4: Promotion
- [ ] Submit to local directories
- [ ] Share on social media
- [ ] Reach out for partnerships
- [ ] Monitor first rankings

### Week 5-8: Monitor & Adjust
- [ ] Weekly GSC review
- [ ] Monthly traffic report
- [ ] Keyword ranking tracking
- [ ] Conversion optimization

---

## 🎯 Success Metrics (90 Days)

**Baseline (Day 0):**
- Organic traffic: [Current]
- Indexed pages: 0
- Ranking keywords: 0
- Average position: N/A

**Target (Day 90):**
- Organic traffic: +100%
- Indexed pages: All pages
- Ranking keywords: 50+ (top 100)
- Average position: 15-25
- Top 10 rankings: 5-10 keywords

**KPIs to Track:**
1. Organic sessions (GA4)
2. Keyword rankings (Ahrefs/Semrush)
3. Tour booking conversions
4. Google My Business views/clicks
5. Domain authority (Moz/Ahrefs)

---

*Last Updated: 2025-11-27*
*Questions? Review the full SEO_OPTIMIZATION_REPORT.md*
