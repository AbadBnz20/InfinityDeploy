import { currencyFormat } from "@/helpers/CurrenFormat";
import { SizeImage } from "@/helpers/SizeImage";
import { Hotel } from "@/interfaces/hotels-response";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { IoChevronForwardOutline, IoLocationOutline } from "react-icons/io5";

interface Props {
  index: string;
  image: Array<string>;
  title: string;
  percentage: number;
  rating: number;
  addres: string;
  description: string;
  rooms: Hotel;
}

const CardHotels = ({
  index,
  image,
  title,
  rating,
  addres,
  rooms,
  percentage,
}: Props) => {
  const number = percentage / 100;
  const price = +rooms.rates[0].payment_options.payment_types[0].amount;
  const increasedPrice = price + price * number;

  return (
    <div className="bg-maincolor rounded-lg shadow overflow-hidden flex flex-col">
      <div className="relative flex-grow">
        {image[0] ? (
          <img
            src={SizeImage(image[0], "x500")}
            alt={title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <img
            src={
              "https://img.freepik.com/fotos-premium/primer-plano-exterior-entrada-vestibulo-hotel-generico-fachada-edificio-dx_641503-155887.jpg"
            }
            alt={title}
            className="w-full h-48 object-cover"
          />
        )}
        <span className="absolute top-2 right-2 bg-white text-yellow-500 px-2 py-1 rounded-full text-sm flex items-center">
          <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          {rating}
        </span>
      </div>
      <div className="p-4 flex-grow">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-gray-400 text-muted-foreground flex items-center mb-3 whitespace-nowrap overflow-hidden text-ellipsis">
          <IoLocationOutline color="white" size={"15px"} /> {addres}
        </p>
        {/* <p className="text-sm mb-4">{description}</p> */}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-400">Desde</p>
            <p className="text-xl font-bold">
              {currencyFormat(increasedPrice)}{" "}
              {rooms.rates[0].payment_options.payment_types[0].currency_code}
            </p>
          </div>
          <Link href={`/hotels/${index}`} className="text-white">
            <Button endContent={<IoChevronForwardOutline className="ml-1" />}>
              Ver más
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardHotels;
