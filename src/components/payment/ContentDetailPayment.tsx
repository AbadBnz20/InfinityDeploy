import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React from "react";
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

export const ContentDetailPayment = ({
  departure,
  return: returnTrip,
}: BookingSummaryProps) => {
  const total = departure.vehicle.price + (returnTrip?.vehicle.price || 0);
  return (
    <Card className=" max-w-sm">
      <CardHeader className="space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-xl">Traslado Premium</h2>
            {/* <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.8</span>
              <span className="text-xs">(2.3k reseñas)</span>
            </div> */}
          </div>
          {/* <div className="h-12 w-12 bg-gray-200 rounded-md" /> */}
        </div>
      </CardHeader>

      <CardBody className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <IoArrowForwardOutline className="h-4 w-4" />
            <span>Viaje de Ida</span>
          </div>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Desde</span>
              <span className="font-medium">{departure.from}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hasta</span>
              <span className="font-medium">{departure.to}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fecha y hora</span>
              <div className="flex items-center gap-1">
                <IoCalendarOutline className="h-4 w-4" />
                <span className="font-medium">
                  {departure.date} - {departure.time}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vehículo</span>
              <span className="font-medium">{departure.vehicle.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pasajeros</span>
              <div className="flex items-center gap-1">
                <IoPersonOutline className="h-4 w-4" />
                <span className="font-medium">{departure.passengers}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detalles de Vuelta */}
        {returnTrip && (
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
                      {returnTrip.date} - {returnTrip.time}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vehículo</span>
                  <span className="font-medium">{returnTrip.vehicle.name}</span>
                </div>
              </div>
            </div>
          </>
        )}

        <Divider />

        {/* Resumen de Precios */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tarifa de ida</span>
            <span>${departure.vehicle.price.toFixed(2)}</span>
          </div>
          {returnTrip && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tarifa de vuelta</span>
              <span>${returnTrip.vehicle.price.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardBody>

      <CardFooter>
        <Button
          className="w-full bg-black text-white dark:bg-white dark:text-black"
          type="submit"
        >
          Pagar
        </Button>
      </CardFooter>
    </Card>
  );
};
