import { GetCountry } from "@/actions/Country/getCountry";
import { CountriesInterfaces } from "@/interfaces/countries";
import { useState } from "react";



export const useCountry = () => {
    const [items, setItems] = useState<CountriesInterfaces[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadCountry = async (text:string) => {
        try {
          setIsLoading(true);
          const resp = await GetCountry(text);
          setItems(resp);
    
    
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

  return {
    items,
    isLoading,
    loadCountry
  }
}
