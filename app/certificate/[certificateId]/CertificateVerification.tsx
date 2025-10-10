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
    <div className="py-16 px-4 md:px-8 bg-slate-50">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
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

            <div className="">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 lg:text-right">
                  Certificate ID
                </div>
                <div className="font-mono text-sm font-semibold text-slate-900 break-all">
                  {certificateDetails.id}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                Powered by
                <span className="text-red-500 pl-1 underline ">
                  <a href="https://consolesoft.ltd">Console Soft</a>
                </span>
              </div>
              <span className="flex items-center">
                <svg
                  className={`w-4 h-4 mr-1 ${
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
                Status: {isValid ? "Active & Valid" : "Inactive & Invalid"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
