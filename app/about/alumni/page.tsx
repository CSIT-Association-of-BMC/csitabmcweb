import React from "react";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { MemberCard } from "@/components/custom/MemberCard";
import { fetchAlumniMembers } from "@/lib/team";
import { generatePageMetadata, siteConfig, buildOgImageUrl } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: `Our Alumni - ${siteConfig.name}`,
  description:
    "Recognizing the individuals who have been part of CSITABMC's journey and continue to contribute to the wider community. Explore former members and past leaders.",
  canonical: `${siteConfig.url}/about/alumni`,
  ogImage: buildOgImageUrl({
    title: "Our Alumni",
    subtitle: "Recognizing Past Members & Leaders",
    type: "page",
  }),
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
    <div className="min-h-screen bg-gray-50/50 py-10 md:py-14">
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          highlight="Our"
          title="Alumni"
          subtitle="Former Association Members"
        />

        {/* Section Divider */}
        <hr className="border-t border-slate-200/90 my-8 sm:my-10" />

        {/* Alumni Member Cards (5 per row on desktop, wider cards, centered) */}
        {alumni && alumni.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {alumni.map((member, index) => (
              <div
                key={member.id || index}
                className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.125rem)] lg:w-[calc(20%-1.25rem)] min-w-[160px] max-w-[240px]"
              >
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-14 text-center text-slate-500">
            <p className="text-base font-semibold text-slate-800">No Alumni Records Found</p>
            <p className="text-sm text-slate-500 mt-1">
              Alumni directory records are currently being compiled.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
