import {  Getoffers } from "@/actions/getDestination";
import { Destination } from "@/interfaces/Destination";
import {  DataDetailsRooms } from "@/interfaces/details-response";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State extends Destination {
  gethotels: () => void;
  loading: boolean;
  setDestinationData: (
    id: number,
    checkin: string,
    checkout: string,
    guest: any[]
  ) => void;
  hotels: DataDetailsRooms[];
}

export const DestinationStore = create<State>()(
  persist(
    (set, get) => ({
      id: 0,
      checkin: "",
      checkout: "",
      guest: [],
      hotels: [],
      loading: false,
      setDestinationData: (
        id: number,
        checkin: string,
        checkout: string,
        guest: any[]
      ) => {
        set({ id, checkin, checkout, guest });
      },
      gethotels: async () => {
        const { id, checkin, checkout, guest } = get();
        const resp = (await Getoffers(
          id,
          checkin,
          checkout,
          guest
        )) as DataDetailsRooms[];
        set({ hotels: resp });
      },
    }),
    { name: "search-filter",partialize: (state) => ({
      id: state.id,
      checkin: state.checkin,
      checkout: state.checkout,
      guest: state.guest,
    }), }
  )
);
