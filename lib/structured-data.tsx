import { siteConfig } from "@/lib/seo";

// =============================================================================
// JSON-LD Structured Data Types
// =============================================================================

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  alternateName?: string;
  url: string;
  logo: string;
  description: string;
  email?: string;
  telephone?: string;
  address?: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
    postalCode: string;
  };
  sameAs?: string[];
  foundingDate?: string;
  areaServed?: string;
}

export interface EventSchema {
  "@context": "https://schema.org";
  "@type": "Event";
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: {
    "@type": "Place" | "VirtualLocation";
    name?: string;
    address?: string;
    url?: string;
  };
  image?: string;
  organizer: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  eventStatus?: string;
  eventAttendanceMode?: string;
  offers?: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
}

export interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface WebsiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  potentialAction?: {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  };
}

// =============================================================================
// JSON-LD Schema Generators
// =============================================================================

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: siteConfig.defaultOgImage,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
      postalCode: siteConfig.address.postalCode,
    },
    sameAs: [
      siteConfig.socialLinks.facebook,
      siteConfig.socialLinks.instagram,
      siteConfig.socialLinks.linkedin,
      siteConfig.socialLinks.github,
    ],
    foundingDate: "2016",
    areaServed: "Nepal",
  };
}

export function generateWebsiteSchema(): WebsiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.defaultOgImage,
      },
    },
  };
}

export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  isVirtual?: boolean;
  image?: string;
  url: string;
  isFree?: boolean;
  price?: number;
}): EventSchema {
  const baseSchema: EventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    image: event.image || siteConfig.defaultOgImage,
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: event.isVirtual
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
  };

  if (event.endDate) {
    baseSchema.endDate = event.endDate;
  }

  if (event.location) {
    baseSchema.location = event.isVirtual
      ? {
          "@type": "VirtualLocation",
          url: event.url,
        }
      : {
          "@type": "Place",
          name: event.location,
          address: `${event.location}, Butwal, Nepal`,
        };
  }

  if (event.isFree !== undefined) {
    baseSchema.offers = {
      "@type": "Offer",
      price: event.isFree ? "0" : String(event.price || 0),
      priceCurrency: "NPR",
      availability: "https://schema.org/InStock",
      url: event.url,
    };
  }

  return baseSchema;
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

export function generateNoticeSchema(notice: {
  headline: string;
  description: string;
  datePublished?: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: notice.headline,
    description: notice.description,
    ...(notice.datePublished && { datePublished: notice.datePublished }),
    ...(notice.image && { image: notice.image }),
    url: notice.url,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.defaultOgImage,
      },
    },
  };
}

// =============================================================================
// JSON-LD Script Component
// =============================================================================

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

// =============================================================================
// Pre-built JSON-LD Components
// =============================================================================

export function OrganizationJsonLd() {
  return <JsonLd data={generateOrganizationSchema()} />;
}

export function WebsiteJsonLd() {
  return <JsonLd data={generateWebsiteSchema()} />;
}

export function EventJsonLd(props: Parameters<typeof generateEventSchema>[0]) {
  return <JsonLd data={generateEventSchema(props)} />;
}

export function BreadcrumbJsonLd(props: {
  items: Array<{ name: string; url?: string }>;
}) {
  return <JsonLd data={generateBreadcrumbSchema(props.items)} />;
}

export function NoticeJsonLd(props: Parameters<typeof generateNoticeSchema>[0]) {
  return <JsonLd data={generateNoticeSchema(props)} />;
}

export interface BlogPostingSchema {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    "@type": "Person";
    name: string;
    url?: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
}

export function generateBlogPostingSchema(props: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  authorSlug?: string;
}): BlogPostingSchema {
  const url = `${siteConfig.url}/blogs/${props.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: props.title,
    description: props.description,
    image: props.image || siteConfig.defaultOgImage,
    datePublished: props.datePublished,
    dateModified: props.dateModified || props.datePublished,
    author: props.authorName
      ? {
          "@type": "Person",
          name: props.authorName,
          url: props.authorSlug
            ? `${siteConfig.url}/mb/${props.authorSlug}`
            : undefined,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function BlogJsonLd(
  props: Parameters<typeof generateBlogPostingSchema>[0]
) {
  return <JsonLd data={generateBlogPostingSchema(props)} />;
}
