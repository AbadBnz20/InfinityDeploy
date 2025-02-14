"use server";

import { UserCookie } from "@/interfaces/auth-response";
import { createClient } from "@/utils/supabase/server";

export interface TripFormRegister {
  country_origin: string;
  city_origin: string;
  contry_destination: string;
  city_destination: string;
  departure_date: string;
  return_date: string;
  budget: string;
  adult: string;
  children: string;
}

export const RegisterTrip = async (trip: TripFormRegister) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user?.user_metadata);

  const activeuser = user?.user_metadata as UserCookie;

  const { error } = await supabase
    .from("quotes")
    .insert([
      {
        user: `${activeuser.firstname}${activeuser.lastname}`,
        email: user?.email,
        phone: user?.phone,
        country_origin: trip.country_origin,
        city_origin: trip.city_origin,
        contry_destination: trip.contry_destination,
        city_destination: trip.city_origin,
        departure_date: trip.departure_date,
        return_date: trip.return_date,
        budget: trip.budget,
        passengers: +trip.adult + +trip.children,
        adult: trip.adult,
        children: trip.children,
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
