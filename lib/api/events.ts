import { apiGet } from "./client";
import type { EventTypes } from "@/types/events";
import { slugify } from "@/lib/slugs";
import { resolveImageUrl } from "@/lib/images";

export interface EventFilterParams {
  search?: string;
  category?: string;
  status?: string;
  ordering?: string;
}

/**
 * Normalizes DRF event model into frontend EventTypes structure.
 */
export function mapDrfEventToEventTypes(raw: any): EventTypes {
  const imageUrl = resolveImageUrl(raw.image);
  const imageArray = imageUrl
    ? [{ id: raw.id || 1, documentId: String(raw.id || 1), url: imageUrl }]
    : [];

  const startDate = raw.date
    ? new Date(raw.date)
    : raw.startDate
    ? new Date(raw.startDate)
    : new Date();

  const endDate = raw.end_time
    ? new Date(raw.end_time)
    : raw.endDate
    ? new Date(raw.endDate)
    : startDate;

  return {
    id: raw.id || 1,
    documentId: String(raw.id || 1),
    slug: raw.slug || (raw.title ? slugify(raw.title) : String(raw.id || 1)),
    title: raw.title || "",
    description: raw.description || "",
    startDate,
    endDate,
    location: raw.location || "Butwal Multiple Campus",
    category: raw.category || "General",
    tags: raw.tags || "",
    registrationFormUrl: raw.registration_link || raw.registrationFormUrl || "",
    createdAt: raw.created_at || new Date().toISOString(),
    updatedAt: raw.updated_at || new Date().toISOString(),
    publishedAt: raw.date || raw.created_at || new Date().toISOString(),
    startTime: raw.start_time || raw.startTime || "",
    endTime: raw.end_time || raw.endTime || "",
    organizer: raw.organiser || raw.organizer || "CSIT Association of BMC",
    availableSeats:
      typeof raw.available_seats === "number"
        ? raw.available_seats
        : parseInt(raw.available_seats, 10) || 0,
    registrationFeeBMC: parseFloat(raw.registration_fee_bmc) || 0,
    registrationFee: parseFloat(raw.registration_fee_non_bmc) || 0,
    registrationOpen:
      raw.status === "published" ||
      raw.status === "upcoming" ||
      raw.registrationOpen === true,
    image: imageArray,
    mentors: Array.isArray(raw.mentors)
      ? raw.mentors.map((m: any) => ({
          id: m.id || 1,
          documentId: String(m.id || 1),
          fullName: m.name || m.fullName || "",
          socialLink: m.social_link || m.socialLink || "",
          role: m.role || m.expertise || "Mentor",
          image: {
            id: m.id || 1,
            documentId: String(m.id || 1),
            url: resolveImageUrl(m.photo || m.image, "/team.jpeg") || "/team.jpeg",
          },
        }))
      : [],
  };
}

/**
 * Fetches published events from Django REST Framework endpoint `/api/v1/events/`.
 * Pure backend integration without static fallback mocks.
 */
export async function getEvents(
  params?: EventFilterParams
): Promise<{ events: EventTypes[]; isFallback: boolean }> {
  try {
    const res = await apiGet<any>("/events/", {
      params: {
        search: params?.search,
        category:
          params?.category && params.category !== "all"
            ? params.category
            : undefined,
        status: params?.status,
        ordering: params?.ordering || "-date",
      },
      next: { revalidate: 30 },
    });

    if (!res.isAvailabilityFailure && res.data) {
      const rawList = Array.isArray(res.data)
        ? res.data
        : (res.data as any).results || [];
      const events = rawList.map(mapDrfEventToEventTypes);
      return { events, isFallback: false };
    }

    return { events: [], isFallback: false };
  } catch (error) {
    console.error("getEvents API error:", error);
    return { events: [], isFallback: false };
  }
}

/**
 * Resolves an event by its slug or numeric ID from `/api/v1/events/<slug>/`.
 * Pure backend integration without static fallback mocks.
 */
export async function getEventBySlug(
  identifier: string
): Promise<{ event: EventTypes | null; isFallback: boolean }> {
  const decoded = decodeURIComponent(identifier).trim();

  try {
    const res = await apiGet<any>(`/events/${encodeURIComponent(decoded)}/`, {
      next: { revalidate: 30 },
    });

    if (!res.isAvailabilityFailure && res.data) {
      const event = mapDrfEventToEventTypes(res.data);
      return { event, isFallback: false };
    }

    return { event: null, isFallback: false };
  } catch (error) {
    console.error("getEventBySlug API error:", error);
    return { event: null, isFallback: false };
  }
}
