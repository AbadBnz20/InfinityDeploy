import { create } from "zustand";

interface State {
  idLocation: string;
  idEngine: string;
  idExperience: string;
  date: Date;
  passengers: string;
  SetYahtsData: (
    idLocation: string,
    idEngine: string,
    idExperience: string,
    date: Date,
    passengers: string
  ) => void;
}

export const YachtsStore = create<State>()((set) => ({
  idLocation: "",
  idEngine: "",
  idExperience: "",
  date: new Date(),
  passengers: "",
  SetYahtsData: (
    idLocation,
    idEngine,
    idExperience,
    date,
    passengers
  ) => {
    set({ idLocation, idEngine, idExperience, date, passengers });
  },
}));
