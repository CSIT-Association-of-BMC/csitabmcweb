import { fetchBackendResource } from "@/lib/fetch";
import { fallbackBlogs } from "@/data/blogs/fallback";

export interface BlogAuthor {
  id?: number | string;
  name: string;
  slug?: string;
  image?: string | null;
}

export interface BlogSeo {
  title: string;
  description: string;
  og_title?: string;
  og_description?: string;
  og_image_url?: string | null;
}

export interface ContentImage {
  url: string;
  public_id?: string;
  alt?: string;
}

export interface BlogPost {
  id: number | string;
  reference?: string;
  title: string;
  slug: string;
  author?: BlogAuthor | null;
  author_name?: string | null;
  excerpt: string;
  content: string;
  content_images?: ContentImage[];
  featured_image_url?: string | null;
  featured_image_alt?: string;
  status: "draft" | "published";
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
  seo?: BlogSeo;
  read_time?: string;
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content ? content.trim().split(/\s+/).length : 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${Math.max(1, minutes)} min read`;
}

export const DUMMY_BLOGS: BlogPost[] = fallbackBlogs;

export async function fetchPublishedBlogs(): Promise<BlogPost[]> {
  try {
    const djangoBaseUrl =
      process.env.NEXT_PUBLIC_DJANGO_API_URL ||
      "https://cms-dashbaord.onrender.com/api/v1";

    const result = await fetchBackendResource<BlogPost[] | { results: BlogPost[] }>(
      `${djangoBaseUrl}/blogs/`,
      { next: { revalidate: 60 } }
    );

    if (!result.isAvailabilityFailure) {
      if (result.status === 200 && result.data) {
        const raw = result.data;
        const results: BlogPost[] = Array.isArray(raw)
          ? raw
          : (raw as any)?.results || [];
        // If the backend is healthy and returns actual blogs, use them
        if (results.length > 0) {
          return results.map((b) => ({
            ...b,
            read_time: calculateReadTime(b.content || ""),
          }));
        }
      }
      if (result.status === 200 && result.isEmpty) {
        return [];
      }
      // If the backend returns 404 (endpoint not yet deployed), activate dummy test blogs
      if (result.status === 404) {
        return fallbackBlogs.map((b) => ({
          ...b,
          read_time: calculateReadTime(b.content || ""),
        }));
      }
    } else {
      // Backend availability failure (connection refused / timeout / 5xx)
      return fallbackBlogs.map((b) => ({
        ...b,
        read_time: calculateReadTime(b.content || ""),
      }));
    }
  } catch (err) {
    console.error("fetchPublishedBlogs error:", err);
    return fallbackBlogs.map((b) => ({
      ...b,
      read_time: calculateReadTime(b.content || ""),
    }));
  }

  return fallbackBlogs.map((b) => ({
    ...b,
    read_time: calculateReadTime(b.content || ""),
  }));
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  const decoded = decodeURIComponent(slug).trim().toLowerCase();

  try {
    const djangoBaseUrl =
      process.env.NEXT_PUBLIC_DJANGO_API_URL ||
      "https://cms-dashbaord.onrender.com/api/v1";

    const result = await fetchBackendResource<BlogPost>(
      `${djangoBaseUrl}/blogs/${encodeURIComponent(decoded)}/`,
      { next: { revalidate: 60 } }
    );

    if (!result.isAvailabilityFailure) {
      if (result.status === 200 && result.data && result.data.slug) {
        return {
          ...result.data,
          read_time: calculateReadTime(result.data.content || ""),
        };
      }
      // If endpoint returns 404 or backend is not deployed, search dummy test blogs
      const found = fallbackBlogs.find(
        (b) => b.slug.toLowerCase() === decoded || String(b.id) === decoded
      );
      if (found) {
        return {
          ...found,
          read_time: calculateReadTime(found.content || ""),
        };
      }
      return null;
    } else {
      // Availability failure - check fallback static blogs
      const found = fallbackBlogs.find(
        (b) => b.slug.toLowerCase() === decoded || String(b.id) === decoded
      );
      if (found) {
        return {
          ...found,
          read_time: calculateReadTime(found.content || ""),
        };
      }
      return null;
    }
  } catch (err) {
    console.error("fetchBlogBySlug error:", err);
    const found = fallbackBlogs.find(
      (b) => b.slug.toLowerCase() === decoded || String(b.id) === decoded
    );
    return found ? { ...found, read_time: calculateReadTime(found.content || "") } : null;
  }

  return null;
}
