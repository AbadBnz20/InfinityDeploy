import { TripForm } from "@/components/home/MyTrip";
import { useCountries } from "@/hooks/useCountries";
import { LocationCityStore } from "@/store/CodeDestinationStore";
import { Autocomplete, AutocompleteItem, Progress } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  Path,
  UseFormWatch,
} from "react-hook-form";

interface Props {
  control: Control<TripForm>;
  name: Path<TripForm>;
  error?: FieldError;
  OnchageCountry: (code: string) => void;
  locationCityorigin: LocationCityStore;
  watch: UseFormWatch<TripForm>;
  SetLocationCityOrigin: (data: LocationCityStore) => void;
}

export const SelectCountry = ({
  control,
  name,
  error,
  OnchageCountry,
  locationCityorigin,
  watch,
  SetLocationCityOrigin,
}: Props) => {
  const { items, LoadCountries } = useCountries(locationCityorigin);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [inputValue, setInputValue] = useState("");
  const region = watch(name);
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState("");

  useEffect(() => {
    console.log(locationCityorigin);
    const GetCountry = async () => {
      setLoading(true);
      setTimeout(() => {
        setdata(locationCityorigin.countryCode);
        setLoading(false);
      }, 50);
    };

    if (locationCityorigin.countryCode) {
      GetCountry();
    }
  }, [region]);

  const handleInputChange = (e: string) => {
    console.log(e);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      LoadCountries(e);
    }, 600);
  };

  if (loading) {
    return (
      <div className="my-4">
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="max-w-md"
        />
      </div>
    );
  }

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
            inputValue={inputValue}
            // isLoading={isLoading}
            items={items}
            placeholder="Ingrese pais"
            defaultSelectedKey={data}
            onInputChange={(value) => {
              setInputValue(value);
              handleInputChange(value); // aquí haces la llamada a la API
            }}
            onSelectionChange={async (key) => {
              console.log(key);
              if (key) {
                const resp = items.find((x) => x.code === key);
                // console.log(resp)
                if (resp) {
                  field.onChange(resp.name);
                }
                OnchageCountry(key.toString());
              } else {
                field.onChange("");
                OnchageCountry("");
                SetLocationCityOrigin({
                  country: "",
                  countryCode: "",
                  region: "",
                  regionWdId: "",
                });
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
