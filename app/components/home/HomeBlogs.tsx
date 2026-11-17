import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getPublishedBlogs } from "@/lib/api/blogs";
import { resolveImageUrl } from "@/lib/images";

interface HomeBlogsProps {
  className?: string;
}

export async function HomeBlogs({ className = "" }: HomeBlogsProps) {
  try {
    const { blogs } = await getPublishedBlogs({ ordering: "-published_at" });
    const latestBlogs = (blogs || []).slice(0, 3);

    if (latestBlogs.length === 0) {
      return null;
    }

    return (
      <section className={`w-full py-12 sm:py-16 bg-white border-t border-slate-200/60 ${className}`}>
        <Container>
          <SectionHeading
            highlight="Latest"
            title="Articles & Insights"
            subtitle="Thoughts, tutorials, and community perspectives written by members and guest authors."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestBlogs.map((blog) => {
              let formattedDate = "Recent";
              try {
                if (blog.published_at || blog.created_at) {
                  formattedDate = format(
                    new Date(blog.published_at || blog.created_at || new Date()),
                    "MMM d, yyyy"
                  );
                }
              } catch {
                formattedDate = "Recent";
              }

              const featuredImg = blog.featured_image_url
                ? resolveImageUrl(blog.featured_image_url)
                : null;

              return (
                <article
                  key={blog.id || blog.slug}
                  className="group rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {featuredImg ? (
                      <div className="relative w-full aspect-[16/9] bg-slate-100 overflow-hidden">
                        <Image
                          src={featuredImg}
                          alt={blog.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-[16/9] bg-slate-100 flex items-center justify-center text-slate-400">
                        <span className="text-xs uppercase font-medium tracking-wider">
                          CSITABMC Article
                        </span>
                      </div>
                    )}

                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formattedDate}
                        </span>
                        {blog.read_time && (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {blog.read_time}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        <Link href={`/blogs/${encodeURIComponent(blog.slug)}`}>
                          {blog.title}
                        </Link>
                      </h3>

                      {blog.excerpt && (
                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0 border-t border-slate-100/80 mt-auto flex items-center justify-between text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                      <User className="w-3.5 h-3.5 text-primary" />
                      {blog.author?.name || "CSITABMC Team"}
                    </span>

                    <Link
                      href={`/blogs/${encodeURIComponent(blog.slug)}`}
                      className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-300 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-2xs"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </Link>
          </div>
        </Container>
      </section>
    );
  } catch (error) {
    console.error("Failed to load homepage blogs:", error);
    return null;
  }
}
