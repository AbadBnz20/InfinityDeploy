import { create } from "zustand";

interface State {
   tapName:string
    SetYahtsData: (
        tapName:string
    ) => void;
  }
  

export const TapsStore = create<State>()((set)=>({
    tapName:'mytrip',
    SetYahtsData:(tapName)=>{
        set({tapName});
    }
}))