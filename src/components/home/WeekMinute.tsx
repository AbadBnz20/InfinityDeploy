import React from "react";
import "./style.css";
export const WeekMinute = () => {

  return (
    <div className="h-[100vh]">
      {/* {locale === "en" ? (
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
      )} */}

      {/* <h1>{locale}</h1> */}

      <iframe
        src="/api/scrape?url=https://www.mywebrezvacations.com/travser"
        style={{ width: "100%", height: "600px", border: "none" }}
      ></iframe>
    </div>
  );
};
