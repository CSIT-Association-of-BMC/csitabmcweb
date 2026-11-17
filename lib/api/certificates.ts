import { apiGet } from "./client";

export interface CertificateData {
  certificate_id: string;
  full_name: string;
  event_title: string;
  is_project_completed: boolean;
  issued_at: string;
  president_name?: string | null;
  president_signature_url?: string | null;
}

export interface CertificateVerifyResult {
  valid: boolean;
  certificate?: CertificateData | null;
  detail?: string;
  isAvailabilityFailure?: boolean;
}

/**
 * Public verification of a certificate by exact UUID against `/api/v1/certificates/verify/<certificate_id>/`.
 * Never lists or exposes administrative search; strictly single-record lookup.
 */
export async function verifyCertificate(
  certificateId: string
): Promise<CertificateVerifyResult> {
  const trimmed = certificateId.trim();
  if (!trimmed) {
    return {
      valid: false,
      detail: "Enter a valid certificate ID or UUID.",
    };
  }

  try {
    const res = await apiGet<{
      valid: boolean;
      certificate?: CertificateData;
      detail?: string;
    }>(`/certificates/verify/${encodeURIComponent(trimmed)}/`, {
      cache: "no-store",
    });

    if (res.isAvailabilityFailure) {
      return {
        valid: false,
        detail: "Verification service is currently unreachable. Please try again shortly.",
        isAvailabilityFailure: true,
      };
    }

    if (res.data && res.data.valid) {
      return {
        valid: true,
        certificate: res.data.certificate || null,
      };
    }

    return {
      valid: false,
      detail:
        res.data?.detail ||
        res.error ||
        "No certificate exists with this ID or the ID is malformed.",
    };
  } catch (err: any) {
    console.error("verifyCertificate API error:", err);
    return {
      valid: false,
      detail: "An unexpected error occurred during certificate verification.",
      isAvailabilityFailure: true,
    };
  }
}
