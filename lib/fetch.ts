export interface BackendFetchResult<T> {
  data: T | null;
  status: number | null;
  isAvailabilityFailure: boolean;
  isEmpty: boolean;
}

export const isServerAvailabilityError = (status?: number | null): boolean => {
  if (!status) return true; // network exception / no response
  return status >= 500 && status <= 599;
};

export const fetchWithToken = async (url: string, init?: RequestInit) => {
  try {
    return await globalThis.fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        ...(init?.headers || {}),
      },
      next: { revalidate: 30, ...(init as any)?.next },
    });
  } catch (error) {
    console.error(`fetchWithToken network error for ${url}:`, error);
    return null;
  }
};

export async function fetchBackendResource<T>(
  url: string,
  options?: RequestInit
): Promise<BackendFetchResult<T>> {
  try {
    const res = await fetchWithToken(url, options);

    if (!res) {
      // Network drop, timeout, connection refused
      return {
        data: null,
        status: null,
        isAvailabilityFailure: true,
        isEmpty: false,
      };
    }

    if (res.status >= 500) {
      // 5xx server crash / gateway timeout
      return {
        data: null,
        status: res.status,
        isAvailabilityFailure: true,
        isEmpty: false,
      };
    }

    if (res.status === 404) {
      return {
        data: null,
        status: 404,
        isAvailabilityFailure: false,
        isEmpty: false,
      };
    }

    if (res.ok) {
      const json = await res.json();
      const rawData = json?.data !== undefined ? json.data : json;
      const isEmpty = Array.isArray(rawData) ? rawData.length === 0 : !rawData;
      return {
        data: rawData as T,
        status: res.status,
        isAvailabilityFailure: false,
        isEmpty,
      };
    }

    // Other 4xx client errors (e.g. 400, 401, 403)
    return {
      data: null,
      status: res.status,
      isAvailabilityFailure: false,
      isEmpty: false,
    };
  } catch (err) {
    console.error(`fetchBackendResource error for ${url}:`, err);
    return {
      data: null,
      status: null,
      isAvailabilityFailure: true,
      isEmpty: false,
    };
  }
}
