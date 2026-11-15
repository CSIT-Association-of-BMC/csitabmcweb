import type { Metadata } from "next";

// =============================================================================
// Global SEO Configuration (Fallback values only)
// =============================================================================

export const siteConfig = {
    name: "CSIT Association of BMC",
    shortName: "CSITABMC",
    description:
        "CSIT Association of Butwal Multiple Campus is a non-profit, student-led tech community empowering IT and CSIT students through workshops, hackathons, and tech events in Butwal, Rupandehi, Nepal.",
    url: "https://csitabmc.com",
    ogImage: "https://csitabmc.com/api/og",
    defaultOgImage:
        "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png",
    keywords: [
        "CSIT Association",
        "CSIT Association of BMC",
        "Butwal Multiple Campus",
        "Tech Community Nepal",
        "CSIT Students",
        "IT Students Nepal",
        "Tech Events Butwal",
        "Hackathons Nepal",
        "Workshops Butwal",
        "Student Tech Community",
        "BSc CSIT",
        "CSIT Entrance",
        "Rupandehi",
        "Nepal",
    ] as string[],
    authors: [{ name: "CSIT Association of BMC", url: "https://csitabmc.com" }] as Array<{ name: string; url: string }>,
    creator: "CSIT Association of BMC",
    publisher: "CSIT Association of BMC",
    locale: "en_US",
    type: "website",
    twitterHandle: "@csitabmc",
    socialLinks: {
        facebook: "https://www.facebook.com/csitabmc",
        instagram: "https://www.instagram.com/csitabmc",
        tiktok: "https://www.tiktok.com/@csitabmc",
        linkedin: "https://np.linkedin.com/company/csitabmc",
        github: "https://github.com/CSIT-Association-of-BMC",
    },
    address: {
        street: "Butwal Multiple Campus",
        city: "Butwal",
        region: "Rupandehi",
        country: "Nepal",
        postalCode: "32900",
    },
    contact: {
        email: "team@csitabmc.com",
        phone: "+977-9841148149",
    },
};

// =============================================================================
// SEO Metadata Types
// =============================================================================

export interface PageSEO {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
    ogImage?: string;
    ogType?: "website" | "article" | "profile";
    noIndex?: boolean;
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
}

export interface EventSEO extends PageSEO {
    eventName: string;
    eventDate: string;
    eventLocation?: string;
    eventImage?: string;
}

// =============================================================================
// Dynamic OG Image URL Builder
// =============================================================================

export function buildOgImageUrl(params: {
    title: string;
    subtitle?: string;
    type?: "page" | "event" | "workshop" | "hackathon" | "notice";
}): string {
    const url = new URL(`${siteConfig.url}/api/og`);
    url.searchParams.set("title", params.title);
    if (params.subtitle) url.searchParams.set("subtitle", params.subtitle);
    if (params.type) url.searchParams.set("type", params.type);
    return url.toString();
}

// =============================================================================
// Generate Metadata Helper
// =============================================================================

export function generatePageMetadata(seo: PageSEO): Metadata {
    const title = seo.title;
    const description = seo.description || siteConfig.description;
    const canonical = seo.canonical || siteConfig.url;
    const keywords = seo.keywords?.length ? seo.keywords : siteConfig.keywords;
    const ogImage = seo.ogImage || buildOgImageUrl({ title: seo.title });

    return {
        title,
        description,
        keywords: keywords.join(", "),
        authors: siteConfig.authors,
        creator: siteConfig.creator,
        publisher: siteConfig.publisher,
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical,
        },
        openGraph: {
            type: seo.ogType || "website",
            locale: siteConfig.locale,
            url: canonical,
            title,
            description,
            siteName: siteConfig.name,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            ...(seo.publishedTime && { publishedTime: seo.publishedTime }),
            ...(seo.modifiedTime && { modifiedTime: seo.modifiedTime }),
            ...(seo.authors && { authors: seo.authors }),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
            creator: siteConfig.twitterHandle,
            site: siteConfig.twitterHandle,
        },
        robots: seo.noIndex
            ? { index: false, follow: false }
            : {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    "max-video-preview": -1,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                },
            },
    };
}

// =============================================================================
// Event-Specific Metadata Generator
// =============================================================================

export function generateEventMetadata(event: {
    title: string;
    description?: string;
    slug: string;
    category?: string;
    startDate?: string;
    location?: string;
    image?: string;
}): Metadata {
    const title = `${event.title} - ${siteConfig.name}`;
    const description =
        event.description ||
        `Join us for ${event.title}, a ${event.category || "tech event"} organized by ${siteConfig.name} in Butwal, Nepal.`;
    const canonical = `${siteConfig.url}/events/${event.slug}`;
    const ogImage =
        event.image ||
        buildOgImageUrl({
            title: event.title,
            subtitle: event.category || "Event",
            type: "event",
        });

    return generatePageMetadata({
        title,
        description,
        canonical,
        ogImage,
        ogType: "article",
        keywords: [
            event.title,
            event.category || "Tech Event",
            "CSIT Association",
            "Butwal",
            "Nepal",
            "Tech Events",
        ],
        ...(event.startDate && { publishedTime: event.startDate }),
    });
}

// =============================================================================
// Notice-Specific Metadata Generator
// =============================================================================

export function generateNoticeMetadata(notice: {
    title: string;
    description?: string;
    slug: string;
    publishedAt?: string;
    image?: string;
}): Metadata {
    const title = `${notice.title} - Notices | ${siteConfig.name}`;
    const description =
        notice.description ||
        `Official notice from ${siteConfig.name}: ${notice.title}`;
    const canonical = `${siteConfig.url}/notices/${notice.slug}`;
    const ogImage =
        notice.image ||
        buildOgImageUrl({
            title: notice.title,
            subtitle: "Notice",
            type: "notice",
        });

    return generatePageMetadata({
        title,
        description,
        canonical,
        ogImage,
        ogType: "article",
        keywords: ["Notice", "CSIT Association", "BMC", "Announcement"],
        ...(notice.publishedAt && { publishedTime: notice.publishedAt }),
    });
}

// =============================================================================
// Member Profile Metadata Generator
// =============================================================================

export function generateMemberMetadata(member: {
    fullName: string;
    post?: string;
    description?: string;
    slug: string;
    image?: string;
}): Metadata {
    const title = `${member.fullName} - ${siteConfig.name}`;
    const description =
        member.description?.substring(0, 160) ||
        `Learn about ${member.fullName}, ${member.post || "Team Member"} at ${siteConfig.name}.`;
    const canonical = `${siteConfig.url}/mb/${member.slug}`;
    const ogImage =
        member.image ||
        buildOgImageUrl({
            title: member.fullName,
            subtitle: member.post || "Team Member",
            type: "page",
        });

    return generatePageMetadata({
        title,
        description,
        canonical,
        ogImage,
        ogType: "profile",
        keywords: [member.fullName, member.post || "", "CSIT Association", "Team"],
    });
}

export function generateTenureMemberMetadata(member: {
    fullName: string;
    post?: string;
    description?: string;
    tenureSlug: string;
    tenureName: string;
    slug: string;
    image?: string;
}): Metadata {
    const title = `${member.fullName} (${member.post || "Team Member"}, ${member.tenureName}) - ${siteConfig.name}`;
    const description =
        member.description?.substring(0, 160) ||
        `Learn about ${member.fullName}, ${member.post || "Team Member"} (${member.tenureName}) at ${siteConfig.name}.`;
    const canonical = `${siteConfig.url}/mb/${member.tenureSlug}/${member.slug}`;
    const ogImage =
        member.image ||
        buildOgImageUrl({
            title: member.fullName,
            subtitle: `${member.post || "Team Member"} • ${member.tenureName}`,
            type: "page",
        });

    return generatePageMetadata({
        title,
        description,
        canonical,
        ogImage,
        ogType: "profile",
        keywords: [member.fullName, member.post || "", member.tenureName, "CSIT Association", "Team"],
    });
}

export function generateAlumniProfileMetadata(alumni: {
    fullName: string;
    graduationYear?: number | string | null;
    bio?: string;
    slug: string;
    image?: string;
}): Metadata {
    const batchText = alumni.graduationYear ? `Batch of ${alumni.graduationYear}` : "Alumni";
    const title = `${alumni.fullName} (${batchText}) - Alumni | ${siteConfig.name}`;
    const description =
        alumni.bio?.substring(0, 160) ||
        `Learn about ${alumni.fullName}, distinguished alumnus (${batchText}) of ${siteConfig.name}.`;
    const canonical = `${siteConfig.url}/al/${alumni.slug}`;
    const ogImage =
        alumni.image ||
        buildOgImageUrl({
            title: alumni.fullName,
            subtitle: `Alumni • ${batchText}`,
            type: "page",
        });

    return generatePageMetadata({
        title,
        description,
        canonical,
        ogImage,
        ogType: "profile",
        keywords: [alumni.fullName, "Alumni", batchText, "CSIT Association", "BMC"],
    });
}

// =============================================================================
// Past Paper-Specific Metadata Generator
// =============================================================================

export function generatePastPapersListMetadata(): Metadata {
  return generatePageMetadata({
    title: `Past Year Papers - ${siteConfig.name}`,
    description:
      "Access CSIT past year board exam papers and model sets for all 8 semesters. Free study resources for BSc.CSIT students at Butwal Multiple Campus.",
    canonical: `${siteConfig.url}/study-materials/past-papers`,
    ogImage: buildOgImageUrl({
      title: "Past Year Papers",
      subtitle: "Board Exams & Model Sets",
      type: "page",
    }),
    keywords: [
      "CSIT Past Papers",
      "BSc CSIT Exam Papers",
      "CSIT Model Set",
      "TU CSIT Question Papers",
      "CSIT Semester Papers",
      "Butwal Multiple Campus CSIT",
      "CSIT Association BMC",
      "CSIT Board Exam",
    ],
  });
}
 
// ── Per-paper detail page (e.g. /past-papers/csc115-2026-board-exam) ──────────
// Use this when you add individual paper detail/slug pages.
export function generatePastPaperMetadata(paper: {
  subject_code: string;
  subject_name: string;
  semester: number;
  exam_year: number;
  model_set: boolean;
  slug: string;
}): Metadata {
  const label = paper.model_set ? "Model Set" : "Board Exam";
  const title = `${paper.subject_code} ${paper.exam_year} ${label} - Semester ${paper.semester} | ${siteConfig.name}`;
  const description = `Download or view the ${paper.exam_year} ${label} question paper for ${paper.subject_name} (${paper.subject_code}), Semester ${paper.semester} of BSc.CSIT at Butwal Multiple Campus.`;
 
  return generatePageMetadata({
    title,
    description,
    canonical: `${siteConfig.url}/study-materials/past-papers/${paper.slug}`,
    ogImage: buildOgImageUrl({
      title: `${paper.subject_code} ${paper.exam_year}`,
      subtitle: `${label} · Semester ${paper.semester}`,
      type: "page",
    }),
    ogType: "article",
    keywords: [
      paper.subject_name,
      paper.subject_code,
      `Semester ${paper.semester}`,
      `${paper.exam_year} Board Exam`,
      "CSIT Past Paper",
      "BSc CSIT",
      "TU Question Paper",
      "CSIT Association BMC",
    ],
  });
}

// ── Per-blog detail page (e.g. /blogs/how-to-start-web-development) ───────────
export function generateBlogMetadata(blog: {
  title: string;
  excerpt?: string;
  slug: string;
  image?: string;
  publishedAt?: string | null;
  authorName?: string;
}): Metadata {
  const title = `${blog.title} - ${siteConfig.name}`;
  const description =
    blog.excerpt ||
    `Read ${blog.title} on CSIT Association of BMC. Explore tutorials, student tech insights, and community stories.`;
  const canonical = `${siteConfig.url}/blogs/${blog.slug}`;

  return generatePageMetadata({
    title,
    description,
    canonical,
    ogImage:
      blog.image ||
      buildOgImageUrl({
        title: blog.title,
        subtitle: blog.authorName ? `By ${blog.authorName}` : "CSITABMC Blog",
        type: "page",
      }),
    ogType: "article",
    publishedTime: blog.publishedAt || undefined,
    authors: blog.authorName ? [blog.authorName] : undefined,
    keywords: [
      "CSIT Blog",
      "CSIT Association Article",
      "Tech Blog Butwal",
      "BSc CSIT Insights",
      "Student Tech Community Nepal",
    ],
  });
}