"use client";

import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@/lib/blogs";
import { getPublishedBlogs, BlogFilterParams } from "@/lib/api/blogs";

export interface UseBlogsOptions extends BlogFilterParams {
  initialData?: BlogPost[];
  enabled?: boolean;
}

export interface UseBlogsResult {
  data: BlogPost[];
  isFallback: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<any>;
  query: ReturnType<typeof useQuery<{ blogs: BlogPost[]; isFallback: boolean }>>;
}

/**
 * TanStack Query hook for fetching and caching published blog articles.
 * Strictly uses named exports without default export.
 */
export function useBlogs(options: UseBlogsOptions = {}): UseBlogsResult {
  const { initialData, enabled = true, search, status, ordering } = options;

  const query = useQuery({
    queryKey: ["blogs", { search, status, ordering }],
    queryFn: () => getPublishedBlogs({ search, status, ordering }),
    initialData: initialData ? { blogs: initialData, isFallback: false } : undefined,
    enabled,
    staleTime: 60 * 1000,
  });

  return {
    data: query.data?.blogs ?? [],
    isFallback: query.data?.isFallback ?? false,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: query.refetch,
    query,
  };
}
