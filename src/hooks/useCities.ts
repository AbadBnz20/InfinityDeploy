import { GetCities } from '@/actions/mytrip/Countries';
import { Datum } from '@/interfaces/City';
import  { useState } from 'react'

export const useCities = (code_country: string,code_region:string) => {
     const [items, setItems] = useState<Datum[]>([]);
      const [isLoading, setIsLoading] = useState(false);
      const LoadCities = async (text: string)=> {
        setIsLoading(true);
        try {
    
    
          const resp = await GetCities(text,code_country,code_region);
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
  };
}
