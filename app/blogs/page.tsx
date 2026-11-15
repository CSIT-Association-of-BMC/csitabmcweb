import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { fetchPublishedBlogs } from "@/lib/blogs";
import { generatePageMetadata, siteConfig, buildOgImageUrl } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/structured-data";
import { BlogCard } from "./components/BlogCard";

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
    <div className="min-h-screen bg-slate-50/50 py-10 md:py-14">
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

        <hr className="border-t border-slate-200/90 my-8 sm:my-10" />

        {blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500">
            <p className="text-base font-semibold text-slate-800">
              No Articles Published Yet
            </p>
            <p className="text-sm text-slate-500 mt-1">
              New community guides and technical writeups will appear here soon.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
