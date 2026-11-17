import { apiGet } from "./client";
import type { NoticeTypes } from "@/types/Notice";
import { slugify } from "@/lib/slugs";
import { resolveImageUrl } from "@/lib/images";

export interface NoticeFilterParams {
  search?: string;
  category?: string;
  status?: string;
  ordering?: string;
}

/**
 * Normalizes DRF Notice response into frontend NoticeTypes structure.
 */
export function mapDrfNoticeToNoticeTypes(raw: any): NoticeTypes {
  const imageUrl = resolveImageUrl(raw.image);
  const imageArray = imageUrl
    ? [{ url: imageUrl }]
    : null;

  const pubDate = raw.published_at || raw.publishedAt || raw.created_at || raw.createdAt;

  return {
    id: String(raw.id || raw.documentId || "1"),
    documentId: String(raw.documentId || raw.id || "1"),
    slug: raw.slug || (raw.title ? slugify(raw.title) : String(raw.id || "1")),
    title: raw.title || "",
    description: raw.description || "",
    category: raw.category || "General",
    publishedAt: pubDate ? new Date(pubDate) : new Date(),
    image: imageArray,
  };
}

/**
 * Fetches published notices from Django REST Framework endpoint `/api/v1/notices/`.
 * Pure backend integration without static fallback mocks.
 */
export async function getNotices(
  params?: NoticeFilterParams
): Promise<{ notices: NoticeTypes[]; isFallback: boolean }> {
  try {
    const res = await apiGet<any>("/notices/", {
      params: {
        search: params?.search,
        category:
          params?.category && params.category !== "all"
            ? params.category
            : undefined,
        status: params?.status,
        ordering: params?.ordering || "-created_at",
      },
      next: { revalidate: 30 },
    });

    if (!res.isAvailabilityFailure && res.data) {
      const rawList = Array.isArray(res.data)
        ? res.data
        : (res.data as any).results || [];
      const notices = rawList.map(mapDrfNoticeToNoticeTypes);
      return { notices, isFallback: false };
    }

    return { notices: [], isFallback: false };
  } catch (error) {
    console.error("getNotices API error:", error);
    return { notices: [], isFallback: false };
  }
}

/**
 * Resolves a notice by its slug or ID from `/api/v1/notices/<slug>/`.
 * Pure backend integration without static fallback mocks.
 */
export async function getNoticeBySlug(
  identifier: string
): Promise<{ notice: NoticeTypes | null; isFallback: boolean }> {
  const decoded = decodeURIComponent(identifier).trim();

  try {
    const res = await apiGet<any>(`/notices/${encodeURIComponent(decoded)}/`, {
      next: { revalidate: 30 },
    });

    if (!res.isAvailabilityFailure && res.data) {
      const notice = mapDrfNoticeToNoticeTypes(res.data);
      return { notice, isFallback: false };
    }

    return { notice: null, isFallback: false };
  } catch (error) {
    console.error("getNoticeBySlug API error:", error);
    return { notice: null, isFallback: false };
  }
}
