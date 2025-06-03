import { SeadustStore } from "@/store/SeadustStore";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import { useLocale } from "next-intl";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
  IdRoom: string;
  name: string;
  numberOfBeds: number;
  detail: string;
  numberOfGuests: number;
  typeOfBed: string;
  name_en: string;
  typeOfBed_en: string;
  detail_en: string;
  creationDate: string;
  url: string;
  updatetId: (id: string) => void;
  deleteId: (id: string) => void;
  idSelected: { idRoom: string; amount: number }[];
}

export const CardRoom = ({
  IdRoom,
  name,
  numberOfBeds,
  detail,
  numberOfGuests,
  typeOfBed,
  name_en,
  typeOfBed_en,
  detail_en,
  url,
  updatetId,
  deleteId,
  idSelected,
}: Props) => {
  const language = useLocale();

  return (
    <Card
      className={`w-full max-w-4xl overflow-hidden bg-maincolor shadow-sm ${
        idSelected.some((item) => item.idRoom === IdRoom)
          ? "border-2 border-primary"
          : ""
      }`}
    >
      {idSelected.some((item) => item.idRoom === IdRoom) && (
        <Button
          isIconOnly
          size="sm"
          color="danger"
          onPress={() => deleteId(IdRoom)}
          className="absolute top-2 right-2  rounded-full  flex items-center justify-center shadow-md"
        >
          <IoCloseOutline />
        </Button>
      )}
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
        <div className="col-span-2 flex flex-col justify-between">
          <div>
            <div className="pb-2">
              <h2 className="text-xl font-medium ">
                {language == "es"
                  ? name
                  : name_en && name_en.trim() !== ""
                  ? name_en
                  : "Not translated"}
              </h2>
              <div className="flex flex-wrap items-center ml-2 gap-2 text-sm text-gray-500">
                <span>
                  {numberOfBeds} {language == "es"
                  ? typeOfBed
                  : typeOfBed_en && typeOfBed_en.trim() !== ""
                  ? typeOfBed_en
                  : "Not translated"}
                </span>
                <span className="text-xs">•</span>
                <span>{numberOfGuests} {language == 'es' ? 'huespedes':'guests'}  </span>
                {/* <span>{numberOfGuests} Cantidad</span> */}
              </div>
            </div>

            <Divider />

            <CardBody className="pt-4">
              <a
                href="#"
                className="text-medium font-semibold  hover:underline"
              >
                {language == 'es' ? ' Detalle de habitacion':'Room detail'}
               
              </a>
              <p className="text-sm ">{language == 'es'? detail: detail_en}</p>

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
          </div>

          <CardFooter className="flex justify-end pt-0 gap-2">
            {idSelected.some((item) => item.idRoom === IdRoom) && (
              <ContentAmount IdRoom={IdRoom} />
            )}

            <Button onPress={() => updatetId(IdRoom)} color="primary">
               {language == 'es' ? 'Seleccionar':'Select'}
              
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

interface ContentAmountProps {
  IdRoom: string;
}
export const ContentAmount = ({ IdRoom }: ContentAmountProps) => {
  const { RoomSelected, increaseRoomAmount, decreaseRoomAmount } =
    SeadustStore();

  const amountRoom = RoomSelected.find((item) => item.idRoom === IdRoom);

  const handleIncrement = () => {
    increaseRoomAmount(IdRoom);
  };
  const handleDecrement = () => {
    if (amountRoom?.amount === 1) {
      return;
    }
    decreaseRoomAmount(IdRoom);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        isIconOnly
        color="danger"
        variant="flat"
        size="sm"
        onPress={handleDecrement}
      >
        -
      </Button>
      <span>{amountRoom?.amount}</span>
      <Button
        isIconOnly
        color="primary"
        variant="flat"
        size="sm"
        onPress={handleIncrement}
      >
        +
      </Button>
    </div>
  );
};
