"use client";

import { Partnerdata } from "@/data/about/data";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface CommunityPartnersProps {
  className?: string;
  withContainer?: boolean;
  showHeader?: boolean;
}

export default function Component({
  className = "",
  withContainer = true,
  showHeader = true,
}: CommunityPartnersProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let animationId: number;
    let start: number | null = null;
    const totalWidth = marquee.scrollWidth / 2;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const move = (progress * 0.05) % totalWidth;
      marquee.style.transform = `translateX(-${move}px)`;
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const content = (
    <div className={cn("w-full py-4 overflow-hidden", className)}>
      {showHeader && (
        <SectionHeading
          highlight="Brand"
          title="Collaborations"
          subtitle="Organizations and community partners we have collaborated with to empower students."
          className="mb-8 sm:mb-10"
        />
      )}
      <div className="relative">
        <div
          className="flex items-center overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div ref={marqueeRef} className="flex">
            {Partnerdata.concat(Partnerdata).map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-16">
                <img
                  src={logo.Image}
                  alt="CSITABMC Partner"
                  className="h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (!withContainer) {
    return content;
  }

  return <Container>{content}</Container>;
}
