import type { Metadata } from "next";
import Link from "next/link";
import { SEMESTER_DEFINITIONS } from "@/lib/study-materials";
import { generatePageMetadata, buildOgImageUrl, siteConfig } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = generatePageMetadata({
  title: "Past Year Papers",
  description:
    "Access CSIT past year board exam papers and model sets for all 8 semesters. Free study resources for BSc.CSIT students at Butwal Multiple Campus.",
  canonical: `${siteConfig.url}/study-materials/semester-exam`,
  ogImage: siteConfig.defaultOgImage,
  ogImageAlt: "Past Year Papers & Model Sets - CSIT Association of BMC",
  keywords: [
    "CSIT Past Papers",
    "BSc CSIT Exam Papers",
    "CSIT Model Set",
    "TU CSIT Question Papers",
    "CSIT Semester Papers",
    "Butwal Multiple Campus CSIT",
    "CSIT Association BMC",
    "CSIT Board Exam",
  ],
});

export default function SemesterExamPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    {
      name: "Semester Exam",
      url: `${siteConfig.url}/study-materials/semester-exam`,
    },
  ]);

  return (
    <main className="bg-slate-50 py-8 sm:py-10">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <SectionHeading
          highlight="Past Year"
          title="Papers"
          subtitle="Select a semester to browse official TU board exam question papers and model sets."
        />

        {/* Semesters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {SEMESTER_DEFINITIONS.map((sem) => (
            <Link
              key={sem.number}
              href={`/study-materials/semester-exam/${sem.slug}`}
              className="group flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-7 text-center shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-sm sm:text-base font-bold text-slate-700 transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                {sem.roman}
              </span>
              <div>
                <p className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-primary transition-colors">
                  Semester {sem.number}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {sem.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
