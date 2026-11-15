import { getEvents } from "@/lib/api/events";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { HomeEventsList } from "./HomeEventsList";

export default async function HomeEvents() {
  try {
    const { events } = await getEvents({ ordering: "-date" });

    return (
      <section className="w-full py-16 bg-gray-50">
        <Container>
          <SectionHeading
            highlight="Latest Events"
            title="Organized By CSITABMC"
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
