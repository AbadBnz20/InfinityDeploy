'use client';
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";

export const adultsArray = [
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
export const childrenArray = [
  { key: "0", label: "0" },
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

interface Props {
  passengers: {
    adults: string;
    children: string;
  };
  setPassengers: React.Dispatch<
    React.SetStateAction<{
      adults: string;
      children: string;
    }>
  >;
}
export const SelectPassengers = ({passengers,setPassengers}:Props) => {
  const [isOpen, setIsOpen] = useState(false);
 const language = useLocale();
  const t = useTranslations("Transfers");
  const getSummaryText = () => {
    const adultsText = `${passengers.adults} ${language === "es" ? "adultos" : "adults"}`;
    const childrenText = passengers.children !== "0" ? `, ${passengers.children} ${language === "es" ? "niños" : "children"}` : "";
    return `${adultsText}${childrenText}`;
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPassengers({...passengers,adults:e.target.value})
  };

  const handleSelectionChangechildren = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPassengers({...passengers,children:e.target.value})
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
                  {t("item7")}
                  </label>
                  <Select
                    defaultSelectedKeys={[passengers.adults]}
                    value={passengers.adults}
                    className="max-w-xs"
                    onChange={handleSelectionChange}
                  >
                    {adultsArray.map((adult) => (
                      <SelectItem key={adult.key}>{adult.label}</SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-black">
                  {t("item8")}
                  </label>

                  <Select
                    defaultSelectedKeys={[passengers.children]}
                    value={passengers.children}
                    onChange={handleSelectionChangechildren}
                  >
                    {childrenArray.map((children) => (
                      <SelectItem key={children.key}>
                        {children.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              <Button
                className="w-full bg-gray-900 text-white"
                onPress={() => setIsOpen(false)}
              >
                 {t("item9")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
