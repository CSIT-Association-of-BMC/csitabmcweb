"use client";

import { useEffect, useState } from "react";
import { PastPaper } from "@/types/studyMaterials";
import { getDriveEmbedUrl } from "./data";
import { X, ExternalLink, Tag, Loader2 } from "lucide-react";

interface PaperViewerProps {
  paper: PastPaper;
  onClose: () => void;
}

export default function PaperViewer({ paper, onClose }: PaperViewerProps) {
  const embedUrl = getDriveEmbedUrl(paper.drive_link);
  const [loading, setLoading] = useState(true);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // If it's a folder link (no embed), redirect immediately
  if (!embedUrl) {
    window.open(paper.drive_link, "_blank", "noopener,noreferrer");
    onClose();
    return null;
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative flex flex-col w-full max-w-5xl h-[90vh] rounded-2xl bg-white shadow-2xl overflow-hidden">

        {/* Modal header */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-mono font-semibold text-primary flex-shrink-0">
              {paper.subject_code}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {paper.subject_name}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                {paper.exam_year} · Semester {paper.semester}
                {paper.model_set && (
                  <span className="flex items-center gap-1 text-amber-600">
                    <Tag className="w-3 h-3" /> Model Set
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={paper.drive_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open in Drive
            </a>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Iframe embed */}
        <div className="relative flex-1 bg-slate-100">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-sm">Loading paper…</p>
            </div>
          )}
          <iframe
            src={embedUrl}
            title={`${paper.subject_code} ${paper.exam_year} Past Paper`}
            className="h-full w-full border-0"
            allow="autoplay"
            onLoad={() => setLoading(false)}
          />
        </div>

        {/* Footer note */}
        <div className="border-t border-slate-100 px-5 py-2.5 flex-shrink-0">
          <p className="text-xs text-slate-400 text-center">
            Having trouble viewing?{" "}
            <a
              href={paper.drive_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              Open directly in Google Drive
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}