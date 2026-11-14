"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Maximize2, X } from "lucide-react";
import { NoticeTypes } from "@/types/Notice";
import { getLocalDate } from "@/lib/data";
import { cn } from "@/lib/utils";
import { NoticePreviewModal } from "./NoticePreviewModal";
import { startLoading } from "@/components/custom/LoadingIndicator";

export const NoticeCardComponent = ({ notice }: { notice: NoticeTypes }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile expanded state when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isExpanded]);

  const imageUrl =
    notice.image && notice.image.length > 0 && notice.image[0].url
      ? (notice.image[0].url as string)
      : null;

  const router = useRouter();
  const noticeUrl = `/notices/${notice.documentId}`;

  const handleCardClick = () => {
    if (window.innerWidth < 768) {
      if (!isExpanded) {
        setIsExpanded(true);
      }
    } else {
      startLoading();
      router.push(noticeUrl);
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        onClick={handleCardClick}
        tabIndex={0}
        role="region"
        aria-label={notice.title}
        className="relative h-full w-full overflow-hidden rounded-2xl group border border-slate-200/90 bg-slate-50 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
      >
        {/* Category Pill: Positioned top-right using canonical primary red token */}
        {notice.category && (
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3.5 py-1 rounded-full shadow-md absolute top-3.5 right-3.5 z-20 pointer-events-none capitalize">
            {notice.category}
          </span>
        )}

        {/* Natural Document Presentation: w-full h-auto block without cropping */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={notice.title}
            className="w-full h-auto block mx-auto my-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-[3/4] bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-medium">
            No document scan available
          </div>
        )}

        {/* Hover / Focus / Touch Overlay: Frosted dark overlay */}
        <div
          className={cn(
            "absolute inset-0 z-10 bg-slate-950/85 backdrop-blur-[2px] transition-all duration-300 p-5 text-white flex flex-col justify-end",
            isExpanded
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
          )}
        >
          {/* Mobile Close Button */}
          {isExpanded && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="md:hidden absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* 1. Notice Title / Subject */}
          <h3 className="text-sm font-bold leading-snug line-clamp-3 text-white">
            {notice.title}
          </h3>

          {/* 2. Published Date */}
          {notice.publishedAt && (
            <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{getLocalDate(notice.publishedAt)}</span>
            </div>
          )}

          {/* 3. Action Button triggering Full-Screen Preview */}
          <button
            ref={triggerButtonRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (imageUrl) {
                setIsPreviewOpen(true);
              }
            }}
            className="mt-3 rounded-lg bg-white text-slate-900 text-xs font-semibold px-3.5 py-2 inline-flex items-center justify-center gap-1.5 hover:bg-slate-200 hover:text-slate-950 active:bg-slate-300 transition-all duration-200 shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>View Full Notice</span>
            <Maximize2 className="w-3.5 h-3.5 text-slate-900" />
          </button>
        </div>
      </div>

      {/* Full-Screen Interactive Lightbox Modal */}
      {imageUrl && (
        <NoticePreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          imageUrl={imageUrl}
          title={notice.title}
          triggerRef={triggerButtonRef}
        />
      )}
    </>
  );
};
