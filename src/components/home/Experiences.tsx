"use client";

import { TapsStore } from "@/store/TapsMainStore";
import { useTranslations } from "next-intl";
import { ContentYachts } from "../Yachts/ContentYachts";
import { Image } from "@nextui-org/react";


export const Experiences = () => {
  const t = useTranslations("Experiences");
  const tt = useTranslations("Seadust");
  const ttt = useTranslations("MyperfectHome");
  const tttt = useTranslations("TransfersHome");

  const { tapName } = TapsStore();

  return (
    <section className="py-24 bg-maincolor mt-5">
      <div className="container mx-auto px-4">
        {tapName === "yates" ? (
          <>
            <ContentYachts />
          </>
        ) : tapName === "mytrip" ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-16 text-gold-500 ">
            {ttt("title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  src: "home/destino.jpg",
                  title: "item1",
                  description: "item1",
                },
                {
                  src: "home/Personalizatuviaje.jpg",
                  title: "item2",
                  description: "item2",
                },
                {
                  src: "home/disfrutatusvacaciones.jpg",
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
                  {ttt(`${feature.description}.title`)}
                  </h3>
                  <p className="text-gray-500 text-justify">
                  {ttt(`${feature.description}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : tapName === "seadust" ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-16 text-gold-500 ">
              Seadust
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  src: "seadust/image3.jpg",
                  title: "item",
                  description: "item",
                },
                {
                  src: "seadust/image1.jpg",
                  title: "item2",
                  description: "item1",
                },
                {
                  src: "seadust/image2.jfif",
                  title: "item2",
                  description: "item2",
                },
              ].map((feature, index) => (
                <div key={index} className="text-center group">
                  <div>
                    <Image
                      isZoomed
                    
                      src={feature.src}
                      className="object-cover w-full mb-5 z-2"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 ">
                  {tt(`${feature.description}.title`)}
                  </h3>
                  <p className="text-gray-500 text-justify">
                    {tt(`${feature.description}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </>
        )  : tapName === "traslados" ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-16 text-gold-500 ">
            {tttt("title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  src: "transport/image1.jpg",
                  title: "item1",
                  description: "item1",
                },
                {
                  src: "transport/image2.jpg",
                  title: "item2",
                  description: "item2",
                },
                {
                  src: "transport/image3.jpg",
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
                  {tttt(`${feature.description}.title`)}
                  </h3>
                  <p className="text-gray-500 text-justify">
                  {tttt(`${feature.description}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : tapName === "ultimo" ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-16 text-gold-500 ">
              {/* {t("title")} */}
              Semanas ultimo minuto
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
                      className="object-cover w-full mb-5 z-2"
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
        )  : (
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
                      className="object-cover w-full mb-5 z-2"
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
