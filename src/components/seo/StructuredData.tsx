import Script from 'next/script'

interface OrganizationSchemaProps {
  name?: string
  url?: string
  logo?: string
  description?: string
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  contactPoint?: {
    telephone: string
    contactType: string
    email?: string
  }
  sameAs?: string[]
}

export function OrganizationSchema({
  name = 'Viña Santa Cruz',
  url = 'https://www.vinasantacruz.cl',
  logo = 'https://www.vinasantacruz.cl/images/logo_vsc_png_byw.png',
  description = 'Viña premium chilena con 150 años de tradición en el Valle de Colchagua. Experiencias de enoturismo, degustaciones y vinos premium.',
  address = {
    streetAddress: 'Valle de Colchagua',
    addressLocality: 'Santa Cruz',
    addressRegion: 'Región del Libertador General Bernardo O\'Higgins',
    postalCode: '3130000',
    addressCountry: 'CL',
  },
  contactPoint = {
    telephone: '+56-72-2821010',
    contactType: 'customer service',
    email: 'info@vinasantacruz.cl',
  },
  sameAs = [
    'https://www.facebook.com/vinasantacruz',
    'https://www.instagram.com/vinasantacruz',
    'https://www.twitter.com/vinasantacruz',
  ],
}: OrganizationSchemaProps = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Winery',
    '@id': url,
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
    description,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      ...contactPoint,
    },
    sameAs,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '328',
    },
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}

interface LocalBusinessSchemaProps {
  name?: string
  url?: string
  priceRange?: string
}

export function LocalBusinessSchema({
  name = 'Viña Santa Cruz',
  url = 'https://www.vinasantacruz.cl',
  priceRange = '$$-$$$',
}: LocalBusinessSchemaProps = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': url,
    name,
    url,
    image: 'https://www.vinasantacruz.cl/images/og-image.jpg',
    priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Valle de Colchagua',
      addressLocality: 'Santa Cruz',
      addressRegion: 'Región del Libertador General Bernardo O\'Higgins',
      postalCode: '3130000',
      addressCountry: 'CL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-34.6377',
      longitude: '-71.3677',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    telephone: '+56-72-2821010',
  }

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}

interface ProductSchemaProps {
  name: string
  description: string
  image: string
  price: number
  category: string
  url: string
}

export function ProductSchema({ name, description, image, price, category, url }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    category,
    url,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'CLP',
      availability: 'https://schema.org/InStock',
      url,
    },
    brand: {
      '@type': 'Brand',
      name: 'Viña Santa Cruz',
    },
  }

  return (
    <Script
      id={`product-schema-${name.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}

interface EventSchemaProps {
  name: string
  description: string
  image: string
  startDate?: string
  endDate?: string
  price: number
  location?: string
  url: string
}

export function EventSchema({
  name,
  description,
  image,
  startDate,
  endDate,
  price,
  location = 'Viña Santa Cruz, Valle de Colchagua',
  url,
}: EventSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    image,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    location: {
      '@type': 'Place',
      name: location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Santa Cruz',
        addressRegion: 'Región del Libertador General Bernardo O\'Higgins',
        addressCountry: 'CL',
      },
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'CLP',
      availability: 'https://schema.org/InStock',
      url,
    },
    organizer: {
      '@type': 'Organization',
      name: 'Viña Santa Cruz',
      url: 'https://www.vinasantacruz.cl',
    },
  }

  return (
    <Script
      id={`event-schema-${name.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}

interface WebPageSchemaProps {
  name: string
  description: string
  url: string
}

export function WebPageSchema({ name, description, url }: WebPageSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'Viña Santa Cruz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.vinasantacruz.cl/images/logo_vsc_png_byw.png',
      },
    },
  }

  return (
    <Script
      id="webpage-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}
