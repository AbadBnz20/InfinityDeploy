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
    console.log(resp);
    if (resp.data.status === "ok") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
