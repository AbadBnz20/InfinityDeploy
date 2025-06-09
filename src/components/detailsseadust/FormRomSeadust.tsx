import {  GetRoomArray, InterRoomSeadust } from "@/actions/seadust/seadust";
import { SeadustStore } from "@/store/SeadustStore";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ModalConfirm } from "../ui/modal/ModalConfirm";
import { getLanguageFromCookie } from "@/actions/lenguaje/lenguaje";
import { GetNumberContract } from "@/actions/mytrip/RegisterTrip";

export interface Props {
  firstname: string;
  lastname: string;
  email: string | undefined;
  number: string;
}

interface FormRoomValues {
  firstname: string;
  lastname: string;
  email: string;
  number: string;
  note: string;
}

export const FormRomSeadust = ({
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
  } = useForm<FormRoomValues>({
    defaultValues: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      number: number,
    },
  });

  const [loading, setloading] = useState(false);
  const t = useTranslations("TransfersPage");
  const tt = useTranslations("SeadustPage");

  const { guest, RoomSelected, checkin, checkout } = SeadustStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const adult = guest.reduce((acc, room) => {
    const adults = room.adults;
    return acc + adults;
  }, 0);

  const child = guest.reduce((acc, room) => {
    const children = room.children;
    return acc + children;
  }, 0);
  const infant = guest.reduce((acc, room) => {
    const children = room.infant;
    return acc + children;
  }, 0);

  const onSubmit = async (data: FormRoomValues) => {
    setloading(true);
    try {
      const { firstname, lastname, email, number, note } = data;
      const response = await InterRoomSeadust(
        checkin,
        checkout,
        firstname,
        lastname,
        email,
        number,
        RoomSelected,
        adult,
        child.toString(),
        note
      );
      console.log(response)
      if (response.status) {

        const [room,numberContract]= await Promise.all([GetRoomArray(RoomSelected),GetNumberContract()])
      
         const cookieLanguage = await getLanguageFromCookie();
        const res = await fetch("/api/seadust", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
             nrocontract: numberContract.data,
            start_date: checkin.split("T")[0],
            end_date: checkout.split("T")[0],
            firstName: firstname,
            lastName: lastname,
            email: email,
            phone: number,
            adult: adult,
            children: child.toString(),
            Rooms:room,
            language: cookieLanguage ? cookieLanguage : "es",
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
    <ModalConfirm   isOpen={isOpen} onOpenChange={onOpenChange}/>
      <Card className="my-3 shadow">
        <CardHeader>
          <h1 className="flex items-center gap-2  text-xl">{tt("subtitle1")}</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-3">
              <div className="">
                <p className=" text-medium">{t("item2.subtitle")}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                  <div className="space-y-2">
                    <label className="text-small">
                      {t("item2.item2")} <span className="text-red-500">*</span>
                    </label>
                    <Input
                    isDisabled
                      {...register("firstname", {
                        required: "El campo de nombre es requerido",
                      })}
                      placeholder="Ingrese nombre"
                      value={watch("firstname")}
                      isInvalid={!!errors.firstname}
                      errorMessage={errors.firstname?.message}
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-small">
                      {t("item2.item3")} <span className="text-red-500">*</span>
                    </label>
                    <Input
                    isDisabled
                      {...register("lastname", {
                        required: "El campo de apellido es requerido",
                      })}
                      type="text"
                      value={watch("lastname")}
                      placeholder="Ingrese apellido"
                      isInvalid={!!errors.lastname}
                      errorMessage={errors.lastname?.message}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                  <div className="space-y-2">
                    <label className="text-small">
                      Email <span className="text-red-500">*</span>
                    </label>

                    <Input
                      {...register("email", {
                        required: "El campo de Correo es requerido",
                      })}
                      type="email"
                      value={watch("email")}
                      placeholder="Ingrese Correo"
                      isInvalid={!!errors.email}
                      errorMessage={errors.email?.message}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-small">
                      {t("item2.item4")} <span className="text-red-500">*</span>
                    </label>
                    <Input
                    startContent={<span>+</span>}
                      {...register("number", {
                        required: "El campo de Numero es requerido",
                      })}
                      type="text"
                      value={watch("number")}
                      placeholder="Ingrese numero"
                      isInvalid={!!errors.number}
                      errorMessage={errors.number?.message}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Nota
                    </label>
                    <Textarea
                      placeholder={"Agregar Nota"}
                      {...register("note")}
                      isInvalid={!!errors.note}
                      errorMessage={errors.note?.message}
                    />
                  </div>
                </div>
              </div>
              <div className="my-5  space-y-2">
                <p className=" text-small">{tt("item")}:{adult}</p>
                <p className=" text-small">{tt("item1")}:{infant}</p>
                <p className=" text-small">{tt("item2")}:{child}</p>
              </div>
              <div className=" w-full mt-3">
                <div className="space-y-6 p-4 mt-3">
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
