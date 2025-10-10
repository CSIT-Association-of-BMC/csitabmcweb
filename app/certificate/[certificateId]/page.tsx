import React from "react";
import DownloadCertificate from "./DownloadCertificate";
import { format } from "date-fns";

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
        populate: {
          mentors: {
            fields: ["fullName", "role"],
            populate: {
              image: {
                fields: ["url"],
              },
            },
          },
        },
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
        title: "President | CSIT Association of BMC",
        institute: "CSIT Association of BMC",
      },
      {
        name: "Dr. Arun Kumar Kshetree",
        title: "Campus Chief",
        institute: "Butwal Multiple Campus",
      },
      {
        name: "Mr. Gobinda Adhikari",
        title: "B.Sc. CSIT Program Director",
        institute: "Butwal Multiple Campus",
      },
    ],
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=https://csitabmc.com/certificate/${certificateDetails.id}&size=200x200`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <CertificateVerification
        certificateDetails={certificateDetails}
        isValid={data.isProjectComplete}
      />

      {/* Certificate Display */}
      <CertificateDisplay
        certificateDetails={certificateDetails}
        qrCodeUrl={qrCodeUrl}
        certificateData={data}
        isValid={data.isProjectComplete}
      />

      <EventMentorDetails
        certificateDetails={certificateDetails}
        eventData={data.event}
      />
    </div>
  );
};

export default CertificateData;
