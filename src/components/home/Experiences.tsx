"use client";

import { useTranslations } from "next-intl";
import { IoCameraOutline, IoHeartOutline, IoStarOutline } from "react-icons/io5";

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
              icon: <IoStarOutline size={'34px'}/>,
              title: "item1",
              description: "item1",
            },
            {
              icon: <IoHeartOutline size={'34px'}/>,
              title: "item2",
              description: "item2",
            },
            {
              icon: <IoCameraOutline size={'34px'}/>,
              title: "item3",
              description: "item3",
            },
          ].map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="mb-6 text-gold-500 transition-transform duration-300 transform group-hover:scale-110">
                {feature.icon}
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
