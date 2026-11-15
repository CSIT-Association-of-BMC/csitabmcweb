import React from "react";
import InputForm from "./InputForm";
import { generatePageMetadata, siteConfig, buildOgImageUrl } from "@/lib/seo";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/shared/Container";
import { ShieldCheck, Award } from "lucide-react";
import { BreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = generatePageMetadata({
  title: `Certificate Verification - ${siteConfig.name}`,
  description:
    "Verify your certificates from CSIT Association of BMC. Enter your certificate ID to authenticate workshop, hackathon, and event participation credentials.",
  canonical: `${siteConfig.url}/certificate`,
  ogImage: buildOgImageUrl({
    title: "Certificate Verification",
    subtitle: "Verify Credentials",
    type: "page",
  }),
  keywords: [
    "Certificate Verification",
    "CSIT Certificate",
    "Event Certificate",
    "Workshop Certificate",
    "BMC Verification",
  ],
});

export default function CertificatePage() {
  return (
    <div className="flex flex-col justify-center bg-slate-50/50 py-10 md:py-14">
      {/* Schema.org Breadcrumbs */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Certificate Verification", url: `${siteConfig.url}/certificate` },
        ]}
      />

      <Container as="main" className="max-w-4xl">
        <SectionHeading
          highlight="Verify"
          title="Your Certificate"
          subtitle="Authenticate workshop, bootcamps, and hackathon participation credentials issued by CSIT Association of BMC."
        />

        <hr className="border-t border-slate-200/90 my-8 sm:my-10" />

        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Instant Credential Lookup
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Enter your Certificate ID or verification UUID below.
              </p>
            </div>
          </div>

          <InputForm />
        </div>

        {/* Informative info box */}
        <div className="max-w-xl mx-auto mt-6 text-center">
          <p className="text-xs text-slate-500 leading-relaxed">
            Certificates issued after project evaluation are eligible for verified digital PDF download. If you face any issues verifying your credential, please contact{" "}
            <a
              href="mailto:team@csitabmc.com"
              className="text-primary font-medium hover:underline"
            >
              team@csitabmc.com
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
