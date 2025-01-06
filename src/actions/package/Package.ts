"use server";

import {  Profile } from "@/interfaces/package-response";
import { createClient } from "@/utils/supabase/server";

export const GetPackage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profile")
    .select(`*, package(*)`)
    .eq("user_id", user?.id);

  if (error) {
    console.log(error);
    return {} as Profile;
  }

  return data?.[0] as Profile;
};
