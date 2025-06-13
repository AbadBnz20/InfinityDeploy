import { GetCountries } from "@/actions/mytrip/Countries";
import { Datum } from "@/interfaces/Country";
import { LocationCityStore } from "@/store/CodeDestinationStore";
import { useLocale } from "next-intl";
import  { useEffect, useState } from "react";

export const useCountries = (locationCity: LocationCityStore) => {
   const locale = useLocale();
  const [items, setItems] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      if (locationCity.countryCode && locationCity.regionWdId) {
        setItems([
          {
            code: locationCity.countryCode,
            name: locationCity.country,
          },
        ]);
      }
    }, [locationCity]);


  const LoadCountries = async (text: string)=> {

    setIsLoading(true);
    try {
      const resp = await GetCountries(text,locale);
      setItems(resp);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return {
    items,
    isLoading,
    LoadCountries,
  };

};
