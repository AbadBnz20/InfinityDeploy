"use server";

import { createClient } from "@/utils/supabase/server";
import { GetNumberContract } from "../mytrip/RegisterTrip";

interface DateYach {
  namexperience: string;
  namemotor: string;
  nrocontract: string;
}

export const GetReferences = async (
  typeOfExperience: string,
  motorYacht: string
): Promise<DateYach> => {
  const [ experience, motoryach] = await Promise.all([
    GetDate(typeOfExperience, "typeOfExperience", "typeOfExperienceId"),
    GetDate(motorYacht, "motorYacht", "motorYachtId"),
  ]);
  const nrocontract = await GetNumberContract();

  return {
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
