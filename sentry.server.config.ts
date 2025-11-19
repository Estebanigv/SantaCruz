import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  environment: process.env.NODE_ENV,

  // Adjust this value in production
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  integrations: [
    // Add database instrumentation
    new Sentry.Integrations.Prisma({ client: undefined }), // Will be set at runtime
  ],

  beforeSend(event, hint) {
    // Filter out sensitive server-side information
    if (event.request) {
      delete event.request.cookies;

      if (event.request.headers) {
        delete event.request.headers['Authorization'];
        delete event.request.headers['Cookie'];
        delete event.request.headers['X-API-Key'];
      }

      // Scrub query parameters
      if (event.request.query_string) {
        const params = new URLSearchParams(event.request.query_string);
        if (params.has('token')) params.set('token', '[REDACTED]');
        if (params.has('key')) params.set('key', '[REDACTED]');
        event.request.query_string = params.toString();
      }
    }

    // Scrub environment variables from extra data
    if (event.extra) {
      Object.keys(event.extra).forEach((key) => {
        if (key.toLowerCase().includes('password') ||
            key.toLowerCase().includes('secret') ||
            key.toLowerCase().includes('token') ||
            key.toLowerCase().includes('key')) {
          event.extra![key] = '[REDACTED]';
        }
      });
    }

    return event;
  },

  // Ignore errors
  ignoreErrors: [
    'ECONNRESET',
    'ETIMEDOUT',
    'ENOTFOUND',
    'socket hang up',
  ],

  // Add context to errors
  beforeSendTransaction(event) {
    // Add custom tags for server transactions
    if (event.contexts) {
      event.contexts.runtime = {
        name: 'node',
        version: process.version,
      };
    }
    return event;
  },
});
