import { NavLinkPaths } from "@/app/data";
import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavBar/NavLinks";
import { Linkedin, Instagram, Facebook, Github } from "lucide-react";

const keyLinks = NavLinkPaths.slice(0, 4);
const currentYear = new Date().getFullYear();

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

  const linkColumns = [
    keyLinks.slice(0, Math.ceil(keyLinks.length / 2)),
    keyLinks.slice(Math.ceil(keyLinks.length / 2)),
  ];

  return (
    <footer className="relative overflow-hidden text-slate-50 bg-[#2b3870]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 space-y-10 relative z-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="CSIT Association of BMC">
              <Image
                src="https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png"
                alt="CSIT Association of BMC"
                height={52}
                width={52}
                className="h-12 w-12 rounded-xl bg-white/10 p-2 backdrop-blur"
              />
            </Link>
            <div>
              <p className="text-sm font-semibold text-white">
                CSIT Association of BMC
              </p>
              <p className="text-xs text-slate-100/80">
                Creating the World Bit by Bit
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-100/80">
            <a
              href="/about"
              className="rounded-full border border-white/20 px-4 py-2 hover:bg-white/10 transition-colors"
            >
              About
            </a>
            <a
              href="/events"
              className="rounded-full border border-white/20 px-4 py-2 hover:bg-white/10 transition-colors"
            >
              Events
            </a>
            <a
              href="/contact"
              className="rounded-full border border-white/20 px-4 py-2 hover:bg-white/10 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[2fr_1fr] items-start">
          <div className="grid gap-3 text-sm text-slate-100/80 sm:grid-cols-2 sm:gap-4">
            <a
              href="mailto:team@csitabmc.com"
              className="rounded-lg w-fit sm:w-auto border border-white/10 bg-white/5 px-4 py-3 hover:border-white/25 transition-colors"
            >
              team@csitabmc.com
            </a>
            <a
              href="tel:+977-9841148149"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 hover:border-white/25 transition-colors"
            >
              +977-9841148149
            </a>
            <a
              href="tel:+977-9841148149"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 hover:border-white/25 transition-colors"
            >
              Golpark-3, Butwal
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-100/80 md:flex-row md:items-center md:justify-between">
          <p className="text-xs sm:text-sm">
            © {currentYear} CSIT Association of BMC.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                className="h-10 w-10 grid place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15"
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
