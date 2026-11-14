"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Clock, MapPin, Video, ArrowRight, X } from "lucide-react";
import Markdown from "react-markdown";
import { EventTypes } from "@/types/events";
import { cn } from "@/lib/utils";
import { startLoading } from "@/components/custom/LoadingIndicator";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(startDateStr?: Date | string, endDateStr?: Date | string | null): string {
  if (!startDateStr) return "";
  const startDate = new Date(startDateStr);
  const startMonth = MONTHS[startDate.getMonth()];
  const startDay = startDate.getDate();

  if (!endDateStr) {
    return `${startMonth} ${startDay}`;
  }

  const endDate = new Date(endDateStr);
  const endMonth = MONTHS[endDate.getMonth()];
  const endDay = endDate.getDate();

  if (startMonth === endMonth) {
    return startDay === endDay
      ? `${startMonth} ${startDay}`
      : `${startMonth} ${startDay} - ${endDay}`;
  }

  return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
}

function formatTime(startTime?: string, endTime?: string): string {
  if (!startTime) return "";

  const formatSingle = (timeStr: string) => {
    const [hourStr, minuteStr] = timeStr.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = minuteStr || "00";
    const formattedHour = hour % 12 || 12;
    const meridiem = hour < 12 ? "AM" : "PM";
    return `${formattedHour}:${minute} ${meridiem}`;
  };

  const formattedStart = formatSingle(startTime);
  if (!endTime) return formattedStart;
  const formattedEnd = formatSingle(endTime);
  return `${formattedStart} - ${formattedEnd}`;
}

export function EventCard({ event }: { event: EventTypes }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

  const formattedDate = formatDate(event.startDate, event.endDate);
  const formattedTime = formatTime(event.startTime, event.endTime);
  const eventUrl = `/events/${event.documentId}`;
  const imageUrl = event.image?.[0]?.url;
  const isVirtual = event.location === "Google Meet" || event.location?.toLowerCase().includes("online");

  const router = useRouter();

  const handleCardClick = () => {
    if (window.innerWidth < 768) {
      if (!isExpanded) {
        setIsExpanded(true);
      }
    } else {
      startLoading();
      router.push(eventUrl);
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      tabIndex={0}
      role="region"
      aria-label={event.title}
      className="relative h-full w-full overflow-hidden rounded-2xl group bg-slate-100 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
    >
      {/* Category Pill: Positioned top-right using canonical primary red token */}
      {event.category && (
        <span className="bg-primary text-primary-foreground text-xs font-semibold px-3.5 py-1 rounded-full shadow-md absolute top-3.5 right-3.5 z-20 pointer-events-none capitalize">
          {event.category}
        </span>
      )}

      {/* Natural Centered Image Presentation: equal vertical spacing when smaller than row */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={event.title}
          className="w-full h-auto block object-contain object-center mx-auto my-auto transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      ) : (
        <div className="w-full aspect-square bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-medium">
          No poster available
        </div>
      )}

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

        {/* 1. Event Title (Most prominent) */}
        <h3 className="text-base font-bold leading-snug line-clamp-2 text-white">
          {event.title}
        </h3>

        {/* 2. Date & Time */}
        {formattedDate && (
          <div className="flex items-center gap-1.5 text-xs text-slate-200 mt-2 flex-wrap">
            <Calendar className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            <span className="font-medium">{formattedDate}</span>
            {formattedTime && (
              <>
                <span className="text-slate-500">•</span>
                <Clock className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <span>{formattedTime}</span>
              </>
            )}
          </div>
        )}

        {/* 3. Location / Mode */}
        {event.location && (
          <div className="flex items-center gap-1.5 text-xs text-slate-200 mt-1.5">
            {isVirtual ? (
              <Video className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            ) : (
              <MapPin className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            )}
            <span className="truncate">{event.location}</span>
          </div>
        )}

        {/* 4. Short Summary (Markdown supported) */}
        {event.description && (
          <div className="text-xs text-slate-300 line-clamp-2 mt-1.5 leading-relaxed">
            <Markdown
              components={{
                p: ({ children }) => <span className="inline">{children}</span>,
                strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 underline hover:text-red-300"
                    onClick={(e) => e.stopPropagation()}
                  />
                ),
              }}
            >
              {event.description}
            </Markdown>
          </div>
        )}

        {/* 5. CTA Button / Link */}
        <Link
          href={eventUrl}
          onClick={(e) => e.stopPropagation()}
          className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg bg-white text-slate-900 text-xs font-semibold px-3.5 py-2 hover:bg-slate-200 hover:text-slate-950 active:bg-slate-300 transition-all duration-200 shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
        </Link>
      </div>
    </div>
  );
}
