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
      {/* larg screen menue */}
      <div className="hidden md:flex justify-end items-center w-full space-x-4 md:mx-4">
        <NavList />
      </div>

      {/* mobile menue */}
      <div className="md:hidden flex items-center w-full justify-end">
        <div className="flex justify-center items-center gap-2">
          <button
            className="h-10 w-10 grid place-items-center rounded-md border border-slate-200 text-slate-900"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col absolute z-[1000] top-[60px] left-0 w-full bg-white border-b border-slate-200 shadow-sm">
          <NavList toggleMenu={toggleMenu} />
        </div>
      )}
    </>
  );
};

export default NavLinkList;

const NavList = ({ toggleMenu }: { toggleMenu?: () => void | boolean }) => {
  return (
    <div className="font-medium flex flex-col space-y-4 py-4 justify-end items-center w-full md:space-x-8 md:flex-row md:space-y-0 text-slate-900">
      {NavLinkPaths.map((item, index) => (
        <NavLink
          href={item.path}
          key={index}
          {...(toggleMenu && { onClick: toggleMenu })}
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};
