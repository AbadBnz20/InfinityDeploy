"use server";

import { createClient } from "@/utils/supabase/server";

interface YachtFormRegister {
  date: string;
  time: string;
  passengers: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ubicationId: string;
  typeOfExperienceId: string;
  motorYachtId: string;
  packageYachtId?: string;
}

export const RegisterYacht = async (yacht: YachtFormRegister) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("yachtRequest")
    .insert([
      {
        date: yacht.date,
        time: yacht.time,
        passengers: yacht.passengers,
        firstName: yacht.firstName,
        lastName: yacht.lastName,
        email: yacht.email,
        phone: yacht.phone,
        ubicationId: yacht.ubicationId,
        typeOfExperienceId: yacht.typeOfExperienceId,
        motorYachtId: yacht.motorYachtId,
        packageYachtId: yacht.packageYachtId,
      },
    ])
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  return {
    status: true,
    message: "Datos enviado correctamente",
  };
};
