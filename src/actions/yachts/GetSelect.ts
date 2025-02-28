"use server";

import { Experience, motorYacht } from "@/interfaces/selectYatch-response";
import { createClient } from "@/utils/supabase/server";

export const GetSelectExperience = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("typeOfExperience")
    .select("*")
    .eq("state", true);
  if (error) {
    return [];
  }

  return data as Experience[];
};

export const GetSelectEngine = async () => {
    const supabase = await createClient();
  
    const { data, error } = await supabase
      .from("motorYacht")
      .select("*")
      .eq("state", true);
    if (error) {
      return [];
    }
  
    return data as motorYacht[];
  };
  

