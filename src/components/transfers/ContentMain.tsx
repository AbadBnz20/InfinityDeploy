"use client";
import React from "react";
import { ContentTransferdetail } from "../detailstransfers/ContentTransferdetail";
import { FormTransfer } from "./FormTransfer";
import { TransfersStore } from "@/store/TransfersStore";

interface Props {
  firstname: string;
  lastname: string;
  email: string | undefined;
  number: string;
}
export const ContentMain = ({ firstname, lastname, email, number }: Props) => {
  const {
    selected,
    origin,
    destination,
    idcargoing,
    idcarreturn,
    arrivaltime,
    departuretime,
    passengers,
  } = TransfersStore();

  return (
    <>
   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ContentTransferdetail
          origin={origin}
          destination={destination}
          car={idcargoing!}
          datetime={arrivaltime!}
          type="Ida"
        />

        {selected === "Ida y vuelta" && (
          <ContentTransferdetail
            origin={destination}
            destination={origin}
            car={idcarreturn!}
            datetime={departuretime!}
            type="Ida y vuelta"
          />
        )}
        <FormTransfer
        passengers={passengers}
        datetime={arrivaltime}
        firstname={firstname}
        lastname={lastname}
        email={email}
        number={number}
      />
      </div>
      
    </>
  );
};
