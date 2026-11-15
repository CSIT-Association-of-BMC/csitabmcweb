import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { fetchPublishedBlogs } from "@/lib/blogs";
import { generatePageMetadata, siteConfig, buildOgImageUrl } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/structured-data";
import { BlogListView } from "./components/BlogListView";

export const metadata: Metadata = generatePageMetadata({
  title: `Articles & Stories - ${siteConfig.name}`,
  description:
    "Explore practical engineering roadmaps, student tutorials, and tech stories from the CSIT Association of Butwal Multiple Campus.",
  canonical: `${siteConfig.url}/blogs`,
  ogImage: buildOgImageUrl({
    title: "Articles & Stories",
    subtitle: "CSITABMC Community Blog",
    type: "page",
  }),
  keywords: [
    "CSIT Blog",
    "CSITABMC Articles",
    "Tech Roadmaps Nepal",
    "Butwal Tech Community",
    "Student Engineering Blog",
  ],
});

export default async function BlogsPage() {
  const blogs = await fetchPublishedBlogs();

  return (
    <div className="bg-slate-50/50 py-8 sm:py-10">
      {/* Structured Breadcrumb Schema */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Blogs", url: `${siteConfig.url}/blogs` },
        ]}
      />

      <Container as="main">
        <SectionHeading
          highlight="Our"
          title="Articles"
          subtitle="Technical guides, roadmaps, and community stories written by members and mentors."
        />

        <hr className="border-t border-slate-200/90 my-6 sm:my-8" />

        {/* TanStack Query Hydrated Blog List */}
        <BlogListView initialBlogs={blogs} />
      </Container>
    </div>
  );
}
