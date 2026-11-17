import { getPublishedBlogs, getBlogBySlug } from "@/lib/api/blogs";
import type { BlogPost } from "@/types/blogs";

export * from "@/types/blogs";

export async function fetchPublishedBlogs(): Promise<BlogPost[]> {
  const { blogs } = await getPublishedBlogs();
  return blogs;
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  const { blog } = await getBlogBySlug(slug);
  return blog;
}
