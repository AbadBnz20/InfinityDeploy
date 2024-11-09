import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  image: string;
  name: string;
  nameroom: string;
  subtotal: number;
  destination: string;
  total: number;
  book_hash: string;
  price:string;
  setReservationData: (
    image: string,
    name: string,
    nameroom: string,
    subtotal: number,
    destination: string,
    total: number,
    book_hash: string,
    price: string
  ) => void;
}

export const ReservationStore = create<State>()(
  persist(
    (set) => ({
      image: "",
      name: "",
      nameroom: "",
      subtotal: 0,
      destination:"",
      total: 0,
      price: "",
      book_hash: "",
      setReservationData: (
        image: string,
        name: string,
        nameroom: string,
        subtotal: number,
        destination: string,
        total: number,
        book_hash: string,
        price: string
      ) => {
        set({ image, name, nameroom, subtotal,destination, total, book_hash,price });
      },
    }),
    {
      name: "HotelInfo",
    }
  )
);
