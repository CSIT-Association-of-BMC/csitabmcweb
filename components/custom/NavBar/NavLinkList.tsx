"use client";

import { useState, useRef, useEffect } from "react";
import NavLink from "./NavLinks";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLinkPaths } from "@/app/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isRouteActive } from "@/lib/utils";

// ── Desktop dropdown ────────────────────────────────────────────────
const DesktopDropdown = ({ item }: { item: (typeof NavLinkPaths)[0] }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isAnyChildActive = item.content?.some((child) =>
    isRouteActive(pathname, child.path)
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`relative flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary group
          ${isAnyChildActive ? "text-primary font-semibold" : "text-slate-700"}`}
      >
        {item.title}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        {/* Same underline as NavLink */}
        <span
          className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
            isAnyChildActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-lg py-1 z-50">
          {item.content!.map((child, i) => {
            const isActive = isRouteActive(pathname, child.path);
            return (
              <Link
                key={i}
                href={child.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-slate-50 hover:text-primary
                  ${isActive ? "text-primary font-semibold bg-slate-50" : "text-slate-700"}`}
              >
                {/* Active indicator dot */}
                <span
                  className={`w-1 h-1 rounded-full bg-primary flex-shrink-0 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                {child.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── Mobile accordion ────────────────────────────────────────────────
const MobileDropdown = ({
  item,
  toggleMenu,
}: {
  item: (typeof NavLinkPaths)[0];
  toggleMenu?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isAnyChildActive = item.content?.some((child) =>
    isRouteActive(pathname, child.path)
  );

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between py-3 text-sm font-medium transition-colors
          ${isAnyChildActive ? "text-primary font-semibold" : "text-slate-700"}`}
      >
        {item.title}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200  ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="pb-2 pl-3 flex flex-col gap-1">
          {item.content!.map((child, i) => {
            const isActive = isRouteActive(pathname, child.path);
            return (
              <Link
                key={i}
                href={child.path}
                onClick={toggleMenu}
                className={`flex items-center gap-2 py-2 px-3 text-sm rounded-lg transition-colors hover:bg-slate-50 hover:text-primary
                  ${isActive ? "text-primary font-semibold bg-slate-50" : "text-slate-600"}`}
              >
                <span
                  className={`w-1 h-1 rounded-full bg-primary flex-shrink-0 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                {child.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── NavList ─────────────────────────────────────────────────────────
const NavList = ({ toggleMenu }: { toggleMenu?: () => void }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-8 py-6 md:py-0 px-4 md:px-0">
      {NavLinkPaths.map((item, index) =>
        item.content ? (
          // Has dropdown children
          <div key={index} className="md:py-0">
            {/* Desktop */}
            <div className="hidden md:block">
              <DesktopDropdown item={item} />
            </div>
            {/* Mobile */}
            <div className="md:hidden">
              <MobileDropdown item={item} toggleMenu={toggleMenu} />
            </div>
          </div>
        ) : (
          // Plain link
          <div
            key={index}
            className="py-3 md:py-0 border-b md:border-0 border-slate-100 last:border-0"
          >
            <NavLink
              href={item.path!}
              {...(toggleMenu && { onClick: toggleMenu })}
            >
              {item.title}
            </NavLink>
          </div>
        )
      )}
    </div>
  );
};

// ── Root export ─────────────────────────────────────────────────────
const NavLinkList = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((o) => !o);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8">
        <NavList />
      </div>

      {/* Mobile button */}
      <div className="md:hidden">
        <button
          className="h-10 w-10 grid place-items-center rounded-lg hover:bg-slate-100 transition-colors text-slate-900"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile overlay + panel */}
      {isMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 top-16"
            onClick={toggleMenu}
          />
          <div className="md:hidden fixed top-16 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-lg animate-in slide-in-from-top-2">
            <NavList toggleMenu={toggleMenu} />
          </div>
        </>
      )}
    </>
  );
};

export default NavLinkList;