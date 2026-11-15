import { apiGet } from "./client";
import type { BlogPost } from "@/types/blogs";
import { calculateReadTime } from "@/types/blogs";

export interface BlogFilterParams {
  search?: string;
  status?: string;
  ordering?: string;
}

/**
 * Fetches published articles from Django REST Framework endpoint `/api/v1/blogs/`.
 * Pure backend integration without static fallback mocks.
 */
export async function getPublishedBlogs(
  params?: BlogFilterParams
): Promise<{ blogs: BlogPost[]; isFallback: boolean }> {
  try {
    const res = await apiGet<BlogPost[] | { results: BlogPost[] }>("/blogs/", {
      params: {
        search: params?.search,
        status: params?.status,
        ordering: params?.ordering || "-published_at",
      },
      next: { revalidate: 60 },
    });

    if (!res.isAvailabilityFailure && res.data) {
      const raw = res.data;
      const results: BlogPost[] = Array.isArray(raw)
        ? raw
        : (raw as any)?.results || [];

      return {
        blogs: results.map((b) => ({
          ...b,
          read_time: calculateReadTime(b.content || ""),
        })),
        isFallback: false,
      };
    }

    return { blogs: [], isFallback: false };
  } catch (error) {
    console.error("getPublishedBlogs API error:", error);
    return { blogs: [], isFallback: false };
  }
}

/**
 * Fetches a single blog article by slug or identifier from `/api/v1/blogs/<slug>/`.
 * Pure backend integration without static fallback mocks.
 */
export async function getBlogBySlug(
  identifier: string
): Promise<{ blog: BlogPost | null; isFallback: boolean }> {
  const decoded = decodeURIComponent(identifier).trim().toLowerCase();

  try {
    const res = await apiGet<BlogPost>(`/blogs/${encodeURIComponent(decoded)}/`, {
      next: { revalidate: 60 },
    });

    if (!res.isAvailabilityFailure && res.data && res.data.slug) {
      return {
        blog: {
          ...res.data,
          read_time: calculateReadTime(res.data.content || ""),
        },
        isFallback: false,
      };
    }

    return { blog: null, isFallback: false };
  } catch (error) {
    console.error("getBlogBySlug API error:", error);
    return { blog: null, isFallback: false };
  }
}
