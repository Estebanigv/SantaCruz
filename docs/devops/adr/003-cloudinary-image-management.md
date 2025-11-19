# ADR 003: Cloudinary for Image & Asset Management

**Status:** Accepted
**Date:** 2024-01-15
**Deciders:** Engineering Team, Product Team
**Consulted:** Frontend Team, Marketing

## Context

The Viña Santa Cruz platform requires robust image and media management for:
- Product images (multiple views, high quality)
- Wine label images
- Vineyard and winery photography
- Blog and content images
- User-uploaded content (reviews with photos)
- Marketing banners and promotional materials

### Requirements

1. **Automatic Optimization**
   - WebP/AVIF format conversion
   - Responsive image sizing
   - Lazy loading support
   - Quality optimization

2. **Performance**
   - Global CDN delivery
   - Fast image transformations
   - Caching strategies

3. **Developer Experience**
   - Simple upload API
   - URL-based transformations
   - Next.js integration

4. **Cost-Effectiveness**
   - Reasonable pricing for startup
   - Scalable as traffic grows

### Options Considered

1. **Cloudinary** (Recommended)
2. **AWS S3 + CloudFront + Lambda@Edge**
3. **Vercel Blob Storage**
4. **Supabase Storage**

## Decision

We will use **Cloudinary** as the primary image and asset management platform.

## Rationale

### Cloudinary Advantages ✅

1. **Automatic Image Optimization**
   - Format auto-detection (WebP, AVIF, JPG)
   - Quality optimization based on content
   - Automatic responsive image generation
   - Lazy loading placeholders (LQIP, blur)
   - Progressive JPEG encoding

2. **Powerful Transformations**
   - URL-based transformations (no backend code)
   - Dynamic resizing and cropping
   - Filters and effects
   - Overlays and watermarks
   - Smart cropping (face detection)

3. **Global CDN**
   - Akamai CDN network
   - Automatic geographic distribution
   - Edge caching
   - 99.99% uptime SLA

4. **Developer Experience**
   - Official Next.js integration
   - Simple upload API
   - Transformation presets
   - Asset management UI
   - Image analysis (moderation, tagging)

5. **Cost-Effective**
   - Free tier: 25 credits/month (25K transformations)
   - Perfect for development and initial launch
   - Predictable pricing as we scale

6. **Advanced Features**
   - Video hosting and streaming (future use)
   - Image moderation (AI-powered)
   - Asset search and tagging
   - Backup and versioning

### Alternative Comparisons

#### AWS S3 + CloudFront + Lambda@Edge
- ✅ Full control
- ✅ Potentially cheaper at massive scale
- ❌ Complex setup and maintenance
- ❌ Manual optimization pipeline required
- ❌ Higher DevOps overhead
- ❌ No built-in transformation API

**Verdict:** Over-engineered for our needs, requires dedicated DevOps

#### Vercel Blob Storage
- ✅ Integrated with Vercel
- ✅ Simple to use
- ❌ Limited transformation capabilities
- ❌ Higher cost per GB ($0.15/GB stored vs Cloudinary $0.10/GB)
- ❌ No advanced features (video, moderation)

**Verdict:** Good for simple file storage, not for image optimization

#### Supabase Storage
- ✅ Integrated with database platform
- ✅ Low cost
- ❌ Basic transformation features
- ❌ Limited CDN (compared to Cloudinary/Akamai)
- ❌ Less mature ecosystem

**Verdict:** Great for simple use cases, but lacks advanced image features

## Implementation

### Architecture

```
┌──────────────────────────────────────────────────┐
│             Next.js Application                  │
│  ┌────────────────────────────────────────────┐ │
│  │  Product Images   Blog Images   Banners    │ │
│  └────────────┬───────────┬───────────┬───────┘ │
└───────────────┼───────────┼───────────┼──────────┘
                │           │           │
                ▼           ▼           ▼
┌──────────────────────────────────────────────────┐
│              Cloudinary Platform                 │
│  ┌────────────────────────────────────────────┐ │
│  │  Storage   Transformation   CDN   Analytics│ │
│  └────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────┐
│              Akamai CDN (Global)                 │
│        Distributed to 2,800+ locations           │
└──────────────────────────────────────────────────┘
```

### Configuration

**Environment Variables:**
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="vina-santa-cruz"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="vina-santa-cruz-unsigned"
```

**Upload Preset Configuration:**
- **Name:** `vina-santa-cruz-products`
- **Signing Mode:** Signed (for server-side uploads)
- **Folder:** `products/`
- **Allowed formats:** jpg, png, webp
- **Max file size:** 10MB
- **Transformations:**
  - Quality: auto
  - Format: auto
  - Fetch format: auto

### Next.js Integration

**Installation:**
```bash
npm install next-cloudinary
```

**Usage Example:**
```typescript
import { CldImage } from 'next-cloudinary';

export default function ProductImage({ imageId, alt }) {
  return (
    <CldImage
      src={imageId}
      width={800}
      height={600}
      crop="fill"
      gravity="auto"
      quality="auto"
      format="auto"
      alt={alt}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
```

**Transformation Examples:**

```typescript
// Thumbnail
<CldImage
  src="product-image"
  width={200}
  height={200}
  crop="thumb"
  gravity="faces"
/>

// Responsive hero image
<CldImage
  src="hero-vineyard"
  width={1920}
  height={1080}
  crop="fill"
  quality="auto:best"
  format="auto"
  responsive
/>

// Product image with watermark
<CldImage
  src="product-premium-wine"
  width={800}
  height={600}
  underlay="watermark"
  opacity={30}
/>
```

### Upload Implementation

**Server-side upload (recommended for product images):**
```typescript
// app/api/upload/route.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: 'products',
        upload_preset: 'vina-santa-cruz-products',
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  return Response.json(result);
}
```

**Client-side upload (for user content):**
```typescript
// components/ImageUpload.tsx
'use client';

import { CldUploadWidget } from 'next-cloudinary';

export default function ImageUpload({ onUpload }) {
  return (
    <CldUploadWidget
      uploadPreset="vina-santa-cruz-user-content"
      onUpload={(result) => {
        if (result.event === 'success') {
          onUpload(result.info.public_id);
        }
      }}
    >
      {({ open }) => (
        <button onClick={() => open()}>
          Upload Image
        </button>
      )}
    </CldUploadWidget>
  );
}
```

## Image Optimization Strategy

### 1. Format Selection
```typescript
// Automatic format (recommended)
format="auto"  // Cloudinary chooses best format (WebP, AVIF, etc.)

// Specific formats for special cases
format="webp"  // Force WebP
format="avif"  // Force AVIF (better compression, newer browsers)
```

### 2. Quality Optimization
```typescript
// Auto quality (recommended)
quality="auto"       // Balance between quality and file size
quality="auto:best"  // Higher quality
quality="auto:good"  // Medium quality
quality="auto:eco"   // Maximum compression
```

### 3. Responsive Images
```typescript
<CldImage
  src="product-image"
  width={800}
  height={600}
  crop="fill"
  responsive
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
/>
// Generates srcset with multiple sizes automatically
```

### 4. Lazy Loading
```typescript
loading="lazy"  // Native browser lazy loading
```

### 5. Low Quality Image Placeholders (LQIP)
```typescript
// Blur placeholder
<CldImage
  src="product-image"
  width={800}
  height={600}
  placeholder="blur"
/>

// Custom blur effect
<CldImage
  src="product-image"
  width={800}
  height={600}
  effects={[{ blur: '1000' }]}
/>
```

## Performance Metrics

### Expected Performance Improvements

| Metric | Before (Unoptimized) | After (Cloudinary) | Improvement |
|--------|---------------------|-------------------|-------------|
| Image Size | 1.5MB | 150KB | 90% reduction |
| Format | JPEG | WebP/AVIF | Modern formats |
| Load Time (LCP) | 4.5s | 1.8s | 60% faster |
| Bandwidth | High | Low | 80% reduction |
| Lighthouse Score | 65 | 95+ | +30 points |

### Core Web Vitals Impact

- **LCP (Largest Contentful Paint):** < 2.5s ✅
  - Optimized images load faster
  - CDN reduces latency

- **CLS (Cumulative Layout Shift):** < 0.1 ✅
  - Width/height specified prevents layout shift

- **FID (First Input Delay):** < 100ms ✅
  - Lazy loading reduces initial bundle size

## Asset Organization

### Folder Structure
```
cloudinary://
├── products/
│   ├── wines/
│   │   ├── red/
│   │   ├── white/
│   │   └── sparkling/
│   ├── bottles/
│   └── labels/
├── content/
│   ├── blog/
│   ├── vineyard/
│   └── winery/
├── marketing/
│   ├── banners/
│   ├── campaigns/
│   └── social/
└── user-content/
    └── reviews/
```

### Naming Convention
```
Format: {category}_{product-id}_{variant}_{timestamp}

Examples:
- products_wine_red-cabernet_001_front_20240115.jpg
- products_wine_red-cabernet_001_back_20240115.jpg
- content_blog_harvest-2024_hero_20240115.jpg
```

## Cost Analysis

### Free Tier (Development/Staging)
- 25 credits/month
- 25GB storage
- 25GB bandwidth
- 25K transformations
- **Cost: $0/month**

**Sufficient for:**
- Development environment
- Staging environment
- Initial soft launch (< 1K users/month)

### Paid Tier (Production - Plus Plan)
- $99/month
- 85 credits/month
- 107GB storage
- 107GB bandwidth
- 107K transformations
- Advanced features (video, AI)

**Sufficient for:**
- Production environment
- 15K users/month
- 500 products with 5 images each
- Blog and marketing content

### Cost Projections

| Traffic | Transformations/month | Storage | Bandwidth | Plan | Cost |
|---------|----------------------|---------|-----------|------|------|
| 5K users | 50K | 10GB | 50GB | Free | $0 |
| 15K users | 100K | 30GB | 100GB | Plus | $99 |
| 50K users | 300K | 50GB | 300GB | Advanced | $249 |

## Backup Strategy

### Cloudinary Backups
- Automatic versioning (keeps previous versions)
- Asset history and rollback
- Download API for bulk backup

### Manual Backups
```bash
# Backup all assets (monthly)
node scripts/backup-cloudinary-assets.js

# Script downloads all assets to local storage/S3
# Keeps metadata (transformations, tags, etc.)
```

## Content Moderation

### AI-Powered Moderation
```typescript
// Enable automatic moderation for user uploads
cloudinary.uploader.upload(file, {
  moderation: 'aws_rek',  // AWS Rekognition
  // or
  moderation: 'webpurify', // WebPurify
});

// Check moderation status
if (result.moderation[0].status === 'approved') {
  // Save to database
} else {
  // Reject upload
}
```

### Manual Review Queue
- Admin dashboard to review flagged images
- Approve/reject workflow
- Automated notifications

## Consequences

### Positive Consequences ✅

1. **Improved Performance**
   - 90% reduction in image sizes
   - Faster page loads
   - Better Core Web Vitals scores

2. **Better User Experience**
   - Responsive images for all devices
   - Lazy loading reduces initial load
   - Modern formats (WebP/AVIF)

3. **Developer Productivity**
   - URL-based transformations (no backend code)
   - Easy integration with Next.js
   - No image processing infrastructure needed

4. **Scalability**
   - Global CDN handles traffic spikes
   - Automatic scaling
   - No server-side image processing load

5. **Future-Proof**
   - Video support when needed
   - AI features (tagging, moderation)
   - Continuous platform improvements

### Negative Consequences ⚠️

1. **Vendor Lock-in**
   - Cloudinary-specific URL structure
   - Migration would require URL updates
   - **Mitigation:** Abstract image URLs behind our own API
   - **Mitigation:** Keep original images backed up

2. **Cost at Scale**
   - Can become expensive at very high traffic
   - **Mitigation:** Implement aggressive CDN caching
   - **Mitigation:** Monitor usage monthly
   - **Mitigation:** Optimize transformation usage

3. **Dependency**
   - Service outage affects our images
   - **Mitigation:** Cloudinary has 99.99% SLA
   - **Mitigation:** Implement fallback to cached images
   - **Note:** Better SLA than self-hosted solution

## Monitoring

### Metrics to Track
- Monthly transformations used
- Storage usage
- Bandwidth usage
- CDN cache hit rate
- Image load times

### Alerts
- Usage approaching plan limits (80% threshold)
- Unusual spike in transformations
- Failed uploads

## Success Metrics

1. **Performance:** LCP < 2.5s for pages with images
2. **Optimization:** Average image size < 200KB
3. **Format Adoption:** > 80% of users receive WebP/AVIF
4. **CDN Hit Rate:** > 95%
5. **Cost Efficiency:** < $0.01 per user per month

## Review

This decision will be reviewed:
- **Monthly:** Check usage vs. plan limits
- **Quarterly:** Evaluate cost-effectiveness
- **When traffic increases 3x:** Re-assess plan tier
- **Annually:** Compare with alternative solutions

## References

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [next-cloudinary Package](https://next-cloudinary.spacejelly.dev/)
- Internal: Image optimization guidelines

## Related ADRs

- ADR 001: Vercel as Deployment Platform
- ADR 002: PostgreSQL as Primary Database

## Approval

- ✅ Engineering Lead: [Name]
- ✅ Frontend Lead: [Name]
- ✅ Product Manager: [Name]

**Last Updated:** 2024-01-15
