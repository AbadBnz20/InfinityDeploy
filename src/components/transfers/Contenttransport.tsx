"use client";
import { parseAbsoluteToLocal } from "@internationalized/date";
import {
  Card,
  CardBody,
  CardHeader,
  DateInput,
  Input,
} from "@nextui-org/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IoCalendarOutline, IoSwapHorizontalOutline } from "react-icons/io5";
import { FormValuesTransfer } from "./FormTransfer";

interface Props {
  register:UseFormRegister<FormValuesTransfer>,
  errors:FieldErrors<FormValuesTransfer>,
  date:Date,
}

export const Contenttransport = ({register,errors,date}:Props) => {
    const datetime = new Date(date);



  return (
    <Card className="my-3 shadow-none">
      <CardHeader>
        <h1 className="flex items-center gap-2  text-xl">
          Detalles del Transporte
        </h1>
      </CardHeader>
      <CardBody>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-small">Numero de transporte</label>
            <Input
              startContent={<IoSwapHorizontalOutline size={24} />}
              placeholder="Introduzca el numero de transporte vuelo,tren,bus"
              {...register("codetransport", {
                required: "El Numero de transporte es requerido",
              })}
              isInvalid={!!errors.codetransport}
              errorMessage={errors.codetransport?.message}
            />
          </div>
          <div className="space-y-2">
            <label className="text-small">Fecha</label>
            <div className="flex gap-2">
              <DateInput
                startContent={<IoCalendarOutline size={24} />}
                isDisabled
                hideTimeZone
                value={parseAbsoluteToLocal(datetime.toISOString())}
              />
            </div>
          </div>
        </div>

       
      </CardBody>
    </Card>
  );
};
