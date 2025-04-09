import { create } from "zustand";

interface State{
    IdOrigin:string;
    setSelect: (id: string) => void;
}

export const SelectStore = create<State>((set) => ({
    IdOrigin: "",
    setSelect: (id) => set(() => ({ IdOrigin: id })),
   
}))