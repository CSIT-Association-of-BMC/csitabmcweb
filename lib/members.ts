import { MemberTypes } from "@/types/Members";

const positionOrder: Record<string, number> = {
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
  "Executive Member": 12,
};

export const membersListFormatter = (members: MemberTypes[]) => {
  members.sort((a, b) => {
    const orderA = positionOrder[a.post] ?? 99;
    const orderB = positionOrder[b.post] ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return getLastDigit(a.memberId) - getLastDigit(b.memberId);
  });
  return members;
};

function getLastDigit(memberId: string): number {
  const match = memberId.match(/\d+$/);
  return match ? parseInt(match[0], 10) : 0;
}
