export interface NavDropdownItem {
  title: string;
  path: string;
}

export interface NavLinkItem {
  title: string;
  path: string | null;
  content: NavDropdownItem[] | null;
}

export const NavLinkPaths: NavLinkItem[] = [
  {
    title: "Home",
    path: "/",
    content: null,
  },
  {
    title: "Events",
    path: "/events",
    content: null,
  },
  {
    title: "Notices",
    path: "/notices",
    content: null,
  },
  {
    title: "About",
    path: null,
    content: [
      { title: "CSITABMC", path: "/about/csitabmc" },
      { title: "Our Team", path: "/about/our-team" },
      { title: "Alumni", path: "/about/alumni" },
    ],
  },
  {
    title: "Resources",
    path: null, // non-navigating dropdown trigger
    content: [
      { title: "Entrance Exam", path: "https://mock.csitabmc.com/" },
      { title: "Semester Exam", path: "/study-materials/semester-exam" },
      { title: "Blogs", path: "/blogs" },
    ],
  },
  {
    title: "Contact",
    path: "/contact",
    content: null,
  },
];
