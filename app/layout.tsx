import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./markdown.css";
import NavBar from "@/components/custom/NavBar/NavBar";
import Footer from "@/components/custom/Footer";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig, buildOgImageUrl } from "@/lib/seo";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/lib/structured-data";
import MicrosoftClarity from "@/components/custom/MicrosoftClarity";
import Clarity from "@microsoft/clarity";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: buildOgImageUrl({ title: siteConfig.name }),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [buildOgImageUrl({ title: siteConfig.name })],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clarityProjectId = process.env.CLARITY_PROJECT_ID as string;
  Clarity.init(clarityProjectId);
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1PYDC70JVG"
        ></script>
        <script>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1PYDC70JVG');`}
        </script>

        <MicrosoftClarity />

        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className={poppins.className}>
        <NextTopLoader showSpinner={false} color="red" />
        <nav className="bg-background/60 backdrop-blur-xl shadow-sm fixed z-50 w-full top-0">
          <NavBar />
        </nav>
        <Toaster />
        <div className="bg-white h-[72px]" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
