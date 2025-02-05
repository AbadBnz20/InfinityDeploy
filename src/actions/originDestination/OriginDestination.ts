"use server";
import { OriginDestination, OriginDestinationShip } from "@/interfaces/OriginDestination";
import {
  Car,
  DetailsDestination,
  Transfer,
} from "@/interfaces/Transfers-response";
import { createClient } from "@/utils/supabase/server";

export const GetOriginDestination = async () => {
  const supabase = await createClient();

  const { data: categories } = await supabase.from(
    "category_origin_destination"
  ).select(`
     categoryId, name,
     origin_destination (
       origindestinationId,name
     )
   `);

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
      origin: origin,
      destination: destination,
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
    .select("name")
    .eq("origindestinationId", idDestination)
    .single();

  if (error) {
    return null;
  }

  return origin_destination?.name;
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
