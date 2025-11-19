import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  environment: process.env.NODE_ENV,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Session Replay
  replaysSessionSampleRate: 0.1, // 10% of sessions
  replaysOnErrorSampleRate: 1.0, // 100% when errors occur

  integrations: [
    new Sentry.Replay({
      // Mask all text content
      maskAllText: true,
      // Block all media elements (img, svg, video, etc.)
      blockAllMedia: true,
      // Mask all inputs
      maskAllInputs: true,
    }),
    new Sentry.BrowserTracing({
      // Set custom routing instrumentation
      routingInstrumentation: Sentry.nextRouterInstrumentation,

      // Transaction names for Next.js pages
      tracePropagationTargets: [
        'localhost',
        /^https:\/\/www\.vinasantacruz\.cl/,
        /^https:\/\/.*\.vercel\.app/,
      ],
    }),
  ],

  beforeSend(event, hint) {
    // Filter out sensitive information
    if (event.request) {
      // Remove cookies
      delete event.request.cookies;

      // Remove authorization headers
      if (event.request.headers) {
        delete event.request.headers['Authorization'];
        delete event.request.headers['Cookie'];
      }
    }

    // Scrub user data from breadcrumbs
    if (event.breadcrumbs) {
      event.breadcrumbs = event.breadcrumbs.map((breadcrumb) => {
        if (breadcrumb.category === 'console') {
          // Mask console logs that might contain sensitive data
          if (breadcrumb.message) {
            breadcrumb.message = breadcrumb.message.replace(
              /email=[\w\.-]+@[\w\.-]+/gi,
              'email=[REDACTED]'
            );
            breadcrumb.message = breadcrumb.message.replace(
              /password=[\w]+/gi,
              'password=[REDACTED]'
            );
          }
        }
        return breadcrumb;
      });
    }

    return event;
  },

  // Ignore specific errors
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    // Resize observer errors (non-critical)
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    // Network errors
    'Network request failed',
    'NetworkError',
    // Cancelled requests
    'AbortError: The operation was aborted',
    'cancelled',
    // Third-party scripts
    'Non-Error promise rejection captured',
  ],

  // Don't report errors from these URLs
  denyUrls: [
    // Browser extensions
    /extensions\//i,
    /^chrome:\/\//i,
    /^moz-extension:\/\//i,
    // Third-party CDNs
    /google-analytics\.com/i,
    /googletagmanager\.com/i,
  ],

  // Performance monitoring
  beforeSendTransaction(event) {
    // Filter out very fast transactions to reduce noise
    if (event.start_timestamp && event.timestamp) {
      const duration = event.timestamp - event.start_timestamp;
      if (duration < 0.05) { // Less than 50ms
        return null;
      }
    }
    return event;
  },
});
