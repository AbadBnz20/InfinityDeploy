"use client";
import { GetDetailsDestination } from "@/actions/originDestination/OriginDestination";
import { Car, DetailsDestination } from "@/interfaces/Transfers-response";
import { parseAbsoluteToLocal } from "@internationalized/date";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  DateInput,
  Input,
  TimeInput,
} from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoCalendarOutline,
  IoLocationOutline,
  IoTimeOutline,
} from "react-icons/io5";

interface Props {
  type: "Ida" | "Ida y vuelta";
  origin: string;
  destination: string;
  car: string;
  datetime: Date;
}

export const ContentTransferdetail = ({
  type,
  origin,
  destination,
  car,
  datetime,
}: Props) => {
  const [date, setDate] = useState<DetailsDestination | null>();
  const [time, setTime] = useState(
    parseAbsoluteToLocal("2024-04-08T18:45:22Z")
  );
    const t = useTranslations("TransfersPage");
   const language = useLocale()
  useEffect(() => {
    if (origin && destination && car) {
      GetDetails();
    }
  }, [origin, destination, car]);

  const GetDetails = async () => {
    const resp = await GetDetailsDestination(origin, destination, car);
    setDate(resp);
    const isoDateString = new Date(datetime);
    setTime(parseAbsoluteToLocal(isoDateString.toISOString()));
  };

  return (
    <Card className="my-3 shadow">
      <CardHeader>
        {type === "Ida" ? (
          <h1 className="flex items-center gap-2  text-xl">
            <IoArrowForwardOutline size={24} />
            {t("item.title")}
          </h1>
        ) : (
          <h1 className="flex items-center gap-2  text-xl">
            <IoArrowBackOutline size={24} />
            {t("title1")}

          </h1>
        )}
      </CardHeader>
      <CardBody className="grid gap-6">
        <div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-small" >
              {t("item.item")}
              </label>
              <Input
               
                startContent={<IoLocationOutline size={24} />}
                value={language === "es" ? date?.origin : date?.origin_en}
                isDisabled
                placeholder="Ej: Aeropuerto Internacional"
                aria-label="Lugar de Recogida"
              />
            </div>

            <div className="space-y-2">
              <label className="text-small" >
              {t("item.item1")}
              </label>
              <div className="flex gap-2">
                <Input
                  startContent={<IoLocationOutline size={24} />}
                  value={language === "es" ? date?.destination : date?.destination_en}
                  isDisabled
                  placeholder="Ej: Aeropuerto Internacional"
                  aria-label="Destino"
                />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-small">
              {t("item.item2")}
              </label>
              <div className="flex gap-2">
                <DateInput
                
                  startContent={<IoCalendarOutline size={24} />}
                  isDisabled
                  granularity="day"
                  hideTimeZone
                  value={time}
                  aria-label="Fecha"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-small" >
              {t("item.item3")}
              </label>
              <div className="flex gap-2">
                <TimeInput
                
                  startContent={<IoTimeOutline size={24} />}
                  isDisabled
                  value={time}
                  aria-label="Hora"
                />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="grid">
        <label className="py-2 text-small">{t("item.subtitle")}</label>
        {date?.car && <Carcontent car={date?.car} />}
      </CardFooter>
    </Card>
  );
};

interface Props2 {
  car: Car;
}

const Carcontent = ({ car }: Props2) => {
  const language = useLocale();
  return (
    <div className="grid md:grid-cols-[200px,1fr,100px] gap-4">
      <div className="relative h-[100%] md:h-full">
        <img src={car.image} className="max-h-[150px] object-cover" />
      </div>
      <CardBody className="p-6">
        <div className="space-y-2">
          <div>
            <h2 className="text-xl font-semibold">
              {car.brand} {language === "es" ? car.model : car.model_en}
            </h2>
            <p className="text-muted-foreground">{language === 'es'?car.type : car.type_en}</p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground"></div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
             { language === 'es' ? 'Capacidad maxima':'Maximum capacity'} : 1-{car.ability} { language === 'es' ? 'Pasajeros':'Passengers'}
            </p>
            <p className="text-sm text-muted-foreground">Color : {language === 'es' ? car.color: car.color_en}</p>
          </div>
        </div>
      </CardBody>
      {/* <div className="p-6 flex flex-col justify-between border-t md:border-l md:border-t-0">
        <div className="text-center">
          <div className="text-2xl font-bold">{car.transferprice} MXN</div>
          <div className="text-sm text-muted-foreground">Precio total</div>
        </div>
      </div> */}
    </div>
  );
};
