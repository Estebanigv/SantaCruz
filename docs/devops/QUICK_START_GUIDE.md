# Quick Start Guide - DevOps Setup

## Para Desarrolladores Nuevos en el Proyecto

Esta guía te ayudará a configurar tu entorno de desarrollo y entender el workflow de DevOps en 30 minutos.

---

## Paso 1: Clonar el Repositorio (2 minutos)

```bash
git clone https://github.com/[org]/vina-santa-cruz.git
cd vina-santa-cruz
```

---

## Paso 2: Instalar Dependencias (3 minutos)

```bash
# Requisitos previos:
# - Node.js 20.x o superior
# - npm 10.x o superior

# Instalar dependencias
npm ci

# Verificar instalación
node --version  # Should be >= 20.0.0
npm --version   # Should be >= 10.0.0
```

---

## Paso 3: Configurar Variables de Entorno (5 minutos)

```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar .env.local con tus credenciales
# Pedir a tu lead las credenciales de desarrollo
```

**Variables mínimas para desarrollo local:**

```bash
# Database (usa Supabase free tier o local PostgreSQL)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Cloudinary (pedir API keys al team)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="vina-santa-cruz-dev"
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Opcional: Sentry para testing
NEXT_PUBLIC_SENTRY_DSN="..."
```

---

## Paso 4: Configurar Base de Datos (5 minutos)

### Opción A: PostgreSQL Local (con Docker)

```bash
# Iniciar PostgreSQL con Docker
docker-compose up -d

# Aplicar migraciones
npm run db:migrate:dev

# Seed data
npm run db:seed
```

### Opción B: Supabase (Recomendado para desarrollo)

```bash
# 1. Crear cuenta en supabase.com
# 2. Crear nuevo proyecto
# 3. Copiar DATABASE_URL desde proyecto
# 4. Aplicar migraciones
npm run db:migrate:dev

# 5. Seed data
npm run db:seed
```

---

## Paso 5: Iniciar Desarrollo (2 minutos)

```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir en browser: http://localhost:3000
```

**Verificar que funciona:**
- ✅ Homepage carga correctamente
- ✅ No hay errores en consola
- ✅ Database está conectada

---

## Paso 6: Entender el Workflow de Git (5 minutos)

### Branching Strategy

```
main (production)
  │
  └─ develop (staging)
      │
      ├─ feature/your-feature-name
      ├─ bugfix/bug-description
      └─ enhancement/enhancement-name
```

### Crear Feature Branch

```bash
# Asegúrate de estar en develop actualizado
git checkout develop
git pull origin develop

# Crear tu feature branch
git checkout -b feature/add-product-filters

# Hacer tus cambios...

# Commit (Husky ejecutará lint y tests automáticamente)
git add .
git commit -m "feat: add product filter functionality"

# Push a GitHub
git push origin feature/add-product-filters
```

### Crear Pull Request

1. Ve a GitHub
2. Crea PR de tu branch hacia `develop`
3. Espera a que CI/CD pase (5-10 min)
4. Revisa el preview deployment URL automático
5. Pide code review
6. Merge cuando esté aprobado

---

## Paso 7: Testing (5 minutos)

```bash
# Unit tests
npm run test:unit

# E2E tests (requiere app corriendo)
npm run test:e2e

# Lint
npm run lint

# Type check
npm run type-check

# Todos los checks (como CI)
npm run lint && npm run type-check && npm run test:unit && npm run build
```

---

## Paso 8: Database Migrations (3 minutos)

### Cuando necesitas cambiar el schema:

```bash
# 1. Edita prisma/schema.prisma
# 2. Genera migración
npm run db:migrate:dev -- --name add_product_reviews

# Esto creará:
# - Archivo de migración en prisma/migrations/
# - Aplicará la migración a tu DB local
# - Regenerará Prisma Client

# 3. Commit la migración
git add prisma/
git commit -m "feat: add product reviews table"
```

---

## Comandos Esenciales del Día a Día

### Desarrollo
```bash
npm run dev              # Iniciar dev server
npm run db:studio        # Abrir Prisma Studio (DB browser)
npm run build            # Build producción local
npm run lint:fix         # Fix lint issues
npm run format           # Format code con Prettier
```

### Testing
```bash
npm run test             # Run all tests
npm run test:watch       # Tests en watch mode
npm run test:unit        # Solo unit tests
npm run test:e2e         # Solo E2E tests
npm run test:e2e:ui      # E2E con UI (debugging)
```

### Database
```bash
npm run db:migrate:dev   # Crear y aplicar migración
npm run db:push          # Push schema sin migración (dev only)
npm run db:studio        # Database browser
npm run db:seed          # Seed test data
npm run db:reset         # Reset DB (destructivo!)
```

### Git
```bash
git status               # Ver cambios
git add .                # Stage cambios
git commit -m "..."      # Commit (ejecuta pre-commit hooks)
git push                 # Push a GitHub
git pull                 # Pull cambios
```

---

## Troubleshooting Común

### Problema: "npm install" falla

**Solución:**
```bash
# Limpiar node_modules y cache
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Problema: Database connection error

**Solución:**
```bash
# Verificar que DATABASE_URL está correcto
echo $DATABASE_URL

# Verificar que database existe
npm run db:verify

# Recrear database
npm run db:reset
```

### Problema: Build falla

**Solución:**
```bash
# Limpiar .next
rm -rf .next

# Regenerar Prisma Client
npm run db:generate

# Build again
npm run build
```

### Problema: Tests fallan

**Solución:**
```bash
# Asegúrate que test DB está configurado
# Edita .env.test con DATABASE_URL de test

# Reset test database
npm run db:migrate:test

# Run tests
npm run test
```

### Problema: Pre-commit hooks fallan

**Solución:**
```bash
# Reinstalar Husky
npm run prepare

# Si siguen fallando, fix manualmente
npm run lint:fix
npm run format

# Commit again
git commit -m "..."
```

---

## Checklist de Configuración Completa

Antes de empezar a desarrollar, verifica:

- [ ] Node.js 20+ instalado
- [ ] npm 10+ instalado
- [ ] Git configurado con tu email/nombre
- [ ] Repositorio clonado
- [ ] Dependencias instaladas (`npm ci`)
- [ ] `.env.local` configurado
- [ ] Database conectada y migrada
- [ ] `npm run dev` funciona
- [ ] Homepage carga en http://localhost:3000
- [ ] Husky pre-commit hooks funcionan
- [ ] Tests pasan (`npm run test:unit`)
- [ ] Build pasa (`npm run build`)

---

## Próximos Pasos

1. **Lee la documentación:**
   - [DEVOPS_MASTER_PLAN.md](../DEVOPS_MASTER_PLAN.md) - Plan completo
   - [Deployment Runbook](./runbooks/01-deployment.md) - Cómo hacer deploy
   - [ADRs](./adr/) - Decisiones de arquitectura

2. **Únete a canales de Slack:**
   - #engineering - Discusión general
   - #deployments - Notificaciones de deploys
   - #alerts - Alertas de producción

3. **Familiarízate con herramientas:**
   - Vercel Dashboard
   - Sentry (error tracking)
   - Supabase Dashboard
   - Cloudinary

4. **Haz tu primer PR:**
   - Encuentra un issue "good first issue"
   - Crea feature branch
   - Haz cambios
   - Crea PR
   - Espera review

---

## Ayuda y Soporte

**¿Tienes preguntas?**

- Slack: #engineering o #help
- Email: dev@vinasantacruz.cl
- Lead Developer: @lead en Slack

**Recursos útiles:**

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Vercel Docs](https://vercel.com/docs)
- Internal Wiki: [link]

---

## Development Workflow Summary

```
1. git checkout develop
2. git pull origin develop
3. git checkout -b feature/my-feature
4. [Make changes]
5. npm run test
6. git add .
7. git commit -m "feat: description"
8. git push origin feature/my-feature
9. Create PR on GitHub
10. Wait for CI/CD ✅
11. Get code review
12. Merge!
```

**¡Listo para desarrollar! 🚀**
