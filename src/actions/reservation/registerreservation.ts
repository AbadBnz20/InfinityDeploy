"use server";
import { HotelsApi } from "@/Api/Hotels";
import { Strapi } from "@/Api/Strapi";
import { OrderBokingResponse } from "@/interfaces/order-boking-response";
import { ReservationResonse } from "@/interfaces/reservation-resonse";

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
}

export const RegisterReservation = async (reservation: ReservationStrapi) => {
  try {
    const resp = await Strapi.post<ReservationResonse>("/bookings", {
      data: reservation,
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    return null;
  }
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
    console.log(error)
    return null;
  }
};
