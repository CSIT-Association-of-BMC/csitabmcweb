import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, MapPin } from "lucide-react";
import type { EventTypes } from "@/types/events";
import { getEventSlug } from "@/lib/slugs";
import { SectionHeading } from "@/components/shared/SectionHeading";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function formatEventCardDate(startDateStr?: Date | string): string {
  if (!startDateStr) return "";
  const date = new Date(startDateStr);
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

interface RelatedEventsProps {
  events: EventTypes[];
}

export function RelatedEvents({ events }: RelatedEventsProps) {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-events-heading" className="w-full pt-14 mt-14 border-t border-slate-200">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <SectionHeading
          align="left"
          highlight="More to explore"
          title="Related Events"
          subtitle="Discover other workshops, hackathons, and sessions organized by CSITABMC."
          className="mb-0"
        />

        <Link
          href="/events"
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-primary transition-colors shrink-0 mb-1"
        >
          <span>View all events</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* High-End Recommendation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, idx) => {
          const slug = getEventSlug(event);
          const dateStr = formatEventCardDate(event.startDate);
          const imageUrl = event.image?.[0]?.url;

          return (
            <Link
              key={event.documentId || event.id || idx}
              href={`/events/${slug}`}
              className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-3.5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {/* Poster Banner */}
              <div className="relative aspect-[16/10] w-full bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="text-xs text-slate-400 font-medium">No poster available</div>
                )}

                {/* Floating Category Pill */}
                {event.category && (
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/95 text-slate-900 shadow-xs backdrop-blur-xs">
                      {event.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2.5">
                    {event.title}
                  </h4>

                  <div className="space-y-1.5 mb-3">
                    {dateStr && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{dateStr}</span>
                      </div>
                    )}

                    {event.location && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium line-clamp-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>View event details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
