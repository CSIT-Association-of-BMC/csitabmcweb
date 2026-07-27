import { MemberTypes } from "@/types/Members";

const positionOrder: Record<string, number> = {
  "President": 1,
  "Vice-President": 2,
  "Secretary": 3,
  "Joint Secretary": 4,
  "Treasurer": 5,
  "Tech Lead": 6,
  "Event Manager": 7,
  "Assistant Tech Lead": 8,
  "Assistant Event Lead": 9,
  "Graphic Designer": 10,
  "Executive Member": 11,
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