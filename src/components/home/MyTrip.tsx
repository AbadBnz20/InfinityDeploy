"use client";
import { RegisterTrip, TripFormRegister } from "@/actions/mytrip/RegisterTrip";
import { getLocalTimeZone } from "@internationalized/date";
import { Button, DatePicker, DateValue, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export interface TripForm {
  country_origin: string;
  city_origin: string;
  contry_destination: string;
  city_destination: string;
  departure_date: DateValue;
  return_date: DateValue;
  budget: string;
  adult: string;
  children: string;
}

export const MyTrip = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TripForm>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: TripForm) => {
    setLoading(true);
    try {
      const departureDate = data.departure_date.toDate(getLocalTimeZone());

      const returnDate = data.return_date.toDate(getLocalTimeZone());

      const obj: TripFormRegister = {
        ...data,
        departure_date: departureDate.toISOString(),
        return_date: returnDate.toDateString(),
      };

      const resp = await RegisterTrip(obj);
      if (!resp.status) {
        return toast.error(resp.message, {
          position: "top-right",
        });
      }
      reset();
      toast.success(resp.message, {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      console.log(error);
      toast.error("Ha ocurrido un error inesperado", {
        position: "top-right",
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-4"
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
        <div className="w-full ">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            Presupuesto (USD)
          </label>
          <Input
            placeholder="presupuesto"
            type="number"
            {...register("budget", {
              required: "El campo es requerido",
            })}
            isInvalid={!!errors.budget}
            errorMessage={errors.budget?.message}
          />
        </div>
        <div className="w-full ">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            Numero de adultos
          </label>
          <Input
            placeholder=""
            type="number"
            {...register("adult", {
              required: "El campo es requerido",
            })}
            isInvalid={!!errors.adult}
            errorMessage={errors.adult?.message}
          />
        </div>
        <div className="w-full ">
          <label htmlFor="rooms" className="block text-sm font-medium ">
            Numero de niños
          </label>
          <Input
            placeholder=""
            type="number"
            {...register("children", {
              required: "El campo es requerido",
            })}
            isInvalid={!!errors.children}
            errorMessage={errors.children?.message}
          />
        </div>
        <div>
          <Button
            isLoading={loading}
            type="submit"
            className="bg-black text-white dark:bg-white dark:text-black w-[300px]"
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
};
