import {
  GetNumberContract,
  RegisterTrip,
  TripFormRegister,
} from "@/actions/mytrip/RegisterTrip";
import { useSession } from "@/hooks/useSession";
import { TripStore } from "@/store/TripStore";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { Key, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  budget: string;
  currency: string;
}
interface Props {
  onchange: (key: Key) => void;
}

export const ContentBudgetTrip = ({ onchange }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const {
    country_origin,
    city_origin,
    contry_destination,
    city_destination,
    date_start,
    date_end,
    flight,
    hotel,
    car,
    attractions,
    adults,
    children,
    details,
  } = TripStore();
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const { session } = useSession();
  const t = useTranslations("MyperfectPage");

  const onSubmit = async (data: FormData) => {
    try {
      const obj: TripFormRegister = {
        country_origin,
        city_origin,
        contry_destination,
        city_destination,
        date_start,
        date_end,
        flight,
        hotel,
        car,
        attractions,
        adult: adults.toString(),
        children,
        details,
        budget: data.budget,
        currency: data.currency,
      };
      setloading(true);
      const response = await RegisterTrip(obj);
      if (!response.status) {
        return toast.error(response.message, {
          position: "top-right",
        });
      }

      if (session) {
        const numberContract = await GetNumberContract();
        const res = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nrocontract: numberContract.data,
            budget: data.budget,
            fullname: `${session.firstname} ${session.lastname}`,
            email: session.email,
            phone: session.number,
            country_origin,
            city_origin,
            contry_destination,
            city_destination,
            date_start: date_start.split("T")[0],
            date_end: date_end.split("T")[0],
            flight,
            hotel,
            car,
            attractions,
            adult: adults,
            children,
            details,
            currency: data.currency,
          }),
        });
        const datafetch = await res.json();
        console.log(datafetch);
      }

      toast.success(response.message, {
        position: "top-right",
      });
      router.push(`/`);
    } catch (error) {
      console.log(error);
      toast.error("Ha ocurrido un error inesperado", {
        position: "top-right",
      });
    }

    setloading(false);
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">
              {t("item6.title")} <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="0"
              type="number"
              {...register("budget", {
                required: "El campo es requerido",
              })}
              isInvalid={!!errors.budget}
              errorMessage={errors.budget?.message}
            />
          </div>
          <div className="">
            <label className="block text-sm font-medium mb-2">
              {t("item7.title")} <span className="text-red-500">*</span>
            </label>
            <Select
              placeholder="seleccione opcion"
              {...register("currency", {
                required: "El campo es requerido",
              })}
              isInvalid={!!errors.currency}
              errorMessage={errors.currency?.message}
            >
              <SelectItem key={"Dollars (USA)"}>$ Dollars (USA)</SelectItem>
              <SelectItem key={"Reales (BRL)"}>$ Reales (BRL)</SelectItem>
              <SelectItem key={"Pesos (MXN)"}>$ Pesos (MXN)</SelectItem>
              <SelectItem key={"Euros (EUR)"}>€ Euros (EUR)</SelectItem>
              <SelectItem key={"Pesos Dom (DOP)"}>$ Pesos Dom (DOP)</SelectItem>
              <SelectItem key={"Canadian Dollars (CAD)"}>
                Can$ Dollars (CAD)
              </SelectItem>
              <SelectItem key={"club_points"}>Club Points</SelectItem>
            </Select>
          </div>
        </div>
        <div className="w-full flex justify-end gap-3">
          <Button
            size="lg"
            className="w-[50%]"
            onPress={() => onchange("2" as Key)}
           
          >
            {t("buttonStepprev")}
          </Button>
          <Button
            isLoading={loading}
            size="lg"
            className="bg-black text-white dark:bg-white dark:text-black w-[50%]"
            type="submit"
            variant="flat"
          >
            {t("button")}
          </Button>
        </div>
      </form>
    </div>
  );
};
