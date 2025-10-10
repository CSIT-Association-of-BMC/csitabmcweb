import React from "react";
import DownloadCertificate from "./DownloadCertificate";
import { format } from "date-fns";

import { metadata } from "@/app/layout";
import NotFound from "@/app/not-found";
import { fetchWithToken } from "@/lib/fetch";
import { CertificateTypes } from "@/types/certificate";
import QueryString from "qs";
import CertificateDisplay from "./CertificateDisplay";

const CertificateData = async ({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) => {
  const { certificateId } = await params;
  const query = QueryString.stringify({
    populate: {
      event: {
        fields: ["title", "startDate", "endDate"],
      },
    },
  });
  const res = await fetchWithToken(
    `${process.env.STRAPI_API_URL}/certificates/${certificateId}?${query}`
  );
  if (!res || res.status !== 200) {
    return (
      <NotFound
        heading="Certificate Not Found"
        message="The certificate you're looking for doesn't exist or has been moved."
      />
    );
  }
  const resJson = await res.json();
  const data: CertificateTypes = resJson.data;

  const certificateDetails = {
    id: data.certificateID,
    recipientName: data.fullName,
    courseName: data.event.title,
    completionDate: format(new Date(data.event.endDate), "MMMM d, yyyy"),
    signatures: [
      {
        name: "Sanchit Pandey",
        title: "President of CSIT Association of BMC",
      },
      {
        name: "Arun Kshetri",
        title: "Campus Chief of Butwal Multiple Campus",
      },
      {
        name: "Third Person",
        title: "Additional Title",
      },
    ],
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=https://csitabmc.com/certificate/${certificateDetails.id}&size=200x200`;

  metadata.title = data.fullName + " | Certified";
  metadata.description = "CSIT Association of BMC Certificate Verification";
  metadata.openGraph = metadata.openGraph ?? {};
  metadata.openGraph.images = {
    url: "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png",
    width: 1200,
    height: 600,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Certificate Verification Header */}
      <div className="py-16 px-4 md:px-8 bg-slate-50">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-bold text-slate-900">
                      Certificate Verification
                    </h1>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  </div>

                  <p className="text-slate-600 mb-4">
                    This certificate has been officially verified and
                    authenticated by the CSIT Association of BMC. The document
                    is valid and recognized for all professional and academic
                    purposes.
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
                    className="w-4 h-4 mr-1 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Status: Active & Valid
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Display */}
      <CertificateDisplay
        certificateDetails={certificateDetails}
        qrCodeUrl={qrCodeUrl}
        certificateData={data}
      />
      <div className="py-20 px-4 md:px-8 bg-slate-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Workshop Info Card */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-900">Workshop Details</h4>
              </div>

              <h5 className="font-semibold text-slate-900 mb-3 text-lg">
                {certificateDetails.courseName}
              </h5>
              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                A professional development workshop focused on practical skills
                and industry knowledge.
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <svg
                    className="w-4 h-4 text-slate-400 mr-2"
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
                  <span className="text-slate-600">Duration:</span>
                  <span className="font-medium text-slate-900 ml-2">
                    {format(new Date(data.event.startDate), "MMM d")} -{" "}
                    {format(new Date(data.event.endDate), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <svg
                    className="w-4 h-4 text-slate-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  <span className="text-slate-600">Awarded:</span>
                  <span className="font-medium text-slate-900 ml-2">
                    {certificateDetails.completionDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Faculty Card */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-900">Expert Faculty</h4>
              </div>

              <div className="space-y-4">
                {certificateDetails.signatures
                  .slice(0, 2)
                  .map((signature, index) => (
                    <div
                      key={signature.name}
                      className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg"
                    >
                      <div className="w-12 h-12 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-slate-600 font-bold text-sm">
                          {signature.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-slate-900 text-sm">
                          {signature.name}
                        </h5>
                        <p className="text-xs text-slate-600">
                          {signature.title}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {index === 0 ? "Lead" : "Expert"}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateData;
