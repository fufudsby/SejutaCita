/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', 'cdn.sejutacita.id'],
  },
  experimental: {
    scrollRestoration: true,
  },
}
