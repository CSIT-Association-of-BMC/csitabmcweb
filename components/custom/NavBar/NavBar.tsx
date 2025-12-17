// NavBar.js
import Image from "next/image";
import Link from "next/link";
import NavLinkList from "./NavLinkList";

const NavBar = async () => {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center h-20 px-4 sm:px-6">
          <Link href="/" className="group">
            <Image
              src="https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png"
              alt="CSIT Association of BMC"
              height={48}
              width={48}
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain transition-transform group-hover:scale-105"
              priority
            />
          </Link>
          <NavLinkList />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
