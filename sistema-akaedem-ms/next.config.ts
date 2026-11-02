import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // se quiseres manter o React Compiler
  compiler: {
    styledComponents: true, // ⚡ necessário para o styled-components funcionar no deploy
  },
  // Evita o Next a usar a raiz do monorepo (package-lock na raiz) em dev/Turbopack
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
