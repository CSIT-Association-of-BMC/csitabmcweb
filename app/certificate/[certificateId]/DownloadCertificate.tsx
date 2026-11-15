"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Lock, AlertCircle } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface DownloadCertificateProps {
  certificateId: string;
  recipientName: string;
  isEligible?: boolean;
}

export default function DownloadCertificate({
  certificateId,
  recipientName,
  isEligible = true,
}: DownloadCertificateProps) {
  const [loading, setLoading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  if (!isEligible) {
    return (
      <div
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-medium"
        title="Certificate download is locked until project evaluation is complete"
      >
        <Lock className="w-4 h-4 text-amber-600 shrink-0" />
        <span>Download Locked (Project Completion Pending)</span>
      </div>
    );
  }

  const handleDownload = async () => {
    setLoading(true);
    setDownloadError(null);
    try {
      // Get the certificate element
      const certificateElement = document.getElementById(
        "certificate-to-download"
      );

      if (!certificateElement) {
        throw new Error("Certificate display container not found.");
      }

      // Hide elements with no-pdf class during rasterization
      const noPdfElements = certificateElement.querySelectorAll(".no-pdf");
      noPdfElements.forEach((el) => {
        (el as HTMLElement).style.display = "none";
      });

      // Convert to canvas with high resolution
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: certificateElement.scrollWidth,
        windowHeight: certificateElement.scrollHeight,
      });

      // Restore elements
      noPdfElements.forEach((el) => {
        (el as HTMLElement).style.display = "";
      });

      // Create PDF in landscape A4 format
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 297; // A4 landscape width in mm
      const pdfHeight = 210; // A4 landscape height in mm

      const canvasAspectRatio = canvas.width / canvas.height;
      let imgWidth = pdfWidth;
      let imgHeight = pdfWidth / canvasAspectRatio;

      if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = pdfHeight * canvasAspectRatio;
      }

      const xOffset = (pdfWidth - imgWidth) / 2;
      const yOffset = (pdfHeight - imgHeight) / 2;

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);

      const sanitizedFilename = (recipientName || "CSIT_Certificate")
        .trim()
        .replace(/[^a-zA-Z0-9_-]/g, "_");
      pdf.save(`${sanitizedFilename}_Certificate.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setDownloadError("Could not generate PDF. Please try again or take a screenshot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        aria-label="Download verified certificate PDF"
        disabled={loading}
        onClick={handleDownload}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 h-11 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm shadow-xs transition-all hover:shadow-md cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            <span>Generating PDF...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 shrink-0" />
            <span>Download PDF Certificate</span>
          </>
        )}
      </Button>

      {downloadError && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{downloadError}</span>
        </div>
      )}
    </div>
  );
}
