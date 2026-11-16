import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Facebook, Linkedin, Mail, Github, Award, History, CalendarDays } from "lucide-react";
import Markdown from "react-markdown";
import { getMemberProfileInTenure } from "@/lib/api/team";
import { generateTenureMemberMetadata, siteConfig } from "@/lib/seo";
import { PersonJsonLd, BreadcrumbJsonLd } from "@/lib/structured-data";
import { Container } from "@/components/shared/Container";
import { resolveImageUrl } from "@/lib/images";
import { formatDesignation } from "@/lib/formatting";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenure: string; slug: string }>;
}) {
  const { tenure, slug } = await params;
  const { profile } = await getMemberProfileInTenure(tenure, slug);

  if (!profile) {
    return {
      title: `Team Member Not Found - ${siteConfig.name}`,
    };
  }

  return generateTenureMemberMetadata({
    fullName: profile.fullName,
    post: profile.post,
    description: profile.description || undefined,
    tenureSlug: profile.tenureSlug,
    tenureName: profile.tenureName,
    slug: profile.slug || slug,
    image: resolveImageUrl(profile.image) || undefined,
  });
}

export default async function TenureMemberProfilePage({
  params,
}: {
  params: Promise<{ tenure: string; slug: string }>;
}) {
  const { tenure, slug } = await params;
  const { profile } = await getMemberProfileInTenure(tenure, slug);

  if (!profile) {
    notFound();
  }

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

  const isAdvisor =
    profile.roleType === "ADVISOR" ||
    profile.post?.toLowerCase().includes("advisor") ||
    profile.post?.toLowerCase().includes("mentor");

  const badgeRole = formatDesignation(profile.post) || (isAdvisor ? "Advisor" : "Executive Member");

  // Other tenures served by this member
  const otherTenures = (profile.history || []).filter(
    (h) => h.tenure_slug.toLowerCase() !== profile.tenureSlug.toLowerCase()
  );

  const tagsList = profile.tags
    ? profile.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <main className="bg-gradient-to-b from-white via-slate-50 to-[#f0f4ff]">
      <PersonJsonLd
        name={profile.fullName}
        jobTitle={`${profile.post} (${profile.tenureName})`}
        image={resolveImageUrl(profile.image) || undefined}
        url={`${siteConfig.url}/mb/${profile.tenureSlug}/${profile.slug || slug}`}
        sameAs={socials
          .map((s) => s.href)
          .filter((href): href is string => Boolean(href))}
        description={profile.description || undefined}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Our Team", url: `${siteConfig.url}/about/our-team` },
          {
            name: profile.tenureName,
            url: `${siteConfig.url}/about/our-team`,
          },
          {
            name: profile.fullName,
            url: `${siteConfig.url}/mb/${profile.tenureSlug}/${profile.slug || slug}`,
          },
        ]}
      />

      <section className="w-full py-8 sm:py-10">
        <Container>
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center space-x-2 text-xs sm:text-sm text-slate-500 font-medium flex-wrap"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link
              href="/about/our-team"
              className="hover:text-primary transition-colors"
            >
              Our Team
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600 font-medium">
              {profile.tenureName}
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold truncate">
              {profile.fullName}
            </span>
          </nav>

          <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-start">
            {/* Left Column: Member Card */}
            <div className="lg:col-span-1 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="relative h-72 w-full bg-slate-50">
                  {resolveImageUrl(profile.image) ? (
                    <Image
                      src={resolveImageUrl(profile.image)!}
                      alt={profile.fullName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 320px"
                      unoptimized={resolveImageUrl(profile.image)!.startsWith("http")}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      No image available
                    </div>
                  )}
                  {/* Top-Right Member Role Badge */}
                  <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#2b3870] bg-white/95 backdrop-blur-xs border border-[#2b3870]/20 rounded-full px-3 py-1 shadow-xs">
                      <Award className="h-3 w-3 text-[#2b3870]" />
                      {badgeRole}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-primary font-semibold mb-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>{profile.tenureName}</span>
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 leading-snug">
                      {profile.fullName}
                    </h1>
                    <p className="text-sm font-medium text-slate-600 mt-0.5">
                      {formatDesignation(profile.post)}
                    </p>
                  </div>

                  {profile.email && (
                    <Link
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#2b3870] hover:text-[#1f2b5c] transition-colors break-all"
                    >
                      <Mail className="h-4 w-4 shrink-0" />
                      <span>{profile.email}</span>
                    </Link>
                  )}
                </div>
              </div>

              {tagsList.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-3">
                    Skills & Areas of Expertise
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tagsList.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-[#2b3870]/8 text-[#2b3870] text-xs font-semibold border border-[#2b3870]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: About, History across tenures, and Contact */}
            <div className="lg:col-span-1 space-y-6">
              {/* About */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2 w-2 rounded-full bg-[#2b3870]" />
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                    About {firstName}
                  </p>
                </div>
                <div className="prose prose-slate max-w-none text-slate-700 prose-headings:text-slate-900 prose-a:text-[#2b3870] prose-strong:text-slate-900">
                  <Markdown className="markdown">
                    {profile.description || "No description provided."}
                  </Markdown>
                </div>
              </div>

              {/* Other Tenures Served by this Member */}
              {otherTenures.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <History className="h-4 w-4 text-[#2b3870]" />
                    <h2 className="text-lg font-bold text-slate-900">
                      Positions in Other Tenures
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {otherTenures.map((h, idx) => (
                      <Link
                        key={idx}
                        href={`/mb/${h.tenure_slug}/${profile.slug || slug}`}
                        className="group flex flex-col p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#2b3870]/40 transition-all shadow-xs"
                      >
                        <span className="text-xs font-semibold text-[#2b3870] group-hover:underline">
                          {formatDesignation(h.designation)}
                        </span>
                        <span className="text-xs text-slate-500 mt-1">
                          Tenure: {h.tenure_name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Get In Touch */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  Connect with {firstName}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {profile.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#2b3870]/40 hover:bg-[#2b3870]/5 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-[#2b3870] mt-0.5 shrink-0" />
                      <div className="space-y-1 min-w-0">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">
                          Email
                        </p>
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {profile.email}
                        </p>
                      </div>
                    </a>
                  )}

                  {profile.facebookLink && (
                    <a
                      href={profile.facebookLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#2b3870]/40 hover:bg-[#2b3870]/5 transition-colors"
                    >
                      <Facebook className="h-5 w-5 text-[#2b3870] mt-0.5 shrink-0" />
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
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#2b3870]/40 hover:bg-[#2b3870]/5 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 text-[#2b3870] mt-0.5 shrink-0" />
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
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#2b3870]/40 hover:bg-[#2b3870]/5 transition-colors"
                    >
                      <Github className="h-5 w-5 text-[#2b3870] mt-0.5 shrink-0" />
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
        </Container>
      </section>
    </main>
  );
}
