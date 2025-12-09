import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*', //TODO 추후 도메인 추가되면 변경하기
      },
    ],
  },
};

export default nextConfig;
