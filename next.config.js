/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/suasideias',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
