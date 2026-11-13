"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { NoticePreviewModal } from "@/app/notices/components/NoticePreviewModal";

interface NoticeDetailImageProps {
  imageUrl: string;
  title: string;
}

export function NoticeDetailImage({ imageUrl, title }: NoticeDetailImageProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsPreviewOpen(true)}
        className="relative h-[300px] md:h-[30rem] cursor-pointer group overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        tabIndex={0}
        role="button"
        aria-label="Click to view full document in full screen"
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
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg transition-opacity group-hover:from-black/70" />

        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-medium opacity-80 group-hover:opacity-100 transition-opacity shadow-sm">
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Click to preview</span>
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

