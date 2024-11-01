import { useCountry } from '@/hooks/useCountry';
import { Autocomplete, AutocompleteItem, Avatar } from '@nextui-org/react';
import React from 'react'

export const SelectCode = () => {
    const { items, isLoading, loadCountry } = useCountry();
    return (
      <Autocomplete
        className="w-full"
        defaultItems={items}
        isLoading={isLoading}
        label="Codigo"
        onInputChange={(e) => loadCountry(e)}
        defaultFilter={() => true}
        placeholder="Selecciona codigo"
      >
        {(item) => (
          <AutocompleteItem
          key={item.translations.spa.common}
            startContent={
              <Avatar alt="Argentina" className="w-6 h-6" src={item.flags.png} />
            }
          >
            {`${item.idd.root}${item.idd.suffixes}`}
          </AutocompleteItem>
        )}
      </Autocomplete>
    );
}
