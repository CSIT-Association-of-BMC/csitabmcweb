import { NavLinkPaths } from "@/app/data";
import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavBar/NavLinks";
import { Linkedin, Instagram, Facebook, Github } from "lucide-react";

const keyLinks = NavLinkPaths.slice(0, 4);

export default function Footer() {
  const socials = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://np.linkedin.com/company/csitabmc",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/csitabmc",
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://www.facebook.com/csit.bmc",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/CSIT-Association-of-BMC/csitabmcweb",
    },
  ];

  return (
    <footer className="relative border-t border-slate-200 bg-gradient-to-b from-white to-[#eef2ff]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2b3870]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-[#2b3870]">
                CSIT Association of BMC{" "}
              </h3>
            </div>
            <p className="text-sm text-slate-600">
              Meetups, Workshops, Hackathons, Tech Talks and so on organized
              entirely by CSIT students at Butwal Multiple Campus.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
              <a
                href="tel:+977-9841148149"
                className="hover:text-[#2b3870] transition-colors"
              >
                +977-9841148149
              </a>
              <span className="hidden text-slate-300 md:block">•</span>
              <a
                href="mailto:team@csitabmc.com"
                className="hover:text-[#2b3870] transition-colors"
              >
                team@csitabmc.com
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700 mb-4">
              Quick links
            </p>
            <nav className="grid gap-3 text-sm text-slate-600">
              {keyLinks.map((item) => (
                <NavLink
                  key={item.path}
                  href={item.path}
                  className="text-slate-600 hover:text-[#2b3870]"
                >
                  {item.title}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="CSIT Association of BMC">
              <Image
                src="https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png"
                alt="CSIT Association of BMC"
                height={48}
                width={48}
                className="h-12 w-12 object-contain"
              />
            </Link>
            <p>© {new Date().getFullYear()} CSIT Association of BMC.</p>
          </div>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                className="h-10 w-10 grid place-items-center rounded-full border border-slate-200 bg-white text-[#2b3870] hover:bg-[#2b3870]/5 transition-all"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
