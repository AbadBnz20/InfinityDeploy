import { TripStore } from "@/store/TripStore";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IoAddOutline, IoTrashOutline } from "react-icons/io5";
import { SelectCategoryCar } from "../ui/select/SelectCategoryCar";
import { SelectAttraction } from "../ui/select/SelectAttraction";
import { useTranslations } from "next-intl";

export const ContentCardflights = () => {
  const { flight, SetFlightData } = TripStore();
  const t = useTranslations("MyperfectPage");
  return (
    <Card
      className={`group overflow-hidden transition-all hover:shadow-lg hover:bg-maincolor `}
    >
      <CardHeader
        className={`relative h-48 overflow-hidden p-0  ${
          !flight ? "opacity-75" : ""
        }`}
      >
        <img
          src="perfecttrip/vuelos.jpg"
          alt="Passengers relaxing on a plane"
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          {/* <Plane className="h-5 w-5" /> */}
          <h3 className="text-xl font-semibold">{t("card.title")}</h3>
        </div>
      </CardHeader>
      <CardFooter className="p-4 flex items-end h-full">
        <Button
          className={`w-full flex items-center justify-center gap-2 text-white ${
            flight ? "bg-red-500 " : "bg-black "
          }`}
          onPress={() => SetFlightData(!flight)}
        >
          {flight ? (
            <>
              <IoTrashOutline />
              {t("buttoncarddelete")}
            </>
          ) : (
            <>
              <IoAddOutline />
              {t("buttoncardadd")}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export const ContentCardHotels = () => {
  const [state, setstate] = useState(false);
  const { SetHotelsData } = TripStore();
  const t = useTranslations("MyperfectPage");

  const [hotelData, setHotelData] = useState({
    includesMeals: "Con alimentos",
    rating: "1",
  });

  const toggleCard = (status: boolean) => {
    setstate(status);
  };

  useEffect(() => {
    console.log(hotelData)
    if (state) {
      SetHotelsData({
        service: hotelData.includesMeals,
        rating: parseInt(hotelData.rating),
      });
    } else {
      SetHotelsData(undefined);
    }
  }, [state, hotelData, SetHotelsData]);
  const handleMealsChange = (value: string) => {
    setHotelData((prev) => ({ ...prev, includesMeals: value }));
  };
  const handleRatingChange = (value: string) => {
    setHotelData((prev) => ({ ...prev, rating: value }));
  };
  return (
    <Card
      className={`group overflow-hidden transition-all hover:shadow-lg  hover:bg-maincolor`}
    >
      <CardHeader
        className={`relative h-48 overflow-hidden p-0  ${
          !state ? "opacity-75" : ""
        }`}
      >
        <img
          src="perfecttrip/hoteles.jfif"
          alt="Hotel breakfast service"
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          {/* <Hotel className="h-5 w-5" /> */}
          <h3 className="text-xl font-semibold"> {t("card1.title")}</h3>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select
            value={hotelData.includesMeals}
            variant="bordered"
            placeholder={t("card1.placeholder")}
            defaultSelectedKeys={["Con alimentos"]}
            isDisabled={!state}
            onChange={(e) => handleMealsChange(e.target.value)}
          >
            <SelectItem key="Con alimentos">Con Alimentos</SelectItem>
            <SelectItem key="Sin alimentos">Sin Alimentos</SelectItem>
          </Select>
          <Select
            variant="bordered"
            placeholder="Seleccione categoria"
             selectionMode="multiple"
            defaultSelectedKeys={["1"]}
            isDisabled={!state}
            value={hotelData.rating}
            onChange={(e) => handleRatingChange(e.target.value)}
          >
            <SelectItem key="1">★</SelectItem>
            <SelectItem key="2">★★</SelectItem>
            <SelectItem key="3">★★★</SelectItem>
            <SelectItem key="4">★★★★</SelectItem>
            <SelectItem key="5">★★★★★</SelectItem>
          </Select>
        </div>
      </CardBody>
      <CardFooter className="p-4">
        <Button
          className={`w-full flex items-center justify-center gap-2 text-white ${
            state ? "bg-red-500 " : "bg-black "
          }`}
          onPress={() => toggleCard(!state)}
        >
          {state ? (
            <>
              <IoTrashOutline />
              {t("buttoncarddelete")}
            </>
          ) : (
            <>
              <IoAddOutline />
              {t("buttoncardadd")}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export const ContentCardCars = () => {
  const [state, setstate] = useState(false);
  const { SetCarData } = TripStore();
  const t = useTranslations("MyperfectPage");

  const [carData, setcarData] = useState("Economico");
  const handleCarsChange = (value: string) => setcarData(value);
  const toggleCard = (status: boolean) => setstate(status);

  useEffect(() => {
    if (state) {
      SetCarData(carData);
    } else {
      SetCarData(undefined);
    }
  }, [state, carData, SetCarData]);

  return (
    <Card
      className={`group overflow-hidden transition-all hover:shadow-lg  hover:bg-maincolor `}
    >
      <CardHeader
        className={`relative h-48 overflow-hidden p-0  ${
          !state ? "opacity-75" : ""
        }`}
      >
        <img
          src="perfecttrip/autos.jpeg"
          alt="People in convertible car"
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          {/* <Car className="h-5 w-5" /> */}
          <h3 className="text-xl font-semibold">{t("card2.title")}</h3>
        </div>
      </CardHeader>
      <CardBody className="p-4">
        <SelectCategoryCar
          carData={carData}
          state={state}
          handleCarsChange={handleCarsChange}
        />
      </CardBody>
      <CardFooter className="p-4">
        <Button
          className={`w-full flex items-center justify-center gap-2 text-white ${
            state ? "bg-red-500 " : "bg-black "
          }`}
          onPress={() => toggleCard(!state)}
        >
          {state ? (
            <>
              <IoTrashOutline />
              {t("buttoncarddelete")}
            </>
          ) : (
            <>
              <IoAddOutline />
              {t("buttoncardadd")}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export const ContentCardAttraction = () => {
  const [state, setstate] = useState(false);
  const { SetAttractionsData } = TripStore();
  const [attractionsData, setattractionsData] = useState("Economico");
  const handleAttractionsChange = (value: string) => setattractionsData(value);
  const toggleCard = (status: boolean) => setstate(status);
  const t = useTranslations("MyperfectPage");

  useEffect(() => {
    if (state) {
      SetAttractionsData(attractionsData);
    } else {
      SetAttractionsData(undefined);
    }
  }, [state, attractionsData, SetAttractionsData]);

  return (
    <Card
      className={`group overflow-hidden transition-all hover:shadow-lg  hover:bg-maincolor`}
    >
      <CardHeader
        className={`relative h-48 overflow-hidden p-0  ${
          !state ? "opacity-75" : ""
        }`}
      >
        <img
          src="perfecttrip/atracciones.jpg"
          alt="Disney characters at Magic Kingdom"
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          {/* <Ticket className="h-5 w-5" /> */}
          <h3 className="text-xl font-semibold">{t("card3.title")}</h3>
        </div>
      </CardHeader>
      <CardBody className="p-4">
        <SelectAttraction
          attractionsData={attractionsData}
          state={state}
          handleAttractionsChange={handleAttractionsChange}
        />
      </CardBody>
      <CardFooter className="p-4">
        <Button
          className={`w-full flex items-center justify-center gap-2 text-white ${
            state ? "bg-red-500 " : "bg-black "
          }`}
          onPress={() => toggleCard(!state)}
        >
          {state ? (
            <>
              <IoTrashOutline />
              {t("buttoncarddelete")}
            </>
          ) : (
            <>
              <IoAddOutline />
              {t("buttoncardadd")}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
