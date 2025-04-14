import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import React from "react";

interface Props {
  IdRoom: string;
  name: string;
  numberOfBeds: number;
  detail: string;
  numberOfGuests: number;
  typeOfBed: string;
  url: string;
  updatetId: (id: string) => void;
  idSelected:string| null;
}

export const CardRoom = ({
  IdRoom,
  name,
  numberOfBeds,
  detail,
  numberOfGuests,
  typeOfBed,
  url,
  updatetId,
  idSelected
}: Props) => {
  return (
    <Card className={`w-full max-w-4xl overflow-hidden bg-maincolor shadow-sm ${idSelected === IdRoom ? "border-2 border-primary" : ""}`}>
      <div className="grid grid-cols-3 p-3 gap-2">
        <div className="col-span-1">
          <Image
            src={url}
            alt="Standard Suite Double Room"
            width={300}
            height={200}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-2">
          <div className="pb-2">
            <h2 className="text-xl font-medium ">{name}</h2>
            <div className="flex flex-wrap items-center ml-2 gap-2 text-sm text-gray-500">
              <span>
                {numberOfBeds} {typeOfBed}
              </span>
              <span className="text-xs">•</span>
              <span>{numberOfGuests} huespedes</span>
            </div>
          </div>

          <Divider />

          <CardBody className="pt-4">
            <a href="#" className="text-medium font-semibold  hover:underline">
              Detalle de habitacion
            </a>
            <p className="text-sm ">{detail}</p>

            {/* <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>Book Now, Pay Later!</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span>Dining & Drinks Included</span>
          </div> */}

            {/* <div className="text-sm text-gray-500">
            <div>INFINITY MEMBER RATES</div>
            <div>Infinity Club Special Member Platinum</div>
          </div> */}
          </CardBody>

          <CardFooter className="flex justify-end pt-0">
            <Button onPress={() => updatetId(IdRoom)} color="primary">
              Reservar
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};
