import {  RoomGuest } from "@/components/detailsRoom/FormRoom";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  first_name_original: string;
  last_name_original: string;
  phone: string;
  email: string;
}
interface Partner {
  partner_order_id: string;
}
interface State {
  rooms: RoomGuest[];
  supplier_data: User;
  partner: Partner;
  item_id: number;
  setPaymentData: (
    item_id: number,
    rooms: RoomGuest[],
    supplier_data: User,
    partner: Partner
  ) => void;
}

export const PaymentStore = create<State>()(
  persist(
    (set) => ({
      item_id: 0,
      rooms: [] as RoomGuest[],
      supplier_data: {
        first_name_original: "",
        last_name_original: "",
        phone: "",
        email: "",
      },
      partner: {
        partner_order_id: "",
      },
      setPaymentData: (
        item_id:number,
        rooms: RoomGuest[],
        supplier_data: User,
        partner: Partner
      ) => {
        set({item_id, rooms, supplier_data, partner });
      },
    }),
    {
      name: "PaymentStore",
    }
  )
);
