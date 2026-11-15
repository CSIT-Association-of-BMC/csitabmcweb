import { format } from "date-fns";
import NotFound from "@/app/not-found";
import { verifyCertificate } from "@/lib/api/certificates";
import type { CertificateTypes } from "@/types/certificate";
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
    noIndex: true, // Verification query results should not pollute search index
  });
}

export default async function CertificateDetailPage({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const { certificateId } = await params;
  const result = await verifyCertificate(certificateId);

  if (!result.valid || !result.certificate) {
    return (
      <NotFound
        heading="Certificate Not Found"
        message={
          result.detail ||
          "The certificate you're looking for doesn't exist or could not be authenticated. Please double-check the Certificate ID or UUID."
        }
      />
    );
  }

  const cert = result.certificate;
  const isEligible = Boolean(cert.is_project_completed);
  const certId = cert.certificate_id || certificateId;
  const recipient = cert.full_name || "Recipient";
  const course = cert.event_title || "CSIT Workshop";

  let completionDate = "Verified Date";
  try {
    if (cert.issued_at) {
      completionDate = format(new Date(cert.issued_at), "MMMM d, yyyy");
    }
  } catch {
    completionDate = "Verified Date";
  }

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

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=https://csitabmc.com/certificate/${encodeURIComponent(
    certificateDetails.id
  )}&size=200x200`;

  const certDataCompatible: CertificateTypes = {
    certificateID: certId,
    certificate_id: certId,
    fullName: recipient,
    full_name: recipient,
    isProjectComplete: isEligible,
    is_project_completed: isEligible,
    event_title: course,
    issued_at: cert.issued_at,
    event: {
      id: 1,
      title: course,
      startDate: cert.issued_at || new Date().toISOString(),
      endDate: cert.issued_at || new Date().toISOString(),
      slug: "event",
    } as any,
  };

  return (
    <div className="w-full mx-auto bg-slate-50/50 py-8 sm:py-12">
      <Container>
        <CertificateVerification
          certificateDetails={certificateDetails}
          isValid={isEligible}
        />

        {/* Certificate Display */}
        <CertificateDisplay
          certificateDetails={certificateDetails}
          qrCodeUrl={qrCodeUrl}
          certificateData={certDataCompatible}
          isValid={isEligible}
        />
      </Container>
    </div>
  );
}
