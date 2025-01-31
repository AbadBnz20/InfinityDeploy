"use client";
import React, { useEffect, useState } from "react";
import CardHotels from "./CardHotels";
import { DestinationStore } from "@/store/DestinationStore";
import { Pagination, Spinner } from "@nextui-org/react";
import { ModalLoading } from "../ui/modal/ModalLoading";
import { useTranslations } from "next-intl";

interface Props {
  discount: number;
}
const ContentHotels = ({ discount }: Props) => {
  const {
    gethotels,
    hotels,
    id,
    checkin,
    checkout,
    guest,
    loading: isloading,
  } = DestinationStore();
  const t = useTranslations("Hotels");
  const [filter, setFilter] = useState({
    init: 0,
    final: 9,
  });
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      await gethotels();
      setPercentage(discount);
      setLoading(false);
    };

    fetchHotels();
  }, [id, checkin, checkout, guest]);

  const handlePageChange = (page: number) => {
    setFilter({
      init: 9 * page - 9,
      final: 9 * page,
    });
    window.scrollTo(0, 0);
  };
  return (
    <div className="w-full md:w-full">
      <div className=" mb-6">
        <h2 className="text-2xl font-semibold ">{t("title")}</h2>
        <h2 className="text-medium font-medium text-gray-400">
          {t("subtitle")} {hotels.length}
        </h2>
        {/* <ModalLoading loading={loading} /> */}

     {
        loading && <ModalLoading loading={loading} />
     }

      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isloading ? (
          <div className="col-span-full h-[300px] flex justify-center items-center">
            <Spinner></Spinner>
          </div>
        ) : hotels.length === 0 ? (
          <div className="col-span-full h-[300px] flex justify-center items-center">
            <em>No se encontraron resultados</em>
          </div>
        ) : (
          hotels
            .slice(filter.init, filter.final)
            .map((item) => (
              <CardHotels
                key={item.DataDetails.id}
                addres={item.DataDetails.address}
                description={
                  item.DataDetails.description_struct[0].paragraphs[0]
                }
                index={item.DataDetails.id}
                title={item.DataDetails.name}
                image={item.DataDetails.images}
                rating={item.DataDetails.star_rating}
                rooms={item.RoomsCheck}
                percentage={percentage}
              />
            ))
        )}
        <div className="col-span-full flex justify-center">
          <Pagination
            color="default"
            isCompact
            showControls
            initialPage={1}
            total={Math.ceil(hotels.length / 9)}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentHotels;
