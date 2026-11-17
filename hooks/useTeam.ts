"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { TenureSummary, TenureDetail, MemberSummary } from "@/lib/api/team";
import { getTenures, getTenureBySlug, getAlumni } from "@/lib/api/team";

export interface UseTeamOptions {
  initialTenures?: TenureSummary[];
  initialActiveTenure?: TenureDetail | null;
  initialAlumni?: MemberSummary[];
  defaultTenureSlug?: string;
  loadAlumni?: boolean;
}

export interface UseTeamResult {
  tenures: TenureSummary[];
  activeTenure: TenureDetail | null;
  alumni: MemberSummary[];
  selectedSlug: string | null;
  isLoading: boolean;
  isFetching: boolean;
  isFallback: boolean;
  error: Error | null;
  selectTenure: (slug: string) => void;
  refetch: () => Promise<any>;
}

/**
 * TanStack Query hook for fetching and managing tenures, committee rosters, and alumni.
 * Strictly uses named exports without default export.
 */
export function useTeam(options: UseTeamOptions = {}): UseTeamResult {
  const {
    initialTenures,
    initialActiveTenure,
    initialAlumni,
    defaultTenureSlug,
    loadAlumni = false,
  } = options;

  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    defaultTenureSlug || initialActiveTenure?.slug || null
  );

  // 1. Query for all available tenures
  const tenuresQuery = useQuery({
    queryKey: ["tenures"],
    queryFn: () => getTenures(),
    initialData: initialTenures
      ? { tenures: initialTenures, isFallback: false }
      : undefined,
    staleTime: 60 * 1000,
  });

  const tenures = tenuresQuery.data?.tenures ?? [];
  const effectiveSlug =
    selectedSlug ||
    tenures.find((t) => t.is_current)?.slug ||
    tenures[0]?.slug ||
    null;

  // 2. Query for selected tenure detail
  const activeTenureQuery = useQuery({
    queryKey: ["tenure", effectiveSlug],
    queryFn: () => (effectiveSlug ? getTenureBySlug(effectiveSlug) : Promise.resolve({ tenure: null, isFallback: false })),
    initialData:
      initialActiveTenure && (!effectiveSlug || initialActiveTenure.slug === effectiveSlug)
        ? { tenure: initialActiveTenure, isFallback: false }
        : undefined,
    enabled: Boolean(effectiveSlug),
    staleTime: 60 * 1000,
  });

  // 3. Query for alumni
  const alumniQuery = useQuery({
    queryKey: ["alumni"],
    queryFn: () => getAlumni(),
    initialData: initialAlumni
      ? { alumni: initialAlumni, isFallback: false }
      : undefined,
    enabled: loadAlumni,
    staleTime: 60 * 1000,
  });

  const isLoading = tenuresQuery.isLoading || activeTenureQuery.isLoading;
  const isFetching = tenuresQuery.isFetching || activeTenureQuery.isFetching || alumniQuery.isFetching;
  const isFallback =
    Boolean(tenuresQuery.data?.isFallback) ||
    Boolean(activeTenureQuery.data?.isFallback) ||
    Boolean(alumniQuery.data?.isFallback);
  const error = (tenuresQuery.error || activeTenureQuery.error || alumniQuery.error) as Error | null;

  return {
    tenures,
    activeTenure: activeTenureQuery.data?.tenure ?? null,
    alumni: alumniQuery.data?.alumni ?? [],
    selectedSlug: effectiveSlug,
    isLoading,
    isFetching,
    isFallback,
    error,
    selectTenure: (slug: string) => setSelectedSlug(slug),
    refetch: async () => {
      await Promise.all([
        tenuresQuery.refetch(),
        activeTenureQuery.refetch(),
        loadAlumni ? alumniQuery.refetch() : Promise.resolve(),
      ]);
    },
  };
}
