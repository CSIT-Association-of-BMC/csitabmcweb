"use client";

import { PastPaper } from "@/types/studyMaterials";
import { ChevronLeft, ChevronDown, ExternalLink, Eye, Tag } from "lucide-react";
import { useState } from "react";

interface PaperListProps {
  semesterLabel: string;
  papers: PastPaper[];
  onBack: () => void;
  onView: (paper: PastPaper) => void;
}

function groupBySubject(papers: PastPaper[]): Record<string, PastPaper[]> {
  return papers.reduce<Record<string, PastPaper[]>>((acc, paper) => {
    if (!acc[paper.subject_code]) acc[paper.subject_code] = [];
    acc[paper.subject_code].push(paper);
    return acc;
  }, {});
}

export default function PaperList({ semesterLabel, papers, onBack, onView }: PaperListProps) {
  const grouped = groupBySubject(papers);
  const [openSubjects, setOpenSubjects] = useState<Set<string>>(new Set());

  const toggleSubject = (code: string) => {
    setOpenSubjects((prev) => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  };

  return (
    <section>
      {/* Back + heading */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="mb-3 inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          All Semesters
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{semesterLabel}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {papers.length} paper{papers.length !== 1 ? "s" : ""} available
        </p>
      </div>

      {/* Subject groups */}
      <div className="flex flex-col gap-3">
        {Object.entries(grouped).map(([code, subjectPapers]) => {
          const subjectName = subjectPapers[0].subject_name;
          const isOpen = openSubjects.has(code);

          return (
            <div
              key={code}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            >
              {/* Accordion header */}
              <button
                onClick={() => toggleSubject(code)}
                className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 bg-slate-50/80 hover:bg-slate-100/80 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="flex-shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-mono font-semibold text-primary">
                    {code}
                  </span>
                  <span className="text-sm font-semibold text-slate-800 truncate">
                    {subjectName}
                  </span>
                </div>
                <ChevronDown
                  className={`flex-shrink-0 w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Paper rows */}
              {isOpen && (
                <ul className="divide-y divide-slate-100 border-t border-slate-100">
                  {subjectPapers.map((paper) => (
                    <li key={paper.id} className="px-4 sm:px-5 py-3">
                      {/* Stack vertically on mobile, row on sm+ */}
                      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                        {/* Label + badge */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm text-slate-700">
                            {paper.exam_year} Board Exam
                          </span>
                          {paper.model_set && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600 whitespace-nowrap">
                              <Tag className="w-3 h-3 flex-shrink-0" />
                              Model Set
                            </span>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => onView(paper)}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#2b3870]/90 px-3 py-2 text-xs font-semibold text-white hover:bg-[#2b3870] active:bg-[#2b3870]/70 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 flex-shrink-0" />
                            View
                          </button>
                          <a
                            href={paper.drive_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900 active:bg-slate-50 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                            Drive
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}