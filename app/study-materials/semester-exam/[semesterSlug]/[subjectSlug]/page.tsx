import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSemesterBySlug,
  findSubjectBySlug,
  fetchPastPapersBySemester,
  getSubjectsForSemester,
  doesPaperMatchSubject,
  SEMESTER_DEFINITIONS,
} from "@/lib/study-materials";
import { generatePageMetadata, buildOgImageUrl, siteConfig } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import { ChevronLeft } from "lucide-react";
import SubjectPapersClient from "../../_components/SubjectPapersClient";

interface SubjectPageProps {
  params: Promise<{
    semesterSlug: string;
    subjectSlug: string;
  }>;
}

export async function generateStaticParams() {
  const params: Array<{ semesterSlug: string; subjectSlug: string }> = [];
  for (const sem of SEMESTER_DEFINITIONS) {
    const subjects = getSubjectsForSemester(sem.number);
    for (const subj of subjects) {
      params.push({
        semesterSlug: sem.slug,
        subjectSlug: subj.slug,
      });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: SubjectPageProps): Promise<Metadata> {
  const { semesterSlug, subjectSlug } = await params;
  const semester = getSemesterBySlug(semesterSlug);
  if (!semester) {
    return { title: `Not Found - ${siteConfig.name}` };
  }

  const subject = findSubjectBySlug(semester.number, subjectSlug);
  if (!subject) {
    return { title: `Subject Not Found - ${siteConfig.name}` };
  }

  return generatePageMetadata({
    title: `${subject.name} Question Papers`,
    description: `Official Tribhuvan University past year question papers and model sets for ${subject.name} (${subject.code}) - ${semester.name}. Free study resources for BSc.CSIT students at Butwal Multiple Campus.`,
    canonical: `${siteConfig.url}/study-materials/semester-exam/${semester.slug}/${subject.slug}`,
    ogImage: buildOgImageUrl({
      title: `${subject.name} Papers`,
      subtitle: `${semester.name} - ${subject.code}`,
      type: "page",
    }),
    keywords: [
      `${subject.name} Past Papers`,
      `${subject.code} Question Papers`,
      `${semester.name} Papers`,
      "Butwal Multiple Campus",
    ],
  });
}

export default async function SubjectDetailPage({ params }: SubjectPageProps) {
  const { semesterSlug, subjectSlug } = await params;
  const semester = getSemesterBySlug(semesterSlug);

  if (!semester) {
    notFound();
  }

  const subject = findSubjectBySlug(semester.number, subjectSlug);

  if (!subject) {
    notFound();
  }

  // Fetch papers for this semester from backend (with sample fallback if unseeded)
  const allSemesterPapers = await fetchPastPapersBySemester(semester.number);

  // Filter papers for this specific subject using unified matcher
  const subjectPapers = allSemesterPapers.filter((p) =>
    doesPaperMatchSubject(p, subject)
  );

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
    {
      name: subject.name,
      url: `${siteConfig.url}/study-materials/semester-exam/${semester.slug}/${subject.slug}`,
    },
  ]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-4 py-10">
        {/* Back + Heading */}
        <div className="mb-8">
          <Link
            href={`/study-materials/semester-exam/${semester.slug}`}
            className="mb-3 inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to {semester.name}
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-mono font-semibold text-primary">
                  {subject.code}
                </span>
                <span className="text-xs text-slate-400">{semester.name}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                {subject.name}
              </h1>
            </div>

            <p className="text-xs text-slate-400">
              {subjectPapers.length} paper{subjectPapers.length !== 1 ? "s" : ""}{" "}
              available
            </p>
          </div>
        </div>

        {/* Papers Grid or Empty State */}
        <SubjectPapersClient
          papers={subjectPapers}
          subjectName={subject.name}
          subjectCode={subject.code}
        />
      </div>
    </main>
  );
}
