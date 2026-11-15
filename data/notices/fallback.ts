import { NoticeTypes } from "@/types/Notice";

export const fallbackNotices: NoticeTypes[] = [
  {
    id: "not-01",
    documentId: "fb-not-01",
    slug: "executive-committee-induction-notice",
    title: "Executive Committee Induction & Orientation",
    description:
      "# Executive Committee Induction\n\nOfficial notice regarding the formal induction, orientation, and handover ceremony for the newly elected executive committee members for tenure 2083/84.",
    image: [
      {
        url: "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191232/mocktest_mqzpoi.jpg",
      },
    ],
    publishedAt: new Date("2026-10-15T00:00:00.000Z"),
    category: "Official",
  },
  {
    id: "not-02",
    documentId: "fb-not-02",
    slug: "semester-examination-past-papers-release",
    title: "Semester Examination Past Papers & Model Sets Available",
    description:
      "# Semester Examination Study Materials\n\nCurated TU board exam question papers and solution model sets for BSc.CSIT Semesters 1 through 8 have been updated and are accessible through the study materials portal.",
    image: [
      {
        url: "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191227/frontendworkshop_r24n64.jpg",
      },
    ],
    publishedAt: new Date("2026-09-28T00:00:00.000Z"),
    category: "Academic",
  },
  {
    id: "not-03",
    documentId: "fb-not-03",
    slug: "workshop-certificate-verification-protocol",
    title: "Online Certificate Verification System Activation",
    description:
      "# Certificate Verification\n\nParticipants of association workshops and hackathons can now authenticate and download verified PDF certificates using their Certificate UUID.",
    image: [
      {
        url: "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191232/graphicdesigning_cqiav4.jpg",
      },
    ],
    publishedAt: new Date("2026-09-10T00:00:00.000Z"),
    category: "General",
  },
];
