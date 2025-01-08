import { Button, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";

export const animals = [
  { key: "1", label: "1" },
  { key: "2", label: "2" },
  { key: "3", label: "3" },
  { key: "4", label: "4" },
  { key: "5", label: "5" },
  { key: "6", label: "6" },
  { key: "7", label: "7" },
  { key: "8", label: "8" },
  { key: "9", label: "9" },
];
export const SelectPassengers = () => {
  const [adults, setAdults] = React.useState<string>("2");
  const [children, setChildren] = React.useState("2");
  const [isOpen, setIsOpen] = useState(false);
  const getSummaryText = () => {
    const adultsText = `${adults} adultos`;
    const childrenText = children !== "0" ? `, ${children} niños` : "";
    return `${adultsText}${childrenText}`;
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAdults(e.target.value);
  };

  const handleSelectionChangechildren = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setChildren(e.target.value);
  };

  return (
    <div className="relative w-full max-w-sm ">
      <Button
        variant="solid"
        aria-expanded={isOpen}
        className="w-full justify-between bg-[#f4f4f5]  dark:bg-[#27272a]"
        onPress={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          {getSummaryText()}
        </span>
      </Button>
      {isOpen && (
        <div className="absolute top-full rounded-md shadow-lg z-50 mt-1 w-full bg-white">
          <div className="p-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-black">
                    Adultos
                  </label>
                  <Select
                    defaultSelectedKeys={["2"]}
                    value={adults}
                    className="max-w-xs"
                    onChange={handleSelectionChange}
                  >
                    {animals.map((animal) => (
                      <SelectItem key={animal.key}>{animal.label}</SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-black">
                    Niños
                  </label>

                  <Select
                    defaultSelectedKeys={["2"]}
                    value={children}
                    onChange={handleSelectionChangechildren}
                  >
                    {animals.map((animal) => (
                      <SelectItem key={animal.key}>{animal.label}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              <Button
                className="w-full bg-gray-900 text-white"
                onClick={() => setIsOpen(false)}
              >
                Aceptar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
