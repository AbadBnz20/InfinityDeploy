import { TripForm } from '@/components/home/MyTrip';
import { useRegions } from '@/hooks/useRegions';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import React, { useRef } from 'react'
import { Control, Controller, FieldError, Path } from 'react-hook-form';
interface Props {
  control: Control<TripForm>;
  name: Path<TripForm>;
  error?: FieldError;
  OnchageRegion: (code: string) => void;
  countrycode:string;
}

export const SelectRegions = ({ control, name, error,OnchageRegion,countrycode }: Props) => {
     const { items, isLoading, LoadRegions } = useRegions(countrycode);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    
      const handleInputChange = (e: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          LoadRegions(e);
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
            placeholder="Ingrese pais"
            onInputChange={handleInputChange}
            onSelectionChange={async (key) => {
              console.log(key);
              if (key) {
               const resp = items.find((x) => x.wikiDataId === key);
                if (resp) {
                  field.onChange(resp.name);
                }

                OnchageRegion(key.toString())
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
