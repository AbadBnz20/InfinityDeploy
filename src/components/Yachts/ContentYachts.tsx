import React, { useEffect, useState } from "react";
import { CardYachts } from "./CardYachts";
import {  PackageYachtsLocation } from "@/interfaces/Yach";
import { PackagesYachts } from "@/actions/yachts/PackageById";
import { Spinner } from "@nextui-org/react";
import { useLocale } from "next-intl";

export const ContentYachts = () => {
  const [items, setItems] = useState<PackageYachtsLocation[]>([]);
  const [loading, setloading] = useState(false);
 const language = useLocale()
  useEffect(() => {
    OnGetPackage();
  }, []);

  const OnGetPackage = async () => {
    setloading(true);
    const resp = await PackagesYachts();
    setItems(resp);
    setloading(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-16 text-gold-500 ">
        {language === "es" ? "Tipos Yates" : "Types of Yachts"} 
      </h2>
      {loading ? (
        <div className="w-full h-[300px] flex items-center justify-center">
          <Spinner />
        </div>
      ) : items.length === 0 ? (
        <div className="w-full h-[300px] flex items-center justify-center">
          <em> {language == "es" ?"No hay ofertas disponibles en este momento.": "There are no offers available at this time."}</em>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3">
          {items.map((item) => (
            <CardYachts yachts={item} key={item.yachtPackageId} />
          ))}
        </div>
      )}
    </div>
  );
};
