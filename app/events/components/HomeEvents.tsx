import { getEvents } from "@/lib/api/events";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { HomeEventsList } from "./HomeEventsList";

export default async function HomeEvents() {
  try {
    const { events } = await getEvents({ ordering: "-date" });

    return (
      <section className="w-full py-12 sm:py-16 bg-slate-50/60 border-t border-slate-200/60">
        <Container>
          <SectionHeading
            highlight="Featured"
            title="Events & Workshops"
            subtitle="Hands-on bootcamps, hackathons, and interactive tech sessions organized by CSITABMC."
          />

          <HomeEventsList initialEvents={events} />
        </Container>
      </section>
    );
  } catch (error) {
    console.error("Failed to load home events:", error);
    return null;
  }
}
