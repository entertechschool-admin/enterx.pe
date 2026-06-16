import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server Components por defecto; sin remotePatterns (todas las imágenes son locales en /public).
  // next/image ya sirve AVIF/WebP automáticamente, evitando CLS y reduciendo el peso de los PNG de marca.
  reactStrictMode: true,
};

export default nextConfig;
