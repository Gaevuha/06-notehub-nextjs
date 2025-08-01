import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  experimental: {
    optimizeCss: false, // не preload-ить критичний CSS
  },
};
