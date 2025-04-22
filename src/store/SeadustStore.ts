import { ListRoom } from "@/actions/seadust/seadust";
import { Room } from "@/interfaces/Room-responses";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  id: number;
  RoomSelected: string[];
  checkin: string;
  checkout: string;
  guest: any[];
  loading: boolean;
  setDestination: (
    id: number,
    checkin: string,
    checkout: string,
    guest: any[]
  ) => void;
  Rooms: Room[];
  getRoom: () => void;
  updateroom: (room: string) => void;
  Deleteroom: (room: string) => void;
}

export const SeadustStore = create<State>()(
  persist(
    (set, get) => ({
      id: 0,
      RoomSelected: [],
      checkin: "",
      checkout: "",
      guest: [],
      Rooms: [],
      loading: false,
      setDestination: (id, checkin, checkout, guest) => {
        set({ id, checkin, checkout, guest });
      },
      getRoom: async () => {
        const { guest } = get();
        const minSum = guest.reduce((min, room) => {
          const sum = room.adults + room.children;
          return sum < min ? sum : min;
        }, Infinity);
        const resp = await ListRoom(minSum);

        set({ Rooms: resp });
      },
      updateroom: (room) => {
        const { guest,RoomSelected } = get();
        console.log(guest.length,RoomSelected.length )
        if (RoomSelected.length < guest.length) {
          if ( !RoomSelected.includes(room)) {
            set((state) => ({
              RoomSelected: [...state.RoomSelected, room],
            }));
            
          }
          
        }
        
      },
      Deleteroom: (room) => {
        set((state) => ({
          RoomSelected: state.RoomSelected.filter((item) => item !== room),
        }));
      },
    }),
    {
      name: "seadust-filter",
      partialize: (state) => ({
        id: state.id,
        RoomSelected: state.RoomSelected,
        checkin: state.checkin,
        checkout: state.checkout,
        guest: state.guest,
      }),
    }
  )
);
