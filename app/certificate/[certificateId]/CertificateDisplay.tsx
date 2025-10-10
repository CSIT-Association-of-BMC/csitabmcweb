import React from "react";
import Image from "next/image";
import DownloadCertificate from "./DownloadCertificate";
import { CertificateTypes } from "@/types/certificate";

interface Signature {
  name: string;
  title: string;
  image?: string;
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
    <div className="w-full min-h-screen bg-slate-50 overflow-x-auto overflow-y-hidden lg:overflow-visible lg:flex lg:items-center lg:justify-center">
      <div className="relative bg-white shadow-2xl border border-slate-200 my-6 w-[1200px] aspect-[16/10] lg:w-[95vw] lg:mx-auto mx-4">
        <div style={{ fontSize: "16px", width: "100%", height: "100%" }}>
          <div className="relative w-full h-full overflow-hidden">
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

            <div
              className="relative h-full flex flex-col"
              style={{ padding: "3em" }}
            >
              {/* Download Button inside certificate border */}
              <div
                className="absolute"
                style={{ bottom: "1em", right: "1em", zIndex: 10 }}
              >
                <DownloadCertificate certificateData={certificateData} />
              </div>
              <div
                style={{ marginBottom: "2em" }}
                className="flex items-start justify-between"
              >
                <div className="flex items-center" style={{ gap: "1em" }}>
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
                      Creating the world bit by bit
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    style={{ fontSize: "0.75em", marginBottom: "0.5em" }}
                    className="uppercase tracking-wider"
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

              <div
                className="flex-1 flex items-center justify-between"
                style={{ gap: "4em" }}
              >
                <div className="flex-1">
                  <div style={{ marginBottom: "1.5em" }}>
                    <p
                      style={{ fontSize: "1.125em", marginBottom: "1.5em" }}
                      className="text-slate-600"
                    >
                      This is to certify that
                    </p>

                    <h1
                      style={{ fontSize: "3.5em", marginBottom: "0.5em" }}
                      className="font-bold text-blue-900 leading-tight"
                    >
                      {certificateDetails.recipientName}
                    </h1>
                    <div
                      style={{
                        width: "100%",
                        height: "0.25em",
                        marginBottom: "1.5em",
                      }}
                      className="bg-blue-900"
                    />

                    <p
                      style={{ fontSize: "0.95em", marginBottom: "1em" }}
                      className="leading-relaxed"
                    >
                      has successfully participated in{" "}
                      {certificateDetails.courseName} and shown dedication and
                      understanding of the topics covered. This certificate is
                      awarded in recognition of their achievement.
                    </p>

                    <p style={{ fontSize: "1em", marginBottom: "0.5em" }}></p>
                    <p
                      style={{ fontSize: "1.5em", marginBottom: "1.5em" }}
                      className="font-semibold text-red-600"
                    >
                      {certificateDetails.courseName}
                    </p>
                  </div>

                  <div
                    className="grid grid-cols-3"
                    style={{ marginTop: "1.5em", gap: "2em" }}
                  >
                    {certificateDetails.signatures.map((signature, index) => (
                      <div key={signature.name}>
                        {signature.image ? (
                          <div
                            style={{
                              marginBottom: "0.5em",
                              height: "4em",
                              display: "flex",
                              alignItems: "flex-end",
                            }}
                          >
                            <Image
                              src={signature.image}
                              alt={`${signature.name} signature`}
                              width={180}
                              height={80}
                              className="object-contain w-full h-full"
                              style={{ maxHeight: "4em" }}
                            />
                          </div>
                        ) : (
                          <div style={{ marginBottom: "0.5em" }}>
                            <svg
                              viewBox="0 0 180 50"
                              style={{ width: "100%", height: "2em" }}
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
                        )}
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
                    style={{ width: "10em", height: "10em", padding: "0.5em" }}
                    className="bg-white rounded-lg border-2 border-slate-300"
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
                style={{ marginTop: "1.5em", paddingTop: "1em" }}
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
