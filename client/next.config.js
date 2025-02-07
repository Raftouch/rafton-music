/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  crossOrigin: 'use-credentials',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'portainer-cda3b.dev-formation.com',
        port: '5000',
        pathname: '/**',
      },
    ],
  },
  // webpackDevMiddleware: (config) => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300
  //   };
  //   return config
  // }
}

module.exports = nextConfig
