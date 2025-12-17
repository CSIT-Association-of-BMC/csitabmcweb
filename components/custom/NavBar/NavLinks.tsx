"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface NavLinkProps {
  onClick?: () => void;
  href: string;
  children: ReactNode;
  activeClassName?: string;
  className?: string;
}

const NavLink = ({
  href,
  children,
  activeClassName = "text-primary font-semibold",
  className = "text-slate-700",
  onClick,
}: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === href || pathname === "/" + href;
  const combinedClassName = isActive
    ? `${className} ${activeClassName}`
    : className;

  return (
    <Link
      onClick={onClick}
      href={href}
      className={`${combinedClassName} relative text-sm font-medium transition-colors hover:text-primary group`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
};

export default NavLink;
