import type { NextConfig } from "next";

// GitHub Pages deployment configuration
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const repoName = 'generic-functions';

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js Image Optimization
  },
  
  // Set base path for GitHub Pages (only in production)
  basePath: isGitHubPages ? `/${repoName}` : '',
  assetPrefix: isGitHubPages ? `/${repoName}/` : '',
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@/components', '@/lib'],
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable gzip compression
  compress: true,
  
  // Optimize for Core Web Vitals
  poweredByHeader: false,
  
  // Bundle analyzer for optimization
  webpack: (config, { isServer }) => {
    // Optimize bundle splitting
    if (!isServer) {
      // Ensure splitChunks is properly initialized
      if (!config.optimization) {
        config.optimization = {};
      }
      if (!config.optimization.splitChunks || config.optimization.splitChunks === false) {
        config.optimization.splitChunks = { chunks: 'all' };
      }
      if (!config.optimization.splitChunks.cacheGroups) {
        config.optimization.splitChunks.cacheGroups = {};
      }
      
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          priority: 0,
        },
        lib: {
          name: 'lib',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 1,
        },
        react: {
          name: 'react',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          chunks: 'all',
          priority: 2,
        },
      };
    }
    
    return config;
  },
};

export default nextConfig;
