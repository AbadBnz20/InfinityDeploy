"use client";

import { useTranslations } from "next-intl";

export const Experiences = () => {
  const t = useTranslations("Experiences");

  return (
    <section className="py-24 bg-maincolor">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-gold-500 ">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              icon: (
                <svg
                  className="size-16"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M16 5l3 3l-2 1l4 4l-3 1l4 4h-9" />
                  <path d="M15 21l0 -3" />
                  <path d="M8 13l-2 -2" />
                  <path d="M8 12l2 -2" />
                  <path d="M8 21v-13" />
                  <path d="M5.824 16a3 3 0 0 1 -2.743 -3.69a3 3 0 0 1 .304 -4.833a3 3 0 0 1 4.615 -3.707a3 3 0 0 1 4.614 3.707a3 3 0 0 1 .305 4.833a3 3 0 0 1 -2.919 3.695h-4z" />
                </svg>
              ),
              title: "item1",
              description: "item1",
            },
            {
              icon: (
                <svg
                  className="size-16"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3" />
                </svg>
              ),
              title: "item2",
              description: "item2",
            },
            {
              icon: (
                <svg
                  className="size-16"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 18l.01 0" />
                  <path d="M9.172 15.172a4 4 0 0 1 5.656 0" />
                  <path d="M6.343 12.343a8 8 0 0 1 11.314 0" />
                  <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
                </svg>
              ),
              title: "item3",
              description: "item3",
            },
          ].map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="mb-6 text-gold-500 transition-transform duration-300 transform group-hover:scale-110">
                {/* {feature.icon} */}
              </div>
              <h3 className="text-xl font-semibold mb-2 ">
                {t(`${feature.title}.title`)}
              </h3>
              <p className="text-gray-500 text-justify">
                {t(`${feature.description}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
