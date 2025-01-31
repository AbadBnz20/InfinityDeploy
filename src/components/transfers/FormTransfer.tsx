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
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  email:string,
  phono:string
}

export const FormTransfer = ({ passengers,datetime,firstname,lastname,email,phono }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesTransfer>();

  const [accepted, setAccepted] = useState(false);
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
          Detalles de Pasajeros
        </h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-3">
            <div className="">
              <p className=" text-medium">Contacto Principal</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                <div className="space-y-2">
                  <label className="text-small">Nombre</label>
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
                  <label className="text-small">Apellido</label>
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
                  <label className="text-small">Correo</label>

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
                  <label className="text-small">Numero</label>
                  <Input
                    {...register("mainpassenger.phone", {
                      required: "El campo de Numero es requerido",
                    })}
                    type="text"
                    value={phono}
                    placeholder="Ingrese numero"
                    isInvalid={!!errors.mainpassenger?.phone}
                    errorMessage={errors.mainpassenger?.phone?.message}
                  />
                </div>
              </div>
            </div>
            <div className="mt-2 ml-5">
              <p className="mt-2 text-medium">Pasajeros Adultos</p>
              {Array.from({ length: passengers.adults }).map(
                (_, adultIndex) => (
                  <div key={`adult-${adultIndex}`} className="mt-5">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Adulto {adultIndex + 1}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="space-y-2">
                        <label className="text-small">Nombre </label>

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
                          placeholder="Ingrese nombre"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-small">Apellido</label>
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
                          placeholder="Ingrese apellido"
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
              {passengers.children > 0 && (
                <>
                  <p className=" mt-2 text-medium">Pasajeros niños</p>

                  {Array.from({ length: passengers.children }).map(
                    (_, childIndex) => (
                      <div key={`child--${childIndex}`} className="mt-3">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Niño {childIndex + 1}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div className="space-y-2">
                            <label className="text-small">Nombre </label>

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
                              placeholder="Ingrese nombre"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-small">Apellido</label>

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
                              placeholder="Ingrese apellido"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-small">Edad</label>
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
                    <h2 className="text-lg font-medium">Condiciones de Uso</h2>
                    <span className="text-sm text-blue-600">(Obligatorio)</span>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="terms"
                      checked={accepted}
                      onValueChange={setAccepted}
                    />
                    <label htmlFor="terms" className="text-sm leading-relaxed">
                      Al continuar acepto las{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-600 hover:underline"
                      >
                        condiciones de privacidad
                      </Link>
                      ,{" "}
                      <Link
                        href="/visa"
                        className="text-blue-600 hover:underline"
                      >
                        condiciones de visa
                      </Link>
                      , condiciones de uso, las observaciones y las políticas de
                      cancelación.
                    </label>
                  </div>
                </div>

                <Button
                  className="w-full bg-black text-white dark:bg-white dark:text-black"
                  type="submit"
                  isDisabled={!accepted}
                >
                  Continuar
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
