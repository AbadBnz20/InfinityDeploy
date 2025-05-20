"use client";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { ModalChange } from "../ui/modal/ModalChange";
import {
  ChangeEmail,
  ChangeNumber,
  VerifyEmail,
  VerifyNumber,
} from "@/actions/auth/UpdateUser";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { SelectCodeProfile } from "../ui/select/SelectCodeProfile";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Contries } from "@/data/countries";
export interface FormDataProfile {
  firstName: string;
  LastName: string;
  Email: string;
  code: string;
  number: string;
}

interface Props {
  firstname: string;
  lastname: string;
  email: string;
  number: string;
  country: string;
}

export const FormProfile = ({ firstname, lastname, number, email }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormDataProfile>();
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [numberOrigina, setNumberOrigina] = useState("");
  const [loading, setloading] = useState(false);
  const emailValue = `${watch("Email")}`;
  const numberValue = `${watch("number")}`;

  useEffect(() => {
    onChangeInputs();
  }, []);

  const onChangeInputs = async () => {
    setValue("Email", email);
    setValue("firstName", firstname);
    setValue("LastName", lastname);

    const phoneNumber = parsePhoneNumberFromString(`+${number}`);
    setNumberOrigina(phoneNumber?.nationalNumber || "");
    const code = Contries.find(
      (x) => x.code === `+${phoneNumber?.countryCallingCode}`
    );
    console.log(code);
    if (code) {
      setValue("code", code?.key);
    }
    setValue("number", phoneNumber?.nationalNumber || "");
  };

  const Onchange = async (data: FormDataProfile) => {
    console.log(data);
    setloading(true);
    try {
      if (data.Email.trim() !== email.trim()) {
        const resp = await ChangeEmail(data.Email.trim());
        if (!resp.status) {
          return toast.error(resp.message, {
            position: "top-right",
          });
        }
        toast.success(resp.message, {
          position: "top-right",
        });
        onOpen();
      }
      if (data.number.trim() !== number.trim()) {
        const code = Contries.find((x) => x.key === data.code);

        const codeNumber = code?.code.split("+")[1];
        const resp = await ChangeNumber(`${codeNumber}${data.number.trim()}`);
        if (!resp.status) {
          return toast.error(resp.message, {
            position: "top-right",
          });
        }
        toast.success(resp.message, {
          position: "top-right",
        });
        onOpen();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al cambiar", {
        position: "top-right",
      });
    }
    setloading(false);
  };

  return (
    <div className="">
      <h3 className="text-lg font-semibold">Informacion Personal</h3>
      <form onSubmit={handleSubmit(Onchange)}>
        <div className="my-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium" htmlFor="firstName">
              Nombre
            </label>
            <Input
              id="firstName"
              {...register("firstName")}
              disabled
              value={watch("firstName")}
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="lastName">
              Apellido
            </label>
            <Input
              id="lastName"
              {...register("LastName")}
              disabled
              value={watch("LastName")}
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <Input
              disabled={watch("number") !== numberOrigina}
              {...register("Email")}
              value={watch("Email")}
              id="email"
              type="email"
            />
          </div>
          <div className="grid grid-cols-3 ">
            <div className="col-span-1">
              <label className="text-sm font-medium" htmlFor="firstName">
                Codigo
              </label>
              <SelectCodeProfile
                register={register}
                watch={watch}
                errors={errors}
                control={control}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium" htmlFor="firstName">
                Celular
              </label>
              <Input
                classNames={{
                  inputWrapper: "rounded-none  rounded-br-md rounded-tr-md",
                }}
                disabled={watch("Email") !== email}
                value={watch("number")}
                {...register("number")}
                id="email"
                type="text"
              />
            </div>
          </div>
        </div>
        <Button isLoading={loading} type="submit">
          Guardar Cambios
        </Button>
      </form>

      {watch("number") !== number && (
        <ModalChange
          onClose={onClose}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          identifier={numberValue}
          functionvalidate={VerifyNumber}
        />
      )}

      {watch("Email") !== email && (
        <ModalChange
          onClose={onClose}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          identifier={emailValue}
          functionvalidate={VerifyEmail}
        />
      )}
    </div>
  );
};
