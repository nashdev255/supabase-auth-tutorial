/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['zctaettvxsyrzmyuafbh.supabase.co']
  },
}

module.exports = nextConfig
