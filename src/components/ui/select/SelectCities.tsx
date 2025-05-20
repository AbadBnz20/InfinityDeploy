import { TripForm } from '@/components/home/MyTrip';
import { useCities } from '@/hooks/useCities';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import React, { useRef } from 'react'
import { Control, Controller, FieldError, Path } from 'react-hook-form';

interface Props {
  control: Control<TripForm>;
  name: Path<TripForm>;
  error?: FieldError;
  OnchageCity: (code: string) => void;
  countrycode:string;
  regioncode:string;
}

export const SelectCities = ({ control, name, error,OnchageCity,countrycode,regioncode }: Props) => {
     const { items, isLoading, LoadCities } = useCities(countrycode,regioncode);
        const debounceRef = useRef<NodeJS.Timeout | null>(null);
        
          const handleInputChange = (e: string) => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
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
              console.log(key);
              if (key) {
               const resp = items.find((x) => x.wikiDataId === key);
                if (resp) {
                  field.onChange(resp.name);
                }

                OnchageCity(key.toString())
              }

      
            }}
            isInvalid={fieldState.invalid}
            errorMessage={error?.message}
            defaultFilter={() => true}
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
  )
}
