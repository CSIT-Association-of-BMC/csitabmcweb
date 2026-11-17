"use client";

import { Semester } from "@/types/studyMaterials";
import { BookOpen } from "lucide-react";

interface SemesterGridProps {
  semesters: Semester[];
  onSelect: (semester: number) => void;
}

const ordinals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export default function SemesterGrid({ semesters, onSelect }: SemesterGridProps) {
  return (
    <section>
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Past Year Papers</h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Select a semester to browse exam papers and model sets.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {semesters.map((sem) => (
          <button
            key={sem.number}
            onClick={() => onSelect(sem.number)}
            className="group flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-base font-bold text-slate-600 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
              {ordinals[sem.number - 1]}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Semester {sem.number}
              </p>
              <p className="mt-0.5 text-xs text-slate-400 flex items-center justify-center gap-1">
                <BookOpen className="w-3 h-3" />
                {sem.paper_count} papers
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}