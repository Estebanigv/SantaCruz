# Runbook: Incident Response

## Incident Response Framework

This runbook defines how to respond to production incidents for Viña Santa Cruz platform.

## Incident Severity Levels

| Level | Description | Response Time | Impact | Examples |
|-------|-------------|---------------|--------|----------|
| **P0 - Critical** | Complete service outage | < 5 minutes | All users affected | Site down, database offline, payment system failure |
| **P1 - High** | Major feature broken | < 15 minutes | Many users affected | Checkout broken, login failing, major data loss |
| **P2 - Medium** | Minor feature degraded | < 1 hour | Some users affected | Search slow, images not loading, email delays |
| **P3 - Low** | Cosmetic or minor issues | Next business day | Few users affected | UI glitches, typos, minor bugs |

## Incident Response Workflow

```
Detection → Assessment → Notification → Mitigation → Resolution → Post-Mortem
```

## Phase 1: Detection

### Automated Detection

Incidents can be detected by:

1. **Monitoring Alerts**
   - Sentry error rate spike
   - UptimeRobot downtime alert
   - Vercel deployment failure
   - Database connection errors

2. **User Reports**
   - Support tickets
   - Social media mentions
   - Direct emails

3. **Team Discovery**
   - Manual testing
   - Code review findings

### Alert Channels

- **Slack:** #alerts channel (automated)
- **Email:** devops@vinasantacruz.cl
- **SMS:** Critical alerts only (P0)
- **PagerDuty:** After-hours on-call

## Phase 2: Initial Assessment (2 minutes)

### Quick Checks

```bash
# 1. Check site availability
curl -I https://www.vinasantacruz.cl

# 2. Check API health
curl https://www.vinasantacruz.cl/api/health

# 3. Check error rate in Sentry
open https://sentry.io/organizations/vina-santa-cruz/issues/

# 4. Check recent deployments
vercel ls vina-santa-cruz --prod

# 5. Check Vercel logs
vercel logs vina-santa-cruz --prod
```

### Severity Assessment

Ask these questions:

1. **How many users are affected?**
   - All users → P0
   - > 50% of users → P1
   - < 50% of users → P2
   - Isolated cases → P3

2. **Is critical functionality broken?**
   - Payments, checkout → P0
   - Core features → P1
   - Secondary features → P2
   - UI/cosmetic → P3

3. **Is data at risk?**
   - Active data loss → P0
   - Potential data loss → P1
   - No data risk → P2/P3

4. **What's the user impact?**
   - Complete inability to use site → P0
   - Major workflow blocked → P1
   - Workaround available → P2
   - Minor inconvenience → P3

## Phase 3: Notification

### P0 - Critical Incident

**Immediately notify:**

1. **Slack #incidents channel**
```
🚨 P0 INCIDENT DECLARED 🚨

Title: [Brief description]
Detected: [Time]
Impact: [User impact]
Status: Investigating
Incident Commander: [Your name]
War Room: [Zoom/Meet link]

Do NOT deploy until incident resolved.
```

2. **SMS to on-call team** (auto via PagerDuty)

3. **Email to leadership**
```
Subject: P0 INCIDENT - Viña Santa Cruz Platform

Impact: [Description]
Status: Response in progress
ETA: Investigating
Updates: Slack #incidents
```

4. **Status Page Update** (if available)
```
🔴 Investigating: We are aware of issues accessing the platform.
Updates will be posted here.
```

### P1 - High Severity

**Notify:**
1. Slack #incidents channel
2. Email to dev team
3. Status page (optional)

### P2/P3 - Medium/Low

**Notify:**
1. Slack #engineering channel
2. Create GitHub issue
3. Add to sprint backlog

## Phase 4: Mitigation (Immediate Actions)

### P0 Response Actions

**Option 1: Rollback** (if recent deployment)
```bash
# See rollback runbook
vercel promote <previous-deployment> --prod
```

**Option 2: Hot Fix** (if issue is clear and fixable in < 10 min)
```bash
git checkout -b hotfix/critical-issue
# Make minimal fix
git commit -m "hotfix: fix critical issue"
git push origin hotfix/critical-issue
# Create PR, merge, deploy
```

**Option 3: Feature Flag** (disable broken feature)
```bash
vercel env add NEXT_PUBLIC_ENABLE_FEATURE production
# Set to "false"
vercel --prod  # Redeploy
```

**Option 4: Maintenance Mode** (last resort)
```bash
vercel env add MAINTENANCE_MODE production
# Set to "true"
vercel --prod
```

### Incident Command Structure (P0/P1)

**Roles:**

1. **Incident Commander (IC)**
   - Coordinates response
   - Makes decisions
   - Communicates with stakeholders
   - First engineer who declares incident

2. **Technical Lead**
   - Diagnoses root cause
   - Implements fix
   - Senior engineer available

3. **Communications Lead**
   - Updates stakeholders
   - Posts status updates
   - Customer support liaison

4. **Scribe**
   - Documents timeline
   - Records actions taken
   - Prepares post-mortem

## Phase 5: Diagnosis & Resolution

### Investigation Checklist

- [ ] Check recent deployments (last 24 hours)
- [ ] Review error logs (Sentry, Vercel)
- [ ] Check database status
- [ ] Verify external services (Cloudinary, payment gateways)
- [ ] Check infrastructure (Vercel status page)
- [ ] Review monitoring dashboards
- [ ] Check for DDoS or unusual traffic

### Common Issue Patterns

#### Issue: Site Completely Down

**Check:**
1. Vercel deployment status
2. DNS resolution
3. Cloudflare status
4. Recent code changes

**Quick fixes:**
- Rollback deployment
- Clear CDN cache
- Check Vercel/Cloudflare status pages

#### Issue: High Error Rate

**Check:**
1. Sentry dashboard for error patterns
2. Recent deployments
3. Database connection pool
4. External API failures

**Quick fixes:**
- Rollback if deployment-related
- Increase database connections
- Disable failing integrations

#### Issue: Slow Performance

**Check:**
1. Vercel function execution times
2. Database query performance
3. External API latency
4. CDN cache hit rate

**Quick fixes:**
- Enable aggressive caching
- Optimize slow queries
- Scale database resources

#### Issue: Payment Failures

**Check:**
1. Payment gateway status pages (Transbank, Flow, Stripe)
2. API key validity
3. Network connectivity
4. Error messages from gateway

**Quick fixes:**
- Check gateway status page
- Verify API credentials
- Switch to backup gateway (if available)
- Contact gateway support

### Diagnostic Commands

```bash
# Check Vercel deployment logs
vercel logs vina-santa-cruz --prod --follow

# Check specific function logs
vercel logs vina-santa-cruz/api/checkout --prod

# Check database connections
npm run db:connections production

# Test external services
curl https://api.cloudinary.com/v1_1/<cloud>/image/list
curl https://api.transbank.cl/health  # If available

# Check DNS
nslookup www.vinasantacruz.cl
dig www.vinasantacruz.cl

# Check SSL
openssl s_client -connect www.vinasantacruz.cl:443 -servername www.vinasantacruz.cl
```

## Phase 6: Communication During Incident

### Update Frequency

| Severity | Update Frequency | Channels |
|----------|------------------|----------|
| P0 | Every 15 minutes | Slack, Email, Status Page |
| P1 | Every 30 minutes | Slack, Email |
| P2 | Every 2 hours | Slack |
| P3 | Daily | GitHub issue |

### Update Template

**Slack #incidents:**
```
⏱️ INCIDENT UPDATE [Time]

Status: [Investigating/Identified/Monitoring/Resolved]
Impact: [Current impact]
Actions taken:
- [Action 1]
- [Action 2]

Next steps:
- [Next step 1]
- [Next step 2]

Next update in: [X minutes]
```

### Resolution Communication

**When incident is resolved:**

**Slack #incidents:**
```
✅ INCIDENT RESOLVED

Title: [Incident title]
Duration: [Start] - [End] ([X minutes])
Root cause: [Brief explanation]
Resolution: [What fixed it]

Impact:
- Users affected: [Number/Percentage]
- Revenue impact: [If applicable]
- Data loss: [None/Description]

Next steps:
- Post-mortem scheduled for [Date/Time]
- Action items tracked in [Link]

Thank you to everyone who helped respond!
```

**Email to stakeholders:**
```
Subject: RESOLVED - Viña Santa Cruz Platform Incident

Dear team,

The incident affecting our platform has been resolved.

Duration: [X minutes]
Impact: [Description]
Root cause: [Brief explanation]
Resolution: [What we did]

We will conduct a post-mortem to prevent similar issues.

Thank you for your patience.
```

## Phase 7: Post-Incident Activities

### Immediate (Within 1 hour of resolution)

- [ ] Verify all systems fully operational
- [ ] Document complete timeline
- [ ] Preserve relevant logs and data
- [ ] Create incident ticket
- [ ] Schedule post-mortem meeting

### Post-Mortem Meeting (Within 48 hours)

**Attendees:**
- Incident Commander
- Technical contributors
- Engineering manager
- Product manager (if significant user impact)

**Agenda:**
1. Timeline review (10 min)
2. Root cause analysis (15 min)
3. What went well (10 min)
4. What could be improved (15 min)
5. Action items (10 min)

**Questions to answer:**
- What happened?
- Why did it happen?
- How did we respond?
- What was the impact?
- How can we prevent this?
- How can we detect faster?
- How can we resolve faster?

### Post-Mortem Document

Create: `docs/incidents/YYYY-MM-DD-[incident-name].md`

```markdown
# Incident Report: [Title]

**Date:** YYYY-MM-DD
**Severity:** P0/P1/P2
**Duration:** [X hours/minutes]
**Incident Commander:** [Name]

## Executive Summary

[2-3 sentence summary of what happened and impact]

## Impact

- **Users affected:** [Number/Percentage]
- **Duration:** [Start] - [End]
- **Revenue impact:** [Amount or N/A]
- **Data loss:** [None/Description]
- **Services affected:** [List]

## Timeline

All times in UTC-4 (Chile time)

- **14:23** - Deployment to production
- **14:27** - First error alerts in Sentry
- **14:29** - User reports in support
- **14:30** - P0 incident declared
- **14:32** - Rollback initiated
- **14:35** - Rollback completed
- **14:37** - Service verified healthy
- **14:45** - Incident resolved

## Root Cause Analysis

### What Happened

[Detailed technical explanation]

### Why It Happened

[Underlying cause - not just "bug in code" but why wasn't it caught]

### Contributing Factors

1. [Factor 1]
2. [Factor 2]

## Response Evaluation

### What Went Well ✅

- Fast detection (< 5 minutes)
- Clear incident command
- Quick rollback decision
- Good communication

### What Could Be Improved ⚠️

- Tests didn't catch the issue
- Monitoring didn't detect earlier
- Rollback took longer than expected

## Action Items

| Action | Owner | Priority | Deadline | Status |
|--------|-------|----------|----------|--------|
| Add integration test for feature X | Dev1 | High | 2024-01-20 | Todo |
| Improve monitoring for Y | DevOps | High | 2024-01-22 | Todo |
| Update rollback docs | Dev2 | Medium | 2024-01-25 | Todo |

## Lessons Learned

1. [Lesson 1]
2. [Lesson 2]
3. [Lesson 3]

## Preventive Measures

### Immediate (This sprint)
- [Prevention 1]
- [Prevention 2]

### Short-term (Next month)
- [Prevention 3]
- [Prevention 4]

### Long-term (Next quarter)
- [Prevention 5]
- [Prevention 6]
```

## Incident Metrics

Track these metrics to improve response:

| Metric | Target | Current |
|--------|--------|---------|
| Time to detect (TTD) | < 2 min | - |
| Time to acknowledge (TTA) | < 5 min | - |
| Time to mitigate (TTM) | < 15 min | - |
| Time to resolve (TTR) | < 30 min | - |
| Mean time between failures (MTBF) | > 30 days | - |

## Tools & Resources

### Monitoring Dashboards
- Vercel: `https://vercel.com/<team>/vina-santa-cruz`
- Sentry: `https://sentry.io/organizations/vina-santa-cruz`
- UptimeRobot: `https://uptimerobot.com/dashboard`

### Communication Channels
- Slack #incidents: For incident coordination
- Slack #engineering: For technical discussion
- Status page: For customer communication

### Escalation Contacts

| Role | Name | Slack | Phone | Hours |
|------|------|-------|-------|-------|
| On-call Engineer | [Rotation] | @oncall | +56 9 XXX | 24/7 |
| Engineering Manager | [Name] | @em | +56 9 XXX | Business hours |
| CTO | [Name] | @cto | +56 9 XXX | Emergencies only |
| Database Admin | [Name] | @dba | +56 9 XXX | On-call rotation |

## Best Practices

1. **Stay Calm** - Panic doesn't help
2. **Communicate** - Over-communicate is better than under-communicate
3. **Document** - Write down everything as it happens
4. **Don't Blame** - Focus on fixing, not blaming
5. **Learn** - Every incident is a learning opportunity
6. **Automate** - If you do it twice, automate it
7. **Practice** - Run drills and game days

## Related Documentation

- [Deployment Runbook](./01-deployment.md)
- [Rollback Runbook](./02-rollback.md)
- [Database Migrations](./03-database-migrations.md)
- [Monitoring Setup](../monitoring-setup.md)
