import { ListRoom } from "@/actions/seadust/seadust";
import { Room } from "@/interfaces/Room-responses";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  id: number;
  RoomSelected: { idRoom: string; amount: number }[];
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
  increaseRoomAmount: (room: string) => void;
  decreaseRoomAmount: (room: string) => void;
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
        const { guest, RoomSelected } = get();
        const totalAmount = RoomSelected.reduce((sum, item) => sum + item.amount, 0);
        if (totalAmount >= guest.length) {
          return;
        }
      
        const roomExists = RoomSelected.find((item) => item.idRoom === room);
      
        if (!roomExists) {
          set((state) => ({
            RoomSelected: [
              ...state.RoomSelected,
              { idRoom: room, amount: 1 },
            ],
          }));
        }
      },
      increaseRoomAmount: (idRoom: string) => {
        set((state) => {
          const totalAmount = state.RoomSelected.reduce(
            (sum, item) => sum + item.amount,
            0
          );
      
        
          if (totalAmount >= state.guest.length) {
            return state;
          }
      
          return {
            RoomSelected: state.RoomSelected.map((item) =>
              item.idRoom === idRoom
                ? { ...item, amount: item.amount + 1 } 
                : item
            ),
          };
        });
      },
      decreaseRoomAmount: (idRoom: string) => {
        set((state) => ({
          RoomSelected: state.RoomSelected.map((item) =>
            item.idRoom === idRoom && item.amount > 1
              ? { ...item, amount: item.amount - 1 }
              : item
          ),
        }));
      },

      Deleteroom: (room) => {
        set((state) => ({
          RoomSelected: state.RoomSelected.filter(
            (item) => item.idRoom !== room
          ),
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
