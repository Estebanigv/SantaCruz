# Runbook: Database Migrations

## Overview

This runbook covers safe database migration practices for Viña Santa Cruz platform.

## Migration Strategy

We use **Prisma Migrate** for database schema changes with the following principles:

1. **Zero-downtime migrations** - Schema changes should not require downtime
2. **Backward compatibility** - New code must work with old schema during deployment
3. **Automated backups** - Always backup before migration
4. **Staging first** - Test all migrations in staging before production
5. **Rollback plan** - Every migration must have a rollback procedure

## Migration Types

### Safe Migrations (Zero Downtime)

These can be applied directly to production:

✅ **Adding new tables**
✅ **Adding new columns with default values**
✅ **Adding new indexes (with CONCURRENTLY)**
✅ **Creating new foreign keys** (if data already valid)
✅ **Adding NOT NULL constraints** (if column has no nulls)

### Risky Migrations (Require Planning)

These require multi-step deployment:

⚠️ **Renaming columns**
⚠️ **Removing columns**
⚠️ **Changing column types**
⚠️ **Adding NOT NULL to existing column**
⚠️ **Removing tables**
⚠️ **Adding unique constraints**

## Standard Migration Workflow

### 1. Create Migration

**Development Environment:**

```bash
# Make changes to prisma/schema.prisma
# Then create migration

npm run db:migrate:dev -- --name add_product_reviews

# This will:
# - Create migration files
# - Apply to local database
# - Regenerate Prisma Client
```

**Review Generated SQL:**

```bash
# Check the migration file
cat prisma/migrations/YYYYMMDD_HHMMSS_add_product_reviews/migration.sql
```

**Example migration:**
```sql
-- CreateTable
CREATE TABLE "ProductReview" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductReview_productId_idx" ON "ProductReview"("productId");

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_productId_fkey"
    FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE;
```

### 2. Test Locally

```bash
# Reset database to clean state
npm run db:migrate:reset

# Verify application works
npm run dev

# Run tests
npm run test
```

### 3. Deploy to Staging

**Create backup:**
```bash
npm run db:backup staging
```

**Apply migration:**
```bash
# Via CI/CD (recommended)
git push origin develop

# Or manually
npm run db:migrate:deploy staging
```

**Verify staging:**
```bash
# Check migration status
npm run db:migrate:status

# Test application
curl https://staging.vinasantacruz.cl/api/health

# Manual testing
# - Test affected features
# - Verify data integrity
# - Check performance
```

### 4. Deploy to Production

**Pre-deployment checklist:**
- [ ] Migration tested in staging for at least 24 hours
- [ ] No issues reported in staging
- [ ] Backup verified and downloadable
- [ ] Rollback plan documented
- [ ] Stakeholders notified
- [ ] Low-traffic time window selected

**Backup production:**
```bash
npm run db:backup production

# Verify backup
ls -lh backups/db/production_*.sql.gz | tail -1
```

**Apply migration:**

Migration runs automatically during deployment via GitHub Actions.

Watch the deployment:
```bash
# Monitor GitHub Actions
open https://github.com/<org>/vina-santa-cruz/actions

# Or apply manually if needed
npm run db:migrate:deploy production
```

**Verify production:**
```bash
# Check migration status
npm run db:migrate:status

# Verify health
curl https://www.vinasantacruz.cl/api/health

# Check database stats
npm run db:verify production
```

## Complex Migration Patterns

### Pattern 1: Renaming a Column (Zero Downtime)

**Problem:** Direct column rename breaks old code during deployment.

**Solution:** Multi-step migration

**Step 1: Add new column**
```prisma
model Product {
  id          String @id @default(cuid())
  name        String  // Old column
  productName String? // New column
}
```

```bash
npm run db:migrate:dev -- --name add_product_name_column
```

**Step 2: Backfill data**
```sql
-- In migration file, add data migration
UPDATE "Product" SET "productName" = "name" WHERE "productName" IS NULL;
```

**Step 3: Deploy code that writes to both columns**
```typescript
// Update application code
await prisma.product.create({
  data: {
    name: productName,        // Old column
    productName: productName, // New column
  }
});
```

**Step 4: Make new column NOT NULL**
```prisma
model Product {
  id          String @id @default(cuid())
  name        String
  productName String  // Now required
}
```

**Step 5: Deploy code that reads from new column**
```typescript
// Switch to new column
const product = await prisma.product.findUnique({
  select: { productName: true }
});
```

**Step 6: Remove old column**
```prisma
model Product {
  id          String @id @default(cuid())
  productName String
}
```

### Pattern 2: Adding NOT NULL Constraint

**Problem:** Can't add NOT NULL if existing rows have NULL.

**Solution:**

**Step 1: Add column as nullable**
```prisma
model Order {
  id          String @id
  status      String?  // Nullable first
}
```

**Step 2: Backfill existing data**
```sql
UPDATE "Order" SET "status" = 'pending' WHERE "status" IS NULL;
```

**Step 3: Make column NOT NULL**
```prisma
model Order {
  id          String @id
  status      String   // Now required
}
```

### Pattern 3: Large Data Migration

**Problem:** Updating millions of rows can lock table.

**Solution:** Batch updates

```typescript
// scripts/migrations/backfill-product-categories.ts
import { prisma } from '../lib/prisma';

async function backfillCategories() {
  const batchSize = 1000;
  let page = 0;

  while (true) {
    const products = await prisma.product.findMany({
      where: { category: null },
      take: batchSize,
      skip: page * batchSize,
    });

    if (products.length === 0) break;

    await prisma.$transaction(
      products.map((product) =>
        prisma.product.update({
          where: { id: product.id },
          data: { category: 'UNCATEGORIZED' },
        })
      )
    );

    console.log(`Backfilled ${(page + 1) * batchSize} products`);
    page++;

    // Pause between batches to avoid overwhelming DB
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('Backfill complete');
}

backfillCategories()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run manually after deployment:
```bash
tsx scripts/migrations/backfill-product-categories.ts
```

## Emergency Migration Rollback

### Option 1: Application Rollback (Recommended)

If migration succeeded but caused issues:

1. Rollback application deployment
2. Old code will work with new schema (if backward compatible)
3. Fix issue, redeploy

### Option 2: Database Restore (Last Resort)

⚠️ **Data loss will occur**

```bash
# Restore from pre-migration backup
npm run db:restore production backups/db/production_YYYYMMDD_HHMMSS.sql.gz

# Rollback application to match database schema
vercel promote <previous-deployment> --prod
```

## Migration Performance Considerations

### Creating Indexes

**Bad (locks table):**
```sql
CREATE INDEX "Product_name_idx" ON "Product"("name");
```

**Good (non-blocking):**
```sql
CREATE INDEX CONCURRENTLY "Product_name_idx" ON "Product"("name");
```

**In Prisma:**
```prisma
// Prisma doesn't support CONCURRENTLY directly
// Create custom migration file:

-- Custom migration
CREATE INDEX CONCURRENTLY IF NOT EXISTS "Product_name_idx" ON "Product"("name");
```

### Large Table Alterations

For tables with millions of rows:

1. **Test migration duration in staging**
   ```bash
   time npm run db:migrate:deploy staging
   ```

2. **If > 5 minutes:** Consider alternative approach
   - Add new table
   - Gradually migrate data
   - Switch over
   - Drop old table

3. **Set statement timeout**
   ```sql
   SET statement_timeout = '30s';
   ```

## Monitoring Migrations

### During Migration

Watch these metrics:

```bash
# Database connections
SELECT count(*) FROM pg_stat_activity;

# Long-running queries
SELECT pid, now() - query_start as duration, query
FROM pg_stat_activity
WHERE state = 'active'
ORDER BY duration DESC;

# Locks
SELECT * FROM pg_locks WHERE NOT granted;
```

### After Migration

Verify:
- [ ] Query performance unchanged
- [ ] No lock contention
- [ ] Index usage as expected
- [ ] No unexpected data loss

```sql
-- Check table sizes
SELECT
  relname as table_name,
  pg_size_pretty(pg_total_relation_size(relid)) as total_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;

-- Check index usage
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;
```

## Migration Checklist

### Pre-Migration

- [ ] Schema changes reviewed
- [ ] Migration SQL reviewed
- [ ] Tested in local environment
- [ ] Tested in staging for 24+ hours
- [ ] Backward compatibility verified
- [ ] Performance impact assessed
- [ ] Backup created and verified
- [ ] Rollback plan documented
- [ ] Team notified

### During Migration

- [ ] Monitor database connections
- [ ] Watch for locks
- [ ] Check error logs
- [ ] Verify migration progress

### Post-Migration

- [ ] Migration status confirmed
- [ ] Application health verified
- [ ] Critical features tested
- [ ] Performance metrics checked
- [ ] No errors in logs
- [ ] Backup of new state created

## Common Issues

### Issue: Migration Timeout

**Symptoms:** Migration hangs or times out

**Solution:**
1. Check for long-running queries blocking migration
2. Increase timeout if legitimate long operation
3. Break into smaller migrations
4. Run during low-traffic period

### Issue: Foreign Key Violation

**Symptoms:** Migration fails with FK constraint error

**Solution:**
1. Verify data integrity first
2. Clean up orphaned records
3. Re-run migration

```sql
-- Find orphaned records
SELECT * FROM "OrderItem"
WHERE "productId" NOT IN (SELECT "id" FROM "Product");

-- Clean up
DELETE FROM "OrderItem"
WHERE "productId" NOT IN (SELECT "id" FROM "Product");
```

### Issue: Unique Constraint Violation

**Symptoms:** Adding unique constraint fails

**Solution:**
1. Find duplicate data
2. Deduplicate before migration

```sql
-- Find duplicates
SELECT email, COUNT(*)
FROM "User"
GROUP BY email
HAVING COUNT(*) > 1;

-- Deduplicate (strategy depends on business logic)
```

## Scripts Reference

```bash
# Create new migration
npm run db:migrate:dev -- --name <name>

# Apply migrations (staging)
npm run db:migrate:deploy staging

# Apply migrations (production)
npm run db:migrate:deploy production

# Check migration status
npm run db:migrate:status

# Reset database (dev only!)
npm run db:migrate:reset

# Open database browser
npm run db:studio

# Backup database
npm run db:backup <environment>

# Restore database
npm run db:restore <environment> <backup-file>

# Verify database
npm run db:verify <environment>
```

## Related Documentation

- [Prisma Migrate Documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Deployment Runbook](./01-deployment.md)
- [Rollback Runbook](./02-rollback.md)
