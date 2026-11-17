import type { NoticeTypes } from "@/types/Notice";
import { getNotices } from "@/lib/api/notices";

/**
 * Fetches up to `limit` related notices for a given notice.
 * Prioritizes notices in the same category, strictly excluding the current notice.
 * Pure backend integration without static fallback mocks.
 */
export async function getRelatedNotices(
  currentNotice: NoticeTypes,
  limit: number = 3
): Promise<NoticeTypes[]> {
  const currentId = String(currentNotice.id);
  const currentSlug = currentNotice.slug;

  try {
    const { notices } = await getNotices({
      category: currentNotice.category,
      ordering: "-created_at",
    });

    let related = notices.filter(
      (n) => String(n.id) !== currentId && (!currentSlug || n.slug !== currentSlug)
    );

    if (related.length < limit) {
      const { notices: allNotices } = await getNotices({ ordering: "-created_at" });
      const additional = allNotices.filter(
        (n) =>
          String(n.id) !== currentId &&
          (!currentSlug || n.slug !== currentSlug) &&
          !related.some((r) => String(r.id) === String(n.id))
      );
      related = [...related, ...additional];
    }

    return related.slice(0, limit);
  } catch (err) {
    console.error("Error fetching related notices:", err);
    return [];
  }
}
