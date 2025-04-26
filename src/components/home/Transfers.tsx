'use client';
import { getLocalTimeZone, now, today, } from "@internationalized/date";
import {
  Button,
  DatePicker,
  DateValue,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import React, { useState } from "react";
import {  SelectPassengers } from "../ui/select/SelectPassengers";
import { SellectOrigin } from "../ui/select/SellectOrigin";
import { TransfersStore } from "@/store/TransfersStore";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useTranslations } from "next-intl";
import { SelectDestinationTranslate } from "../ui/select/SelectDestinationTranslate";

// interface Transfers {
//   tripType: "Ida" | "Ida y vuelta";
//   origin: string;
//   destination: string;
//   arrivaltime: string;
//   departuretime: string;
//   adults: string;
//   children: string;
// }
export const Transfers = () => {
  const [selected, setSelected] = useState("Ida");
  const [origin, setOrigin] = useState<string>("");
  const [Destination, setDestination] = useState<string>("");
  const [arrivaltime, setArrivaltime] = React.useState<DateValue | null>(now(getLocalTimeZone()));
  const [departuretime, setDeparturetime] = React.useState<DateValue | null>(now(getLocalTimeZone()));
  const [passengers, setPassengers] = useState({
    adults:"1",
    children:"0"
  })
const {setTransfersData}=TransfersStore()
const router = useRouter();
const posthog = usePostHog();
 const t = useTranslations("Transfers");
  const Onsubmit = ()=>{
    // console.log({selected,origin,Destination,arrivaltime,departuretime,passengers })
   const timearrivaltime:Date = arrivaltime?.toDate(getLocalTimeZone()) || new Date();
   const timedeparturetime:Date = departuretime?.toDate(getLocalTimeZone()) || new Date();
    setTransfersData(selected as  "Ida" | "Ida y vuelta",origin,Destination,timearrivaltime,timedeparturetime,{
      adults: +passengers.adults ,
      children: +passengers.children,
    })
    router.push(`/transfers`);
    posthog.capture("$pageview", { $current_url: '/transfers' });
  }


  return (
    <div className="p-2">
      <div>
        <RadioGroup
          value={selected}
          onValueChange={setSelected}
          orientation="horizontal"
        >
          <Radio value="Ida"> {t("item4")} </Radio>
          <Radio value="Ida y vuelta"> {t("item5")}</Radio>
        </RadioGroup>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <div className="space-y-2">
          <label htmlFor="rooms" className="block text-sm font-medium ">
          {t("item.title")} <span className="text-red-500">*</span>
          </label>
          <SellectOrigin setvalue={setOrigin} placeholder={t("item.placeholder")} />
        </div>
        <div className="space-y-2">
          <label htmlFor="rooms" className="block text-sm font-medium ">
          {t("item1.title")} <span className="text-red-500">*</span>
          </label>
          <SelectDestinationTranslate
            setvalue={setDestination}
            placeholder={t("item1.placeholder")}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="w-full ">
            <label htmlFor="rooms" className="block text-sm font-medium ">
            {t("item2")}(mm/dd/aaa) <span className="text-red-500">*</span>
            </label>
            <DatePicker
              hideTimeZone
              showMonthAndYearPickers
              value={arrivaltime}
              onChange={setArrivaltime}
               minValue={today(getLocalTimeZone())}
            />
          </div>
          <div className="w-full ">
            <label htmlFor="rooms" className="block text-sm font-medium ">
            {t("item3")} (mm/dd/aaa)
            </label>
            <DatePicker
              isDisabled={selected !== "Ida y vuelta"}
              hideTimeZone
              showMonthAndYearPickers
              value={departuretime}
              onChange={setDeparturetime}
               minValue={today(getLocalTimeZone())}
            />
          </div>
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-2 items-end gap-2">
          <div>
            <label htmlFor="rooms" className="block text-sm font-medium ">
            {t("item6")} <span className="text-red-500">*</span>
            </label>
            <SelectPassengers setPassengers={setPassengers} passengers={passengers} />
          </div>
          <div className="w-full ">
            <Button onPress={()=>Onsubmit()} isDisabled={ origin === "" || Destination === "" } type="submit" className="w-full">
            {t("button")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
