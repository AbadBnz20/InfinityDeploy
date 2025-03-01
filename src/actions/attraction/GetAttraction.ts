'use server';


import { Attraction } from "@/interfaces/Attaction-responses";
import { createClient } from "@/utils/supabase/server";


export const GetSelectAttraction = async () => {
    const supabase = await createClient();
  
    const { data, error } = await supabase
      .from("attractions")
      .select("*")
      .eq("state", true);
    if (error) {
      return [];
    }
  
    return data as Attraction[];
  };
  