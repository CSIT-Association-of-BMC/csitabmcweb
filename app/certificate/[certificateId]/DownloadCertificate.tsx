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
            disabled={loading}
            onClick={() => {
              if (url) {
                const link = document.createElement("a");
                link.href = url;
                link.download = `${certificateData.fullName}.pdf`;
                link.click();
              }
            }}
            className="rounded-full bg-red-600 hover:bg-red-700 text-white border border-red-600 shadow-lg flex items-center justify-center text-[1vw] w-[6em] h-[6em] lg:w-[3em] lg:h-[3em]"
            size="icon"
          >
            <Download className=" w-[5em] h-[5em]" />
          </Button>
        )}
      </BlobProvider>
    </div>
  );
};

export default DownloadCertificate;
