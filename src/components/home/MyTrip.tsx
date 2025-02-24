"use client";

import { TripStore } from "@/store/TripStore";
import { getLocalTimeZone } from "@internationalized/date";
import { Button, DatePicker, DateValue, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
    control,
  } = useForm<TripForm>();
  const { SetbudgetData } = TripStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: TripForm) => {
    setLoading(true);

    const departureDate = data.departure_date.toDate(getLocalTimeZone());
    const returnDate = data.return_date.toDate(getLocalTimeZone());
    SetbudgetData(
      data.country_origin,
      data.city_origin,
      data.contry_destination,
      data.city_destination,
      departureDate.toISOString(),
      returnDate.toISOString()
    );
    router.push(`/perfecttrip`);
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
            Pais de Origen
          </label>
          <Input
            placeholder="origen"
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
            Ciudad de origen
          </label>
          <Input
            placeholder="ciudad de origen"
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
            Pais de Destino
          </label>
          <Input
            placeholder="origen"
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
            Ciudad de Destino
          </label>
          <Input
            placeholder="ciudad de origen"
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
            Fecha de Salida
          </label>
          <Controller
            name="departure_date"
            control={control}
            rules={{ required: "La fecha es requerida" }}
            render={({ field }) => (
              <DatePicker
                {...field}
                isInvalid={!!errors.departure_date}
                errorMessage={errors.departure_date?.message}
              />
            )}
          />
        </div>
        <div className="w-full ">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            Fecha de Regreso
          </label>
          <Controller
            name="return_date"
            control={control}
            rules={{ required: "La fecha es requerida" }}
            render={({ field }) => (
              <DatePicker
                {...field}
                isInvalid={!!errors.return_date}
                errorMessage={errors.return_date?.message}
              />
            )}
          />
        </div>
        <div className="col-span-full flex  justify-end">
          <Button
            type="submit"
            isLoading={loading}
            className="bg-black text-white dark:bg-white dark:text-black w-[300px]"
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
};
