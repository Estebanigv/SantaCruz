# Runbook: Emergency Rollback

## When to Use This Runbook

Execute an emergency rollback when:
- Critical functionality is broken in production
- Error rate exceeds 5% for more than 5 minutes
- Payment processing is failing
- Database corruption detected
- Security vulnerability discovered
- Site is completely down

## Severity Levels

| Level | Description | Response Time | Notification |
|-------|-------------|---------------|--------------|
| **P0 - Critical** | Complete outage, payment failures | < 5 min | All hands, SMS |
| **P1 - High** | Major feature broken, high error rate | < 15 min | Slack + Email |
| **P2 - Medium** | Minor feature broken, isolated issues | < 1 hour | Slack |
| **P3 - Low** | UI bugs, non-critical issues | Next day | GitHub issue |

## Quick Rollback (P0/P1)

### Step 1: Immediate Assessment (2 minutes max)

```bash
# Check current error rate
curl https://www.vinasantacruz.cl/api/health

# Check Sentry dashboard
open https://sentry.io/organizations/vina-santa-cruz/issues/

# Check recent deployments
vercel ls vina-santa-cruz --prod
```

**Decision Point:** If errors are widespread or critical, proceed with rollback immediately.

### Step 2: Execute Rollback (2 minutes)

**Option A: Vercel Dashboard (Recommended)**

1. Open: `https://vercel.com/<team>/vina-santa-cruz/deployments`
2. Find last known good deployment (before the issue)
3. Click three dots → "Promote to Production"
4. Confirm promotion
5. Wait for promotion to complete (30-60 seconds)

**Option B: Vercel CLI**

```bash
# List recent deployments
vercel ls vina-santa-cruz --prod

# Promote specific deployment (copy URL from list)
vercel promote <deployment-url> --prod --yes

# Example:
# vercel promote vina-santa-cruz-abc123.vercel.app --prod --yes
```

### Step 3: Verify Rollback (1 minute)

```bash
# Check health endpoint
curl https://www.vinasantacruz.cl/api/health

# Verify critical endpoints
curl https://www.vinasantacruz.cl/api/productos
curl https://www.vinasantacruz.cl/checkout

# Check error rate in Sentry
# Should drop to < 0.1% within 2 minutes
```

### Step 4: Notify Team (1 minute)

Post in Slack #incidents:
```
🔴 PRODUCTION ROLLBACK EXECUTED

Time: [Current time]
Severity: [P0/P1]
Issue: [Brief description]
Action: Rolled back to deployment [ID]
Status: Monitoring
Owner: [Your name]

Previous deployment: [Failed URL]
Current deployment: [Rolled back URL]

Next steps: Root cause analysis in progress
```

### Step 5: Monitor (15 minutes)

Watch these metrics:
- [ ] Error rate returns to baseline (< 0.1%)
- [ ] Response times normalize (< 2s)
- [ ] No user complaints in support channels
- [ ] Health checks passing
- [ ] Payment processing working

## Database Rollback

⚠️ **EXTREME CAUTION REQUIRED**

Only perform database rollback if:
- Data corruption detected
- Migration caused critical issues
- Approved by lead developer AND database admin

### Assessment Checklist

- [ ] Confirm issue is database-related
- [ ] Verify recent backup exists (< 1 hour old)
- [ ] Understand data loss implications
- [ ] Get approval from two senior team members
- [ ] Notify all stakeholders

### Execution

**1. Stop Write Operations**

Put application in read-only mode:
```bash
# Set environment variable in Vercel
vercel env add MAINTENANCE_MODE production
# Value: "true"

# Redeploy to apply
vercel --prod
```

**2. Verify Backup**

```bash
# List recent backups
ls -lh backups/db/

# Or check S3
aws s3 ls s3://vina-santa-cruz-backups/production/

# Download backup if needed
aws s3 cp s3://vina-santa-cruz-backups/production/latest.sql.gz ./
```

**3. Create Safety Backup**

```bash
# Backup current state before restore
npm run db:backup production

# Verify backup created
ls -lh backups/db/ | tail -1
```

**4. Restore Database**

```bash
# Restore from pre-deployment backup
npm run db:restore production backups/db/production_YYYYMMDD_HHMMSS.sql.gz

# This will:
# 1. Create another safety backup
# 2. Restore from specified backup
# 3. Verify restoration
```

**5. Verify Database**

```bash
# Check database connection
npm run db:verify production

# Check table counts
npm run db:stats production

# Verify critical data
# (Run custom verification queries)
```

**6. Resume Operations**

```bash
# Remove maintenance mode
vercel env rm MAINTENANCE_MODE production

# Redeploy
vercel --prod
```

**7. Data Loss Assessment**

```bash
# Calculate data loss window
# From: Last backup time
# To: Current time
# Document what data may be lost
```

## Partial Rollback (Feature Flags)

If only specific features are broken, use feature flags instead of full rollback:

**1. Identify Broken Feature**

**2. Disable via Environment Variable**

```bash
# Disable specific feature
vercel env add NEXT_PUBLIC_ENABLE_NEW_CHECKOUT production
# Value: "false"

# Trigger redeploy
vercel --prod
```

**3. Verify Feature Disabled**

Check that feature is no longer accessible and errors stopped.

## Rollback + Migration Revert

If database migration needs to be reverted:

**Option 1: Restore from Backup (Recommended)**
- See "Database Rollback" section above

**Option 2: Manual Migration Revert** (If data loss is unacceptable)

⚠️ **Only if migration is reversible and you have down migration**

```bash
# NOT RECOMMENDED - Prisma doesn't support down migrations
# You must manually write revert SQL

# Connect to database
psql $DATABASE_URL

# Run revert SQL manually
\i migrations/revert/YYYYMMDD_HHMMSS_revert.sql

# Verify
\dt

\q
```

## Post-Rollback Actions

### Immediate (Within 1 hour)

- [ ] Verify all systems operational
- [ ] Document timeline of events
- [ ] Preserve logs from failed deployment
- [ ] Create incident ticket
- [ ] Notify stakeholders of resolution

### Short-term (Within 24 hours)

- [ ] Root cause analysis
- [ ] Fix underlying issue
- [ ] Test fix in staging
- [ ] Plan re-deployment
- [ ] Update runbooks if needed

### Long-term (Within 1 week)

- [ ] Post-mortem meeting
- [ ] Document lessons learned
- [ ] Implement preventive measures
- [ ] Update monitoring/alerts
- [ ] Share learnings with team

## Post-Mortem Template

Create document in `docs/incidents/YYYY-MM-DD-incident-name.md`:

```markdown
# Incident Report: [Title]

**Date:** [Date]
**Duration:** [Start] - [End]
**Severity:** [P0/P1/P2]
**Impact:** [User impact description]

## Timeline

- **HH:MM** - Deployment to production
- **HH:MM** - First error detected
- **HH:MM** - Incident declared
- **HH:MM** - Rollback initiated
- **HH:MM** - Rollback completed
- **HH:MM** - Service restored

## Root Cause

[Detailed explanation]

## Impact

- Affected users: [Number/Percentage]
- Error rate: [Percentage]
- Duration: [Minutes]
- Revenue impact: [If applicable]
- Data loss: [If applicable]

## Resolution

[What was done to fix]

## Preventive Measures

1. [Action item 1]
2. [Action item 2]
3. [Action item 3]

## Action Items

- [ ] [Owner] - [Task] - [Deadline]
- [ ] [Owner] - [Task] - [Deadline]

## Lessons Learned

[Key takeaways]
```

## Testing Rollback Procedure

**Practice rollback in staging monthly:**

```bash
# 1. Deploy to staging
vercel --target staging

# 2. Note deployment URL
# 3. Deploy again with a change
# 4. Practice rolling back to previous deployment

vercel promote <previous-deployment-url> --target staging

# 5. Verify rollback worked
curl https://staging.vinasantacruz.cl/api/health
```

## Rollback Decision Tree

```
Issue Detected
    |
    ├─ Is site completely down? ─→ YES ─→ ROLLBACK IMMEDIATELY (P0)
    |                             NO ↓
    |
    ├─ Error rate > 5%? ─→ YES ─→ ROLLBACK IMMEDIATELY (P0)
    |                      NO ↓
    |
    ├─ Payment processing broken? ─→ YES ─→ ROLLBACK IMMEDIATELY (P0)
    |                                NO ↓
    |
    ├─ Major feature broken? ─→ YES ─→ ROLLBACK (P1) or Fix Forward if quick
    |                          NO ↓
    |
    ├─ Minor bug or UI issue? ─→ YES ─→ CREATE HOTFIX (P2/P3)
    |                           NO ↓
    |
    └─ Monitor and document ─→ Schedule fix in next sprint
```

## Emergency Contacts

| Scenario | Contact | Method |
|----------|---------|--------|
| Database issues | DBA Team | Slack @dba-oncall |
| Vercel/Infrastructure | DevOps Lead | Phone + Slack |
| Payment gateway issues | Finance + Dev Lead | Email + Slack |
| Security incident | Security Team | Security hotline |
| All hands needed | Engineering Manager | @channel in Slack |

## Verification Checklist

After rollback, verify:

- [ ] Homepage loads (< 2s)
- [ ] Product catalog accessible
- [ ] Search works
- [ ] Add to cart works
- [ ] Checkout flow works
- [ ] Payment processing works
- [ ] User login works
- [ ] Admin panel accessible
- [ ] API health check passes
- [ ] Error rate < 0.1%
- [ ] Response times < 2s
- [ ] Database queries normal
- [ ] No alerts firing

## Related Documentation

- [Deployment Runbook](./01-deployment.md)
- [Incident Response](./04-incident-response.md)
- [Database Recovery](./03-database-migrations.md)
