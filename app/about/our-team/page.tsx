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
  ogImage: `${siteConfig.url}/team.jpeg`,
  ogImageAlt: "CSIT Association of BMC Executive Committee and Advisors",
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
    <div className="bg-gray-50/50 py-8 sm:py-10">
      <Container as="main">
        <SectionHeading
          highlight="Our"
          title="Team"
          subtitle="Leadership & Advisors"
        />

        {/* Section Divider */}
        <hr className="border-t border-slate-200/90 my-6 sm:my-8" />

        {/* Synchronized Tenure & Member View */}
        <TeamView tenures={tenures} />
      </Container>
    </div>
  );
}
