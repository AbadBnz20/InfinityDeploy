import { TripForm } from "@/components/home/MyTrip";
import { useCities } from "@/hooks/useCities";
import { LocationCityStore } from "@/store/CodeDestinationStore";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import React, { useRef } from "react";
import {
  Control,
  Controller,
  FieldError,
  Path,
  UseFormSetValue,
} from "react-hook-form";

interface Props {
  setValue: UseFormSetValue<TripForm>;
  control: Control<TripForm>;
  name: Path<TripForm>;
  error?: FieldError;
  OnchageCity: (code: string) => void;
  countrycode: string;
  regioncode: string;
  changenameregion: Path<TripForm>;
  changenamecountry: Path<TripForm>;

  SetLocationCityOrigin: (data: LocationCityStore) => void;
}

export const SelectCities = ({
  setValue,
  control,
  name,
  error,
  OnchageCity,
  countrycode,
  regioncode,
  changenameregion,
  changenamecountry,
  SetLocationCityOrigin,
}: Props) => {
  const { items, isLoading, LoadCities, LocationCity } = useCities(
    countrycode,
    regioncode
  );
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!countrycode && !regioncode) {
        LocationCity(e);
        return;
      }
      LoadCities(e);
    }, 600);
  };
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
            placeholder="Ingrese ciudad"
            onInputChange={handleInputChange}
            onSelectionChange={async (key) => {
              if (key) {
                const resp = items.find((x) => x.wikiDataId === key);
                if (resp) {
                  if (!countrycode && !regioncode) {
                    SetLocationCityOrigin({
                      country: resp.country,
                      countryCode: resp.countryCode,
                      region: resp.region,
                      regionWdId: resp.regionWdId,
                    });
                    setValue(changenameregion, resp.name);
                    setValue(changenamecountry, resp.country);
                  }

                  field.onChange(resp.name);
                }

                OnchageCity(key.toString());
              }
            }}
            isInvalid={fieldState.invalid}
            errorMessage={error?.message}
            defaultFilter={() => true}
            inputProps={{
              autoCorrect: "off",
              autoComplete: "off",
              spellCheck: "false",
            }}
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
