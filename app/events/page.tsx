import QueryString from "qs";
import { fetchWithToken } from "@/lib/fetch";
import { EventTypes } from "@/types/events";
import { EventList } from "./components/EventList";
import { SectionHeading } from "@/components/custom/SectionHeading";
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

interface EventPageProps {
  searchParams?: Promise<{ q?: string; query?: string; category?: string }>;
}

export default async function Event({ searchParams }: EventPageProps) {
  const params = await searchParams;
  const initialQuery = params?.q || params?.query || "";
  const initialCategory = params?.category || "all";

  const query = QueryString.stringify({
    populate: {
      image: {
        fields: ["url"],
      },
    },
  });

  let eventDetails: EventTypes[] = [];
  try {
    const res = await fetchWithToken(
      `${process.env.STRAPI_API_URL}/events?${query}`
    );
    if (res && res.status === 200) {
      const resJson = await res.json();
      eventDetails = resJson.data || [];
    }
  } catch (err) {
    console.error("Error loading events:", err);
  }

  eventDetails.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <section className="py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          highlight="Some Events"
          title="Organized By CSITABMC"
        />

        {/* Section Divider */}
        <hr className="border-t border-slate-200/90 my-8 sm:my-10" />

        <EventList
          events={eventDetails}
          initialQuery={initialQuery}
          initialCategory={initialCategory}
          itemsPerPage={16}
        />
      </div>
    </section>
  );
}
