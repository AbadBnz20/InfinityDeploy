"use client";
import {
  RegisterTokenizerCard,
  TokenizerCard,
} from "@/actions/reservation/payment";
import { PaymentStore } from "@/store/PaymentStore";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IoBagCheckOutline, IoCardOutline } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
interface Card {
  number: string;
  firtsname: string;
  lastname: string;
  expiration: string;
  cvc: string;
}

export const Information = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<Card>();
  const [loading, setLoading] = useState(false);
  const { item_id } = PaymentStore();
  const OnSubmitget: SubmitHandler<Card> = async (data) => {
    setLoading(true);
    const myUuid = uuidv4();
    const myUuid2 = uuidv4();
    const date = data.expiration.split("/");
    const card: TokenizerCard = {
      object_id: item_id.toString(),
      pay_uuid: myUuid,
      init_uuid: myUuid2,
      user_last_name: data.lastname,
      cvc: data.cvc,
      is_cvc_required: true,
      credit_card_data_core: {
        year: date[1],
        card_number: data.number,
        card_holder: "TEST",
        month: date[0],
      },
      user_first_name: data.firtsname,
    };



    const resp = await RegisterTokenizerCard(card);
    console.log(resp);
    setLoading(false);

  };

  const formatExpirationDate = (value: any) => {
    const input = value.replace(/\D/g, "");
    if (input.length >= 3) {
      return input.slice(0, 2) + "/" + input.slice(2, 4);
    }
    return input;
  };

  return (
    <div className="md:col-span-2 space-y-6">
      <div>
        <div>
          <div>
            <span className="bg-blue-900 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
              1
            </span>
            Metodo de pago
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <label htmlFor="credit" className="flex items-center mt-2">
              <span className="mr-2 ">Credito / Debito</span>
              <IoCardOutline className="h-6 w-6 text-blue-900" />
            </label>
          </div>
          <form onSubmit={handleSubmit(OnSubmitget)} className="mt-4 space-y-4">
            <div>
              <Input
                {...register("number", {
                  required: "El campo de Numero de tarjeta es requerido",
                })}
                size="sm"
                label="Numero de tarjeta"
                placeholder="xxxx xxxx xxxx xxxx"
                isInvalid={!!errors.number}
                errorMessage={errors.number?.message}
              />
            </div>
            <div>
              <Input
                {...register("firtsname", {
                  required: "El campo de nombre es requerido",
                })}
                size="sm"
                label="Nombre"
                placeholder="Ingresa nombre"
                isInvalid={!!errors.firtsname}
                errorMessage={errors.firtsname?.message}
              />
              <Input
                {...register("lastname", {
                  required: "El campo de Apellido es requerido",
                })}
                className="mt-3"
                size="sm"
                label="Apellido"
                placeholder="Ingresa Apellido"
                isInvalid={!!errors.lastname}
                errorMessage={errors.lastname?.message}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Controller
                  name="expiration"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^\d{2}\/\d{2}$/,
                      message: "Formato inválido, usa MM/YY",
                    },
                  }}
                  render={({
                    field: { onChange, value },
                  
                  }) => (
                    <Input
                      id="expirationDate"
                      size="sm"
                      label="Expiration date"
                      placeholder="MM/YY"
                      value={value}
                      maxLength={5}
                      onChange={(e) =>
                        onChange(formatExpirationDate(e.target.value))
                      }
                      isInvalid={!!errors.expiration}
                      errorMessage={errors.expiration?.message}
                    />
                  )}
                />
                {/* <Input
                  size="sm"
                  label="Fecha de expiracion"
                  placeholder="MM/YY"
                /> */}
              </div>
              <div>
                <Input
                  {...register("cvc", {
                    required: "El campo de CVC es requerido",
                  })}
                  type="password"
                  size="sm"
                  label="CVV / CVC"
                  placeholder="***"
                  isInvalid={!!errors.cvc}
                  errorMessage={errors.cvc?.message}
                />
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <IoBagCheckOutline className="h-4 w-4 mr-1" />
              Su transacción está segura con encriptación SSL
            </div>
            <Button
            isLoading={loading}
              className="bg-black text-white dark:bg-white dark:text-black mt-2  w-[200px]"
              type="submit"
            >
              Pagar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
