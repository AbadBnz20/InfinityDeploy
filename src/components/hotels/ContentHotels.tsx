"use client";
import React, { useEffect, useState } from "react";
import CardHotels from "./CardHotels";
import { DestinationStore } from "@/store/DestinationStore";
import { Spinner } from "@nextui-org/react";

const ContentHotels = () => {
  const { gethotels, hotels,id,checkin,checkout,guest } = DestinationStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      await gethotels();
      setLoading(false);
    };

    fetchHotels();
  }, [id,checkin,checkout,guest]);

  return (
    <div className="w-full md:w-full">
      <div className=" mb-6">
        <h2 className="text-2xl font-semibold ">Resultados</h2>
        <h2 className="text-medium font-medium text-gray-400">Total de resultados encontrados para esta region: {hotels.length} </h2>

      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full h-[300px] flex justify-center items-center">
            <Spinner></Spinner>
          </div>
        ) : hotels.length === 0 ? (
          <div className="col-span-full h-[300px] flex justify-center items-center">
            <em >No se encontraron resultados</em>
          </div>
        ) : (
          hotels.map((item) => (
            <CardHotels
              key={item.DataDetails.id}
              addres={item.DataDetails.address}
              description={item.DataDetails.description_struct[0].paragraphs[0]}
              index={item.DataDetails.id}
              title={item.DataDetails.name}
            
              image={item.DataDetails.images}
              rating={item.DataDetails.star_rating}
               rooms={item.RoomsCheck}
            
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ContentHotels;
