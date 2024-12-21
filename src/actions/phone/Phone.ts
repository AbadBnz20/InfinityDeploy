"use server";

import { Phone } from "@/interfaces/phone-response";
import { createClient } from "@/utils/supabase/server";

export const GetNumberbyId = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profile")
    .select("profileId")
    .eq("user_id", user?.id);
    const { data: phone } = await supabase
    .from("phone")
    .select("*")
    .eq("profileId", profile?.[0].profileId);

  return phone as Phone[];
};

export const RegisterNumber = async (code: string, number: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profile")
    .select("profileId")
    .eq("user_id", user?.id);

  const { error } = await supabase
    .from("phone")
    .insert({
      type: "Phone",
      code: code,
      number: +number,
      profileId: profile?.[0].profileId,
    })
    .select();
    if (error) {
       return {
        status:false,
        message: error.message
       }
    }

    return{
      status: true,
      message:"Registrado correctamente"
    }


};
