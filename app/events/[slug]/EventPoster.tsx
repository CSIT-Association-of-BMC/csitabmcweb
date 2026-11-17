"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { NoticePreviewModal } from "@/app/notices/components/NoticePreviewModal";

interface EventPosterProps {
  imageUrl?: string;
  title: string;
}

export function EventPoster({ imageUrl, title }: EventPosterProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!imageUrl || hasError) {
    return (
      <div className="w-full max-w-[340px] sm:max-w-[380px] mx-auto rounded-2xl bg-white/10 border border-white/20 p-8 flex flex-col items-center justify-center text-center text-white/70 min-h-[300px]">
        <span className="text-sm font-medium">No poster available</span>
      </div>
    );
  }

  return (
    <>
      {/* Content-adaptive poster card: natural proportions without artificial dead space */}
      <div className="relative w-fit max-w-full mx-auto rounded-2xl sm:rounded-3xl bg-white p-2 sm:p-2.5 shadow-2xl transition-all duration-300">
        <div
          onClick={() => setIsPreviewOpen(true)}
          className="relative w-fit max-w-full flex items-center justify-center cursor-pointer group select-none rounded-xl sm:rounded-2xl overflow-hidden"
          role="button"
          tabIndex={0}
          aria-label="Click to enlarge event poster"
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
            width={800}
            height={1000}
            priority
            sizes="(max-width: 768px) 90vw, 400px"
            className="w-auto h-auto max-h-[440px] max-w-full object-contain object-center rounded-xl sm:rounded-2xl block mx-auto transition-transform duration-200 group-hover:scale-[1.01]"
            onError={() => setHasError(true)}
            unoptimized={imageUrl.startsWith("http://") || imageUrl.startsWith("https://")}
          />

          {/* Top-right expand button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPreviewOpen(true);
            }}
            className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white flex items-center justify-center shadow-md transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            title="Enlarge poster"
            aria-label="Enlarge poster"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <NoticePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageUrl={imageUrl}
        title={title}
      />
    </>
  );
}
