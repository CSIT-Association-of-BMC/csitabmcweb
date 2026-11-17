import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FileText, ArrowRight } from "lucide-react";
import type { NoticeTypes } from "@/types/Notice";
import { getLocalDate } from "@/lib/data";
import { getNoticeSlug } from "@/lib/slugs";

interface RelatedNoticesProps {
  notices: NoticeTypes[];
}

export function RelatedNotices({ notices }: RelatedNoticesProps) {
  if (!notices || notices.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="recommended-notices-heading" className="w-full pt-8 mt-6 border-t border-slate-200">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <h3 id="recommended-notices-heading" className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          More notices
        </h3>
        <Link
          href="/notices"
          className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Suggested Notice Items */}
      <div className="divide-y divide-slate-100">
        {notices.map((notice, idx) => {
          const slug = getNoticeSlug(notice);
          const publishedDate = notice.publishedAt
            ? getLocalDate(notice.publishedAt)
            : "";
          const thumbnailUrl = notice.image?.[0]?.url;

          return (
            <Link
              key={notice.documentId || notice.id || idx}
              href={`/notices/${slug}`}
              className="group flex items-start gap-3.5 py-3.5 transition-colors hover:bg-slate-50/60 rounded-xl px-2 -mx-2"
            >
              {/* Document Thumbnail */}
              <div className="relative w-12 h-16 sm:w-14 sm:h-18 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200/80 flex items-center justify-center">
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl}
                    alt={notice.title}
                    fill
                    sizes="56px"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <FileText className="w-5 h-5 text-slate-400" />
                )}
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {notice.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
                  {notice.category && (
                    <>
                      <span className="capitalize">{notice.category}</span>
                      <span>·</span>
                    </>
                  )}
                  {publishedDate && <span>{publishedDate}</span>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
