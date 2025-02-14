"use server";

import { createClient } from "@/utils/supabase/server";

export const RegisterPointsBySession = async (point: number) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profile")
    .select("point")
    .eq("user_id", user?.id)
    .single();

  console.log(profile?.point);

  const {  error } = await supabase
    .from("profile")
    .update({ point: profile?.point + point })
    .eq("user_id", user?.id)
    .select();
  if (error) {
    return {
      status: false,
      message: "Ha ocurrido un error al registrar la reserva",
    };
  }

  return {
    status: true,
    message: "",
  };
};
