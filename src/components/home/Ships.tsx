import React, { useState } from 'react'
import { Button, DatePicker,  DateValue, Radio, RadioGroup } from '@nextui-org/react';
import { getLocalTimeZone, now } from '@internationalized/date';
import { SelectDestinationShip } from '../ui/select/SelectDestinationShip';
import { SelectPassengers } from '../ui/select/SelectPassengers';

export const Ships = () => {
    const [selected, setSelected] = useState("Ida");
      const [origin, setOrigin] = useState<string>("");
      const [Destination, setDestination] = useState<string>("");
      const [arrivaltime, setArrivaltime] = React.useState<DateValue | null>(now(getLocalTimeZone()));
      const [departuretime, setDeparturetime] = React.useState<DateValue | null>(now(getLocalTimeZone()));
      const [passengers, setPassengers] = useState({
        adults:"1",
        children:"0"
      }) 



      const Onsubmit = ()=>{
        console.log({selected,origin,Destination,arrivaltime,departuretime,passengers })
      }

  return (
     <div className="p-2">
      <div>
        <RadioGroup
          value={selected}
          onValueChange={setSelected}
          orientation="horizontal"
        >
          <Radio value="Ida">Ida </Radio>
          <Radio value="Ida y vuelta">Ida y vuelta</Radio>
        </RadioGroup>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <div className="space-y-2">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            Origen
          </label>
          <SelectDestinationShip setvalue={setOrigin} placeholder="seleccione origen" />
        </div>
        <div className="space-y-2">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            Destino
          </label>
          <SelectDestinationShip
            setvalue={setDestination}
            placeholder="seleccione destino"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="w-full ">
            <label htmlFor="rooms" className="block text-sm font-medium ">
              Hora y fecha de llegada
            </label>
            <DatePicker
              hideTimeZone
              showMonthAndYearPickers
              value={arrivaltime}
              onChange={setArrivaltime}
            />
          </div>
          <div className="w-full ">
            <label htmlFor="rooms" className="block text-sm font-medium ">
              Hora y fecha de salida de vuelo o transporte
            </label>
            <DatePicker
              isDisabled={selected !== "Ida y vuelta"}
              hideTimeZone
              showMonthAndYearPickers
              value={departuretime}
              onChange={setDeparturetime}
            />
          </div>
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-2 items-end gap-2">
          <div>
            <label htmlFor="rooms" className="block text-sm font-medium ">
              Pasajeros
            </label>
            <SelectPassengers setPassengers={setPassengers} passengers={passengers} />
          </div>
          <div className="w-full ">
            <Button onPress={()=>Onsubmit()} isDisabled={ origin === "" || Destination === "" } type="submit" className="w-full">
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
