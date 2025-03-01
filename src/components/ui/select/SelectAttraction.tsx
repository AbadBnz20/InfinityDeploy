import { GetSelectAttraction } from '@/actions/attraction/GetAttraction';
import { Attraction } from '@/interfaces/Attaction-responses';
import { Select, SelectItem } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'


interface Props {
    attractionsData: string;
    state: boolean;
    handleAttractionsChange: (value: string) => void;
  }
export const SelectAttraction = ({
    attractionsData,
    state,
    handleAttractionsChange,
  }: Props) => {

    const [data, setdata] = useState<Attraction[]>([]);
      const [loading, setLoading] = useState(false);
    
      useEffect(() => {
        const GetCateogryCar = async () => {
          setLoading(true);
          const resp = await GetSelectAttraction();
          setdata(resp);
          setLoading(false);
        };
    
        GetCateogryCar();
      }, []);

  return (
    <Select
      value={attractionsData}
      items={data}
      variant="bordered"
      placeholder="Seleccione tipo"
      defaultSelectedKeys={["Parque_Tematico"]}
      isDisabled={!state}
      isLoading={loading}
      onChange={(e) => handleAttractionsChange(e.target.value)}
    >
      {(item) => <SelectItem key={item.name}>{item.name}</SelectItem>}
    </Select>
  )
}
