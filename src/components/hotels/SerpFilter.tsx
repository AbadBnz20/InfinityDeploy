"use client";

import { DestinationStore } from "@/store/DestinationStore";
import { Accordion, AccordionItem, Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";

const instalation = [
  { key: "has_pool", description: "Piscina disponible" },
  { key: "has_internet", description: "Acceso a internet" },
  { key: "has_fitness", description: "Gimnasio disponible" },
  { key: "has_jacuzzi", description: "Jacuzzi disponible" },
  { key: "has_spa", description: "Spa disponible" },
  {
    key: "kitchen",
    description: "Cocina disponible en la habitación o área común",
  },
];

const services = [
  { key: "has_meal", description: "Servicio de comidas o restaurante" },
  { key: "has_business", description: "Centro de negocios disponible" },
  {
    key: "has_airport_transfer",
    description: "Transporte al aeropuerto disponible",
  },
  {
    key: "has_disabled_support",
    description: "Soporte para personas con discapacidades",
  },
];

const comfort = [
  { key: "air_conditioning", description: "Aire acondicionado disponible" },
  { key: "has_parking", description: "Estacionamiento disponible" },
  {
    key: "has_ecar_charger",
    description: "Cargadores para autos eléctricos disponibles",
  },
  { key: "has_smoking", description: "Zonas permitidas para fumar" },
];

const activities = [
  { key: "has_ski", description: "Acceso o cercanía a actividades de esquí" },
  { key: "has_kids", description: "Actividades o instalaciones para niños" },
  { key: "beach", description: "Cercanía o acceso a la playa" },
];

export const SerpFilter = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const {filterHotels}=DestinationStore();

  useEffect(() => {
    filterHotels(filters);
  }, [filters])
  


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
          title="Instalaciones"
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
                  {item.description}
                </label>
              </div>
            ))}
          </div>
        </AccordionItem>
        <AccordionItem key={"2"} title="Servicios" value="points-of-interest">
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
                  {item.description}
                </label>
              </div>
            ))}
          </div>
        </AccordionItem>
        <AccordionItem title="Mascotas" value="points-of-interest">
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
                Se permiten mascotas
              </label>
            </div>
          </div>
        </AccordionItem>
        <AccordionItem title="Comodidades" value="points-of-interest">
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
                  {item.description}
                </label>
              </div>
            ))}
          </div>
        </AccordionItem>
        <AccordionItem title="Actividades" value="points-of-interest">
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
                  {item.description}
                </label>
              </div>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
