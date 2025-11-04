/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    optimizeCss: true,
  },
  // Basic security headers to improve safety and help with SEO/opt-in
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' " +
              '*.vercel.com vercel.com ' +
              'cdn.vercel-insights.com ' +
              'va.vercel-scripts.com ' +
              'tick-n-tock.vercel.app ' +
              'https://cdn.jsdelivr.net ' +
              "'unsafe-eval' " +
              '; ' +
              "style-src 'self' 'unsafe-inline' " +
              'fonts.googleapis.com ' +
              '; ' +
              "font-src 'self' " +
              'fonts.gstatic.com ' +
              'data: ' +
              '; ' +
              "img-src 'self' data: https: " +
              '*.vercel.com ' +
              '; ' +
              "connect-src 'self' " +
              '*.vercel.com vercel.com ' +
              'cdn.vercel-insights.com ' +
              'va.vercel-scripts.com ' +
              'tick-n-tock.vercel.app ' +
              '*.google-analytics.com *.analytics.google.com ' +
              '*.googletagmanager.com ' +
              'https: wss: ' +
              '; ' +
              "script-src-attr 'unsafe-inline'; " +
              "frame-src 'self' " +
              '*.vercel.com vercel.com ' +
              '*.google.com ' +
              '*.googletagmanager.com ' +
              '; ' +
              "object-src 'none'; " +
              "media-src 'self'; " +
              "manifest-src 'self'; " +
              "worker-src 'self' blob:; " +
              "child-src 'self'; " +
              "form-action 'self'; " +
              "frame-ancestors 'self'; " +
              "base-uri 'self'; " +
              'upgrade-insecure-requests',
          },
        ],
      },
    ]
  },
}

export default nextConfig
