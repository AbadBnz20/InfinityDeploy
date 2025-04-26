"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,

  Input,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { TransfersStore } from "@/store/TransfersStore";
import {
  GetCar,
  GetDetailsDestination,
} from "@/actions/originDestination/OriginDestination";
import { Car } from "@/interfaces/Transfers-response";
import { ModalConfirm } from "../ui/modal/ModalConfirm";

interface User {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}
export interface Passenger {
  first_name: string;
  last_name: string;
  is_child?: boolean;
  age?: number;
}

export interface FormValuesTransfer {
  mainpassenger: User;
  codetransport: string;
  note: string;
}

export interface Props {
  passengers: {
    adults: number;
    children: number;
  };
  datetime: Date;
  firstname: string;
  lastname: string;
  email: string | undefined;
  number: string;
}

export const FormTransfer = ({
  passengers,
  firstname,
  lastname,
  email,
  number,
}: Props) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesTransfer>({
    defaultValues: {
      mainpassenger: {
        first_name: firstname,
        last_name: lastname,
        phone: number,
        email: email,
      },
    },
  });
  const {
    selected,
    origin,
    destination,
    idcargoing,
    idcarreturn,
    arrivaltime,
    departuretime,
    passengers: passengersmain,
  } = TransfersStore();

  // const [accepted, setAccepted] = useState(false);
  const [loading, setloading] = useState(false);
  const t = useTranslations("TransfersPage");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = async (data: FormValuesTransfer) => {
    setloading(true);
    try {
      let respreturn: Car | null = null;
      const resp = await GetDetailsDestination(origin, destination, idcargoing!);
      if (selected === "Ida y vuelta") {
        respreturn = await GetCar(idcarreturn!);
      }
      const date = new Date(arrivaltime);
      const dateReturn = new Date(departuretime);
      const formattedDate = date.toISOString().split("T")[0];
      const formattedTime = date.toISOString().split("T")[1].split(".")[0];
      const formattedDateReturn = dateReturn.toISOString().split("T")[0];
      const formattedTimeReturn = dateReturn
        .toISOString()
        .split("T")[1]
        .split(".")[0];
  
      if (resp) {
        const res = await fetch("/api/transfers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: selected,
            origin: resp.origin,
            destination: resp.destination,
            date: formattedDate,
            time: formattedTime,
            car: ` ${resp?.car?.brand} ${resp?.car?.model}`,
            capacity: resp?.car?.ability,
            price: resp?.car?.transferprice,
            datereturn: formattedDateReturn,
            timereturn: formattedTimeReturn,
            carreturn: ` ${respreturn?.brand} ${respreturn?.model}`,
            capacityreturn: respreturn?.ability,
            pricereturn: respreturn?.transferprice,
            firstName: data.mainpassenger.first_name,
            lastname: data.mainpassenger.last_name,
            email: data.mainpassenger.email,
            passengerAdult: passengersmain.adults.toString(),
            passengerChildren: passengersmain.children.toString(),
          }),
        });
        const datafetch = await res.json();
        console.log(datafetch);
        onOpen();
      }
    } catch (error) {
      console.log(error);
      
    }
    setloading(false);   
  };

  return (
    <>
    <ModalConfirm isOpen={isOpen} onOpenChange={onOpenChange}/>
    <Card className="my-3 shadow">
      <CardHeader>
        <h1 className="flex items-center gap-2  text-xl">{t("item2.title")}</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-3">
            <div className="">
              <p className=" text-medium">{t("item2.subtitle")}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                <div className="space-y-2">
                  <label className="text-small">{t("item2.item2")} <span className="text-red-500">*</span></label>
                  <Input
                    {...register("mainpassenger.first_name", {
                      required: "El campo de nombre es requerido",
                    })}
                    placeholder="Ingrese nombre"
                    value={watch("mainpassenger.first_name")}
                    isInvalid={!!errors.mainpassenger?.first_name}
                    errorMessage={errors.mainpassenger?.first_name?.message}
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-small">{t("item2.item3")} <span className="text-red-500">*</span></label>
                  <Input
                    {...register("mainpassenger.last_name", {
                      required: "El campo de apellido es requerido",
                    })}
                    type="text"
                    value={watch("mainpassenger.last_name")}
                    placeholder="Ingrese apellido"
                    isInvalid={!!errors.mainpassenger?.last_name}
                    errorMessage={errors.mainpassenger?.last_name?.message}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                <div className="space-y-2">
                  <label className="text-small">Email <span className="text-red-500">*</span></label>

                  <Input
                    {...register("mainpassenger.email", {
                      required: "El campo de Correo es requerido",
                    })}
                    type="email"
                    value={watch("mainpassenger.email")}
                    placeholder="Ingrese Correo"
                    isInvalid={!!errors.mainpassenger?.email}
                    errorMessage={errors.mainpassenger?.email?.message}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-small">{t("item2.item4")} <span className="text-red-500">*</span></label>
                  <Input
                    {...register("mainpassenger.phone", {
                      required: "El campo de Numero es requerido",
                    })}
                    type="number"
                    startContent={
                      <span >+</span>
                    }
                    value={watch("mainpassenger.phone")}
                    placeholder="Ingrese numero"
                    isInvalid={!!errors.mainpassenger?.phone}
                    errorMessage={errors.mainpassenger?.phone?.message}
                  />
                </div>
                <div className="col-span-full mt-3">
                <label htmlFor="rooms" className="block text-sm font-medium ">
                  Nota
                </label>
                <Textarea
                  type="text"
                  {...register("note")}
                  isInvalid={!!errors.note}
                  errorMessage={errors.note?.message}
                />
              </div>
              </div>
            </div>
            <div className="my-5  space-y-2">
              <p className=" text-medium">
                Pasajeros adultos:{passengers.adults}
              </p>
              <p className=" text-medium">
                Pasajeros Niños:{passengers.children}
              </p>
            </div>
            <div className=" w-full mt-3">
              {/* <Contenttransport date={datetime} register={register} errors={errors} /> */}
              <div className="space-y-6 p-4 mt-3">
                {/* <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium">{t("item2.item11")}</h2>
                    <span className="text-sm text-blue-600">
                      ({t("item2.item12")})
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="terms"
                      checked={accepted}
                      onValueChange={setAccepted}
                    />
                    <label htmlFor="terms" className="text-sm leading-relaxed">
                      {t("item2.item13")}
                      <a className="text-blue-600 hover:underline">
                        {t("item2.item14")}
                      </a>
                      ,{" "}
                      <a className="text-blue-600 hover:underline">
                        {t("item2.item15")}
                      </a>
                      , {t("item2.item16")}
                    </label>
                  </div>
                </div> */}

                <Button
                  className="w-full bg-black text-white dark:bg-white dark:text-black"
                  type="submit"
                  isLoading={loading}
                  // isDisabled={!accepted}
                >
                  {t("item2.button")}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  
    </>
  );
};
