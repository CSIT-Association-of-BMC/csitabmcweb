"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { EventCard } from "./EventCard";
import type { EventTypes } from "@/types/events";

export function HomeEventsList({
  initialEvents,
}: {
  initialEvents: EventTypes[];
}) {
  const { data: events } = useEvents({
    ordering: "-date",
    initialData: initialEvents,
  });

  const source = events.length > 0 ? events : initialEvents;
  const latestEvents = [...source]
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
    .slice(0, 8);

  if (latestEvents.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {latestEvents.map((event, index) => (
          <EventCard
            key={event.documentId || event.id || index}
            event={event}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
        >
          <span>View All Events</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
