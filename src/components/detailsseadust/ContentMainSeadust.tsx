"use client";
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
  const { RoomSelected, checkin, checkout } = SeadustStore();

  return (
    <div className="md:flex gap-5">
      <div className="w-full md:w-1/2">
        <DetailRoom id={RoomSelected} checkin={checkin} checkout={checkout} />
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
  );
};
