'use client';
import { formatDateToISO } from "@/actions/getDestination";
import { DestinationStore } from "@/store/DestinationStore";
import { Input } from "@nextui-org/react";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";

export const ContentDays = () => {
  const [day, setDay] = useState(0);
  const { checkin, checkout } = DestinationStore();
  useEffect(() => {
    const fetchData = async () => {
      if (checkin && checkout) {
        const checkInDate = DateTime.fromISO(await formatDateToISO(checkin));
        const checkOutDate = DateTime.fromISO(await formatDateToISO(checkout));

        console.log(checkOutDate.diff(checkInDate, 'days').days)

        setDay(checkOutDate.diff(checkInDate, 'days').days);
      }
    };

    fetchData();
  }, [checkin, checkout]);

  return (
    <Input
      type="text"
      value={day.toString()}
      disabled
      placeholder="Enter your email"
      endContent={<IoMoonOutline size={"20px"} />}
    />
  );
};
