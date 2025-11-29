import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '*.json',
          '/checkout/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/checkout/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
    ],
    sitemap: 'https://www.vinasantacruz.cl/sitemap.xml',
    host: 'https://www.vinasantacruz.cl',
  }
}
