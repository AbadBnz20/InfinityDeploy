'use client';
import { TraverRoom } from "@/interfaces/Weekminute-response";
import React from "react";
import { ContentImage } from "../details/ContentImage";
import { CardDetailWeek } from "../WeekMinute/CardDetailWeek";
import { useLocale } from "next-intl";
import { ModalConfirm } from "../ui/modal/ModalConfirm";
import { useDisclosure } from "@nextui-org/react";
interface Props {
  room: TraverRoom | null;
  user:{
  firstname: string;
  lastname: string;
  email: string | undefined;
  number: string;
}

}

export const ContentMain = ({ room,user }: Props) => {
  const language = useLocale();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <ModalConfirm isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className=" items-center mb-4">
        <h1 className="text-4xl font-bold ">{room?.resort_name}</h1>
        <p className="text-md font-normal text-gray-400">{room?.address}</p>
      </div>
      <div>
        {room && room.images.length > 0 && (
          <ContentImage images={room.images} />
        )}
        <div className="w-full mx-auto p-5 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-2 ">
              { language == 'es' ?'Acerca de la habitacion':'About the room'} 
            </h2>
            <div className="flex justify-between py-5">
              <p className="text-gray-500 dark:text-gray-300">
                  { language == 'es' ?'Precio desde:':'Price from:'}  
                <span className="text-red-500 font-bold">
                  {room?.starting_price}
                </span>
              </p>
              <p className="text-gray-500 dark:text-gray-300">
                 { language == 'es' ?'ID de propiedad:':'Property ID:'}   {room?.property_id}
              </p>
              <p className="text-gray-500 dark:text-gray-300">
                 { language == 'es' ?'Teléfono:':'Phone:'} {" "}
                <a
                  href={`tel:${room?.phone}`}
                  className="text-blue-500 hover:underline"
                >
                  {room?.phone}
                </a>
              </p>
            </div>

            <p className="text-gray-500 dark:text-gray-300">{room?.overview}</p>

            <div className="my-5">
              <h2 className="text-xl font-bold mb-2 ">
                 { language == 'es' ?'Tarifas del Desarrollo':'Development Rates'} 
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {room?.housekeepingFees.map((fee, index) => (
                  <p key={index}>{fee}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2 ">
                { language == 'es' ?'Lista de disponibilidad':'Availability list'} 
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {room?.availabilityList.map((item, index) => (
                  <CardDetailWeek key={index} onOpen={onOpen} user={user}  {...item} address={room?.address} phone={room?.phone} property_id={room?.property_id} hotel_name={room?.resort_name} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
