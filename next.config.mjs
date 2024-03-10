/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
}

export default nextConfig
