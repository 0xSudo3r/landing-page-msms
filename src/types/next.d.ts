import "next";
declare module "next" {
  interface NextConfig {
    images?: Record<string, unknown>;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GITHUB_TOKEN?: string;
  }
}
