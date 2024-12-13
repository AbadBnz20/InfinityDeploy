'use server';

import { Package } from "@/interfaces/package-response";
import { createClient } from "@/utils/supabase/server";


export const GetPackage = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
  .from('package')
  .select('*')
  .eq("state", true);
  if (error) {
    console.log(error)
     return []
  }


   return data as Package[]
};
