// next.config.mjs
import { i18n } from './next-i18next.config.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n, // ✅ aquí se integra la configuración de idiomas
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
