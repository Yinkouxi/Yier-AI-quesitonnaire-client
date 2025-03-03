/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
      minify: true,
      pure: true
    }
  },
  reactStrictMode: true,
}

module.exports = nextConfig
