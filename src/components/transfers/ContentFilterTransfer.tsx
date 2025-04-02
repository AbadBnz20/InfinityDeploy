"use client";
import {
  getLocalTimeZone,
  now,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import {
  Button,
  DatePicker,
  DateValue,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SelectPassengers } from "../ui/select/SelectPassengers";
import { SellectOrigin } from "../ui/select/SellectOrigin";
import { TransfersStore } from "@/store/TransfersStore";
import { useTranslations } from "next-intl";

export const ContentFilterTransfer = () => {
  const {
    selected: type,
    origin: originStore,
    destination,
    arrivaltime: timearrival,
    departuretime: timedeparture,
    passengers: passgersStore,
    setTransfersData,
  } = TransfersStore();

  const [selected, setSelected] = useState("Ida");
  const [origin, setOrigin] = useState<string>("");
  const [Destination, setDestination] = useState<string>("");
  const [arrivaltime, setArrivaltime] = React.useState<DateValue | null>(
    now(getLocalTimeZone())
  );
  const [departuretime, setDeparturetime] = React.useState<DateValue | null>(
    now(getLocalTimeZone())
  );
  const [passengers, setPassengers] = useState({
    adults: "1",
    children: "0",
  });
  const t = useTranslations("Transfers");

  useEffect(() => {
    const isoDateStringarrival = new Date(timearrival);
    const isoDateStringdeparture = new Date(timearrival);
    setSelected(type);
    setOrigin(originStore);
    setDestination(destination);
    setArrivaltime(parseAbsoluteToLocal(isoDateStringarrival.toISOString()));
    setDeparturetime(
      parseAbsoluteToLocal(isoDateStringdeparture.toISOString())
    );
    setPassengers({
      adults: passgersStore.adults.toString(),
      children: passgersStore.children.toString(),
    });
  }, [
    type,
    originStore,
    destination,
    timearrival,
    timedeparture,
    passgersStore,
  ]);

  const Onsubmit = () => {
    const timearrivaltime: Date =
      arrivaltime?.toDate(getLocalTimeZone()) || new Date();
    const timedeparturetime: Date =
      departuretime?.toDate(getLocalTimeZone()) || new Date();
    setTransfersData(
      selected as "Ida" | "Ida y vuelta",
      origin,
      Destination,
      timearrivaltime,
      timedeparturetime,
      {
        adults: +passengers.adults,
        children: +passengers.children,
      }
    );
  };

  return (
    <div className="bg-maincolor rounded-lg shadow p-6 mt-6">
      <div className="p-2">
        <div>
          <RadioGroup
            value={selected}
            onValueChange={setSelected}
            orientation="horizontal"
          >
            <Radio value="Ida">{t("item4")} </Radio>
            <Radio value="Ida y vuelta">{t("item5")}</Radio>
          </RadioGroup>
        </div>
        <div className="grid grid-cols-1  gap-2 mt-2">
          <div className="space-y-2">
            <label htmlFor="rooms" className="block text-sm font-medium ">
            {t("item.title")}
            </label>
            <SellectOrigin
              setvalue={setOrigin}
              defaultSelectedKeys={origin}
              placeholder={t("item.placeholder")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="rooms" className="block text-sm font-medium ">
            {t("item1.title")}
            </label>
            <SellectOrigin
              setvalue={setDestination}
              defaultSelectedKeys={destination}
              placeholder={t("item1.placeholder")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 mt-2">
          <div className="grid grid-cols-1  gap-2">
            <div className="w-full ">
              <label htmlFor="rooms" className="block text-sm font-medium ">
              {t("item2")}
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
              {t("item3")}
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
          <div className="grid  grid-cols-1  items-end gap-2">
            <div>
              <label htmlFor="rooms" className="block text-sm font-medium ">
              {t("item6")}
              </label>
              <SelectPassengers
                setPassengers={setPassengers}
                passengers={passengers}
              />
            </div>
            <div className="w-full ">
              <Button
                onPress={() => Onsubmit()}
                isDisabled={origin === "" || Destination === ""}
                type="submit"
                className="w-full"
              >
                 {t("button")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
