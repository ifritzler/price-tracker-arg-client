/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'picsum.photos',
          },
          {
            protocol: 'https',
            hostname: 'carrefourar.vtexassets.com'
          },
          {
            protocol: 'https',
            hostname: 'jumboargentina.vteximg.com.br'
          },
        ],
      },
};

export default nextConfig;
