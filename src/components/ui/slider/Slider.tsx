"use client";
import React from "react";
import { Autoplay, Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";

interface Props {
  array: Array<any>;
}

export const Slider = ({ array }: Props) => {
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
        {array.map((item, index) => (
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
                    {item.title}
                  </h1>
                  <p className="text-2xl mb-8 animate-fade-in-up animation-delay-300 text-gray-300">
                  {item.subtitle}
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
