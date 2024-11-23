import { create } from "zustand";
import { persist } from "zustand/middleware";
import CryptoJS from "crypto-js";


const SECRET_KEY = "your-secret-key"; // Cambia esta clave por una clave segura

// Función para cifrar los datos
const encryptData = (data: any) => {
  const stringifiedData = JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringifiedData, SECRET_KEY).toString();
};

// Función para descifrar los datos
const decryptData = (encryptedData: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return null; // En caso de error al desencriptar
  }
};

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
      storage: {
        getItem: (name) => {
          const encryptedData = localStorage.getItem(name);
          return encryptedData ? decryptData(encryptedData) : null;
        },
        setItem: (name, value) => {
          const encryptedData = encryptData(value);
          localStorage.setItem(name, encryptedData);
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
