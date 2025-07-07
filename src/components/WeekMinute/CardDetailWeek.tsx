import { RegisterReservation } from "@/actions/WeekMinute/RegisterReservation";
import { LastMinuteWeeksStore } from "@/store/LastMinuteWeeksStore";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useLocale } from "next-intl";
import React, { useState } from "react";

interface Props {
  onOpen: () => void,
  hotel_name: string;
  property_id: string;
  address: string;
  phone: string;
  travelDates: {
    startDate: string;
    endDate: string;
  };
  unitDetails: string[];
  price: string;
  pricePerNight: string;
  user: {
    firstname: string;
    lastname: string;
    email: string | undefined;
    number: string;
  };
}

export const CardDetailWeek = ({
  travelDates,
  unitDetails,
  price,
  pricePerNight,
  hotel_name,
  property_id,
  address,
  phone,
  user,
  onOpen
}: Props) => {
  const language = useLocale();
  const [loading, setLoading] = useState(false);
  const { SetInfoHotel,destination } = LastMinuteWeeksStore();

  const onRegisterHoel = async (
    hotel_name: string,
    property_id: string,
    address: string,
    phone: string,
    start_date: string,
    final_date: string,
    details: string,
    price: string
  ) => {
    try {
      setLoading(true);
      SetInfoHotel(
        hotel_name,
        property_id,
        address,
        phone,
        start_date,
        final_date,
        details,
        price
      );
      const resp = await RegisterReservation(
        destination,
        hotel_name,
        property_id,
        address,
        phone,
        start_date,
        final_date,
        details,
        price,
        user.firstname,
        user.lastname,
        user.email || "",
        user.number
      );

      setLoading(false);
onOpen()
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="bg-maincolor">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-sm font-bold"> { language == 'es' ?'Fechas de estadia:':'Dates of stay:'}  </p>
          <p>
            {" "}
            {travelDates.startDate} - {travelDates.endDate}
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-sm font-bold"> { language == 'es' ?'Detalles:':'Details:'}  </p>
        <p>{unitDetails.join(", ")}</p>
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <div>
          <span className="text-lg font-bold">{price} </span>
          <span className="text-sm text-blue-500"> {pricePerNight}</span>
        </div>
        <Button
          color="primary"
          isLoading={loading}
          onPress={() =>
            onRegisterHoel(
              hotel_name,
              property_id,
              address,
              phone,
              travelDates.startDate,
              travelDates.endDate,
              unitDetails.join(", "),
              price
            )
          }
        >
          {language == "es" ? "Seleccionar" : "Select"}
        </Button>
      </CardFooter>
    </Card>
  );
};
