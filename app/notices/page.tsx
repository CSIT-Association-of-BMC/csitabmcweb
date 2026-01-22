import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NoticeTypes } from "@/types/Notice";
import { NoticeList } from "./components/NoticeList";
import NoticeHeader from "./components/NoticeHeader";
import { fetchWithToken } from "@/lib/fetch";
import NotFound from "../not-found";
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

export default async function NoticePage() {
  const query = QueryString.stringify({
    populate: {
      image: {
        fields: ["url"],
      },
    },
    sort: ["publishedAt:desc"],
  });
  const res = await fetchWithToken(
    `${process.env.STRAPI_API_URL}/notices?${query}`,
  );
  if (!res || res.status !== 200) return <NotFound />;
  const resJson = await res.json();
  const notices: NoticeTypes[] = resJson.data;

  const allNotices = notices;
  const administrativeNotices = notices.filter(
    (notice) => notice.category === "administrative",
  );
  const academicNotices = notices.filter(
    (notice) => notice.category === "academic",
  );
  const eventsNotices = notices.filter(
    (notice) => notice.category === "events",
  );
  return (
    <>
      <NoticeHeader />
      <div className="min-h-screen bg-gray-50/50">
        <main className="container py-8">
          <div className="flex flex-col gap-6">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Notices</TabsTrigger>
                  <TabsTrigger value="administrative">
                    Administrative
                  </TabsTrigger>
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all">
                <NoticeList notices={allNotices} />
              </TabsContent>
              <TabsContent value="administrative">
                <NoticeList notices={administrativeNotices} />
              </TabsContent>
              <TabsContent value="events">
                <NoticeList notices={eventsNotices} />
              </TabsContent>
              <TabsContent value="academic">
                <NoticeList notices={academicNotices} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
}
