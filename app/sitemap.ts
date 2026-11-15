import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { SEMESTER_DEFINITIONS, getSubjectsForSemester } from "@/lib/study-materials";
import { getEventSlug, getNoticeSlug } from "@/lib/slugs";
import { fetchPublishedBlogs } from "@/lib/blogs";

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

// Static routes configuration
const staticRoutes: Array<{
    path: string;
    changeFrequency: ChangeFrequency;
    priority: number;
}> = [
        { path: "", changeFrequency: "weekly", priority: 1.0 },
        { path: "/about", changeFrequency: "monthly", priority: 0.8 },
        { path: "/events", changeFrequency: "daily", priority: 0.9 },
        { path: "/blogs", changeFrequency: "daily", priority: 0.8 },
        { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
        { path: "/notices", changeFrequency: "daily", priority: 0.8 },
        { path: "/certificate", changeFrequency: "monthly", priority: 0.5 },
        { path: "/study-materials/semester-exam", changeFrequency: "weekly", priority: 0.8 },
    ];

// Fetch with timeout to prevent build hanging
async function fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeoutMs = 5000
): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
        return await fetch(url, {
            ...options,
            signal: controller.signal,
        });
    } finally {
        clearTimeout(timeout);
    }
}

// Fetch dynamic events from Strapi
async function fetchEvents(): Promise<
    Array<{ documentId: string; title: string; slug?: string; updatedAt: string }>
> {
    const apiUrl = process.env.STRAPI_API_URL;
    const apiToken = process.env.STRAPI_API_TOKEN;

    if (!apiUrl || !apiToken) return [];

    try {
        const res = await fetch(
            `${process.env.STRAPI_API_URL}/events?fields[0]=documentId&fields[1]=title&fields[2]=slug&fields[3]=updatedAt`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN || process.env.STRAPI_API_TOKEN}`,
                },
                next: { revalidate: 3600 },
            }
        );

        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch {
        return [];
    }
}

// Fetch dynamic notices from Strapi
async function fetchNotices(): Promise<
    Array<{ documentId: string; title: string; slug?: string; updatedAt: string }>
> {
    const apiUrl = process.env.STRAPI_API_URL;
    const apiToken = process.env.STRAPI_API_TOKEN;

    if (!apiUrl || !apiToken) return [];

    try {
        const res = await fetch(
            `${process.env.STRAPI_API_URL}/notices?fields[0]=documentId&fields[1]=title&fields[2]=slug&fields[3]=updatedAt`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN || process.env.STRAPI_API_TOKEN}`,
                },
                next: { revalidate: 3600 },
            }
        );

        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch {
        return [];
    }
}

// Fetch team members from Strapi
async function fetchMembers(): Promise<
    Array<{ documentId: string; updatedAt: string }>
> {
    const apiUrl = process.env.STRAPI_API_URL;
    const apiToken = process.env.STRAPI_API_TOKEN;

    if (!apiUrl || !apiToken) return [];

    try {
        const res = await fetchWithTimeout(
            `${apiUrl}/members?fields[0]=documentId&fields[1]=updatedAt`,
            {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
                next: { revalidate: 3600 },
            }
        );

        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch {
        return [];
    }
}

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

    // Dynamic event routes
    const events = await fetchEvents();
    const eventEntries: SitemapEntry[] = events.map((event) => ({
        url: `${baseUrl}/events/${getEventSlug(event)}`,
        lastModified: new Date(event.updatedAt),
        changeFrequency: "weekly" as ChangeFrequency,
        priority: 0.7,
    }));

    // Dynamic notice routes
    const notices = await fetchNotices();
    const noticeEntries: SitemapEntry[] = notices.map((notice) => ({
        url: `${baseUrl}/notices/${getNoticeSlug(notice)}`,
        lastModified: new Date(notice.updatedAt),
        changeFrequency: "weekly" as ChangeFrequency,
        priority: 0.6,
    }));

    // Dynamic member routes
    const members = await fetchMembers();
    const memberEntries: SitemapEntry[] = members.map((member) => ({
        url: `${baseUrl}/mb/${member.documentId}`,
        lastModified: new Date(member.updatedAt),
        changeFrequency: "monthly" as ChangeFrequency,
        priority: 0.5,
    }));

    // Dynamic blog routes
    const blogs = await fetchPublishedBlogs();
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

    return [...staticEntries, ...eventEntries, ...noticeEntries, ...memberEntries, ...blogEntries, ...studyEntries];
}
