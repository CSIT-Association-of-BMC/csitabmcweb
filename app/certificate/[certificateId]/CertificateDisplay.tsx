import React from "react";
import Image from "next/image";
import DownloadCertificate from "./DownloadCertificate";
import { CertificateTypes } from "@/types/certificate";

interface Signature {
  name: string;
  title: string;
}

interface CertificateDetails {
  id: string;
  recipientName: string;
  courseName: string;
  completionDate: string;
  signatures: Signature[];
}

interface CertificateDisplayProps {
  certificateDetails: CertificateDetails;
  qrCodeUrl: string;
  certificateData: CertificateTypes;
  isValid?: boolean;
}

const CertificateDisplay: React.FC<CertificateDisplayProps> = ({
  certificateDetails,
  qrCodeUrl,
  certificateData,
  isValid = true,
}) => {
  return (
    <div className="container w-full overflow-y-auto">
      <div className="w-full overflow-x-hidden max-w-[1200px] mx-auto">
        <div className="mx-auto text-[1.2vw] lg:text-[1vw] 2xl:text-[16px]">
          <div className="relative w-full aspect-[16/10] bg-white shadow-xl overflow-hidden border border-slate-200">
            <div
              style={{ top: "0", right: "0", width: "24em", height: "24em" }}
              className="absolute bg-blue-500/5 rounded-full blur-3xl"
            />
            <div
              style={{ bottom: "0", left: "0", width: "20em", height: "20em" }}
              className="absolute bg-blue-600/5 rounded-full blur-3xl"
            />

            <svg
              className="absolute inset-0 w-full h-full opacity-[0.03]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="grid-v1"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-blue-900"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-v1)" />
            </svg>

            <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-[0.02]">
              <div
                style={{
                  top: "0",
                  right: "10%",
                  width: "0.25em",
                  height: "100%",
                }}
                className="absolute bg-blue-900 rotate-12 origin-top-right"
              />
              <div
                style={{
                  top: "0",
                  right: "20%",
                  width: "0.25em",
                  height: "100%",
                }}
                className="absolute bg-blue-900 rotate-12 origin-top-right"
              />
              <div
                style={{
                  top: "0",
                  right: "30%",
                  width: "0.25em",
                  height: "100%",
                }}
                className="absolute bg-blue-900 rotate-12 origin-top-right"
              />
            </div>

            <div
              style={{ top: "5em", left: "0", width: "8em", height: "0.25em" }}
              className="absolute bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
            />
            <div
              style={{
                bottom: "8em",
                right: "0",
                width: "10em",
                height: "0.25em",
              }}
              className="absolute bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
            />

            <div
              style={{ top: "0", left: "0", width: "6em", height: "6em" }}
              className="absolute border-l-2 border-t-2 border-blue-900/10"
            />
            <div
              style={{ bottom: "0", right: "0", width: "6em", height: "6em" }}
              className="absolute border-r-2 border-b-2 border-blue-900/10"
            />

            <div
              style={{ top: "0", left: "0", right: "0", height: "0.5em" }}
              className="absolute bg-blue-900"
            />

            <div className="relative h-full flex flex-col p-8 md:p-16">
              {/* Download Button inside certificate border */}
              <div className="absolute bottom-4 right-4 z-10">
                <DownloadCertificate certificateData={certificateData} />
              </div>
              <div
                style={{ marginBottom: "3em" }}
                className="flex items-start justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div
                      style={{ width: "4em", height: "4em" }}
                      className="rounded-full overflow-hidden bg-white border-2 border-slate-200"
                    >
                      <Image
                        src="/logo.png"
                        alt="CSIT Association of BMC"
                        width={64}
                        height={64}
                        className="w-full h-full p-1 object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h2
                      style={{ fontSize: "1.5em" }}
                      className="font-bold text-slate-900"
                    >
                      CSIT Association Of BMC
                    </h2>
                    <p
                      style={{ fontSize: "0.875em" }}
                      className="text-slate-600"
                    >
                      Creating world bit by bit
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    style={{ fontSize: "0.75em" }}
                    className="uppercase tracking-wider mb-1"
                  >
                    Certificate ID
                  </p>
                  <p
                    style={{ fontSize: "0.875em" }}
                    className="font-mono font-semibold text-blue-900"
                  >
                    {certificateDetails.id}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-between gap-16">
                <div className="flex-1">
                  <div style={{ marginBottom: "2em" }}>
                    <p
                      style={{ fontSize: "1.125em", marginBottom: "2em" }}
                      className="text-slate-600"
                    >
                      This is to certify that
                    </p>

                    <h1
                      style={{ fontSize: "4em", marginBottom: "1em" }}
                      className="font-bold text-blue-900 leading-tight"
                    >
                      {certificateDetails.recipientName}
                    </h1>
                    <div
                      style={{
                        width: "100%",
                        height: "0.25em",
                        marginBottom: "2em",
                      }}
                      className="bg-blue-900"
                    />

                    <p
                      style={{ fontSize: "0.875em", marginBottom: "1.5em" }}
                      className="leading-relaxed"
                    >
                      has successfully completed the course
                    </p>

                    <p style={{ fontSize: "1em" }}>
                      Awarded on {certificateDetails.completionDate}
                    </p>
                    <p
                      style={{ fontSize: "1.5em", marginBottom: "2em" }}
                      className="font-semibold text-slate-900"
                    >
                      {certificateDetails.courseName}
                    </p>
                  </div>

                  <div
                    className="grid grid-cols-3"
                    style={{ marginTop: "2em", gap: "1em" }}
                  >
                    {certificateDetails.signatures.map((signature, index) => (
                      <div key={signature.name}>
                        <div style={{ marginBottom: "0.5em" }}>
                          <svg
                            viewBox="0 0 180 50"
                            style={{ width: "100%", height: "0.5em" }}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d={
                                index % 2 === 0
                                  ? "M 10 30 Q 25 15, 45 28 Q 65 40, 85 25 Q 105 10, 125 30 Q 145 45, 165 28"
                                  : "M 10 25 Q 30 35, 50 20 Q 70 5, 90 25 Q 110 40, 130 20 Q 150 10, 170 30"
                              }
                              stroke="currentColor"
                              strokeWidth="1.5"
                              fill="none"
                              className="text-slate-700"
                            />
                          </svg>
                        </div>
                        <div
                          className="border-t border-slate-300"
                          style={{ paddingTop: "0.25em" }}
                        >
                          <p
                            style={{ fontSize: "0.875em" }}
                            className="font-semibold text-slate-900"
                          >
                            {signature.name}
                          </p>
                          <p
                            style={{ fontSize: "0.75em" }}
                            className="text-slate-600"
                          >
                            {signature.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div
                    style={{ width: "12em", height: "12em" }}
                    className="bg-white rounded-lg border-2 border-slate-300 p-2"
                  >
                    <img
                      src={qrCodeUrl || "/placeholder.svg"}
                      alt="Certificate QR Code"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>

              <div
                style={{ marginTop: "2em", paddingTop: "1.5em" }}
                className="border-t border-slate-200"
              >
                <p
                  style={{ fontSize: "0.75em" }}
                  className="text-slate-500 text-center"
                >
                  This certificate validates the successful completion of the
                  specified course and can be verified at the URL above.
                </p>
              </div>
            </div>

            {/* Invalid Certificate Overlay */}
            {!isValid && (
              <div className="absolute inset-0 bg-red-900/90 backdrop-blur-sm flex items-center justify-center z-20">
                <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-2xl border-4 border-red-600">
                  <div className="mb-4">
                    <svg
                      className="w-16 h-16 text-red-600 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-red-600 mb-2">
                    INVALID CERTIFICATE
                  </h3>
                  <p className="text-slate-700 mb-4">
                    This certificate cannot be issued because the required
                    projects and assignments have not been completed.
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-800 font-medium">
                      Please complete all required coursework to receive a valid
                      certificate.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDisplay;
