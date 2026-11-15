import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSemesterBySlug,
  getSubjectsForSemester,
  fetchPastPapersBySemester,
  doesPaperMatchSubject,
  SEMESTER_DEFINITIONS,
} from "@/lib/study-materials";
import { generatePageMetadata, buildOgImageUrl, siteConfig } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

interface SemesterPageProps {
  params: Promise<{
    semesterSlug: string;
  }>;
}

export async function generateStaticParams() {
  return SEMESTER_DEFINITIONS.map((sem) => ({
    semesterSlug: sem.slug,
  }));
}

export async function generateMetadata({
  params,
}: SemesterPageProps): Promise<Metadata> {
  const { semesterSlug } = await params;
  const semester = getSemesterBySlug(semesterSlug);

  if (!semester) {
    return { title: `Semester Not Found - ${siteConfig.name}` };
  }

  return generatePageMetadata({
    title: `${semester.name} Question Papers`,
    description: `Access CSIT past year board exam papers and model sets for ${semester.name}. Free study resources for BSc.CSIT students at Butwal Multiple Campus.`,
    canonical: `${siteConfig.url}/study-materials/semester-exam/${semester.slug}`,
    ogImage: buildOgImageUrl({
      title: `${semester.name} Papers`,
      subtitle: "Board Exams & Model Sets",
      type: "page",
    }),
    keywords: [
      `${semester.name} CSIT`,
      `${semester.name} Question Papers`,
      `CSIT Semester ${semester.number} Papers`,
      "Butwal Multiple Campus",
    ],
  });
}

export default async function SemesterDetailPage({ params }: SemesterPageProps) {
  const { semesterSlug } = await params;
  const semester = getSemesterBySlug(semesterSlug);

  if (!semester) {
    notFound();
  }

  // Fetch papers for this semester
  const livePapers = await fetchPastPapersBySemester(semester.number);
  const subjects = getSubjectsForSemester(semester.number);

  // Group papers count by subject using unified matcher
  const paperCountMap: Record<string, number> = {};
  subjects.forEach((subj) => {
    paperCountMap[subj.slug] = livePapers.filter((p) =>
      doesPaperMatchSubject(p, subj)
    ).length;
  });

  const totalPapers = Object.values(paperCountMap).reduce((a, b) => a + b, 0);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    {
      name: "Semester Exam",
      url: `${siteConfig.url}/study-materials/semester-exam`,
    },
    {
      name: semester.name,
      url: `${siteConfig.url}/study-materials/semester-exam/${semester.slug}`,
    },
  ]);

  return (
    <main className="bg-slate-50 py-8 sm:py-10">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-4">
        {/* Back + Heading */}
        <div className="mb-8">
          <Link
            href="/study-materials/semester-exam"
            className="mb-3 inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            All Semesters
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {semester.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {totalPapers} paper{totalPapers !== 1 ? "s" : ""} available
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {subjects.map((subj) => {
            const count = paperCountMap[subj.slug] || 0;
            return (
              <Link
                key={subj.code}
                href={`/study-materials/semester-exam/${semester.slug}/${subj.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-mono font-semibold text-primary">
                      {subj.code}
                    </span>
                    {subj.isElective && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                        Elective
                      </span>
                    )}
                  </div>

                  <h2 className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-primary transition-colors line-clamp-2">
                    {subj.name}
                  </h2>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span className="text-slate-600 font-medium">
                      {count} paper{count !== 1 ? "s" : ""}
                    </span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
