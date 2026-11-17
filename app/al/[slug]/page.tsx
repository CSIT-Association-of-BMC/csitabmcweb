import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Facebook, Linkedin, Mail, Github, GraduationCap, Calendar, Award } from "lucide-react";
import Markdown from "react-markdown";
import { getAlumniProfile } from "@/lib/api/team";
import { generateAlumniProfileMetadata, siteConfig } from "@/lib/seo";
import { PersonJsonLd, BreadcrumbJsonLd } from "@/lib/structured-data";
import { Container } from "@/components/shared/Container";
import { resolveImageUrl } from "@/lib/images";
import { formatDesignation } from "@/lib/formatting";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { alumni } = await getAlumniProfile(slug);

  if (!alumni) {
    return {
      title: `Alumni Not Found - ${siteConfig.name}`,
    };
  }

  return generateAlumniProfileMetadata({
    fullName: alumni.fullName,
    graduationYear: alumni.graduationYear,
    bio: alumni.bio || alumni.description || undefined,
    slug: alumni.slug || slug,
    image: resolveImageUrl(alumni.image) || undefined,
  });
}

export default async function AlumniProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { alumni } = await getAlumniProfile(slug);

  if (!alumni) {
    notFound();
  }

  const firstName = alumni.fullName.split(" ")[0] || alumni.fullName;
  const graduationBatch = alumni.graduationYear
    ? `Passed Year: ${alumni.graduationYear}`
    : "Alumni Member";

  const socials = [
    {
      icon: Facebook,
      label: "Facebook",
      href: alumni.facebookLink,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: alumni.linkedLink,
    },
    {
      icon: Github,
      label: "GitHub",
      href: alumni.githubLink,
    },
  ].filter((item) => Boolean(item.href));

  const tagsList = alumni.tags
    ? alumni.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <main className="bg-gradient-to-b from-white via-slate-50 to-[#f0f4ff]">
      <PersonJsonLd
        name={alumni.fullName}
        jobTitle={`Alumni (${graduationBatch})`}
        image={resolveImageUrl(alumni.image) || undefined}
        url={`${siteConfig.url}/al/${alumni.slug || slug}`}
        sameAs={socials
          .map((s) => s.href)
          .filter((href): href is string => Boolean(href))}
        description={alumni.bio || alumni.description || undefined}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Alumni", url: `${siteConfig.url}/about/alumni` },
          {
            name: alumni.fullName,
            url: `${siteConfig.url}/al/${alumni.slug || slug}`,
          },
        ]}
      />

      <section className="w-full py-8 sm:py-10">
        <Container>
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center space-x-2 text-xs sm:text-sm text-slate-500 font-medium"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link
              href="/about/alumni"
              className="hover:text-primary transition-colors"
            >
              Alumni
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold truncate">
              {alumni.fullName}
            </span>
          </nav>

          <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-start">
            {/* Left Column: Portrait and Key Attributes */}
            <div className="lg:col-span-1 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="relative h-72 w-full bg-slate-50">
                  {resolveImageUrl(alumni.image) ? (
                    <Image
                      src={resolveImageUrl(alumni.image)!}
                      alt={alumni.fullName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 320px"
                      unoptimized={resolveImageUrl(alumni.image)!.startsWith("http")}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      No image available
                    </div>
                  )}
                  {/* Top-Right Alumni Badge */}
                  <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50/95 backdrop-blur-xs border border-emerald-200/80 rounded-full px-3 py-1 shadow-xs">
                      <GraduationCap className="h-3 w-3" />
                      {graduationBatch}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 mb-1">
                      <GraduationCap className="h-3.5 w-3.5" />
                      <span>Alumnus / Alumna</span>
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 leading-snug">
                      {alumni.fullName}
                    </h1>
                  </div>

                  {alumni.graduationYear && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span>Passed Year: <strong className="text-slate-900">{alumni.graduationYear}</strong></span>
                    </div>
                  )}

                  {alumni.email && (
                    <Link
                      href={`mailto:${alumni.email}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#2b3870] hover:text-[#1f2b5c] transition-colors break-all"
                    >
                      <Mail className="h-4 w-4 shrink-0" />
                      <span>{alumni.email}</span>
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
                        className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Bio, Past Tenure Roles, and Contact */}
            <div className="lg:col-span-1 space-y-6">
              {/* About / Bio */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                    About {firstName}
                  </p>
                </div>
                <div className="prose prose-slate max-w-none text-slate-700 prose-headings:text-slate-900 prose-a:text-[#2b3870] prose-strong:text-slate-900">
                  <Markdown className="markdown">
                    {alumni.bio || alumni.description || "No biography provided."}
                  </Markdown>
                </div>
              </div>

              {/* Past Committee Tenure Roles (if member previously served in Association tenures) */}
              {alumni.history && alumni.history.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-4 w-4 text-[#2b3870]" />
                    <h2 className="text-lg font-bold text-slate-900">
                      Association Committee Service
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {alumni.history.map((h, idx) => (
                      <Link
                        key={idx}
                        href={`/mb/${h.tenure_slug}/${alumni.slug || slug}`}
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
                  {alumni.email && (
                    <a
                      href={`mailto:${alumni.email}`}
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#2b3870]/40 hover:bg-[#2b3870]/5 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-[#2b3870] mt-0.5 shrink-0" />
                      <div className="space-y-1 min-w-0">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">
                          Email
                        </p>
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {alumni.email}
                        </p>
                      </div>
                    </a>
                  )}

                  {alumni.facebookLink && (
                    <a
                      href={alumni.facebookLink}
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

                  {alumni.linkedLink && (
                    <a
                      href={alumni.linkedLink}
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

                  {alumni.githubLink && (
                    <a
                      href={alumni.githubLink}
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
