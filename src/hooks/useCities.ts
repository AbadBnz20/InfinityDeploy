import { GetCities, LocationCities } from "@/actions/mytrip/Countries";
import { Datum } from "@/interfaces/City";
import { useLocale } from "next-intl";
import { useState } from "react";

export const useCities = (code_country: string, code_region: string) => {
  const locale = useLocale();
  const [items, setItems] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const LoadCities = async (text: string) => {
    setIsLoading(true);
    try {
      const resp = await GetCities(text, code_country, code_region, locale);
      setItems(resp);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const LocationCity = async (text: string) => {
    setIsLoading(true);
    try {
      const resp = await LocationCities(text, locale);
      setItems(resp);

    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return {
    items,
    isLoading,
    LoadCities,
    LocationCity,
  };
};
