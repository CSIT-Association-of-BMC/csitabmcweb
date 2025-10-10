"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { BlobProvider } from "@react-pdf/renderer";
import { CertificateTypes } from "@/types/certificate";
import Certificate from "@/components/certificate/Certificate";
import { Download } from "lucide-react";

interface DownloadCertificateProps {
  certificateData: CertificateTypes;
}

const DownloadCertificate: React.FC<DownloadCertificateProps> = ({
  certificateData,
}) => {
  if (typeof window === "undefined") return null;

  return (
    <div>
      <BlobProvider document={<Certificate data={certificateData as any} />}>
        {({ loading, url }) => (
          <Button
            aria-label="Download certificate PDF"
            disabled={loading}
            onClick={() => {
              if (url) {
                const link = document.createElement("a");
                link.href = url;
                link.download = `${certificateData.fullName}.pdf`;
                link.click();
              }
            }}
            className="rounded-full bg-red-600 hover:bg-red-700 text-white border border-red-600 shadow-lg flex items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-12 lg:h-12 p-0"
            size="icon"
          >
            <Download className="w-6 h-6 md:w-7 md:h-7 lg:w-5 lg:h-5" />
          </Button>
        )}
      </BlobProvider>
    </div>
  );
};

export default DownloadCertificate;
