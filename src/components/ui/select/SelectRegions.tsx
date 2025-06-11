import { TripForm } from "@/components/home/MyTrip";
import { useRegions } from "@/hooks/useRegions";
import {  LocationCityStore } from "@/store/CodeDestinationStore";
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
  watch: UseFormWatch<TripForm>;
  OnchageRegion: (code: string) => void;
  countrycode: string;
  regioncode:string;
  locationCityorigin: LocationCityStore;
}

export const SelectRegions = ({
  control,
  name,
  error,
  OnchageRegion,
  countrycode,
  watch,
  locationCityorigin
}: Props) => {
  const { items, isLoading, LoadRegions } = useRegions(countrycode, locationCityorigin);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const region = watch(name);
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState("");

  useEffect(() => {
    const GetCountry = async () => {
      setLoading(true);
      setTimeout(() => {
        setdata(locationCityorigin.regionWdId);
        setLoading(false);
      }, 50);
    };

   if (locationCityorigin.regionWdId) {
      GetCountry();
    }
  
  }, [region]);

  const handleInputChange = (e: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      LoadRegions(e);
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
        rules={{ required: "El Código es requerido" }}
        render={({ field, fieldState }) => (
          <Autocomplete
            labelPlacement={"outside"}
            className="w-full"
            isLoading={isLoading}
            defaultItems={items}
            placeholder="Ingrese region"
            onInputChange={handleInputChange}
            defaultSelectedKey={data}
            onSelectionChange={async (key) => {
              // console.log(key);
              if (key) {
                const resp = items.find((x) => x.wikiDataId === key);
                if (resp) {
                  field.onChange(resp.name);
                }

                OnchageRegion(key.toString());
              } else{
                field.onChange("");
                OnchageRegion("");
              }
            }}
            isInvalid={fieldState.invalid}
            errorMessage={error?.message}
            defaultFilter={() => true}
            // inputProps={{
            //   onFocus: () => handleInputChange(""),
            // }}
          >
            {(item) => (
              <AutocompleteItem key={item.wikiDataId} value={item.name}>
                {item.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
    </div>
  );
};
