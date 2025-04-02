import { getLocalTimeZone, today } from "@internationalized/date";
import {
  Button,
  DateRangePicker,
  DateValue,
  RangeValue,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SelectGuest } from "../ui/select/SelectGuest";
import { useTranslations } from "next-intl";

interface Destination {
  id: number;
  checkin: string;
  checkout: string;
  guest: Array<any>;
}

export const Seadust = () => {
  const { setValue, handleSubmit } = useForm<Destination>();
  const [date, setdate] = useState<RangeValue<DateValue> | null>({
    start: today(getLocalTimeZone()).add({ days: 1 }),
    end: today(getLocalTimeZone()).add({ days: 2 }),
  });
  const [guest, setGuest] = useState([]);
  const t = useTranslations("Filter");

  const onsubmit = (data: Destination) => {
    console.log(data);
    setGuest([]);
  };

  return (
    <div className="p-2">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="grid grid-cols-1 md:grid-cols-5 items-center gap-2"
      >
        <div className="col-span-2">
          <SelectDestinationSeadust />
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
              {t("room.title")}
            </label>
            <SelectGuest setValue={setValue} value={guest} />
          </div>
          <div className="mt-6">
            <Button type="submit" className="w-full">
              {t("button")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export const SelectDestinationSeadust = () => {
  const t = useTranslations("Filter");
  return (
    <>
      <label htmlFor="rooms" className="block text-sm font-medium ">
      {t("seach.title")}
      </label>
      <Select placeholder={t("seach.placeholder")} className="mt-3">
        <SelectItem key={"1"}>No hay opciones</SelectItem>
      </Select>
    </>
  );
};
