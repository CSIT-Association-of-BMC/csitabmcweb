"use client";

import React, { useMemo } from "react";
import { TenureItem, sortMembersByOrder } from "@/lib/team";
import { MemberCard } from "@/components/shared/MemberCard";
import { ChevronDown } from "lucide-react";
import { useTeam } from "@/hooks/useTeam";

interface TeamViewProps {
  tenures: TenureItem[];
}

export function TeamView({ tenures }: TeamViewProps) {
  const {
    tenures: queryTenures,
    activeTenure: queryActiveTenure,
    selectedSlug,
    selectTenure,
    isLoading,
  } = useTeam({
    initialTenures: tenures,
    defaultTenureSlug: tenures[0]?.slug,
  });

  const availableTenures =
    queryTenures.length > 0 ? queryTenures : tenures;

  const currentActiveTenure =
    queryActiveTenure ||
    availableTenures.find(
      (t) => t.slug === selectedSlug || String(t.id) === selectedSlug
    ) ||
    availableTenures[0] ||
    null;

  // Sort Executive Committee strictly by backend `order` field ascending
  const sortedExecutives = useMemo(() => {
    if (!currentActiveTenure?.executives) return [];
    return sortMembersByOrder(currentActiveTenure.executives);
  }, [currentActiveTenure?.executives]);

  // Sort Advisors strictly by backend `order` field ascending
  const sortedAdvisors = useMemo(() => {
    if (!currentActiveTenure?.advisors) return [];
    return sortMembersByOrder(currentActiveTenure.advisors);
  }, [currentActiveTenure?.advisors]);

  if (isLoading && !currentActiveTenure) {
    return (
      <div className="space-y-12 animate-pulse">
        <div className="h-10 w-48 bg-slate-200 rounded-lg" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-slate-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!currentActiveTenure || availableTenures.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-base font-semibold text-slate-800">
          No Tenures Available
        </p>
        <p className="text-sm text-slate-500 mt-1">
          Committee records are currently being compiled.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Responsive Scalable Tenure Selector */}
      <div className="flex items-center gap-3 pb-6 border-b border-slate-200">
        <label
          htmlFor="tenure-select"
          className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-600"
        >
          Tenure:
        </label>
        <div className="relative inline-block">
          <select
            id="tenure-select"
            value={currentActiveTenure.slug || currentActiveTenure.id}
            onChange={(e) => selectTenure(e.target.value)}
            className="appearance-none bg-white border border-slate-300 hover:border-slate-400 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm font-medium text-slate-800 py-2 pl-3.5 pr-9 transition-colors cursor-pointer shadow-2xs"
          >
            {availableTenures.map((tenure) => (
              <option key={tenure.id} value={tenure.slug || tenure.id}>
                Tenure {tenure.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 1. Executive Committee Section (Standard Grid Layout) */}
      <section>
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Executive Committee
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            The student leaders driving initiatives, technical workshops, and community events for Tenure {currentActiveTenure.name}.
          </p>
        </div>

        {sortedExecutives.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {sortedExecutives.map((member, index) => (
              <MemberCard
                key={member.memberId || member.id || index}
                member={member}
                tenureSlug={currentActiveTenure.slug || String(currentActiveTenure.id)}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-500">
            <p className="text-base font-semibold text-slate-800">
              No Committee Members Found
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Records for Tenure {currentActiveTenure.name} are currently being archived. Please choose another tenure above.
            </p>
          </div>
        )}
      </section>

      {/* 2. Advisors Section (Centered, wider cards, max 4 per row) */}
      <section className="pt-8 border-t border-slate-200">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Advisors
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Faculty and institutional advisors supporting the committee during Tenure {currentActiveTenure.name}.
          </p>
        </div>

        {sortedAdvisors.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-5 sm:gap-8 max-w-5xl mx-auto">
            {sortedAdvisors.map((advisor, index) => (
              <div
                key={advisor.id || index}
                className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.35rem)] lg:w-[calc(25%-1.5rem)] min-w-[200px] max-w-[250px]"
              >
                <MemberCard
                  member={advisor}
                  tenureSlug={currentActiveTenure.slug || String(currentActiveTenure.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-slate-500">
            <p className="text-sm font-medium text-slate-600">
              No advisors recorded for Tenure {currentActiveTenure.name}.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
