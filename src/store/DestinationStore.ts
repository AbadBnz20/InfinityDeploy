import { Getoffers } from "@/actions/getDestination";
import { Destination } from "@/interfaces/Destination";
import { DataDetailsRooms } from "@/interfaces/details-response";
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
  hotelsaux: DataDetailsRooms[];
  filterHotelsByStars: (stars: number) => void;
  filterHotels: (filter: Array<string>) => void;

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
      hotelsaux: [],
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
        console.log('entra en la funcion get')
        const { id, checkin, checkout, guest } = get();
        const resp = (await Getoffers(
          id,
          checkin,
          checkout,
          guest
        )) as DataDetailsRooms[];
        set({ hotels: resp, hotelsaux: resp });
      },
      filterHotelsByStars: async (stars: number) => {
        set({ loading: true });
        const { hotelsaux } = get();
        const filteredHotels = hotelsaux.filter(
          (hotel) => hotel.DataDetails.star_rating === stars
        );
        set({ hotels: filteredHotels, loading: false });
      },
      filterHotels: (filters: Array<string>) => {
        const { hotelsaux } = get();
        if (filters.length > 0) {
          const filteredHotels = hotelsaux.filter((hotel) =>
            hotel.DataDetails.serp_filters.some((filter) =>
              filters.includes(filter)
            )
          );
          set({ hotels: filteredHotels });
        } else {
          set({ hotels: hotelsaux });
        }

      
      },
      setname: (name: string) => {
        set({ name: name });
      },
    }),
    {
      name: "search-filter",
      partialize: (state) => ({
        id: state.id,
        checkin: state.checkin,
        checkout: state.checkout,
        guest: state.guest,
        name: state.name,
      }),
    }
  )
);
