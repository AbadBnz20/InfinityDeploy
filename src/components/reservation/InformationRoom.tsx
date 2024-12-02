"use client";
import { SizeImage } from "@/helpers/SizeImage";
import { DestinationStore } from "@/store/DestinationStore";
import { ReservationStore } from "@/store/ReservationStore";
import { Divider, Input } from "@nextui-org/react";
import React from "react";
import { ModalTerm } from "./ModalTerm";

export const InformationRoom = () => {
  const { image, name, nameroom, subtotal, destination, total } =
    ReservationStore();
  const { checkin, checkout, guest } = DestinationStore();

  const getSummary = () => {
    const totalRooms = guest.length;
    const totalAdults = guest.reduce((sum, room) => sum + room.adults, 0);
    const totalChildren = guest.reduce((sum, room) => sum + room.children.length, 0);
    return `${totalRooms} Habitación${totalRooms > 1 ? 'es' : ''}, ${totalAdults} adulto${totalAdults > 1 ? 's' : ''}, ${totalChildren} niño${totalChildren > 1 ? 's' : ''}`;
  };

  return (
    <div className=" md:col-span-2 p-6">
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={SizeImage(image, "x500")}
          alt="Hotel"
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div>
          <h3 className="font-semibold text-xl">{name}</h3>
          <h5 className="font-medium   text-gray-300">{nameroom}</h5>
          <p className="font-semibold text-small">{destination}</p>
        </div>
      </div>
      <div className="space-y-2 mb-4 ">
        <div className="">
          <label htmlFor="firstName" className="text-gray-400 font-medium">
            Check-in
          </label>
          <Input
            id="firstName"
            radius="sm"
            placeholder="MM/YY"
            value={checkin}
            disabled
          />
        </div>
        <div className="">
          <label htmlFor="firstName" className="text-gray-400 font-medium">
            Check-out
          </label>
          <Input
            id="firstName"
            radius="sm"
            placeholder="MM/YY"
            value={checkout}
            disabled
          />
        </div>
        <div className="">
          <label htmlFor="firstName" className="text-gray-400 font-medium">
            Guest
          </label>
          <Input
            id="firstName"
            radius="sm"
            placeholder="MM/YY"
            value={getSummary()}
            disabled
          />
        </div>
      </div>
      <Divider />
      <div className="py-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400 font-medium">Precio por dia</span>
          <span className="font-medium ">{subtotal} USD</span>
        </div>
       
      </div>
      <Divider />
      <div className=" mt-4 pt-4 flex justify-between items-center">
        <span className="font-semibold text-gray-400">Total</span>
        <span className="font-semibold text-xl">{total} USD</span>
      </div>
      <div className="pt-2">
       <p>Leer <ModalTerm/> del hotel. </p>
      </div>
    </div>
  );
};
