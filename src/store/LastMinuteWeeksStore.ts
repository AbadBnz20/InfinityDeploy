import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  destination: string;
  hotel_name: string;
  property_id: string;
  address: string;
  phone: string;
  start_date: string;
  final_date: string;
  details: string;
  price: string;

  SetDestination: (destination: string) => void;
  SetInfoHotel: (
    hotel_name: string,
    property_id: string,
    address: string,
    phone: string,
    start_date: string,
    final_date: string,
    details: string,
    price: string
  ) => void;
}

export const LastMinuteWeeksStore = create<State>()(
  persist(
    (set) => ({
      destination: "",
      hotel_name: "",
      property_id: "",
      address: "",
      phone: "",
      start_date: "",
      final_date: "",
      details: "",
      price: "",

      SetDestination: (destination: string) => set({ destination }),

      SetInfoHotel: (
        hotel_name: string,
        property_id: string,
        address: string,
        phone: string,
        start_date: string,
        final_date: string,
        details: string,
        price: string
      ) =>
        set({
          hotel_name,
          property_id,
          address,
          phone,
          start_date,
          final_date,
          details,
          price,
        }),
    }),
    {
      name: "last-minute-weeks-store",
      partialize: (state) => ({
        destination: state.destination,
        hotel_name: state.hotel_name,
        property_id: state.property_id,
        address: state.address,
        phone: state.phone,
        start_date: state.start_date,
        final_date: state.final_date,
        details: state.details,
        price: state.price,
      }),
    }
  )
);
