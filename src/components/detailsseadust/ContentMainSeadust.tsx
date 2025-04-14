'use client';
import React from "react";
import { DetailRoom } from "./DetailRoom";
import { SeadustStore } from "@/store/SeadustStore";
import { FormRomSeadust } from "./FormRomSeadust";

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
 const {  RoomSelected, checkin, checkout } = SeadustStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <DetailRoom id={RoomSelected} checkin={checkin} checkout={checkout}  />
      <FormRomSeadust
         firstname={firstname}
         lastname={lastname}
         email={email}
         number={number}
      />
    </div>
  );
};
