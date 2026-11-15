"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, FileText, Download } from "lucide-react";
import { NoticePreviewModal } from "@/app/notices/components/NoticePreviewModal";

interface NoticeDetailPreviewProps {
  imageUrl?: string;
  title: string;
}

export function NoticeDetailPreview({ imageUrl, title }: NoticeDetailPreviewProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (!imageUrl) {
    return (
      <div className="w-full min-h-[320px] rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center p-8 text-center text-slate-400">
        <FileText className="w-12 h-12 mb-3 text-slate-300" />
        <p className="text-sm font-medium">No document attached to this notice.</p>
      </div>
    );
  }

  const isPdf = imageUrl.toLowerCase().endsWith(".pdf") || imageUrl.toLowerCase().includes("/pdf/");

  return (
    <>
      {/* Content-adaptive document presentation: hugs document bounds without oversized dead space */}
      <div className="relative w-fit max-w-full mx-auto rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200/80 p-2 sm:p-2.5 shadow-xs flex items-center justify-center">
        {/* Top-Right Expand Button */}
        <button
          type="button"
          onClick={() => setIsPreviewOpen(true)}
          className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/95 hover:bg-white border border-slate-200/90 shadow-sm text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          title="Open full-screen preview"
          aria-label="Open full-screen preview"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {isPdf ? (
          /* PDF Document Card */
          <div className="w-full max-w-md flex flex-col items-center justify-center py-12 px-6 bg-white rounded-xl border border-slate-200/70 shadow-sm text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-xs">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-xs text-slate-500 mb-6">PDF Document</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Open Preview</span>
              </button>
              <a
                href={imageUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        ) : (
          /* Image Document Preview (True aspect ratio, uncropped, zero dead space) */
          <div
            onClick={() => setIsPreviewOpen(true)}
            className="relative w-fit max-w-full flex items-center justify-center cursor-pointer group select-none rounded-xl overflow-hidden"
            role="button"
            tabIndex={0}
            aria-label="Click to open full-screen document preview"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsPreviewOpen(true);
              }
            }}
          >
            <Image
              src={imageUrl}
              alt={title}
              width={1200}
              height={1600}
              priority
              sizes="(max-width: 1024px) 95vw, 55vw"
              className="w-auto h-auto max-h-[76vh] max-w-full object-contain object-center rounded-xl shadow-md border border-slate-200/70 bg-white block transition-transform duration-200 group-hover:scale-[1.008]"
            />
          </div>
        )}
      </div>

      {/* Lightbox / Full-screen Interactive Modal */}
      <NoticePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageUrl={imageUrl}
        title={title}
      />
    </>
  );
}
