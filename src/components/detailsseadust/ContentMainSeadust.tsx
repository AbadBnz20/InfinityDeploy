"use client";
import React from "react";
import { DetailRoom } from "./DetailRoom";
import { SeadustStore } from "@/store/SeadustStore";
import { FormRomSeadust } from "./FormRomSeadust";
import { useTranslations } from "next-intl";

interface Props {
  firstname: string;
  lastname: string;
  email: string | undefined;
  number: string;
}

export const ContentMainSeadust = ({
  firstname,
  lastname,
  email,
  number,
}: Props) => {
  const { RoomSelected, checkin, checkout } = SeadustStore();
  const t = useTranslations("SeadustPage");
  return (
    <>
      <h1 className="text-2xl font-bold mb-2"> {t("title")}</h1>
      <div className="md:flex gap-5">
        <div className="w-full md:w-1/2">
          {RoomSelected.map((room) => (
            <DetailRoom
              key={room.idRoom}
              id={room.idRoom}
              checkin={checkin}
              checkout={checkout}
              amount={room.amount}
            />
          ))}
        </div>
        <div className="w-full md:w-1/2">
          <FormRomSeadust
            firstname={firstname}
            lastname={lastname}
            email={email}
            number={number}
          />
        </div>
      </div>
    </>
  );
};
