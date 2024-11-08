"use client";
import { useDestination } from "@/hooks/useDestination";
import { Destination } from "@/interfaces/Destination";
import { DestinationStore } from "@/store/DestinationStore";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import {  UseFormSetValue } from "react-hook-form";

interface Props {
  setValue: UseFormSetValue<Destination>;
}

export const SelectDestination = ({ setValue }: Props) => {
  const { items, isLoading, loadDestination } = useDestination();
  const { setname } = DestinationStore();

  const onSelectionChange = (key: React.Key | null) => {
    console.log(key);
   
    if (key) {
      const cad =  key.toString().split('/');
      setValue("id", Number(cad[0]));
      setname(cad[1]);
    }
  };

  return (
    <div className="w-full  relative">
      <Autocomplete
        labelPlacement={"outside"}
        className="w-full"
        isLoading={isLoading}
        defaultItems={items}
        label="Destino"
        placeholder="Selecciona destino"
        onInputChange={(e) => {
          setTimeout(() => loadDestination(e), 2000);
        }}
        onSelectionChange={onSelectionChange}
        defaultFilter={() => true}
      >
        {(item) => (
          <AutocompleteItem key={`${item.id}/${item.name}, ${item.country_code}`}>
            {`${item.name}, ${item.country_code}`}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};
