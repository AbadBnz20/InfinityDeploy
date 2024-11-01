"use client";
import {  GetRooms } from "@/actions/getDestination";
import { DataDetails } from "@/interfaces/details-response";
import { Hotel, Rate } from "@/interfaces/rooms-response";

import { DestinationStore } from "@/store/DestinationStore";
import { ReservationStore } from "@/store/ReservationStore";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Spinner,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const translations = {
  es: {
    title: "Habitaciones disponibles",
    subtitle: "Servicios",
  },
  en: {
    title: "Rooms available",
    subtitle: "Services",
  },
};

interface Props {
  slug: string;
  hotel:DataDetails
}

export const ContentRoom = ({ hotel }: Props) => {
  const language = "es";
  const t = translations[language as keyof typeof translations];
  const { checkin, checkout, guest } = DestinationStore();
  const {setReservationData}=ReservationStore()
  const [rooms, setRooms] = useState<Hotel>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (checkin && checkout && guest.length > 0) {
      onGetRooms();
    }
  }, [checkin, checkout, guest]);

  const onGetRooms = async () => {
    setLoading(true);
    console.log('cambiar el slug a produccion');

    const rooms = await GetRooms('test_hotel_do_not_book', checkin, checkout, guest);
    console.log(rooms);
    setRooms(rooms[0]);
    setLoading(false);
  };

 const onRegisterReservation = (room:Rate)=>{
  setReservationData(hotel.images[0],hotel.name,room.room_name,+room.daily_prices[0],hotel.region.name,+room.payment_options.payment_types[0].amount,room.book_hash);
 }


  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-2 ">{t.title}</h2>
      {loading ? (
        <div className="w-ful h-[300px] flex justify-center items-center">
          <Spinner />{" "}
        </div>
      ) : (
        <div className=" mt-5 grid grid-cols-2 gap-4">
          { rooms?.rates.map((item) => (
            <Card key={item.match_hash} className="bg-maincolor">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md ">{item.room_name}</p>
                  <p className="text-small  text-gray-500 dark:text-gray-300 ">{item.room_data_trans.main_room_type}</p>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-between">
              <p className="text-lg font-bold  ">{item.payment_options.payment_types[0].amount } {item.payment_options.payment_types[0].currency_code }</p> <Link href={'/detailroom'}><Button onClick={()=>onRegisterReservation(item)}>Seleccionar</Button> </Link>  
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
