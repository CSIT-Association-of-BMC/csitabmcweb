"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import type { CertificateData, CertificateVerifyResult } from "@/lib/api/certificates";
import { verifyCertificate } from "@/lib/api/certificates";

export interface UseCertificateOptions {
  certificateId?: string;
  autoVerify?: boolean;
}

export interface UseCertificateResult {
  isValid: boolean | null;
  isVerifying: boolean;
  data: CertificateData | null;
  error: string | null;
  isAvailabilityFailure: boolean;
  verify: (id?: string) => Promise<void>;
  reset: () => void;
}

/**
 * TanStack Query hook for authenticating certificates against the public verify endpoint.
 * Strictly uses named exports without default export.
 */
export function useCertificate(options: UseCertificateOptions = {}): UseCertificateResult {
  const { certificateId: initialId, autoVerify = false } = options;

  // Mutation for on-demand verification calls
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const trimmed = id.trim();
      if (!trimmed) {
        throw new Error("Please enter a Certificate ID or UUID.");
      }
      return verifyCertificate(trimmed);
    },
  });

  // Query for auto-verification if initialId is provided
  const query = useQuery<CertificateVerifyResult>({
    queryKey: ["certificate-verify", initialId],
    queryFn: () => (initialId ? verifyCertificate(initialId.trim()) : Promise.resolve({ valid: false })),
    enabled: Boolean(autoVerify && initialId),
    staleTime: 60 * 1000,
  });

  // Merge state between query (auto-verify) and mutation (interactive user verify)
  const activeResult = mutation.data ?? query.data ?? null;
  const isVerifying = mutation.isPending || (query.isFetching && autoVerify);

  let isValid: boolean | null = null;
  let data: CertificateData | null = null;
  let error: string | null = null;
  let isAvailabilityFailure = false;

  if (activeResult) {
    isValid = activeResult.valid;
    data = activeResult.certificate ?? null;
    if (!activeResult.valid) {
      error = activeResult.detail ?? "Certificate not found or invalid.";
    }
    isAvailabilityFailure = Boolean(activeResult.isAvailabilityFailure);
  }

  if (mutation.error) {
    isValid = false;
    error = mutation.error instanceof Error ? mutation.error.message : "Failed to communicate with verification service.";
  }

  const verify = async (overrideId?: string) => {
    const target = (overrideId !== undefined ? overrideId : initialId)?.trim();
    if (!target) {
      mutation.reset();
      return;
    }
    await mutation.mutateAsync(target);
  };

  const reset = () => {
    mutation.reset();
  };

  return {
    isValid,
    isVerifying,
    data,
    error,
    isAvailabilityFailure,
    verify,
    reset,
  };
}
