"use client";
import {
  GetCar,
  GetDestination,
} from "@/actions/originDestination/OriginDestination";
import { TransfersStore } from "@/store/TransfersStore";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spinner,
} from "@nextui-org/react";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoCalendarOutline,
  IoPersonOutline,
} from "react-icons/io5";

interface BookingSummaryProps {
  departure: {
    from: string;
    to: string;
    date: string;
    time: string;
    vehicle: {
      name: string;
      price: number;
    };
    passengers: number;
  };
  return?: {
    date: string;
    time: string;
    vehicle: {
      name: string;
      price: number;
    };
  };
}

export const ContentDetailPayment = () => {
  const [Information, setInformation] = useState<BookingSummaryProps | null>();
  const [loading, setLoading] = useState(false);
  const { origin, destination, idcargoing, idcarreturn, selected, passengers,departuretime,arrivaltime } =
    TransfersStore();

  useEffect(() => {
    if (origin && idcargoing) {
      GetInformation();
    }
  }, [origin, idcargoing]);

  const GetInformation = async () => {
    try {


       const time = new Date(arrivaltime)
       const timereturn = new Date(departuretime)

      setLoading(true);
      const [respOrigin, respDestination, respCar, respreturnCar] =
        await Promise.all([
          GetDestination(origin),
          GetDestination(destination),
          GetCar(idcargoing || ""),
          GetCar(idcarreturn || ""),
        ]);
      setInformation({
        departure: {
          from: respOrigin,
          to: respDestination,
          date: DateTime.fromJSDate(time).setLocale('es').toFormat('dd LLL yyyy'),
          time: DateTime.fromJSDate(time).setLocale('es').toFormat('HH:mm'),
          vehicle: {
            name: `${respCar?.brand} ${respCar?.model} `,
            price: respCar?.transferprice || 0,
          },
          passengers: passengers.adults + passengers.children,
        },
        return:
          selected === "Ida y vuelta"
            ? {
                date:  DateTime.fromJSDate(timereturn).setLocale('es').toFormat('dd LLL yyyy'),
                time: DateTime.fromJSDate(timereturn).setLocale('es').toFormat('HH:mm'),
                vehicle: {
                  name: `${respreturnCar?.brand} ${respreturnCar?.model} `,
                  price: respreturnCar?.transferprice || 0,
                },
              }
            : undefined,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setInformation(null);
      setLoading(false);
    }
  };

  const total =
    (Information?.departure.vehicle.price || 0) +
    (Information?.return?.vehicle.price || 0);
  return (
    <Card className=" max-w-sm">
      <CardHeader className="space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-xl">Detalle del Traslado </h2>
          </div>
        </div>
      </CardHeader>

      {loading ? (
        <CardBody className="flex justify-center items-center">
          <Spinner />
        </CardBody>
      ) : Information ? (
        <CardBody className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <IoArrowForwardOutline className="h-4 w-4" />
              <span>Viaje de Ida</span>
            </div>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Desde</span>
                <span className="font-medium">
                  {Information.departure.from}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hasta</span>
                <span className="font-medium">{Information.departure.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha y hora</span>
                <div className="flex items-center gap-1">
                  <IoCalendarOutline className="h-4 w-4" />
                  <span className="font-medium">
                    {Information.departure.date} - {Information.departure.time}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vehículo</span>
                <span className="font-medium">
                  {Information.departure.vehicle.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pasajeros</span>
                <div className="flex items-center gap-1">
                  <IoPersonOutline className="h-4 w-4" />
                  <span className="font-medium">
                    {Information.departure.passengers}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {Information.return && (
            <>
              <Divider />
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <IoArrowBackOutline className="h-4 w-4" />
                  <span>Viaje de Vuelta</span>
                </div>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fecha y hora</span>
                    <div className="flex items-center gap-1">
                      <IoCalendarOutline className="h-4 w-4" />
                      <span className="font-medium">
                        {Information.return.date} - {Information.return.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehículo</span>
                    <span className="font-medium">
                      {Information.return.vehicle.name}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
          <Divider />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tarifa de ida</span>
              <span>MXN {Information.departure.vehicle.price.toFixed(2)}</span>
            </div>
            {Information.return && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tarifa de vuelta</span>
                <span>MXN {Information.return.vehicle.price.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>MXN {total.toFixed(2)}</span>
            </div>
          </div>
        </CardBody>
      ) : (
        <CardBody className="flex justify-center items-center">
          <p>error al cargar </p>
        </CardBody>
      )}

      <CardFooter>
        
      </CardFooter>
    </Card>
  );
};
