"use client";

import { DestinationStore } from "@/store/DestinationStore";
import { Radio, RadioGroup } from "@nextui-org/react";

export const StartFilter = () => {
  const {filterHotelsByStars}=DestinationStore();

  const handleChange = (value:string) => {
   console.log(value) 
   filterHotelsByStars(+value);
  };
  return (
    <div className="bg-maincolor rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Clasificacion</h2>
      <RadioGroup color="default" onValueChange={handleChange}>
        {Array.from({ length: 5 }).map((value, index) => (
          <Radio key={index} value={(index + 1).toString()}>
            {index + 1} {index == 0 ? "Estrella" : "Estrellas"}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
};
