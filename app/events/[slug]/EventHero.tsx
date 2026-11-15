import Link from "next/link";
import { Calendar, Clock, MapPin, Video } from "lucide-react";
import type { EventTypes } from "@/types/events";
import { EventPoster } from "./EventPoster";
import { Container } from "@/components/shared/Container";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function formatEventDate(startDateStr?: Date | string, endDateStr?: Date | string | null): string {
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
      : `${startMonth} ${startDay} – ${endDay}`;
  }

  return `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
}

function formatEventTime(startTime?: string, endTime?: string): string {
  if (!startTime) return "";

  const formatSingle = (timeStr: string) => {
    const parts = timeStr.split(":");
    let hours = parseInt(parts[0], 10);
    const minutes = parts[1] || "00";
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const startFormatted = formatSingle(startTime);
  if (!endTime) return startFormatted;
  const endFormatted = formatSingle(endTime);
  return `${startFormatted} – ${endFormatted}`;
}

interface EventHeroProps {
  event: EventTypes;
}

export function EventHero({ event }: EventHeroProps) {
  const formattedDate = formatEventDate(event.startDate, event.endDate);
  const formattedTime = formatEventTime(event.startTime, event.endTime);
  const isVirtual =
    event.location === "Google Meet" ||
    event.location?.toLowerCase().includes("online");
  const posterUrl = event.image?.[0]?.url;

  // Derive a concise introductory excerpt that hooks visitors without repeating the full markdown body
  const summary = event.description
    ? (() => {
        const clean = event.description
          .replace(/^#+.*$/gm, "")
          .replace(/\[(.*?)\]\(.*?\)/g, "$1")
          .replace(/[*_~`]/g, "")
          .trim();
        const firstPara = clean.split("\n").find((l) => l.trim().length > 20) || "";
        const sentenceMatch = firstPara.match(/^(.*?[.!?])(?:\s|$)/);
        const sentence = sentenceMatch ? sentenceMatch[1] : firstPara;
        return sentence.length > 160 ? `${sentence.substring(0, 157)}...` : sentence;
      })()
    : "";

  return (
    <section className="relative w-full bg-[#2b3870] text-white pt-10 sm:pt-14 pb-14 sm:pb-18 overflow-hidden">
      <Container>
        {/* Breadcrumb Navigation on Hero Background */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 sm:mb-10 text-xs sm:text-sm text-slate-300/90 flex items-center space-x-2 min-w-0"
        >
          <Link
            href="/"
            className="hover:text-white transition-colors shrink-0 font-medium"
          >
            Home
          </Link>
          <span className="text-slate-400/80 shrink-0">/</span>
          <Link
            href="/events"
            className="hover:text-white transition-colors shrink-0 font-medium"
          >
            Events
          </Link>
          <span className="text-slate-400/80 shrink-0">/</span>
          <span className="text-white font-medium truncate min-w-0">
            {event.title}
          </span>
        </nav>

        {/* Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Event Title, Summary & Metadata */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {event.category && (
              <div className="mb-3.5">
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-sm">
                  {event.category}
                </span>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight sm:leading-[1.15]">
              {event.title}
            </h1>

            {summary && (
              <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed max-w-2xl mb-7">
                {summary}
              </p>
            )}

            {/* Metadata Chips */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {formattedDate && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/15">
                  <Calendar className="w-4 h-4 text-slate-300" />
                  <span>{formattedDate}</span>
                </div>
              )}

              {formattedTime && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/15">
                  <Clock className="w-4 h-4 text-slate-300" />
                  <span>{formattedTime}</span>
                </div>
              )}

              {event.location && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/15">
                  {isVirtual ? (
                    <Video className="w-4 h-4 text-slate-300" />
                  ) : (
                    <MapPin className="w-4 h-4 text-slate-300" />
                  )}
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Poster Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <EventPoster imageUrl={posterUrl} title={event.title} />
          </div>
        </div>
      </Container>
    </section>
  );
}
