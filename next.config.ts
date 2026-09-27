import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/:locale(en|hi)/schemes',
        destination: '/:locale/updates#government-schemes',
        permanent: true,
      },
      {
        source: '/:locale(en|hi)/members',
        destination: '/:locale/legal-professionals',
        permanent: true,
      },
      {
        source: '/:locale(en|hi)/industry-network',
        destination: '/:locale/legal-professionals',
        permanent: true,
      },
      {
        source: '/:locale(en|hi)/membership',
        destination: '/:locale/legal-assistance',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {key: 'X-Content-Type-Options', value: 'nosniff'},
          {key: 'X-Frame-Options', value: 'DENY'},
          {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
