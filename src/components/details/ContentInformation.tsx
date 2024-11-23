"use client";
import { formatDateToISO } from "@/actions/getDestination";
import { DestinationStore } from "@/store/DestinationStore";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import {
  Button,
  Card,
  DateRangePicker,
  DateValue,
  Input,
  RangeValue,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { ContentDays } from "../ui/select/ContentDays";

export const ContentInformation = () => {
  const {  guest, checkin, checkout, name } =
    DestinationStore();

  const [date, setdate] = useState<RangeValue<DateValue>>({
    start: today(getLocalTimeZone()).add({ days: 1 }),
    end: today(getLocalTimeZone()).add({ days: 2 }),
  });
  const [rooms, setRooms] = useState<{ adults: number; children: number[] }[]>([
    { adults: 1, children: [] },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      if (checkin && checkout) {
        setdate({
          start: parseDate(await formatDateToISO(checkin)),
          end: parseDate(await formatDateToISO(checkout)),
        });
        setRooms(guest);
      }
    };

    fetchData();
  }, [checkin, checkout]);
  const getSummary = () => {
    const totalRooms = rooms.length;
    const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
    const totalChildren = rooms.reduce(
      (sum, room) => sum + room.children.length,
      0
    );
    return `${totalRooms} Habitación${
      totalRooms > 1 ? "es" : ""
    }, ${totalAdults} adulto${
      totalAdults > 1 ? "s" : ""
    }, ${totalChildren} niño${totalChildren > 1 ? "s" : ""}`;
  };
  return (
    <Card className="bg-maincolor rounded-md my-4 p-2 ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <Input type="text" value={name} disabled />
        </div>
        <div>
          <DateRangePicker
            value={date}
            // onChange={setdate}

            minValue={today(getLocalTimeZone())}
            className="text-blue-600"
          />
        </div>
        <div>
          <Button
            variant="solid"
            role="combobox"
            className="w-full justify-between bg-[#f4f4f5]  dark:bg-[#27272a]"
          >
            {getSummary()}
          </Button>
        </div>
        <div>
          <ContentDays />
        </div>
      </div>
    </Card>
  );
};
