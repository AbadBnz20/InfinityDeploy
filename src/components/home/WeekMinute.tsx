import React from "react";
import "./style.css";
import { useLocale } from "next-intl";
export const WeekMinute = () => {
  const locale = useLocale();

  return (
    <div className="h-[100vh]">
      {locale === "en" ? (
        <iframe
          src="/api/scrape"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Página sin Navbar"
        />
      ) : (
        <iframe
          src="/api/scrapeEs"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Página sin Navbar"
        />
      )}

      <h1>{locale}</h1>
    </div>
  );
};
