"use client";

import { useState } from "react";
import NavLink from "./NavLinks";
import { Menu, X } from "lucide-react";
import { NavLinkPaths } from "@/app/data";

const NavLinkList = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-8">
        <NavList />
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          className="h-10 w-10 grid place-items-center rounded-lg hover:bg-slate-100 transition-colors text-slate-900"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
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

const NavList = ({ toggleMenu }: { toggleMenu?: () => void | boolean }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-8 py-6 md:py-0 px-4 md:px-0">
      {NavLinkPaths.map((item, index) => (
        <div
          key={index}
          className="py-3 md:py-0 border-b md:border-0 border-slate-100 last:border-0"
        >
          <NavLink
            href={item.path}
            {...(toggleMenu && { onClick: toggleMenu })}
          >
            {item.title}
          </NavLink>
        </div>
      ))}
    </div>
  );
};
