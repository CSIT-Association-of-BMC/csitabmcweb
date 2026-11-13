"use client";

import { useState } from "react";
import { PastPaperItem } from "@/lib/study-materials";
import QuestionPaperCard from "./QuestionPaperCard";
import QuestionPaperViewer from "./QuestionPaperViewer";
import { FileQuestion, AlertCircle } from "lucide-react";

interface SubjectPapersClientProps {
  papers: PastPaperItem[];
  subjectName: string;
  subjectCode: string;
}

export default function SubjectPapersClient({
  papers,
  subjectName,
  subjectCode,
}: SubjectPapersClientProps) {
  const [viewingPaper, setViewingPaper] = useState<PastPaperItem | null>(null);

  if (!papers || papers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 mb-3 border border-slate-100">
          <FileQuestion className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">
          No Question Papers Uploaded Yet
        </h3>
        <p className="mt-1.5 text-sm text-slate-500 max-w-md">
          Past year examination papers and model sets for <strong>{subjectName} ({subjectCode})</strong> have not yet been published by the academic committee.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-600 border border-slate-200">
          <AlertCircle className="w-4 h-4 text-primary" />
          Check back soon or contact association leads to request this paper.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {papers.map((paper) => (
          <QuestionPaperCard
            key={paper.id || `${paper.subject_code}-${paper.exam_year}-${paper.model_set}`}
            paper={paper}
            onClick={() => setViewingPaper(paper)}
          />
        ))}
      </div>

      <QuestionPaperViewer
        paper={viewingPaper}
        onClose={() => setViewingPaper(null)}
      />
    </>
  );
}

