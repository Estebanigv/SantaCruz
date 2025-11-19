# DevOps Master Plan - Viña Santa Cruz Plataforma Web Premium

## Resumen Ejecutivo

Este documento presenta la estrategia completa de DevOps para la plataforma web premium de Viña Santa Cruz, diseñada para soportar una operación de e-commerce de alta disponibilidad con más de 15,000 usuarios mensuales, procesamiento de pagos crítico y una experiencia de usuario excepcional.

### Objetivos Clave

1. **Alta Disponibilidad:** 99.9% uptime (< 43 minutos de downtime/mes)
2. **Performance Excepcional:** LCP < 2.5s, Lighthouse score > 90
3. **Despliegue Continuo:** 10+ deployments/semana, < 5 minutos por deployment
4. **Zero Downtime:** Deployments sin interrupción de servicio
5. **Disaster Recovery:** RPO < 1 hora, RTO < 15 minutos

### Presupuesto Mensual Estimado

| Servicio | Plan | Costo Mensual |
|----------|------|---------------|
| Vercel | Pro | $20 |
| Supabase (Database) | Pro | $25 |
| Cloudinary | Plus | $99 |
| Sentry | Team | $26 |
| UptimeRobot | Pro | $7 |
| Cloudflare | Pro (opcional) | $20 |
| **Total Inicial** | | **$177/mes** |
| **Total con Cloudflare** | | **$197/mes** |

**Alternativa económica inicial:** $45/mes (free tiers + Sentry Team)

---

## Arquitectura de Infraestructura

### Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USUARIO FINAL                               │
│                    (Desktop, Mobile, Tablet)                        │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      CLOUDFLARE (CDN + WAF)                         │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  - DNS Management          - DDoS Protection               │   │
│  │  - SSL/TLS Encryption      - Web Application Firewall      │   │
│  │  - Edge Caching            - Bot Management                │   │
│  └────────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      VERCEL EDGE NETWORK                            │
│                    (275+ Global Locations)                          │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  Primary Region: South America (São Paulo - gru1)          │   │
│  │  Edge Runtime + Serverless Functions                       │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │ Static Pages │  │  SSR Pages   │  │  API Routes  │            │
│  │   (ISR/SSG)  │  │  (Dynamic)   │  │ (Serverless) │            │
│  └──────────────┘  └──────────────┘  └──────┬───────┘            │
└────────────────────────────────────────────┼─────────────────────────┘
                                             │
                    ┌────────────────────────┼────────────────────────┐
                    │                        │                        │
                    ▼                        ▼                        ▼
      ┌─────────────────────┐  ┌─────────────────────┐  ┌──────────────────┐
      │   SUPABASE          │  │   CLOUDINARY         │  │  EXTERNAL APIs   │
      │   (PostgreSQL)      │  │  (Images/CDN)        │  │                  │
      ├─────────────────────┤  ├─────────────────────┤  ├──────────────────┤
      │ - Database          │  │ - Image Storage      │  │ - Transbank      │
      │ - Connection Pool   │  │ - Transformations    │  │ - Flow           │
      │ - Backups (Daily)   │  │ - Akamai CDN         │  │ - Stripe         │
      │ - Point-in-time     │  │ - Auto-optimize      │  │ - Brevo (Email)  │
      │   Recovery          │  │ - Lazy Loading       │  │ - Twilio (SMS)   │
      │ - Row-level Sec.    │  │ - Responsive Images  │  │ - Google Analytics│
      └─────────────────────┘  └─────────────────────┘  └──────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    OBSERVABILITY LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │   SENTRY     │  │   VERCEL     │  │ UPTIMEROBOT  │             │
│  │ Error Track. │  │  Analytics   │  │   Uptime     │             │
│  └──────────────┘  └──────────────┘  └──────────────┘             │
│                                                                     │
│              Alerting: Slack, Email, SMS (Critical)                │
└─────────────────────────────────────────────────────────────────────┘
```

### Flujo de Deployment

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DEVELOPER WORKFLOW                           │
└─────────────────────────────────────────────────────────────────────┘

Developer
   │
   ├─ git push origin feature/new-feature
   │                │
   │                ▼
   │     ┌──────────────────────┐
   │     │  GitHub Actions      │
   │     │  (CI Pipeline)       │
   │     ├──────────────────────┤
   │     │ 1. Lint & Format     │
   │     │ 2. Type Check        │
   │     │ 3. Unit Tests        │
   │     │ 4. Integration Tests │
   │     │ 5. Build             │
   │     │ 6. Security Scan     │
   │     └──────────┬───────────┘
   │                │
   │                ▼
   │     ┌──────────────────────┐
   │     │  Vercel              │
   │     │  Preview Deployment  │
   │     └──────────┬───────────┘
   │                │
   │                ▼
   │     Preview URL posted to PR
   │     QA Testing on preview
   │
   ├─ PR Approved & Merged to develop
   │                │
   │                ▼
   │     ┌──────────────────────┐
   │     │  Auto Deploy to      │
   │     │  STAGING             │
   │     └──────────┬───────────┘
   │                │
   │                ▼
   │     Staging validation & smoke tests
   │     (24+ hours in staging)
   │
   └─ PR to main (Production)
                  │
                  ▼
       ┌──────────────────────┐
       │  GitHub Actions      │
       │  (Full CI/CD)        │
       ├──────────────────────┤
       │ 1. All CI checks     │
       │ 2. E2E Tests         │
       │ 3. Lighthouse CI     │
       │ 4. Security Scan     │
       └──────────┬───────────┘
                  │
                  ▼
       ┌──────────────────────┐
       │  Database Backup     │
       │  (Pre-deployment)    │
       └──────────┬───────────┘
                  │
                  ▼
       ┌──────────────────────┐
       │  Vercel Production   │
       │  Deployment          │
       └──────────┬───────────┘
                  │
                  ▼
       ┌──────────────────────┐
       │  Database Migrations │
       │  (if needed)         │
       └──────────┬───────────┘
                  │
                  ▼
       ┌──────────────────────┐
       │  Smoke Tests         │
       │  Health Checks       │
       └──────────┬───────────┘
                  │
                  ├─ Success ─→ Slack Notification
                  │
                  └─ Failure ─→ Auto Rollback + Alert
```

---

## Ambientes

### 1. Development (Local)

**Propósito:** Desarrollo local por cada developer

**Infraestructura:**
- Next.js dev server (localhost:3000)
- PostgreSQL local o Supabase free tier
- Cloudinary free tier
- Variables de entorno en `.env.local`

**Acceso:**
- Solo developer local

**Base de datos:**
- PostgreSQL local con Docker o Supabase free tier
- Seed data para testing
- Migrations aplicadas con `npm run db:migrate:dev`

### 2. Preview (Vercel Preview Deployments)

**Propósito:** Review de features en PRs

**Infraestructura:**
- Vercel preview deployment (URL única por PR)
- Staging database (shared)
- Cloudinary staging environment

**Acceso:**
- Team members con link
- Stakeholders para demos

**Características:**
- Deploy automático en cada push a PR
- URL única: `<branch>-<project>.vercel.app`
- Comentario automático en PR con link
- Auto-cleanup después de merge

### 3. Staging

**Propósito:** Pre-production testing y validación

**Infraestructura:**
- Vercel deployment desde `develop` branch
- Supabase staging database (separada de producción)
- Cloudinary staging folder
- Payment gateways en modo sandbox/test

**URL:** `https://staging.vinasantacruz.cl`

**Acceso:**
- Team members
- QA testers
- Selected stakeholders

**Base de datos:**
- Replica de estructura de producción
- Test data
- Daily backup

**Testing:**
- Manual QA
- Smoke tests
- Integration tests
- Performance testing

### 4. Production

**Propósito:** Ambiente de producción para usuarios reales

**Infraestructura:**
- Vercel production deployment desde `main` branch
- Supabase production database
- Cloudinary production folder
- Payment gateways en modo production

**URL:** `https://www.vinasantacruz.cl`

**Acceso:**
- Usuarios finales
- Admin panel para staff

**Características:**
- 99.9% uptime SLA
- Daily automated backups
- Point-in-time recovery
- 24/7 monitoring
- Incident response on-call

---

## CI/CD Pipeline Detallado

### GitHub Actions Workflows

#### 1. Main CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

**Triggers:**
- Push to `main`, `develop`
- Pull requests to `main`, `develop`

**Jobs (parallel where possible):**

**Job 1: Code Quality (5-7 min)**
- ESLint
- Prettier check
- TypeScript type checking
- Console.log detection

**Job 2: Security Scan (5-10 min)**
- npm audit
- Trufflehog (secrets detection)
- OWASP Dependency Check

**Job 3: Unit & Integration Tests (10-15 min)**
- PostgreSQL test container
- Vitest unit tests with coverage
- Integration tests
- Coverage upload to Codecov

**Job 4: E2E Tests (15-20 min)** - Only on PR to main
- Playwright tests
- Upload test reports

**Job 5: Build (5-10 min)**
- Next.js build
- Bundle size analysis
- Upload build artifacts

**Job 6: Lighthouse CI (10-15 min)** - Only on merge to main
- Performance testing
- Core Web Vitals
- Accessibility checks

**Job 7-9: Deployment (3-5 min each)**
- Preview deployment (on PR)
- Staging deployment (on push to develop)
- Production deployment (on push to main)

**Job 10: Database Migrations (2-5 min)**
- Backup before migration
- Apply migrations
- Verify success

#### 2. Nightly Health Checks (`.github/workflows/nightly-checks.yml`)

**Schedule:** Every day at 2 AM UTC

**Jobs:**
- Production health checks
- Database backup verification
- Dependency update check
- SSL certificate expiry check
- Performance monitoring (Lighthouse)

### Deployment Strategy: Git Flow Simplificado

```
main (production)
  │
  ├─ hotfix/* ──┐
  │             │
  │             ↓
  ├─ develop (staging)
  │   │
  │   ├─ feature/*
  │   ├─ bugfix/*
  │   └─ enhancement/*
  │
  └─ Protegido: Require PR + Reviews + CI passing
```

**Branch Protection Rules:**

**main (production):**
- Require pull request reviews (2 approvals)
- Require status checks to pass
- Require up-to-date branches
- Include administrators
- No force pushes
- No deletions

**develop (staging):**
- Require pull request reviews (1 approval)
- Require status checks to pass
- Allow force pushes (for maintainers only)

---

## Database Management

### Database Provider: Supabase (PostgreSQL 15+)

**Ventajas:**
- Fully managed PostgreSQL
- Automatic daily backups
- Point-in-time recovery
- Connection pooling built-in
- Real-time subscriptions
- Row-level security

### Connection Configuration

```typescript
// DATABASE_URL: Pooled connection (for application)
// Format: postgresql://user:pass@host:6543/db?pgbouncer=true

// DIRECT_URL: Direct connection (for migrations)
// Format: postgresql://user:pass@host:5432/db
```

### Migration Strategy: Prisma Migrate

**Workflow:**

1. **Development:**
   ```bash
   # Edit schema.prisma
   npm run db:migrate:dev -- --name add_feature
   # Auto-applies to local DB
   ```

2. **Staging:**
   ```bash
   # Via CI/CD or manual
   npm run db:migrate:deploy
   ```

3. **Production:**
   ```bash
   # Automated via GitHub Actions after deployment
   # Or manual with backup
   npm run db:backup production
   npm run db:migrate:deploy production
   ```

### Backup Strategy

**Automated Backups (Supabase):**
- Frequency: Daily at 3 AM UTC
- Retention: 7 days (free), 30+ days (paid)
- Point-in-time recovery: Last 7 days

**Manual Backups (CI/CD):**
```bash
# Automated nightly via GitHub Actions
npm run db:backup production

# Uploads to S3 for long-term storage
# Retention: 90 days
```

**Pre-Deployment Backups:**
- Automatic backup before every production deployment
- Automatic backup before database migrations
- Stored locally and in S3

**Backup Verification:**
- Monthly restore test to staging
- Automated verification of backup integrity
- Documented in runbook

### Connection Pooling

**Configuration:**
- PgBouncer (built-in to Supabase)
- Max connections: 100 (production), 20 (staging)
- Pool mode: Transaction
- Timeout: 30 seconds

---

## Monitoring y Observability

### Estrategia Multi-Layer

```
┌──────────────────────────────────────────────┐
│          Application Metrics                 │
│  - Page views, user sessions                 │
│  - Conversion rates, cart abandonment        │
│  - Core Web Vitals (LCP, FID, CLS)          │
│  Tool: Vercel Analytics, Google Analytics   │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────┐
│          Error Tracking                      │
│  - JavaScript errors                         │
│  - API errors                                │
│  - Performance issues                        │
│  - Session replay                            │
│  Tool: Sentry                                │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────┐
│          Infrastructure Monitoring           │
│  - Uptime monitoring                         │
│  - Response times                            │
│  - Function execution duration               │
│  - Database performance                      │
│  Tools: UptimeRobot, Vercel Dashboard       │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────┐
│          Business Metrics                    │
│  - Orders per day                            │
│  - Revenue                                   │
│  - Product performance                       │
│  - Customer retention                        │
│  Tool: Custom dashboard                     │
└──────────────────────────────────────────────┘
```

### Herramientas de Monitoring

#### 1. Vercel Analytics (Built-in)
**Métricas:**
- Real-time traffic
- Page views y unique visitors
- Geographic distribution
- Device types
- Core Web Vitals

**Configuración:**
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

#### 2. Sentry (Error Tracking)
**Características:**
- Error tracking con stack traces
- Performance monitoring
- Session replay
- Release tracking
- User feedback

**Configuración:**
- Client-side: `sentry.client.config.ts`
- Server-side: `sentry.server.config.ts`
- Sample rate: 10% de transacciones en producción
- Replay: 10% de sesiones normales, 100% con errores

#### 3. UptimeRobot (Uptime Monitoring)
**Monitores configurados:**
- Main site: https://www.vinasantacruz.cl (5 min interval)
- API health: https://www.vinasantacruz.cl/api/health (5 min)
- Critical pages: /productos, /checkout (10 min)

**Alertas:**
- Email: devops@vinasantacruz.cl
- Slack: #alerts channel
- SMS: Solo P0 incidents

### Alert Rules

#### Critical Alerts (P0) - Immediate notification

1. **Site Down**
   - Trigger: HTTP 500/503 > 5% en 5 minutos
   - Action: Slack + Email + SMS

2. **Database Connection Issues**
   - Trigger: Database errors > 3 en 5 minutos
   - Action: Slack + Email + SMS

3. **Payment Gateway Failures**
   - Trigger: Payment errors > 2% en 15 minutos
   - Action: Slack + Email

#### Warning Alerts (P1) - Email notification

1. **Slow Response Times**
   - Trigger: Avg response time > 2s por 10 minutos
   - Action: Email to dev team

2. **High Error Rate**
   - Trigger: Error rate > 1% en 10 minutos
   - Action: Email + Slack

### Dashboards

**1. Real-Time Operations Dashboard**
- Current traffic
- Error rates
- Response times
- Active users
- Recent deployments

**2. Business Metrics Dashboard**
- Daily/Monthly revenue
- Order conversion rate
- Cart abandonment rate
- Top products
- Customer retention

**3. Performance Dashboard**
- Core Web Vitals trends
- Page load times (p50, p95, p99)
- API response times
- Database query performance

---

## Security

### Security Layers

```
┌──────────────────────────────────────────────┐
│          Network Security                    │
│  - Cloudflare DDoS Protection                │
│  - Web Application Firewall (WAF)            │
│  - Rate Limiting                             │
│  - Bot Management                            │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────┐
│          Application Security                │
│  - Input validation (Zod schemas)            │
│  - SQL injection prevention (Prisma)         │
│  - XSS prevention (Next.js auto-escape)      │
│  - CSRF protection (tokens)                  │
│  - Authentication (NextAuth.js)              │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────┐
│          Data Security                       │
│  - Encryption at rest (database)             │
│  - Encryption in transit (SSL/TLS)           │
│  - Secrets management (Vercel)               │
│  - Row-level security (Supabase)             │
│  - PII data masking (logs)                   │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────┐
│          Compliance                          │
│  - GDPR compliance                           │
│  - PCI-DSS (via payment gateways)            │
│  - Age verification (18+)                    │
│  - Privacy policy                            │
│  - Cookie consent                            │
└──────────────────────────────────────────────┘
```

### Secrets Management

**Environment Variables (Vercel):**
```bash
# Never commit to git
# Store in Vercel dashboard
# Separate per environment

# Database
DATABASE_URL
DATABASE_URL_UNPOOLED
DIRECT_URL

# APIs
CLOUDINARY_API_SECRET
TRANSBANK_API_KEY
FLOW_SECRET_KEY
STRIPE_SECRET_KEY
BREVO_API_KEY
TWILIO_AUTH_TOKEN

# Monitoring
NEXT_PUBLIC_SENTRY_DSN
SENTRY_AUTH_TOKEN

# Rotation policy: Every 90 days for critical secrets
```

### Security Headers (vercel.json)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### SSL/TLS

- Automatic SSL via Vercel (Let's Encrypt)
- Cloudflare SSL mode: Full (strict)
- HSTS headers enabled
- Minimum TLS version: 1.2

### Rate Limiting

**Implementation with Upstash Redis:**

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
  analytics: true,
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for');
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }

  // Process request...
}
```

---

## Performance Optimization

### CDN Strategy

**Cloudflare + Vercel Edge Network:**

```
User Request
    │
    ▼
Cloudflare Edge (Cache static assets)
    │
    ├─ Cache Hit ──→ Return from edge (< 50ms)
    │
    └─ Cache Miss
        │
        ▼
    Vercel Edge Network
        │
        ├─ Static pages (ISR/SSG) ──→ Return from cache (< 100ms)
        │
        └─ Dynamic pages (SSR)
            │
            ▼
        Serverless Function (< 500ms)
```

**Cache Headers Strategy:**

```typescript
// Static assets: 1 year cache
Cache-Control: public, max-age=31536000, immutable

// Images: 1 day cache, stale-while-revalidate
Cache-Control: public, max-age=86400, stale-while-revalidate=43200

// Dynamic pages: ISR with revalidation
revalidate: 3600  // 1 hour

// API routes: No cache
Cache-Control: no-store, must-revalidate
```

### Image Optimization (Cloudinary)

**Transformations automáticas:**
- Format: auto (WebP/AVIF según browser)
- Quality: auto
- Responsive images (srcset)
- Lazy loading
- Low Quality Image Placeholders (LQIP)

**Expected performance:**
- 90% reduction en tamaño de imágenes
- LCP < 2.5s
- CLS < 0.1 (width/height definidos)

### Database Optimization

**Indexing strategy:**
```sql
-- Primary keys (automatic)
-- Foreign keys (for joins)
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Full-text search
CREATE INDEX idx_products_search ON products
USING GIN (to_tsvector('spanish', name || ' ' || description));

-- Composite indexes
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);

-- Partial indexes
CREATE INDEX idx_orders_pending ON orders(created_at)
WHERE status = 'pending';
```

**Query optimization:**
- Use Prisma's query optimization
- Implement select specific fields
- Use pagination for large datasets
- Materialized views for complex reports

**Connection pooling:**
- PgBouncer (Supabase built-in)
- Max connections: 100 (production)
- Pool mode: Transaction
- Server-side connection reuse

### Performance Budgets

| Metric | Target | Current |
|--------|--------|---------|
| Lighthouse Score | > 90 | TBD |
| LCP (Largest Contentful Paint) | < 2.5s | TBD |
| FID (First Input Delay) | < 100ms | TBD |
| CLS (Cumulative Layout Shift) | < 0.1 | TBD |
| Time to Interactive (TTI) | < 3.5s | TBD |
| Total Page Size | < 1MB | TBD |
| Image Size (average) | < 200KB | TBD |

---

## Disaster Recovery

### Recovery Objectives

- **RPO (Recovery Point Objective):** < 1 hora
  - Maximum acceptable data loss: 1 hora de transacciones
  - Daily backups + point-in-time recovery

- **RTO (Recovery Time Objective):** < 15 minutos
  - Application rollback: < 2 minutos (Vercel)
  - Database restore: < 15 minutos (Supabase)

### Backup Strategy

**Application Code:**
- Git repository (GitHub)
- Multiple team members with access
- Protected branches
- No data loss risk

**Database:**
- Daily automated backups (Supabase)
- Manual backups before deployments
- 30-day retention on paid plan
- Point-in-time recovery (7 days)
- S3 backups for long-term storage (90 days)

**Environment Variables:**
- Documented in 1Password
- Backup in secure wiki
- Version controlled (encrypted)

**Static Assets:**
- Cloudinary automatic versioning
- Monthly full backup to S3
- Metadata backup (transformations, tags)

### Disaster Scenarios & Response

#### Scenario 1: Bad Deployment

**Impact:** Application broken, high error rate

**Response:**
1. Detect via monitoring (< 2 min)
2. Assess severity
3. Rollback via Vercel (< 2 min)
4. Verify rollback
5. Investigate root cause
6. Fix and redeploy

**Total downtime:** < 5 minutos

#### Scenario 2: Database Corruption

**Impact:** Data integrity issues

**Response:**
1. Detect via application errors
2. Put application in read-only mode
3. Assess extent of corruption
4. Restore from latest backup
5. Replay transactions if possible
6. Resume operations
7. Post-mortem

**Total downtime:** < 1 hora

#### Scenario 3: Vercel Outage

**Impact:** Complete site down

**Response:**
1. Verify via Vercel status page
2. Communicate with users (status page)
3. Wait for Vercel resolution
4. (Long-term) Have secondary deployment ready

**Mitigation:** 99.99% Vercel SLA, minimal risk

#### Scenario 4: Database Provider Outage

**Impact:** Data layer unavailable

**Response:**
1. Verify via Supabase status page
2. Enable maintenance mode
3. Wait for provider resolution
4. (Future) Read replicas for redundancy

**Mitigation:** 99.9% Supabase SLA

### Incident Response Process

```
Detection
    │
    ▼
Assessment (< 2 min)
    │
    ├─ Severity: P0 (Critical)
    │   │
    │   ├─ Notify: SMS + Slack + Email
    │   ├─ Declare incident
    │   └─ Immediate action (rollback/fix)
    │
    ├─ Severity: P1 (High)
    │   │
    │   ├─ Notify: Slack + Email
    │   └─ Fix within 15 minutes
    │
    └─ Severity: P2/P3
        │
        └─ Create ticket, schedule fix

Mitigation
    │
    ├─ Rollback (if deployment issue)
    ├─ Hot fix (if quick fix available)
    ├─ Feature flag (disable broken feature)
    └─ Maintenance mode (last resort)

Resolution
    │
    ├─ Verify fix
    ├─ Monitor metrics
    └─ Notify stakeholders

Post-Mortem (within 48 hours)
    │
    ├─ Timeline review
    ├─ Root cause analysis
    ├─ Action items
    └─ Documentation
```

---

## Cost Optimization

### Cost Breakdown (Estimated Monthly)

#### Development/Launch Phase (Months 1-3)

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Pro | $20 |
| Supabase | Free → Pro | $0 → $25 |
| Cloudinary | Free | $0 |
| Sentry | Team | $26 |
| UptimeRobot | Free | $0 |
| Cloudflare | Free | $0 |
| **Total** | | **$46 - $71** |

#### Growth Phase (Months 4-12, 5K-15K users/month)

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Pro | $20 |
| Supabase | Pro | $25 |
| Cloudinary | Plus | $99 |
| Sentry | Team | $26 |
| UptimeRobot | Pro | $7 |
| Cloudflare | Pro (optional) | $20 |
| **Total** | | **$177 - $197** |

#### Scale Phase (12+ months, 15K-50K users/month)

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Pro | $20 |
| Supabase | Pro+ | $50 |
| Cloudinary | Advanced | $249 |
| Sentry | Team | $26 |
| UptimeRobot | Pro | $7 |
| Cloudflare | Pro | $20 |
| **Total** | | **$372** |

### Cost Optimization Strategies

1. **Start with free tiers**
   - Cloudinary free (25K transformations/month)
   - Supabase free (500MB DB)
   - UptimeRobot free (50 monitors)

2. **Monitor usage monthly**
   - Set up alerts at 80% of plan limits
   - Review usage dashboards
   - Optimize before upgrading

3. **Optimize resource usage**
   - Aggressive CDN caching
   - Image optimization
   - Database query optimization
   - Reduce function execution time

4. **Gradual scaling**
   - Only upgrade when limits reached
   - Review alternatives at each tier

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

**Infrastructure Setup:**
- [ ] Create Vercel project
- [ ] Set up Supabase database (free tier)
- [ ] Configure Cloudinary account (free tier)
- [ ] Set up GitHub repository
- [ ] Configure environment variables

**CI/CD Setup:**
- [ ] Configure GitHub Actions workflows
- [ ] Set up branch protection rules
- [ ] Configure Vercel integration
- [ ] Test deployment pipeline

**Monitoring Setup:**
- [ ] Configure Sentry
- [ ] Set up UptimeRobot monitors
- [ ] Configure Vercel Analytics
- [ ] Create Slack channels (#alerts, #deployments)

### Phase 2: Development Environment (Week 2-3)

**Developer Workflow:**
- [ ] Document local development setup
- [ ] Create database seed scripts
- [ ] Configure pre-commit hooks (Husky)
- [ ] Set up development tools (ESLint, Prettier)

**Testing Framework:**
- [ ] Configure Vitest for unit tests
- [ ] Set up Playwright for E2E tests
- [ ] Create test database
- [ ] Write initial test suite

### Phase 3: Staging Environment (Week 3-4)

**Staging Setup:**
- [ ] Create staging database
- [ ] Configure staging environment variables
- [ ] Set up staging domain
- [ ] Configure payment gateways (sandbox mode)

**Validation:**
- [ ] Deploy to staging
- [ ] Run smoke tests
- [ ] Manual QA testing
- [ ] Performance testing

### Phase 4: Production Readiness (Week 4-5)

**Security:**
- [ ] Security audit
- [ ] Secrets rotation
- [ ] Configure WAF rules
- [ ] Enable rate limiting

**Performance:**
- [ ] Lighthouse audit
- [ ] Load testing
- [ ] Database optimization
- [ ] CDN configuration

**Documentation:**
- [ ] Complete runbooks
- [ ] Incident response procedures
- [ ] Deployment checklists
- [ ] Team training

### Phase 5: Production Launch (Week 5-6)

**Pre-Launch:**
- [ ] Final staging validation
- [ ] Create production database
- [ ] Configure production environment variables
- [ ] Set up production monitoring

**Launch:**
- [ ] Deploy to production
- [ ] Run smoke tests
- [ ] Monitor for 48 hours
- [ ] Gradual traffic ramp-up

**Post-Launch:**
- [ ] Monitor metrics closely
- [ ] Address any issues
- [ ] Collect feedback
- [ ] Optimize based on real traffic

---

## Team Roles & Responsibilities

### Development Team

**Lead Developer**
- Architecture decisions
- Code review approvals
- Production deployment authorization
- Incident Commander (P0/P1)

**Backend Developer**
- API development
- Database schema
- Integrations (payments, email)
- Performance optimization

**Frontend Developer**
- UI/UX implementation
- Client-side optimization
- Responsive design
- Accessibility

### Operations

**DevOps Engineer** (Part-time or shared)
- CI/CD maintenance
- Monitoring setup
- Infrastructure optimization
- Security audits

**On-Call Rotation**
- 24/7 on-call for P0 incidents
- Rotation: Weekly
- Escalation path documented

### Support

**QA Tester**
- Staging validation
- Regression testing
- Bug reporting
- UAT coordination

**Customer Support**
- First line of defense
- Issue escalation
- User feedback collection

---

## Success Metrics & KPIs

### Technical Metrics

| Metric | Target | Frequency |
|--------|--------|-----------|
| Deployment Frequency | > 10/week | Weekly |
| Deployment Success Rate | > 98% | Weekly |
| Failed Deployment Recovery Time | < 5 min | Per incident |
| Mean Time to Recovery (MTTR) | < 15 min | Monthly |
| Mean Time Between Failures (MTBF) | > 30 days | Monthly |
| Test Coverage | > 80% | Weekly |
| Uptime | > 99.9% | Monthly |

### Performance Metrics

| Metric | Target | Frequency |
|--------|--------|-----------|
| Lighthouse Score | > 90 | Weekly |
| LCP | < 2.5s | Daily |
| FID | < 100ms | Daily |
| CLS | < 0.1 | Daily |
| API Response Time (p95) | < 500ms | Daily |
| Database Query Time (p95) | < 100ms | Daily |

### Business Metrics

| Metric | Target | Frequency |
|--------|--------|-----------|
| Conversion Rate | > 2% | Daily |
| Cart Abandonment Rate | < 70% | Daily |
| Page Load Time Impact on Sales | Measure | Weekly |
| Error Rate Impact on Sales | < 0.1% | Daily |

---

## Documentación y Runbooks

### Runbooks Disponibles

1. **[01-deployment.md](E:\Proyectos Webs\VIÑA SANTA CRUZ – Plataforma Web Premium\docs\devops\runbooks\01-deployment.md)**
   - Production deployment procedures
   - Pre-deployment checklist
   - Post-deployment validation
   - Communication templates

2. **[02-rollback.md](E:\Proyectos Webs\VIÑA SANTA CRUZ – Plataforma Web Premium\docs\devops\runbooks\02-rollback.md)**
   - Emergency rollback procedures
   - Decision tree
   - Database rollback
   - Post-rollback actions

3. **[03-database-migrations.md](E:\Proyectos Webs\VIÑA SANTA CRUZ – Plataforma Web Premium\docs\devops\runbooks\03-database-migrations.md)**
   - Migration workflow
   - Zero-downtime patterns
   - Backup procedures
   - Rollback strategies

4. **[04-incident-response.md](E:\Proyectos Webs\VIÑA SANTA CRUZ – Plataforma Web Premium\docs\devops\runbooks\04-incident-response.md)**
   - Incident severity levels
   - Response procedures
   - Communication protocols
   - Post-mortem template

### Architecture Decision Records (ADRs)

1. **[ADR-001: Vercel as Deployment Platform](E:\Proyectos Webs\VIÑA SANTA CRUZ – Plataforma Web Premium\docs\devops\adr\001-vercel-deployment-platform.md)**
2. **[ADR-002: PostgreSQL as Primary Database](E:\Proyectos Webs\VIÑA SANTA CRUZ – Plataforma Web Premium\docs\devops\adr\002-postgresql-database.md)**
3. **[ADR-003: Cloudinary for Image Management](E:\Proyectos Webs\VIÑA SANTA CRUZ – Plataforma Web Premium\docs\devops\adr\003-cloudinary-image-management.md)**

---

## Quick Reference

### Important Commands

```bash
# Development
npm run dev                          # Start dev server
npm run db:studio                    # Open Prisma Studio

# Testing
npm run test                         # Run all tests
npm run test:unit                    # Unit tests
npm run test:e2e                     # E2E tests
npm run lint                         # Lint code

# Database
npm run db:migrate:dev               # Create & apply migration
npm run db:migrate:deploy            # Apply migrations (prod)
npm run db:backup                    # Backup database
npm run db:restore                   # Restore database

# Deployment
git push origin develop              # Deploy to staging
git push origin main                 # Deploy to production
vercel --prod                        # Manual prod deploy
vercel promote <url> --prod          # Rollback deployment

# Monitoring
vercel logs --prod                   # View production logs
npm run db:verify                    # Verify database
curl https://www.vinasantacruz.cl/api/health  # Health check
```

### Important URLs

**Production:**
- Site: https://www.vinasantacruz.cl
- Health: https://www.vinasantacruz.cl/api/health
- Metrics: https://www.vinasantacruz.cl/api/metrics

**Staging:**
- Site: https://staging.vinasantacruz.cl
- Health: https://staging.vinasantacruz.cl/api/health

**Dashboards:**
- Vercel: https://vercel.com/[team]/vina-santa-cruz
- Sentry: https://sentry.io/organizations/vina-santa-cruz
- Supabase: https://app.supabase.com/project/[project-id]
- Cloudinary: https://cloudinary.com/console

### Emergency Contacts

| Role | Slack | Email |
|------|-------|-------|
| On-Call Engineer | @oncall | oncall@vinasantacruz.cl |
| Lead Developer | @lead | lead@vinasantacruz.cl |
| DevOps | @devops | devops@vinasantacruz.cl |
| CTO | @cto | cto@vinasantacruz.cl |

---

## Conclusión

Este plan DevOps proporciona una base sólida para la operación de la plataforma Viña Santa Cruz, balanceando:

✅ **Alta disponibilidad** (99.9% uptime)
✅ **Performance excepcional** (Lighthouse > 90)
✅ **Seguridad robusta** (multi-layer security)
✅ **Escalabilidad** (de 0 a 50K+ users/month)
✅ **Costo-efectividad** ($46-$372/mes según fase)
✅ **Developer experience** (deployment en < 5 min)

La implementación se puede realizar de forma gradual, comenzando con free tiers y escalando según las necesidades reales del negocio.

**Próximos pasos:**
1. Review y approval del plan por stakeholders
2. Inicio de Phase 1 (Infrastructure Setup)
3. Capacitación del equipo en workflows
4. Implementación progresiva según roadmap

---

**Documento preparado por:** Claude DevOps Specialist
**Fecha:** 2024-01-15
**Versión:** 1.0
**Estado:** Ready for Implementation
