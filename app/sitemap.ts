import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { SEMESTER_DEFINITIONS, getSubjectsForSemester } from "@/lib/study-materials";
import { getEventSlug, getNoticeSlug, slugify } from "@/lib/slugs";
import { getPublishedBlogs } from "@/lib/api/blogs";
import { getEvents } from "@/lib/api/events";
import { getNotices } from "@/lib/api/notices";
import { getMembers } from "@/lib/api/team";

export const dynamic = "force-dynamic";

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: ChangeFrequency;
  priority: number;
}

// Static routes configuration with authoritative canonical endpoints
const staticRoutes: Array<{
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about/csitabmc", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about/our-team", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about/alumni", changeFrequency: "monthly", priority: 0.7 },
  { path: "/events", changeFrequency: "daily", priority: 0.9 },
  { path: "/blogs", changeFrequency: "daily", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/notices", changeFrequency: "daily", priority: 0.8 },
  { path: "/certificate", changeFrequency: "monthly", priority: 0.5 },
  { path: "/study-materials/semester-exam", changeFrequency: "weekly", priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const now = new Date();

  // Static routes
  const staticEntries: SitemapEntry[] = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Dynamic event routes from Django API / fallback
  const { events } = await getEvents();
  const eventEntries: SitemapEntry[] = events.map((event) => ({
    url: `${baseUrl}/events/${getEventSlug(event)}`,
    lastModified:
      "updatedAt" in event && event.updatedAt
        ? new Date(event.updatedAt as string)
        : now,
    changeFrequency: "weekly" as ChangeFrequency,
    priority: 0.7,
  }));

  // Dynamic notice routes from Django API / fallback
  const { notices } = await getNotices();
  const noticeEntries: SitemapEntry[] = notices.map((notice) => ({
    url: `${baseUrl}/notices/${getNoticeSlug(notice)}`,
    lastModified:
      "updatedAt" in notice && notice.updatedAt
        ? new Date(notice.updatedAt as string)
        : now,
    changeFrequency: "weekly" as ChangeFrequency,
    priority: 0.6,
  }));

  // Dynamic member routes from Django API / fallback with canonical slugs
  const { members } = await getMembers();
  const memberEntries: SitemapEntry[] = members.map((member) => {
    const slug = member.slug || slugify(member.fullName);
    return {
      url: `${baseUrl}/mb/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as ChangeFrequency,
      priority: 0.5,
    };
  });

  // Dynamic blog routes from Django API / fallback
  const { blogs } = await getPublishedBlogs();
  const blogEntries: SitemapEntry[] = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.updated_at
      ? new Date(blog.updated_at)
      : blog.published_at
      ? new Date(blog.published_at)
      : now,
    changeFrequency: "weekly" as ChangeFrequency,
    priority: 0.7,
  }));

  // Semester exam study materials routes
  const studyEntries: SitemapEntry[] = [];
  for (const sem of SEMESTER_DEFINITIONS) {
    studyEntries.push({
      url: `${baseUrl}/study-materials/semester-exam/${sem.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as ChangeFrequency,
      priority: 0.7,
    });

    const subjects = getSubjectsForSemester(sem.number);
    for (const subj of subjects) {
      studyEntries.push({
        url: `${baseUrl}/study-materials/semester-exam/${sem.slug}/${subj.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as ChangeFrequency,
        priority: 0.6,
      });
    }
  }

  return [
    ...staticEntries,
    ...eventEntries,
    ...noticeEntries,
    ...memberEntries,
    ...blogEntries,
    ...studyEntries,
  ];
}
