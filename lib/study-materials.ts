/**
 * CSIT Study Materials & Past Papers Domain Utilities
 * CSIT Association of Butwal Multiple Campus
 */
import { getPastPapers } from "@/lib/api/study-materials";

export interface PastPaperItem {
  id: number;
  subject_code: string;
  subject_name: string;
  semester: number;
  model_set: boolean;
  is_old_course: boolean;
  exam_year: number;
  drive_link: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export interface SubjectMeta {
  code: string;
  name: string;
  semester: number;
  slug: string;
  isElective?: boolean;
  isOldCourse?: boolean;
}

export interface SemesterDefinition {
  number: number;
  slug: string;
  name: string;
  roman: string;
  description: string;
}

// ─── Canonical Semesters ─────────────────────────────────────────────────────

export const SEMESTER_DEFINITIONS: SemesterDefinition[] = [
  {
    number: 1,
    slug: "first-semester",
    name: "First Semester",
    roman: "I",
    description: "Foundational computing, programming, digital logic, and calculus.",
  },
  {
    number: 2,
    slug: "second-semester",
    name: "Second Semester",
    roman: "II",
    description: "Object-oriented programming, discrete structures, and microprocessors.",
  },
  {
    number: 3,
    slug: "third-semester",
    name: "Third Semester",
    roman: "III",
    description: "Data structures, computer graphics, architecture, and numerical methods.",
  },
  {
    number: 4,
    slug: "fourth-semester",
    name: "Fourth Semester",
    roman: "IV",
    description: "Theory of computation, operating systems, DBMS, and computer networks.",
  },
  {
    number: 5,
    slug: "fifth-semester",
    name: "Fifth Semester",
    roman: "V",
    description: "Design & analysis of algorithms, system analysis, cryptography, and web technology.",
  },
  {
    number: 6,
    slug: "sixth-semester",
    name: "Sixth Semester",
    roman: "VI",
    description: "Software engineering, compiler design, e-governance, and technical writing.",
  },
  {
    number: 7,
    slug: "seventh-semester",
    name: "Seventh Semester",
    roman: "VII",
    description: "Advanced Java programming, data warehousing & mining, and project work.",
  },
  {
    number: 8,
    slug: "eighth-semester",
    name: "Eighth Semester",
    roman: "VIII",
    description: "Advanced database systems, internships, cloud computing, and network systems.",
  },
];

export function getSemesterBySlug(slug: string): SemesterDefinition | undefined {
  const normalized = slug?.toLowerCase().trim();
  return SEMESTER_DEFINITIONS.find((s) => s.slug === normalized);
}

export function getSemesterByNumber(number: number): SemesterDefinition | undefined {
  return SEMESTER_DEFINITIONS.find((s) => s.number === number);
}

// ─── Canonical Subject Code Map ──────────────────────────────────────────────

export const SUBJECT_CODE_MAP: Record<string, string> = {
  // First Semester
  CSC101: "Computer Fundamentals & Applications",
  CSC114: "Introduction to Information Technology",
  CSC102: "C Programming",
  CSC115: "C Programming",
  CSC103: "Digital Logic",
  CSC116: "Digital Logic",
  MTH117: "Mathematics I",
  PHY118: "Physics",

  // Second Semester
  CSC151: "Object Oriented Programming (C++)",
  CSC165: "Discrete Structures",
  CSC166: "Object Oriented Programming (C++)",
  CSC152: "Microprocessor",
  CSC167: "Microprocessor",
  MTH168: "Mathematics II",
  STA169: "Statistics I",

  // Third Semester
  CSC201: "Data Structures & Algorithms",
  CSC211: "Data Structures & Algorithms",
  CSC212: "Numerical Methods",
  CSC202: "Computer Architecture",
  CSC213: "Computer Architecture",
  CSC214: "Computer Graphics",
  STA215: "Statistics II",

  // Fourth Semester
  CSC251: "Operating Systems",
  CSC262: "Theory of Computation",
  CSC263: "Computer Networks",
  CSC264: "Operating Systems",
  CSC265: "Database Management System",
  CSC266: "Artificial Intelligence",

  // Fifth Semester
  CSC301: "Theory of Computation",
  CSC325: "Design and Analysis of Algorithms",
  CSC326: "System Analysis and Design",
  CSC327: "Cryptography",
  CSC328: "Simulation and Modeling",
  CSC329: "Web Technology",

  // Sixth Semester
  CSC351: "Computer Networks",
  CSC375: "Software Engineering",
  CSC376: "Compiler Design and Construction",
  CSC377: "E-Governance",
  CSC378: "NET Centric Computing",
  CSC379: "Technical Writing",

  // Seventh Semester
  CSC401: "Artificial Intelligence",
  CSC425: "Advanced Java Programming",
  CSC426: "Data Warehousing and Data Mining",
  MGT427: "Principles of Management",
  CSC428: "Project Work",

  // Eighth Semester
  CSC451: "Distributed Systems",
  CSC475: "Advanced Database",
  CSC476: "Internship",
  CSC477: "Advanced Networking with IPv6",
};

// ─── Primary Semester Curriculum Subjects ────────────────────────────────────

export const SEMESTER_CURRICULUM_CODES: Record<number, string[]> = {
  1: ["CSC114", "CSC115", "CSC116", "MTH117", "PHY118"],
  2: ["CSC165", "CSC166", "CSC167", "MTH168", "STA169"],
  3: ["CSC211", "CSC212", "CSC213", "CSC214", "STA215"],
  4: ["CSC262", "CSC263", "CSC264", "CSC265", "CSC266"],
  5: ["CSC325", "CSC326", "CSC327", "CSC328", "CSC329"],
  6: ["CSC375", "CSC376", "CSC377", "CSC378", "CSC379"],
  7: ["CSC425", "CSC426", "MGT427", "CSC428", "CSC401"],
  8: ["CSC475", "CSC476", "CSC477", "CSC451"],
};

export function findSubjectName(code: string): string {
  if (!code) return "Unknown Subject";
  const normalized = code.trim().toUpperCase();
  return SUBJECT_CODE_MAP[normalized] || normalized;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function subjectToSlug(code: string): string {
  const name = findSubjectName(code);
  const clean = generateSlug(name.replace(/\(.*?\)/g, "").trim());
  return clean || code.toLowerCase();
}

export function doesPaperMatchSubject(
  paper: PastPaperItem,
  subject: SubjectMeta
): boolean {
  const paperCode = paper.subject_code?.trim().toUpperCase() || "";
  const targetCode = subject.code?.trim().toUpperCase() || "";

  // 1. Direct code match
  if (paperCode && targetCode && paperCode === targetCode) {
    return true;
  }

  // 2. Direct name match (case-insensitive)
  if (
    paper.subject_name &&
    subject.name &&
    paper.subject_name.toLowerCase().trim() === subject.name.toLowerCase().trim()
  ) {
    return true;
  }

  // 3. Slug comparison
  const paperSlug = subjectToSlug(paperCode);
  if (paperSlug && (paperSlug === subject.slug || subject.slug.includes(paperSlug) || paperSlug.includes(subject.slug))) {
    return true;
  }

  // 4. Normalized subject name match
  const paperNameSlug = generateSlug(
    (paper.subject_name || findSubjectName(paperCode)).replace(/\(.*?\)/g, "").trim()
  );
  const targetNameSlug = generateSlug(
    subject.name.replace(/\(.*?\)/g, "").trim()
  );
  if (
    paperNameSlug &&
    targetNameSlug &&
    (paperNameSlug === targetNameSlug ||
      targetNameSlug.includes(paperNameSlug) ||
      paperNameSlug.includes(targetNameSlug))
  ) {
    return true;
  }

  return false;
}

export function getSubjectsForSemester(semesterNumber: number): SubjectMeta[] {
  const codes = SEMESTER_CURRICULUM_CODES[semesterNumber] || [];
  return codes.map((code) => {
    const name = findSubjectName(code);
    return {
      code,
      name,
      semester: semesterNumber,
      slug: subjectToSlug(code),
      isElective: code.includes("Elective"),
      isOldCourse: name.includes("(Old)"),
    };
  });
}

export function findSubjectBySlug(
  semesterNumber: number,
  subjectSlug: string
): SubjectMeta | undefined {
  const subjects = getSubjectsForSemester(semesterNumber);
  const normalized = generateSlug(subjectSlug);

  // Exact slug match
  const match = subjects.find(
    (s) => s.slug === normalized || s.code.toLowerCase() === normalized
  );
  if (match) return match;

  // Fuzzy match on subject name or code
  return subjects.find(
    (s) =>
      generateSlug(s.name) === normalized ||
      normalized.includes(generateSlug(s.name)) ||
      generateSlug(s.name).includes(normalized) ||
      normalized.includes(s.code.toLowerCase())
  );
}

// ─── Google Drive Embed Utilities ────────────────────────────────────────────

export function getDriveEmbedUrl(driveLink: string): string | null {
  if (!driveLink) return null;
  const match = driveLink.match(/\/file\/d\/([^/]+)/);
  if (match) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return null;
}

// ─── Pure Backend API Fetcher ────────────────────────────────────────────────

export async function fetchPastPapersBySemester(semester: number): Promise<PastPaperItem[]> {
  const { papers } = await getPastPapers({ semester });
  return papers;
}
