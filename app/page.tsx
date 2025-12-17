import About from "./about/page";
import Event from "./events/page";
import HeroLander from "@/components/custom/HeroLander/HeroLander";
import Testimonial from "@/components/custom/Testimonial";
import CommunityPartners from "@/components/custom/CommunityPartners";
import { generatePageMetadata, siteConfig } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: `${siteConfig.name} - Student-led Tech Community in Butwal, Nepal`,
  description:
    "CSIT Association of BMC is a non-profit, student-led tech community empowering IT and CSIT students through workshops, hackathons, and tech events in Butwal, Rupandehi, Nepal.",
  canonical: siteConfig.url,
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
    <>
      {/* <Lander/> */}
      <HeroLander />
      <About />
      <Event />
      <Testimonial />
      <CommunityPartners />
    </>
  );
}
