import QueryString from "qs";
import { fetchWithToken } from "@/lib/fetch";
import NotFound from "../not-found";
import { EventTypes } from "@/types/events";
import { EventCard } from "./components/EventCard";
import { generatePageMetadata, siteConfig, buildOgImageUrl } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: `Events - ${siteConfig.name}`,
  description:
    "Discover workshops, hackathons, seminars, and tech events organized by CSIT Association of BMC in Butwal, Nepal. Join our community events and grow your skills.",
  canonical: `${siteConfig.url}/events`,
  ogImage: buildOgImageUrl({
    title: "Events",
    subtitle: "Workshops, Hackathons & Tech Talks",
    type: "event",
  }),
  keywords: [
    "Tech Events Butwal",
    "CSIT Workshops",
    "Hackathons Nepal",
    "Student Events BMC",
    "Tech Seminars",
    "Programming Workshops",
    "CSIT Association Events",
  ],
});

export default async function Event() {
  const query = QueryString.stringify({
    populate: {
      image: {
        fields: ["url"],
      },
    },
  });

  const res = await fetchWithToken(
    `${process.env.STRAPI_API_URL}/events?${query}`
  );
  const resJson = await res.json();
  const eventDetails: EventTypes[] = resJson.data;
  if (!res || res.status !== 200) return <NotFound />;

  eventDetails.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  return (
    <section className="py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="relative pb-2 text-2xl font-medium text-center mb-12">
          <span className="text-red-600">Some Events</span> Organized By
          CSITA-BMC
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-60 h-[2px] bg-red-600" />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventDetails.map((event, index) => (
            <EventCard key={event.documentId || event.id || index} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
