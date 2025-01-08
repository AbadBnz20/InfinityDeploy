import React, { useState } from 'react'
import {  useForm } from 'react-hook-form';
import { SelectDestination } from '../ui/select/SelectDestination';
import { Button, DateRangePicker, DateValue, RangeValue } from '@nextui-org/react';
import { getLocalTimeZone, today } from '@internationalized/date';
import { DestinationStore } from '@/store/DestinationStore';
import { SelectGuest } from '../ui/select/SelectGuest';
import { useTranslations } from 'next-intl';
import { Destination } from '@/interfaces/Destination';

export const Ships = () => {
     const { setValue, handleSubmit } = useForm<Destination>();
 const [date, setdate] = useState<RangeValue<DateValue> | null>({
    start: today(getLocalTimeZone()).add({ days: 1 }),
    end: today(getLocalTimeZone()).add({ days: 2 }),
  });
    const t = useTranslations("Filter");
 const {  guest } = DestinationStore();
     const onsubmit = () => {
            console.log('data')
     };  
  return (
    <div className="p-2">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="grid grid-cols-1 md:grid-cols-5 items-center gap-2"
      >
        <div className="col-span-2">
          <SelectDestination setValue={setValue} />
        </div>
        <div className=" col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-2">
            <label htmlFor="rooms" className="block text-sm font-medium ">
              Check-in Check-out
            </label>
            <DateRangePicker
              value={date}
              onChange={setdate}
              minValue={today(getLocalTimeZone())}
              className="text-blue-600"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="rooms" className="block text-sm font-medium ">
              {t('room.title')}
            </label>
            <SelectGuest setValue={setValue} value={guest} />
          </div>
          <div className="mt-6">
            <Button  type="submit" className="w-full">
              {t('button')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
