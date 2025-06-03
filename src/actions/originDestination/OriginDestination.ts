"use server";
import { OriginDestination, OriginDestinationShip } from "@/interfaces/OriginDestination";
import {
  Car,
  DetailsDestination,
  Transfer,
} from "@/interfaces/Transfers-response";
import { createClient } from "@/utils/supabase/server";

export const GetOriginDestination = async (id:string) => {
  const supabase = await createClient();

let query = supabase
    .from("category_origin_destination")
    .select(`
      categoryId, name, name_en,
      origin_destination (
        origindestinationId, name, name_en
      )
    `)
    .eq("origin_destination.state", true);

  if (id) {
    query = query.neq("origin_destination.origindestinationId", id);
  }

  const { data: categories } = await query;
  return categories as OriginDestination[];
};


export const GetOriginDestinationShip = async () => {
  const supabase = await createClient();

  const { data: categories } = await supabase.from(
    "origin_destination_ship"
  ).select(`*`).eq("state", true);

  return categories as OriginDestinationShip[];
};



export const GetCars = async (selected: "Ida" | "Ida y vuelta") => {
  const supabase = await createClient();
  const { data: car } = await supabase
    .from("car")
    .select("*")
    .eq("state", true);
  const transfer: Transfer = {
    going: car as Car[],
    return: null,
  };
  if (selected === "Ida y vuelta") {
    transfer.return = car as Car[];
  }
  return transfer;
};

export const GetDetailsDestination = async (
  idorigin: string,
  iddestination: string,
  idcar: string
) => {
  try {
    const [origin, destination, car] = await Promise.all([
      GetDestination(idorigin),
      GetDestination(iddestination),
      GetCar(idcar),
    ]);

    const details: DetailsDestination = {
      origin: origin?.name_es,
      origin_en: origin?.name_en,
      destination: destination?.name_es,
      destination_en: destination?.name_en,
      car: car,
    };

    return details;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GetDestination = async (idDestination: string) => {
  const supabase = await createClient();

  const { data: origin_destination, error } = await supabase
    .from("origin_destination")
    .select("name,name_en")
    .eq("origindestinationId", idDestination)
    .single();

  if (error) {
    return null;
  }

  return {
    name_es: origin_destination.name,
    name_en: origin_destination.name_en,
  };
};

 export const GetCar = async (id: string) => {
  const supabase = await createClient();
  const { data: car, error } = await supabase
    .from("car")
    .select("*")
    .eq("carId", id)
    .single();
  if (error) {
    return null;
  }

  return car as Car;
};
