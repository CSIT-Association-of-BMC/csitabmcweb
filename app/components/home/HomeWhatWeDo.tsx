import React from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { associationPillars } from "@/data/about/data";
import { Code2, Users, HeartHandshake, Lightbulb } from "lucide-react";

interface HomeWhatWeDoProps {
  className?: string;
}

const pillarIcons = [Code2, Users, HeartHandshake, Lightbulb];

export function HomeWhatWeDo({ className = "" }: HomeWhatWeDoProps) {
  return (
    <section className={`w-full py-12 sm:py-16 bg-white ${className}`}>
      <Container>
        <SectionHeading
          highlight="What"
          title="We Do"
          subtitle="Through structured workshops, hackathons, and community mentorship, we empower students to learn, grow, and lead."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {associationPillars.map((pillar, index) => {
            const Icon = pillarIcons[index % pillarIcons.length];
            return (
              <div
                key={pillar.title}
                className="rounded-xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col hover:border-slate-300 transition-all hover:shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2b3870] mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
