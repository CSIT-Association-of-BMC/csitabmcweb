"use client";

import { useQuery } from "@tanstack/react-query";
import type { PastPaperItem } from "@/lib/study-materials";
import { getPastPapers, PastPaperFilterParams } from "@/lib/api/study-materials";

export interface UsePastPapersOptions extends PastPaperFilterParams {
  initialData?: PastPaperItem[];
  enabled?: boolean;
}

export interface UsePastPapersResult {
  data: PastPaperItem[];
  isFallback: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<any>;
  query: ReturnType<typeof useQuery<{ papers: PastPaperItem[]; isFallback: boolean }>>;
}

/**
 * TanStack Query hook for fetching and caching past question papers.
 * Strictly uses named exports without default export.
 */
export function usePastPapers(options: UsePastPapersOptions = {}): UsePastPapersResult {
  const { initialData, enabled = true, semester, search, model_set, is_old_course, exam_year, ordering } = options;

  const query = useQuery({
    queryKey: ["past-papers", { semester, search, model_set, is_old_course, exam_year, ordering }],
    queryFn: () => getPastPapers({ semester, search, model_set, is_old_course, exam_year, ordering }),
    initialData: initialData ? { papers: initialData, isFallback: false } : undefined,
    enabled,
    staleTime: 60 * 1000,
  });

  return {
    data: query.data?.papers ?? [],
    isFallback: query.data?.isFallback ?? false,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: query.refetch,
    query,
  };
}
