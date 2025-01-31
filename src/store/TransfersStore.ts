import { GetCars } from "@/actions/originDestination/OriginDestination";
import { Transfer } from "@/interfaces/Transfers-response";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  selected: "Ida" | "Ida y vuelta";
  origin: string;
  destination: string;
  arrivaltime: Date;
  departuretime: Date;
  passengers: {
    adults: number;
    children: number;
  };
  loading: boolean;
  setTransfersData: (
    selected: "Ida" | "Ida y vuelta",
    origin: string,
    destination: string,
    arrivaltime: Date,
    departuretime: Date,
    passengers: {
      adults: number;
      children: number;
    }
  ) => void;
  getCars: () => void;
  transferCars: Transfer;
  idcargoing: string | null;
  idcarreturn: string | null;
  updatecargoing: (firstName: string) => void;
  updatecarreturn: (lastName: string) => void;
}

export const TransfersStore = create<State>()(
  persist(
    (set, get) => ({
      selected: "Ida",
      origin: "",
      destination: "",
      arrivaltime: new Date(),
      departuretime: new Date(),
      idcargoing: null,
      idcarreturn: null,
      passengers: {
        adults: 0,
        children: 0,
      },
      transferCars: {
        going: [],
        return: null,
      },
      loading: false,
      updatecargoing: (id) => set(() => ({ idcargoing: id })),
      updatecarreturn: (id) => set(() => ({ idcarreturn: id })),
      setTransfersData: (
        selected,
        origin,
        destination,
        arrivaltime,
        departuretime,
        passengers
      ) => {
        set({
          selected,
          origin,
          destination,
          arrivaltime,
          departuretime,
          passengers,
        });
      },

      getCars: async () => {
        const { selected } = get();
        const resp = await GetCars(selected);
        set({ transferCars: resp });
      },
    }),
    {
      name: "transfer-filter",
      partialize: (state) => ({
        selected: state.selected,
        origin: state.origin,
        destination: state.destination,
        arrivaltime: state.arrivaltime,
        departuretime: state.departuretime,
        passengers: state.passengers,
        idcargoing: state.idcargoing,
        idcarreturn: state.idcarreturn,
      }),
    }
  )
);
