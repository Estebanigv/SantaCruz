# Runbook: Production Deployment

## Overview
This runbook guides you through deploying changes to production for the Viña Santa Cruz platform.

## Prerequisites

- [ ] GitHub repository access
- [ ] Vercel dashboard access
- [ ] Database credentials (for migrations)
- [ ] Slack access (#deployments channel)
- [ ] All tests passing in CI/CD

## Pre-Deployment Checklist

- [ ] Code review completed and approved
- [ ] All CI/CD checks passed (lint, tests, build)
- [ ] Database migrations reviewed and tested in staging
- [ ] Environment variables verified in Vercel dashboard
- [ ] Stakeholders notified of deployment window
- [ ] Rollback plan prepared

## Deployment Process

### Standard Deployment (Merge to Main)

**1. Verify Staging**
```bash
# Check staging deployment
curl https://staging.vinasantacruz.cl/api/health
```

**2. Create Pull Request to Main**
```bash
git checkout main
git pull origin main
git merge develop
```

**3. Final Code Review**
- Review all changes in PR
- Verify migration files
- Check for breaking changes
- Approve PR

**4. Merge to Main**
- Merge PR via GitHub interface
- Delete feature branch after merge
- GitHub Actions automatically triggers production deployment

**5. Monitor Deployment**

Watch deployment progress:
- **Vercel Dashboard:** `https://vercel.com/<team>/vina-santa-cruz/deployments`
- **GitHub Actions:** `https://github.com/<org>/vina-santa-cruz/actions`

Expected duration: 3-5 minutes

**6. Verify Deployment**

```bash
# Check production health
curl https://www.vinasantacruz.cl/api/health

# Check critical endpoints
curl https://www.vinasantacruz.cl/api/productos
curl https://www.vinasantacruz.cl/api/checkout/session

# Verify deployment version
curl https://www.vinasantacruz.cl/api/version
```

**7. Run Smoke Tests**
```bash
npm run test:smoke
```

**8. Post-Deployment Verification**

Manual checks:
- [ ] Homepage loads correctly
- [ ] Product catalog displays
- [ ] Search functionality works
- [ ] Shopping cart functions
- [ ] Checkout flow works
- [ ] Payment processing works
- [ ] Email notifications sent
- [ ] Admin dashboard accessible

**9. Monitor for Issues**

Watch these metrics for 30 minutes post-deployment:
- Error rate (should be < 0.1%)
- Response times (should be < 2s)
- User reports in support channels
- Sentry error dashboard

### Database Migration Deployment

**For deployments with database changes:**

**1. Backup Production Database**
```bash
npm run db:backup production
```

Expected backup location: `./backups/db/production_<timestamp>.sql.gz`

**2. Review Migration Files**
```bash
# List pending migrations
npm run db:migrate:status

# Review migration SQL
cat prisma/migrations/<migration_name>/migration.sql
```

**3. Test Migration on Staging**
```bash
# Apply to staging first
npm run db:migrate:deploy staging

# Verify staging still works
curl https://staging.vinasantacruz.cl/api/health
```

**4. Deploy Migration to Production**
```bash
# This runs automatically after production deployment
# Or run manually:
npm run db:migrate:deploy production
```

**5. Verify Migration Success**
```bash
npm run db:verify production

# Check migration status
npm run db:migrate:status
```

## Hotfix Deployment

For urgent production fixes:

**1. Create Hotfix Branch**
```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug-fix
```

**2. Make Fix**
- Keep changes minimal
- Focus only on the critical issue
- Write tests for the fix

**3. Test Locally**
```bash
npm run test
npm run build
```

**4. Create PR to Main**
```bash
git push origin hotfix/critical-bug-fix
```

**5. Fast-Track Review**
- Request immediate review
- Mark PR as urgent
- Explain the issue and fix

**6. Deploy**
- Merge PR
- Monitor deployment closely
- Verify fix immediately

**7. Backport to Develop**
```bash
git checkout develop
git merge main
git push origin develop
```

## Rollback Procedure

If issues are detected after deployment:

**1. Quick Assessment (< 2 minutes)**
- Check Sentry for errors
- Review Vercel deployment logs
- Check user reports

**2. Decide: Fix Forward or Rollback**

**Fix Forward** (if issue is minor and fixable quickly):
- Create hotfix branch
- Deploy fix within 15 minutes

**Rollback** (if issue is critical or unclear):
- Execute rollback immediately

**3. Execute Rollback**

**Via Vercel Dashboard:**
1. Go to `https://vercel.com/<team>/vina-santa-cruz/deployments`
2. Find previous stable deployment
3. Click "Promote to Production"
4. Confirm promotion

**Via CLI:**
```bash
# List recent deployments
vercel ls

# Promote previous deployment
vercel promote <deployment-url> --prod
```

Expected duration: < 2 minutes

**4. Verify Rollback**
```bash
curl https://www.vinasantacruz.cl/api/health
npm run test:smoke
```

**5. Database Rollback (if needed)**

⚠️ **CAUTION:** Only if migration caused issues

```bash
# Restore from backup
npm run db:restore production backups/db/production_<timestamp>.sql.gz
```

**6. Notify Stakeholders**

Post in #incidents Slack channel:
```
🔴 ROLLBACK EXECUTED
Environment: Production
Reason: [Brief description]
Previous deployment: [Deployment URL]
Current status: Investigating
ETA for fix: [Estimate]
```

**7. Post-Rollback**
- Investigate root cause
- Create issue in GitHub
- Plan proper fix
- Update team in standup

## Communication Templates

### Pre-Deployment Notification

**Slack (#deployments):**
```
🚀 Production Deployment Starting

Time: [HH:MM timezone]
Changes: [Brief summary]
Estimated duration: 5 minutes
Downtime: None expected
Monitoring: [Your name]
```

### Successful Deployment

**Slack (#deployments):**
```
✅ Production Deployment Successful

Deployment URL: [Vercel URL]
Duration: [X minutes]
Status: All checks passed
Changes deployed: [Link to PR]
```

### Failed Deployment

**Slack (#incidents):**
```
🔴 Production Deployment Failed

Issue: [Description]
Action taken: [Rollback/Fix forward]
Current status: [Stable/Investigating]
Next steps: [Action items]
Owner: [Your name]
```

## Monitoring Dashboards

During and after deployment, monitor:

1. **Vercel Analytics:** Real-time traffic and errors
2. **Sentry:** Error tracking and performance
3. **UptimeRobot:** Uptime status
4. **Cloudflare:** CDN and security metrics
5. **Database:** Connection pool and query performance

## Common Issues & Solutions

### Issue: Build Fails

**Symptoms:** GitHub Actions shows build failure

**Solution:**
1. Check build logs in GitHub Actions
2. Common causes:
   - TypeScript errors
   - Missing environment variables
   - Dependency issues
3. Fix and push new commit

### Issue: Environment Variables Missing

**Symptoms:** Deployment succeeds but features don't work

**Solution:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add missing variables
3. Redeploy

### Issue: Database Connection Errors

**Symptoms:** API returns 500 errors about database

**Solution:**
1. Verify DATABASE_URL in Vercel
2. Check database is accessible
3. Verify connection pool settings
4. Check database provider status page

### Issue: High Error Rate Post-Deployment

**Symptoms:** Sentry shows spike in errors

**Solution:**
1. Check Sentry for error details
2. If widespread: Rollback immediately
3. If isolated: Monitor and investigate
4. Create hotfix if needed

## Post-Deployment Tasks

- [ ] Update deployment log in Notion/Confluence
- [ ] Post success message in #deployments
- [ ] Monitor metrics for 30 minutes
- [ ] Update status page if needed
- [ ] Document any issues encountered
- [ ] Schedule post-mortem if problems occurred

## Emergency Contacts

| Role | Name | Contact |
|------|------|---------|
| Lead Developer | [Name] | Slack: @username |
| DevOps Lead | [Name] | Phone: +56 9 XXXX |
| Database Admin | [Name] | Email: dba@ |
| On-Call Engineer | [Rotation] | PagerDuty |

## Related Documentation

- [Rollback Procedure](./02-rollback.md)
- [Database Migration Guide](./03-database-migrations.md)
- [Incident Response](./04-incident-response.md)
- [Monitoring Setup](../monitoring-setup.md)
