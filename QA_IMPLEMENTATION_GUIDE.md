# GUÍA DE IMPLEMENTACIÓN QA - VIÑA SANTA CRUZ
## Setup y Configuración Práctica

**Documento complementario a:** QA_MASTER_PLAN.md

---

## TABLA DE CONTENIDOS

1. [Setup Inicial del Proyecto](#1-setup-inicial-del-proyecto)
2. [Configuración de Testing Frameworks](#2-configuración-de-testing-frameworks)
3. [Test Cases Implementables](#3-test-cases-implementables)
4. [Scripts de Automatización](#4-scripts-de-automatización)
5. [Database Seeds](#5-database-seeds)
6. [CI/CD Templates](#6-cicd-templates)
7. [Quick Start Checklist](#7-quick-start-checklist)

---

## 1. SETUP INICIAL DEL PROYECTO

### 1.1 Instalación de Dependencias

```bash
# Core testing dependencies
npm install --save-dev vitest @vitest/ui @vitest/coverage-v8
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev jsdom happy-dom

# E2E testing
npm install --save-dev @playwright/test
npx playwright install

# MSW (Mock Service Worker)
npm install --save-dev msw

# Accessibility testing
npm install --save-dev @axe-core/playwright

# Performance testing
npm install --save-dev @lhci/cli

# Security scanning
npm install --save-dev audit-ci

# Husky and lint-staged
npm install --save-dev husky lint-staged
npx husky install
```

---

### 1.2 Estructura de Directorios

```
proyecto/
├── __tests__/               # Unit and integration tests
│   ├── unit/
│   │   ├── components/      # Component unit tests
│   │   ├── hooks/           # Custom hooks tests
│   │   ├── services/        # Service layer tests
│   │   ├── utils/           # Utility functions tests
│   │   └── stores/          # Zustand stores tests
│   ├── integration/
│   │   ├── api/             # API integration tests
│   │   ├── flows/           # User flow integration tests
│   │   └── forms/           # Form submission tests
│   └── setup.ts             # Global test setup
│
├── e2e/                     # Playwright E2E tests
│   ├── auth/
│   │   ├── login.spec.ts
│   │   ├── register.spec.ts
│   │   └── oauth.spec.ts
│   ├── wines/
│   │   ├── catalog.spec.ts
│   │   ├── detail.spec.ts
│   │   └── purchase.spec.ts
│   ├── tours/
│   │   ├── booking.spec.ts
│   │   └── cancellation.spec.ts
│   ├── memberships/
│   │   └── subscription.spec.ts
│   └── fixtures/            # Test data and page objects
│       ├── test-data.ts
│       └── page-objects/
│
├── mocks/                   # MSW mock handlers
│   ├── handlers/
│   │   ├── auth.ts
│   │   ├── wines.ts
│   │   ├── payments.ts
│   │   └── external.ts     # External APIs (Transbank, Brevo, etc)
│   ├── server.ts           # Node server for tests
│   └── browser.ts          # Browser worker for dev
│
├── scripts/                 # Utility scripts
│   ├── db/
│   │   ├── migrate.js
│   │   ├── seed.js
│   │   ├── seed-test.js
│   │   └── reset-db.js
│   ├── test/
│   │   ├── check-coverage.js
│   │   └── generate-report.js
│   └── ci/
│       └── pre-deploy-check.sh
│
├── vitest.config.ts         # Vitest configuration
├── vitest.config.unit.ts    # Unit tests config
├── vitest.config.integration.ts  # Integration tests config
├── playwright.config.ts     # Playwright configuration
└── lighthouserc.js         # Lighthouse CI config
```

---

## 2. CONFIGURACIÓN DE TESTING FRAMEWORKS

### 2.1 Vitest Configuration

**vitest.config.ts** (General)
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: true,
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: ['node_modules', 'dist', '.next', 'e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        '__tests__/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData/*',
        '**/types/*',
        '.next/',
        'dist/'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  }
})
```

**vitest.config.unit.ts** (Unit Tests Only)
```typescript
import { defineConfig, mergeConfig } from 'vitest/config'
import baseConfig from './vitest.config'

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      include: ['__tests__/unit/**/*.{test,spec}.{js,jsx,ts,tsx}'],
      coverage: {
        thresholds: {
          global: {
            branches: 75,
            functions: 80,
            lines: 80,
            statements: 80
          }
        }
      }
    }
  })
)
```

**vitest.config.integration.ts** (Integration Tests)
```typescript
import { defineConfig, mergeConfig } from 'vitest/config'
import baseConfig from './vitest.config'

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      include: ['__tests__/integration/**/*.{test,spec}.{js,jsx,ts,tsx}'],
      testTimeout: 10000, // Longer timeout for integration tests
      hookTimeout: 10000
    }
  })
)
```

---

### 2.2 Test Setup File

**tests/setup.ts**
```typescript
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, afterAll } from 'vitest'
import { server } from '../mocks/server'

// Setup MSW
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      pathname: '/',
      query: {},
      asPath: '/'
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  }
}))

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  }
}))

// Mock environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000/api'
process.env.NODE_ENV = 'test'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
} as any

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}
global.localStorage = localStorageMock as any
```

---

### 2.3 MSW Mock Handlers

**mocks/server.ts**
```typescript
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

**mocks/handlers/index.ts**
```typescript
import { authHandlers } from './auth'
import { wineHandlers } from './wines'
import { tourHandlers } from './tours'
import { paymentHandlers } from './payments'
import { externalHandlers } from './external'

export const handlers = [
  ...authHandlers,
  ...wineHandlers,
  ...tourHandlers,
  ...paymentHandlers,
  ...externalHandlers
]
```

**mocks/handlers/wines.ts**
```typescript
import { http, HttpResponse } from 'msw'

const mockWines = [
  {
    id: '1',
    slug: 'carmenere-reserva-2020',
    name: 'Carmenere Reserva 2020',
    category: 'red',
    region: 'Valle de Colchagua',
    price: 18990,
    stock: 45,
    rating: 4.5,
    reviews_count: 23,
    image: '/images/wines/carmenere-reserva.jpg',
    description: 'Vino tinto elegante con notas frutales...'
  },
  {
    id: '2',
    slug: 'sauvignon-blanc-reserva-2021',
    name: 'Sauvignon Blanc Reserva 2021',
    category: 'white',
    region: 'Valle de Casablanca',
    price: 15990,
    stock: 32,
    rating: 4.3,
    reviews_count: 18,
    image: '/images/wines/sauvignon-blanc.jpg',
    description: 'Vino blanco fresco y aromático...'
  }
]

export const wineHandlers = [
  // GET all wines
  http.get('/api/wines', ({ request }) => {
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const region = url.searchParams.get('region')

    let filteredWines = [...mockWines]

    if (category) {
      filteredWines = filteredWines.filter(w => w.category === category)
    }

    if (region) {
      filteredWines = filteredWines.filter(w => w.region === region)
    }

    return HttpResponse.json({
      data: filteredWines,
      meta: {
        total: filteredWines.length,
        page: 1,
        per_page: 12
      }
    })
  }),

  // GET single wine
  http.get('/api/wines/:slug', ({ params }) => {
    const { slug } = params
    const wine = mockWines.find(w => w.slug === slug)

    if (!wine) {
      return HttpResponse.json(
        { error: 'Wine not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({ data: wine })
  })
]
```

**mocks/handlers/auth.ts**
```typescript
import { http, HttpResponse } from 'msw'

export const authHandlers = [
  // POST login
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as any

    if (body.email === 'user@test.com' && body.password === 'TestPass123!') {
      return HttpResponse.json({
        data: {
          user: {
            id: '1',
            email: 'user@test.com',
            firstName: 'Juan',
            lastName: 'Pérez',
            role: 'user'
          },
          token: 'mock_jwt_token_12345'
        }
      })
    }

    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }),

  // POST register
  http.post('/api/auth/register', async ({ request }) => {
    const body = await request.json() as any

    return HttpResponse.json({
      data: {
        user: {
          id: '123',
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          role: 'user',
          emailVerified: false
        },
        message: 'Verification email sent'
      }
    }, { status: 201 })
  }),

  // GET current user
  http.get('/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return HttpResponse.json({
      data: {
        id: '1',
        email: 'user@test.com',
        firstName: 'Juan',
        lastName: 'Pérez',
        role: 'user'
      }
    })
  })
]
```

**mocks/handlers/payments.ts**
```typescript
import { http, HttpResponse } from 'msw'

export const paymentHandlers = [
  // POST create payment
  http.post('/api/payments/create', async ({ request }) => {
    const body = await request.json() as any

    // Simulate Transbank
    if (body.method === 'transbank') {
      return HttpResponse.json({
        data: {
          token: 'mock_transbank_token_abc123',
          url: 'http://localhost:3000/api/payments/transbank/redirect?token=mock_transbank_token_abc123'
        }
      })
    }

    return HttpResponse.json({
      data: {
        paymentId: 'pay_mock_123',
        status: 'pending'
      }
    })
  }),

  // GET payment callback (Transbank)
  http.get('/api/payments/transbank/callback', ({ request }) => {
    const url = new URL(request.url)
    const token = url.searchParams.get('token_ws')

    if (token === 'mock_transbank_token_abc123') {
      return HttpResponse.json({
        data: {
          status: 'AUTHORIZED',
          amount: 38000,
          orderId: 'ORD-123456'
        }
      })
    }

    return HttpResponse.json(
      { error: 'Invalid token' },
      { status: 400 }
    )
  })
]
```

**mocks/handlers/external.ts**
```typescript
import { http, HttpResponse } from 'msw'

export const externalHandlers = [
  // Mock Brevo (email)
  http.post('https://api.brevo.com/v3/smtp/email', () => {
    return HttpResponse.json({
      messageId: '<mock-message-id@smtp-relay.mailin.fr>'
    })
  }),

  // Mock Twilio (SMS)
  http.post('https://api.twilio.com/2010-04-01/Accounts/:accountSid/Messages.json', () => {
    return HttpResponse.json({
      sid: 'SMmock123456789',
      status: 'queued',
      to: '+56912345678'
    })
  }),

  // Mock Cloudinary
  http.post('https://api.cloudinary.com/v1_1/:cloudName/image/upload', () => {
    return HttpResponse.json({
      secure_url: 'https://res.cloudinary.com/mock/image/upload/v123456/mock_image.jpg',
      public_id: 'mock_image_id_abc123',
      format: 'jpg',
      width: 1200,
      height: 800
    })
  }),

  // Mock Google OAuth
  http.post('https://oauth2.googleapis.com/token', () => {
    return HttpResponse.json({
      access_token: 'mock_google_access_token',
      expires_in: 3600,
      token_type: 'Bearer',
      id_token: 'mock_google_id_token'
    })
  })
]
```

---

### 2.4 Playwright Configuration

**playwright.config.ts**
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list']
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Extended timeout for slower CI environments
    actionTimeout: 10000,
    navigationTimeout: 30000
  },

  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 }
      }
    },

    // Mobile browsers
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] }
    },

    // Tablet
    {
      name: 'iPad',
      use: { ...devices['iPad Pro'] }
    }
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  }
})
```

---

## 3. TEST CASES IMPLEMENTABLES

### 3.1 Unit Test Examples

**__tests__/unit/utils/formatCurrency.test.ts**
```typescript
import { describe, it, expect } from 'vitest'
import { formatCurrency } from '@/utils/formatCurrency'

describe('formatCurrency', () => {
  it('should format CLP currency correctly', () => {
    expect(formatCurrency(18990)).toBe('$18.990')
    expect(formatCurrency(150000)).toBe('$150.000')
  })

  it('should handle zero value', () => {
    expect(formatCurrency(0)).toBe('$0')
  })

  it('should handle negative values', () => {
    expect(formatCurrency(-5000)).toBe('-$5.000')
  })

  it('should handle decimal values', () => {
    expect(formatCurrency(18990.50)).toBe('$18.991')
  })
})
```

**__tests__/unit/hooks/useCart.test.ts**
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCartStore } from '@/stores/cart'

describe('useCartStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useCartStore.setState({ items: [], total: 0 })
  })

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem({
        id: '1',
        name: 'Carmenere Reserva 2020',
        price: 18990,
        quantity: 2
      })
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.total).toBe(37980)
  })

  it('should increment quantity if item already exists', () => {
    const { result } = renderHook(() => useCartStore())

    const item = {
      id: '1',
      name: 'Carmenere Reserva 2020',
      price: 18990,
      quantity: 2
    }

    act(() => {
      result.current.addItem(item)
      result.current.addItem({ ...item, quantity: 1 })
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(3)
    expect(result.current.total).toBe(56970)
  })

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem({
        id: '1',
        name: 'Carmenere Reserva 2020',
        price: 18990,
        quantity: 2
      })
    })

    expect(result.current.items).toHaveLength(1)

    act(() => {
      result.current.removeItem('1')
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.total).toBe(0)
  })

  it('should clear cart', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem({
        id: '1',
        name: 'Carmenere Reserva 2020',
        price: 18990,
        quantity: 2
      })
      result.current.addItem({
        id: '2',
        name: 'Sauvignon Blanc 2021',
        price: 15990,
        quantity: 1
      })
    })

    expect(result.current.items).toHaveLength(2)

    act(() => {
      result.current.clearCart()
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.total).toBe(0)
  })
})
```

**__tests__/unit/components/WineCard.test.tsx**
```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import WineCard from '@/components/molecules/WineCard'

const mockWine = {
  id: '1',
  slug: 'carmenere-reserva-2020',
  name: 'Carmenere Reserva 2020',
  category: 'red',
  region: 'Valle de Colchagua',
  price: 18990,
  stock: 45,
  rating: 4.5,
  reviewsCount: 23,
  image: '/images/wines/carmenere-reserva.jpg'
}

describe('WineCard', () => {
  it('should render wine information correctly', () => {
    render(<WineCard wine={mockWine} />)

    expect(screen.getByText('Carmenere Reserva 2020')).toBeInTheDocument()
    expect(screen.getByText('Valle de Colchagua')).toBeInTheDocument()
    expect(screen.getByText('$18.990')).toBeInTheDocument()
    expect(screen.getByText('4.5')).toBeInTheDocument()
    expect(screen.getByText('(23)')).toBeInTheDocument()
  })

  it('should show out of stock badge when stock is 0', () => {
    render(<WineCard wine={{ ...mockWine, stock: 0 }} />)

    expect(screen.getByText('Agotado')).toBeInTheDocument()
  })

  it('should show low stock badge when stock is low', () => {
    render(<WineCard wine={{ ...mockWine, stock: 5 }} />)

    expect(screen.getByText('Últimas unidades')).toBeInTheDocument()
  })

  it('should call onAddToCart when button clicked', () => {
    const onAddToCart = vi.fn()
    render(<WineCard wine={mockWine} onAddToCart={onAddToCart} />)

    const addButton = screen.getByRole('button', { name: /agregar al carrito/i })
    fireEvent.click(addButton)

    expect(onAddToCart).toHaveBeenCalledWith(mockWine)
  })

  it('should disable add to cart button when out of stock', () => {
    render(<WineCard wine={{ ...mockWine, stock: 0 }} />)

    const addButton = screen.getByRole('button', { name: /agregar al carrito/i })
    expect(addButton).toBeDisabled()
  })

  it('should navigate to detail page when card clicked', () => {
    const mockPush = vi.fn()
    vi.mock('next/navigation', () => ({
      useRouter: () => ({ push: mockPush })
    }))

    render(<WineCard wine={mockWine} />)

    const card = screen.getByTestId('wine-card')
    fireEvent.click(card)

    expect(mockPush).toHaveBeenCalledWith('/vinos/carmenere-reserva-2020')
  })
})
```

---

### 3.2 Integration Test Examples

**__tests__/integration/api/wines.test.ts**
```typescript
import { describe, it, expect } from 'vitest'
import { wineService } from '@/services/wineService'

describe('Wine Service Integration', () => {
  it('should fetch all wines', async () => {
    const result = await wineService.getWines()

    expect(result.data).toBeDefined()
    expect(Array.isArray(result.data)).toBe(true)
    expect(result.data.length).toBeGreaterThan(0)
  })

  it('should fetch wines with filters', async () => {
    const result = await wineService.getWines({
      category: 'red',
      region: 'Valle de Colchagua'
    })

    expect(result.data).toBeDefined()
    result.data.forEach(wine => {
      expect(wine.category).toBe('red')
      expect(wine.region).toBe('Valle de Colchagua')
    })
  })

  it('should fetch single wine by slug', async () => {
    const result = await wineService.getWine('carmenere-reserva-2020')

    expect(result.data).toBeDefined()
    expect(result.data.slug).toBe('carmenere-reserva-2020')
    expect(result.data.name).toBe('Carmenere Reserva 2020')
  })

  it('should return 404 for non-existent wine', async () => {
    await expect(
      wineService.getWine('non-existent-wine')
    ).rejects.toThrow('Wine not found')
  })
})
```

**__tests__/integration/flows/add-to-cart.test.tsx**
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WineCatalog from '@/app/vinos/page'

describe('Add to Cart Flow', () => {
  it('should add wine to cart and update counter', async () => {
    const user = userEvent.setup()

    render(<WineCatalog />)

    // Wait for wines to load
    await waitFor(() => {
      expect(screen.getByText('Carmenere Reserva 2020')).toBeInTheDocument()
    })

    // Initial cart should be empty
    const cartBadge = screen.getByTestId('cart-badge')
    expect(cartBadge).toHaveTextContent('0')

    // Add wine to cart
    const addButton = screen.getAllByRole('button', { name: /agregar al carrito/i })[0]
    await user.click(addButton)

    // Cart counter should update
    await waitFor(() => {
      expect(cartBadge).toHaveTextContent('1')
    })

    // Toast notification should appear
    expect(screen.getByText(/agregado al carrito/i)).toBeInTheDocument()
  })

  it('should update cart total when adding multiple items', async () => {
    const user = userEvent.setup()

    render(<WineCatalog />)

    await waitFor(() => {
      expect(screen.getByText('Carmenere Reserva 2020')).toBeInTheDocument()
    })

    // Add two different wines
    const addButtons = screen.getAllByRole('button', { name: /agregar al carrito/i })
    await user.click(addButtons[0])
    await user.click(addButtons[1])

    // Open cart
    const cartButton = screen.getByTestId('cart-button')
    await user.click(cartButton)

    // Verify total
    await waitFor(() => {
      const total = screen.getByTestId('cart-total')
      expect(total).toHaveTextContent('$34.980') // 18990 + 15990
    })
  })
})
```

---

### 3.3 E2E Test Examples

**e2e/wines/purchase-flow.spec.ts**
```typescript
import { test, expect } from '@playwright/test'

test.describe('Complete Wine Purchase Flow', () => {
  test('should complete wine purchase from catalog to confirmation', async ({ page }) => {
    // 1. Navigate to wine catalog
    await page.goto('/vinos')
    await expect(page).toHaveTitle(/Vinos/)

    // 2. Search for wine
    await page.getByPlaceholder('Buscar vinos...').fill('Carmenere')
    await page.keyboard.press('Enter')

    await expect(page.getByText('Carmenere Reserva 2020')).toBeVisible()

    // 3. Click on wine to see detail
    await page.getByText('Carmenere Reserva 2020').click()
    await expect(page).toHaveURL(/\/vinos\/carmenere-reserva-2020/)

    // 4. Add to cart
    await page.getByRole('button', { name: /agregar al carrito/i }).click()
    await expect(page.getByText(/agregado al carrito/i)).toBeVisible()

    // 5. Go to cart
    await page.getByTestId('cart-button').click()
    await expect(page.getByText('Tu Carrito')).toBeVisible()
    await expect(page.getByText('Carmenere Reserva 2020')).toBeVisible()

    // 6. Proceed to checkout
    await page.getByRole('button', { name: /proceder al checkout/i }).click()

    // 7. Login (or register)
    await page.getByLabel('Email').fill('user@test.com')
    await page.getByLabel('Contraseña').fill('TestPass123!')
    await page.getByRole('button', { name: /iniciar sesión/i }).click()

    // 8. Fill shipping information
    await expect(page).toHaveURL(/\/checkout/)
    await page.getByLabel('Nombre completo').fill('Juan Pérez')
    await page.getByLabel('Dirección').fill('Av. Libertador 123')
    await page.getByLabel('Comuna').selectOption('Santiago')
    await page.getByLabel('Región').selectOption('Metropolitana')
    await page.getByLabel('Teléfono').fill('+56912345678')

    await page.getByRole('button', { name: /continuar a pago/i }).click()

    // 9. Select payment method
    await page.getByLabel('Tarjeta de crédito/débito').check()

    // 10. Review order and pay
    await expect(page.getByText('Resumen del Pedido')).toBeVisible()
    await expect(page.getByText('$18.990')).toBeVisible()

    await page.getByRole('button', { name: /pagar/i }).click()

    // 11. Mock Transbank redirect and return
    // In real test with sandbox, this would go to actual Transbank
    await page.waitForURL(/\/pedido\/confirmacion/)

    // 12. Verify confirmation page
    await expect(page.getByText('¡Pedido Confirmado!')).toBeVisible()
    await expect(page.getByText(/Número de pedido:/i)).toBeVisible()
    await expect(page.getByText('Carmenere Reserva 2020')).toBeVisible()

    // 13. Verify email sent (check API call)
    // This would need access to logs or email service
  })

  test('should handle out of stock wine gracefully', async ({ page }) => {
    await page.goto('/vinos/out-of-stock-wine')

    await expect(page.getByText('Agotado')).toBeVisible()

    const addButton = page.getByRole('button', { name: /agregar al carrito/i })
    await expect(addButton).toBeDisabled()
  })

  test('should calculate discount for members correctly', async ({ page }) => {
    // Login as Gold member
    await page.goto('/login')
    await page.getByLabel('Email').fill('member-gold@test.com')
    await page.getByLabel('Contraseña').fill('TestPass123!')
    await page.getByRole('button', { name: /iniciar sesión/i }).click()

    // Add wine to cart
    await page.goto('/vinos/carmenere-reserva-2020')
    await page.getByRole('button', { name: /agregar al carrito/i }).click()

    // Go to checkout
    await page.getByTestId('cart-button').click()
    await page.getByRole('button', { name: /proceder al checkout/i }).click()

    // Verify member discount applied (15% for Gold)
    await expect(page.getByText('Descuento Miembro Gold (15%)')).toBeVisible()
    await expect(page.getByText('$16.142')).toBeVisible() // 18990 * 0.85
  })
})
```

**e2e/auth/login.spec.ts**
```typescript
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel('Email').fill('user@test.com')
    await page.getByLabel('Contraseña').fill('TestPass123!')
    await page.getByRole('button', { name: /iniciar sesión/i }).click()

    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByText('Bienvenido, Juan')).toBeVisible()
  })

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel('Email').fill('user@test.com')
    await page.getByLabel('Contraseña').fill('WrongPassword')
    await page.getByRole('button', { name: /iniciar sesión/i }).click()

    await expect(page.getByText(/email o contraseña incorrectos/i)).toBeVisible()
    await expect(page).toHaveURL('/login')
  })

  test('should register new user', async ({ page }) => {
    await page.goto('/registro')

    await page.getByLabel('Nombre').fill('Pedro')
    await page.getByLabel('Apellido').fill('Silva')
    await page.getByLabel('Email').fill('pedro.silva@example.com')
    await page.getByLabel('Contraseña', { exact: true }).fill('SecurePass123!')
    await page.getByLabel('Confirmar contraseña').fill('SecurePass123!')
    await page.getByLabel('Fecha de nacimiento').fill('1990-05-15')
    await page.getByLabel(/acepto los términos/i).check()

    await page.getByRole('button', { name: /crear cuenta/i }).click()

    await expect(page).toHaveURL('/verificar-email')
    await expect(page.getByText(/revisa tu correo/i)).toBeVisible()
  })

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.getByLabel('Email').fill('user@test.com')
    await page.getByLabel('Contraseña').fill('TestPass123!')
    await page.getByRole('button', { name: /iniciar sesión/i }).click()
    await expect(page).toHaveURL('/dashboard')

    // Logout
    await page.getByTestId('user-menu').click()
    await page.getByRole('menuitem', { name: /cerrar sesión/i }).click()

    await expect(page).toHaveURL('/')
    await expect(page.getByRole('button', { name: /iniciar sesión/i })).toBeVisible()
  })
})
```

**e2e/accessibility/a11y.spec.ts**
```typescript
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Tests', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('wine catalog should be keyboard navigable', async ({ page }) => {
    await page.goto('/vinos')

    // Tab through elements
    await page.keyboard.press('Tab') // Skip to main content link
    await page.keyboard.press('Enter')

    await page.keyboard.press('Tab') // Search field
    await expect(page.getByPlaceholder('Buscar vinos...')).toBeFocused()

    await page.keyboard.press('Tab') // First filter
    await page.keyboard.press('Tab') // Second filter
    await page.keyboard.press('Tab') // First wine card

    // Should be able to activate with Enter
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/vinos\//)
  })

  test('form should have proper labels and error messages', async ({ page }) => {
    await page.goto('/contacto')

    // Submit empty form
    await page.getByRole('button', { name: /enviar/i }).click()

    // Check for error messages
    await expect(page.getByText(/el nombre es requerido/i)).toBeVisible()
    await expect(page.getByText(/el email es requerido/i)).toBeVisible()

    // Check ARIA attributes
    const nameInput = page.getByLabel('Nombre')
    await expect(nameInput).toHaveAttribute('aria-invalid', 'true')
    await expect(nameInput).toHaveAttribute('aria-describedby')
  })

  test('images should have alt text', async ({ page }) => {
    await page.goto('/vinos')

    const images = page.locator('img')
    const count = await images.count()

    for (let i = 0; i < count; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
      expect(alt).not.toBe('')
    }
  })
})
```

---

## 4. SCRIPTS DE AUTOMATIZACIÓN

### 4.1 Database Scripts

**scripts/db/seed-test.js**
```javascript
const { Pool } = require('pg')
const bcrypt = require('bcryptjs')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function seedTestData() {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    console.log('Seeding test users...')
    const passwordHash = await bcrypt.hash('TestPass123!', 10)

    await client.query(`
      INSERT INTO users (email, password_hash, first_name, last_name, role, email_verified, age_verified, created_at)
      VALUES
        ('user@test.com', $1, 'Juan', 'Pérez', 'user', true, true, NOW()),
        ('member-bronze@test.com', $1, 'María', 'González', 'user', true, true, NOW()),
        ('member-silver@test.com', $1, 'Pedro', 'Silva', 'user', true, true, NOW()),
        ('member-gold@test.com', $1, 'Ana', 'López', 'user', true, true, NOW()),
        ('member-platinum@test.com', $1, 'Carlos', 'Ruiz', 'user', true, true, NOW()),
        ('admin@test.com', $1, 'Admin', 'User', 'admin', true, true, NOW()),
        ('unverified@test.com', $1, 'Luis', 'Torres', 'user', false, false, NOW())
      ON CONFLICT (email) DO NOTHING
    `, [passwordHash])

    console.log('Seeding test wines...')
    await client.query(`
      INSERT INTO wines (slug, name, category, region, varietal, vintage, price, stock, rating, reviews_count, description, created_at)
      VALUES
        ('carmenere-reserva-2020', 'Carmenere Reserva 2020', 'red', 'Valle de Colchagua', 'Carmenere', 2020, 18990, 45, 4.5, 23, 'Vino tinto elegante con notas frutales de cereza y ciruela, con taninos suaves y final prolongado.', NOW()),
        ('sauvignon-blanc-reserva-2021', 'Sauvignon Blanc Reserva 2021', 'white', 'Valle de Casablanca', 'Sauvignon Blanc', 2021, 15990, 32, 4.3, 18, 'Vino blanco fresco y aromático con notas cítricas de pomelo y hierba recién cortada.', NOW()),
        ('cabernet-sauvignon-gran-reserva-2019', 'Cabernet Sauvignon Gran Reserva 2019', 'red', 'Valle del Maipo', 'Cabernet Sauvignon', 2019, 35990, 20, 4.7, 41, 'Vino tinto complejo con notas de frutas negras maduras, especias y roble francés.', NOW()),
        ('rose-2022', 'Rosé Premium 2022', 'rose', 'Valle de Casablanca', 'Pinot Noir', 2022, 14990, 50, 4.2, 15, 'Vino rosado delicado con notas de fresas y frambuesas, ideal para el verano.', NOW()),
        ('chardonnay-barrica-2020', 'Chardonnay Barrica 2020', 'white', 'Valle de Colchagua', 'Chardonnay', 2020, 28990, 18, 4.6, 27, 'Vino blanco con crianza en barrica, notas de vainilla, manzana y mantequilla.', NOW()),
        ('syrah-reserva-2018', 'Syrah Reserva 2018', 'red', 'Valle del Maipo', 'Syrah', 2018, 22990, 0, 4.4, 19, 'Vino tinto especiado con notas de pimienta negra y frutas oscuras.', NOW())
      ON CONFLICT (slug) DO NOTHING
    `)

    console.log('Seeding test tours...')
    await client.query(`
      INSERT INTO tours (slug, name, category, duration_hours, price_per_person, max_capacity, description, includes, created_at)
      VALUES
        ('tour-clasico', 'Tour Clásico con Cata', 'tour', 2, 25000, 20, 'Recorrido por la viña con degustación de 4 vinos premium.', '{"items": ["Guía experto", "Cata de 4 vinos", "Tabla de quesos"]}', NOW()),
        ('tour-premium', 'Tour Premium', 'tour', 3, 45000, 12, 'Experiencia exclusiva con cata de vinos reserva y gran reserva.', '{"items": ["Guía experto", "Cata de 6 vinos", "Almuerzo gourmet", "Visita a bodega"]}', NOW()),
        ('teleferico', 'Paseo en Teleférico', 'activity', 1, 15000, 30, 'Vista panorámica del valle en nuestro teleférico.', '{"items": ["Viaje de ida y vuelta", "Mirador 360°", "Copa de vino de bienvenida"]}', NOW()),
        ('tour-privado', 'Tour Privado Exclusivo', 'private_tour', 4, 150000, 8, 'Experiencia personalizada para grupos pequeños.', '{"items": ["Guía privado", "Cata ilimitada", "Almuerzo privado", "Sesión fotográfica"]}', NOW())
      ON CONFLICT (slug) DO NOTHING
    `)

    console.log('Seeding test memberships...')
    // Get user IDs
    const goldMember = await client.query(`SELECT id FROM users WHERE email = 'member-gold@test.com'`)
    const platinumMember = await client.query(`SELECT id FROM users WHERE email = 'member-platinum@test.com'`)

    if (goldMember.rows.length > 0) {
      await client.query(`
        INSERT INTO memberships (user_id, tier, status, started_at, expires_at)
        VALUES ($1, 'gold', 'active', NOW(), NOW() + INTERVAL '1 year')
        ON CONFLICT (user_id) DO NOTHING
      `, [goldMember.rows[0].id])
    }

    if (platinumMember.rows.length > 0) {
      await client.query(`
        INSERT INTO memberships (user_id, tier, status, started_at, expires_at)
        VALUES ($1, 'platinum', 'active', NOW(), NOW() + INTERVAL '1 year')
        ON CONFLICT (user_id) DO NOTHING
      `, [platinumMember.rows[0].id])
    }

    await client.query('COMMIT')
    console.log('✅ Test data seeded successfully!')

  } catch (error) {
    await client.query('ROLLBACK')
    console.error('❌ Error seeding test data:', error)
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

seedTestData()
```

---

### 4.2 Coverage Check Script

**scripts/test/check-coverage.js**
```javascript
const fs = require('fs')
const path = require('path')

const coveragePath = path.join(__dirname, '../../coverage/coverage-summary.json')

if (!fs.existsSync(coveragePath)) {
  console.error('❌ Coverage file not found. Run tests with --coverage first.')
  process.exit(1)
}

const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf8'))
const { total } = coverage

const thresholds = {
  branches: 75,
  functions: 80,
  lines: 80,
  statements: 80
}

console.log('\n📊 Coverage Report:\n')
console.log(`Branches:   ${total.branches.pct}% (threshold: ${thresholds.branches}%)`)
console.log(`Functions:  ${total.functions.pct}% (threshold: ${thresholds.functions}%)`)
console.log(`Lines:      ${total.lines.pct}% (threshold: ${thresholds.lines}%)`)
console.log(`Statements: ${total.statements.pct}% (threshold: ${thresholds.statements}%)`)

const failures = []

if (total.branches.pct < thresholds.branches) {
  failures.push(`Branches: ${total.branches.pct}% < ${thresholds.branches}%`)
}
if (total.functions.pct < thresholds.functions) {
  failures.push(`Functions: ${total.functions.pct}% < ${thresholds.functions}%`)
}
if (total.lines.pct < thresholds.lines) {
  failures.push(`Lines: ${total.lines.pct}% < ${thresholds.lines}%`)
}
if (total.statements.pct < thresholds.statements) {
  failures.push(`Statements: ${total.statements.pct}% < ${thresholds.statements}%`)
}

if (failures.length > 0) {
  console.log('\n❌ Coverage thresholds not met:\n')
  failures.forEach(f => console.log(`  - ${f}`))
  process.exit(1)
} else {
  console.log('\n✅ All coverage thresholds met!')
  process.exit(0)
}
```

---

### 4.3 Pre-deployment Check Script

**scripts/ci/pre-deploy-check.sh**
```bash
#!/bin/bash

set -e

echo "🔍 Running pre-deployment checks..."

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

FAILED=0

# Function to print status
print_status() {
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ $1 passed${NC}"
  else
    echo -e "${RED}❌ $1 failed${NC}"
    FAILED=1
  fi
}

# 1. Type checking
echo -e "\n${YELLOW}Running TypeScript type check...${NC}"
npm run typecheck
print_status "Type check"

# 2. Linting
echo -e "\n${YELLOW}Running ESLint...${NC}"
npm run lint
print_status "ESLint"

# 3. Unit tests
echo -e "\n${YELLOW}Running unit tests...${NC}"
npm run test:unit
print_status "Unit tests"

# 4. Integration tests
echo -e "\n${YELLOW}Running integration tests...${NC}"
npm run test:integration
print_status "Integration tests"

# 5. Coverage check
echo -e "\n${YELLOW}Checking coverage thresholds...${NC}"
node scripts/test/check-coverage.js
print_status "Coverage check"

# 6. Security audit
echo -e "\n${YELLOW}Running security audit...${NC}"
npm audit --audit-level=moderate
print_status "Security audit"

# 7. Build check
echo -e "\n${YELLOW}Building application...${NC}"
npm run build
print_status "Build"

# 8. Bundle size check (optional)
echo -e "\n${YELLOW}Checking bundle size...${NC}"
# Add custom script if needed

# Final result
if [ $FAILED -eq 0 ]; then
  echo -e "\n${GREEN}🎉 All pre-deployment checks passed!${NC}"
  echo -e "${GREEN}✅ Ready to deploy${NC}"
  exit 0
else
  echo -e "\n${RED}💥 Some checks failed. Please fix before deploying.${NC}"
  exit 1
fi
```

---

## 5. DATABASE SEEDS

Ya incluido en sección 4.1

---

## 6. CI/CD TEMPLATES

Ya incluido en QA_MASTER_PLAN.md sección 6.1

---

## 7. QUICK START CHECKLIST

### 7.1 Setup Checklist

- [ ] **Install dependencies**
  ```bash
  npm install
  ```

- [ ] **Setup database**
  ```bash
  npm run db:migrate
  npm run db:seed:test
  ```

- [ ] **Configure environment variables**
  - Copy `.env.example` to `.env.test`
  - Set `DATABASE_URL`
  - Set `NEXT_PUBLIC_API_URL`

- [ ] **Install Playwright browsers**
  ```bash
  npx playwright install
  ```

- [ ] **Setup Husky**
  ```bash
  npx husky install
  npx husky add .husky/pre-commit "npx lint-staged"
  ```

- [ ] **Run tests to verify setup**
  ```bash
  npm test                # All tests
  npm run test:unit       # Unit tests only
  npm run test:e2e        # E2E tests
  ```

---

### 7.2 Daily Testing Workflow

1. **Before starting work:**
   ```bash
   git pull origin develop
   npm install  # if package.json changed
   npm run db:migrate  # if migrations exist
   ```

2. **During development:**
   ```bash
   npm run test:watch  # Keep running while coding
   ```

3. **Before committing:**
   ```bash
   npm run typecheck
   npm run lint
   npm test
   ```

4. **Before creating PR:**
   ```bash
   npm run test:coverage
   npm run test:e2e
   ```

5. **Before deploying:**
   ```bash
   bash scripts/ci/pre-deploy-check.sh
   ```

---

### 7.3 Troubleshooting

**Problem:** Tests failing with "Cannot find module"
**Solution:**
```bash
npm install
# or
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Playwright tests timing out
**Solution:**
- Increase timeout in `playwright.config.ts`
- Check if dev server is running
- Verify `BASE_URL` environment variable

**Problem:** Database connection errors in tests
**Solution:**
```bash
# Check PostgreSQL is running
# Verify DATABASE_URL in .env.test
npm run db:reset  # Reset test database
npm run db:seed:test  # Re-seed
```

**Problem:** Coverage below threshold
**Solution:**
- Run `npm run test:coverage` to see detailed report
- Open `coverage/index.html` in browser
- Add tests for uncovered lines

---

## CONCLUSIÓN

Este documento proporciona todas las configuraciones y ejemplos de código necesarios para implementar el plan de QA completo del proyecto Viña Santa Cruz.

**Próximos pasos:**
1. Ejecutar setup inicial (sección 7.1)
2. Implementar tests progresivamente (empezar con unit tests)
3. Configurar CI/CD pipeline
4. Entrenar equipo en workflows de testing

**Contacto:**
Para dudas o sugerencias sobre esta guía, contactar al equipo de QA.

---

**Última actualización:** 2025-11-18
