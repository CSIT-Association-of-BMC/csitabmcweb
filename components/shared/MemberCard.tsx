"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/slugs";
import { resolveImageUrl } from "@/lib/images";
import { formatDesignation } from "@/lib/formatting";

export interface MemberCardData {
  id?: string | number;
  memberId?: string | number;
  slug?: string;
  fullName: string;
  post?: string;
  role?: string;
  passOutYear?: string | number | null;
  image?: string | { url?: string } | null;
  description?: string | null;
  email?: string;
  tags?: string;
  facebookLink?: string;
  linkedLink?: string;
  githubLink?: string;
  tenureSlug?: string;
  isAlumni?: boolean;
}

interface MemberCardProps {
  member: MemberCardData;
  className?: string;
  tenureSlug?: string;
  isAlumni?: boolean;
}

export function MemberCard({
  member,
  className = "",
  tenureSlug,
  isAlumni,
}: MemberCardProps) {
  const initialImage =
    resolveImageUrl(member.image, "/team.jpeg") || "/team.jpeg";
  const [imgSrc, setImgSrc] = useState<string>(initialImage);

  const memberSlug =
    member.slug ||
    (member.fullName ? slugify(member.fullName) : null) ||
    String(member.memberId || member.id || "");

  let profileHref: string | null = null;
  if (memberSlug) {
    if (isAlumni) {
      // Explicit alumni context (e.g. from /about/alumni directory)
      profileHref = `/al/${encodeURIComponent(memberSlug)}`;
    } else if (tenureSlug || member.tenureSlug) {
      // Explicit tenure context (e.g. from /about/our-team tenure view)
      const activeTenure = tenureSlug || member.tenureSlug;
      profileHref = `/mb/${encodeURIComponent(activeTenure!)}/${encodeURIComponent(memberSlug)}`;
    } else if (
      Boolean(member.isAlumni) ||
      (member as any).roleType === "ALUMNI" ||
      Boolean(member.post?.toLowerCase().includes("alumni")) ||
      Boolean(member.role?.toLowerCase().includes("alumni"))
    ) {
      profileHref = `/al/${encodeURIComponent(memberSlug)}`;
    } else {
      profileHref = `/mb/${encodeURIComponent(memberSlug)}`;
    }
  }

  const subtitle = (() => {
    if (isAlumni) {
      const year =
        member.passOutYear ||
        (typeof member.post === "string" ? member.post.match(/\d{4}/)?.[0] : null);
      if (year) {
        const cleanYear = String(year)
          .replace(/^batch of\s*/i, "")
          .replace(/^pass-?out\s*/i, "")
          .replace(/^passed year:\s*/i, "")
          .replace(/^passed out:\s*/i, "")
          .trim();
        return `Passed Year: ${cleanYear}`;
      }
      return "Alumnus Member";
    }
    return formatDesignation(member.post || member.role || "");
  })();

  const isExternalImage =
    imgSrc.startsWith("http://") || imgSrc.startsWith("https://");

  const cardContent = (
    <div
      className={`group bg-white shadow-xs rounded-lg border border-slate-200/70 hover:-translate-y-1 hover:shadow-md transition-all duration-300 p-4 h-full flex flex-col justify-between ${className}`}
    >
      <div className="relative w-full aspect-square rounded-md overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={imgSrc}
          alt={member.fullName}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="rounded-md aspect-square object-cover"
          onError={() => setImgSrc("/team.jpeg")}
          unoptimized={isExternalImage}
        />
      </div>

      <div className="text-center pt-2.5 flex-1 flex flex-col justify-center">
        <div className="h-11 sm:h-12 flex items-center justify-center px-1">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-[#2b3870] transition-colors leading-snug line-clamp-2">
            {member.fullName}
          </h3>
        </div>
        <div className="min-h-[1.25rem] sm:min-h-[1.5rem] flex items-center justify-center mt-1">
          {subtitle && (
            <p className="text-xs sm:text-sm font-medium text-slate-500 line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  if (profileHref) {
    return (
      <Link
        href={profileHref}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b3870] rounded-lg"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
