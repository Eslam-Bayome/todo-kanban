import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@redux": path.resolve(__dirname, "redux"),
      "@services": path.resolve(__dirname, "integrations/services"),
      "@appTypes": path.resolve(__dirname, "types"),
      "@components": path.resolve(__dirname, "components"),
      "@query-keys": path.resolve(__dirname, "integrations/query-keys"),
    };
    return config;
  },
};

export default nextConfig;
