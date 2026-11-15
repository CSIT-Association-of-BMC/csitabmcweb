import React from "react";
import { Download, Calendar } from "lucide-react";
import Markdown from "react-markdown";
import type { NoticeTypes } from "@/types/Notice";
import { getLocalDate } from "@/lib/data";

interface NoticeInfoProps {
  notice: NoticeTypes;
}

export function NoticeInfo({ notice }: NoticeInfoProps) {
  const publishedDate = notice.publishedAt
    ? getLocalDate(notice.publishedAt)
    : "";

  const downloadUrl = notice.image?.[0]?.url;

  return (
    <div className="flex flex-col">
      {/* Category Badge */}
      {notice.category && (
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/80 capitalize">
            {notice.category}
          </span>
        </div>
      )}

      {/* Notice Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-snug tracking-tight mb-4">
        {notice.title}
      </h1>

      {/* Published Date */}
      {publishedDate && (
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-6">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Published {publishedDate}</span>
        </div>
      )}

      {/* Notice Description / Body */}
      {notice.description && (
        <div className="text-base text-slate-700 leading-relaxed mb-8 space-y-4">
          <Markdown
            components={{
              p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc pl-5 space-y-1.5 mb-4 text-slate-700">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-5 space-y-1.5 mb-4 text-slate-700">{children}</ol>
              ),
              li: ({ children }) => <li className="pl-1">{children}</li>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline underline-offset-4 font-medium"
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-slate-900">{children}</strong>
              ),
            }}
          >
            {notice.description}
          </Markdown>
        </div>
      )}

      {/* Download Action */}
      {downloadUrl && (
        <div className="mb-10">
          <a
            href={downloadUrl}
            download={`${notice.title || "notice"}.jpg`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-sm transition-all shadow-primary/20 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Download className="w-4 h-4" />
            <span>Download notice</span>
          </a>
        </div>
      )}
    </div>
  );
}
