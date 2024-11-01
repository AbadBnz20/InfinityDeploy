"use client";
import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
const adults = [
  { key: "1", label: "1 Niño " },
  { key: "2", label: "2 Niños" },
  { key: "3", label: "3 Niños" },
  { key: "4", label: "4 Niños" },
  { key: "5", label: "5 Niños" },
];
export const SelectChildren = () => {
  return (
    <Select
      labelPlacement={"outside"}
      label="Adultos"
      placeholder="Seleccione"
      className="max-w-xs "

    >
      {adults.map((item) => (
        <SelectItem className="text-gray-900" key={item.key}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};
