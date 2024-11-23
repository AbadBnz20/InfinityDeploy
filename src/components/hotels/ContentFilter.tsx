"use client";
import {
  Button,
  DateRangePicker,
  DateValue,
  Input,
  RangeValue,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Destination } from "@/interfaces/Destination";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { SelectGuest } from "../ui/select/SelectGuest";
import { DestinationStore } from "@/store/DestinationStore";
import { formatDateToISO } from "@/actions/getDestination";
import { IoCreateOutline } from "react-icons/io5";
import { SelectDestination } from "../ui/select/SelectDestination";
import { ContentDays } from "../ui/select/ContentDays";

export const ContentFilter = () => {
  const { setValue, handleSubmit, watch } = useForm<Destination>();
  const [visible, setVisible] = useState(true);
  const [date, setdate] = useState<RangeValue<DateValue>>({
    start: today(getLocalTimeZone()).add({ days: 1 }),
    end: today(getLocalTimeZone()).add({ days: 2 }),
  });
  const [validate, setValidate] = useState(true);
  const { setDestinationData, guest, checkin, checkout, name } =
    DestinationStore();
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
  useEffect(() => {
    const fetchData = async () => {
      if (checkin && checkout) {
        setdate({
          start: parseDate(await formatDateToISO(checkin)),
          end: parseDate(await formatDateToISO(checkout)),
        });
      }
    };

    fetchData();
  }, [checkin, checkout]);

  const onsubmit: SubmitHandler<Destination> = (data) => {
    setDestinationData(data.id, data.checkin, data.checkout, data.guest);
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="bg-maincolor rounded-lg shadow p-6 mt-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold mb-4 ">Buscar</h2>
          {visible ? (
            <Input
              type="text"
              value={name}
              disabled
              placeholder="Enter your email"
              endContent={
                <button onClick={() => setVisible(!visible)} type="button">
                  <IoCreateOutline size={"20px"} />
                </button>
              }
            />
          ) : (
            <SelectDestination setValue={setValue} />
          )}

          <div className="space-y-2"></div>
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
            Seleccionar
          </label>
          <SelectGuest setValue={setValue} value={guest} />
        </div>
        <div className="space-y-2 mt-4">
        <label htmlFor="rooms" className="block text-sm font-medium ">
            Noches
          </label>
            <ContentDays/>
        </div>
        <Button type="submit" isDisabled={validate} className="w-full mt-5">
          Buscar
        </Button>
      </div>
    </form>
  );
};
