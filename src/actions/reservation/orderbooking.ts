"use server";
import { HotelsApi } from "@/Api/Hotels";
import { OrderBooking } from "@/interfaces/OrderBookingInterface";

export interface OrderResponse {
  data: null;
  debug: null;
  error: null | string;
  status: "ok" | "error";
}

export const CreateOrderBooking = async (orderBooking: OrderBooking) => {
  try {
    const resp = await HotelsApi.post<OrderResponse>(
      "/hotel/order/booking/finish/",
      orderBooking
    );
    if (resp.data.status === "ok") {
      return {
        status: true,
        message:''
       };
    } else {
      return {
        status: false,
        message:resp.data.error
       };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message:'Ha ocurrido un error al registrar la reserva'
     };
  }
};
