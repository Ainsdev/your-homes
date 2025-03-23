import withBundleAnalyzer from '@next/bundle-analyzer';


import type { NextConfig } from 'next';

const otelRegex = /@opentelemetry\/instrumentation/;

export const config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },

  // biome-ignore lint/suspicious/useAwait: rewrites is async
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ];
  },

  webpack(config, { isServer }) {
    if (isServer) {
      config.plugins = config.plugins || [];
      // More comprehensive externals configuration for libSQL
      config.externals = [...(config.externals || []), 
        '@libsql/client', 
        '@libsql/win32-x64-msvc',
        '@libsql/linux-x64-gnu',
        '@libsql/linux-x64-musl',
        '@libsql/darwin-x64',
        '@libsql/darwin-arm64'
      ];
    } else {
      // For client-side, add fallbacks for node modules
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        path: false,
        os: false,
      };
    }
    
    // Add alias for @libsql/client to use the web version
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@libsql/client': '@libsql/client/web'
    };
    
    config.ignoreWarnings = [{ module: otelRegex }];
    return config;
  },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export const withAnalyzer = (sourceConfig: NextConfig): NextConfig =>
  withBundleAnalyzer()(sourceConfig);
