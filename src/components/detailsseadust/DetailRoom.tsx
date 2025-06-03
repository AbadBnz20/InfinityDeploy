import { GetRoom } from "@/actions/seadust/seadust";
import { Room } from "@/interfaces/Room-responses";
import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
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
    const t = useTranslations("SeadustPage");
    const language = useLocale();
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
          {t("subtitle")}
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
              <h2 className="text-xl font-medium ">{language == "es"
                  ? room.name
                  :room.name_en && room.name_en.trim() !== ""
                  ? room.name_en
                  : "Not translated"}</h2>
              <div className="flex flex-wrap items-center ml-2 gap-2 text-sm text-gray-500">
                <span>
                  {room.numberOfBeds} {language == "es"
                  ? room.typeOfBed
                  : room.typeOfBed_en && room.typeOfBed_en.trim() !== ""
                  ? room.typeOfBed_en
                  : "Not translated"}
                </span>
                <span className="text-xs">•</span>
                <span>{room.numberOfGuests} {language == 'es' ? 'huespedes':'guests'} </span>
                  <span className="text-xs">•</span>
                <span>{amount} {language == 'es' ? 'Cantidad':'Amount'}</span>

              </div>
            </div>

            <Divider />

            <div className="pt-4">
              <a
                href="#"
                className="text-medium font-semibold  hover:underline"
              >
                {language == 'es' ? ' Detalle de habitacion':'Room detail'}
              </a>
              <p className="text-sm ">{language == 'es'? room.detail: room.detail_en}</p>
            </div>
          </div>
        </div>
            )
        }
        
      </CardBody>
    </Card>
  );
};
