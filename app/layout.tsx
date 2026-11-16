import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./markdown.css";
import NavBar from "@/components/shared/NavBar/NavBar";
import Footer from "@/components/shared/Footer";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig, buildOgImageUrl } from "@/lib/seo";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/lib/structured-data";
import MicrosoftClarity from "@/components/shared/MicrosoftClarity";
import { QueryProvider } from "@/providers/QueryProvider";

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
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Logo | CSIT Association of BMC | Butwal, Nepal",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
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

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');`,
              }}
            />
          </>
        )}

        <MicrosoftClarity />

        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className={poppins.className}>
        <LoadingIndicator />
        <nav className="bg-background/60 backdrop-blur-xl shadow-sm fixed z-50 w-full top-0">
          <NavBar />
        </nav>
        <Toaster />
        <div className="bg-white h-[72px]" />
        <QueryProvider>
          {children}
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
}
