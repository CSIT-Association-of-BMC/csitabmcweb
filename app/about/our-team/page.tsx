import React from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TeamView } from "./TeamView";
import { Container } from "@/components/shared/Container";
import { fetchTenuresWithMembers } from "@/lib/team";
import { generatePageMetadata, siteConfig, buildOgImageUrl } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: `Our Team - ${siteConfig.name}`,
  description:
    "Meet the people who lead, guide, and contribute to CSITABMC across different tenures. Explore executive committee members and faculty advisors.",
  canonical: `${siteConfig.url}/about/our-team`,
  ogImage: buildOgImageUrl({
    title: "Our Team",
    subtitle: "Leadership & Advisors Across Tenures",
    type: "page",
  }),
  keywords: [
    "CSITABMC Team",
    "Executive Committee",
    "CSIT Association Leadership",
    "Advisors",
    "Butwal Multiple Campus CSIT",
  ],
});

export default async function OurTeamPage() {
  const tenures = await fetchTenuresWithMembers();

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 md:py-14">
      <Container as="main">
        <SectionHeading
          highlight="Our"
          title="Team"
          subtitle="Leadership & Advisors"
        />

        {/* Section Divider */}
        <hr className="border-t border-slate-200/90 my-8 sm:my-10" />

        {/* Synchronized Tenure & Member View */}
        <TeamView tenures={tenures} />
      </Container>
    </div>
  );
}
