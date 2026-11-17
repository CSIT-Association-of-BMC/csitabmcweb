import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EventListSkeleton } from "./components/EventListSkeleton";

export default function EventsLoading() {
  return (
    <section className="w-full py-8 sm:py-10 bg-gray-50">
      <Container>
        <SectionHeading
          highlight="Some Events"
          title="Organized By CSITABMC"
        />

        {/* Section Divider */}
        <hr className="border-t border-slate-200/90 my-8 sm:my-10" />

        {/* Filter bar placeholder */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="h-10 bg-slate-200 rounded-lg w-full sm:w-72 animate-pulse" />
          <div className="h-10 bg-slate-200 rounded-lg w-full sm:w-48 animate-pulse" />
        </div>

        <EventListSkeleton count={8} />
      </Container>
    </section>
  );
}
