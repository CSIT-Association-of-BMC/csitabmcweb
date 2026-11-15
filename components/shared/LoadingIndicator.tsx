"use client";

import React, { useEffect, Suspense } from "react";
import NextTopLoader from "nextjs-toploader";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

/**
 * Programmatically trigger the top loading progress bar
 */
export const startLoading = () => {
  if (typeof window !== "undefined") {
    NProgress.start();
  }
};

/**
 * Programmatically complete and hide the top loading progress bar
 */
export const stopLoading = () => {
  if (typeof window !== "undefined") {
    NProgress.done();
  }
};

function RouteChangeListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Route change completion: automatically complete the loading bar
  useEffect(() => {
    stopLoading();
  }, [pathname, searchParams]);

  // Safety listener: ensure interrupted/cancelled requests don't leave the bar stuck
  useEffect(() => {
    const handlePopState = () => {
      // Browser back/forward navigation
      startLoading();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
}

export function LoadingIndicator() {
  return (
    <>
      <NextTopLoader
        color="hsl(346.8 77.2% 49.8%)"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px hsl(346.8 77.2% 49.8%), 0 0 5px hsl(346.8 77.2% 49.8%)"
        zIndex={9999}
        showForHashAnchor={false}
      />
      <Suspense fallback={null}>
        <RouteChangeListener />
      </Suspense>
    </>
  );
}

export default LoadingIndicator;

