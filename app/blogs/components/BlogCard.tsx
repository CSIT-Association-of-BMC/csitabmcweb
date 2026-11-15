"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ArrowRight, X } from "lucide-react";
import { format } from "date-fns";
import { BlogPost } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import { startLoading } from "@/components/shared/LoadingIndicator";
import { resolveImageUrl } from "@/lib/images";

export function BlogCard({ post }: { post: BlogPost }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const formattedDate = post.published_at
    ? format(new Date(post.published_at), "MMM d, yyyy")
    : null;
  const blogUrl = `/blogs/${post.slug}`;
  const authorName = post.author?.name || post.author_name || "CSITABMC Team";
  const initialImageUrl = resolveImageUrl(post.featured_image_url);
  const [imgSrc, setImgSrc] = useState<string | null>(initialImageUrl);

  const handleCardClick = () => {
    if (window.innerWidth < 768) {
      if (!isExpanded) {
        setIsExpanded(true);
      } else {
        startLoading();
        router.push(blogUrl);
      }
    } else {
      startLoading();
      router.push(blogUrl);
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      tabIndex={0}
      role="region"
      aria-label={post.title}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-2xl group flex items-center justify-center cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        imgSrc ? "bg-slate-100" : "bg-slate-900 border border-slate-800"
      )}
    >
      {/* 1. Image Presentation (when present) or Editorial Layout (when no image) */}
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={post.featured_image_alt || post.title}
          className="w-full h-auto block object-contain object-center mx-auto my-auto transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
          onError={() => setImgSrc(null)}
        />
      ) : (
        <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 p-6 flex flex-col justify-between text-white">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                Article
              </span>
              {formattedDate && (
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{formattedDate}</span>
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold leading-snug line-clamp-3 text-white group-hover:text-primary transition-colors">
              {post.title}
            </h3>

            <div className="text-xs text-slate-300 mt-2 font-medium truncate">
              <span>By </span>
              <span className="text-white font-semibold">{authorName}</span>
            </div>

            {post.excerpt && (
              <p className="text-xs text-slate-300 line-clamp-3 mt-3 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-semibold text-white/90">
              Read Article
            </span>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      )}

      {/* 2. Hover / Focus / Touch Overlay for cards with an image */}
      {imgSrc && (
        <div
          className={cn(
            "absolute inset-0 z-10 bg-gradient-to-t from-slate-950/95 via-slate-900/85 to-slate-900/45 backdrop-blur-[2px] transition-all duration-300 p-5 text-white flex flex-col justify-end",
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

          {/* 1. Blog Title */}
          <h3 className="text-base font-bold leading-snug line-clamp-2 text-white">
            {post.title}
          </h3>

          {/* 2. Published Date */}
          {formattedDate && (
            <div className="flex items-center gap-2 text-xs text-slate-200 mt-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <span>{formattedDate}</span>
              </span>
            </div>
          )}

          {/* 3. Author Name */}
          <div className="text-xs text-slate-300 mt-1 font-medium truncate">
            <span>By </span>
            <span className="text-white font-semibold">{authorName}</span>
          </div>

          {/* 4. Excerpt Summary */}
          {post.excerpt && (
            <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* 5. Read Article Action */}
          <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-semibold text-white/90">
              Read Article
            </span>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
