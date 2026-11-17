"use client";

import { useQuery } from "@tanstack/react-query";
import type { EventTypes } from "@/types/events";
import { getEvents, EventFilterParams } from "@/lib/api/events";

export interface UseEventsOptions extends EventFilterParams {
  initialData?: EventTypes[];
  enabled?: boolean;
}

export interface UseEventsResult {
  data: EventTypes[];
  isFallback: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<any>;
  query: ReturnType<typeof useQuery<{ events: EventTypes[]; isFallback: boolean }>>;
}

/**
 * TanStack Query hook for fetching and caching events.
 * Strictly uses named exports without default export.
 */
export function useEvents(options: UseEventsOptions = {}): UseEventsResult {
  const { initialData, enabled = true, search, category, status, ordering } = options;

  const query = useQuery({
    queryKey: ["events", { search, category, status, ordering }],
    queryFn: () => getEvents({ search, category, status, ordering }),
    initialData: initialData ? { events: initialData, isFallback: false } : undefined,
    enabled,
    staleTime: 60 * 1000,
  });

  return {
    data: query.data?.events ?? [],
    isFallback: query.data?.isFallback ?? false,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: query.refetch,
    query,
  };
}
