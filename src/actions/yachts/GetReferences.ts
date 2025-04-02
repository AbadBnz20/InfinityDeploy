"use server";

import { createClient } from "@/utils/supabase/server";
import { GetNumberContract } from "../mytrip/RegisterTrip";

interface DateYach {
  nameubicacion: string;
  namexperience: string;
  namemotor: string;
  nrocontract: string;
}

export const GetReferences = async (
  ubication: string,
  typeOfExperience: string,
  motorYacht: string
): Promise<DateYach> => {
  const [ubicationname, experience, motoryach] = await Promise.all([
    GetDate(ubication, "origin_destination_ship", "origin_destination_ship_id"),
    GetDate(typeOfExperience, "typeOfExperience", "typeOfExperienceId"),
    GetDate(motorYacht, "motorYacht", "motorYachtId"),
  ]);
  const nrocontract = await GetNumberContract();

  return {
    nameubicacion: ubicationname,
    namexperience: experience,
    namemotor: motoryach,
    nrocontract: nrocontract.data,
  };
};

const GetDate = async (id: string, table: string, references: string) => {
  const supabase = await createClient();

  const { data } = await supabase
    .from(table)
    .select("name")
    .eq(references, id)
    .single();
    console.log(data?.name)

  return data?.name ;
};
