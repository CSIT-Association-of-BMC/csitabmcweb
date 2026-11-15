export interface HeroTag {
  text: string;
  variant?: "primary" | "secondary" | "accent";
}

export interface HeroContent {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  tags: HeroTag[];
}

export const homeHeroContent: HeroContent = {
  badge: "Student-Led Tech Community",
  titlePrefix: "Empowering",
  titleHighlight: "CSIT Students",
  titleSuffix: "at Butwal Multiple Campus",
  description:
    "A vibrant community driving technological innovation, peer mentorship, workshops, and hackathons since 2016 in Butwal, Nepal.",
  primaryCta: {
    label: "Explore Events",
    href: "/events",
  },
  secondaryCta: {
    label: "About Community",
    href: "/about/csitabmc",
  },
  tags: [
    { text: "Workshops", variant: "primary" },
    { text: "Hackathons", variant: "secondary" },
    { text: "Tech Talks", variant: "accent" },
    { text: "Mentorship", variant: "primary" },
  ],
};
