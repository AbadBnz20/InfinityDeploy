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

export const ContentCardflights = () => {
  const { flight, SetFlightData } = TripStore();
  return (
    <Card className={`group overflow-hidden transition-all hover:shadow-lg`}>
      <CardHeader
        className={`relative h-48 overflow-hidden p-0  ${
          !flight ? "opacity-75" : ""
        }`}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AwWC4UXLCGBn7ZpAQhIoBGWpNS3gSS.png"
          alt="Passengers relaxing on a plane"
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          {/* <Plane className="h-5 w-5" /> */}
          <h3 className="text-xl font-semibold">VUELOS</h3>
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
              Eliminar
            </>
          ) : (
            <>
              <IoAddOutline />
              Agregar
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
  const [hotelData, setHotelData] = useState({
    includesMeals: "con_alimentos",
    rating: "1",
  });

  const toggleCard = (status: boolean) => {
    setstate(status);
  };

  useEffect(() => {
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
    <Card className={`group overflow-hidden transition-all hover:shadow-lg`}>
      <CardHeader
        className={`relative h-48 overflow-hidden p-0  ${
          !state ? "opacity-75" : ""
        }`}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AwWC4UXLCGBn7ZpAQhIoBGWpNS3gSS.png"
          alt="Hotel breakfast service"
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          {/* <Hotel className="h-5 w-5" /> */}
          <h3 className="text-xl font-semibold">HOTELES</h3>
        </div>
      </CardHeader>
      <CardBody >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Select
          value={hotelData.includesMeals}
          variant="bordered"
          placeholder="seleccione opcion"
          defaultSelectedKeys={["con_alimentos"]}
          isDisabled={!state}
          onChange={(e) => handleMealsChange(e.target.value)}
        >
          <SelectItem key="con_alimentos">Con Alimentos</SelectItem>
          <SelectItem key="sin_alimentos">Sin Alimentos</SelectItem>
        </Select>
        <Select
          variant="bordered"
          placeholder="Seleccione categoria"
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
              Eliminar
            </>
          ) : (
            <>
              <IoAddOutline />
              Agregar
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
    <Card className={`group overflow-hidden transition-all hover:shadow-lg `}>
      <CardHeader
        className={`relative h-48 overflow-hidden p-0  ${
          !state ? "opacity-75" : ""
        }`}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AwWC4UXLCGBn7ZpAQhIoBGWpNS3gSS.png"
          alt="People in convertible car"
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          {/* <Car className="h-5 w-5" /> */}
          <h3 className="text-xl font-semibold">AUTOS</h3>
        </div>
      </CardHeader>
      <CardBody className="p-4">
        <Select
          value={carData}
          variant="bordered"
          placeholder="Seleccione tipo"
          defaultSelectedKeys={["Economico"]}
          isDisabled={!state}
          onChange={(e) => handleCarsChange(e.target.value)}
        >
          <SelectItem key="Economico">Económico</SelectItem>
          <SelectItem key="Compacto">Compacto</SelectItem>
          <SelectItem key="Intermedio">Intermedio</SelectItem>
          <SelectItem key="Standard">Standard</SelectItem>
          <SelectItem key="Tamaño_Completo">Tamaño Completo</SelectItem>
          <SelectItem key="Premium">Premium</SelectItem>
          <SelectItem key="Lujo">Lujo</SelectItem>
          <SelectItem key="Especial">Especial</SelectItem>
          <SelectItem key="Convertible">Convertible</SelectItem>
          <SelectItem key="Van">Van</SelectItem>
          <SelectItem key="SUV">SUV</SelectItem>
        </Select>
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
              Eliminar
            </>
          ) : (
            <>
              <IoAddOutline />
              Agregar
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

  useEffect(() => {
    if (state) {
      SetAttractionsData(attractionsData);
    } else {
      SetAttractionsData(undefined);
    }
  }, [state, attractionsData, SetAttractionsData]);

  return (
    <Card className={`group overflow-hidden transition-all hover:shadow-lg`}>
      <CardHeader
        className={`relative h-48 overflow-hidden p-0  ${
          !state ? "opacity-75" : ""
        }`}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AwWC4UXLCGBn7ZpAQhIoBGWpNS3gSS.png"
          alt="Disney characters at Magic Kingdom"
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          {/* <Ticket className="h-5 w-5" /> */}
          <h3 className="text-xl font-semibold">ATRACCIONES</h3>
        </div>
      </CardHeader>
      <CardBody className="p-4">
        <Select
          value={attractionsData}
          variant="bordered"
          placeholder="Seleccione tipo"
          defaultSelectedKeys={["Parque_Tematico"]}
          isDisabled={!state}
          onChange={(e) => handleAttractionsChange(e.target.value)}
        >
          <SelectItem key="Parque_Tematico">Parque Temático</SelectItem>
          <SelectItem key="Tours">Tours</SelectItem>
          <SelectItem key="Cultural">Cultural</SelectItem>
          <SelectItem key="Aventura">Aventura</SelectItem>
        </Select>
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
              Eliminar
            </>
          ) : (
            <>
              <IoAddOutline />
              Agregar
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
