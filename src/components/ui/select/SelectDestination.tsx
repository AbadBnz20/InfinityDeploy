"use client";
import { useDestination } from "@/hooks/useDestination";
import { Destination } from "@/interfaces/Destination";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface Props {
  register: UseFormRegister<Destination>;
  setValue: UseFormSetValue<Destination>;
}

export const SelectDestination = ({ register, setValue }: Props) => {
  const { items, isLoading, loadPokemon } = useDestination();
  const onSelectionChange = (key: React.Key | null) => {
    console.log(key);
    console.log(register);

    if (key) {
      setValue("id", Number(key));
    }
  };

  return (
    <div className="w-full max-w-md relative">
      <Autocomplete
        labelPlacement={"outside"}
        className="w-full"
        isLoading={isLoading}
        defaultItems={items}
        label="Destino"
        placeholder="Selecciona destino"
        onInputChange={(e) => loadPokemon(e)}
        onSelectionChange={onSelectionChange}
        defaultFilter={() => true}
      >
        {(item) => (
          <AutocompleteItem key={item.id}>
            {`${item.name}, ${item.country_code}`}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};
