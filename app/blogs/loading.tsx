import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { BlogListSkeleton } from "./components/BlogListSkeleton";

export default function BlogsLoading() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-10 md:py-14">
      <Container as="main">
        <SectionHeading
          highlight="Our"
          title="Articles"
          subtitle="Technical guides, roadmaps, and community stories written by members and mentors."
        />

        <hr className="border-t border-slate-200/90 my-8 sm:my-10" />

        <BlogListSkeleton count={6} />
      </Container>
    </div>
  );
}
