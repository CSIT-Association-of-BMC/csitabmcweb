import { format } from "date-fns";

interface CertificateVerificationProps {
  certificateDetails: {
    id: string;
    completionDate: string;
  };
  isValid: boolean;
}

export default function CertificateVerification({
  certificateDetails,
  isValid,
}: CertificateVerificationProps) {
  return (
    <div className="py-8 px-2 sm:px-4 md:px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6 md:p-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start space-x-3 sm:space-x-6">
              <div className="flex-shrink-0 hidden sm:block">
                <div
                  className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                    isValid ? "bg-blue-600" : "bg-red-600"
                  }`}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        isValid
                          ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      }
                    />
                  </svg>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-slate-900">
                    Certificate Verification
                  </h1>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isValid
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {isValid ? "Verified" : "Deactivated"}
                  </span>
                </div>

                <p className="text-slate-600 mb-4">
                  {isValid
                    ? "This certificate has been officially verified and authenticated by the CSIT Association of BMC. The document is valid and recognized for all professional and academic purposes."
                    : "This certificate has been deactivated due to incomplete requirements. The recipient has not completed all necessary projects and assignments."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-slate-600">
                    <svg
                      className="w-4 h-4 mr-2 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Issued: {certificateDetails.completionDate}
                  </div>
                  <div className="flex items-center text-slate-600">
                    <svg
                      className="w-4 h-4 mr-2 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    Organization: CSIT Association of BMC
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 max-w-full sm:max-w-xs lg:max-w-sm">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 text-left lg:text-right">
                  Certificate ID
                </div>
                <div className="font-mono text-sm font-semibold text-slate-900 break-words">
                  {certificateDetails.id}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 text-sm text-slate-500">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-slate-600">Powered by</span>
                <a
                  className="text-red-500 underline"
                  href="https://consolesoft.ltd"
                >
                  Console Soft
                </a>
              </div>

              <div className="flex items-center">
                <svg
                  className={`w-4 h-4 mr-2 ${
                    isValid ? "text-green-500" : "text-red-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isValid
                        ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    }
                  />
                </svg>
                <span className="text-sm">
                  Status: {isValid ? "Active & Valid" : "Inactive & Invalid"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
