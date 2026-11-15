import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TeamSkeleton } from "@/app/about/components/TeamSkeleton";

export default function OurTeamLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-10 md:py-14">
      <Container as="main">
        <SectionHeading
          highlight="Our"
          title="Team"
          subtitle="Leadership & Advisors"
        />

        {/* Section Divider */}
        <hr className="border-t border-slate-200/90 my-8 sm:my-10" />

        <TeamSkeleton />
      </Container>
    </div>
  );
}
