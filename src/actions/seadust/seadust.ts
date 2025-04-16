"use server";

import { Room } from "@/interfaces/Room-responses";
import { createClient } from "@/utils/supabase/server";

export const ListRoom = async (guest: number) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("room")
    .select("*")
    .gte("numberOfGuests", guest);

  return data as Room[];
};

export const GetRoom = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("room")
    .select("*")
    .eq("IdRoom", id)
    .single();

  if (error) {
    return null;
  }
  return data as Room;
};

export const InterRoomSeadust = async (
  start_date: string,
  end_date: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  IdRoom: string,
  adult: number,
  children: string,
  note: string
) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("seadusRequest")
    .insert([
      {
        start_date: start_date,
        end_date: end_date,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        IdRoom: IdRoom,
        adult: adult,
        children: children,
        note: note,
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
    message: "Guardado correctamente",
  };
};
