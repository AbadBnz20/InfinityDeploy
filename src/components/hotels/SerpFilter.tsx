"use client";

import { DestinationStore } from "@/store/DestinationStore";
import { Accordion, AccordionItem, Checkbox } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const instalation = [
  { key: "has_pool", description: "item1.option1" },
  { key: "has_internet", description: "item1.option2" },
  { key: "has_fitness", description: "item1.option3" },
  { key: "has_jacuzzi", description: "item1.option4" },
  { key: "has_spa", description: "item1.option5" },
  {
    key: "kitchen",
    description: "item1.option6",
  },
];

const services = [
  { key: "has_meal", description: "item2.option1" },
  { key: "has_business", description: "item2.option2" },
  {
    key: "has_airport_transfer",
    description: "item2.option3",
  },
  {
    key: "has_disabled_support",
    description: "item2.option4",
  },
];

const comfort = [
  { key: "air_conditioning", description: "item4.option1" },
  { key: "has_parking", description: "item4.option2" },
  {
    key: "has_ecar_charger",
    description: "item4.option3",
  },
  { key: "has_smoking", description: "item4.option4" },
];

const activities = [
  { key: "has_ski", description:  "item5.option1" },
  { key: "has_kids", description: "item5.option2" },
  { key: "beach", description: "item5.option3" },
];

export const SerpFilter = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const { filterHotels } = DestinationStore();
  const t = useTranslations("SerpFilter");
  useEffect(() => {
    filterHotels(filters);
  }, [filters]);

  const handleFilterChange = (value: string) => {
    setFilters((prevFilters) =>
      prevFilters.includes(value)
        ? prevFilters.filter((item) => item !== value)
        : [...prevFilters, value]
    );
  };

  return (
    <div className="bg-maincolor rounded-lg shadow p-6 mt-6">
      <Accordion
        defaultExpandedKeys={["1", "2"]}
        selectionMode="multiple"
        isCompact
        variant="light"
        className="w-full space-y-4"
      >
        <AccordionItem
          key={"1"}
          title={t("item1.title")}
          value="points-of-interest"
        >
          <div className="space-y-2">
            {instalation.map((item) => (
              <div key={item.key} className="flex items-center space-x-2">
                <Checkbox
                  id="has_pool"
                  checked={filters.includes(item.key)}
                  onValueChange={() => handleFilterChange(item.key)}
                />
                <label
                  htmlFor="plaza"
                  className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t(`${item.description}`)}
                </label>
              </div>
            ))}
          </div>
        </AccordionItem>
        <AccordionItem
          key={"2"}
          title={t("item2.title")}
          value="points-of-interest"
        >
          <div className="space-y-2">
            {services.map((item) => (
              <div key={item.key} className="flex items-center space-x-2">
                <Checkbox
                  id="has_pool"
                  checked={filters.includes(item.key)}
                  onValueChange={() => handleFilterChange(item.key)}
                />
                <label
                  htmlFor="plaza"
                  className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t(`${item.description}`)}
                </label>
              </div>
            ))}
          </div>
        </AccordionItem>
        <AccordionItem title={t("item3.title")} value="points-of-interest">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has_pets"
                checked={filters.includes("has_pets")}
                onValueChange={() => handleFilterChange("has_pets")}
              />
              <label
                htmlFor="plaza"
                className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("item3.option1")}
              </label>
            </div>
          </div>
        </AccordionItem>
        <AccordionItem title={t("item4.title")} value="points-of-interest">
          <div className="space-y-2">
            {comfort.map((item) => (
              <div key={item.key} className="flex items-center space-x-2">
                <Checkbox
                  id="has_pool"
                  checked={filters.includes(item.key)}
                  onValueChange={() => handleFilterChange(item.key)}
                />
                <label
                  htmlFor="plaza"
                  className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                   {t(`${item.description}`)}
                </label>
              </div>
            ))}
          </div>
        </AccordionItem>
        <AccordionItem title={t("item5.title")} value="points-of-interest">
          <div className="space-y-2">
            {activities.map((item) => (
              <div key={item.key} className="flex items-center space-x-2">
                <Checkbox
                  id="has_pool"
                  checked={filters.includes(item.key)}
                  onValueChange={() => handleFilterChange(item.key)}
                />
                <label
                  htmlFor="plaza"
                  className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                   {t(`${item.description}`)}
                </label>
              </div>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
