import { create } from "zustand";

interface State {
  idEngine: string;
  idExperience: string;
  date: Date;
  passengers: string;
  SetYahtsData: (
    idEngine: string,
    idExperience: string,
    date: Date,
    passengers: string
  ) => void;
}

export const YachtsStore = create<State>()((set) => ({
  idEngine: "",
  idExperience: "",
  date: new Date(),
  passengers: "",
  SetYahtsData: (
    idEngine,
    idExperience,
    date,
    passengers
  ) => {
    set({ idEngine, idExperience, date, passengers });
  },
}));
