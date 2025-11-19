# Monitoring & Observability Setup - Viña Santa Cruz

## Overview

This document outlines the complete monitoring and observability stack for the Viña Santa Cruz platform.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Application Layer                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Next.js  │  │   API    │  │ Database │  │ Payments │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
└───────┼─────────────┼─────────────┼─────────────┼─────────┘
        │             │             │             │
        ▼             ▼             ▼             ▼
┌─────────────────────────────────────────────────────────────┐
│                  Observability Stack                        │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │ Vercel Analytics │  │  Vercel Logs     │               │
│  └──────────────────┘  └──────────────────┘               │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │     Sentry       │  │ UptimeRobot      │               │
│  │ (Error Tracking) │  │ (Uptime Monitor) │               │
│  └──────────────────┘  └──────────────────┘               │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │ Google Analytics │  │  Cloudflare      │               │
│  │  (User Metrics)  │  │   Analytics      │               │
│  └──────────────────┘  └──────────────────┘               │
└─────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│                      Alerting Layer                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                │
│  │  Slack   │  │  Email   │  │   SMS    │                │
│  └──────────┘  └──────────┘  └──────────┘                │
└─────────────────────────────────────────────────────────────┘
```

## 1. Application Performance Monitoring (APM)

### Vercel Analytics

**Setup:**
```bash
npm install @vercel/analytics @vercel/speed-insights
```

**Configuration in `app/layout.tsx`:**
```typescript
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

**Metrics Tracked:**
- Page views
- Unique visitors
- Geographic distribution
- Device types
- Core Web Vitals (LCP, FID, CLS)
- Custom events

**Dashboards:**
- Real-time traffic: `https://vercel.com/<team>/<project>/analytics`
- Speed insights: `https://vercel.com/<team>/<project>/speed-insights`

### Sentry (Error Tracking)

**Installation:**
```bash
npm install --save @sentry/nextjs
npx @sentry/wizard -i nextjs
```

**Configuration (`sentry.client.config.ts`):**
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  beforeSend(event, hint) {
    // Filter out sensitive data
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers?.['Authorization'];
    }
    return event;
  },

  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    'ResizeObserver loop limit exceeded',
  ],
});
```

**Error Boundaries:**
```typescript
// app/error.tsx
'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

**Custom Error Tracking:**
```typescript
// lib/logger.ts
import * as Sentry from '@sentry/nextjs';

export const logger = {
  error: (message: string, context?: Record<string, any>) => {
    console.error(message, context);
    Sentry.captureMessage(message, {
      level: 'error',
      extra: context,
    });
  },

  warning: (message: string, context?: Record<string, any>) => {
    console.warn(message, context);
    Sentry.captureMessage(message, {
      level: 'warning',
      extra: context,
    });
  },

  info: (message: string, context?: Record<string, any>) => {
    console.info(message, context);
  },
};
```

## 2. Uptime Monitoring

### UptimeRobot Configuration

**Monitors to Configure:**

1. **Main Site (HTTP)**
   - URL: `https://www.vinasantacruz.cl`
   - Interval: 5 minutes
   - Alert when down for: 2 checks (10 minutes)

2. **API Health Endpoint**
   - URL: `https://www.vinasantacruz.cl/api/health`
   - Interval: 5 minutes
   - Expected response: 200 OK
   - Alert when down for: 2 checks

3. **Products Page**
   - URL: `https://www.vinasantacruz.cl/productos`
   - Interval: 10 minutes
   - Keyword check: "Nuestros Vinos"

4. **Checkout Flow**
   - URL: `https://www.vinasantacruz.cl/checkout`
   - Interval: 10 minutes
   - Alert when down for: 2 checks

**Alert Contacts:**
- Email: devops@vinasantacruz.cl
- Slack: #alerts channel
- SMS: +56 9 XXXX XXXX (on-call engineer)

## 3. Logging Strategy

### Structured Logging

**Implementation (`lib/logger.ts`):**
```typescript
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  userId?: string;
  requestId?: string;
  action?: string;
  duration?: number;
  [key: string]: any;
}

export class Logger {
  private log(level: LogLevel, message: string, context?: LogContext) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      environment: process.env.NODE_ENV,
      ...context,
    };

    // Structured JSON logging
    console.log(JSON.stringify(logEntry));

    // Send errors to Sentry
    if (level === 'error') {
      Sentry.captureMessage(message, {
        level: 'error',
        extra: context,
      });
    }
  }

  debug(message: string, context?: LogContext) {
    if (process.env.LOG_LEVEL === 'debug') {
      this.log('debug', message, context);
    }
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  error(message: string, context?: LogContext) {
    this.log('error', message, context);
  }
}

export const logger = new Logger();
```

### Request Logging Middleware

**API Middleware (`middleware.ts`):**
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logger } from '@/lib/logger';

export function middleware(request: NextRequest) {
  const startTime = Date.now();
  const requestId = crypto.randomUUID();

  // Add request ID to headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-request-id', requestId);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Log request
  const duration = Date.now() - startTime;
  logger.info('HTTP Request', {
    requestId,
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    duration,
  });

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
```

## 4. Custom Metrics & Dashboards

### Health Check API

**File: `app/api/health/route.ts`**
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {} as Record<string, any>,
  };

  try {
    // Database check
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    checks.checks.database = {
      status: 'healthy',
      responseTime: Date.now() - dbStart,
    };
  } catch (error) {
    checks.status = 'unhealthy';
    checks.checks.database = {
      status: 'unhealthy',
      error: error.message,
    };
  }

  // Cloudinary check
  try {
    const cloudinaryStart = Date.now();
    const response = await fetch(
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/sample.jpg`,
      { method: 'HEAD' }
    );
    checks.checks.cloudinary = {
      status: response.ok ? 'healthy' : 'unhealthy',
      responseTime: Date.now() - cloudinaryStart,
    };
  } catch (error) {
    checks.checks.cloudinary = {
      status: 'unhealthy',
      error: error.message,
    };
  }

  const statusCode = checks.status === 'healthy' ? 200 : 503;
  return NextResponse.json(checks, { status: statusCode });
}
```

### Performance Metrics API

**File: `app/api/metrics/route.ts`**
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const metrics = {
    timestamp: new Date().toISOString(),
    metrics: {} as Record<string, any>,
  };

  // Total orders today
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  metrics.metrics.orders_today = await prisma.order.count({
    where: {
      createdAt: { gte: todayStart },
    },
  });

  // Revenue today
  const ordersToday = await prisma.order.aggregate({
    where: {
      createdAt: { gte: todayStart },
      status: 'completed',
    },
    _sum: {
      total: true,
    },
  });

  metrics.metrics.revenue_today = ordersToday._sum.total || 0;

  // Active users (last 24h)
  const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
  metrics.metrics.active_users_24h = await prisma.user.count({
    where: {
      lastActive: { gte: last24h },
    },
  });

  return NextResponse.json(metrics);
}
```

## 5. Alert Rules

### Critical Alerts (Immediate notification)

1. **Site Down**
   - Trigger: HTTP 500/503 errors > 5% in 5 minutes
   - Action: Slack + Email + SMS

2. **Database Connection Issues**
   - Trigger: Database connection errors > 3 in 5 minutes
   - Action: Slack + Email + SMS

3. **Payment Gateway Failures**
   - Trigger: Payment processing errors > 2% in 15 minutes
   - Action: Slack + Email

4. **High Error Rate**
   - Trigger: Application errors > 1% in 10 minutes
   - Action: Slack + Email

### Warning Alerts (Email notification)

1. **Slow Response Times**
   - Trigger: Average response time > 2s for 10 minutes
   - Action: Email to dev team

2. **High Memory Usage**
   - Trigger: Function memory > 80% for 15 minutes
   - Action: Email to dev team

3. **SSL Certificate Expiry**
   - Trigger: Certificate expires in < 30 days
   - Action: Email to ops team

## 6. Dashboards

### Production Dashboard (Vercel)

**Metrics:**
- Real-time traffic
- Response times (p50, p95, p99)
- Error rates
- Function execution duration
- Bandwidth usage

### Error Dashboard (Sentry)

**Metrics:**
- Error frequency
- Affected users
- Error trends
- Most common errors
- Error resolution time

### Business Metrics Dashboard

**Custom Dashboard URL:** `https://www.vinasantacruz.cl/admin/metrics`

**Metrics:**
- Daily/Monthly revenue
- Order conversion rate
- Average order value
- Customer retention
- Cart abandonment rate
- Product performance

## 7. Log Retention Policy

| Log Type | Retention | Storage |
|----------|-----------|---------|
| Application Logs | 30 days | Vercel |
| Error Logs | 90 days | Sentry |
| Access Logs | 14 days | Cloudflare |
| Audit Logs | 1 year | Database |
| Payment Logs | 7 years | Encrypted DB |

## 8. Incident Response Workflow

1. **Detection**
   - Automated alerts via monitoring
   - Manual reports from users

2. **Notification**
   - Slack alert to #incidents channel
   - Email to on-call engineer
   - SMS for critical incidents

3. **Assessment**
   - Check dashboards (Vercel, Sentry)
   - Review recent deployments
   - Analyze error logs

4. **Response**
   - If deployment issue: Rollback
   - If infrastructure: Scale resources
   - If code bug: Hotfix PR

5. **Resolution**
   - Verify fix in production
   - Update status page
   - Notify stakeholders

6. **Post-Mortem**
   - Document incident
   - Identify root cause
   - Create prevention tasks

## 9. Testing Monitoring Setup

```bash
# Test health endpoint
curl https://www.vinasantacruz.cl/api/health

# Test metrics endpoint
curl https://www.vinasantacruz.cl/api/metrics

# Trigger test error (dev only)
curl https://www.vinasantacruz.cl/api/test-error

# Test Sentry integration
npm run test:sentry
```

## 10. Costs Estimate

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| Vercel Analytics | Pro | Included |
| Sentry | Team | $26/month |
| UptimeRobot | Pro | $7/month |
| Cloudflare Analytics | Pro | Included |
| **Total** | | **~$33/month** |

## Next Steps

1. Configure Sentry DSN in environment variables
2. Set up UptimeRobot monitors
3. Configure Slack webhooks for alerts
4. Create custom dashboards
5. Test all alert channels
6. Document incident response procedures
