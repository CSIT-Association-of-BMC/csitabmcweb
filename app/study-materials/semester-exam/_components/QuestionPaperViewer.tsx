"use client";

import { useEffect, useState } from "react";
import { PastPaperItem, getDriveEmbedUrl } from "@/lib/study-materials";
import { X, ExternalLink, Loader2, FileText, AlertCircle } from "lucide-react";

interface QuestionPaperViewerProps {
  paper: PastPaperItem | null;
  onClose: () => void;
}

export default function QuestionPaperViewer({ paper, onClose }: QuestionPaperViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const embedUrl = paper ? getDriveEmbedUrl(paper.drive_link) : null;

  // Lock body scroll while modal is active & listen for Escape key
  useEffect(() => {
    if (!paper) return;

    setIsLoading(true);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [paper, onClose]);

  if (!paper) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="paper-modal-title"
    >
      <div className="relative flex flex-col w-full max-w-5xl h-[92vh] sm:h-[88vh] rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 sm:px-6 py-3.5 bg-slate-50/80 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-mono font-semibold text-primary flex-shrink-0">
              {paper.subject_code}
            </span>
            <div className="min-w-0">
              <h2
                id="paper-modal-title"
                className="text-sm sm:text-base font-semibold text-slate-900 truncate"
              >
                {paper.subject_name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-slate-500">
                <span>Year {paper.exam_year}</span>
                <span>•</span>
                <span>Semester {paper.semester}</span>
                {paper.model_set && (
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 border border-amber-200/60">
                    Model Set
                  </span>
                )}
                {paper.is_old_course && (
                  <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-700 border border-purple-200/60">
                    Old Course
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {paper.drive_link && (
              <a
                href={paper.drive_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                title="Open in Google Drive"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open in Drive</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="relative flex-1 bg-slate-100 min-h-0">
          {embedUrl ? (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/90 gap-2 z-10">
                  <Loader2 className="w-7 h-7 text-primary animate-spin" />
                  <p className="text-xs font-medium text-slate-500">Loading document preview...</p>
                </div>
              )}
              <iframe
                src={embedUrl}
                className="w-full h-full border-0"
                title={`${paper.subject_name} (${paper.exam_year})`}
                onLoad={() => setIsLoading(false)}
                allow="autoplay"
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-base font-semibold text-slate-800">Direct Preview Unavailable</h3>
              <p className="mt-1 text-sm text-slate-500 max-w-md">
                This question paper is stored in an external folder or custom format. You can view or download it directly on Google Drive.
              </p>
              {paper.drive_link ? (
                <a
                  href={paper.drive_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow hover:bg-primary/90 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Document in Google Drive
                </a>
              ) : (
                <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                  <AlertCircle className="w-4 h-4" />
                  Document link not yet assigned for this paper.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

