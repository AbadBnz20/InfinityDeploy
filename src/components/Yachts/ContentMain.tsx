"use client";
import React from "react";
import { FormYachts } from "./FormYachts";
import { PackageYachts, YachInterface } from "@/interfaces/Yach";
import { YachtsStore } from "@/store/YachtsStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  firstname: string;
  lastname: string;
  email?: string;
  number?: string;
}

interface Props {
  user: User;
  packageYach?:PackageYachts
}

export const ContentMain = ({ user,packageYach }: Props) => {
  const {  date, idEngine, idExperience, passengers } =
    YachtsStore();
  const yachdate = new Date(date);
  const DateYach: YachInterface = {
    user: user,
    yachts: {
      idEngine: idEngine,
      idExperience: idExperience,
      date: yachdate.toISOString(),
      passengers: packageYach ? packageYach.passengers:passengers,
      price: packageYach?.price.toString(),
      image:packageYach?.image,
      yachtPackageId:packageYach?.yachtPackageId,
      points:packageYach?.points.toString(),
      time:packageYach?.time
    },
  };

  return (
    <div>
      <ToastContainer />
      <FormYachts {...DateYach} />
    </div>
  );
};
