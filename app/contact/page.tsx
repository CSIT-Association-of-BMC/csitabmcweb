import ContactView from "./ContactView";
import { generatePageMetadata, siteConfig, buildOgImageUrl } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: `Contact Us - ${siteConfig.name}`,
  description:
    "Get in touch with CSIT Association of BMC. Contact us for workshops, events, collaborations, or any questions about our tech community in Butwal, Nepal.",
  canonical: `${siteConfig.url}/contact`,
  ogImage: siteConfig.defaultOgImage,
  ogImageAlt: "Contact CSIT Association of BMC",
  keywords: [
    "Contact CSIT Association",
    "CSITABMC Contact",
    "Tech Community Butwal",
    "Event Collaboration",
    "Workshop Inquiry",
  ],
});

export default function ContactPage() {
  return <ContactView />;
}
