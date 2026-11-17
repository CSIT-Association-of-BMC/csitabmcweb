import type { EventTypes } from "@/types/events";
import type { NoticeTypes } from "@/types/Notice";
import { getEventBySlug, getEvents } from "@/lib/api/events";
import { getNoticeBySlug, getNotices } from "@/lib/api/notices";

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
 * Consumes the custom Django API endpoint `/api/v1/events/<slug>/`.
 */
export async function resolveEvent(identifier: string): Promise<EventLookupResult> {
  const decodedId = decodeURIComponent(identifier).trim();

  // 1. Direct Django API lookup by slug or ID
  try {
    const { event } = await getEventBySlug(decodedId);
    if (event) {
      const canonical = getEventSlug(event);
      return {
        event,
        shouldRedirect: canonical !== decodedId,
        canonicalSlug: canonical,
      };
    }
  } catch (err) {
    console.error("Error querying event by slug:", err);
  }

  // 2. Search published events listing for slug/title match
  try {
    const { events } = await getEvents();
    const match = events.find((ev: EventTypes) => {
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
  } catch (err) {
    console.error("Event resolution error:", err);
  }

  return { event: null, shouldRedirect: false, canonicalSlug: "" };
}

/**
 * Resolves a notice by its slug or legacy identifier with redirect detection.
 * Consumes the custom Django API endpoint `/api/v1/notices/<slug>/`.
 */
export async function resolveNotice(identifier: string): Promise<NoticeLookupResult> {
  const decodedId = decodeURIComponent(identifier).trim();

  // 1. Direct Django API lookup by slug or ID
  try {
    const { notice } = await getNoticeBySlug(decodedId);
    if (notice) {
      const canonical = getNoticeSlug(notice);
      return {
        notice,
        shouldRedirect: canonical !== decodedId,
        canonicalSlug: canonical,
      };
    }
  } catch (err) {
    console.error("Error querying notice by slug:", err);
  }

  // 2. Search published notices listing for slug/title match
  try {
    const { notices } = await getNotices();
    const match = notices.find((not: NoticeTypes) => {
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
  } catch (err) {
    console.error("Notice resolution error:", err);
  }

  return { notice: null, shouldRedirect: false, canonicalSlug: "" };
}
