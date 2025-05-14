"use client";

import { TripStore } from "@/store/TripStore";
import { getLocalTimeZone, today } from "@internationalized/date";
import {
  Button,
  DateRangePicker,
  DateValue,
  RangeValue,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SelectCountry } from "../ui/select/SelectCountry";
import { CodesStore } from "@/store/CodeDestinationStore";
import { SelectRegions } from "../ui/select/SelectRegions";
import { SelectCities } from "../ui/select/SelectCities";
export interface TripForm {
  country_origin: string;
  region_origin: string;
  city_origin: string;
  contry_destination: string;
  region_destination: string;
  city_destination: string;
  departure_date: DateValue;
  return_date: DateValue;
}

export const MyTrip = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TripForm>();
  const [date, setdate] = useState<RangeValue<DateValue> | null>({
    start: today(getLocalTimeZone()).add({ days: 1 }),
    end: today(getLocalTimeZone()).add({ days: 2 }),
  });
  const t = useTranslations("Myperfect");
  const { SetbudgetData } = TripStore();
  const {
    SetCountryOrigin,
    country_origin_code,
    SetRegionOrigin,
    region_origin_code,
    SetCityOrigin,
    SetCountryDestination,
    contry_destination_code,
    SetRegionDestination,
    region_destination_code,
    SetCityDestination,
  } = CodesStore();
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
      data.region_origin,
      data.city_origin,
      data.contry_destination,
      data.region_destination,
      data.city_destination,
      departureDate.toISOString(),
      returnDate.toISOString()
    );
    router.push(`/perfecttrip`);
    posthog.capture("$pageview", { $current_url: "/perfecttrip" });
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="w-full ">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            {t("item.title")} <span className="text-red-500">*</span>
          </label>

          <SelectCountry
            control={control}
            name="country_origin"
            error={errors.country_origin}
            OnchageCountry={SetCountryOrigin}
          />
        </div>

        <div className="w-full ">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            Region Origen <span className="text-red-500">*</span>
          </label>

          <SelectRegions
            control={control}
            name="region_origin"
            error={errors.region_origin}
            OnchageRegion={SetRegionOrigin}
            countrycode={country_origin_code}
          />
        </div>

        <div className="w-full ">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            {t("item1.title")} <span className="text-red-500">*</span>
          </label>
          <SelectCities
            control={control}
            name="city_origin"
            error={errors.city_origin}
            OnchageCity={SetCityOrigin}
            countrycode={country_origin_code}
            regioncode={region_origin_code}
          />
        </div>
        <div className="w-full ">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            {t("item2.title")} <span className="text-red-500">*</span>
          </label>
          <SelectCountry
            control={control}
            name="contry_destination"
            error={errors.contry_destination}
            OnchageCountry={SetCountryDestination}
          />
        </div>
        <div className="w-full ">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            Region Destino <span className="text-red-500">*</span>
          </label>
          <SelectRegions
            control={control}
            name="region_destination"
            error={errors.region_destination}
            OnchageRegion={SetRegionDestination}
            countrycode={contry_destination_code}
          />
        </div>
        <div className="w-full ">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            {t("item3.title")} <span className="text-red-500">*</span>
          </label>
          <SelectCities
            control={control}
            name="city_destination"
            error={errors.city_destination}
            OnchageCity={SetCityDestination}
            countrycode={contry_destination_code}
            regioncode={region_destination_code}
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
