import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Facebook, Linkedin, Mail, Github } from "lucide-react";
import { MemberTypes } from "@/types/Members";
import { getMemberProfile } from "@/lib/team";
import Markdown from "react-markdown";
import { generateMemberMetadata, siteConfig } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const profile = await getMemberProfile(userId);

  if (!profile) {
    return {
      title: `Member Not Found - ${siteConfig.name}`,
    };
  }

  return generateMemberMetadata({
    fullName: profile.fullName,
    post: profile.post,
    description: profile.description || undefined,
    slug: userId,
    image: profile.image?.url,
  });
}

export default async function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const profile = await getMemberProfile(userId);

  if (!profile) return notFound();

  const firstName = profile.fullName.split(" ")[0] || profile.fullName;
  const socials = [
    {
      icon: Facebook,
      label: "Facebook",
      href: profile.facebookLink,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: profile.linkedLink,
    },
    {
      icon: Github,
      label: "GitHub",
      href: profile.githubLink,
    },
  ].filter((item) => Boolean(item.href));

  const badgeLabel =
    profile.roleType === "ADVISOR" ||
    profile.post?.toLowerCase().includes("advisor") ||
    profile.post?.toLowerCase().includes("mentor")
      ? "Advisor"
      : profile.roleType === "ALUMNI" ||
        profile.post?.toLowerCase().includes("alumni") ||
        profile.post?.toLowerCase().includes("pass-out")
      ? "Alumni Member"
      : "Executive Member";

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-[#f0f4ff]">
      <section className="py-14 md:py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[320px_1fr] gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="relative h-72 w-full bg-slate-50">
                    {profile.image?.url ? (
                      <Image
                        src={profile.image.url}
                        alt={profile.fullName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-400">
                        No image available
                      </div>
                    )}
                    {/* Top-Right Member Role Badge Overlay */}
                    <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
                      <span className="inline-flex items-center text-[11px] font-semibold text-[#2b3870] bg-white/95 backdrop-blur-xs border border-[#2b3870]/20 rounded-full px-3 py-1 shadow-xs">
                        {badgeLabel}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2.5">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500 font-medium">
                        {profile.post}
                      </p>
                      <h1 className="text-xl font-bold text-slate-900 leading-snug mt-0.5">
                        {profile.fullName}
                      </h1>
                    </div>

                    {profile.email ? (
                      <Link
                        href={`mailto:${profile.email}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#2b3870] hover:text-[#1f2b5c] transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        {profile.email}
                      </Link>
                    ) : (
                      <p className="text-sm text-slate-500">
                        Email not available
                      </p>
                    )}
                  </div>
                </div>

                {profile.tags && (
                  <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
                    <p className="text-xs uppercase tracking-wide text-slate-500 mb-3">
                      Skills & Interests
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {profile.tags.split(",").map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-[#2b3870]/8 text-[#2b3870] text-xs font-semibold border border-[#2b3870]/20"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-8">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2 w-2 rounded-full bg-[#2b3870]" />
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                    About {firstName}
                  </p>
                </div>
                <div className="prose prose-slate max-w-none text-slate-700 prose-headings:text-slate-900 prose-a:text-[#2b3870] prose-strong:text-slate-900">
                  <Markdown className="markdown">
                    {profile.description || "No description available."}
                  </Markdown>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Get In Touch
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {profile.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#2b3870]/40 hover:bg-[#2b3870]/5 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-[#2b3870] mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">
                          Email
                        </p>
                        <p className="text-sm font-medium text-slate-900 break-all">
                          {profile.email}
                        </p>
                      </div>
                    </a>
                  )}

                  {profile.facebookLink && (
                    <a
                      href={profile.facebookLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#2b3870]/40 hover:bg-[#2b3870]/5 transition-colors"
                    >
                      <Facebook className="h-5 w-5 text-[#2b3870] mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">
                          Facebook
                        </p>
                        <p className="text-sm font-medium text-slate-900">
                          View profile
                        </p>
                      </div>
                    </a>
                  )}

                  {profile.linkedLink && (
                    <a
                      href={profile.linkedLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#2b3870]/40 hover:bg-[#2b3870]/5 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 text-[#2b3870] mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">
                          LinkedIn
                        </p>
                        <p className="text-sm font-medium text-slate-900">
                          View profile
                        </p>
                      </div>
                    </a>
                  )}

                  {profile.githubLink && (
                    <a
                      href={profile.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#2b3870]/40 hover:bg-[#2b3870]/5 transition-colors"
                    >
                      <Github className="h-5 w-5 text-[#2b3870] mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">
                          GitHub
                        </p>
                        <p className="text-sm font-medium text-slate-900">
                          View profile
                        </p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
