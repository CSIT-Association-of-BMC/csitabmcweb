import Link from "next/link";
import QueryString from "qs";
import { ArrowRight } from "lucide-react";
import { fetchWithToken } from "@/lib/fetch";
import { EventTypes } from "@/types/events";
import { EventCard } from "./EventCard";

export default async function HomeEvents() {
  const query = QueryString.stringify({
    populate: {
      image: {
        fields: ["url"],
      },
    },
  });

  try {
    const res = await fetchWithToken(
      `${process.env.STRAPI_API_URL}/events?${query}`
    );

    if (!res || res.status !== 200) {
      return null;
    }

    const resJson = await res.json();
    const eventDetails: EventTypes[] = resJson.data || [];

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
      <section className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="relative pb-2 text-2xl font-medium text-center mb-12">
            <span className="text-red-600">Latest Events</span> Organized By
            CSITA-BMC
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-60 h-[2px] bg-red-600" />
          </h2>

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
        </div>
      </section>
    );
  } catch (error) {
    console.error("Failed to load home events:", error);
    return null;
  }
}

