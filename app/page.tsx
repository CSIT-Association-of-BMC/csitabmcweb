import HeroLander from "@/app/components/HeroLander/HeroLander";
import { HomeStatistics } from "@/app/components/home/HomeStatistics";
import { HomeWhatWeDo } from "@/app/components/home/HomeWhatWeDo";
import HomeEvents from "./events/components/HomeEvents";
import { HomeNotices } from "@/app/components/home/HomeNotices";
import CommunityPartners from "@/app/about/components/CommunityPartners";
import Testimonial from "@/app/about/components/Testimonial";
import { HomePastPapers } from "@/app/components/home/HomePastPapers";
import { HomeBlogs } from "@/app/components/home/HomeBlogs";
import { Container } from "@/components/shared/Container";
import { generatePageMetadata, siteConfig } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: `${siteConfig.name} - Student-led Tech Community in Butwal, Nepal`,
  description:
    "CSIT Association of BMC is a non-profit, student-led tech community empowering IT and CSIT students through workshops, hackathons, and tech events in Butwal, Rupandehi, Nepal.",
  canonical: siteConfig.url,
  ogImage: `${siteConfig.url}/team.jpeg`,
  ogImageAlt: "CSIT Association of BMC - Student Leadership and Tech Community at Butwal Multiple Campus",
  keywords: [
    "CSIT Association",
    "CSIT Association of BMC",
    "Butwal Multiple Campus",
    "Tech Community Nepal",
    "CSIT Students",
    "IT Students Nepal",
    "Tech Events Butwal",
    "Hackathons Nepal",
    "Workshops",
    "Rupandehi",
    "Nepal",
    "IT Events in Nepal",
    "CSIT Workshops",
    "Student Tech Community",
  ],
});

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      {/* 1. Hero: Full introduction to CSITABMC */}
      <HeroLander />

      {/* 2. Statistics: Organizational impact indicators */}
      <HomeStatistics />

      {/* 3. What We Do: Main organizational activities */}
      <HomeWhatWeDo />

      {/* 4. Featured Events: Upcoming & relevant published events */}
      <HomeEvents />

      {/* 5. Latest Notices: Compact, important announcements */}
      <HomeNotices />

      {/* 6. Brand Collaborations: Partner and collaborator logos */}
      <section className="w-full py-12 sm:py-16 bg-slate-50/60 border-t border-slate-200/60">
        <CommunityPartners className="py-0" />
      </section>

      {/* 7. Testimonials: Selected community testimonials */}
      <section className="w-full py-12 sm:py-16 bg-white border-t border-slate-200/60">
        <Container>
          <Testimonial />
        </Container>
      </section>

      {/* 8. Past Papers: Compact academic resource introduction */}
      <HomePastPapers />

      {/* 9. Latest Blogs: Latest published articles */}
      <HomeBlogs />
    </main>
  );
}
