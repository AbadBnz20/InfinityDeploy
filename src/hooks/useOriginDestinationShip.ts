import { GetOriginDestinationShip } from "@/actions/originDestination/OriginDestination";
import { OriginDestinationShip } from "@/interfaces/OriginDestination";
import { useEffect, useState } from "react";

export const useOriginaDestinationShip = () => {
 const [Items, setItems] = useState<OriginDestinationShip[]>([])
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const resp = await GetOriginDestinationShip();
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