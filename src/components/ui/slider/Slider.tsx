"use client";
import React from "react";
import { Autoplay, Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";
import { useTranslations } from "next-intl";

export const Slider = () => {
  const t = useTranslations("slider");

  const arraySlider = [
    {
      img: 'home/002.jfif',
      title: "option1",  
      subtitle: "option1", 
    },
    {
      img: 'home/003.jfif',
      title: "option2",        
      subtitle:"option2", 
    },
    // {
    //   img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0001-c4FngqJGMvcds8oGrOkoicZtd5kjPk.jpg',
    //   title:"option3",  
    //   subtitle:"option3"
    // }
  ];
  return (
    <div>
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 7500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        {arraySlider.map((item, index) => (
          <SwiperSlide key={index}>
            <section  className="relative h-[70vh] overflow-hidden">
              <img
                src={item.img}
                alt="Family enjoying a luxury beach vacation"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold mb-6 animate-fade-in-up text-white">
                    {t(`${item.title}.title`)}
                  </h1>
                  <p className="text-2xl mb-8 animate-fade-in-up animation-delay-300 text-gray-300">
                  {t(`${item.subtitle}.subtitle`)}
                  </p>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
