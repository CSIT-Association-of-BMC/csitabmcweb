import { notFound, redirect, RedirectType } from "next/navigation";
import type { Metadata } from "next";
import { resolveEvent } from "@/lib/slugs";
import { generateEventMetadata, siteConfig } from "@/lib/seo";
import { EventJsonLd, BreadcrumbJsonLd } from "@/lib/structured-data";
import { EventHero } from "./EventHero";
import { EventMarkdown } from "./EventMarkdown";
import { EventSidebar } from "./EventSidebar";
import { EventSpeakers } from "./EventSpeakers";
import { Container } from "@/components/shared/Container";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { event, canonicalSlug } = await resolveEvent(slug);

  if (!event || !event.title) {
    return {
      title: `Event Not Found - ${siteConfig.name}`,
    };
  }

  const rawDescription = event.description
    ? event.description
        .replace(/^#+.*$/gm, "")
        .replace(/[*_~`#\[\]\(\)]/g, "")
        .trim()
    : "";

  return generateEventMetadata({
    title: event.title,
    description:
      rawDescription.substring(0, 160) ||
      `Join us for ${event.title}, organized by ${siteConfig.name} in Butwal, Nepal.`,
    slug: canonicalSlug || slug,
    category: event.category,
    startDate:
      event.startDate instanceof Date
        ? event.startDate.toISOString()
        : event.startDate,
    location: event.location,
    image: event.image?.[0]?.url,
  });
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const { event, shouldRedirect, canonicalSlug } = await resolveEvent(slug);

  if (!event) {
    return notFound();
  }

  // Permanent redirect to canonical slug URL if accessed via legacy document ID or title mismatch
  if (shouldRedirect && canonicalSlug && canonicalSlug !== slug) {
    redirect(`/events/${canonicalSlug}`, RedirectType.replace);
  }

  const canonicalUrl = `${siteConfig.url}/events/${canonicalSlug || slug}`;
  const posterUrl = event.image?.[0]?.url;

  return (
    <article className="min-h-screen bg-slate-50/50">
      {/* Schema.org Structured Data */}
      <EventJsonLd
        name={event.title}
        description={event.description || `Event organized by ${siteConfig.name}`}
        startDate={
          event.startDate instanceof Date
            ? event.startDate.toISOString()
            : event.startDate
        }
        endDate={
          event.endDate instanceof Date
            ? event.endDate.toISOString()
            : event.endDate || undefined
        }
        location={event.location || "Butwal Multiple Campus"}
        image={posterUrl}
        url={canonicalUrl}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Events", url: `${siteConfig.url}/events` },
          { name: event.title, url: canonicalUrl },
        ]}
      />

      {/* Hero Section */}
      <EventHero event={event} />

      {/* Main Content Layout */}
      <section className="w-full py-10 lg:py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Main Content Column: Description Card + Speakers Card */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-xs">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 tracking-tight pb-3 border-b border-slate-100">
                  About the Event
                </h2>
                <EventMarkdown content={event.description} />
              </div>

              <EventSpeakers mentors={event.mentors} />
            </div>

            {/* Structured Details Sidebar (Sticky on desktop) */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
                <EventSidebar event={event} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
