"use client";

import { PastPaperItem } from "@/lib/study-materials";
import { Tag, FileText } from "lucide-react";

interface QuestionPaperCardProps {
  paper: PastPaperItem;
  onClick: () => void;
}

export default function QuestionPaperCard({ paper, onClick }: QuestionPaperCardProps) {
  const isModel = paper.model_set;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-primary group-hover:text-white transition-colors">
              <FileText className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-semibold text-slate-500">
              {paper.subject_code}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {isModel ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600">
                <Tag className="w-3 h-3 flex-shrink-0" />
                Model Set
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50/70 px-2 py-0.5 text-xs font-medium text-blue-700">
                Board Exam
              </span>
            )}
            {paper.is_old_course && (
              <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700 border border-purple-200/60">
                Old Course
              </span>
            )}
          </div>
        </div>

        <h3 className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-primary transition-colors">
          {paper.exam_year} {isModel ? "Model Examination" : "Board Examination"}
        </h3>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
        <span>Year {paper.exam_year}</span>
      </div>
    </div>
  );
}
