"use client";
import { useCountry } from "@/hooks/useCountry";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface Props {
  text: string | null;
  setText: React.Dispatch<React.SetStateAction<string  | null>>;
}

export const SelectCountry = ({ text, setText }: Props) => {
  const { items, isLoading, loadCountry } = useCountry();
  const [error, setError] = useState<string|null>(null);
  const onSelectionChange = async (key: React.Key | null) => {
    if (key) {
      setText(key.toString());
    }
  };

  useEffect(() => {
    if (!text) {
      setError("Por favor, selecciona un país");
    } else {
      setError(null);
    }
  }, [text])
  

  return (
    <Autocomplete
      className="w-full"
      defaultItems={items}
      isLoading={isLoading}
      label="Pais"
      isInvalid={text  ? true : false}
      errorMessage={error}
      onInputChange={(e) => loadCountry(e)}
      onSelectionChange={(e) => onSelectionChange(e)}
      defaultFilter={() => true}
      placeholder="Selecciona pais"
    >
      {(item) => (
        <AutocompleteItem
          key={`${item.translations.spa.common}`}
          startContent={
            <Avatar alt="Argentina" className="w-6 h-6" src={item.flags.png} />
          }
        >
          {`${item.translations.spa.common}`}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};
