import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  image: string;
  firts_name: string;
  last_name: string;
  phone: string;
  country: string;
  email: string;
  language: "es" | "en";
  setUserData: (
    image: string,
    firts_name: string,
    last_name: string,
    phone: string,
    country: string,
    email: string
  ) => void;
}

export const UserStore = create<State>()(
  persist(
    (set) => ({
      image: "",
      firts_name: "",
      last_name: "",
      phone: "",
      country: "",
      email: "",
      language: "en",
      setUserData: (
        image: string,
        firts_name: string,
        last_name: string,
        phone: string,
        country: string,
        email: string
      ) => {
        set({ image, firts_name, last_name, phone, country, email });
      },
    }),
    {
      name: "User",
    }
  )
);
