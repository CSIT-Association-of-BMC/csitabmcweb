import QueryString from "qs";
import { fetchWithToken } from "@/lib/fetch";
import type { EventTypes } from "@/types/events";
import type { NoticeTypes } from "@/types/Notice";

/**
 * Converts a string title into a URL-friendly slug.
 */
export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars except -
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Computes canonical slug for an event.
 */
export function getEventSlug(event: { slug?: string; title: string; documentId?: string; id?: number }): string {
  if (event.slug) return event.slug;
  const fromTitle = slugify(event.title);
  if (fromTitle) return fromTitle;
  return event.documentId || String(event.id || "");
}

/**
 * Computes canonical slug for a notice.
 */
export function getNoticeSlug(notice: { slug?: string; title: string; documentId?: string; id?: string | number }): string {
  if (notice.slug) return notice.slug;
  const fromTitle = slugify(notice.title);
  if (fromTitle) return fromTitle;
  return notice.documentId || String(notice.id || "");
}

const eventPopulateQuery = QueryString.stringify({
  populate: {
    image: {
      fields: ["url", "alternativeText", "width", "height"],
    },
    mentors: {
      fields: ["documentId", "fullName", "role", "socialLink"],
      populate: {
        image: {
          fields: ["url"],
        },
      },
    },
  },
});

const noticePopulateQuery = QueryString.stringify({
  populate: {
    image: {
      fields: ["url", "name", "width", "height"],
    },
  },
});

export interface EventLookupResult {
  event: EventTypes | null;
  shouldRedirect: boolean;
  canonicalSlug: string;
}

export interface NoticeLookupResult {
  notice: NoticeTypes | null;
  shouldRedirect: boolean;
  canonicalSlug: string;
}

/**
 * Resolves an event by its slug or legacy identifier with redirect detection.
 */
export async function resolveEvent(identifier: string): Promise<EventLookupResult> {
  const decodedId = decodeURIComponent(identifier).trim();

  // 1. Try querying directly by slug filter
  try {
    const slugQuery = QueryString.stringify({
      filters: {
        slug: {
          $eq: decodedId,
        },
      },
      ...QueryString.parse(eventPopulateQuery),
    });

    const res = await fetchWithToken(`${process.env.STRAPI_API_URL}/events?${slugQuery}`);
    if (res && res.status === 200) {
      const data = await res.json();
      if (data?.data && data.data.length > 0) {
        const event: EventTypes = data.data[0];
        const canonical = getEventSlug(event);
        return {
          event,
          shouldRedirect: canonical !== decodedId,
          canonicalSlug: canonical,
        };
      }
    }
  } catch (err) {
    console.error("Error querying event by slug:", err);
  }

  // 2. Try direct documentId / id lookup (legacy format)
  try {
    const res = await fetchWithToken(
      `${process.env.STRAPI_API_URL}/events/${decodedId}?${eventPopulateQuery}`
    );
    if (res && res.status === 200) {
      const data = await res.json();
      if (data?.data) {
        const event: EventTypes = data.data;
        const canonical = getEventSlug(event);
        return {
          event,
          shouldRedirect: canonical !== decodedId,
          canonicalSlug: canonical,
        };
      }
    }
  } catch {
    // Continue to fallback
  }

  // 3. Fallback: Search across published events for title-slug match
  try {
    const listRes = await fetchWithToken(
      `${process.env.STRAPI_API_URL}/events?${eventPopulateQuery}&pagination[pageSize]=100`
    );
    if (listRes && listRes.status === 200) {
      const data = await listRes.json();
      const events: EventTypes[] = data?.data || [];
      const match = events.find((ev) => {
        const slug = getEventSlug(ev);
        return slug === decodedId || ev.documentId === decodedId || String(ev.id) === decodedId;
      });

      if (match) {
        const canonical = getEventSlug(match);
        return {
          event: match,
          shouldRedirect: canonical !== decodedId,
          canonicalSlug: canonical,
        };
      }
    }
  } catch (err) {
    console.error("Fallback event resolution error:", err);
  }

  return { event: null, shouldRedirect: false, canonicalSlug: "" };
}

/**
 * Resolves a notice by its slug or legacy identifier with redirect detection.
 */
export async function resolveNotice(identifier: string): Promise<NoticeLookupResult> {
  const decodedId = decodeURIComponent(identifier).trim();

  // 1. Try querying directly by slug filter
  try {
    const slugQuery = QueryString.stringify({
      filters: {
        slug: {
          $eq: decodedId,
        },
      },
      ...QueryString.parse(noticePopulateQuery),
    });

    const res = await fetchWithToken(`${process.env.STRAPI_API_URL}/notices?${slugQuery}`);
    if (res && res.status === 200) {
      const data = await res.json();
      if (data?.data && data.data.length > 0) {
        const notice: NoticeTypes = data.data[0];
        const canonical = getNoticeSlug(notice);
        return {
          notice,
          shouldRedirect: canonical !== decodedId,
          canonicalSlug: canonical,
        };
      }
    }
  } catch (err) {
    console.error("Error querying notice by slug:", err);
  }

  // 2. Try direct documentId / id lookup (legacy format)
  try {
    const res = await fetchWithToken(
      `${process.env.STRAPI_API_URL}/notices/${decodedId}?${noticePopulateQuery}`
    );
    if (res && res.status === 200) {
      const data = await res.json();
      if (data?.data) {
        const notice: NoticeTypes = data.data;
        const canonical = getNoticeSlug(notice);
        return {
          notice,
          shouldRedirect: canonical !== decodedId,
          canonicalSlug: canonical,
        };
      }
    }
  } catch {
    // Continue to fallback
  }

  // 3. Fallback: Search across published notices for title-slug match
  try {
    const listRes = await fetchWithToken(
      `${process.env.STRAPI_API_URL}/notices?${noticePopulateQuery}&pagination[pageSize]=100`
    );
    if (listRes && listRes.status === 200) {
      const data = await listRes.json();
      const notices: NoticeTypes[] = data?.data || [];
      const match = notices.find((not) => {
        const slug = getNoticeSlug(not);
        return slug === decodedId || not.documentId === decodedId || String(not.id) === decodedId;
      });

      if (match) {
        const canonical = getNoticeSlug(match);
        return {
          notice: match,
          shouldRedirect: canonical !== decodedId,
          canonicalSlug: canonical,
        };
      }
    }
  } catch (err) {
    console.error("Fallback notice resolution error:", err);
  }

  return { notice: null, shouldRedirect: false, canonicalSlug: "" };
}
