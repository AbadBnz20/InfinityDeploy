"use client";

import { TripStore } from "@/store/TripStore";
import { getLocalTimeZone, today } from "@internationalized/date";
import {
  Button,
  DateRangePicker,
  DateValue,
  Input,
  RangeValue,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
export interface TripForm {
  country_origin: string;
  city_origin: string;
  contry_destination: string;
  city_destination: string;
  departure_date: DateValue;
  return_date: DateValue;
}

export const MyTrip = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripForm>();
  const [date, setdate] = useState<RangeValue<DateValue> | null>({
    start: today(getLocalTimeZone()).add({ days: 1 }),
    end: today(getLocalTimeZone()).add({ days: 2 }),
  });
   const t = useTranslations("Myperfect");
  const { SetbudgetData } = TripStore();
  const router = useRouter();
  const posthog = usePostHog();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: TripForm) => {
    if (!date) {
      return;
    }
    setLoading(true);
    const departureDate = date?.start.toDate(getLocalTimeZone());
    const returnDate = date?.end.toDate(getLocalTimeZone());
    SetbudgetData(
      data.country_origin,
      data.city_origin,
      data.contry_destination,
      data.city_destination,
      departureDate.toISOString(),
      returnDate.toISOString()
    );
    router.push(`/perfecttrip`);
    posthog.capture("$pageview", { $current_url: '/perfecttrip' });
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
      >
        <div className="w-full ">
          <label htmlFor="rooms" className="block text-sm font-medium ">
          {t("item.title")}  <span className="text-red-500">*</span>
          </label>
          <Input
          isRequired
        
            placeholder= {t("item.placeholder")}
            type="text"
            {...register("country_origin", {
              required: "El campo es requerido",
            })}
            isInvalid={!!errors.country_origin}
            errorMessage={errors.country_origin?.message}
          />
        </div>
        <div className="w-full ">
          <label htmlFor="rooms" className="block text-sm font-medium ">
          {t("item1.title")} <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder= {t("item1.placeholder")}
            type="text"
            {...register("city_origin", {
              required: "El campo es requerido",
            })}
            isInvalid={!!errors.city_origin}
            errorMessage={errors.city_origin?.message}
          />
        </div>
        <div className="w-full ">
          <label htmlFor="rooms" className="block text-sm font-medium ">
          {t("item2.title")} <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder= {t("item2.placeholder")}
            type="text"
            {...register("contry_destination", {
              required: "El campo es requerido",
            })}
            isInvalid={!!errors.contry_destination}
            errorMessage={errors.contry_destination?.message}
          />
        </div>
        <div className="w-full ">
          <label htmlFor="rooms" className="block text-sm font-medium ">
          {t("item3.title")} <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder={t("item3.placeholder")}
            type="text"
            {...register("city_destination", {
              required: "El campo es requerido",
            })}
            isInvalid={!!errors.city_destination}
            errorMessage={errors.city_destination?.message}
          />
        </div>
        <div className="w-full ">
          <label htmlFor="rooms" className="block text-sm font-medium ">
          {t("date")} (mm/dd/aaa) <span className="text-red-500">*</span>
          </label>
          <DateRangePicker
            value={date}
            onChange={setdate}
            minValue={today(getLocalTimeZone())}
            className="text-blue-600"
          />
        </div>
        <div className="w-full flex items-end ">
          <Button
            type="submit"
            fullWidth
            isLoading={loading}
            // className="bg-black text-white dark:bg-white dark:text-black"
          >
             {t("button")}
          </Button>
        </div>
      </form>
    </div>
  );
};
