import React from "react";
import Image from "next/image";
import TeamList from "@/app/mb/[id]/TeamList";
import { generatePageMetadata, siteConfig, buildOgImageUrl } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: `About Us - ${siteConfig.name}`,
  description:
    "Learn about CSIT Association of BMC, a non-profit student-led tech community founded in 2016, empowering CSIT and IT students at Butwal Multiple Campus through workshops, hackathons, and mentorship.",
  canonical: `${siteConfig.url}/about`,
  ogImage: buildOgImageUrl({
    title: "About Us",
    subtitle: "Student-led Tech Community in Butwal",
    type: "page",
  }),
  keywords: [
    "About CSIT Association",
    "CSIT Association BMC",
    "Butwal Multiple Campus",
    "Tech Community",
    "Student Organization Nepal",
    "CSIT Students Butwal",
  ],
});

export default function About() {
  const stats = [
    { label: "Founded", value: "2016 AD" },
    { label: "Executive members", value: "15" },
    { label: "Community events", value: "110+" },
    { label: "Students Impacted", value: "10000+" },
    { label: "Partnered Org.", value: "100+" },
  ];

  const pillars = [
    {
      title: "Skill building & participation",
      description:
        "Workshops, training, and guided participation to help students learn and grow.",
    },
    {
      title: "Industry mentoring & networking",
      description:
        "Connecting students with professionals, alumni, and tech communities.",
    },
    {
      title: "Student welfare & campus support",
      description:
        "Working with the CSIT department to support events and student initiatives.",
    },
    {
      title: "Hackathons & innovation",
      description:
        "Hackathons and challenges that drive innovation and real-world problem solving.",
    },
  ];

  return (
    <>
      <section className="bg-white py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col gap-3 text-left">
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight">
              Student-led community for learners at Butwal
            </h1>

          </div>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-slate-200 bg-white p-4"
                  >
                    <p className="text-2xl font-semibold text-[#2b3870]">
                      {item.value}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-slate-700">
                <p>
                  We are a non-profit, student-led organization founded in 2016,
                  dedicated to helping IT students learn, grow, and lead.
                </p>

                <p>
                  Through workshops, hackathons, and hands-on sessions, we keep
                  students aligned with current technology while encouraging
                  collaboration and innovation.
                </p>

                <p>

                  Our goal is simple: give every student the confidence, skills,
                  and community to build meaningful innovations and real-world
                  impacts.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="relative h-80">
                  <Image
                    src="/team.jpeg"
                    alt="CSIT Association team members"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="border-t border-slate-200 px-5 py-4">
                  <p className="text-sm font-semibold text-[#2b3870]">
                    CSITABMC Tenure 2082/83
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-lg border border-slate-200 bg-white p-4"
              >
                <p className="text-sm font-semibold text-[#2b3870]">
                  {pillar.title}
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TeamList />
    </>
  );
}
