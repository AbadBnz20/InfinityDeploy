"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Contenttransport } from "./Contenttransport";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

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
  passaengers: Passenger[];
  codetransport: string;
}

export interface Props {
  passengers: {
    adults: number;
    children: number;
  };
  datetime:Date,
  firstname:string,
  lastname:string,
  email:string | undefined,
  number:string
}

export const FormTransfer = ({ passengers,datetime,firstname,lastname,email,number }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesTransfer>();

  const [accepted, setAccepted] = useState(false);
   const t = useTranslations("TransfersPage");
  const router = useRouter();
  useEffect(() => {
    reset({
      passaengers: [
        ...Array(2).fill({ first_name: "", last_name: "" }),
        ...Array(2).fill({
          first_name: "",
          last_name: "",
          is_child: true,
          age: 0,
        }),
      ],
    });
  }, []);

  const onSubmit = async (data: FormValuesTransfer) => {
    console.log(data);
    router.push(`/checkoutpayment`);

  };

  return (
    <Card className="my-3 shadow">
      <CardHeader>
        <h1 className="flex items-center gap-2  text-xl">
        {t("item2.title")}
        </h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-3">
            <div className="">
              <p className=" text-medium">{t("item2.subtitle")}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                <div className="space-y-2">
                  <label className="text-small">{t("item2.item2")}</label>
                  <Input
                    {...register("mainpassenger.first_name", {
                      required: "El campo de nombre es requerido",
                    })}
                    placeholder="Ingrese nombre"
                    value={firstname}
                    isInvalid={!!errors.mainpassenger?.first_name}
                    errorMessage={errors.mainpassenger?.first_name?.message}
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-small">{t("item2.item3")}</label>
                  <Input
                    {...register("mainpassenger.last_name", {
                      required: "El campo de apellido es requerido",
                    })}
                    type="text"
                    value={lastname}
                    placeholder="Ingrese apellido"
                    isInvalid={!!errors.mainpassenger?.last_name}
                    errorMessage={errors.mainpassenger?.last_name?.message}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                <div className="space-y-2">
                  <label className="text-small">Email</label>

                  <Input
                    {...register("mainpassenger.email", {
                      required: "El campo de Correo es requerido",
                    })}
                    type="email"
                    value={email}
                    placeholder="Ingrese Correo"
                    isInvalid={!!errors.mainpassenger?.email}
                    errorMessage={errors.mainpassenger?.email?.message}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-small">{t("item2.item4")}</label>
                  <Input
                    {...register("mainpassenger.phone", {
                      required: "El campo de Numero es requerido",
                    })}
                    type="text"
                    value={number}
                    placeholder="Ingrese numero"
                    isInvalid={!!errors.mainpassenger?.phone}
                    errorMessage={errors.mainpassenger?.phone?.message}
                  />
                </div>
              </div>
            </div>
            <div className="mt-2 ml-5">
              <p className="mt-2 text-medium">{t("item2.item5")}</p>
              {Array.from({ length: passengers.adults }).map(
                (_, adultIndex) => (
                  <div key={`adult-${adultIndex}`} className="mt-5">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t("item2.adult")} {adultIndex + 1}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="space-y-2">
                        <label className="text-small">{t("item2.item2")} </label>

                        <Input
                          {...register(
                            `passaengers.${adultIndex}.first_name` as const,
                            {
                              required: "El campo de Nombre es requerido",
                            }
                          )}
                          isInvalid={
                            !!errors.passaengers?.[adultIndex]?.first_name
                          }
                          errorMessage={
                            errors.passaengers?.[adultIndex]?.first_name
                              ?.message
                          }
                         
                          type="text"
                          placeholder={t("item2.placeholder")}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-small">{t("item2.item3")}</label>
                        <Input
                          {...register(
                            `passaengers.${adultIndex}.last_name` as const,
                            {
                              required: "El campo de Apellido es requerido",
                            }
                          )}
                          isInvalid={
                            !!errors.passaengers?.[adultIndex]?.last_name
                          }
                          errorMessage={
                            errors.passaengers?.[adultIndex]?.last_name?.message
                          }
                          type="text"
                          placeholder={t("item2.placeholder1")}
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
              {passengers.children > 0 && (
                <>
                  <p className=" mt-2 text-medium">{t("item2.item6")}</p>

                  {Array.from({ length: passengers.children }).map(
                    (_, childIndex) => (
                      <div key={`child--${childIndex}`} className="mt-3">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                        {t("item2.children")} {childIndex + 1}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div className="space-y-2">
                            <label className="text-small">{t("item2.item2")} </label>

                            <Input
                              {...register(
                                `passaengers.${childIndex}.first_name` as const,
                                {
                                  required: "El campo de Nombre es requerido",
                                }
                              )}
                              isInvalid={
                                !!errors.passaengers?.[childIndex]?.first_name
                              }
                              errorMessage={
                                errors.passaengers?.[childIndex]?.first_name
                                  ?.message
                              }
                              type="text"
                              placeholder={t("item2.placeholder")}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-small">{t("item2.item3")} </label>

                            <Input
                              {...register(
                                `passaengers.${childIndex}.last_name` as const,
                                {
                                  required: "El campo de Apellido es requerido",
                                }
                              )}
                              isInvalid={
                                !!errors.passaengers?.[childIndex]?.last_name
                              }
                              errorMessage={
                                errors.passaengers?.[childIndex]?.last_name
                                  ?.message
                              }
                              type="text"
                              placeholder={t("item2.placeholder1")}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-small">{t("item2.item7")}</label>
                            <Input
                              {...register(
                                `passaengers.${childIndex}.age` as const,
                                {
                                  required: "El campo de Edad es requerido",
                                  min: {
                                    value: 0,
                                    message: "La edad no puede ser negativa",
                                  },
                                  max: {
                                    value: 18,
                                    message: "La edad no puede ser mayor a 0",
                                  },
                                }
                              )}
                              isInvalid={
                                !!errors.passaengers?.[childIndex]?.age
                              }
                              errorMessage={
                                errors.passaengers?.[childIndex]?.age?.message
                              }
                              type="number"
                              placeholder="Ingrese edad"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </>
              )}
            </div>
            <div className=" w-full mt-3">
              <Contenttransport date={datetime} register={register} errors={errors} />
              <div className="space-y-6 p-4 mt-3">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium">{t("item2.item11")}</h2>
                    <span className="text-sm text-blue-600">({t("item2.item12")})</span>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="terms"
                      checked={accepted}
                      onValueChange={setAccepted}
                    />
                    <label htmlFor="terms" className="text-sm leading-relaxed">
                    {t("item2.item13")}
                      <a
                       
                        className="text-blue-600 hover:underline"
                      >
                        {t("item2.item14")}
                      </a>
                      ,{" "}
                      <a
                       
                        className="text-blue-600 hover:underline"
                      >
                        {t("item2.item15")}
                      </a>
                      , {t("item2.item16")}
                    </label>
                  </div>
                </div>

                <Button
                  className="w-full bg-black text-white dark:bg-white dark:text-black"
                  type="submit"
                  isDisabled={!accepted}
                >
                 {t("item2.button")}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
