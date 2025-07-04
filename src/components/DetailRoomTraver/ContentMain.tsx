import { TraverRoom } from "@/interfaces/Weekminute-response";
import React from "react";
import { ContentImage } from "../details/ContentImage";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
interface Props {
  room: TraverRoom | null;
}

export const ContentMain = ({ room }: Props) => {
  return (
    <div>
      <div className=" items-center mb-4">
        <h1 className="text-4xl font-bold ">{room?.resort_name}</h1>
        <p className="text-md font-normal text-gray-400">{room?.address}</p>
      </div>
      <div>
        {room && room.images.length > 0 && (
          <ContentImage images={room.images} />
        )}
        <div className="w-full mx-auto p-5 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-2 ">
              Acerca de la habitacion
            </h2>
            <div className="flex justify-between py-5">
              <p className="text-gray-500 dark:text-gray-300">
                Precio desde:{" "}
                <span className="text-red-500 font-bold">
                  {room?.starting_price}
                </span>
              </p>
              <p className="text-gray-500 dark:text-gray-300">
                ID de propiedad: {room?.property_id}
              </p>
              <p className="text-gray-500 dark:text-gray-300">
                Teléfono:{" "}
                <a
                  href={`tel:${room?.phone}`}
                  className="text-blue-500 hover:underline"
                >
                  {room?.phone}
                </a>
              </p>
            </div>

            <p className="text-gray-500 dark:text-gray-300">{room?.overview}</p>

            <div className="my-5">
              <h2 className="text-xl font-bold mb-2 ">
                Tarifas del Desarrollo
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {room?.housekeepingFees.map((fee, index) => (
                  <p key={index}>{fee}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2 ">
                Lista de disponibilidad
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {room?.availabilityList.map((item, index) => (
                  <Card key={index} className="bg-maincolor">
                    <CardHeader className="flex gap-3">
                      <div className="flex flex-col">
                        <p className="text-sm font-bold">Fechas de estadia:</p>
                        <p>
                          {" "}
                          {item.travelDates.startDate} -{" "}
                          {item.travelDates.endDate}
                        </p>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <p className="text-sm font-bold">Detalles:</p>
                      <p>
                        {item.unitDetails.join(", ")}
                      </p>
                    </CardBody>
                    <CardFooter>
                      <div>
                        <span className="text-lg font-bold">{item.price} </span>
                        <span className="text-sm text-blue-500"> {item.pricePerNight}</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
