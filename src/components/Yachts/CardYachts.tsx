import {  PackageYachtsLocation } from "@/interfaces/Yach";
import { Button, Card } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import {
  IoLocationOutline,
  IoPeopleOutline,
  IoTimeOutline,
} from "react-icons/io5";

interface Props {
  yachts: PackageYachtsLocation;
}

export const CardYachts = ({ yachts }: Props) => {
  return (
    <Card className="group max-w-[450px] overflow-hidden  rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Imagen y overlay */}
      <div className="relative w-full">
        <img
          src={yachts.image}
          className="object-fill  h-[270px] w-[100%] transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay superior con puntos */}
        {/* <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
            <IoRibbonOutline className="h-4 w-4" />
            <span>Obtenga {yachts.points} Club Points</span>
          </div>
        </div> */}

        {/* Overlay inferior con ubicación */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t  to-transparent p-4"></div>
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 text-white">
          <IoLocationOutline className="h-5 w-5" />
          <span className="font-medium">{yachts.origin_destination_ship.city.name}, {yachts.origin_destination_ship.name}</span>
        </div>
        <h3 className="text-xl font-semibold ">{yachts.name}</h3>

        {/* Detalles */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <IoPeopleOutline className="h-5 w-5" />
            <div>
              <p className="text-sm font-medium">{yachts.passengers}</p>
              <p className="text-xs">Personas</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <IoTimeOutline className="h-5 w-5" />
            <div>
              <p className="text-sm font-medium">{yachts.time}</p>
              <p className="text-xs">Horas</p>
            </div>
          </div>
        </div>

        {/* Precio y botón */}
        <div className="flex items-end justify-between pt-2">
          <div>
            {/* <p className="text-xs text-slate-500 dark:text-slate-400">Desde</p>
            <p className="text-2xl font-bold text-slate-800  dark:text-slate-300">
              {yachts.price} <span className="text-sm font-normal">MXN</span>
            </p> */}
          </div>
         <Link href={`/yachts/${yachts.yachtPackageId}`}>
         <Button className="bg-black dark:bg-white dark:text-black text-white px-6">
            Solicitar
          </Button>
         </Link>
        </div>
      </div>
    </Card>
  );
};
