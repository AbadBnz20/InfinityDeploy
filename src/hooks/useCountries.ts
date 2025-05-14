import { GetCountries } from "@/actions/mytrip/Countries";
import { Datum } from "@/interfaces/Country";
import  { useState } from "react";

export const useCountries = () => {
  const [items, setItems] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const LoadCountries = async (text: string)=> {

  
    setIsLoading(true);
    try {
      const resp = await GetCountries(text);
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
