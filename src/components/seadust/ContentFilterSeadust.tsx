'use client"';
import { SeadustStore } from "@/store/SeadustStore";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import {
  Button,
  DateRangePicker,
  DateValue,
  RangeValue,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SelectDestinationSeadust } from "../home/Seadust";
import { SelectGuestSeadust } from "../ui/select/SelectGuestSeadust";

export interface DestinationSeadust {
  id: number;
  checkin: string;
  checkout: string;
  guest: Array<any>;
}

export const ContentFilterSeadust = () => {
  const { setValue, handleSubmit } = useForm<DestinationSeadust>();
  const [date, setdate] = useState<RangeValue<DateValue> | null>({
    start: today(getLocalTimeZone()).add({ days: 1 }),
    end: today(getLocalTimeZone()).add({ days: 2 }),
  });
  const t = useTranslations("Filter");

  const { setDestination, guest, checkin, checkout } = SeadustStore();

  useEffect(() => {
    if (checkin && checkout) {
      setdate({
        start: parseDate(checkin.split("T")[0]),
        end: parseDate(checkout.split("T")[0]),
      });
    }
  }, [checkin, checkout]);

  const onsubmit = (data: DestinationSeadust) => {
    const start = date?.start?.toDate(getLocalTimeZone());
    const end = date?.end?.toDate(getLocalTimeZone());
    if (start && end) {
      setDestination(
        data.id,
        start.toISOString(),
        end.toISOString(),
        data.guest
      );
    }
  };
  return (
    <div className="bg-maincolor rounded-lg shadow p-6 mt-6">
      <div className="p-2">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="grid grid-cols-1  items-center gap-2"
        >
          <div className="col-span-2">
            <SelectDestinationSeadust setValue={setValue} />
          </div>
          <div className=" col-span-3 grid grid-cols-1 gap-3">
            <div className="space-y-2">
              <label htmlFor="rooms" className="block text-sm font-medium ">
                Check-in Check-out (mm/dd/aaa)
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
              <SelectGuestSeadust value={guest} setValue={setValue} />
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full z-10">
                {t("button")}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
