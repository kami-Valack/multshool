import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // se quiseres manter o React Compiler
  compiler: {
    styledComponents: true, // ⚡ necessário para o styled-components funcionar no deploy
  },
};

export default nextConfig;
