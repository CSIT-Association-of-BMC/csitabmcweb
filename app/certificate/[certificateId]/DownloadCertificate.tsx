"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface DownloadCertificateProps {
  certificateId: string;
  recipientName: string;
}

const DownloadCertificate: React.FC<DownloadCertificateProps> = ({
  certificateId,
  recipientName,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      // Get the certificate element
      const certificateElement = document.getElementById(
        "certificate-to-download"
      );

      if (!certificateElement) {
        console.error("Certificate element not found");
        setLoading(false);
        return;
      }

      // Hide elements with no-pdf class
      const noPdfElements = certificateElement.querySelectorAll(".no-pdf");
      noPdfElements.forEach((el) => {
        (el as HTMLElement).style.display = "none";
      });

      // Convert to canvas
      const canvas = await html2canvas(certificateElement, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: certificateElement.scrollWidth,
        windowHeight: certificateElement.scrollHeight,
      });

      // Show elements again
      noPdfElements.forEach((el) => {
        (el as HTMLElement).style.display = "";
      });

      // Create PDF in landscape A4 format
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // A4 landscape dimensions
      const pdfWidth = 297; // A4 landscape width in mm
      const pdfHeight = 210; // A4 landscape height in mm

      // Calculate dimensions to fit canvas in PDF while maintaining aspect ratio
      const canvasAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;

      let imgWidth = pdfWidth;
      let imgHeight = pdfWidth / canvasAspectRatio;

      // If image height exceeds PDF height, scale by height instead
      if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = pdfHeight * canvasAspectRatio;
      }

      // Center the image on the PDF
      const xOffset = (pdfWidth - imgWidth) / 2;
      const yOffset = (pdfHeight - imgHeight) / 2;

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
      pdf.save(`${recipientName}_Certificate.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      aria-label="Download certificate PDF"
      disabled={loading}
      onClick={handleDownload}
      className="rounded-full bg-red-600 hover:bg-red-700 text-white border border-red-600 shadow-lg flex items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-12 lg:h-12 p-0"
      size="icon"
    >
      <Download className="w-6 h-6 md:w-7 md:h-7 lg:w-5 lg:h-5" />
    </Button>
  );
};

export default DownloadCertificate;
