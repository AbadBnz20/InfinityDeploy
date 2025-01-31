"use server";

import { HotelsApi } from "@/Api/Hotels";
import {
  Reservation,
  ReservationStatus,
  StatusReponse,
} from "@/interfaces/reservation-resonse";
import { createClient } from "@/utils/supabase/server";

export const GetReservationById = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profile")
    .select("profileId")
    .eq("user_id", user?.id)
    .single();

    const { data: room_reservation } = await supabase
    .from("room_reservation")
    .select(
      "rom_reservation_id,destination,hotel_name,room_name,rooms_number,number_children,number_adults,start_date,end_date,profile_id"
    )
    .eq("profile_id", profile?.profileId);

  const items: ReservationStatus[] = [];

  if (room_reservation) {
    const promises = room_reservation.map(async (element: Reservation) => {
      const status = await VerifyStatus(element.rom_reservation_id);
      const item: ReservationStatus = {
        rom_reservation_id: element.rom_reservation_id,
        destination: element.destination,
        hotel_name: element.hotel_name,
        room_name: element.room_name,
        rooms_number: element.rooms_number,
        number_children: element.number_children,
        number_adults: element.number_adults,
        start_date: element.start_date,
        end_date: element.end_date,
        profile_id: element.profile_id,
        status: status.status,
        error: status.error,
      };
      return item;
    });

    const results = await Promise.all(promises);
    items.push(...results);
  }

 return items;
};

export const VerifyStatus = async (id: string) => {
  try {
    const resp = await HotelsApi.post<StatusReponse>(
      "/hotel/order/booking/finish/status/",
      {
        partner_order_id: id,
      }
    );
    return {
        status: resp.data.status,
        error: resp.data.error,
    };
  } catch (error) {
    console.log(error);
    return   {
        status:null,
        error: null,
    };
  }
};
