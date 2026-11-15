import React from "react";
import Image from "next/image";
import Link from "next/link";

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
}

interface MemberCardProps {
  member: MemberCardData;
  className?: string;
}

export function MemberCard({ member, className = "" }: MemberCardProps) {
  const imageUrl =
    typeof member.image === "string"
      ? member.image
      : member.image?.url || "/team.jpeg";

  const profileHref = member.memberId
    ? `/mb/${member.memberId}`
    : member.slug
    ? `/mb/${member.slug}`
    : member.id
    ? `/mb/${member.id}`
    : null;

  const subtitle =
    member.passOutYear != null && member.passOutYear !== ""
      ? String(member.passOutYear)
      : member.post || member.role || "";

  const cardContent = (
    <div
      className={`group bg-white shadow-sm rounded-lg border border-slate-200/70 hover:-translate-y-1 hover:shadow-md transition-all duration-300 p-4 h-full flex flex-col justify-between ${className}`}
    >
      <div className="relative w-full aspect-square rounded-md overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={imageUrl}
          alt={member.fullName}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="rounded-md aspect-square object-cover"
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
            <p
              className="text-gray-600 text-xs sm:text-sm line-clamp-1"
              title={subtitle}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  if (profileHref) {
    return (
      <Link href={profileHref} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

export default MemberCard;
