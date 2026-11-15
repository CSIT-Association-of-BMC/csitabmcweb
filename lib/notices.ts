import QueryString from "qs";
import { fetchWithToken } from "@/lib/fetch";
import type { NoticeTypes } from "@/types/Notice";

/**
 * Fetches up to `limit` related notices for a given notice.
 * Prioritizes notices in the same category, strictly excluding the current notice.
 * Falls back to recent notices if fewer than `limit` matching category notices exist.
 */
export async function getRelatedNotices(
  currentNotice: NoticeTypes,
  limit: number = 3
): Promise<NoticeTypes[]> {
  const currentId = currentNotice.id;
  const currentCategory = currentNotice.category;

  const basePopulate = {
    populate: {
      image: {
        fields: ["url", "name"],
      },
    },
  };

  try {
    // 1. Query notices in the same category, excluding current notice
    const categoryQuery = QueryString.stringify({
      filters: {
        ...(currentCategory ? { category: { $eq: currentCategory } } : {}),
        id: { $ne: currentId },
      },
      sort: ["createdAt:desc"],
      pagination: {
        pageSize: limit,
      },
      ...basePopulate,
    });

    const res = await fetchWithToken(
      `${process.env.STRAPI_API_URL}/notices?${categoryQuery}`
    );

    let related: NoticeTypes[] = [];
    if (res && res.status === 200) {
      const data = await res.json();
      related = (data?.data || []).filter(
        (n: NoticeTypes) => String(n.id) !== String(currentId) && n.documentId !== currentNotice.documentId
      );
    }

    // 2. If category search produced fewer than desired limit, backfill with recent notices
    if (related.length < limit) {
      const remaining = limit - related.length;
      const excludeIds = [currentId, ...related.map((n) => n.id)];

      const fallbackQuery = QueryString.stringify({
        filters: {
          id: { $notIn: excludeIds },
        },
        sort: ["createdAt:desc"],
        pagination: {
          pageSize: remaining,
        },
        ...basePopulate,
      });

      const fallbackRes = await fetchWithToken(
        `${process.env.STRAPI_API_URL}/notices?${fallbackQuery}`
      );

      if (fallbackRes && fallbackRes.status === 200) {
        const fallbackData = await fallbackRes.json();
        const backfillNotices: NoticeTypes[] = (fallbackData?.data || []).filter(
          (n: NoticeTypes) => String(n.id) !== String(currentId) && n.documentId !== currentNotice.documentId
        );
        related = [...related, ...backfillNotices].slice(0, limit);
      }
    }

    return related;
  } catch (err) {
    console.error("Error fetching related notices:", err);
    return [];
  }
}
