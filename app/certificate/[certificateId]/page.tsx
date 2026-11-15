import { format } from "date-fns";
import NotFound from "@/app/not-found";
import { fetchWithToken } from "@/lib/fetch";
import { CertificateTypes } from "@/types/certificate";
import QueryString from "qs";
import CertificateDisplay from "./CertificateDisplay";
import CertificateVerification from "./CertificateVerification";
import EventMentorDetails from "./EventMentorDetails";
import { Container } from "@/components/shared/Container";
import { generatePageMetadata, siteConfig } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}): Promise<Metadata> {
  const { certificateId } = await params;
  return generatePageMetadata({
    title: `Certificate ${certificateId} - ${siteConfig.name}`,
    description: `Official certificate verification for credential ID ${certificateId} issued by CSIT Association of BMC.`,
    canonical: `${siteConfig.url}/certificate/${certificateId}`,
    noIndex: true, // Verification query results should not pollute index
  });
}

export default async function CertificateDetailPage({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
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
    `${process.env.STRAPI_API_URL}/certificates/${encodeURIComponent(certificateId)}?${query}`
  );

  if (!res || res.status !== 200) {
    return (
      <NotFound
        heading="Certificate Not Found"
        message="The certificate you're looking for doesn't exist or could not be authenticated. Please double-check the Certificate ID."
      />
    );
  }

  const resJson = await res.json();
  const data: CertificateTypes = resJson.data;

  // Resolve project completion eligibility across schema variants
  const isEligible =
    data.is_project_completed !== undefined
      ? Boolean(data.is_project_completed)
      : data.isProjectComplete !== undefined
      ? Boolean(data.isProjectComplete)
      : true;

  const certId = data.certificateID || data.certificate_id || certificateId;
  const recipient = data.fullName || data.full_name || "Recipient";
  const course = data.event?.title || data.event_title || "CSIT Workshop";
  const completionDate = data.event?.endDate
    ? format(new Date(data.event.endDate), "MMMM d, yyyy")
    : data.issued_at
    ? format(new Date(data.issued_at), "MMMM d, yyyy")
    : "Verified Date";

  const certificateDetails = {
    id: certId,
    recipientName: recipient,
    courseName: course,
    completionDate,
    signatures: [
      {
        name: "Mr. Nischal Panthi",
        title: "President ",
        institute: "CSIT Association of BMC",
        image: "/nischal-sign.png",
      },
      {
        name: "Dr. Arun Kumar Kshetree",
        title: "Campus Chief",
        institute: "Butwal Multiple Campus",
        image: "/arun-sign.png",
      },
      {
        name: "Mr. Chhetra Bahadur Chhetri",
        title: "B.Sc. CSIT Program Director",
        institute: "Butwal Multiple Campus",
        image: "/ChhetraSir-Sign.png",
      },
    ],
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=https://csitabmc.com/certificate/${encodeURIComponent(certificateDetails.id)}&size=200x200`;

  return (
    <div className="min-h-screen w-full mx-auto bg-slate-50/50 pb-16">
      <Container>
        <CertificateVerification
          certificateDetails={certificateDetails}
          isValid={isEligible}
        />

        {/* Certificate Display */}
        <CertificateDisplay
          certificateDetails={certificateDetails}
          qrCodeUrl={qrCodeUrl}
          certificateData={data}
          isValid={isEligible}
        />

        {data.event && (
          <EventMentorDetails
            certificateDetails={certificateDetails}
            eventData={data.event}
          />
        )}
      </Container>
    </div>
  );
}
