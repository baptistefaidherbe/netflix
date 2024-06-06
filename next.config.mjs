/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.francetvpro.fr',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
