"use server";

import { Room, RoomEmail } from "@/interfaces/Room-responses";
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

export const GetRoomArray = async (Rooms: string[]) => {
  const supabase = await createClient();

  const RoomsRequest: RoomEmail[] = [];

  const promises = Rooms.map(async (item) => {
    const { data, error } = await supabase
      .from("room")
      .select("name, numberOfBeds, typeOfBed")
      .eq("IdRoom", item)
      .single();
    if (error) {
      console.log(error);
    }
    if (data) {
      RoomsRequest.push(data as RoomEmail);
    }
  });

  await Promise.all(promises);

  return RoomsRequest;
};


export const InterRoomSeadust = async (
  start_date: string,
  end_date: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  Rooms: string[],
  adult: number,
  children: string,
  note: string
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seadusRequest")
    .insert([
      {
        start_date: start_date,
        end_date: end_date,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        adult: adult,
        children: children,
        note: note,
      },
    ])
    .select("IdSeadusRequest")
    .single();

  const promises = Rooms.map(async (item) => {
    const { error } = await supabase
      .from("seadustRequest_Room")
      .insert([
        {
          IdSeadustRequest: data?.IdSeadusRequest,
          IdRoom: item,
        },
      ])
      .select();
    if (error) {
      console.log(error);
    }
  });

  await Promise.all(promises);

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
