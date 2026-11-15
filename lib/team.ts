import { MemberCardData } from "@/components/shared/MemberCard";
import { MemberTypes } from "@/types/Members";
import {
  getTenures,
  getAlumni,
  getMemberProfile as resolveProfile,
  MemberItem as ApiMemberItem,
  TenureItem as ApiTenureItem,
} from "@/lib/api/team";

export type MemberItem = ApiMemberItem;
export type TenureItem = ApiTenureItem;

/**
 * Sorts committee members strictly by the backend `order` field ascending.
 * Predictably handles missing orders by placing them at the end, and breaks ties
 * by ID matching the backend's ordering = ["order", "id"].
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
 * Distributes a sorted roster of executive committee members into pyramid tiers.
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

// ── Fetch Tenures with live Django data ─────────────────────────
export async function fetchTenuresWithMembers(): Promise<TenureItem[]> {
  const { tenures } = await getTenures();
  return tenures;
}

// ── Fetch Alumni Members ─────────────────────────────────────────────
export async function fetchAlumniMembers(): Promise<MemberItem[]> {
  const { alumni } = await getAlumni();
  return alumni;
}

// ── Unified Member Profile Resolution ──────────────────────────────
export async function getMemberProfile(id: string): Promise<MemberTypes | null> {
  const { member } = await resolveProfile(id);
  return member;
}
