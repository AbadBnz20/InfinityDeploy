"use client";

import { DestinationStore } from "@/store/DestinationStore";
import { Radio, RadioGroup } from "@nextui-org/react";
import { useTranslations } from "next-intl";

export const StartFilter = () => {
  const { filterHotelsByStars } = DestinationStore();
  const t = useTranslations("Start");
  const handleChange = (value: string) => {
    console.log(value);
    filterHotelsByStars(+value);
  };
  return (
    <div className="bg-maincolor rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Clasificacion</h2>
      <RadioGroup color="default" onValueChange={handleChange}>
        {Array.from({ length: 5 }, (_, index) => 5 - index).map((value) => (
          <Radio key={value} value={value.toString()}>
            {value} {value === 1 ? t("option2") : t("option")}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
};
