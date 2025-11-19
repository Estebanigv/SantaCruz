# ADR 002: PostgreSQL as Primary Database

**Status:** Accepted
**Date:** 2024-01-15
**Deciders:** Engineering Team, CTO
**Consulted:** Database Architect, Product Team

## Context

We need to select a database system for the Viña Santa Cruz e-commerce platform that:
- Handles complex relational data (products, orders, users, inventory)
- Supports ACID transactions (critical for e-commerce)
- Scales to 15K+ users/month
- Provides full-text search capabilities
- Integrates well with Next.js and Prisma ORM
- Offers managed hosting with automatic backups

### Options Considered

1. **PostgreSQL** (Recommended)
2. **MongoDB**
3. **MySQL**
4. **Supabase (PostgreSQL + extras)**

## Decision

We will use **PostgreSQL 15+** as the primary database, hosted on **Supabase**.

## Rationale

### PostgreSQL Advantages ✅

1. **Relational Data Model**
   - Perfect fit for e-commerce (products, orders, users, inventory)
   - Strong referential integrity (foreign keys, constraints)
   - ACID compliance for reliable transactions
   - Complex joins for reporting and analytics

2. **Advanced Features**
   - Full-text search (no need for separate search engine initially)
   - JSONB for flexible data (product attributes, metadata)
   - Array types for tags, categories
   - Geospatial data support (for shipping zones)
   - Row-level security

3. **Ecosystem & Tooling**
   - Excellent Prisma ORM support
   - Mature ecosystem and community
   - Rich extension ecosystem (pg_trgm, pg_stat_statements)
   - Superior query planner and optimizer

4. **Performance**
   - Excellent read/write performance
   - Efficient indexing (B-tree, GIN, GiST, BRIN)
   - Materialized views for complex queries
   - Connection pooling (PgBouncer)

5. **Data Integrity**
   - Strong typing system
   - Check constraints
   - Triggers for business logic
   - Transactional DDL (safe schema migrations)

### Supabase as Hosting Platform

**Why Supabase over alternatives:**

1. **Fully Managed PostgreSQL**
   - Automatic backups (daily, 7-day retention on free tier, 30+ on paid)
   - Point-in-time recovery
   - Automatic updates and security patches
   - Built-in connection pooling

2. **Additional Features**
   - Real-time subscriptions (for inventory updates)
   - RESTful API auto-generated from schema
   - Built-in authentication (can integrate with NextAuth)
   - Storage for files (alternative to Cloudinary for some use cases)
   - Row-level security policies

3. **Developer Experience**
   - Generous free tier (500MB database, 2GB bandwidth)
   - Easy scaling to paid plans
   - Excellent documentation
   - Dashboard for database management

4. **Pricing**
   - Free tier: Perfect for development/staging
   - Pro tier: $25/month (8GB database, 50GB bandwidth)
   - Scalable as we grow

### Alternative Comparisons

#### MongoDB
- ✅ Flexible schema
- ✅ Horizontal scaling
- ❌ No native joins (less suitable for e-commerce)
- ❌ Eventual consistency can cause issues with inventory
- ❌ No ACID transactions across collections (until v4.0)
- ❌ Less efficient for complex queries

**Verdict:** Not ideal for e-commerce with complex relationships

#### MySQL
- ✅ Wide adoption
- ✅ Good performance
- ❌ Less advanced features than PostgreSQL
- ❌ Weaker JSON support
- ❌ No full-text search on InnoDB (until 5.6, still limited)
- ≈ Similar performance to PostgreSQL

**Verdict:** PostgreSQL offers more features for same complexity

#### Self-hosted PostgreSQL
- ✅ Full control
- ✅ Lower cost at scale
- ❌ Requires DevOps expertise
- ❌ Manual backups and maintenance
- ❌ No automatic failover
- ❌ Security hardening required

**Verdict:** Not suitable for small team without dedicated DBA

## Database Schema Design Principles

### 1. Normalization
- Use 3NF for core entities (users, products, orders)
- Denormalize selectively for performance (product search cache)

### 2. Indexing Strategy
```sql
-- Primary keys (automatic)
-- Foreign keys (for joins)
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Search fields
CREATE INDEX idx_products_name_trgm ON products USING GIN (name gin_trgm_ops);

-- Composite indexes for common queries
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);

-- Partial indexes for filtered queries
CREATE INDEX idx_orders_pending ON orders(created_at)
WHERE status = 'pending';
```

### 3. Connection Pooling
```typescript
// Prisma configuration
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // Pooled connection
  directUrl = env("DIRECT_URL")  // Direct connection for migrations
}

// DATABASE_URL: Uses Supabase pooler (6543)
// DIRECT_URL: Direct connection (5432)
```

### 4. Data Types
- `UUID` for primary keys (security, distribution)
- `TIMESTAMP WITH TIME ZONE` for all timestamps
- `NUMERIC(10,2)` for prices (avoid floating point)
- `JSONB` for flexible attributes
- `TEXT` over `VARCHAR` (no performance difference in PostgreSQL)

## Schema Examples

### Core Tables

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  birth_date DATE,  -- For age verification
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  category VARCHAR(50),
  attributes JSONB,  -- Flexible product attributes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Full-text search index
CREATE INDEX idx_products_search ON products
USING GIN (to_tsvector('spanish', name || ' ' || COALESCE(description, '')));

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  status VARCHAR(50) NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  payment_method VARCHAR(50),
  payment_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL,  -- Store price at time of order
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Backup Strategy

### Automated Backups (Supabase)
- **Frequency:** Daily automatic backups
- **Retention:** 7 days (free), 30+ days (paid)
- **Point-in-time recovery:** Available on Pro plan

### Manual Backups (Via CI/CD)
```bash
# Automated via GitHub Actions (nightly)
pg_dump $DATABASE_URL | gzip > backup_$(date +%Y%m%d).sql.gz

# Upload to S3 for long-term storage
aws s3 cp backup_*.sql.gz s3://vina-santa-cruz-backups/
```

### Backup Testing
- Monthly restore test to staging environment
- Documented in runbook: `docs/devops/runbooks/03-database-migrations.md`

## Migration Strategy

### Tool: Prisma Migrate

**Advantages:**
- Type-safe migrations
- Version-controlled schema
- Automatic migration generation
- Development and production workflows

**Process:**
```bash
# 1. Update schema.prisma
# 2. Generate migration
npx prisma migrate dev --name add_product_reviews

# 3. Review generated SQL
# 4. Test in staging
# 5. Deploy to production
npx prisma migrate deploy
```

## Performance Optimization

### Query Optimization
1. **Use indexes** for all foreign keys and search fields
2. **EXPLAIN ANALYZE** for slow queries
3. **Materialized views** for complex reports
4. **Connection pooling** via Supabase pooler

### Expected Performance
- Simple queries: < 10ms
- Complex joins: < 50ms
- Full-text search: < 100ms
- Transaction processing: < 50ms

### Scaling Strategy

**Phase 1: 0-10K users/month**
- Supabase Free tier
- Single database instance
- Cost: $0/month

**Phase 2: 10K-50K users/month**
- Supabase Pro tier ($25/month)
- Connection pooling
- Read replicas if needed
- Cost: $25-50/month

**Phase 3: 50K+ users/month**
- Supabase Team/Enterprise
- Multiple read replicas
- Consider sharding if needed
- Cost: $100-500/month

## Consequences

### Positive Consequences ✅

1. **Data Integrity**
   - ACID transactions prevent inventory overselling
   - Foreign keys ensure referential integrity
   - Constraints prevent invalid data

2. **Rich Query Capabilities**
   - Complex joins for analytics
   - Full-text search without external service
   - Aggregations and reporting

3. **Excellent Tooling**
   - Prisma ORM provides type safety
   - pgAdmin/Supabase dashboard for management
   - Rich ecosystem of extensions

4. **Future-Proof**
   - Scales vertically and horizontally
   - Supports advanced features as we grow
   - Industry standard, easy to hire for

### Negative Consequences ⚠️

1. **Vertical Scaling Limits**
   - Eventually need sharding for massive scale
   - **Mitigation:** Read replicas, caching, CDN
   - **Note:** Not a concern until 100K+ users/month

2. **Schema Rigidity**
   - Schema changes require migrations
   - **Mitigation:** Use JSONB for flexible attributes
   - **Mitigation:** Careful schema design upfront

3. **Connection Limits**
   - PostgreSQL has connection limits (100-500)
   - **Mitigation:** Connection pooling (PgBouncer/Supabase)
   - **Mitigation:** Optimize connection usage

## Monitoring

### Key Metrics to Track
- Connection pool usage
- Query performance (slow query log)
- Database size growth
- Index usage statistics
- Cache hit ratio

### Tools
- Supabase Dashboard (built-in metrics)
- Prisma Studio (data browsing)
- pg_stat_statements (query analysis)
- Custom dashboards (Grafana if needed)

## Success Metrics

1. **Performance:** 95th percentile query time < 100ms
2. **Availability:** 99.9% uptime (Supabase SLA)
3. **Data Loss:** Zero data loss with backup strategy
4. **Query Efficiency:** Cache hit ratio > 90%

## Review

This decision will be reviewed:
- **Quarterly:** Check performance metrics
- **When traffic increases 3x:** Re-evaluate scaling strategy
- **Annually:** Assess alternative databases

## References

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- Internal: Database schema diagram

## Related ADRs

- ADR 001: Vercel as Deployment Platform
- ADR 003: Cloudinary for Image Management

## Approval

- ✅ Engineering Lead: [Name]
- ✅ Database Architect: [Name]
- ✅ CTO: [Name]

**Last Updated:** 2024-01-15
