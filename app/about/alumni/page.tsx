import React from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { fetchAlumniMembers } from "@/lib/team";
import { generatePageMetadata, siteConfig, buildOgImageUrl } from "@/lib/seo";
import { AlumniView } from "./AlumniView";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: `Our Alumni - ${siteConfig.name}`,
  description:
    "Recognizing the individuals who have been part of CSITABMC's journey and continue to contribute to the wider community. Explore former members and past leaders.",
  canonical: `${siteConfig.url}/about/alumni`,
  ogImage: `${siteConfig.url}/team.jpeg`,
  ogImageAlt: "Distinguished Alumni of CSIT Association of BMC",
  keywords: [
    "CSITABMC Alumni",
    "Former Executive Members",
    "Past Leaders CSIT",
    "Butwal Multiple Campus Alumni",
  ],
});

export default async function AlumniPage() {
  const alumni = await fetchAlumniMembers();

  return (
    <div className="bg-gray-50/50 py-8 sm:py-10">
      <Container as="main">
        <SectionHeading
          highlight="Our"
          title="Alumni"
          subtitle="Former Association Members"
        />

        {/* Section Divider */}
        <hr className="border-t border-slate-200/90 my-6 sm:my-8" />

        {/* TanStack Query Hydrated Alumni View */}
        <AlumniView initialAlumni={alumni} />
      </Container>
    </div>
  );
}
