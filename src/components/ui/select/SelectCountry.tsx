import { TripForm } from "@/components/home/MyTrip";
import { useCountries } from "@/hooks/useCountries";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import React, { useRef } from "react";
import { Control, Controller, FieldError, Path } from "react-hook-form";

interface Props {
  control: Control<TripForm>;
  name: Path<TripForm>;
  error?: FieldError;
  OnchageCountry: (code: string) => void;
}

export const SelectCountry = ({
  control,
  name,
  error,
  OnchageCountry,
}: Props) => {
  const { items, isLoading, LoadCountries } = useCountries();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      LoadCountries(e);
    }, 600);
  };

  return (
    <div className="w-full  relative">
      <Controller
        name={name}
        control={control}
        rules={{ required: "El Campo es requerido" }}
        render={({ field, fieldState }) => (
          <Autocomplete
            labelPlacement={"outside"}
            className="w-full"
            isLoading={isLoading}
            defaultItems={items}
            placeholder="Ingrese pais"
            onInputChange={handleInputChange}
            onSelectionChange={async (key) => {
              console.log(key);
              if (key) {
                const resp = items.find((x) => x.code === key);
                if (resp) {
                  field.onChange(resp.name);
                }
                OnchageCountry(key.toString());
              }
            }}
            isInvalid={fieldState.invalid}
            errorMessage={error?.message}
            defaultFilter={() => true}
          >
            {(item) => (
              <AutocompleteItem key={item.code} value={item.name}>
                {item.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
    </div>
  );
};
