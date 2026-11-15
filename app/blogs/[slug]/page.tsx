import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Calendar, Clock, ChevronRight, ArrowRight } from "lucide-react";
import { fetchBlogBySlug, fetchPublishedBlogs } from "@/lib/blogs";
import { generateBlogMetadata, siteConfig } from "@/lib/seo";
import { BlogJsonLd, BreadcrumbJsonLd } from "@/lib/structured-data";
import { BlogMarkdown } from "./BlogMarkdown";
import { BlogCard } from "../components/BlogCard";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog || blog.status !== "published") {
    return {
      title: `Article Not Found - ${siteConfig.name}`,
    };
  }

  const authorName = blog.author?.name || blog.author_name || undefined;

  return generateBlogMetadata({
    title: blog.title,
    excerpt: blog.seo?.description || blog.excerpt,
    slug: blog.slug,
    image: blog.featured_image_url || undefined,
    publishedAt: blog.published_at || undefined,
    authorName,
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const [blog, allBlogs] = await Promise.all([
    fetchBlogBySlug(slug),
    fetchPublishedBlogs(),
  ]);

  if (!blog || blog.status !== "published") {
    return notFound();
  }

  const authorName = blog.author?.name || blog.author_name || "CSITABMC Team";
  const formattedDate = blog.published_at
    ? format(new Date(blog.published_at), "MMMM d, yyyy")
    : null;
  const canonicalUrl = `${siteConfig.url}/blogs/${blog.slug}`;

  // Recommendations: Other published blogs excluding current one
  const recommendations = allBlogs
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 3);

  return (
    <article className="min-h-screen bg-slate-50/60 pb-16">
      {/* Schema.org Structured Data */}
      <BlogJsonLd
        title={blog.title}
        description={blog.seo?.description || blog.excerpt}
        slug={blog.slug}
        image={blog.featured_image_url || undefined}
        datePublished={blog.published_at || undefined}
        dateModified={blog.updated_at || blog.published_at || undefined}
        authorName={authorName}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Blogs", url: `${siteConfig.url}/blogs` },
          { name: blog.title, url: canonicalUrl },
        ]}
      />

      {/* Header Container */}
      <header className="pt-8 sm:pt-12 pb-6 sm:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 mb-6 flex-wrap"
          >
            <Link
              href="/"
              className="hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link
              href="/blogs"
              className="hover:text-primary transition-colors font-medium"
            >
              Blogs
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span
              className="text-slate-800 font-medium truncate max-w-[200px] sm:max-w-sm"
              title={blog.title}
            >
              {blog.title}
            </span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18] mb-6">
            {blog.title}
          </h1>

          {/* Excerpt / Lead */}
          {blog.excerpt && (
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-6 font-normal">
              {blog.excerpt}
            </p>
          )}

          {/* Metadata Row: Shows author avatar image + name (no profile redirect, no post/designation), date & read time */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200/90 text-sm">
            <div className="flex items-center gap-3">
              {blog.author?.image ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 ring-2 ring-slate-100 shrink-0">
                  <Image
                    src={blog.author.image}
                    alt={authorName}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm ring-2 ring-slate-100 shrink-0">
                  {authorName.charAt(0)}
                </div>
              )}
              <div className="font-semibold text-slate-900 text-sm sm:text-base">
                {authorName}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 font-medium">
              {formattedDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{formattedDate}</span>
                </span>
              )}
              {blog.read_time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{blog.read_time}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Featured Cover Image: Full view without cropping or zooming */}
      {blog.featured_image_url && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100/70 border border-slate-200/80 shadow-xs p-2 sm:p-4 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.featured_image_url}
              alt={blog.featured_image_alt || blog.title}
              className="w-full h-auto max-h-[640px] object-contain rounded-xl sm:rounded-2xl mx-auto"
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* Main Article Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-10 lg:p-12 shadow-xs">
          <BlogMarkdown content={blog.content} />
        </div>

        {/* Recommended Articles Section */}
        {recommendations.length > 0 && (
          <section className="mt-14 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                  More to explore
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Recommended Articles
                </h3>
              </div>

              <Link
                href="/blogs"
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-primary transition-colors shrink-0"
              >
                <span>View all articles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((item) => (
                <BlogCard key={item.id} post={item} />
              ))}
            </div>
          </section>
        )}
      </main>
    </article>
  );
}
