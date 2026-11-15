import { apiGet } from "./client";
import { PastPaperItem, findSubjectName } from "@/lib/study-materials";

export interface PastPaperFilterParams {
  semester?: number;
  search?: string;
  model_set?: boolean;
  is_old_course?: boolean;
  exam_year?: number;
  ordering?: string;
}

/**
 * Normalizes DRF past paper record into frontend PastPaperItem structure.
 */
export function mapDrfPaperToPastPaperItem(item: any): PastPaperItem {
  const code = (item.subject_name || item.subject_code || "UNKNOWN").trim().toUpperCase();
  return {
    id: item.id,
    subject_code: code,
    subject_name: findSubjectName(code),
    semester: item.semester,
    model_set: Boolean(item.model_set),
    is_old_course: Boolean(item.is_old_course),
    exam_year: item.exam_year,
    drive_link: item.drive_link || "",
    slug: item.slug || `${code.toLowerCase()}-${item.exam_year}`,
    created_at: item.created_at,
    updated_at: item.updated_at,
  };
}

/**
 * Fetches past papers from Django REST Framework endpoint `/api/v1/past-papers/`.
 * Pure backend integration without static fallback mocks.
 */
export async function getPastPapers(
  params?: PastPaperFilterParams
): Promise<{ papers: PastPaperItem[]; isFallback: boolean }> {
  try {
    const res = await apiGet<any>("/past-papers/", {
      params: {
        semester: params?.semester,
        search: params?.search,
        model_set: params?.model_set,
        is_old_course: params?.is_old_course,
        exam_year: params?.exam_year,
        ordering: params?.ordering || "-exam_year",
      },
      next: { revalidate: 30 },
    });

    if (!res.isAvailabilityFailure && res.data) {
      const rawResults: any[] = Array.isArray(res.data)
        ? res.data
        : (res.data as any).results || [];

      const liveItems = rawResults.map(mapDrfPaperToPastPaperItem);
      return {
        papers: liveItems,
        isFallback: false,
      };
    }

    return { papers: [], isFallback: false };
  } catch (error) {
    console.error("getPastPapers API error:", error);
    return { papers: [], isFallback: false };
  }
}

/**
 * Resolves a single past paper by its slug or ID from `/api/v1/past-papers/<slug>/`.
 * Pure backend integration without static fallback mocks.
 */
export async function getPastPaperBySlug(
  identifier: string
): Promise<{ paper: PastPaperItem | null; isFallback: boolean }> {
  const decoded = decodeURIComponent(identifier).trim();

  try {
    const res = await apiGet<any>(`/past-papers/${encodeURIComponent(decoded)}/`, {
      next: { revalidate: 30 },
    });

    if (!res.isAvailabilityFailure && res.data) {
      return {
        paper: mapDrfPaperToPastPaperItem(res.data),
        isFallback: false,
      };
    }

    return { paper: null, isFallback: false };
  } catch (error) {
    console.error("getPastPaperBySlug API error:", error);
    return { paper: null, isFallback: false };
  }
}
