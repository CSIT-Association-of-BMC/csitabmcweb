import Link from "next/link";
import { notFound, redirect, RedirectType } from "next/navigation";
import type { Metadata } from "next";
import { resolveNotice } from "@/lib/slugs";
import { getRelatedNotices } from "@/lib/notices";
import { generateNoticeMetadata, siteConfig } from "@/lib/seo";
import { BreadcrumbJsonLd, NoticeJsonLd } from "@/lib/structured-data";
import { NoticeDetailPreview } from "./NoticeDetailPreview";
import { NoticeInfo } from "./NoticeInfo";
import { RelatedNotices } from "./RelatedNotices";
import { Container } from "@/components/shared/Container";

interface NoticePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: NoticePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { notice, canonicalSlug } = await resolveNotice(slug);

  if (!notice || !notice.title) {
    return {
      title: `Notice Not Found - ${siteConfig.name}`,
    };
  }

  const rawDescription = notice.description
    ? notice.description
        .replace(/^#+.*$/gm, "")
        .replace(/[*_~`#\[\]\(\)]/g, "")
        .trim()
    : "";

  return generateNoticeMetadata({
    title: notice.title,
    description: rawDescription.substring(0, 160) || `Notice issued by ${siteConfig.name}`,
    slug: canonicalSlug || slug,
    publishedAt: notice.publishedAt ? new Date(notice.publishedAt).toISOString() : undefined,
    image: notice.image?.[0]?.url,
  });
}

export default async function NoticeDetailPage({ params }: NoticePageProps) {
  const { slug } = await params;
  const { notice, shouldRedirect, canonicalSlug } = await resolveNotice(slug);

  if (!notice) {
    return notFound();
  }

  // Permanent redirect to canonical slug URL if accessed via legacy document ID
  if (shouldRedirect && canonicalSlug && canonicalSlug !== slug) {
    redirect(`/notices/${canonicalSlug}`, RedirectType.replace);
  }

  const canonicalUrl = `${siteConfig.url}/notices/${canonicalSlug || slug}`;
  const documentUrl = notice.image?.[0]?.url;

  // Fetch up to 3 contextual notice recommendations (excluding current notice)
  const relatedNotices = await getRelatedNotices(notice, 3);

  return (
    <article className="min-h-screen bg-white">
      {/* Schema.org Structured Data */}
      <NoticeJsonLd
        headline={notice.title}
        description={notice.description || `Notice issued by ${siteConfig.name}`}
        datePublished={
          notice.publishedAt
            ? new Date(notice.publishedAt).toISOString()
            : undefined
        }
        image={documentUrl}
        url={canonicalUrl}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Notices", url: `${siteConfig.url}/notices` },
          { name: notice.title, url: canonicalUrl },
        ]}
      />

      <Container className="py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <div className="text-xs sm:text-sm text-slate-500 flex items-center space-x-2 min-w-0">
            <Link href="/" className="hover:text-primary transition-colors font-medium shrink-0">
              Home
            </Link>
            <span className="text-slate-400 shrink-0">/</span>
            <Link href="/notices" className="hover:text-primary transition-colors font-medium shrink-0">
              Notices
            </Link>
            <span className="text-slate-400 shrink-0">/</span>
            <span className="text-slate-900 font-medium truncate min-w-0">
              {notice.title}
            </span>
          </div>
        </nav>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Proportional Document Preview with Lightbox Trigger */}
          <div className="lg:col-span-7">
            <NoticeDetailPreview imageUrl={documentUrl} title={notice.title} />
          </div>

          {/* Right Column: Notice Information & Contextual Recommendations */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <NoticeInfo notice={notice} />
            <RelatedNotices notices={relatedNotices} />
          </div>
        </div>
      </Container>
    </article>
  );
}
