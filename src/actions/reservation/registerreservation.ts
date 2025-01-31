"use server";
import { HotelsApi } from "@/Api/Hotels";
import { OrderBokingResponse } from "@/interfaces/order-boking-response";
import { createClient } from "@/utils/supabase/server";

export interface ReservationStrapi {
  start_date: string;
  end_date: string;
  rooms_number: number;
  number_children: number;
  number_adults: number;
  destination: string;
  price: number;
  sub_total: number;
  discount: number;
  total: number;
  room_name: string;
  hotel_name: string;
  profile_id?: string;
  rom_reservation_id?: string;

}

export const RegisterReservation = async (reservation: ReservationStrapi) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profile")
    .select(`profileId`)
    .eq("user_id", user?.id).single();

  const { data, error } = await supabase
    .from("room_reservation")
    .insert([
      {
        destination: reservation.destination,
        hotel_name: reservation.hotel_name,
        room_name: reservation.room_name,
        rooms_number: reservation.rooms_number,
        number_children: reservation.number_children,
        number_adults: reservation.number_adults,
        start_date: reservation.start_date,
        end_date: reservation.end_date,
        price: reservation.price,
        sub_total: reservation.sub_total,
        discount: reservation.discount,
        total: reservation.total,
        profile_id:profile?.profileId,
      },
    ])
    .select();
     console.log({data})
    if (error) {
       console.log(error);
        return null;
    }



  return data[0] as ReservationStrapi;

  // try {
  //   const resp = await Strapi.post<ReservationResonse>("/bookings", {
  //     data: reservation,
  //   });
  //   return resp.data;
  // } catch (error) {
  //   console.log(error);
  //   return null;
  // }
};

export const OrderBookingForm = async (
  partner_order_id: string,
  book_hash: string
) => {
  try {
    const resp = await HotelsApi.post<OrderBokingResponse>(
      "/hotel/order/booking/form/",
      {
        partner_order_id: partner_order_id,
        book_hash: book_hash,
        language: "es",
        user_ip: "181.115.215.5",
      }
    );
    return resp.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
