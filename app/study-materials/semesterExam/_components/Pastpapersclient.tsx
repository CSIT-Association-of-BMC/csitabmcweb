"use client";

import { useState } from "react";
import { PastPaper, Semester } from "@/types/studyMaterials";
import { getPapersBySemester } from "./data";
import SemesterGrid from "./Semestergrid";
import PaperList from "./Paperlist";
import PaperViewer from "./Paperviewer";

interface PastPapersClientProps {
  semesters: Semester[];
}

export default function PastPapersClient({ semesters }: PastPapersClientProps) {
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [viewingPaper, setViewingPaper] = useState<PastPaper | null>(null);

  const activeSemester = semesters.find((s) => s.number === selectedSemester);
  const papers = selectedSemester ? getPapersBySemester(selectedSemester) : [];

  return (
    <>
      {selectedSemester === null ? (
        <SemesterGrid semesters={semesters} onSelect={setSelectedSemester} />
      ) : (
        <PaperList
          semesterLabel={activeSemester?.label ?? `Semester ${selectedSemester}`}
          papers={papers}
          onBack={() => setSelectedSemester(null)}
          onView={setViewingPaper}
        />
      )}

      {viewingPaper && (
        <PaperViewer paper={viewingPaper} onClose={() => setViewingPaper(null)} />
      )}
    </>
  );
}