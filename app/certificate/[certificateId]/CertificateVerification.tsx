import Link from "next/link";
import { ShieldCheck, ShieldAlert, ArrowLeft, Calendar, Building2 } from "lucide-react";
import DownloadCertificate from "./DownloadCertificate";

interface CertificateVerificationProps {
  certificateDetails: {
    id: string;
    completionDate: string;
    recipientName?: string;
  };
  isValid: boolean;
}

export default function CertificateVerification({
  certificateDetails,
  isValid,
}: CertificateVerificationProps) {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Breadcrumb / Return */}
        <div className="mb-4">
          <Link
            href="/certificate"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Verify Another Certificate</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5 sm:p-7 md:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="shrink-0 hidden sm:block">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs ${
                    isValid
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      : "bg-amber-50 text-amber-600 border border-amber-200"
                  }`}
                >
                  {isValid ? (
                    <ShieldCheck className="w-7 h-7" />
                  ) : (
                    <ShieldAlert className="w-7 h-7" />
                  )}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Certificate Verification
                  </h1>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      isValid
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-amber-100 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {isValid ? "Verified & Active" : "Coursework Pending"}
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4 max-w-2xl">
                  {isValid
                    ? "This certificate has been officially verified and authenticated by the CSIT Association of BMC. The credential is active and verified for academic and professional portfolios."
                    : "This certificate is currently unverified or locked because the required project, assignments, or practical evaluations have not yet been completed."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Issued: {certificateDetails.completionDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Issuer: CSIT Association of BMC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action and ID column */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-3 shrink-0">
              <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200 text-left lg:text-right">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                  Certificate ID
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold text-slate-800 break-all select-all">
                  {certificateDetails.id}
                </div>
              </div>

              {/* Download Action Gated by Coursework Eligibility */}
              <DownloadCertificate
                certificateId={certificateDetails.id}
                recipientName={certificateDetails.recipientName || "Recipient"}
                isEligible={isValid}
              />
            </div>
          </div>

          {/* Footer info bar */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span>Authentication Platform:</span>
              <span className="font-medium text-slate-700">CSITABMC Verification Engine</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isValid ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              <span>
                Status: {isValid ? "Authenticated & Eligible" : "Incomplete Requirements"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
