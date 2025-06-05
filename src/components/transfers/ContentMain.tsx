"use client";
import React from "react";
import { ContentTransferdetail } from "../detailstransfers/ContentTransferdetail";
import { FormTransfer } from "./FormTransfer";
import { TransfersStore } from "@/store/TransfersStore";
import { useTranslations } from "next-intl";
import { ToastContainer } from "react-toastify";

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
  const t = useTranslations("TransfersPage");
  return (
    <>
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-2">{t("titleMain")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex-grow-0 flex-shrink-0">
          <ContentTransferdetail
            origin={origin}
            destination={destination}
            car={idcargoing!}
            datetime={arrivaltime!}
            type="Ida"
          />
        </div>

        {selected === "Ida y vuelta" && (
          <div className="flex-grow-0 flex-shrink-0">
            <ContentTransferdetail
              origin={destination}
              destination={origin}
              car={idcarreturn!}
              datetime={departuretime!}
              type="Ida y vuelta"
            />
          </div>
        )}
        <div className={`${selected === "Ida y vuelta" ? 'col-span-full':''} flex-grow flex-shrink`}>
          <FormTransfer
            passengers={passengers}
            datetime={arrivaltime}
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
