"use client";
import { GetRooms } from "@/actions/getDestination";
import { GetPackageByIDResponse } from "@/actions/package/PackageByUserClientId";
import { currencyFormat } from "@/helpers/CurrenFormat";
import { DataDetails } from "@/interfaces/details-response";
import { Rate, RoomDataTrans } from "@/interfaces/rooms-response";

import { DestinationStore } from "@/store/DestinationStore";
// import { ReservationStore } from "@/store/ReservationStore";
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
  hotel: DataDetails;
}

interface RoomGroup {
  room_name: string;
  room_data_trans: RoomDataTrans;
  rates: Rate[];
}
export const ContentRoom = ({ hotel }: Props) => {
  const language = "es";
  console.log(hotel)
  const t = translations[language as keyof typeof translations];
  const { checkin, checkout, guest } = DestinationStore();
  // const { setReservationData } = ReservationStore();
  const [rooms, setRooms] = useState<RoomGroup[]>([]);
  const [percentage, setPercentage] = useState(0);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (checkin && checkout && guest.length > 0) {
      onGetRooms();
    }
  }, [checkin, checkout, guest]);

  const onGetRooms = async () => {
    setLoading(true);
    console.log("cambiar el slug a produccion");

    const rooms = await GetRooms(
      "test_hotel_do_not_book",
      checkin,
      checkout,
      guest
    );
    console.log(rooms);
    const resp = await GetPackageByIDResponse();
    setPercentage(resp.percentage || 0);
   if (rooms.length>0) {
    const groupedRooms: RoomGroup[] = Object.values(
      rooms[0].rates.reduce((acc: Record<string, RoomGroup>, item: Rate) => {
        const roomName = item.room_name;

        if (!acc[roomName]) {
          acc[roomName] = {
            room_name: roomName,
            room_data_trans: item.room_data_trans,
            rates: [],
          };
        }

        acc[roomName].rates.push(item);

        return acc;
      }, {})
    );
    setRooms(groupedRooms);
   }
    
    setLoading(false);
  };

  // const onRegisterReservation = async (
  //   name: string,
  //   book_hash: string,
  //   price: number,
  //   subtotal: number,
  //   priceroom: string
  // ) => {
  //   setReservationData(
  //     hotel.images[0],
  //     hotel.name,
  //     name,
  //     subtotal,
  //     hotel.region.name,
  //     price,
  //     book_hash,
  //     priceroom
  //   );

  //   await createAuthCookie(hotel.metapolicy_extra_info);
  // };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-2 ">{t.title}</h2>
      {loading ? (
        <div className="w-ful h-[300px] flex justify-center items-center">
          <Spinner />
        </div>
      ) : rooms.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {rooms.map((item) => {
            return (
              <Card
                key={item.room_data_trans.main_name}
                className="bg-maincolor"
              >
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">{item.room_data_trans.main_name}</p>
                    <p className="text-small text-gray-500 dark:text-gray-300">
                      {item.room_data_trans.main_room_type}
                    </p>
                  </div>
                </CardHeader>
                {item.rates.map((r) => {
                  const number = percentage / 100;
                  const price = +r.payment_options.payment_types[0].amount;
                  const increasedPrice = price + price * number;

                  const pricexday = +r.daily_prices[0];
                  const subtotal = pricexday + pricexday * number;
                  console.log(subtotal);
                  const amenitiesMap: Record<string, string> = {
                    has_bathroom: "Baño incluido",
                    has_breakfast: "Desayuno incluido",
                    has_internet: "Internet incluido",
                  };

                  return (
                    <CardFooter
                      key={r.book_hash}
                      className="flex justify-between items-end"
                    >
                      <div>
                        {r.serp_filters.map((amenity, index) => (
                          <li key={index}>
                            <em className="text-gray-500 dark:text-gray-300 text-small">
                              {amenitiesMap[amenity] ||
                                "Servicio no especificado"}
                            </em>
                          </li>
                        ))}
                        <p className="text-lg font-bold mt-4">
                          {currencyFormat(+increasedPrice)}{" "}
                          {r.payment_options.payment_types[0].currency_code}
                        </p>
                      </div>
                      <Link href={"/hotels"}>
                        <Button>Seleccionar</Button>
                      </Link>
                    </CardFooter>
                  );
                })}
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="w-ful h-[300px] flex justify-center items-center">
          <em className="text-lg">
            Habitaciones no disponibles
          </em>
        </div>
      )}
    </div>
  );
};
