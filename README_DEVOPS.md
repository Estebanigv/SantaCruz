# DevOps Documentation - Viña Santa Cruz

## Estructura de Documentación

Este proyecto incluye una suite completa de documentación DevOps lista para implementación.

---

## Documentos Principales

### 📘 [DEVOPS_MASTER_PLAN.md](./DEVOPS_MASTER_PLAN.md)
**Plan maestro completo de DevOps**

Incluye:
- Arquitectura de infraestructura completa
- CI/CD pipeline detallado
- Estrategia de ambientes (dev, staging, production)
- Monitoring y observability
- Security best practices
- Disaster recovery procedures
- Cost analysis y optimización
- Roadmap de implementación

**Audiencia:** CTO, Engineering Lead, DevOps Team

---

## Guías de Inicio Rápido

### 🚀 [docs/devops/QUICK_START_GUIDE.md](./docs/devops/QUICK_START_GUIDE.md)
**Guía de configuración rápida (30 minutos)**

Para desarrolladores nuevos:
- Setup de entorno local
- Configuración de database
- Workflow de Git
- Comandos esenciales
- Troubleshooting común

**Audiencia:** Developers, New Team Members

---

## Runbooks Operacionales

### 📗 [docs/devops/runbooks/01-deployment.md](./docs/devops/runbooks/01-deployment.md)
**Procedimiento de deployment a producción**

- Pre-deployment checklist
- Standard deployment workflow
- Database migration deployment
- Hotfix deployment
- Post-deployment verification
- Communication templates

**Audiencia:** Developers, DevOps, Release Managers

---

### 📕 [docs/devops/runbooks/02-rollback.md](./docs/devops/runbooks/02-rollback.md)
**Procedimiento de rollback de emergencia**

- Severity levels (P0-P3)
- Quick rollback procedure (< 5 min)
- Database rollback
- Partial rollback (feature flags)
- Post-rollback actions
- Decision tree

**Audiencia:** On-call Engineers, DevOps, Engineering Leads

---

### 📙 [docs/devops/runbooks/03-database-migrations.md](./docs/devops/runbooks/03-database-migrations.md)
**Estrategia de database migrations**

- Migration workflow
- Zero-downtime patterns
- Complex migration scenarios
- Backup procedures
- Performance considerations
- Rollback strategies

**Audiencia:** Backend Developers, Database Admins

---

### 📕 [docs/devops/runbooks/04-incident-response.md](./docs/devops/runbooks/04-incident-response.md)
**Incident response framework**

- Incident severity levels
- Response workflow
- Detection and assessment
- Mitigation strategies
- Communication protocols
- Post-mortem template

**Audiencia:** On-call Engineers, All Developers, Engineering Managers

---

## Monitoring y Observability

### 📊 [docs/devops/monitoring-setup.md](./docs/devops/monitoring-setup.md)
**Configuración completa de monitoring**

- Architecture overview
- APM (Vercel Analytics, Sentry)
- Uptime monitoring
- Logging strategy
- Alert rules
- Dashboard setup
- Cost estimation

**Audiencia:** DevOps, SRE, Engineering Leads

---

## Architecture Decision Records (ADRs)

### 📄 [docs/devops/adr/001-vercel-deployment-platform.md](./docs/devops/adr/001-vercel-deployment-platform.md)
**Decisión: Vercel como plataforma de deployment**

- Context y requirements
- Options consideradas
- Rationale detallado
- Consequences (positive/negative)
- Cost analysis
- Success metrics

---

### 📄 [docs/devops/adr/002-postgresql-database.md](./docs/devops/adr/002-postgresql-database.md)
**Decisión: PostgreSQL como database principal**

- Comparación vs MongoDB, MySQL
- Supabase como hosting platform
- Schema design principles
- Backup strategy
- Migration strategy
- Performance optimization

---

### 📄 [docs/devops/adr/003-cloudinary-image-management.md](./docs/devops/adr/003-cloudinary-image-management.md)
**Decisión: Cloudinary para gestión de imágenes**

- Comparación vs AWS S3, Vercel Blob
- Image optimization strategy
- CDN configuration
- Asset organization
- Cost analysis
- Performance metrics

---

## Configuración de CI/CD

### ⚙️ [.github/workflows/ci-cd.yml](./.github/workflows/ci-cd.yml)
**GitHub Actions pipeline completo**

Jobs incluidos:
1. Code Quality (ESLint, Prettier, TypeScript)
2. Security Scan (npm audit, secrets detection)
3. Unit & Integration Tests
4. E2E Tests (Playwright)
5. Build Verification
6. Lighthouse CI (Performance)
7. Deploy Preview (PR)
8. Deploy Staging (develop branch)
9. Deploy Production (main branch)
10. Database Migrations

---

### ⚙️ [.github/workflows/nightly-checks.yml](./.github/workflows/nightly-checks.yml)
**Health checks nocturnos**

- Production health checks
- Database backup verification
- Dependency updates check
- SSL certificate expiry check
- Performance monitoring

---

## Configuración de Vercel

### 🔧 [vercel.json](./vercel.json)
**Configuración de Vercel platform**

- Build configuration
- Security headers
- Cache headers
- Redirects & rewrites
- Cron jobs
- Function configuration

---

### 🔧 [.vercelignore](./.vercelignore)
**Archivos excluidos del deployment**

---

## Scripts de Base de Datos

### 🗄️ [scripts/db/backup.sh](./scripts/db/backup.sh)
**Script de backup de database**

- Automated backup creation
- Upload to S3
- Retention policy
- Metadata generation

---

### 🗄️ [scripts/db/restore.sh](./scripts/db/restore.sh)
**Script de restore de database**

- Safety checks
- Pre-restore backup
- Restore procedure
- Verification

---

### 🗄️ [scripts/db/migrate.sh](./scripts/db/migrate.sh)
**Script de migrations**

- Development migrations
- Production migrations
- Reset database
- Status check

---

### 🗄️ [scripts/db/verify-connection.js](./scripts/db/verify-connection.js)
**Verificación de conexión a database**

---

### 🗄️ [scripts/db/verify-backup.js](./scripts/db/verify-backup.js)
**Verificación de backups**

---

## Configuración de Monitoring

### 🔍 [sentry.client.config.ts](./sentry.client.config.ts)
**Configuración de Sentry (client-side)**

- Error tracking
- Performance monitoring
- Session replay
- PII data filtering

---

### 🔍 [sentry.server.config.ts](./sentry.server.config.ts)
**Configuración de Sentry (server-side)**

- Server-side error tracking
- API monitoring
- Database instrumentation

---

## Docker Configuration

### 🐳 [docker-compose.yml](./docker-compose.yml)
**Local development environment**

Services:
- PostgreSQL 15
- Redis 7
- Adminer (DB UI)

---

### 🐳 [.dockerignore](./.dockerignore)
**Docker build optimization**

---

## Templates

### 📝 [.github/PULL_REQUEST_TEMPLATE.md](./.github/PULL_REQUEST_TEMPLATE.md)
**Template para Pull Requests**

Secciones:
- Description
- Type of change
- Testing checklist
- Code quality checklist
- Security checklist
- Deployment notes

---

## Environment Variables

### 🔐 [.env.example](./.env.example)
**Template de variables de entorno**

Categorías:
- Database
- Next.js
- Cloudinary
- Cloudflare
- Payment Gateways (Transbank, Flow, Stripe)
- Email (Brevo)
- SMS (Twilio)
- Analytics (Google Analytics, Sentry)
- Rate Limiting (Upstash Redis)
- Feature Flags
- Admin
- Backup & Storage
- CI/CD

---

## Package Configuration

### 📦 [package.json](./package.json)
**NPM scripts completos**

Scripts por categoría:
- **Development:** dev, build, start
- **Testing:** test, test:unit, test:e2e
- **Linting:** lint, format, type-check
- **Database:** db:migrate, db:backup, db:restore
- **Docker:** docker:dev, docker:down
- **Vercel:** vercel:env:pull, vercel:env:push

---

## Estructura de Directorios

```
vina-santa-cruz/
├── .github/
│   ├── workflows/
│   │   ├── ci-cd.yml              # Main CI/CD pipeline
│   │   └── nightly-checks.yml     # Nightly health checks
│   ├── PULL_REQUEST_TEMPLATE.md   # PR template
│   └── ISSUE_TEMPLATE/            # Issue templates
├── docs/
│   └── devops/
│       ├── QUICK_START_GUIDE.md   # Quick setup guide
│       ├── monitoring-setup.md    # Monitoring configuration
│       ├── runbooks/
│       │   ├── 01-deployment.md
│       │   ├── 02-rollback.md
│       │   ├── 03-database-migrations.md
│       │   └── 04-incident-response.md
│       └── adr/                   # Architecture Decision Records
│           ├── 001-vercel-deployment-platform.md
│           ├── 002-postgresql-database.md
│           └── 003-cloudinary-image-management.md
├── scripts/
│   └── db/
│       ├── backup.sh
│       ├── restore.sh
│       ├── migrate.sh
│       ├── verify-connection.js
│       └── verify-backup.js
├── DEVOPS_MASTER_PLAN.md          # Main DevOps documentation
├── README_DEVOPS.md               # This file
├── vercel.json                    # Vercel configuration
├── .vercelignore                  # Vercel ignore rules
├── .env.example                   # Environment variables template
├── package.json                   # NPM scripts
├── docker-compose.yml             # Local dev environment
├── .dockerignore                  # Docker ignore rules
├── sentry.client.config.ts        # Sentry client config
└── sentry.server.config.ts        # Sentry server config
```

---

## Guía de Uso por Rol

### Para Developers

**Setup inicial:**
1. Lee [QUICK_START_GUIDE.md](./docs/devops/QUICK_START_GUIDE.md)
2. Configura tu entorno local
3. Familiarízate con Git workflow

**Durante desarrollo:**
- Consulta [package.json](./package.json) para comandos disponibles
- Usa [PR template](./.github/PULL_REQUEST_TEMPLATE.md) al crear PRs
- Revisa [database migrations runbook](./docs/devops/runbooks/03-database-migrations.md) para cambios de schema

**Antes de deploy:**
- Lee [deployment runbook](./docs/devops/runbooks/01-deployment.md)
- Verifica checklist de pre-deployment

---

### Para DevOps/SRE

**Setup de infraestructura:**
1. Lee [DEVOPS_MASTER_PLAN.md](./DEVOPS_MASTER_PLAN.md)
2. Configura monitoring según [monitoring-setup.md](./docs/devops/monitoring-setup.md)
3. Implementa CI/CD workflows

**Operación:**
- Mantén runbooks actualizados
- Monitorea dashboards
- Responde a incidents según [incident response](./docs/devops/runbooks/04-incident-response.md)

---

### Para Engineering Leads

**Planificación:**
- Revisa [DEVOPS_MASTER_PLAN.md](./DEVOPS_MASTER_PLAN.md)
- Consulta [ADRs](./docs/devops/adr/) para decisiones de arquitectura
- Evalúa cost analysis

**Gestión:**
- Supervisa métricas de deployment
- Coordina rollouts importantes
- Lidera post-mortems

---

### Para Product Managers

**Understanding:**
- Lee executive summary en [DEVOPS_MASTER_PLAN.md](./DEVOPS_MASTER_PLAN.md)
- Entiende deployment frequency y stability
- Revisa cost projections

---

## Métricas de Éxito

### Technical Metrics
- ✅ Deployment frequency: > 10/week
- ✅ Deployment success rate: > 98%
- ✅ MTTR (Mean Time to Recovery): < 15 min
- ✅ Test coverage: > 80%
- ✅ Uptime: > 99.9%

### Performance Metrics
- ✅ Lighthouse score: > 90
- ✅ LCP: < 2.5s
- ✅ FID: < 100ms
- ✅ CLS: < 0.1

### Business Metrics
- ✅ Page load time impact on conversion
- ✅ Error rate impact on sales: < 0.1%

---

## Costo Mensual Estimado

| Fase | Usuarios/mes | Costo/mes |
|------|-------------|-----------|
| **Launch** (0-5K) | 0-5K | $46-71 |
| **Growth** (5K-15K) | 5K-15K | $177-197 |
| **Scale** (15K-50K) | 15K-50K | $372 |

Desglose completo en [DEVOPS_MASTER_PLAN.md](./DEVOPS_MASTER_PLAN.md#cost-optimization)

---

## Roadmap de Implementación

### Phase 1: Foundation (Week 1-2)
- Infrastructure setup
- CI/CD configuration
- Monitoring setup

### Phase 2: Development (Week 2-3)
- Developer workflow
- Testing framework

### Phase 3: Staging (Week 3-4)
- Staging environment
- Validation procedures

### Phase 4: Production Readiness (Week 4-5)
- Security hardening
- Performance optimization
- Documentation

### Phase 5: Launch (Week 5-6)
- Production deployment
- Monitoring
- Post-launch optimization

**Roadmap completo:** [DEVOPS_MASTER_PLAN.md](./DEVOPS_MASTER_PLAN.md#implementation-roadmap)

---

## Soporte y Contacto

**Canales de comunicación:**
- Slack: #engineering, #deployments, #alerts
- Email: devops@vinasantacruz.cl

**Escalation:**
- On-call Engineer: @oncall (Slack)
- Engineering Lead: @lead (Slack)
- DevOps: @devops (Slack)
- CTO: @cto (Slack)

---

## Contribuciones

Para actualizar esta documentación:

1. Crea branch: `docs/update-devops-docs`
2. Actualiza documentos relevantes
3. Crea PR con descripción de cambios
4. Request review de DevOps lead

---

## Changelog

### v1.0 - 2024-01-15
- ✅ Initial DevOps documentation complete
- ✅ CI/CD pipelines configured
- ✅ Runbooks created
- ✅ ADRs documented
- ✅ Monitoring setup documented
- ✅ Scripts created

---

## License

Internal documentation for Viña Santa Cruz project.

---

**Última actualización:** 2024-01-15
**Versión:** 1.0
**Autor:** DevOps Team
**Estado:** ✅ Ready for Implementation
