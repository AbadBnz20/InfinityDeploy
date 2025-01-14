import { getLocalTimeZone, now, } from "@internationalized/date";
import {
  Button,
  DatePicker,
  DateValue,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import React, { useState } from "react";
import {  SelectPassengers } from "../ui/select/SelectPassengers";
import { SellectOrigin } from "../ui/select/SellectOrigin";

export const animals = [
  {
    label: "Cat",
    key: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    key: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    key: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", key: "lion", description: "The king of the jungle" },
  { label: "Tiger", key: "tiger", description: "The largest cat species" },
  { label: "Giraffe", key: "giraffe", description: "The tallest land animal" },
  {
    label: "Dolphin",
    key: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    key: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    key: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    key: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    key: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    key: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    key: "crocodile",
    description: "A large semiaquatic reptile",
  },
];
interface Transfers {
  tripType: "Ida" | "Ida y vuelta";
  origin: string;
  destination: string;
  arrivaltime: string;
  departuretime: string;
  adults: string;
  children: string;
}
export const Transfers = () => {
  // const { setValue, handleSubmit, watch } = useForm<Transfers>();
  const [selected, setSelected] = useState("Ida");
  const [origin, setOrigin] = useState<string>("");
  const [Destination, setDestination] = useState<string>("");
  const [arrivaltime, setArrivaltime] = React.useState<DateValue | null>(now(getLocalTimeZone()));
  const [departuretime, setDeparturetime] = React.useState<DateValue | null>(now(getLocalTimeZone()));
  const [passengers, setPassengers] = useState({
    adults:"1",
    children:"0"
  })


  const Onsubmit = ()=>{
    console.log({selected,origin,Destination,arrivaltime,departuretime,passengers })
  }


  return (
    <div className="p-2">
      <div>
        <RadioGroup
          value={selected}
          onValueChange={setSelected}
          orientation="horizontal"
        >
          <Radio value="Ida">Ida </Radio>
          <Radio value="Ida y vuelta">Ida y vuelta</Radio>
        </RadioGroup>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <div className="space-y-2">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            Origen
          </label>
          <SellectOrigin setvalue={setOrigin} placeholder="seleccione origen" />
        </div>
        <div className="space-y-2">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            Destino
          </label>
          <SellectOrigin
            setvalue={setDestination}
            placeholder="seleccione destino"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="w-full ">
            <label htmlFor="rooms" className="block text-sm font-medium ">
              Hora y fecha de llegada
            </label>
            <DatePicker
              hideTimeZone
              showMonthAndYearPickers
              value={arrivaltime}
              onChange={setArrivaltime}
            />
          </div>
          <div className="w-full ">
            <label htmlFor="rooms" className="block text-sm font-medium ">
              Hora y fecha de salida de vuelo o transporte
            </label>
            <DatePicker
              isDisabled={selected !== "Ida y vuelta"}
              hideTimeZone
              showMonthAndYearPickers
              value={departuretime}
              onChange={setDeparturetime}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 items-end gap-2">
          <div>
            <label htmlFor="rooms" className="block text-sm font-medium ">
              Pasajeros
            </label>
            <SelectPassengers setPassengers={setPassengers} passengers={passengers} />
          </div>
          <div className="w-full ">
            <Button onPress={()=>Onsubmit()} isDisabled={ origin === "" || Destination === "" } type="submit" className="w-full">
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
