# ADR 001: Vercel as Primary Deployment Platform

**Status:** Accepted
**Date:** 2024-01-15
**Deciders:** Engineering Team, CTO
**Consulted:** DevOps, Product Team

## Context

We need to select a deployment platform for the Viña Santa Cruz Next.js 14 application that:
- Provides excellent Next.js support and performance
- Scales automatically to handle traffic spikes
- Requires minimal DevOps overhead
- Offers global CDN distribution
- Provides built-in monitoring and analytics
- Fits within budget constraints

### Options Considered

1. **Vercel** (Recommended)
2. **AWS (ECS + Fargate + CloudFront)**
3. **Google Cloud Run**
4. **Self-hosted on DigitalOcean/Hetzner**

## Decision

We will use **Vercel** as the primary deployment platform for the Next.js application.

## Rationale

### Vercel Advantages ✅

1. **Next.js Native Platform**
   - Built by the Next.js creators
   - First-class support for all Next.js features
   - Automatic optimization for App Router, Server Components, Edge Runtime
   - Zero configuration required

2. **Performance & Scalability**
   - Global Edge Network (275+ cities worldwide)
   - Automatic static optimization
   - Edge caching and Incremental Static Regeneration (ISR)
   - Serverless functions auto-scale
   - 99.99% uptime SLA

3. **Developer Experience**
   - Git-based deployments (push to deploy)
   - Automatic preview deployments for PRs
   - Instant rollbacks
   - Built-in CI/CD
   - No infrastructure management

4. **Observability**
   - Built-in analytics (Web Vitals, Core Web Vitals)
   - Real-time logs
   - Speed Insights
   - Function execution monitoring

5. **Cost-Effective**
   - Pro plan: $20/month per member
   - Generous free tier (10K serverless function executions)
   - No hidden costs
   - Predictable pricing

### Alternative Comparisons

#### AWS (ECS + Fargate)
- ❌ Complex setup and maintenance
- ❌ Requires dedicated DevOps engineer
- ❌ Higher monthly costs ($150-300/month)
- ✅ Full control over infrastructure
- ✅ Better for microservices architecture

**Verdict:** Over-engineered for our needs

#### Google Cloud Run
- ✅ Good Next.js support
- ✅ Competitive pricing
- ❌ Requires more configuration than Vercel
- ❌ Less optimized for Next.js specifically
- ❌ Smaller global footprint

**Verdict:** Good alternative but not as Next.js-optimized

#### Self-hosted
- ❌ Requires server management
- ❌ No automatic scaling
- ❌ Manual SSL, CDN, monitoring setup
- ❌ Higher DevOps overhead
- ✅ Lower per-month cost

**Verdict:** Not suitable for small team

## Implementation

### Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│              Cloudflare CDN                     │
│         (DNS, DDoS Protection, WAF)             │
└───────────────┬─────────────────────────────────┘
                │
┌───────────────▼─────────────────────────────────┐
│              Vercel Edge Network                │
│     (Global CDN, Edge Functions, Caching)       │
└───────────────┬─────────────────────────────────┘
                │
    ┌───────────┼───────────┐
    │           │           │
┌───▼───┐   ┌──▼───┐   ┌──▼────┐
│ Static│   │ SSR  │   │ API   │
│ Pages │   │ Pages│   │ Routes│
└───────┘   └──────┘   └───┬───┘
                           │
              ┌────────────┼────────────┐
              │            │            │
         ┌────▼───┐   ┌───▼────┐  ┌───▼─────┐
         │Database│   │Cloudinary│ │External│
         │(Supabase)│ │(Images)  │ │APIs    │
         └────────┘   └──────────┘ └─────────┘
```

### Configuration

**Vercel Project Settings:**
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm ci`
- Node Version: 20.x

**Regions:**
- Primary: South America (gru1 - São Paulo)
- Edge: Global

**Environment Variables:**
- Development: Local `.env.local`
- Preview: Vercel preview environment
- Production: Vercel production environment

### Deployment Strategy

- **Production:** `main` branch → Auto-deploy to production
- **Staging:** `develop` branch → Auto-deploy to preview
- **Feature Branches:** → Auto-deploy to unique preview URLs

## Consequences

### Positive Consequences ✅

1. **Fast Time to Market**
   - No infrastructure setup time
   - Deploy in minutes, not days

2. **Reduced Operational Overhead**
   - No server management
   - No scaling configuration
   - Automatic SSL certificates

3. **Improved Developer Productivity**
   - Instant preview deployments
   - No context switching to DevOps tasks
   - Focus on features, not infrastructure

4. **Better Performance**
   - Edge network optimization
   - Automatic image optimization
   - Smart caching strategies

5. **Built-in Security**
   - DDoS protection
   - Automatic SSL/TLS
   - Edge firewall rules

### Negative Consequences ⚠️

1. **Vendor Lock-in**
   - Tight coupling with Vercel platform
   - **Mitigation:** Keep business logic framework-agnostic
   - **Mitigation:** Use standard Next.js features (portable)

2. **Limited Backend Control**
   - Serverless function timeout limits (60s max)
   - **Mitigation:** Use external services for long-running tasks
   - **Mitigation:** Implement job queues for background processing

3. **Cost at Scale**
   - May become expensive at very high traffic
   - **Mitigation:** Monitor usage monthly
   - **Mitigation:** Implement aggressive caching
   - **Mitigation:** Optimize function execution time

4. **Database Not Included**
   - Need separate database hosting
   - **Mitigation:** Use Supabase/Neon for PostgreSQL
   - **Decision:** See ADR 002 for database choice

## Cost Analysis

### Estimated Monthly Costs

**Pro Plan ($20/user/month):**
- 1 developer seat: $20/month
- Included:
  - 100GB bandwidth
  - 1000 serverless function hours
  - 100GB-hours Edge Middleware
  - Unlimited preview deployments

**Expected Usage (15K users/month):**
- Bandwidth: ~50GB/month (well within limits)
- Function executions: ~500 hours/month
- Total: **$20/month**

**Comparison with alternatives:**
- AWS: $150-300/month (ECS + RDS + CloudFront)
- GCP: $80-150/month (Cloud Run + Cloud SQL + CDN)
- Self-hosted: $40-60/month (server + CDN) + DevOps time

**Winner:** Vercel by significant margin

## Success Metrics

We will measure success by:

1. **Deployment Frequency:** > 10 deployments/week
2. **Deployment Time:** < 5 minutes
3. **Failed Deployments:** < 2%
4. **Time to Rollback:** < 2 minutes
5. **Page Load Time:** < 2 seconds (p95)
6. **Uptime:** > 99.9%

## Review

This decision will be reviewed:
- **Quarterly:** Check costs vs. budget
- **Semi-annually:** Evaluate alternative platforms
- **When traffic increases 10x:** Re-assess cost-effectiveness

## References

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Best Practices](https://nextjs.org/docs/deployment)
- [Vercel Pricing](https://vercel.com/pricing)
- Internal: Cost analysis spreadsheet

## Approval

- ✅ Engineering Lead: [Name]
- ✅ CTO: [Name]
- ✅ Product Manager: [Name]

**Last Updated:** 2024-01-15
