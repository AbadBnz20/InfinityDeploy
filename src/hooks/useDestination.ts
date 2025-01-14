import { GetDestination } from "@/actions/getDestination";
import { Region } from "@/interfaces/destination-response";
import { useState } from "react";

const region: Region[] = [
  {
    id: 2265,
    name: "Ciudad de México, Estado de México",
    type: "City",
    country_code: "MX",
  },
  {
    id: 6052121,
    name: "Monterrey City, Nuevo León",
    type: "City",
    country_code: "MX",
  },
  {
    id: 279,
    name: "Acapulco, Guerrero",
    type: "City",
    country_code: "MX",
  },
  {
    id: 6051264,
    name: "Guadalajara, Jalisco",
    type: "City",
    country_code: "MX",
  },
  {
    id: 9463,
    name: "Palenque, Chiapas",
    type: "City",
    country_code: "MX",
  },
];

export const useDestination = () => {
  const [items, setItems] = useState<Region[]>(region);
  const [isLoading, setIsLoading] = useState(false);
  const loadDestination = async (text: string) => {
    setIsLoading(true);
    try {
      const resp = await GetDestination(text);
      setItems(resp);

    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return {
    items,
    isLoading,
    loadDestination,
  };
};
