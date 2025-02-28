import { create } from "zustand";

interface State {
   tapName:string
    SetYahtsData: (
        tapName:string
    ) => void;
  }
  

export const TapsStore = create<State>()((set)=>({
    tapName:'',
    SetYahtsData:(tapName)=>{
        set({tapName});
    }
}))