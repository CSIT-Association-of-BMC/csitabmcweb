import React from "react";
import Image from "next/image";
import TeamList from "@/app/mb/[id]/TeamList";

export const metadata = {
  title: "About - CSIT Association of BMC",
  description:
    "Learn about CSIT Association of BMC, a non profitable organization created for the welfare of CSIT students at Butwal Multiple Campus.",
};

export default function About() {
  const stats = [
    { label: "Founded", value: "2016" },
    { label: "Active members", value: "120+" },
    { label: "Community events", value: "80+" },
  ];

  const pillars = [
    {
      title: "Peer-led learning",
      description:
        "Hands-on workshops and study circles designed and delivered by students for students.",
    },
    {
      title: "Industry connection",
      description:
        "Partnerships with speakers, alumni, and tech companies to expose members to real projects.",
    },
    {
      title: "Campus support",
      description:
        "We collaborate with the CSIT department to provide technical assistance and event execution.",
    },
    {
      title: "Inclusive community",
      description:
        "Every CSIT student gets a platform to build, present, and receive mentorship regardless of experience.",
    },
  ];

  return (
    <>
      <section className="bg-white py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col gap-3 text-left">
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight">
              Student-led community for builders at Butwal Multiple Campus
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl">
              We are a non-profit student collective established in 2016 to help
              CSIT students grow through hands-on learning, mentorship, and
              campus initiatives.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  We run workshops, hack sessions, and labs that keep the cohort
                  aligned with current technology.
                </p>
                <p>
                  We also assist faculty with technical execution for campus
                  events, giving students chances to lead and collaborate.
                </p>
                <p>
                  Our goal is simple: give every CSIT student the confidence,
                  skills, and community to build meaningful projects and
                  careers.
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
                    className="object-cover"
                  />
                </div>
                <div className="border-t border-slate-200 px-5 py-4">
                  <p className="text-sm font-semibold text-[#2b3870]">
                    Student-led departments
                  </p>
                  <p className="text-sm text-slate-600">
                    Events · Labs · Partnerships · Outreach
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
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
          </div>
        </div>
      </section>

      <TeamList />
    </>
  );
}
