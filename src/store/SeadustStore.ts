import { ListRoom } from "@/actions/seadust/seadust";
import { Room } from "@/interfaces/Room-responses";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  id: number;
  RoomSelected: string;
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
}

export const SeadustStore = create<State>()(
  persist(
    (set, get) => ({
      id: 0,
      RoomSelected: "",
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
        const totalPeople = guest.reduce((acc, room) => {
          const adults = room.adults;
          const children = room.children.length;
          return acc + adults + children;
        }, 0);
        const resp = await ListRoom(totalPeople);

        set({ Rooms: resp });
      },
      updateroom: (room) => set(() => ({ RoomSelected: room })),
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
