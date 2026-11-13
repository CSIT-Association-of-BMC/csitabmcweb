import { PastPaper, Semester } from "@/types/studyMaterials";

// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/past-papers/`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${token}`,   // if your API is auth-protected
//   },
//   body: JSON.stringify({
//     subject_code,
//     semester,
//     model_set,
//     exam_year,
//     drive_link,
//   }),
// });

// ─── Semesters ────────────────────────────────────────────────────────────────
// Replace with: GET /api/v1/semesters/
export const SEMESTERS: Semester[] = [
  { number: 1, label: "First Semester",   paper_count: 8 },
  { number: 2, label: "Second Semester",  paper_count: 7 },
  { number: 3, label: "Third Semester",   paper_count: 9 },
  { number: 4, label: "Fourth Semester",  paper_count: 8 },
  { number: 5, label: "Fifth Semester",   paper_count: 7 },
  { number: 6, label: "Sixth Semester",   paper_count: 8 },
  { number: 7, label: "Seventh Semester", paper_count: 6 },
  { number: 8, label: "Eighth Semester",  paper_count: 5 },
];

// ─── Past Papers ──────────────────────────────────────────────────────────────
// Replace with: GET /api/v1/past-papers/?semester=<n>
// drive_link should be a Google Drive FOLDER or FILE share link.
// The viewer converts file links to embeds automatically.
export const PAST_PAPERS: PastPaper[] = [
  // ── Semester 1 ──────────────────────────────────────────────────────────────
  {
    id: 1,
    subject_code: "CSC101",
    subject_name: "Computer Fundamentals & Applications",
    semester: 1,
    model_set: false,
    exam_year: 2024,
    drive_link: "https://drive.google.com/file/d/1672-yFZ49XqYhnMHXKt3rWf2IBqxw7xm/view?usp=sharing",
    slug: "csc101-2024-board-exam",
    created_at: "2025-01-10T10:00:00Z",
    updated_at: "2025-01-10T10:00:00Z",
  },
  {
    id: 2,
    subject_code: "CSC101",
    subject_name: "Computer Fundamentals & Applications",
    semester: 1,
    model_set: true,
    exam_year: 2024,
    drive_link: "https://drive.google.com/file/d/1BxiMVs0XRA5nFqDbmBPkuVL3bGa-DEMO/view",
    slug: "csc101-2024-model-set",
    created_at: "2025-01-10T10:00:00Z",
    updated_at: "2025-01-10T10:00:00Z",
  },
  {
    id: 3,
    subject_code: "CSC102",
    subject_name: "C Programming",
    semester: 1,
    model_set: false,
    exam_year: 2024,
    drive_link: "https://drive.google.com/file/d/1BxiMVs0XRA5nFqDbmBPkuVL3bGa-DEMO/view",
    slug: "csc102-2024-board-exam",
    created_at: "2025-01-11T10:00:00Z",
    updated_at: "2025-01-11T10:00:00Z",
  },
  {
    id: 4,
    subject_code: "CSC102",
    subject_name: "C Programming",
    semester: 1,
    model_set: false,
    exam_year: 2023,
    drive_link: "https://drive.google.com/file/d/1BxiMVs0XRA5nFqDbmBPkuVL3bGa-DEMO/view",
    slug: "csc102-2023-board-exam",
    created_at: "2025-01-11T10:00:00Z",
    updated_at: "2025-01-11T10:00:00Z",
  },
  {
    id: 5,
    subject_code: "CSC103",
    subject_name: "Digital Logic",
    semester: 1,
    model_set: false,
    exam_year: 2024,
    drive_link: "https://drive.google.com/file/d/1BxiMVs0XRA5nFqDbmBPkuVL3bGa-DEMO/view",
    slug: "csc103-2024-board-exam",
    created_at: "2025-01-12T10:00:00Z",
    updated_at: "2025-01-12T10:00:00Z",
  },

  // ── Semester 2 ──────────────────────────────────────────────────────────────
  {
    id: 6,
    subject_code: "CSC151",
    subject_name: "Object Oriented Programming",
    semester: 2,
    model_set: false,
    exam_year: 2024,
    drive_link: "https://drive.google.com/file/d/1BxiMVs0XRA5nFqDbmBPkuVL3bGa-DEMO/view",
    slug: "csc151-2024-board-exam",
    created_at: "2025-02-01T10:00:00Z",
    updated_at: "2025-02-01T10:00:00Z",
  },
  {
    id: 7,
    subject_code: "CSC152",
    subject_name: "Microprocessor",
    semester: 2,
    model_set: false,
    exam_year: 2023,
    drive_link: "https://drive.google.com/file/d/1BxiMVs0XRA5nFqDbmBPkuVL3bGa-DEMO/view",
    slug: "csc152-2023-board-exam",
    created_at: "2025-02-02T10:00:00Z",
    updated_at: "2025-02-02T10:00:00Z",
  },

  // ── Semester 3 ──────────────────────────────────────────────────────────────
  {
    id: 8,
    subject_code: "CSC201",
    subject_name: "Data Structures & Algorithms",
    semester: 3,
    model_set: false,
    exam_year: 2024,
    drive_link: "https://drive.google.com/file/d/1BxiMVs0XRA5nFqDbmBPkuVL3bGa-DEMO/view",
    slug: "csc201-2024-board-exam",
    created_at: "2025-03-01T10:00:00Z",
    updated_at: "2025-03-01T10:00:00Z",
  },
  {
    id: 9,
    subject_code: "CSC202",
    subject_name: "Computer Architecture",
    semester: 3,
    model_set: true,
    exam_year: 2024,
    drive_link: "https://drive.google.com/file/d/1BxiMVs0XRA5nFqDbmBPkuVL3bGa-DEMO/view",
    slug: "csc202-2024-model-set",
    created_at: "2025-03-02T10:00:00Z",
    updated_at: "2025-03-02T10:00:00Z",
  },

  // ── Semester 4 ──────────────────────────────────────────────────────────────
  {
    id: 10,
    subject_code: "CSC251",
    subject_name: "Operating System",
    semester: 4,
    model_set: false,
    exam_year: 2024,
    drive_link: "https://drive.google.com/file/d/1BxiMVs0XRA5nFqDbmBPkuVL3bGa-DEMO/view",
    slug: "csc251-2024-board-exam",
    created_at: "2025-04-01T10:00:00Z",
    updated_at: "2025-04-01T10:00:00Z",
  },
  {
    id: 11,
    subject_code: "CSC252",
    subject_name: "Numerical Methods",
    semester: 4,
    model_set: false,
    exam_year: 2023,
    drive_link: "https://drive.google.com/file/d/1BxiMVs0XRA5nFqDbmBPkuVL3bGa-DEMO/view",
    slug: "csc252-2023-board-exam",
    created_at: "2025-04-02T10:00:00Z",
    updated_at: "2025-04-02T10:00:00Z",
  },

  // ── Semester 5 ──────────────────────────────────────────────────────────────
  {
    id: 12,
    subject_code: "CSC301",
    subject_name: "Theory of Computation",
    semester: 5,
    model_set: false,
    exam_year: 2024,
    drive_link: "https://drive.google.com/file/d/1BxiMVs0XRA5nFqDbmBPkuVL3bGa-DEMO/view",
    slug: "csc301-2024-board-exam",
    created_at: "2025-05-01T10:00:00Z",
    updated_at: "2025-05-01T10:00:00Z",
  },

  // ── Semester 6 ──────────────────────────────────────────────────────────────
  {
    id: 13,
    subject_code: "CSC351",
    subject_name: "Computer Networks",
    semester: 6,
    model_set: false,
    exam_year: 2024,
    drive_link: "https://drive.google.com/file/d/1BxiMVs0XRA5nFqDbmBPkuVL3bGa-DEMO/view",
    slug: "csc351-2024-board-exam",
    created_at: "2025-06-01T10:00:00Z",
    updated_at: "2025-06-01T10:00:00Z",
  },

  // ── Semester 7 ──────────────────────────────────────────────────────────────
  {
    id: 14,
    subject_code: "CSC401",
    subject_name: "Artificial Intelligence",
    semester: 7,
    model_set: false,
    exam_year: 2024,
    drive_link: "https://drive.google.com/file/d/1BxiMVs0XRA5nFqDbmBPkuVL3bGa-DEMO/view",
    slug: "csc401-2024-board-exam",
    created_at: "2025-07-01T10:00:00Z",
    updated_at: "2025-07-01T10:00:00Z",
  },

  // ── Semester 8 ──────────────────────────────────────────────────────────────
  {
    id: 15,
    subject_code: "CSC451",
    subject_name: "Distributed System",
    semester: 8,
    model_set: false,
    exam_year: 2024,
    drive_link: "https://drive.google.com/file/d/1BxiMVs0XRA5nFqDbmBPkuVL3bGa-DEMO/view",
    slug: "csc451-2024-board-exam",
    created_at: "2025-08-01T10:00:00Z",
    updated_at: "2025-08-01T10:00:00Z",
  },
];

// ─── Helpers (simulate API filters) ──────────────────────────────────────────
export function getPapersBySemester(semester: number): PastPaper[] {
  return PAST_PAPERS.filter((p) => p.semester === semester);
}

export function getPaperBySlug(slug: string): PastPaper | undefined {
  return PAST_PAPERS.find((p) => p.slug === slug);
}

/**
 * Converts a Google Drive share link to an embeddable preview URL.
 * Works for:  /file/d/<ID>/view  →  /file/d/<ID>/preview
 * Falls back to the original link if it's a folder or unrecognised format.
 */
export function getDriveEmbedUrl(driveLink: string): string | null {
  const match = driveLink.match(/\/file\/d\/([^/]+)/);
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  return null; // folder link — can't embed, redirect instead
}