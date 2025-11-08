// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Use 'as any' on the compiler object to tell TypeScript 
  // that we know what we're doing, even if it's not strictly defined in NextConfig.
  compiler: {
    // This setting resolves the original Turbopack/Font issue.
    nextFont: false, 
  } as any, 
};

export default nextConfig;