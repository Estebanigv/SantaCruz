# Implementation Checklist - Viña Santa Cruz DevOps

Este checklist te guía paso a paso en la implementación completa del sistema DevOps.

---

## Phase 1: Foundation Setup (Week 1-2)

### 1.1 Platform Accounts (Day 1)

- [ ] **Vercel**
  - [ ] Crear cuenta en vercel.com
  - [ ] Crear organization "Viña Santa Cruz"
  - [ ] Upgrade a Pro plan ($20/mes)
  - [ ] Guardar VERCEL_ORG_ID y VERCEL_PROJECT_ID

- [ ] **Supabase**
  - [ ] Crear cuenta en supabase.com
  - [ ] Crear proyecto "vina-santa-cruz-staging"
  - [ ] Crear proyecto "vina-santa-cruz-production"
  - [ ] Guardar DATABASE_URL de ambos proyectos
  - [ ] Configurar connection pooling (port 6543)

- [ ] **Cloudinary**
  - [ ] Crear cuenta en cloudinary.com
  - [ ] Crear cloud "vina-santa-cruz"
  - [ ] Guardar CLOUD_NAME, API_KEY, API_SECRET
  - [ ] Crear upload presets:
    - [ ] vina-santa-cruz-products (signed)
    - [ ] vina-santa-cruz-content (signed)
    - [ ] vina-santa-cruz-user-content (unsigned)

- [ ] **Sentry**
  - [ ] Crear cuenta en sentry.io
  - [ ] Crear organization "vina-santa-cruz"
  - [ ] Crear proyecto "vina-santa-cruz-web"
  - [ ] Guardar SENTRY_DSN
  - [ ] Configurar alert rules

- [ ] **UptimeRobot**
  - [ ] Crear cuenta en uptimerobot.com
  - [ ] Configurar email notifications
  - [ ] (Opcional) Upgrade a Pro ($7/mes)

- [ ] **Cloudflare** (Opcional al inicio)
  - [ ] Agregar dominio vinasantacruz.cl
  - [ ] Configurar DNS
  - [ ] Habilitar proxying
  - [ ] Configurar SSL (Full strict)
  - [ ] Configurar WAF rules básicas

### 1.2 GitHub Repository (Day 1)

- [ ] **Create Repository**
  - [ ] Crear repositorio privado en GitHub
  - [ ] Nombre: "vina-santa-cruz"
  - [ ] Añadir .gitignore (Node.js)
  - [ ] Añadir README.md
  - [ ] Añadir LICENSE (si aplica)

- [ ] **Configure Repository**
  - [ ] Habilitar Issues
  - [ ] Habilitar Projects
  - [ ] Habilitar Wiki (opcional)
  - [ ] Configurar branch protection rules

- [ ] **Branch Protection: main**
  - [ ] Require pull request reviews (2 approvals)
  - [ ] Require status checks to pass
  - [ ] Require branches to be up to date
  - [ ] Include administrators
  - [ ] Do not allow force pushes
  - [ ] Do not allow deletions

- [ ] **Branch Protection: develop**
  - [ ] Require pull request reviews (1 approval)
  - [ ] Require status checks to pass
  - [ ] Allow force pushes (maintainers only)

- [ ] **Add Team Members**
  - [ ] Invite developers (Write access)
  - [ ] Invite lead developer (Admin access)
  - [ ] Invite QA (Triage access)

### 1.3 Local Repository Setup (Day 1)

- [ ] **Clone Repository**
  ```bash
  git clone https://github.com/[org]/vina-santa-cruz.git
  cd vina-santa-cruz
  ```

- [ ] **Copy DevOps Files**
  - [ ] Copiar todos los archivos generados al repositorio
  - [ ] Verificar estructura de directorios

- [ ] **Configure Git**
  ```bash
  git config user.name "Your Name"
  git config user.email "your.email@vinasantacruz.cl"
  ```

- [ ] **Create Branches**
  ```bash
  git checkout -b develop
  git push origin develop
  ```

### 1.4 Environment Variables (Day 2)

- [ ] **Create .env.local (Development)**
  - [ ] Copiar .env.example a .env.local
  - [ ] Completar todas las variables
  - [ ] Verificar que funciona localmente

- [ ] **Vercel Environment Variables (Staging)**
  - [ ] DATABASE_URL (Supabase staging pooled)
  - [ ] DIRECT_URL (Supabase staging direct)
  - [ ] NEXTAUTH_URL (staging URL)
  - [ ] NEXTAUTH_SECRET (generate: `openssl rand -base64 32`)
  - [ ] Cloudinary credentials
  - [ ] Sentry DSN
  - [ ] Payment gateways (sandbox mode)
  - [ ] Email service (Brevo)
  - [ ] All other required variables

- [ ] **Vercel Environment Variables (Production)**
  - [ ] DATABASE_URL (Supabase production pooled)
  - [ ] DIRECT_URL (Supabase production direct)
  - [ ] NEXTAUTH_URL (production URL)
  - [ ] NEXTAUTH_SECRET (different from staging!)
  - [ ] Cloudinary credentials (production)
  - [ ] Sentry DSN
  - [ ] Payment gateways (production mode)
  - [ ] Email service (Brevo)
  - [ ] All other required variables

- [ ] **Document Secrets**
  - [ ] Store all secrets in 1Password/LastPass
  - [ ] Share access with team lead
  - [ ] Document rotation schedule (90 days)

### 1.5 CI/CD Setup (Day 2-3)

- [ ] **Copy Workflow Files**
  - [ ] .github/workflows/ci-cd.yml
  - [ ] .github/workflows/nightly-checks.yml
  - [ ] Commit y push

- [ ] **Configure GitHub Secrets**
  - [ ] VERCEL_TOKEN
  - [ ] VERCEL_ORG_ID
  - [ ] VERCEL_PROJECT_ID
  - [ ] DATABASE_URL (for test DB)
  - [ ] SLACK_WEBHOOK_URL (opcional)

- [ ] **Test CI/CD**
  - [ ] Create test branch
  - [ ] Make small change
  - [ ] Push y verify workflow runs
  - [ ] Check all jobs pass
  - [ ] Verify preview deployment created

### 1.6 Vercel Project Setup (Day 3)

- [ ] **Import Repository**
  - [ ] Go to Vercel dashboard
  - [ ] Import git repository
  - [ ] Select framework: Next.js
  - [ ] Configure project settings

- [ ] **Configure Build Settings**
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `.next`
  - [ ] Install Command: `npm ci`
  - [ ] Node Version: 20.x

- [ ] **Configure Domains**
  - [ ] Production: www.vinasantacruz.cl
  - [ ] Staging: staging.vinasantacruz.cl
  - [ ] Configure DNS (Cloudflare or Vercel)
  - [ ] Verify SSL certificates

- [ ] **Configure Git Integration**
  - [ ] Production Branch: main
  - [ ] Preview Deployments: All branches
  - [ ] Auto-deploy on push: Enabled

### 1.7 Monitoring Setup (Day 3-4)

- [ ] **Sentry Configuration**
  - [ ] Install Sentry CLI: `npm install -g @sentry/cli`
  - [ ] Run Sentry wizard: `npx @sentry/wizard -i nextjs`
  - [ ] Verify sentry.client.config.ts
  - [ ] Verify sentry.server.config.ts
  - [ ] Deploy y test error tracking
  - [ ] Configure alert rules in Sentry dashboard

- [ ] **UptimeRobot Monitors**
  - [ ] Monitor 1: Main site (https://www.vinasantacruz.cl)
    - Type: HTTPS
    - Interval: 5 minutes
    - Alert when down: 2 checks (10 min)
  - [ ] Monitor 2: API health (/api/health)
    - Type: HTTPS
    - Interval: 5 minutes
    - Keyword: "healthy"
  - [ ] Monitor 3: Staging (https://staging.vinasantacruz.cl)
    - Type: HTTPS
    - Interval: 10 minutes
  - [ ] Configure alert contacts (email, Slack)

- [ ] **Vercel Analytics**
  - [ ] Verify Analytics enabled in Vercel dashboard
  - [ ] Add <Analytics /> component to app layout
  - [ ] Add <SpeedInsights /> component
  - [ ] Deploy y verify data collection

### 1.8 Slack Setup (Day 4)

- [ ] **Create Channels**
  - [ ] #engineering (general dev discussion)
  - [ ] #deployments (deployment notifications)
  - [ ] #alerts (monitoring alerts)
  - [ ] #incidents (incident coordination)

- [ ] **Configure Webhooks**
  - [ ] Create webhook for #alerts
  - [ ] Create webhook for #deployments
  - [ ] Add webhooks to GitHub secrets
  - [ ] Test notifications

- [ ] **Add Integrations**
  - [ ] GitHub (PR notifications)
  - [ ] Vercel (deployment notifications)
  - [ ] Sentry (error alerts)
  - [ ] UptimeRobot (downtime alerts)

---

## Phase 2: Development Environment (Week 2-3)

### 2.1 Database Setup (Day 5)

- [ ] **Staging Database**
  - [ ] Verify Supabase project created
  - [ ] Run initial migration: `npm run db:migrate:deploy`
  - [ ] Verify tables created
  - [ ] Run seed script: `npm run db:seed`
  - [ ] Test connection: `npm run db:verify`

- [ ] **Production Database**
  - [ ] Verify Supabase project created
  - [ ] DO NOT run migrations yet (will do at launch)
  - [ ] Configure backups:
    - [ ] Daily automated backups enabled
    - [ ] Retention: 30 days
    - [ ] Point-in-time recovery enabled

- [ ] **Local Development**
  - [ ] Start Docker: `docker-compose up -d`
  - [ ] Verify PostgreSQL running
  - [ ] Verify Adminer accessible (localhost:8080)
  - [ ] Run migrations: `npm run db:migrate:dev`
  - [ ] Seed data: `npm run db:seed`

### 2.2 Developer Tools (Day 5-6)

- [ ] **Install Dependencies**
  ```bash
  npm ci
  ```

- [ ] **Configure Husky (Git Hooks)**
  ```bash
  npm run prepare
  ```
  - [ ] Test pre-commit hook
  - [ ] Verify lint runs on commit
  - [ ] Verify tests run on commit

- [ ] **VS Code Setup** (Opcional)
  - [ ] Create .vscode/settings.json
  - [ ] Configure ESLint extension
  - [ ] Configure Prettier extension
  - [ ] Configure format on save

- [ ] **Test Local Development**
  - [ ] `npm run dev` starts successfully
  - [ ] Homepage loads at localhost:3000
  - [ ] No console errors
  - [ ] Database connected
  - [ ] Hot reload works

### 2.3 Testing Framework (Day 6-7)

- [ ] **Unit Tests**
  - [ ] Verify Vitest configured
  - [ ] Create sample test
  - [ ] Run: `npm run test:unit`
  - [ ] Verify coverage report

- [ ] **Integration Tests**
  - [ ] Create sample integration test
  - [ ] Run: `npm run test:integration`

- [ ] **E2E Tests**
  - [ ] Install Playwright browsers: `npx playwright install`
  - [ ] Create sample E2E test
  - [ ] Run: `npm run test:e2e`
  - [ ] Verify test report generated

### 2.4 Documentation (Day 7)

- [ ] **Update README.md**
  - [ ] Project description
  - [ ] Setup instructions
  - [ ] Development workflow
  - [ ] Link to QUICK_START_GUIDE.md

- [ ] **Create CONTRIBUTING.md**
  - [ ] Code style guidelines
  - [ ] PR process
  - [ ] Testing requirements
  - [ ] Commit message format

- [ ] **Team Training**
  - [ ] Schedule training session
  - [ ] Walk through QUICK_START_GUIDE
  - [ ] Demonstrate Git workflow
  - [ ] Q&A session

---

## Phase 3: Staging Environment (Week 3-4)

### 3.1 Staging Deployment (Day 8)

- [ ] **Deploy to Staging**
  - [ ] Merge develop branch
  - [ ] Verify auto-deployment triggered
  - [ ] Monitor deployment in Vercel
  - [ ] Verify deployment successful

- [ ] **Verify Staging**
  ```bash
  curl https://staging.vinasantacruz.cl/api/health
  ```
  - [ ] Health check passes
  - [ ] Homepage loads
  - [ ] Database connected
  - [ ] Images load (Cloudinary)
  - [ ] No errors in Sentry

### 3.2 Payment Gateway Setup (Day 8-9)

- [ ] **Transbank (Chile)**
  - [ ] Create sandbox account
  - [ ] Get test credentials
  - [ ] Configure in staging environment
  - [ ] Test payment flow
  - [ ] Verify webhooks

- [ ] **Flow (Chile)** (Opcional)
  - [ ] Create sandbox account
  - [ ] Get test credentials
  - [ ] Configure in staging
  - [ ] Test payment flow

- [ ] **Stripe (International)** (Opcional)
  - [ ] Create account
  - [ ] Get test credentials
  - [ ] Configure in staging
  - [ ] Test payment flow

### 3.3 Email & SMS Setup (Day 9)

- [ ] **Brevo (Email)**
  - [ ] Create account
  - [ ] Get API key
  - [ ] Configure sender domain
  - [ ] Create email templates
  - [ ] Test email sending

- [ ] **Twilio (SMS)** (Opcional)
  - [ ] Create account
  - [ ] Get credentials
  - [ ] Buy phone number
  - [ ] Test SMS sending

### 3.4 QA Testing (Day 10-12)

- [ ] **Manual Testing Checklist**
  - [ ] User registration
  - [ ] User login
  - [ ] Browse products
  - [ ] Search functionality
  - [ ] Add to cart
  - [ ] Checkout flow
  - [ ] Payment processing (test mode)
  - [ ] Order confirmation email
  - [ ] Admin panel access

- [ ] **Performance Testing**
  - [ ] Run Lighthouse audit
  - [ ] Check Core Web Vitals
  - [ ] Verify score > 90
  - [ ] Document any issues

- [ ] **Security Testing**
  - [ ] Verify HTTPS working
  - [ ] Check security headers
  - [ ] Test rate limiting
  - [ ] Verify input validation
  - [ ] Check for XSS vulnerabilities
  - [ ] Test authentication

- [ ] **Bug Tracking**
  - [ ] Create GitHub issues for bugs
  - [ ] Prioritize and assign
  - [ ] Fix critical bugs
  - [ ] Re-test after fixes

---

## Phase 4: Production Readiness (Week 4-5)

### 4.1 Security Hardening (Day 13-14)

- [ ] **Security Audit**
  - [ ] Review all API endpoints
  - [ ] Verify authentication on protected routes
  - [ ] Check authorization logic
  - [ ] Verify input validation
  - [ ] Review database queries (SQL injection)
  - [ ] Check for exposed secrets

- [ ] **Secrets Rotation**
  - [ ] Rotate all API keys
  - [ ] Generate new NEXTAUTH_SECRET for production
  - [ ] Update all production environment variables
  - [ ] Document rotation date

- [ ] **Cloudflare WAF** (Si está configurado)
  - [ ] Enable WAF rules
  - [ ] Configure rate limiting rules
  - [ ] Set up bot management
  - [ ] Configure DDoS protection
  - [ ] Test rules in staging

- [ ] **Content Security Policy**
  - [ ] Configure CSP headers
  - [ ] Test in staging
  - [ ] Monitor violations

### 4.2 Performance Optimization (Day 14-15)

- [ ] **Image Optimization**
  - [ ] Verify all images use Cloudinary
  - [ ] Check image formats (WebP/AVIF)
  - [ ] Verify lazy loading
  - [ ] Check image sizes

- [ ] **Database Optimization**
  - [ ] Review all queries
  - [ ] Add missing indexes
  - [ ] Optimize slow queries
  - [ ] Configure connection pooling

- [ ] **Caching Strategy**
  - [ ] Configure CDN cache headers
  - [ ] Set up ISR for static pages
  - [ ] Configure API route caching
  - [ ] Test cache hit rates

- [ ] **Bundle Size**
  - [ ] Run bundle analyzer
  - [ ] Check for large dependencies
  - [ ] Implement code splitting
  - [ ] Remove unused code

### 4.3 Backup & Recovery (Day 15)

- [ ] **Test Backup**
  ```bash
  npm run db:backup staging
  ```
  - [ ] Verify backup created
  - [ ] Check backup size
  - [ ] Verify backup integrity

- [ ] **Test Restore**
  ```bash
  npm run db:restore staging [backup-file]
  ```
  - [ ] Restore to test database
  - [ ] Verify data integrity
  - [ ] Document restore time

- [ ] **Disaster Recovery Plan**
  - [ ] Document all recovery procedures
  - [ ] Create runbook
  - [ ] Train team on procedures
  - [ ] Schedule DR drill

### 4.4 Documentation Review (Day 16)

- [ ] **Review All Documentation**
  - [ ] DEVOPS_MASTER_PLAN.md
  - [ ] QUICK_START_GUIDE.md
  - [ ] All runbooks
  - [ ] All ADRs

- [ ] **Update Documentation**
  - [ ] Fix any errors
  - [ ] Add missing information
  - [ ] Update screenshots
  - [ ] Verify all links work

- [ ] **Team Review**
  - [ ] Share with team
  - [ ] Collect feedback
  - [ ] Incorporate suggestions

---

## Phase 5: Production Launch (Week 5-6)

### 5.1 Pre-Launch (Day 17-18)

- [ ] **Production Database**
  - [ ] Create final backup of staging
  - [ ] Run migrations on production DB
  - [ ] Verify migrations successful
  - [ ] Seed initial data (if needed)

- [ ] **Production Environment Variables**
  - [ ] Double-check all variables
  - [ ] Verify production API keys
  - [ ] Test payment gateways (production mode)
  - [ ] Verify email sending

- [ ] **DNS Configuration**
  - [ ] Configure www.vinasantacruz.cl → Vercel
  - [ ] Configure vinasantacruz.cl → redirect to www
  - [ ] Verify SSL certificates
  - [ ] Lower TTL (for quick changes if needed)

- [ ] **Final Checklist**
  - [ ] All tests passing
  - [ ] Lighthouse score > 90
  - [ ] Security scan clean
  - [ ] Backup verified
  - [ ] Team trained
  - [ ] Monitoring configured
  - [ ] Alerts tested
  - [ ] Runbooks ready

### 5.2 Launch Day (Day 19)

- [ ] **Deploy to Production**
  - [ ] Merge to main branch
  - [ ] Monitor deployment
  - [ ] Verify deployment successful
  - [ ] Run smoke tests

- [ ] **Immediate Verification**
  ```bash
  # Health check
  curl https://www.vinasantacruz.cl/api/health

  # Test critical endpoints
  curl https://www.vinasantacruz.cl
  curl https://www.vinasantacruz.cl/productos
  curl https://www.vinasantacruz.cl/api/productos
  ```

- [ ] **Manual Testing**
  - [ ] Homepage loads
  - [ ] Product catalog works
  - [ ] Search works
  - [ ] Add to cart
  - [ ] Checkout flow
  - [ ] Payment processing (real transaction with small amount)
  - [ ] Order confirmation
  - [ ] Admin panel

- [ ] **Monitor for 2 Hours**
  - [ ] Watch Vercel Analytics
  - [ ] Monitor Sentry for errors
  - [ ] Check UptimeRobot status
  - [ ] Review logs
  - [ ] Monitor performance metrics

### 5.3 Post-Launch (Day 20-21)

- [ ] **24-Hour Monitoring**
  - [ ] Check metrics every 2 hours
  - [ ] Review error rates
  - [ ] Check performance
  - [ ] Monitor user feedback

- [ ] **Performance Analysis**
  - [ ] Run Lighthouse audit
  - [ ] Check Core Web Vitals
  - [ ] Review conversion rates
  - [ ] Analyze user behavior

- [ ] **Address Issues**
  - [ ] Fix any bugs found
  - [ ] Optimize any slow queries
  - [ ] Adjust caching if needed

### 5.4 One Week Post-Launch (Day 22-28)

- [ ] **Weekly Review**
  - [ ] Review all metrics
  - [ ] Check uptime (should be > 99.9%)
  - [ ] Analyze error rates
  - [ ] Review deployment frequency
  - [ ] Check cost vs. budget

- [ ] **Optimization**
  - [ ] Identify bottlenecks
  - [ ] Optimize database queries
  - [ ] Adjust cache strategies
  - [ ] Fine-tune monitoring alerts

- [ ] **Team Retrospective**
  - [ ] What went well?
  - [ ] What could be improved?
  - [ ] Action items
  - [ ] Update documentation

---

## Ongoing Maintenance

### Daily

- [ ] Check monitoring dashboards
- [ ] Review error logs in Sentry
- [ ] Monitor uptime status
- [ ] Respond to alerts

### Weekly

- [ ] Review deployment metrics
- [ ] Check performance trends
- [ ] Review security alerts
- [ ] Update dependencies (if needed)

### Monthly

- [ ] Review cost vs. budget
- [ ] Test backup restore procedure
- [ ] Review and rotate secrets (if due)
- [ ] Update documentation
- [ ] Team training on new features

### Quarterly

- [ ] Full security audit
- [ ] Performance review
- [ ] Cost optimization review
- [ ] Disaster recovery drill
- [ ] Review and update SLAs

---

## Success Criteria

### Technical

✅ Deployment frequency > 10/week
✅ Deployment success rate > 98%
✅ MTTR < 15 minutes
✅ Test coverage > 80%
✅ Uptime > 99.9%

### Performance

✅ Lighthouse score > 90
✅ LCP < 2.5s
✅ FID < 100ms
✅ CLS < 0.1
✅ API response time (p95) < 500ms

### Business

✅ Zero data loss incidents
✅ Error rate < 0.1%
✅ Cost within budget
✅ Positive user feedback
✅ Conversion rate > 2%

---

## Completion

Una vez completado este checklist:

1. [ ] Mark all items as complete
2. [ ] Document any deviations
3. [ ] Archive this checklist
4. [ ] Move to normal operations
5. [ ] Schedule first retrospective

**Congratulations! 🎉 Your DevOps infrastructure is live!**

---

**Checklist Version:** 1.0
**Last Updated:** 2024-01-15
**Owner:** DevOps Team
