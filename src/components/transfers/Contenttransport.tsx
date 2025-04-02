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
import { useTranslations } from "next-intl";

interface Props {
  register:UseFormRegister<FormValuesTransfer>,
  errors:FieldErrors<FormValuesTransfer>,
  date:Date,
}

export const Contenttransport = ({register,errors,date}:Props) => {
    const datetime = new Date(date);
    const t = useTranslations("TransfersPage");


  return (
    <Card className="my-3 shadow-none">
      <CardHeader>
        <h1 className="flex items-center gap-2  text-xl">
        {t("item2.item8")}
        </h1>
      </CardHeader>
      <CardBody>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-small">{t("item2.item9")}</label>
            <Input
              startContent={<IoSwapHorizontalOutline size={24} />}
              placeholder={t("item2.placeholder2")}
              {...register("codetransport", {
                required: "El Numero de transporte es requerido",
              })}
              isInvalid={!!errors.codetransport}
              errorMessage={errors.codetransport?.message}
            />
          </div>
          <div className="space-y-2">
            <label className="text-small">{t("item2.item10")}</label>
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
