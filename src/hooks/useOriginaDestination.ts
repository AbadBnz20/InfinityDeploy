
import { GetOriginDestination } from "@/actions/originDestination/OriginDestination";
import { OriginDestination } from "@/interfaces/OriginDestination";
import { useEffect, useState } from "react";

export const useOriginaDestination = () => {
 const [Items, setItems] = useState<OriginDestination[]>([])
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const resp = await GetOriginDestination();
      setItems(resp);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return {
     Items,
     loading
  };
};
