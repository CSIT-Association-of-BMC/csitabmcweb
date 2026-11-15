import { MemberCardData } from "@/components/shared/MemberCard";
import { fetchWithToken, fetchBackendResource } from "@/lib/fetch";
import { MemberTypes } from "@/types/Members";
import { defaultTenureOrder } from "@/data/team/data";
import {
  fallbackLatestExecutives,
  fallbackLatestAdvisors,
  fallbackMemberProfiles,
} from "@/data/team/fallback";
import qs from "qs";

export interface MemberItem extends MemberCardData {
  id: string | number;
  roleType?: "EXECUTIVE" | "ADVISOR" | "ALUMNI" | string;
  order?: number;
}

export interface TenureItem {
  id: string | number;
  name: string;
  slug: string;
  startDate?: string;
  endDate?: string;
  executives: MemberItem[];
  advisors: MemberItem[];
}

/**
 * Sorts committee members strictly by the backend `order` field ascending.
 * Predictably handles missing orders by placing them at the end, and breaks ties
 * by ID matching the backend's ordering = ["order", "id"].
 * Does not independently sort by role, position name, or alphabetical order.
 */
export function sortMembersByOrder(members: MemberItem[]): MemberItem[] {
  return [...members].sort((a, b) => {
    const orderA = typeof a.order === "number" && !isNaN(a.order) ? a.order : 9999;
    const orderB = typeof b.order === "number" && !isNaN(b.order) ? b.order : 9999;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    const idA = String(a.id ?? a.memberId ?? "");
    const idB = String(b.id ?? b.memberId ?? "");
    return idA.localeCompare(idB, undefined, { numeric: true });
  });
}

/**
 * Distributes a sorted roster of executive committee members into pyramid tiers:
 * - Tier 1: order 1 (1 member)
 * - Tier 2: orders 2–4 (up to 3 members)
 * - Tier 3: orders 5–8 (up to 4 members)
 * - Tier 4: orders 9–12 (up to 4 members)
 * - Tier 5: orders 13–16 (up to 4 members)
 * - Subsequent tiers: up to 4 members per row, preserving ascending order and centered alignment.
 *
 * Tier distribution is based on the sorted position in the roster, not on hardcoded role names.
 */
export function distributePyramidTiers(sortedMembers: MemberItem[]): MemberItem[][] {
  const tiers: MemberItem[][] = [];
  if (!sortedMembers || sortedMembers.length === 0) return tiers;

  let currentIndex = 0;
  let tierNumber = 1;

  while (currentIndex < sortedMembers.length) {
    const tierCapacity = tierNumber === 1 ? 1 : tierNumber === 2 ? 3 : 4;
    const tierSlice = sortedMembers.slice(currentIndex, currentIndex + tierCapacity);
    if (tierSlice.length > 0) {
      tiers.push(tierSlice);
    }
    currentIndex += tierCapacity;
    tierNumber += 1;
  }

  return tiers;
}

// ── Realistic Dummy Advisors for UI Testing ──────────────────────────
export const DUMMY_ADVISORS_CURRENT: MemberItem[] = [
  {
    id: "adv-1",
    fullName: "Er. Ramesh Pandey",
    role: "Chief Technical Advisor",
    post: "Chief Technical Advisor",
    image: "/team.jpeg",
    email: "ramesh.pandey@csitabmc.com",
    tags: "System Architecture, Cloud Computing, Technical Leadership, Mentorship",
    description: "Er. Ramesh Pandey serves as the Chief Technical Advisor at CSIT Association of BMC. With extensive industry experience in distributed systems and cloud engineering, he actively mentors executive committee members and student developers, guiding technological roadmaps, hands-on hackathons, and technical workshops.",
    facebookLink: "https://facebook.com/csitabmc",
    linkedLink: "https://linkedin.com/company/csitabmc",
    githubLink: "https://github.com/CSIT-Association-of-BMC",
    roleType: "ADVISOR",
    order: 1,
  },
  {
    id: "adv-2",
    fullName: "Prakash Neupane",
    role: "Faculty Advisor",
    post: "Faculty Advisor",
    image: "/team.jpeg",
    email: "prakash.neupane@csitabmc.com",
    tags: "Academic Guidance, Research, CSIT Curriculum, Student Affairs",
    description: "Prakash Neupane serves as Faculty Advisor to the CSIT Association at Butwal Multiple Campus. He bridges academic curriculum with student-led initiatives, fostering research engagement, university coordination, and student welfare.",
    facebookLink: "https://facebook.com/csitabmc",
    linkedLink: "https://linkedin.com/company/csitabmc",
    roleType: "ADVISOR",
    order: 2,
  },
];

export const DUMMY_ADVISORS_2082: MemberItem[] = [
  {
    id: "adv-3",
    fullName: "Prof. Dr. Janardan Adhikari",
    role: "Academic Advisor",
    post: "Academic Advisor",
    image: "/team.jpeg",
    email: "janardan.adhikari@csitabmc.com",
    tags: "Computer Science Research, Higher Education, Algorithms, Faculty Liaison",
    description: "Prof. Dr. Janardan Adhikari has been a long-standing academic advisor and pillar of the CSIT department at BMC, encouraging scholarly publishing, semester curriculum excellence, and research rigor.",
    roleType: "ADVISOR",
    order: 1,
  },
  {
    id: "adv-4",
    fullName: "Er. Pradeep Sharma",
    role: "Industry Mentor",
    post: "Industry Mentor",
    image: "/team.jpeg",
    email: "pradeep.sharma@csitabmc.com",
    tags: "Software Engineering, Career Roadmaps, Full-Stack Development",
    description: "Er. Pradeep Sharma is an industry practitioner and tech mentor who regularly hosts technical workshops, code clinics, and career roadmap sessions for CSIT students.",
    roleType: "ADVISOR",
    order: 2,
  },
  {
    id: "adv-5",
    fullName: "Santosh Poudel",
    role: "Curriculum Advisor",
    post: "Curriculum Advisor",
    image: "/team.jpeg",
    email: "santosh.poudel@csitabmc.com",
    tags: "IT Industry Trends, Curriculum Modernization, Competitive Programming",
    description: "Santosh Poudel provides expert recommendations aligning student club activities with contemporary industry trends and competitive programming skills.",
    roleType: "ADVISOR",
    order: 3,
  },
];

export const DUMMY_ADVISORS_2081: MemberItem[] = [
  {
    id: "adv-6",
    fullName: "Er. Ramesh Pandey",
    role: "Founding Advisor",
    post: "Founding Advisor",
    image: "/team.jpeg",
    email: "ramesh.pandey@csitabmc.com",
    tags: "Founding Vision, Community Growth, Mentorship",
    description: "Founding Advisor of CSITABMC, guiding the organization's inception in 2016 and helping cultivate a sustainable student-led community in Butwal.",
    roleType: "ADVISOR",
    order: 1,
  },
];

// ── Realistic Dummy Alumni for UI Testing ────────────────────────────
export const DUMMY_ALUMNI: MemberItem[] = [
  {
    id: "alumni-1",
    fullName: "Suman Bhattarai",
    passOutYear: "Pass-out 2024",
    image: "/team.jpeg",
    email: "suman.bhattarai@csitabmc.com",
    tags: "Former President, Community Building, Full Stack Development",
    description: "Suman Bhattarai is an esteemed alumnus of Butwal Multiple Campus (Pass-out Batch 2024) and former President of CSIT Association of BMC. During his leadership tenure, he spearheaded major technical symposiums and community outreach programs.",
    facebookLink: "https://facebook.com/csitabmc",
    linkedLink: "https://linkedin.com/company/csitabmc",
    githubLink: "https://github.com/CSIT-Association-of-BMC",
    roleType: "ALUMNI",
    order: 1,
  },
  {
    id: "alumni-2",
    fullName: "Bishnu Maya Gautam Chhetri",
    passOutYear: "Pass-out 2024",
    image: "/team.jpeg",
    email: "bishnu.gautam@csitabmc.com",
    tags: "Women in Tech, UI/UX Design, Community Leadership",
    description: "Bishnu Maya Gautam Chhetri is a passionate software designer and BMC alumna who championed diversity initiatives, design workshops, and student mentorship during her tenure with the association.",
    facebookLink: "https://facebook.com/csitabmc",
    linkedLink: "https://linkedin.com/company/csitabmc",
    roleType: "ALUMNI",
    order: 2,
  },
  {
    id: "alumni-3",
    fullName: "Sujan Khatri",
    passOutYear: "Pass-out 2023",
    image: "/team.jpeg",
    email: "sujan.khatri@csitabmc.com",
    tags: "Former Vice-President, Backend Systems, Open Source",
    description: "Sujan Khatri served as Vice-President and technical organizer during his undergraduate studies. He now works in backend systems engineering and actively advises junior students on software careers.",
    facebookLink: "https://facebook.com/csitabmc",
    linkedLink: "https://linkedin.com/company/csitabmc",
    githubLink: "https://github.com/CSIT-Association-of-BMC",
    roleType: "ALUMNI",
    order: 3,
  },
  {
    id: "alumni-4",
    fullName: "Anuradha Pandey",
    passOutYear: "Pass-out 2023",
    image: "/team.jpeg",
    email: "anuradha.pandey@csitabmc.com",
    tags: "Data Analytics, Machine Learning, Community Outreach",
    description: "Anuradha Pandey is an alumna of BMC (Pass-out 2023) actively involved in data analytics and student project guidance.",
    roleType: "ALUMNI",
    order: 4,
  },
  {
    id: "alumni-5",
    fullName: "Dipendra Raj Upadhyaya",
    passOutYear: "Pass-out 2022",
    image: "/team.jpeg",
    email: "dipendra.upadhyaya@csitabmc.com",
    tags: "Cloud Computing, DevOps, Alumni Relations",
    description: "Dipendra Raj Upadhyaya is a cloud engineer and 2022 BMC graduate supporting student technical workshops in virtualization and containerization.",
    roleType: "ALUMNI",
    order: 5,
  },
  {
    id: "alumni-6",
    fullName: "Sanchit Pandey",
    passOutYear: "Pass-out 2022",
    image: "/team.jpeg",
    email: "sanchit.pandey@csitabmc.com",
    tags: "Cybersecurity, Network Engineering, Alumni Mentor",
    description: "Sanchit Pandey specializes in cybersecurity and network infrastructure, sharing practical security tips with undergraduate students.",
    roleType: "ALUMNI",
    order: 6,
  },
  {
    id: "alumni-7",
    fullName: "Bivek Acharya",
    passOutYear: "Pass-out 2021",
    image: "/team.jpeg",
    email: "bivek.acharya@csitabmc.com",
    tags: "Software Architecture, Mobile Development, Alumni Leader",
    description: "Bivek Acharya is a mobile application architect and 2021 alumnus guiding students in cross-platform development.",
    roleType: "ALUMNI",
    order: 7,
  },
  {
    id: "alumni-8",
    fullName: "Shikshya Acharya",
    passOutYear: "Pass-out 2020",
    image: "/team.jpeg",
    email: "shikshya.acharya@csitabmc.com",
    tags: "Founding Era Alumni, QA Engineering, Leadership",
    description: "Shikshya Acharya represents our pioneering early batches, helping lay the groundwork for community-driven learning at BMC.",
    roleType: "ALUMNI",
    order: 8,
  },
];

// ── Fetch Tenures with live Django / Strapi data + scalable testing dummy tenures ─
export async function fetchTenuresWithMembers(): Promise<TenureItem[]> {
  // 1. Try fetching from Django API (where tenure memberships and order field are authoritative)
  try {
    const djangoBaseUrl =
      process.env.NEXT_PUBLIC_DJANGO_API_URL ||
      "https://cms-dashbaord.onrender.com/api/v1";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const tenuresRes = await fetch(`${djangoBaseUrl}/tenures/`, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    clearTimeout(timeout);

    if (tenuresRes.ok) {
      const tenuresData = await tenuresRes.json();
      const tenureList = Array.isArray(tenuresData)
        ? tenuresData
        : tenuresData.results || [];

      if (tenureList.length > 0) {
        const fetchedTenures: TenureItem[] = await Promise.all(
          tenureList.map(async (t: any) => {
            try {
              const detailRes = await fetch(
                `${djangoBaseUrl}/tenures/${t.slug}/`,
                { next: { revalidate: 60 } }
              );
              if (detailRes.ok) {
                const detailData = await detailRes.json();
                const memberships = detailData.memberships || [];

                const executives: MemberItem[] = [];
                const advisors: MemberItem[] = [];

                for (const m of memberships) {
                  const mData = m.member || {};
                  const memberItem: MemberItem = {
                    id: m.id || mData.id,
                    memberId: mData.slug || String(mData.id || m.id),
                    fullName: m.member_name || mData.name || "Member",
                    role: m.designation || "Member",
                    post: m.designation || "Member",
                    image: mData.image || "/team.jpeg",
                    email: mData.email,
                    facebookLink: mData.fb_link,
                    linkedLink: mData.linkedin_link,
                    githubLink: mData.github_link,
                    description: mData.description,
                    tags: Array.isArray(mData.skills) ? mData.skills.join(", ") : mData.skills,
                    roleType: m.role_type,
                    order: typeof m.order === "number" ? m.order : 9999,
                  };

                  if (m.role_type === "ADVISOR") {
                    advisors.push(memberItem);
                  } else {
                    executives.push(memberItem);
                  }
                }

                return {
                  id: t.id,
                  name: t.name,
                  slug: t.slug,
                  startDate: t.start_date,
                  endDate: t.end_date,
                  executives,
                  advisors,
                };
              }
            } catch (err) {
              console.error(`Failed to fetch detail for tenure ${t.slug}`, err);
            }

            return {
              id: t.id,
              name: t.name,
              slug: t.slug,
              startDate: t.start_date,
              endDate: t.end_date,
              executives: [],
              advisors: [],
            };
          })
        );

        if (fetchedTenures.length > 0 && fetchedTenures.some(t => t.executives.length > 0 || t.advisors.length > 0)) {
          return fetchedTenures;
        }
      }
    }
  } catch (djangoError) {
    // Graceful fallback if Django API is not reached or timed out
  }

  // 2. Fallback to Strapi live data if Django is not deployed / configured
  let liveExecutives: MemberItem[] = [];

  const defaultTenureOrder: Record<string, number> = {
    "President": 1,
    "Vice-President": 2,
    "Secretary": 3,
    "Treasurer": 4,
    "Tech Lead": 5,
    "Event Lead": 6,
    "Graphic Designer": 7,
    "Joint Secretary": 8,
    "Ast. Tech Lead": 9,
    "Ast. Event Lead": 10,
    "Ast. Graphic Designer": 11,
    "HR Lead": 12,
    "Executive Member": 13,
  };

  try {
    const query = qs.stringify(
      {
        fields: ["fullName", "post", "memberId", "description"],
        populate: {
          image: {
            fields: ["url"],
          },
        },
      },
      { encodeValuesOnly: true }
    );

    const strapiUrl = `${process.env.STRAPI_API_URL}/members?${query}`;
    const result = await fetchBackendResource<MemberTypes[]>(strapiUrl);

    if (!result.isAvailabilityFailure && result.data) {
      const rawMembers: MemberTypes[] = result.data || [];

      liveExecutives = rawMembers.map((m: any, idx: number) => ({
        id: m.id || m.memberId || idx,
        memberId: m.memberId,
        fullName: m.fullName || "Member",
        role: m.post || "Executive Member",
        post: m.post || "Executive Member",
        image: m.image?.url || "/team.jpeg",
        roleType: "EXECUTIVE",
        order:
          typeof m.order === "number"
            ? m.order
            : (defaultTenureOrder[m.post] ?? idx + 13),
      }));
    } else if (result.isAvailabilityFailure) {
      // Confirmed backend availability failure - activate curated static fallback
      liveExecutives = [...fallbackLatestExecutives];
    }
  } catch (error) {
    console.error("fetchTenuresWithMembers strapi error:", error);
    liveExecutives = [...fallbackLatestExecutives];
  }

  // Construct realistic tenures for UI navigation & testing
  const tenures: TenureItem[] = [
    {
      id: "2083-84",
      name: "2083/84",
      slug: "2083-84",
      startDate: "2026-04-14",
      endDate: "2027-04-13",
      executives: liveExecutives,
      advisors: DUMMY_ADVISORS_CURRENT,
    },
    {
      id: "2082-83",
      name: "2082/83",
      slug: "2082-83",
      startDate: "2025-04-14",
      endDate: "2026-04-13",
      executives: liveExecutives.slice(0, 10),
      advisors: DUMMY_ADVISORS_2082,
    },
    {
      id: "2081-82",
      name: "2081/82",
      slug: "2081-82",
      startDate: "2024-04-13",
      endDate: "2025-04-13",
      executives: liveExecutives.slice(0, 8),
      advisors: DUMMY_ADVISORS_2081,
    },
    {
      id: "2080-81",
      name: "2080/81",
      slug: "2080-81",
      startDate: "2023-04-14",
      endDate: "2024-04-12",
      executives: liveExecutives.slice(0, 6),
      advisors: [],
    },
    {
      id: "2079-80",
      name: "2079/80",
      slug: "2079-80",
      startDate: "2022-04-14",
      endDate: "2023-04-13",
      executives: [],
      advisors: [],
    },
  ];

  return tenures;
}

// ── Fetch Alumni Members ─────────────────────────────────────────────
export async function fetchAlumniMembers(): Promise<MemberItem[]> {
  return DUMMY_ALUMNI;
}

// ── Unified Member Profile Resolution (API + Dummy Fallback) ────────
export async function getMemberProfile(id: string): Promise<MemberTypes | null> {
  // 1. Try Strapi live fetch first
  try {
    const query = qs.stringify(
      {
        populate: {
          image: {
            fields: ["url"],
          },
        },
      },
      { encodeValuesOnly: true }
    );
    const strapiUrl = `${process.env.STRAPI_API_URL}/members/${id}?${query}`;
    const result = await fetchBackendResource<MemberTypes>(strapiUrl);

    if (!result.isAvailabilityFailure && result.data) {
      return {
        ...result.data,
        roleType: "EXECUTIVE",
      };
    }
  } catch (err) {
    console.error("Strapi fetch member profile error:", err);
  }

  // 2. Search local dummy advisors
  const allAdvisors = [
    ...DUMMY_ADVISORS_CURRENT,
    ...DUMMY_ADVISORS_2082,
    ...DUMMY_ADVISORS_2081,
  ];

  const foundAdv = allAdvisors.find(
    (a) =>
      String(a.id).toLowerCase() === String(id).toLowerCase() ||
      String(a.memberId || "").toLowerCase() === String(id).toLowerCase() ||
      String(a.slug || "").toLowerCase() === String(id).toLowerCase()
  );

  if (foundAdv) {
    return {
      memberId: String(foundAdv.id),
      fullName: foundAdv.fullName,
      post: foundAdv.post || foundAdv.role || "Advisor",
      image: {
        url:
          typeof foundAdv.image === "string"
            ? foundAdv.image
            : foundAdv.image?.url || "/team.jpeg",
      },
      email:
        foundAdv.email ||
        `${foundAdv.fullName.toLowerCase().replace(/[^a-z0-9]/g, "")}@csitabmc.com`,
      tags:
        foundAdv.tags ||
        "System Architecture, Mentorship, Tech Leadership, Academic Advisory",
      description:
        foundAdv.description ||
        `${foundAdv.fullName} serves as an esteemed advisor to the CSIT Association of BMC, providing guidance, strategic leadership, and mentorship to student developers across initiatives and workshops.`,
      facebookLink: foundAdv.facebookLink || "https://facebook.com/csitabmc",
      linkedLink: foundAdv.linkedLink || "https://linkedin.com/company/csitabmc",
      githubLink: foundAdv.githubLink || "https://github.com/CSIT-Association-of-BMC",
      roleType: "ADVISOR",
    };
  }

  // 3. Search local dummy alumni
  const foundAlumni = DUMMY_ALUMNI.find(
    (a) =>
      String(a.id).toLowerCase() === String(id).toLowerCase() ||
      String(a.memberId || "").toLowerCase() === String(id).toLowerCase() ||
      String(a.slug || "").toLowerCase() === String(id).toLowerCase()
  );

  if (foundAlumni) {
    return {
      memberId: String(foundAlumni.id),
      fullName: foundAlumni.fullName,
      post: foundAlumni.passOutYear
        ? `Alumni • ${foundAlumni.passOutYear}`
        : "Alumni Member",
      image: {
        url:
          typeof foundAlumni.image === "string"
            ? foundAlumni.image
            : foundAlumni.image?.url || "/team.jpeg",
      },
      email:
        foundAlumni.email ||
        `${foundAlumni.fullName.toLowerCase().replace(/[^a-z0-9]/g, "")}@csitabmc.com`,
      tags:
        foundAlumni.tags ||
        "Alumni Network, Peer Mentorship, Software Engineering, Career Roadmaps",
      description:
        foundAlumni.description ||
        `${foundAlumni.fullName} is an esteemed alumnus of Butwal Multiple Campus (${
          foundAlumni.passOutYear || "Alumni"
        }). Having contributed actively during their undergraduate tenure, they continue to support and inspire current students.`,
      facebookLink: foundAlumni.facebookLink || "https://facebook.com/csitabmc",
      linkedLink: foundAlumni.linkedLink || "https://linkedin.com/company/csitabmc",
      githubLink:
        foundAlumni.githubLink || "https://github.com/CSIT-Association-of-BMC",
      roleType: "ALUMNI",
    };
  }

  // 4. Search fallback executive mock records
  const fallbackExecutives = [
    { id: "ex-1", memberId: "082JSNP5", fullName: "Nischal Panthi", role: "President", post: "President", image: "/team.jpeg", tags: "Full Stack, Leadership, React, Node.js" },
    { id: "ex-2", memberId: "082EMRK15", fullName: "Rupesh Kharal", role: "Vice-President", post: "Vice-President", image: "/team.jpeg", tags: "Community Organizing, Event Management, UI/UX" },
    { id: "ex-3", memberId: "082ATLSA9", fullName: "Swikrity A.C.", role: "Secretary", post: "Secretary", image: "/team.jpeg", tags: "Documentation, Coordination, Public Speaking" },
    { id: "ex-4", memberId: "082EMJP13", fullName: "Jasteena Poudel", role: "Treasurer", post: "Treasurer", image: "/team.jpeg", tags: "Finance, Sponsorships, Budgeting" },
    { id: "ex-5", memberId: "082ATLSG10", fullName: "Sabin Ghimire", role: "Tech Lead", post: "Tech Lead", image: "/team.jpeg", tags: "Web Development, DevOps, Cloud Architecture" },
    { id: "ex-6", memberId: "082EMSA14", fullName: "Sarbesh Adhikari", role: "Event Lead", post: "Event Lead", image: "/team.jpeg", tags: "Hackathons, Workshops, Logistics" },
    { id: "ex-7", memberId: "076JNF45", fullName: "Aakash Neupane", role: "Graphic Designer", post: "Graphic Designer", image: "/team.jpeg", tags: "Graphic Design, Figma, Visual Identity" },
    { id: "ex-8", memberId: "231BTMRMR09", fullName: "Omit Arjel", role: "Joint Secretary", post: "Joint Secretary", image: "/team.jpeg", tags: "Administration, Operations, Event Planning" },
    { id: "ex-9", memberId: "957HZE4", fullName: "Sarina Kharel", role: "Ast. Tech Lead", post: "Ast. Tech Lead", image: "/team.jpeg", tags: "Frontend Development, JavaScript, CSS" },
    { id: "ex-10", memberId: "280VDHOSM05", fullName: "Anuska Sharma Bhattarai", role: "Ast. Tech Lead", post: "Ast. Tech Lead", image: "/team.jpeg", tags: "React, Python, Machine Learning" },
    { id: "ex-11", memberId: "742FJE06", fullName: "Nikesh Bhandari", role: "Ast. Event Lead", post: "Ast. Event Lead", image: "/team.jpeg", tags: "Outreach, Tech Sessions, Media" },
    { id: "ex-12", memberId: "491GSFO4", fullName: "Sudip Pandey", role: "Executive Member", post: "Executive Member", image: "/team.jpeg", tags: "Web Development, Problem Solving" },
    { id: "ex-13", memberId: "017HVPR8", fullName: "Sneha Chaudhary", role: "Executive Member", post: "Executive Member", image: "/team.jpeg", tags: "Design, Community Outreach" },
    { id: "ex-14", memberId: "369BPEAZ90", fullName: "Niroj Gyawali", role: "Executive Member", post: "Executive Member", image: "/team.jpeg", tags: "Programming, Algorithms, Events" },
    { id: "ex-15", memberId: "468GYBXHA98", fullName: "Prabesh thapa", role: "Executive Member", post: "Executive Member", image: "/team.jpeg", tags: "Open Source, Python, Git" },
  ];

  const foundExec = fallbackExecutives.find(
    (e) =>
      String(e.id).toLowerCase() === String(id).toLowerCase() ||
      String(e.memberId).toLowerCase() === String(id).toLowerCase()
  );

  if (foundExec) {
    return {
      memberId: foundExec.memberId,
      fullName: foundExec.fullName,
      post: foundExec.post,
      image: { url: foundExec.image },
      email: `${foundExec.fullName.toLowerCase().replace(/[^a-z0-9]/g, "")}@csitabmc.com`,
      tags: foundExec.tags,
      description: `${foundExec.fullName} is an active ${foundExec.post} of CSIT Association of BMC, actively contributing to technical workshops, hackathons, and community growth.`,
      facebookLink: "https://facebook.com/csitabmc",
      linkedLink: "https://linkedin.com/company/csitabmc",
      githubLink: "https://github.com/CSIT-Association-of-BMC",
      roleType: "EXECUTIVE",
    };
  }

  // 5. Search fallbackMemberProfiles dataset
  const foundFallback = fallbackMemberProfiles.find(
    (p) =>
      String(p.memberId).toLowerCase() === String(id).toLowerCase() ||
      String(p.fullName).toLowerCase() === String(id).toLowerCase()
  );

  if (foundFallback) {
    return foundFallback;
  }

  return null;
}
