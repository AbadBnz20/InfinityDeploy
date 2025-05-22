import { GetRegions } from '@/actions/mytrip/Countries';
import { Datum } from '@/interfaces/Regions';
import { useLocale } from 'next-intl';
import  { useState } from 'react'

export const useRegions = (code:string) => {
     const locale = useLocale();
  const [items, setItems] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const LoadRegions = async (text: string)=> {
    setIsLoading(true);
    try {


      const resp = await GetRegions(text,code,locale);
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

}
