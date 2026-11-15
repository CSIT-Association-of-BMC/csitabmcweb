import { getApiBaseUrl } from "./api/client";

/**
 * Universal image URL resolver for CSITABMC.
 * Safely extracts image URLs from DRF backend strings, Cloudinary URLs,
 * legacy Strapi image arrays/objects, or relative paths.
 */
export function resolveImageUrl(
  image: unknown,
  fallback?: string
): string | null {
  if (!image) return fallback ?? null;

  // 1. Direct string
  if (typeof image === "string") {
    const trimmed = image.trim();
    if (!trimmed) return fallback ?? null;

    // Full absolute URL
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }

    // Relative media path from Django
    if (trimmed.startsWith("/media/")) {
      const apiBase = getApiBaseUrl();
      const origin = apiBase.replace(/\/api\/v1\/?$/, "");
      return `${origin}${trimmed}`;
    }

    // Local static asset
    if (trimmed.startsWith("/")) {
      return trimmed;
    }

    return `/${trimmed}`;
  }

  // 2. Array of objects (Strapi legacy or multi-image fields)
  if (Array.isArray(image) && image.length > 0) {
    return resolveImageUrl(image[0], fallback);
  }

  // 3. Object with url, src, or data attributes
  if (typeof image === "object" && image !== null) {
    const obj = image as Record<string, any>;
    if (obj.url) return resolveImageUrl(obj.url, fallback);
    if (obj.src) return resolveImageUrl(obj.src, fallback);
    if (obj.data?.attributes?.url) return resolveImageUrl(obj.data.attributes.url, fallback);
  }

  return fallback ?? null;
}
