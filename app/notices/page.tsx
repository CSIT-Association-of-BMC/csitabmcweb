import { NoticeTypes } from "@/types/Notice";
import { NoticeList } from "./components/NoticeList";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { fetchWithToken } from "@/lib/fetch";
import QueryString from "qs";
import { generatePageMetadata, siteConfig, buildOgImageUrl } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: `Notices - ${siteConfig.name}`,
  description:
    "Stay updated with the latest notices, announcements, and important information from CSIT Association of BMC. Official updates for CSIT students at Butwal Multiple Campus.",
  canonical: `${siteConfig.url}/notices`,
  ogImage: buildOgImageUrl({
    title: "Notices",
    subtitle: "Official Announcements & Updates",
    type: "notice",
  }),
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

  const query = QueryString.stringify({
    populate: {
      image: {
        fields: ["url"],
      },
    },
    sort: ["publishedAt:desc"],
  });

  let notices: NoticeTypes[] = [];
  try {
    const res = await fetchWithToken(
      `${process.env.STRAPI_API_URL}/notices?${query}`,
    );
    if (res && res.status === 200) {
      const resJson = await res.json();
      notices = resJson.data || [];
    }
  } catch (err) {
    console.error("Error loading notices:", err);
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 md:py-14">
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          highlight="Official Notices"
          title="& Announcements"
          subtitle="Stay informed with official circulars, exam schedules, and administrative updates from CSITABMC."
        />

        {/* Section Divider */}
        <hr className="border-t border-slate-200/90 my-8 sm:my-10" />

        <NoticeList
          notices={notices}
          initialQuery={initialQuery}
          initialCategory={initialCategory}
          itemsPerPage={16}
        />
      </main>
    </div>
  );
}
