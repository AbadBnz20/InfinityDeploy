"use client";

import React, { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import posthog from "posthog-js";
interface Props {
  children: React.ReactNode;
}

export const PostHogProvider = ({ children }: Props) => {
  const key = "phc_FRpBOhgfDYQwPQIoJxFdWdsSEMkiX5rCjgzNFF41RAH";
  const link = "https://us.i.posthog.com";

  useEffect(() => {
    posthog.init(key as string, {
      api_host: link || "https://us.i.posthog.com",
      person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
};

export const PostHogPageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }

      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
};

export const SuspendedPostHogPageView = () => {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
};
