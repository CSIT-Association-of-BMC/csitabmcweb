import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SEMESTER_DEFINITIONS } from "@/lib/study-materials";

interface HomePastPapersProps {
  className?: string;
}

export function HomePastPapers({ className = "" }: HomePastPapersProps) {
  const semesters = SEMESTER_DEFINITIONS || [];

  return (
    <section className={`w-full py-12 sm:py-16 bg-slate-50/60 border-t border-slate-200/60 ${className}`}>
      <Container>
        <SectionHeading
          highlight="Academic"
          title="Past Exam Papers & Model Sets"
          subtitle="Access verified Tribhuvan University BSc. CSIT board question papers, model questions, and solutions across all semesters."
        />

        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left information column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#2b3870] border border-blue-100">
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                <span>TU BSc. CSIT Academic Repository</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Exam Preparation Made Systematic & Accessible
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Browse our curated archive of previous year board exam papers, official model sets, and reference materials. Organized semester-wise to help every CSIT student prepare effectively and confidently.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>All 8 Semesters Covered</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official TU Board Questions</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Model Question Sets Included</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free & Open Digital Access</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="/study-materials/semester-exam"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2b3870] hover:bg-[#1f2a52] text-white font-medium text-sm transition-colors shadow-xs group"
                >
                  <FileText className="w-4 h-4" />
                  <span>Explore Past Question Papers</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right semester selector column */}
            <div className="lg:col-span-5 bg-slate-50/80 rounded-xl p-5 sm:p-6 border border-slate-200/80">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3.5">
                Jump to Semester Archive
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {semesters.map((sem) => (
                  <Link
                    key={sem.number}
                    href={`/study-materials/semester-exam/${sem.slug}`}
                    className="p-3 rounded-lg border border-slate-200 bg-white hover:border-primary/40 hover:bg-slate-50/80 transition-all text-left group shadow-2xs"
                  >
                    <p className="text-xs font-semibold text-slate-900 group-hover:text-primary transition-colors">
                      {sem.name}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Semester {sem.number}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
