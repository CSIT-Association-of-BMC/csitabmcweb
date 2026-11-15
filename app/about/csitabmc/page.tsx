import React from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AboutSection } from "@/app/about/components/AboutSection";
import CommunityPartners from "@/app/about/components/CommunityPartners";
import Testimonial from "@/app/about/components/Testimonial";
import { Container } from "@/components/shared/Container";
import { generatePageMetadata, siteConfig, buildOgImageUrl } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: `About CSITABMC - ${siteConfig.name}`,
  description:
    "Learn about CSIT Association of BMC, a non-profit student-led tech community founded in 2016, empowering CSIT and IT students at Butwal Multiple Campus through workshops, hackathons, and mentorship.",
  canonical: `${siteConfig.url}/about/csitabmc`,
  ogImage: buildOgImageUrl({
    title: "About CSITABMC",
    subtitle: "Student-Led Community for Learners at Butwal",
    type: "page",
  }),
  keywords: [
    "About CSITABMC",
    "CSIT Association of BMC",
    "Butwal Multiple Campus",
    "Tech Community Nepal",
    "Student Organization Butwal",
    "CSIT Students Butwal",
  ],
});

export default function CSITABMCPage() {
  return (
    <div className="min-h-screen bg-white py-10 md:py-14">
      <Container as="main" className="space-y-12 sm:space-y-16">
        {/* 1. Page Header */}
        <div>
          <SectionHeading
            highlight="About"
            title="CSITABMC"
            subtitle="Student-led tech community dedicated to helping IT students learn, grow, and lead at Butwal Multiple Campus since 2016."
          />
          <hr className="border-t border-slate-200/90 my-8 sm:my-10" />
        </div>

        {/* 2. Core About Section (matches Home page font and layout exactly) */}
        <AboutSection className="py-0 px-0 md:px-0 lg:px-0" withContainer={false} />

        {/* 3. Community Partners (We Have Worked With) */}
        <section className="pt-6 border-t border-slate-200/90">
          <CommunityPartners className="py-0" withContainer={false} />
        </section>

        {/* 4. Community Testimonials */}
        <section className="pt-6 border-t border-slate-200/90">
          <Testimonial showHeader={true} />
        </section>
      </Container>
    </div>
  );
}
