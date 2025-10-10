import React from "react";
import DownloadCertificate from "./DownloadCertificate";
import { format } from "date-fns";

import { metadata } from "@/app/layout";
import NotFound from "@/app/not-found";
import { fetchWithToken } from "@/lib/fetch";
import { CertificateTypes } from "@/types/certificate";
import QueryString from "qs";
import CertificateDisplay from "./CertificateDisplay";
import CertificateVerification from "./CertificateVerification";
import EventMentorDetails from "./EventMentorDetails";

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
      <CertificateVerification
        certificateDetails={certificateDetails}
        isValid={false}
      />

      {/* Certificate Display */}
      <CertificateDisplay
        certificateDetails={certificateDetails}
        qrCodeUrl={qrCodeUrl}
        certificateData={data}
        isValid={false}
      />

      <EventMentorDetails
        certificateDetails={certificateDetails}
        eventData={data.event}
      />
    </div>
  );
};

export default CertificateData;
