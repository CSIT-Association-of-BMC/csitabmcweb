import Link from "next/link";
import QueryString from "qs";
import { ArrowRight } from "lucide-react";
import { fetchBackendResource } from "@/lib/fetch";
import { fallbackEvents } from "@/data/events/fallback";
import { EventTypes } from "@/types/events";
import { EventCard } from "./EventCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";

export default async function HomeEvents() {
  const query = QueryString.stringify({
    populate: {
      image: {
        fields: ["url"],
      },
    },
  });

  try {
    let eventDetails: EventTypes[] = [];
    const result = await fetchBackendResource<EventTypes[]>(
      `${process.env.STRAPI_API_URL}/events?${query}`
    );

    if (!result.isAvailabilityFailure && result.data) {
      eventDetails = result.data;
    } else if (result.isAvailabilityFailure) {
      eventDetails = [...fallbackEvents];
    }

    // Sort by recency (newest start date first) and select up to 8 events
    const latestEvents = eventDetails
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      )
      .slice(0, 8);

    if (latestEvents.length === 0) {
      return null;
    }

    return (
      <section className="w-full py-16 bg-gray-50">
        <Container>
          <SectionHeading
            highlight="Latest Events"
            title="Organized By CSITABMC"
          />

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
        </Container>
      </section>
    );
  } catch (error) {
    console.error("Failed to load home events:", error);
    return null;
  }
}

