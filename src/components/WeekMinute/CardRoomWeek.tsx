import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import { useLocale } from "next-intl";
// import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  background_image: string;
  resort_location: string;
  resort_name: string;
  price: string;
  see_resort_url: string;
}

export const CardRoomWeek = ({
  background_image,
  resort_location,
  resort_name,
  price,
  see_resort_url,
}: Props) => {
  const language = useLocale();
  // const router = useRouter();

  const handleSelect = (url: string) => {
    const slug = url.split("/")[7];
    // router.push(`/detailroomtraver/${slug}`);
    window.open(`/detailroomtraver/${slug}`, "_blank");
  };
  return (
    <Card
      className={`w-full max-w-4xl overflow-hidden bg-maincolor shadow-sm `}
    >
      <div className="grid grid-cols-3 p-3 gap-2">
        <div className="col-span-1">
          <Image
            src={background_image}
            alt="Standard Suite Double Room"
            width={300}
            height={200}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-2 flex flex-col justify-between">
          <div>
            <div className="pb-2">
              <h2 className="text-xl font-medium ">{resort_name}</h2>
              <div className="flex flex-wrap items-center ml-2 gap-2 text-sm text-gray-500">
                <span>{resort_location}</span>
              </div>
            </div>

            <Divider />

            <CardBody className="pt-4">
              <a
                href="#"
                className="text-medium font-semibold  hover:underline"
              >
                {language == "es" ? "Precio" : "Price"}
              </a>
              <p className="text-sm ">
                {price && (
                  <>
                    <span className="text-gray-500">
                      {" "}
                      {language == "es" ? "Apartir de " : "Apart from "}{" "}
                    </span>
                    <span className="text-medium">{price}</span>{" "}
                    <span className="text-gray-500">
                      {" "}
                      {language == "es" ? "por 7 noches" : "for 7 nights "}{" "}
                    </span>
                  </>
                )}
              </p>
            </CardBody>
          </div>

          <CardFooter className="flex justify-end pt-0 gap-2">
            <Button
              color="primary"
              onPress={() => handleSelect(see_resort_url)}
            >
              {language == "es" ? "Seleccionar" : "Select"}
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};
