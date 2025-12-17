"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import Aos from "aos";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type OrbitalChip = {
  id: string;
  label: string;
  tone: "rose" | "slate" | "emerald" | "amber";
  x: number;
  y: number;
};

const toneClass: Record<OrbitalChip["tone"], string> = {
  rose: "bg-[#2b3870]/5 text-[#2b3870] border-[#2b3870]/30",
  slate: "bg-slate-50 text-slate-700 border-slate-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
};

const HeroLander = () => {
  useEffect(() => {
    Aos.init({ easing: "ease", duration: 700 });
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, active: false });
  const orbit = useMemo<OrbitalChip[]>(
    () => [
      { id: "chip-1", label: "Mentors", tone: "emerald", x: 18, y: 22 },
      { id: "chip-2", label: "Projects", tone: "rose", x: 74, y: 18 },
      { id: "chip-3", label: "Workshops", tone: "amber", x: 82, y: 62 },
      { id: "chip-4", label: "Community", tone: "slate", x: 22, y: 72 },
      { id: "chip-5", label: "Open Source", tone: "rose", x: 52, y: 78 },
    ],
    []
  );

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setSpot({ x, y, active: true });
  };

  return (
    <section
      className="relative min-h-screen flex items-center bg-gradient-to-br from-white via-slate-50 to-[#2b3870]/5"
      id="home"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:90px_90px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          {/* Left content */}
          <div className="space-y-8" data-aos="fade-right">
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#2b3870] animate-pulse" />
              <span>CSIT Association of BMC</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-slate-900">
                CSIT Association
                <span className="block text-[#2b3870]">of BMC</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl">
                Non profit, student led, and future focused since 2016. We build
                spaces where CSIT students learn, ship, and grow together.
              </p>
            </div>

            <div className="text-xl md:text-2xl text-slate-700 min-h-[2rem]">
              <Typewriter
                options={{
                  strings: [
                    "Non Political",
                    "Technological",
                    "Non Profit",
                    "Community Driven",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 80,
                  deleteSpeed: 50,
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#2b3870] hover:bg-[#243061] text-white px-8 py-5 rounded-lg shadow-md shadow-[#2b3870]/10"
              >
                Join Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border border-[#2b3870]/30 text-[#2b3870] hover:bg-[#2b3870]/5 px-8 py-5 rounded-lg"
              >
                Explore Events
              </Button>
            </div>

            {/* Feature boxes removed as requested */}
          </div>

          {/* Right column */}
          <div className="space-y-5" data-aos="fade-left" data-aos-delay="120">
            <div
              ref={containerRef}
              onMouseMove={onMove}
              onMouseLeave={() => setSpot((s) => ({ ...s, active: false }))}
              className="relative overflow-hidden rounded-xl border border-slate-200 bg-white/95 shadow-lg p-6"
            >
              {/* spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                style={{
                  opacity: spot.active ? 1 : 0,
                  background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, rgba(43,56,112,0.20), transparent 55%)`,
                }}
              />
              {/* soft blur blobs */}
              <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#2b3870]/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-sky-200/30 blur-3xl" />

              <div className="relative">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  How we operate
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-900">
                  Learn → Build → Share
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  A lightweight system that keeps you shipping: mentor feedback,
                  small teams, and public demos.
                </p>

                {/* orbit */}
                <div className="relative mt-6 h-[260px] rounded-lg border border-slate-200 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.06),transparent_58%)]" />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-slate-200" />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-slate-200/70" />

                  {/* center */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        CSIT @ BMC
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        Student first
                      </p>
                    </div>
                  </div>

                  {orbit.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-md border px-3 py-1.5 text-xs font-semibold shadow-sm transition-transform hover:-translate-y-[40%] ${
                        toneClass[c.tone]
                      }`}
                      style={{ left: `${c.x}%`, top: `${c.y}%` }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <Button
                    size="sm"
                    className="bg-[#2b3870] hover:bg-[#243061] text-white rounded-lg px-5"
                  >
                    See what we do
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-lg border-[#2b3870]/30 text-[#2b3870] hover:bg-[#2b3870]/5"
                  >
                    View resources
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats removed as requested */}
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroLander;
