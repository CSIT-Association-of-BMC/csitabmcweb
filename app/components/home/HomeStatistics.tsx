import React from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { associationStats } from "@/data/about/data";

interface HomeStatisticsProps {
  className?: string;
}

export function HomeStatistics({ className = "" }: HomeStatisticsProps) {
  return (
    <section className={`w-full py-12 sm:py-16 bg-slate-50/60 border-y border-slate-200/60 ${className}`}>
      <Container>
        <SectionHeading
          highlight="Our"
          title="Impact in Numbers"
          subtitle="A snapshot of our journey, community reach, and technological initiatives since inception."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-6">
          {associationStats.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 text-center shadow-xs transition-shadow hover:shadow-sm"
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2b3870] tracking-tight">
                {item.value}
              </p>
              <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-slate-500 mt-1.5">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
