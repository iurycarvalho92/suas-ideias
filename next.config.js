/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/suasideias',
        destination: '/',
        permanent: true,
      },
      {
        source: '/suasideias/enviar',
        destination: '/enviar',
        permanent: true,
      },
      {
        source: '/suasideias/admin',
        destination: '/admin',
        permanent: true,
      },
      {
        source: '/suasideias/proposta/:slug*',
        destination: '/proposta/:slug*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
