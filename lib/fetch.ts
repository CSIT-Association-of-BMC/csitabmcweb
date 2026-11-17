import { apiGet, ApiResponse, getApiBaseUrl } from "./api/client";

export type BackendFetchResult<T> = ApiResponse<T>;
export { apiGet, getApiBaseUrl };

export const isServerAvailabilityError = (status?: number | null): boolean => {
  if (!status) return true; // network exception / no response / timeout
  return status >= 500 && status <= 599;
};

/**
 * Executes a clean anonymous HTTP fetch without attaching CMS dashboard credentials.
 */
export const fetchAnonymous = async (url: string, init?: RequestInit) => {
  try {
    return await globalThis.fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init?.headers || {}),
      },
      next: { revalidate: 30, ...(init as any)?.next },
    });
  } catch (error) {
    console.error(`fetchAnonymous network error for ${url}:`, error);
    return null;
  }
};

// Alias kept for backward-compatibility during service migration
export const fetchWithToken = fetchAnonymous;

export async function fetchBackendResource<T>(
  url: string,
  options?: RequestInit
): Promise<BackendFetchResult<T>> {
  try {
    const res = await fetchAnonymous(url, options);

    if (!res) {
      // Network drop, timeout, connection refused
      return {
        data: null,
        status: null,
        isAvailabilityFailure: true,
        isEmpty: false,
        error: "Network connection refused or timed out",
      };
    }

    if (res.status >= 500) {
      // 5xx server crash / gateway timeout
      return {
        data: null,
        status: res.status,
        isAvailabilityFailure: true,
        isEmpty: false,
        error: `Server error (${res.status})`,
      };
    }

    if (res.status === 404) {
      return {
        data: null,
        status: 404,
        isAvailabilityFailure: false,
        isEmpty: false,
        error: "Resource not found (404)",
      };
    }

    if (res.ok) {
      const json = await res.json();
      // Unpack Django DRF results or flat JSON
      const rawData =
        json && typeof json === "object" && "results" in json && Array.isArray(json.results)
          ? json.results
          : json?.data !== undefined
          ? json.data
          : json;
      const isEmpty = Array.isArray(rawData) ? rawData.length === 0 : !rawData;
      return {
        data: rawData as T,
        status: res.status,
        isAvailabilityFailure: false,
        isEmpty,
        error: null,
      };
    }

    // Other 4xx client errors (e.g. 400, 401, 403)
    return {
      data: null,
      status: res.status,
      isAvailabilityFailure: false,
      isEmpty: false,
      error: `Client error (${res.status})`,
    };
  } catch (err) {
    console.error(`fetchBackendResource error for ${url}:`, err);
    return {
      data: null,
      status: null,
      isAvailabilityFailure: true,
      isEmpty: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
