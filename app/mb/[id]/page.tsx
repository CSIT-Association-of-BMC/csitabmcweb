import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Mail, Github } from "lucide-react";
import { TeamDetails } from "@/app/data";
import NotFound from "@/app/not-found";
import { metadata } from "@/app/layout";
import QueryString from "qs";
import { MemberTypes } from "@/types/Members";
import { fetchWithToken } from "@/lib/fetch";
import Markdown from "react-markdown";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const query = QueryString.stringify(
    {
      populate: {
        image: {
          fields: ["url"],
        },
      },
    },
    { encodeValuesOnly: true }
  );
  const res = await fetchWithToken(
    `${process.env.STRAPI_API_URL}/members/${userId}?${query}`
  );

  if (!res || res.status !== 200) {
    return {
      title: "Member Not Found - CSIT Association of BMC",
    };
  }

  const resJson = await res.json();
  const profile: MemberTypes = resJson.data;

  return {
    title: `${profile.fullName} - CSIT Association of BMC`,
    description:
      profile.description?.substring(0, 160) ||
      `Learn about ${profile.fullName}, ${profile.post} at CSIT Association of BMC.`,
    openGraph: {
      images: profile.image
        ? [
            {
              url: profile.image.url,
              width: 1200,
              height: 600,
              alt: profile.fullName,
            },
          ]
        : [],
    },
  };
}

export default async function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const query = QueryString.stringify(
    {
      populate: {
        image: {
          fields: ["url"],
        },
      },
    },
    { encodeValuesOnly: true }
  );
  const res = await fetchWithToken(
    `${process.env.STRAPI_API_URL}/members/${userId}?${query}`
  );
  if (!res || res.status !== 200) return <NotFound />;
  const resJson = await res.json();
  const profile: MemberTypes = resJson.data;

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

  const introCopy =
    profile.description?.split("\n").find((line) => line.trim().length) ||
    `Get to know ${profile.fullName}, ${profile.post} at CSIT Association of BMC.`;

  const focusTags = profile.tags
    ? profile.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 3)
    : [];

  return (
    <section className="relative bg-gradient-to-b from-white to-[#eef2ff] py-20 px-4 md:px-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-10 h-48 w-48 rounded-full bg-[#2b3870]/10 blur-3xl" />
        <div className="absolute bottom-0 right-12 h-40 w-40 rounded-full bg-[#2b3870]/5 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-10">
        <div className="rounded-3xl border border-white/60 bg-white/90 shadow-lg backdrop-blur px-6 py-10 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                <span className="h-2 w-2 rounded-full bg-[#2b3870]" />
                <span>Executive Spotlight</span>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-slate-500">
                  {profile.post}
                </p>
                <h1 className="text-4xl md:text-5xl font-semibold text-slate-900">
                  {profile.fullName}
                </h1>
              </div>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl">
                {introCopy}
              </p>

              {!!focusTags.length && (
                <div className="flex flex-wrap gap-2">
                  {focusTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-[#2b3870]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-4 right-6 w-full rounded-3xl bg-[#2b3870]/10 blur-2xl" />
              <div className="relative mx-auto h-80 w-full max-w-sm overflow-hidden rounded-3xl border border-white/70 bg-white shadow-xl">
                {profile.image?.url ? (
                  <Image
                    src={profile.image.url}
                    alt={profile.fullName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    No image available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Contact
              </p>
              {profile.email ? (
                <Link
                  href={`mailto:${profile.email}`}
                  className="mt-3 inline-flex items-center gap-3 text-sm font-semibold text-[#2b3870]"
                >
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </Link>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  Email not available
                </p>
              )}
            </div>

            {!!socials.length && (
              <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-4">
                  Social profiles
                </p>
                <div className="flex flex-wrap gap-3">
                  {socials.map(({ icon: Icon, label, href }) => (
                    <Link
                      key={label}
                      href={href as string}
                      className="h-11 w-11 grid place-items-center rounded-2xl border border-slate-200 text-[#2b3870] hover:bg-[#2b3870]/5 transition-colors"
                      aria-label={label}
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {profile.tags && (
              <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-4">
                  Focus areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.tags.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-[#2b3870]"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/60 bg-white/95 p-6 md:p-8 shadow-sm">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                <span className="h-2 w-2 rounded-full bg-[#2b3870]" />
                <span>Profile</span>
              </div>
              <h2 className="text-3xl font-semibold text-slate-900">
                About {firstName}
              </h2>
              <Markdown className="markdown text-slate-700">
                {profile.description}
              </Markdown>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
