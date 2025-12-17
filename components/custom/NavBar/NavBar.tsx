// NavBar.js
import Image from "next/image";
import Link from "next/link";
import NavLinkList from "./NavLinkList";

const NavBar = async () => {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-slate-200">
        <div className="container mx-auto flex justify-between items-center py-3 px-6">
          <Link href="/">
            <Image
              src="https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png"
              alt="CSIT Association of BMC"
              height={200}
              width={200}
              className="w-12 h-12 object-contain"
            />
          </Link>
          <NavLinkList />

          {/* Render session data */}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
