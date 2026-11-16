/**
 * Centralized Django REST Framework Public API Client
 *
 * Exclusively communicates with authoritative /api/v1/ public endpoints
 * without requiring or transmitting administrative CMS credentials.
 */

export interface ApiResponse<T> {
  data: T | null;
  status: number | null;
  isAvailabilityFailure: boolean;
  isEmpty: boolean;
  error?: string | null;
}

export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  return url!.replace(/\/+$/, "");
}

export interface RequestOptions extends RequestInit {
  timeoutMs?: number;
  params?: Record<string, string | number | boolean | undefined | null>;
}

/**
 * Constructs a full URL with query parameters.
 */
export function buildApiUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined | null>
): string {
  const base = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = new URL(`${base}${cleanEndpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        url.searchParams.set(key, String(val));
      }
    });
  }

  return url.toString();
}

/**
 * Executes an anonymous HTTP GET request against the Django REST Framework public API.
 */
export async function apiGet<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { timeoutMs = 8000, params, ...fetchInit } = options;
  const url = buildApiUrl(endpoint, params);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...fetchInit,
      method: "GET",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(fetchInit.headers || {}),
      },
    });

    clearTimeout(timeoutId);

    // 5xx Server Error / Gateway Timeout
    if (res.status >= 500) {
      return {
        data: null,
        status: res.status,
        isAvailabilityFailure: true,
        isEmpty: false,
        error: `Backend server error (${res.status})`,
      };
    }

    // 404 Resource Not Found
    if (res.status === 404) {
      return {
        data: null,
        status: 404,
        isAvailabilityFailure: false,
        isEmpty: false,
        error: "Requested resource not found",
      };
    }

    // 200 OK
    if (res.ok) {
      const json = await res.json();
      // Handle Django DRF paginated { count, results } or flat JSON
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

    // Other 4xx client errors (400, 401, 403)
    return {
      data: null,
      status: res.status,
      isAvailabilityFailure: false,
      isEmpty: false,
      error: `Request rejected (${res.status})`,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const isAbort = err instanceof Error && err.name === "AbortError";
    const errorMessage = isAbort
      ? `Request timed out after ${timeoutMs}ms`
      : err instanceof Error
      ? err.message
      : "Network connection error";

    return {
      data: null,
      status: null,
      isAvailabilityFailure: true,
      isEmpty: false,
      error: errorMessage,
    };
  }
}
