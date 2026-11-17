export interface BlogAuthor {
  id?: number | string;
  name: string;
  slug?: string;
  image?: string | null;
}

export interface BlogSeo {
  title: string;
  description: string;
  og_title?: string;
  og_description?: string;
  og_image_url?: string | null;
}

export interface ContentImage {
  url: string;
  public_id?: string;
  alt?: string;
}

export interface BlogPost {
  id: number | string;
  reference?: string;
  title: string;
  slug: string;
  author?: BlogAuthor | null;
  author_name?: string | null;
  excerpt: string;
  content: string;
  content_images?: ContentImage[];
  featured_image_url?: string | null;
  featured_image_alt?: string;
  status: "draft" | "published";
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
  seo?: BlogSeo;
  read_time?: string;
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content ? content.trim().split(/\s+/).length : 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${Math.max(1, minutes)} min read`;
}
