"use server";

import { OriginDestination } from "@/interfaces/OriginDestination";
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
  
   return categories as OriginDestination[]

};

