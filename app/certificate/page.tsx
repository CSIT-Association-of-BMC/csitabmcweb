import React from "react";
import InputForm from "./InputForm";
import { generatePageMetadata, siteConfig } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: `Certificate Verification - ${siteConfig.name}`,
  description:
    "Verify your certificates from CSIT Association of BMC. Enter your certificate ID to authenticate workshop, hackathon, and event participation certificates.",
  canonical: `${siteConfig.url}/certificate`,
  keywords: [
    "Certificate Verification",
    "CSIT Certificate",
    "Event Certificate",
    "Workshop Certificate",
    "BMC Verification",
  ],
});

const page = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[20rem]">
        <h2 className="my-5 text-lg">Enter your Certificate ID</h2>
        <InputForm />
      </div>
    </>
  );
};

export default page;
