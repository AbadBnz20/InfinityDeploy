import { GetRegions } from "@/actions/mytrip/Countries";
import { Datum } from "@/interfaces/Regions";
import {  LocationCityStore } from "@/store/CodeDestinationStore";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export const useRegions = (code: string,locationCityorigin: LocationCityStore) => {
  const locale = useLocale();

  const [items, setItems] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (locationCityorigin.countryCode && locationCityorigin.regionWdId) {
      setItems([
        {
          wikiDataId: locationCityorigin.regionWdId,
          name: locationCityorigin.region,
          countryCode: locationCityorigin.countryCode,
        },
      ]);
    }
  }, [locationCityorigin]);

  const LoadRegions = async (text: string) => {
    setIsLoading(true);
    try {
      const resp = await GetRegions(text, code, locale);
      setItems(resp);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return {
    items,
    isLoading,
    LoadRegions,
  };
};
