"use client";

import React, { useEffect, useState } from "react";
import { CardRoomWeek } from "./CardRoomWeek";
import { useTranslations } from "next-intl";
import { Resort } from "@/interfaces/Weekminute-response";
import { GetRoomsDestinations } from "@/actions/WeekMinute/GetRoomsDestinations";
import { ModalLoading } from "../ui/modal/ModalLoading";

interface Props {
  slug: string;
}

export const ContentMain = ({ slug }: Props) => {
  const t = useTranslations("Hotels");
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState<Resort[]>([]);

  useEffect(() => {
    fetchHotels();
  }, []);
  const fetchHotels = async () => {
    setloading(true);
    const resorts = await GetRoomsDestinations(slug);
    setdata(resorts);
    setloading(false);
  };

  return (
    <div className="w-full md:w-full">
      <div className=" mb-6">
        <h2 className="text-2xl font-semibold ">{t("title")}</h2>
        <h2 className="text-medium font-medium text-gray-400">
          {/* {t("subtitle")} {Rooms.length} */}
        </h2>
        {/* <ModalLoading loading={loading} /> */}

        {loading && <ModalLoading loading={loading} />}
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2].length === 0 ? (
          <div className="col-span-full h-[300px] flex justify-center items-center">
            <em>No se encontraron resultados</em>
          </div>
        ) : (
          data.map((item, index) => <CardRoomWeek key={index} background_image={item.background_image} price={item.price} resort_location={item.resort_location} resort_name={item.resort_name} see_resort_url={item.see_resort_url} />)
        )}
      </div>
    </div>
  );
};
