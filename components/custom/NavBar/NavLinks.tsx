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
  activeClassName = "text-[#2b3870]",
  className = " ",
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
      className={combinedClassName + " hover:text-[#2b3870] text-[15px]"}
    >
      {children}
    </Link>
  );
};

export default NavLink;
