import { GetRoom } from "@/actions/seadust/seadust";
import { Room } from "@/interfaces/Room-responses";
import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IoBusinessOutline } from "react-icons/io5";

interface Props {
  id: string;
  checkin: string;
  checkout: string;
  amount: number;
}

export const DetailRoom = ({id, checkin, checkout,amount}:Props) => {
  const [room, setroom] = useState<Room | null>();
  useEffect(() => {
    if (id && checkin && checkout) {
      GetDetails();
    }
  }, [id, checkin, checkout]);

  const GetDetails = async () => {
    const resp = await GetRoom(id);
    setroom(resp);
  };

  return (
    <Card className="my-3 shadow">
      <CardHeader>
        <h1 className="flex items-center gap-2  text-xl">
          <IoBusinessOutline size={24} />
          Detalle Habitacion
        </h1>
      </CardHeader>
      <CardBody className="grid gap-6">
        {
            room &&(
                <div className="grid grid-cols-3 p-3 gap-2">
          <div className="col-span-1">
            <Image
              src={room.url}
              alt="Standard Suite Double Room"
              width={300}
              height={200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="col-span-2">
            <div className="pb-2">
              <h2 className="text-xl font-medium ">{room.name}</h2>
              <div className="flex flex-wrap items-center ml-2 gap-2 text-sm text-gray-500">
                <span>
                  {room.numberOfBeds} {room.typeOfBed}
                </span>
                <span className="text-xs">•</span>
                <span>{room.numberOfGuests} huespedes</span>
                <span>{amount} Cantidad</span>

              </div>
            </div>

            <Divider />

            <div className="pt-4">
              <a
                href="#"
                className="text-medium font-semibold  hover:underline"
              >
                Detalle de habitacion
              </a>
              <p className="text-sm ">{room.detail}</p>
            </div>
          </div>
        </div>
            )
        }
        
      </CardBody>
    </Card>
  );
};
