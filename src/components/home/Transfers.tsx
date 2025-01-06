import { getLocalTimeZone, now } from "@internationalized/date";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import React from "react";
import { SelectPassengers } from "../ui/select/SelectPassengers";

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
export const Transfers = () => {
  return (
    <div className="p-2">
      <div>
        <RadioGroup orientation="horizontal">
          <Radio value="buenos-aires">Ida </Radio>
          <Radio value="sydney">Ida y vuelta</Radio>
        </RadioGroup>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <div className="space-y-2">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            Origen
          </label>
          <Autocomplete
            className="w-full"
            defaultItems={animals}
            size="md"
            placeholder="Seleccione origen"
          >
            {(item) => (
              <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <div className="space-y-2">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            Destino
          </label>
          <Autocomplete
            className="w-full"
            defaultItems={animals}
            size="md"
            placeholder="Seleccione destino"
          >
            {(item) => (
              <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
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
              defaultValue={now(getLocalTimeZone())}
            />
          </div>
          <div className="w-full ">
            <label htmlFor="rooms" className="block text-sm font-medium ">
              Hora y fecha de salida de vuelo o transporte
            </label>
            <DatePicker
              hideTimeZone
              showMonthAndYearPickers
              defaultValue={now(getLocalTimeZone())}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 items-end gap-2">
          <div>
            <label htmlFor="rooms" className="block text-sm font-medium ">
              Pasajeros
            </label>
            <SelectPassengers />
          </div>
          <div className="w-full ">
            <Button type="submit" className="w-full">
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
