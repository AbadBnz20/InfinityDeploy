"use client";
import {  Select, SelectItem } from "@nextui-org/react";
import React from "react";
const animals = [
  { key: "1", label: "1 Habitacion " },
  { key: "2", label: "2 Habitaciones" },
  { key: "3", label: "3 Habitaciones" },
  { key: "4", label: "4 Habitaciones" },
  { key: "5", label: "5 Habitaciones" },
 
];
export const SelectRooms = () => {
  return (
    <Select
      labelPlacement={"outside"}
      label="Habitacion"
      placeholder="Seleccione"
      className="max-w-xs"
    >
      {animals.map((animal) => (
        <SelectItem    className="text-gray-900" key={animal.key}>{animal.label}</SelectItem>
      ))}
    </Select>
  );
};
