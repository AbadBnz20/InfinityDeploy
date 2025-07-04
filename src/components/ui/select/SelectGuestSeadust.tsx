import { DestinationSeadust } from "@/components/home/Seadust";
import { Button } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
  setValue: UseFormSetValue<DestinationSeadust>;
  value: { adults: number; children: number; infant: number }[];
}
export const SelectGuestSeadust = ({ setValue, value }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Filter");
  const language = useLocale()

  const [rooms, setRooms] = useState<
    { adults: number; children: number; infant: number }[]
  >([{ adults: 1, children: 0, infant: 0 }]);
  const addRoom = () => {
    setRooms([...rooms, { adults: 1, children: 0, infant: 0 }]);
  };

  const removeRoom = (index: number) => {
    if (rooms.length > 1) {
      const newRooms = rooms.filter((_, i) => i !== index);
      setRooms(newRooms);
    }
  };
  useEffect(() => {
    if (value.length > 0) {
      setRooms(value);
    }
  }, [value]);

  const updateRoom = (
    index: number,
    field: "adults" | "children" | "infant",
    value: number
  ): void => {
    const newRooms = [...rooms];

    newRooms[index][field] = value;

    setRooms(newRooms);
  };

  const getSummary = () => {
    setValue("guest", rooms);
  
    const totalRooms = rooms.length;
    const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
    const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);
    const totalInfant = rooms.reduce((sum, room) => sum + room.infant, 0);
    return `${totalRooms} ${language == 'es' ? 'Habitación': "Room"} ${ totalRooms > 1 ? "es" : "" }, ${totalAdults} ${language == 'es' ? 'Adulto': "Adult"}  ${totalAdults > 1 ? "s" : ""}, ${totalChildren} ${language == 'es' ? 'Niño': "Child"} ${totalChildren > 1 ? "s" : ""}, ${totalInfant} ${language == 'es' ? 'Infante': "Infant"} ${totalInfant > 1 ? "s" : ""}`;
  };

  return (
    <div className="relative w-full ">
      <Button
        variant="solid"
        role="combobox"
        aria-expanded={isOpen}
        className="w-full justify-between bg-[#f4f4f5]  dark:bg-[#27272a]"
        onPress={() => setIsOpen(!isOpen)}
      >
        {getSummary()}
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 p-4 bg-white border rounded-md shadow-lg z-20">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="mb-4 pb-4 border-b last:border-b-0 relative"
            >
              <h3 className="font-semibold mb-2 text-gray-900">
                {t("room.subtitle")} {index + 1}
              </h3>
              {rooms.length > 1 && (
                <Button
                  size="sm"
                  isIconOnly
                  variant="light"
                  className="absolute top-0 right-0"
                  onClick={() => removeRoom(index)}
                >
                  <IoCloseOutline color="black" />
                </Button>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-900">{t("room.option1")}</span>
                <div className="flex items-center text-black">
                  <Button
                    size="sm"
                    isIconOnly
                    variant="bordered"
                    className="text-black"
                    onClick={() =>
                      updateRoom(index, "adults", Math.max(1, room.adults - 1))
                    }
                  >
                    -
                  </Button>
                  <span className="mx-2 text-black">{room.adults}</span>
                  <Button
                    size="sm"
                    isIconOnly
                    variant="bordered"
                    className="text-black"
                    onClick={() => updateRoom(index, "adults", room.adults + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-900">Infante (0-2)</span>
                <div className="flex items-center">
                  <Button
                    size="sm"
                    isIconOnly
                    variant="bordered"
                    className="text-black"
                    onPress={() =>
                      updateRoom(index, "infant", Math.max(0, room.infant - 1))
                    }
                  >
                    -
                  </Button>
                  <span className="mx-2 text-black">{room.infant}</span>
                  <Button
                    size="sm"
                    isIconOnly
                    variant="bordered"
                    className="text-black"
                    onPress={() => updateRoom(index, "infant", room.infant + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-900">
                  {t("room.option2")} (3-12)
                </span>
                <div className="flex items-center">
                  <Button
                    size="sm"
                    isIconOnly
                    variant="bordered"
                    className="text-black"
                    onPress={() =>
                      updateRoom(
                        index,
                        "children",
                        Math.max(0, room.children - 1)
                      )
                    }
                  >
                    -
                  </Button>
                  <span className="mx-2 text-black">{room.children}</span>
                  <Button
                    size="sm"
                    isIconOnly
                    variant="bordered"
                    className="text-black"
                    onPress={() =>
                      updateRoom(index, "children", room.children + 1)
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button onPress={addRoom} className="w-full bg-gray-900 text-white">
            {t("room.button1")}
          </Button>
          <Button
            onPress={() => setIsOpen(false)}
            className="w-full mt-2 bg-gray-900 text-white"
          >
            {t("room.button2")}
          </Button>
        </div>
      )}
    </div>
  );
};
