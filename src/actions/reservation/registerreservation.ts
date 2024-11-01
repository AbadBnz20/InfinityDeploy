"use server";
import { HotelsApi } from "@/Api/Hotels";
import { Strapi } from "@/Api/Strapi";
import { OrderBokingResponse } from "@/interfaces/order-boking-response";
import { ReservationResonse } from "@/interfaces/reservation-resonse";

export interface ReservationStrapi {
  Fecha_Inicio: string;
  Fecha_Final: string;
  Numero_Habitaciones: number;
  Numero_Ninos: number;
  Numero_Adultos: number;
  Destino: string;
  Precio: number;
  Sub_Total: number;
  Descuento: number;
  Total: number;
  nombre_habitacion: string;
  hotel: string;
}

export const RegisterReservation = async (reservation: ReservationStrapi) => {
  try {
    const resp = await Strapi.post<ReservationResonse>("/reservas", {
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
