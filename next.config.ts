import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/basePath";

const nextConfig: NextConfig = {
  output: 'export',
  // Site lives in a sub-directory on the shared host: lumako.ru/masterauto
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  // Emit /masterauto/index.html style folders so Apache serves them as directories
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
