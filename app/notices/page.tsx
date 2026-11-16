import { NoticeTypes } from "@/types/Notice";
import { NoticeList } from "./components/NoticeList";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { getNotices } from "@/lib/api/notices";
import { generatePageMetadata, siteConfig, buildOgImageUrl } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: `Notices - ${siteConfig.name}`,
  description:
    "Stay updated with the latest notices, announcements, and important information from CSIT Association of BMC. Official updates for CSIT students at Butwal Multiple Campus.",
  canonical: `${siteConfig.url}/notices`,
  ogImage: siteConfig.defaultOgImage,
  ogImageAlt: "Official Notices & Announcements - CSIT Association of BMC",
  keywords: [
    "CSIT Notices",
    "BMC Announcements",
    "Student Updates",
    "CSIT Association News",
    "Butwal Campus Notices",
  ],
});

interface NoticePageProps {
  searchParams?: Promise<{ q?: string; query?: string; category?: string }>;
}

export default async function NoticePage({ searchParams }: NoticePageProps) {
  const params = await searchParams;
  const initialQuery = params?.q || params?.query || "";
  const initialCategory = params?.category || "all";

  const { notices } = await getNotices({
    search: initialQuery || undefined,
    category: initialCategory !== "all" ? initialCategory : undefined,
    ordering: "-created_at",
  });

  return (
    <div className="bg-gray-50/50 py-8 sm:py-10">
      <Container as="main">
        <SectionHeading
          highlight="Official Notices"
          title="& Announcements"
          subtitle="Stay informed with official circulars, exam schedules, and administrative updates from CSITABMC."
        />

        {/* Section Divider */}
        <hr className="border-t border-slate-200/90 my-6 sm:my-8" />

        <NoticeList
          notices={notices}
          initialQuery={initialQuery}
          initialCategory={initialCategory}
          itemsPerPage={16}
        />
      </Container>
    </div>
  );
}
