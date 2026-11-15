"use client";

import React from "react";
import { MemberCard } from "@/components/shared/MemberCard";
import { useTeam } from "@/hooks/useTeam";
import type { MemberItem } from "@/lib/team";

export function AlumniView({
  initialAlumni,
}: {
  initialAlumni: MemberItem[];
}) {
  const { alumni: queryAlumni, isLoading } = useTeam({
    initialAlumni,
    loadAlumni: true,
  });

  const alumni = queryAlumni.length > 0 ? queryAlumni : initialAlumni;

  if (isLoading && alumni.length === 0) {
    return (
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 animate-pulse">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.125rem)] lg:w-[calc(20%-1.25rem)] min-w-[160px] max-w-[240px] aspect-[4/5] bg-slate-200 rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (alumni.length === 0) {
    return (
      <div className="py-14 text-center text-slate-500">
        <p className="text-base font-semibold text-slate-800">
          No Alumni Records Found
        </p>
        <p className="text-sm text-slate-500 mt-1">
          Alumni directory records are currently being compiled.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
      {alumni.map((member, index) => (
        <div
          key={member.id || member.slug || index}
          className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.125rem)] lg:w-[calc(20%-1.25rem)] min-w-[160px] max-w-[240px]"
        >
          <MemberCard member={member} isAlumni={true} />
        </div>
      ))}
    </div>
  );
}
