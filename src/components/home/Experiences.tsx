"use client";

import { TapsStore } from "@/store/TapsMainStore";
import { useTranslations } from "next-intl";
import { ContentYachts } from "../Yachts/ContentYachts";
import { Image } from "@nextui-org/react";

export const Experiences = () => {
  const t = useTranslations("Experiences");
  const { tapName } = TapsStore();

  return (
    <section className="py-24 bg-maincolor">
      <div className="container mx-auto px-4">
        {tapName === "yates" ? (
          <>
            <ContentYachts />
          </>
        ) : tapName === "mytrip" ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-16 text-gold-500 ">
              Mi viaje perfecto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  src: "home/destino.jpg",
                  title: "Escoge tu destino",
                  description: "crucero1",
                },
                {
                  src: "home/Personalizatuviaje.jpg",
                  title: "Personaliza tu viaje",
                  description: "crucero2",
                },
                {
                  src: "home/disfrutatusvacaciones.jpg",
                  title: "crucero3",
                  description: "Disfruta tus vacaciones",
                },
              ].map((feature, index) => (
                <div key={index} className="text-center group">
                  <div>
                    <Image
                      isZoomed
                      isBlurred
                      src={feature.src}
                      className="object-cover w-full mb-5"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 ">
                    {feature.title}
                  </h3>
                  {/* <p className="text-gray-500 text-justify">
                    {t(`${feature.description}.description`)}
                  </p> */}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-16 text-gold-500 ">
              {t("title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  src: "home/0003.jpeg",
                  title: "item1",
                  description: "item1",
                },
                {
                  src: "home/0004.jpeg",
                  title: "item2",
                  description: "item2",
                },
                {
                  src: "home/0005.jpeg",
                  title: "item3",
                  description: "item3",
                },
              ].map((feature, index) => (
                <div key={index} className="text-center group">
                  <div>
                    <Image
                      isZoomed
                      isBlurred
                      src={feature.src}
                      className="object-cover w-full mb-5"
                    />
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
          </>
        )}
      </div>
    </section>
  );
};
