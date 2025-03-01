'use server';

import { CategoryCar } from "@/interfaces/CategoryCar-response";
import { createClient } from "@/utils/supabase/server";


export const GetSelectCategoryCar = async () => {
    const supabase = await createClient();
  
    const { data, error } = await supabase
      .from("categoryCars")
      .select("*")
      .eq("state", true);
    if (error) {
      return [];
    }
  
    return data as CategoryCar[];
  };
  