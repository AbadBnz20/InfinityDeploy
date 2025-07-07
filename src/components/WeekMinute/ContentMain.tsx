"use client";

import React, { useEffect, useState } from "react";
import { CardRoomWeek } from "./CardRoomWeek";
import { useLocale, useTranslations } from "next-intl";
import { Resort } from "@/interfaces/Weekminute-response";
import { GetRoomsDestinations } from "@/actions/WeekMinute/GetRoomsDestinations";
import { ModalLoading } from "../ui/modal/ModalLoading";
import { Button } from "@nextui-org/react";

interface Props {
  slug: string;
}

export const ContentMain = ({ slug }: Props) => {
  const t = useTranslations("Hotels");
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState<Resort[]>([]);
 const language = useLocale();

 const domain= language === 'es' ? 'https://www.mywebrezlatino.com/': 'https://www.mywebrezvacations.com/'


  const [Pagination, setPagination] = useState({
    init: 0,
    final: 0,
    pagination: 1,
  });

  useEffect(() => {
    fetchHotels();
  }, [language]);
  const fetchHotels = async () => {
    setloading(true);
    const resorts = await GetRoomsDestinations(slug,domain);
    setdata(resorts.rooms);
    setPagination({
      init: 1,
      final: resorts.pagination.total || 0,
      pagination: Pagination.pagination + 1,
    });
    setloading(false);
  };

  const onChangePagination = async () => {
    const url = `${slug}/page/${Pagination.pagination}`;
    setloading(true);
    const resorts = await GetRoomsDestinations(url,domain);
    setPagination({
      init: resorts.pagination.currentEnd || 0,
      final: resorts.pagination.total || 0,
      pagination: Pagination.pagination + 1,
    });

    setloading(false);
    setdata(resorts.rooms);
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
          data.map((item, index) => (
            <CardRoomWeek
              key={index}
              background_image={item.background_image}
              price={item.price}
              resort_location={item.resort_location}
              resort_name={item.resort_name}
              see_resort_url={item.see_resort_url}
            />
          ))
        )}
      </div>
      <div className="w-full flex justify-center">
        {Pagination.final !=0 && (
          <Button onPress={() => onChangePagination()}>
            {" "}
            1 - {data.length} de {Pagination.final} Cargar
            mas...
          </Button>
        )}
      </div>
    </div>
  );
};
