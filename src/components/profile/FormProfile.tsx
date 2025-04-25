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
import { useState } from "react";

interface FormData {
  firstName: string;
  LastName: string;
  Email: string;
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
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      firstName: firstname,
      LastName: lastname,
      Email: email,
      number: number,
    },
  });
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [loading, setloading] = useState(false);
  const emailValue = `${watch("Email")}`;
  const numberValue = `${watch("number")}`;

  const Onchange = async (data: FormData) => {
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
        const resp = await ChangeNumber(data.number.trim());
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
            <Input id="firstName" {...register("firstName")} disabled />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="lastName">
              Apellido
            </label>
            <Input id="lastName" {...register("LastName")} disabled />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <Input
              disabled={watch("number") !== number}
              {...register("Email")}
              id="email"
              type="email"
            />
          </div>
          <div className="grid ">
            <label className="text-sm font-medium" htmlFor="firstName">
              Celular
            </label>
            <Input
              disabled={watch("Email") !== email}
              startContent={<span>+</span>}
              {...register("number")}
              id="email"
              type="text"
            />
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
