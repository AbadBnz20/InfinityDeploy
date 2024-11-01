import { GetDestination } from "@/actions/getDestination";
import {  Region } from "@/interfaces/destination-response";
import { useState } from "react";



export const useDestination = () => {
    const [items, setItems] = useState<Region[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadPokemon = async (text:string) => {
        try {
          setIsLoading(true);
          const resp = await GetDestination(text);
          setItems(resp);
    
    
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

  return {
    items,
    isLoading,
    loadPokemon
  }
}
