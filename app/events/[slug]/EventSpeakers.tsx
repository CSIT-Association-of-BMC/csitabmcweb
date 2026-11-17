import Image from "next/image";
import Link from "next/link";
import { User, ExternalLink } from "lucide-react";
import type { EventTypes } from "@/types/events";

interface EventSpeakersProps {
  mentors?: EventTypes["mentors"];
}

export function EventSpeakers({ mentors }: EventSpeakersProps) {
  if (!mentors || mentors.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="speakers-heading" className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
      <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
        <span className="w-1.5 h-5 rounded-full bg-primary inline-block" />
        <h3 id="speakers-heading" className="text-xl font-bold text-slate-900 tracking-tight">
          Speakers & Mentors
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {mentors.map((mentor, idx) => {
          const imageUrl = mentor.image?.url;
          const initials = mentor.fullName
            ? mentor.fullName
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((n) => n[0])
                .join("")
                .toUpperCase()
            : "M";

          const card = (
            <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all duration-200 group">
              {/* Speaker Avatar */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-white border-2 border-white ring-2 ring-slate-200/80 shadow-2xs shrink-0 flex items-center justify-center">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={mentor.fullName}
                    fill
                    sizes="64px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {initials || <User className="w-5 h-5" />}
                  </div>
                )}
              </div>

              {/* Speaker Info */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-primary transition-colors truncate">
                    {mentor.fullName}
                  </h4>
                  {mentor.socialLink && (
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary shrink-0 transition-colors" />
                  )}
                </div>
                {mentor.role && (
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1 leading-snug">
                    {mentor.role}
                  </p>
                )}
              </div>
            </div>
          );

          if (mentor.socialLink) {
            return (
              <Link
                key={mentor.documentId || mentor.id || idx}
                href={mentor.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl block"
              >
                {card}
              </Link>
            );
          }

          return (
            <div key={mentor.documentId || mentor.id || idx}>
              {card}
            </div>
          );
        })}
      </div>
    </section>
  );
}
