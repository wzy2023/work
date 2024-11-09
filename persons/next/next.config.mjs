/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output: 'standalone',
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  },
  experimental: {
    typedRoutes: true,
    ignoreBuildErrors: true, // 忽略构建时的ts报错
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects () {
    return [
      {
        source: '/',
        destination: '/images',
        basePath: false,
        permanent: false,
      },
    ]
  },
  // async rewrites () {
  //   return {
  //     fallback: [
  //       {
  //         source: '/baidu/:path*',
  //         destination: `https://www.baidu.com/s?wd=:path*`,
  //       },
  //     ],
  //   }
  // },
}

export default nextConfig;
