import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: React.ReactNode;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  title,
  highlight,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={cn("mb-10 sm:mb-12", isCenter ? "text-center" : "text-left", className)}>
      <h2
        className={cn(
          "relative pb-2.5 text-2xl sm:text-3xl font-medium text-slate-900 inline-block tracking-tight",
          titleClassName
        )}
      >
        {highlight && (
          <>
            <span className="text-primary font-semibold">{highlight}</span>
            {" "}
          </>
        )}
        {title}
        <span
          className={cn(
            "absolute bottom-0 h-[2.5px] bg-primary rounded-full",
            isCenter
              ? "left-1/2 -translate-x-1/2 w-48 sm:w-60"
              : "left-0 w-32 sm:w-40"
          )}
        />
      </h2>

      {subtitle && (
        <p className={cn("mt-3.5 text-sm sm:text-base text-slate-600 max-w-2xl", isCenter && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
