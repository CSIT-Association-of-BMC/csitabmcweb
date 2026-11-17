"use client";

import { useQuery } from "@tanstack/react-query";
import type { NoticeTypes } from "@/types/Notice";
import { getNotices, NoticeFilterParams } from "@/lib/api/notices";

export interface UseNoticesOptions extends NoticeFilterParams {
  initialData?: NoticeTypes[];
  enabled?: boolean;
}

export interface UseNoticesResult {
  data: NoticeTypes[];
  isFallback: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<any>;
  query: ReturnType<typeof useQuery<{ notices: NoticeTypes[]; isFallback: boolean }>>;
}

/**
 * TanStack Query hook for fetching and caching notices.
 * Strictly uses named exports without default export.
 */
export function useNotices(options: UseNoticesOptions = {}): UseNoticesResult {
  const { initialData, enabled = true, search, category, status, ordering } = options;

  const query = useQuery({
    queryKey: ["notices", { search, category, status, ordering }],
    queryFn: () => getNotices({ search, category, status, ordering }),
    initialData: initialData ? { notices: initialData, isFallback: false } : undefined,
    enabled,
    staleTime: 60 * 1000,
  });

  return {
    data: query.data?.notices ?? [],
    isFallback: query.data?.isFallback ?? false,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: query.refetch,
    query,
  };
}
