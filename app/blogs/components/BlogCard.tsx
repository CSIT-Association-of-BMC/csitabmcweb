"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, ArrowRight, X } from "lucide-react";
import { format } from "date-fns";
import { BlogPost } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import { startLoading } from "@/components/custom/LoadingIndicator";

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
  const imageUrl =
    post.featured_image_url ||
    "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191227/frontendworkshop_r24n64.jpg";

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
      className="relative h-full w-full overflow-hidden rounded-2xl group bg-slate-100 flex items-center justify-center cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {/* Category Pill */}
      <span className="bg-primary text-primary-foreground text-xs font-semibold px-3.5 py-1 rounded-full shadow-md absolute top-3.5 right-3.5 z-20 pointer-events-none">
        Article
      </span>

      {/* Natural Centered Image Presentation: identical to Event/Notice cards */}
      <img
        src={imageUrl}
        alt={post.featured_image_alt || post.title}
        className="w-full h-auto block object-contain object-center mx-auto my-auto transition-transform duration-300 group-hover:scale-[1.02]"
        loading="lazy"
      />

      {/* Hover / Focus / Touch Overlay */}
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

        {/* 2. Published Date & Read Time */}
        <div className="flex items-center gap-2 text-xs text-slate-200 mt-2 flex-wrap">
          {formattedDate && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span>{formattedDate}</span>
            </span>
          )}
          {post.read_time && (
            <>
              <span className="text-slate-500">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <span>{post.read_time}</span>
              </span>
            </>
          )}
        </div>

        {/* 3. Author Name: Plain text, no profile redirect, no post */}
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
    </div>
  );
}
