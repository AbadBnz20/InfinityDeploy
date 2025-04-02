"use server";

import { createClient } from "@/utils/supabase/server";
interface Hotel {
  rating: number;
  service: string;
}
export interface TripFormRegister {
  country_origin: string;
  city_origin: string;
  contry_destination: string;
  city_destination: string;
  date_start: string;
  date_end: string;
  flight?: boolean;
  hotel?: Hotel;
  car?: string;
  attractions?: string;
  adult: string;
  children: Array<string>;
  details: string;
  budget: string;
  currency: string;
}

export const RegisterTrip = async (trip: TripFormRegister) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("quotes")
    .insert([
      {
        user: `${user?.user_metadata.firstname} ${user?.user_metadata.lastname}`,
        email: user?.email,
        phone: user?.phone,
        country_origin: trip.country_origin,
        city_origin: trip.city_origin,
        contry_destination: trip.contry_destination,
        city_destination: trip.city_origin,
        departure_date: trip.date_start,
        return_date: trip.date_end,
        flight: trip.flight,
        hotel: trip.hotel,
        car: trip.car,
        attractions: trip.attractions,
        details: trip.details,
        budget: trip.budget,
        adult: +trip.adult,
        childrens: trip.children,
        currency: trip.currency,
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

export const GetNumberContract = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
   
  const { data: profile, error } = await supabase
    .from("profile")
    .select("NroContract")
    .eq("user_id", user?.id)
    .single();

  if (error) {
    return {
      status: false,
      message: error.message,
      data: null,
    };
  }

  return {
    status: true,
    message: "Exitoso",
    data: profile?.NroContract,
  };
};
