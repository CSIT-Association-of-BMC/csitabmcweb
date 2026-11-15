import { getEvents } from "@/lib/api/events";
import { EventList } from "./components/EventList";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
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

  const { events } = await getEvents({
    search: initialQuery || undefined,
    category: initialCategory !== "all" ? initialCategory : undefined,
  });

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <section className="w-full py-8 sm:py-12 bg-gray-50">
      <Container>
        <SectionHeading
          highlight="Some Events"
          title="Organized By CSITABMC"
        />

        {/* Section Divider */}
        <hr className="border-t border-slate-200/90 my-6 sm:my-8" />

        <EventList
          events={sortedEvents}
          initialQuery={initialQuery}
          initialCategory={initialCategory}
          itemsPerPage={16}
        />
      </Container>
    </section>
  );
}
