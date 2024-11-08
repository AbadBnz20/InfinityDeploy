import {  Getoffers, Getoffersbystart } from "@/actions/getDestination";
import { Destination } from "@/interfaces/Destination";
import {  DataDetailsRooms } from "@/interfaces/details-response";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State extends Destination {
  gethotels: () => void;
  loading: boolean;
  name: string;
  setDestinationData: (
    id: number,
    checkin: string,
    checkout: string,
    guest: any[]
  ) => void;
  hotels: DataDetailsRooms[];
  filterHotelsByStars: (stars: number) => void;
  setname: (name: string) => void;

}

export const DestinationStore = create<State>()(
  persist(
    (set, get) => ({
      id: 0,
      checkin: "",
      checkout: "",
      name: "",
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
      filterHotelsByStars: async (stars: number) => {
        set({ loading:true});
        const { id, checkin, checkout, guest } = get();
        const resp = (await Getoffersbystart(
          id,
          checkin,
          checkout,
          guest,
          stars
        )) as DataDetailsRooms[];
        const filteredHotels = resp.filter(hotel => hotel.DataDetails.star_rating === stars);
        set({ hotels: filteredHotels,loading:false });
      },
      setname: (name: string) => {
        set({ name:name});
      }

    }),
    { name: "search-filter",partialize: (state) => ({
      id: state.id,
      checkin: state.checkin,
      checkout: state.checkout,
      guest: state.guest,
      name:state.name
    }), }
  )
);
