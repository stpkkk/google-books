/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['books.google.com'],
  },
  env: {
    KEY: process.env.NEXT_PUBLIC_API_KEY,
  },
};

module.exports = nextConfig;
