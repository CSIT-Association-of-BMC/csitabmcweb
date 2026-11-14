"use client";

import { useState } from "react";
import { EventTypes } from "@/types/events";
import { EventCard } from "./EventCard";
import { SharedPagination } from "@/components/custom/SharedPagination";

interface EventListProps {
  events: EventTypes[];
  itemsPerPage?: number;
}

export function EventList({ events, itemsPerPage = 16 }: EventListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = events.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentEvents.map((event, index) => (
          <EventCard key={event.documentId || event.id || index} event={event} />
        ))}
      </div>

      <SharedPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

