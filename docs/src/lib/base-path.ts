/**
 * Base path utilities for GitHub Pages deployment
 */

// Get the base path from Next.js config
export const basePath = process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS === 'true' 
  ? '/generic-functions' 
  : '';

/**
 * Add base path to asset URLs for GitHub Pages
 */
export function withBasePath(path: string): string {
  // Don't add base path if it's already there or if it's an external URL
  if (path.startsWith('http') || path.startsWith(basePath)) {
    return path;
  }
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${normalizedPath}`;
}

/**
 * Get the correct asset path for images and other static assets
 */
export function getAssetPath(path: string): string {
  return withBasePath(path);
}
