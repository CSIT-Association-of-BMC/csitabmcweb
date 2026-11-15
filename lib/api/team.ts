import { apiGet } from "./client";
import type { MemberTypes } from "@/types/Members";
import type { MemberCardData } from "@/components/shared/MemberCard";
import { slugify } from "@/lib/slugs";
import { resolveImageUrl } from "@/lib/images";

export interface MemberItem extends MemberCardData {
  id: string | number;
  roleType?: "EXECUTIVE" | "ADVISOR" | "ALUMNI" | string;
  order?: number;
}

export interface TenureItem {
  id: string | number;
  name: string;
  slug: string;
  is_current?: boolean;
  startDate?: string;
  endDate?: string;
  executives: MemberItem[];
  advisors: MemberItem[];
}

export type TenureSummary = TenureItem;
export type TenureDetail = TenureItem;
export type MemberSummary = MemberItem;

function transformMembershipToMemberItem(
  m: any,
  defaultRole: string = "Member"
): MemberItem {
  const mData = m.member || {};
  const fullName = m.member_name || mData.name || m.fullName || "Member";
  const designation = m.designation || m.role || m.post || defaultRole;
  const image = resolveImageUrl(mData.image || m.image, "/team.jpeg") || "/team.jpeg";
  const slug = mData.slug || m.slug || slugify(fullName);
  const roleType =
    m.role_type ||
    (designation.toLowerCase().includes("advisor") ? "ADVISOR" : "EXECUTIVE");

  return {
    id: m.id || mData.id || slug,
    memberId: slug || String(mData.id || m.id),
    fullName,
    post: designation,
    role: designation,
    image,
    roleType,
    order: typeof m.order === "number" ? m.order : 9999,
    email: mData.email || m.email,
    facebookLink: mData.fb_link || m.facebookLink,
    linkedLink: mData.linkedin_link || m.linkedLink,
    githubLink: mData.github_link || m.githubLink,
    description: mData.description || m.description,
    tags: Array.isArray(mData.skills)
      ? mData.skills.join(", ")
      : mData.skills || m.tags,
    slug,
  };
}

function parseTenureDetail(data: any): TenureItem {
  const executives: MemberItem[] = [];
  const advisors: MemberItem[] = [];

  if (Array.isArray(data.memberships) && data.memberships.length > 0) {
    for (const m of data.memberships) {
      const item = transformMembershipToMemberItem(m);
      if (
        item.roleType === "ADVISOR" ||
        (item.post && item.post.toLowerCase().includes("advisor"))
      ) {
        advisors.push(item);
      } else {
        executives.push(item);
      }
    }
  } else {
    if (Array.isArray(data.executives)) {
      executives.push(
        ...data.executives.map((e: any) =>
          transformMembershipToMemberItem(e, "Executive Member")
        )
      );
    }
    if (Array.isArray(data.advisors)) {
      advisors.push(
        ...data.advisors.map((a: any) =>
          transformMembershipToMemberItem(a, "Advisor")
        )
      );
    }
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    is_current: Boolean(data.is_current),
    startDate: data.start_date || data.startDate,
    endDate: data.end_date || data.endDate,
    executives,
    advisors,
  };
}

/**
 * Fetches available tenures with committee rosters from `/api/v1/tenures/`.
 * Pure backend integration without static fallback mocks.
 */
export async function getTenures(): Promise<{
  tenures: TenureItem[];
  isFallback: boolean;
}> {
  try {
    const res = await apiGet<any>("/tenures/", {
      next: { revalidate: 30 },
    });

    if (!res.isAvailabilityFailure && res.data) {
      const tenureList = Array.isArray(res.data)
        ? res.data
        : (res.data as any).results || [];

      if (tenureList.length > 0) {
        // Fetch detail for each tenure to populate nested memberships if not present
        const fullTenures = await Promise.all(
          tenureList.map(async (t: any) => {
            if (t.memberships || t.executives) {
              return parseTenureDetail(t);
            }
            try {
              const detailRes = await apiGet<any>(
                `/tenures/${encodeURIComponent(t.slug)}/`,
                {
                  next: { revalidate: 30 },
                }
              );
              if (!detailRes.isAvailabilityFailure && detailRes.data) {
                return parseTenureDetail(detailRes.data);
              }
            } catch {
              // ignore
            }
            return parseTenureDetail(t);
          })
        );

        return { tenures: fullTenures, isFallback: false };
      }
    }

    return { tenures: [], isFallback: false };
  } catch (error) {
    console.error("getTenures API error:", error);
    return { tenures: [], isFallback: false };
  }
}

/**
 * Fetches tenure details by tenure slug from `/api/v1/tenures/<slug>/`.
 * Pure backend integration without static fallback mocks.
 */
export async function getTenureBySlug(
  slug: string
): Promise<{ tenure: TenureItem | null; isFallback: boolean }> {
  try {
    const res = await apiGet<any>(`/tenures/${encodeURIComponent(slug)}/`, {
      next: { revalidate: 30 },
    });

    if (!res.isAvailabilityFailure && res.data) {
      return { tenure: parseTenureDetail(res.data), isFallback: false };
    }

    return { tenure: null, isFallback: false };
  } catch (error) {
    console.error("getTenureBySlug API error:", error);
    return { tenure: null, isFallback: false };
  }
}

/**
 * Fetches public members from `/api/v1/members/`.
 * Pure backend integration without static fallback mocks.
 */
export async function getMembers(params?: {
  search?: string;
}): Promise<{ members: MemberItem[]; isFallback: boolean }> {
  try {
    const res = await apiGet<any>("/members/", {
      params,
      next: { revalidate: 30 },
    });

    if (!res.isAvailabilityFailure && res.data) {
      const rawList = Array.isArray(res.data)
        ? res.data
        : (res.data as any).results || [];
      if (rawList.length > 0) {
        const items: MemberItem[] = rawList.map((m: any) => {
          const fullName = m.name || m.fullName || "Member";
          const designation = m.designation || m.role || m.post || "Member";
          const slug = m.slug || slugify(fullName);
          const image = resolveImageUrl(m.image, "/team.jpeg") || "/team.jpeg";
          const roleType =
            m.role_type ||
            (designation.toLowerCase().includes("advisor") ? "ADVISOR" : "EXECUTIVE");

          return {
            id: m.id || slug,
            memberId: slug || String(m.id),
            fullName,
            post: designation,
            role: designation,
            image,
            roleType,
            order: typeof m.order === "number" ? m.order : 9999,
            email: m.email,
            facebookLink: m.fb_link || m.facebookLink,
            linkedLink: m.linkedin_link || m.linkedLink,
            githubLink: m.github_link || m.githubLink,
            description: m.description,
            tags: Array.isArray(m.skills) ? m.skills.join(", ") : m.skills || m.tags,
            slug,
          };
        });
        return { members: items, isFallback: false };
      }
    }

    return { members: [], isFallback: false };
  } catch (error) {
    console.error("getMembers API error:", error);
    return { members: [], isFallback: false };
  }
}

/**
 * Resolves a single member profile by slug or identifier from `/api/v1/members/<slug>/`.
 * Pure backend integration without static fallback mocks.
 */
export async function getMemberProfile(
  identifier: string
): Promise<{ member: MemberTypes | null; isFallback: boolean }> {
  const lookup = decodeURIComponent(identifier).trim().toLowerCase();

  try {
    const res = await apiGet<any>(`/members/${encodeURIComponent(lookup)}/`, {
      next: { revalidate: 30 },
    });

    if (!res.isAvailabilityFailure && res.data && (res.data.name || res.data.slug)) {
      const d = res.data;
      const designation = d.designation || d.post || "Executive Member";
      const roleType =
        d.role_type ||
        (designation.toLowerCase().includes("advisor") ? "ADVISOR" : "EXECUTIVE");

      const member: MemberTypes = {
        memberId: d.slug || String(d.id),
        fullName: d.name || "Member",
        post: designation,
        image: {
          url: resolveImageUrl(d.image, "/team.jpeg") || "/team.jpeg",
        },
        email: d.email,
        tags: Array.isArray(d.skills)
          ? d.skills.join(", ")
          : d.skills || d.tags,
        description: d.description,
        facebookLink: d.fb_link || d.facebookLink,
        linkedLink: d.linkedin_link || d.linkedLink,
        githubLink: d.github_link || d.githubLink,
        roleType,
        slug: d.slug || slugify(d.name || d.fullName),
        canonicalSlug: d.slug || slugify(d.name || d.fullName),
      };

      return { member, isFallback: false };
    }
  } catch (error) {
    console.error("getMemberProfile API error:", error);
  }

  return { member: null, isFallback: false };
}

/**
 * Fetches alumni list from `/api/v1/alumni/`.
 * Pure backend integration without static fallback mocks.
 */
export async function getAlumni(): Promise<{
  alumni: MemberItem[];
  isFallback: boolean;
}> {
  try {
    const res = await apiGet<any>("/alumni/", {
      next: { revalidate: 60 },
    });

    if (!res.isAvailabilityFailure && res.data) {
      const rawList = Array.isArray(res.data)
        ? res.data
        : (res.data as any).results || [];

      if (rawList.length > 0) {
        const items: MemberItem[] = rawList.map((a: any) => {
          const m = a.member || {};
          const fullName =
            a.member_name || m.name || a.fullName || "Alumni Member";
          const passOut = a.graduation_year || a.passOutYear;
          const slug = m.slug || a.slug || slugify(fullName);
          const image = resolveImageUrl(m.image || a.image, "/team.jpeg") || "/team.jpeg";

          return {
            id: a.id,
            memberId: slug || String(m.id || a.id),
            fullName,
            post: passOut ? `Batch of ${passOut}` : "Alumni",
            role: "ALUMNI",
            image,
            passOutYear: passOut,
            roleType: "ALUMNI",
            email: m.email,
            tags: Array.isArray(m.skills) ? m.skills.join(", ") : m.skills,
            description: a.bio || m.description,
            facebookLink: m.fb_link,
            linkedLink: m.linkedin_link,
            githubLink: m.github_link,
            slug,
          };
        });
        return { alumni: items, isFallback: false };
      }
    }

    return { alumni: [], isFallback: false };
  } catch (error) {
    console.error("getAlumni API error:", error);
    return { alumni: [], isFallback: false };
  }
}

export interface TenureSpecificMemberProfile {
  memberId: string;
  fullName: string;
  post: string;
  roleType: string;
  order: number;
  tenureName: string;
  tenureSlug: string;
  image: string;
  email?: string;
  tags?: string;
  description?: string | null;
  facebookLink?: string;
  linkedLink?: string;
  githubLink?: string;
  slug: string;
  history: {
    id: number;
    tenure_name: string;
    tenure_slug: string;
    role_type: string;
    designation: string;
    order: number;
    status: string;
  }[];
}

export interface AlumniProfileData {
  id: string | number;
  memberId: string;
  fullName: string;
  graduationYear?: number | string | null;
  bio?: string | null;
  image: string;
  email?: string;
  tags?: string;
  description?: string;
  facebookLink?: string;
  linkedLink?: string;
  githubLink?: string;
  slug: string;
  tenures?: { id: number; name: string; slug: string }[];
  history?: {
    tenure_name: string;
    tenure_slug: string;
    designation: string;
    role_type: string;
  }[];
}

/**
 * Resolves a member profile for a specific tenure assignment.
 * Returns null if the member does not hold an assignment in the given tenure.
 * Pure backend integration without static fallback mocks.
 */
export async function getMemberProfileInTenure(
  tenureSlug: string,
  memberSlug: string
): Promise<{ profile: TenureSpecificMemberProfile | null; isFallback: boolean }> {
  const cleanTenure = decodeURIComponent(tenureSlug).trim().toLowerCase();
  const cleanMember = decodeURIComponent(memberSlug).trim().toLowerCase();

  try {
    // 1. Fetch the global member details (which returns full history of tenure memberships)
    const res = await apiGet<any>(`/members/${encodeURIComponent(cleanMember)}/`, {
      next: { revalidate: 30 },
    });

    if (!res.isAvailabilityFailure && res.data) {
      const d = res.data;
      const historyList: any[] = Array.isArray(d.history) ? d.history : [];

      // Find the specific assignment in the requested tenure
      const matchingAssignment = historyList.find((h: any) => {
        const hSlug = String(h.tenure_slug || "").toLowerCase();
        const hName = String(h.tenure_name || "").toLowerCase();
        return hSlug === cleanTenure || hName === cleanTenure || slugify(hName) === cleanTenure;
      });

      if (matchingAssignment) {
        const designation = matchingAssignment.designation || "Executive Member";
        const roleType =
          matchingAssignment.role_type ||
          (designation.toLowerCase().includes("advisor") ? "ADVISOR" : "EXECUTIVE");

        return {
          profile: {
            memberId: d.slug || String(d.id),
            fullName: d.name || "Member",
            post: designation,
            roleType,
            order: typeof matchingAssignment.order === "number" ? matchingAssignment.order : 99,
            tenureName: matchingAssignment.tenure_name || tenureSlug,
            tenureSlug: matchingAssignment.tenure_slug || tenureSlug,
            image: resolveImageUrl(d.image, "/team.jpeg") || "/team.jpeg",
            email: d.email,
            tags: Array.isArray(d.skills) ? d.skills.join(", ") : d.skills,
            description: d.description,
            facebookLink: d.fb_link,
            linkedLink: d.linkedin_link,
            githubLink: d.github_link,
            slug: d.slug || cleanMember,
            history: historyList,
          },
          isFallback: false,
        };
      }

      // If history is empty on the member record, inspect the specific tenure endpoint
      try {
        const tenureRes = await apiGet<any>(`/tenures/${encodeURIComponent(cleanTenure)}/`, {
          next: { revalidate: 30 },
        });

        if (!tenureRes.isAvailabilityFailure && tenureRes.data) {
          const tData = tenureRes.data;
          const memberships: any[] = Array.isArray(tData.memberships)
            ? tData.memberships
            : [...(tData.executives || []), ...(tData.advisors || [])];

          const mMatch = memberships.find((m: any) => {
            const mem = m.member || {};
            const mSlug = String(mem.slug || m.slug || "").toLowerCase();
            const mName = String(m.member_name || mem.name || m.fullName || "").toLowerCase();
            return (
              mSlug === cleanMember ||
              slugify(mName) === cleanMember ||
              String(mem.id) === cleanMember ||
              String(m.id) === cleanMember
            );
          });

          if (mMatch) {
            const mem = mMatch.member || {};
            const designation = mMatch.designation || mMatch.role || "Executive Member";
            const roleType =
              mMatch.role_type ||
              (designation.toLowerCase().includes("advisor") ? "ADVISOR" : "EXECUTIVE");

            return {
              profile: {
                memberId: mem.slug || String(mem.id || d.id),
                fullName: mem.name || d.name || "Member",
                post: designation,
                roleType,
                order: typeof mMatch.order === "number" ? mMatch.order : 99,
                tenureName: tData.name || tenureSlug,
                tenureSlug: tData.slug || tenureSlug,
                image: resolveImageUrl(mem.image || d.image, "/team.jpeg") || "/team.jpeg",
                email: mem.email || d.email,
                tags: Array.isArray(mem.skills || d.skills) ? (mem.skills || d.skills).join(", ") : "",
                description: mem.description || d.description,
                facebookLink: mem.fb_link || d.fb_link,
                linkedLink: mem.linkedin_link || d.linkedin_link,
                githubLink: mem.github_link || d.github_link,
                slug: mem.slug || cleanMember,
                history: historyList,
              },
              isFallback: false,
            };
          }
        }
      } catch {
        // secondary tenure lookup silent
      }

      // The member exists globally but DOES NOT have an assignment in this tenure
      return { profile: null, isFallback: false };
    }
  } catch (error) {
    console.error("getMemberProfileInTenure API error:", error);
  }

  return { profile: null, isFallback: false };
}

/**
 * Resolves an independent alumni profile by member slug.
 * Pure backend integration without static fallback mocks.
 */
export async function getAlumniProfile(
  slugOrId: string
): Promise<{ alumni: AlumniProfileData | null; isFallback: boolean }> {
  const clean = decodeURIComponent(slugOrId).trim().toLowerCase();

  try {
    const res = await apiGet<any>("/alumni/", {
      next: { revalidate: 30 },
    });

    if (!res.isAvailabilityFailure && res.data) {
      const rawList: any[] = Array.isArray(res.data)
        ? res.data
        : (res.data as any).results || [];

      const match = rawList.find((a: any) => {
        const m = a.member || {};
        const mSlug = String(m.slug || "").toLowerCase();
        const mName = String(a.member_name || m.name || "").toLowerCase();
        return (
          mSlug === clean ||
          slugify(mName) === clean ||
          String(a.id) === clean ||
          String(m.id) === clean
        );
      });

      if (match) {
        const m = match.member || {};
        const fullName = match.member_name || m.name || "Alumni Member";
        const memberSlug = m.slug || slugify(fullName);

        // Fetch full member details for social links & description if needed
        let description = match.bio || m.description;
        let fbLink = m.fb_link;
        let linkedinLink = m.linkedin_link;
        let githubLink = m.github_link;
        let email = m.email;
        let tags = Array.isArray(m.skills) ? m.skills.join(", ") : m.skills;
        let history: any[] = [];

        try {
          const detailRes = await apiGet<any>(`/members/${encodeURIComponent(memberSlug)}/`, {
            next: { revalidate: 30 },
          });
          if (!detailRes.isAvailabilityFailure && detailRes.data) {
            const md = detailRes.data;
            description = match.bio || md.description || description;
            fbLink = md.fb_link || fbLink;
            linkedinLink = md.linkedin_link || linkedinLink;
            githubLink = md.github_link || githubLink;
            email = md.email || email;
            tags = Array.isArray(md.skills) ? md.skills.join(", ") : md.skills || tags;
            history = Array.isArray(md.history) ? md.history : [];
          }
        } catch {
          // ignore detail fetch error
        }

        return {
          alumni: {
            id: match.id,
            memberId: memberSlug,
            fullName,
            graduationYear: match.graduation_year,
            bio: match.bio || description,
            image: resolveImageUrl(m.image, "/team.jpeg") || "/team.jpeg",
            email,
            tags,
            description,
            facebookLink: fbLink,
            linkedLink: linkedinLink,
            githubLink: githubLink,
            slug: memberSlug,
            tenures: match.tenures || [],
            history,
          },
          isFallback: false,
        };
      }
    }
  } catch (error) {
    console.error("getAlumniProfile API error:", error);
  }

  return { alumni: null, isFallback: false };
}
