import type { NavLinkItem, NavDropdownItem } from "@/data/nav/data";

const KNOWN_ALUMNI_SLUGS = new Set([
  "alumni-1",
  "alumni-2",
  "alumni-3",
  "alumni-4",
  "alumni-5",
  "alumni-6",
  "alumni-7",
  "alumni-8",
  "suman-bhattarai",
  "bishnu-maya-gautam-chhetri",
  "sujan-khatri",
  "anuradha-pandey",
  "dipendra-raj-upadhyaya",
  "sanchit-pandey",
  "bivek-acharya",
  "shikshya-acharya",
]);

/**
 * Checks whether a given member slug or identifier belongs to an alumni member.
 */
export function isAlumniSlug(slug: string): boolean {
  if (!slug) return false;
  const clean = slug.toLowerCase().trim();
  if (clean.startsWith("alumni-") || clean.includes("alumni")) return true;
  return KNOWN_ALUMNI_SLUGS.has(clean);
}

/**
 * Checks whether a target navigation route or child link is considered active
 * given the current URL pathname, taking into account nested dynamic routes
 * and hierarchical associations (e.g., /mb/[alumni] -> /about/alumni, /mb/[exec] -> /about/our-team).
 */
export function isRouteActive(
  currentPath: string,
  targetPath?: string | null
): boolean {
  if (!targetPath || targetPath.startsWith("http")) return false;

  const cleanCurrent = (currentPath.replace(/\/+$/, "") || "/").toLowerCase();
  const cleanTarget = (
    (targetPath.startsWith("/") ? targetPath : `/${targetPath}`).replace(/\/+$/, "") || "/"
  ).toLowerCase();

  // Root homepage must strictly match
  if (cleanTarget === "/") {
    return cleanCurrent === "/";
  }

  // Exact match
  if (cleanCurrent === cleanTarget) {
    return true;
  }

  // Direct nested child match (e.g., /events/hackathon matches /events)
  if (cleanCurrent.startsWith(`${cleanTarget}/`)) {
    return true;
  }

  // Hierarchical aliases and route family mappings:
  // 1. Alumni dedicated routes (/al/*) -> strictly map to /about/alumni
  if (cleanCurrent.startsWith("/al/") || cleanCurrent === "/al") {
    return cleanTarget === "/about/alumni";
  }

  // 2. Member profile routes (/mb/*):
  // Accurately distinguish legacy Alumni members (-> /about/alumni) from Executive/Advisor members (-> /about/our-team)
  if (cleanCurrent.startsWith("/mb/")) {
    const parts = cleanCurrent.replace("/mb/", "").split("/").filter(Boolean);
    // If it's a 2-segment route /mb/[tenure]/[slug], it is strictly a tenure-specific team member
    if (parts.length >= 2) {
      return cleanTarget === "/about/our-team";
    }

    const memberSlug = parts[0] || "";
    const isAlumni =
      isAlumniSlug(memberSlug) ||
      cleanCurrent.includes("role=alumni") ||
      cleanCurrent.includes("from=alumni");

    if (cleanTarget === "/about/alumni") {
      return isAlumni;
    }
    if (cleanTarget === "/about/our-team") {
      return !isAlumni;
    }
  }

  // 3. /alumni/* legacy routes map to /about/alumni
  if (
    cleanTarget === "/about/alumni" &&
    (cleanCurrent.startsWith("/alumni/") || cleanCurrent === "/alumni")
  ) {
    return true;
  }

  // 3. /team/* routes map to /about/our-team
  if (
    cleanTarget === "/about/our-team" &&
    (cleanCurrent.startsWith("/team/") || cleanCurrent === "/team" || cleanCurrent === "/mb")
  ) {
    return true;
  }

  // 4. /study-materials/* routes map to /study-materials/semester-exam
  if (
    cleanTarget === "/study-materials/semester-exam" &&
    cleanCurrent.startsWith("/study-materials")
  ) {
    return true;
  }

  return false;
}

export interface NavActiveResolution {
  isItemActive: boolean;
  hasActiveChild: boolean;
  activeChildPath: string | null;
}

/**
 * Resolves the full active state for any navbar item (parent dropdown or top-level link).
 */
export function getNavActiveState(
  item: NavLinkItem,
  currentPath: string
): NavActiveResolution {
  const isDirectActive = item.path ? isRouteActive(currentPath, item.path) : false;

  let hasActiveChild = false;
  let activeChildPath: string | null = null;

  if (item.content && item.content.length > 0) {
    for (const child of item.content) {
      if (isRouteActive(currentPath, child.path)) {
        hasActiveChild = true;
        activeChildPath = child.path;
        break;
      }
    }
  }

  return {
    isItemActive: isDirectActive || hasActiveChild,
    hasActiveChild,
    activeChildPath,
  };
}
