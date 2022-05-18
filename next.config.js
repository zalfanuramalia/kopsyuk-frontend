/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: 'http://localhost:8080',
  },
  images: {
    // loader: "cloudinary",
    // path: "https://res.cloudinary.com",
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig

