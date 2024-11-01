"use client";
import {
  Button,
  DateRangePicker,
  DateValue,
  RangeValue,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SelectDestination } from "../ui/select/SelectDestination";
import { SubmitHandler, useForm } from "react-hook-form";
import { Destination } from "@/interfaces/Destination";
import { getLocalTimeZone, today } from "@internationalized/date";
import { SelectGuest } from "../ui/select/SelectGuest";
import { DestinationStore } from "@/store/DestinationStore";

export const ContentFilter = () => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
  } = useForm<Destination>();
  const [date, setdate] = useState<RangeValue<DateValue>>({
    start: today(getLocalTimeZone()).add({ days: 1 }),
    end: today(getLocalTimeZone()).add({ days: 2 }),
  });
  const [validate, setValidate] = useState(true);
  const { setDestinationData } = DestinationStore();
 
  useEffect(() => {
    setValue(
      "checkin",
      `${date?.start.year}-${date?.start.month}-${date?.start.day}`
    );
    setValue(
      "checkout",
      `${date?.end.year}-${date?.end.month}-${date?.end.day}`
    );
  }, [date]);
  const watchFields = watch("id");

  useEffect(() => {
    if (watchFields) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }, [watchFields]);

  const onsubmit: SubmitHandler<Destination> = (data) => {
    setDestinationData(data.id, data.checkin, data.checkout, data.guest);
  
  };



  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      
      <div className="bg-maincolor rounded-lg shadow p-6 mt-6">
      <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-4 ">Buscar</h2>
      <SelectDestination register={register} setValue={setValue} />
        <div className="space-y-2">
      </div>
          <label
            htmlFor="rooms"
            className="block text-sm font-medium "
          >
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
          <label
            htmlFor="rooms"
            className="block text-sm font-medium "
          >
            Seleccionar
          </label>
          <SelectGuest setValue={setValue} />
        </div>
        <Button type="submit" isDisabled={validate} className="w-full mt-5">Buscar</Button>
      </div>
    </form>
  );
};
