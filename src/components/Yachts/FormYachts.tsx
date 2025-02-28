"use client";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  DateValue,
  Image,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import {
  IoCashOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { SelectDestinationShip } from "../ui/select/SelectDestinationShip";
import { Controller, useForm } from "react-hook-form";
import { SelectEngine } from "../ui/select/SelectEngine";
import { SelectExperience } from "../ui/select/SelectExperience";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { YachInterface } from "@/interfaces/Yach";
import { toast } from "react-toastify";
import { RegisterYacht } from "@/actions/yachts/RegisterYacht";
import { useRouter } from "next/navigation";

interface FormDateYachts {
  idLocation: string;
  idEngine: string;
  idExperience: string;
  date: Date;
  passengers: string;
  time: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  packageYachtId: string;
}

export const FormYachts = ({ user, yachts }: YachInterface) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormDateYachts>({
    defaultValues: {
      idLocation: yachts.idLocation,
      idEngine: yachts.idEngine,
      idExperience: yachts.idExperience,
      passengers: yachts.passengers,
      packageYachtId: yachts.yachtPackageId,
      time: yachts.time,
    },
  });
  const [loading, setloading] = useState(false);
  const [date, setdate] = useState<DateValue | null>(
    parseDate(yachts.date.split("T")[0])
  );
  const router = useRouter();

  const OnSubmit = async (data: FormDateYachts) => {
    if (!date) {
      return;
    }
    setloading(true);

    try {
      const departureDate = date?.toDate(getLocalTimeZone());

      const resp = await RegisterYacht({
        date: departureDate.toISOString().split("T")[0],
        time: data.time,
        passengers: data.passengers,
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        phone: data.phone,
        ubicationId: data.idLocation,
        typeOfExperienceId: data.idExperience,
        motorYachtId: data.idEngine,
        packageYachtId: data.packageYachtId,
      });
      if (!resp.status) {
        return toast.error(resp.message, {
          position: "top-right",
        });
      }
      toast.success(resp.message, {
        position: "top-right",
      });

      setTimeout(() => {
        router.push(`/`);
      }, 2000);
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
      <form onSubmit={handleSubmit(OnSubmit)}>
        <Card className="my-3 shadow">
          <CardHeader>
            <h1 className="flex items-center gap-2  text-xl">
              <IoLocationOutline size={24} />
              Solicitud de yates
            </h1>
          </CardHeader>
          <CardBody>
            <div className="grid  grid-cols-1 md:grid-cols-3">
              {yachts.image && (
                <div>
                  <Image
                    alt="HeroUI Album Cover"
                  
                    src={yachts.image}
                    width={340}
                  />
                </div>
              )}
              <div className="col-span-2  grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
                <div className="space-y-2">
                  <label htmlFor="rooms" className="block text-sm font-medium ">
                    Puerto de salida
                  </label>
                  <SelectDestinationShip
                    status={!!yachts.yachtPackageId}
                    control={control}
                    name="idLocation"
                    error={errors.idLocation}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="rooms" className="block text-sm font-medium ">
                    Motor del Yate
                  </label>
                  <SelectEngine
                    control={control}
                    name="idEngine"
                    error={errors.idEngine}
                  />
                </div>
                <div className="w-full space-y-2 ">
                  <label htmlFor="rooms" className="block text-sm font-medium ">
                    Fecha
                  </label>
                  <DatePicker
                    value={date}
                    onChange={setdate}
                    minValue={today(getLocalTimeZone())}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="rooms" className="block text-sm font-medium ">
                    Tipo de experiencia
                  </label>
                  <SelectExperience
                    control={control}
                    name="idExperience"
                    error={errors.idExperience}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="rooms" className="block text-sm font-medium ">
                    Tiempo
                  </label>

                  <Controller
                    control={control}
                    name="time"
                    rules={{ required: "Seleccione el tiempo" }}
                    render={({ field, fieldState, formState }) => {
                      return (
                        <Select
                          {...field}
                          placeholder="Seleccione Tipo"
                          defaultSelectedKeys={
                            field.value ? new Set([field.value]) : new Set()
                          }
                          isInvalid={fieldState.invalid}
                          errorMessage={formState.errors.time?.message}
                        >
                          <>
                            {yachts.time && (
                              <SelectItem key={yachts.time}>
                                {yachts.time}
                              </SelectItem>
                            )}
                          </>
                          <SelectItem key={"7Am - 11AM"}>7AM - 11AM</SelectItem>
                          <SelectItem key={"7AM - 1PM"}>7AM - 1PM</SelectItem>
                          <SelectItem key={"9AM - 1PM"}>9AM - 1PM </SelectItem>
                          <SelectItem key={"9AM - 5PM"}>9AM - 5PM</SelectItem>
                          <SelectItem key={"11:30AM - 5:30PM"}>
                            11:30AM - 5:30PM
                          </SelectItem>
                          <SelectItem key={"1:30PM - 5:30PM"}>
                            1:30PM - 5:30PM
                          </SelectItem>
                          <SelectItem key={"1:30PM - 7:30PM"}>
                            1:30PM - 7:30PM
                          </SelectItem>
                          <SelectItem key={"6PM - 8PM"}>6PM - 8PM</SelectItem>
                        </Select>
                      );
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
              <Alert variant="bordered" icon={<IoPeopleOutline />}>
                {" "}
                <div>
                  <span className="font-semibold"> Pasajeros:</span>{" "}
                  <span>{yachts.passengers} </span>
                </div>{" "}
              </Alert>
              {yachts.price && (
                <Alert variant="bordered" icon={<IoCashOutline />}>
                  <div>
                    <span className="font-semibold"> Precio:</span>
                    <span> {yachts.price} MXN</span>
                  </div>
                </Alert>
              )}
            </div>
            <div className="my-2 ml-5">
              {yachts.points && (
                <em className="text-small">
                  Total de Puntos Obtenga {yachts.points} Club Points{" "}
                </em>
              )}
            </div>
          </CardBody>
        </Card>
        <Card className="my-3 shadow">
          <CardHeader>
            <h1 className="flex items-center gap-2  text-xl">
              <IoPersonOutline size={24} />
              Informacion De usuario
            </h1>
          </CardHeader>
          <CardBody className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <label htmlFor="rooms" className="block text-sm font-medium ">
                  Nombre
                </label>
                <Input
                  {...register("firstname", {
                    required: "El campo es requerido",
                  })}
                  isInvalid={!!errors.firstname}
                  errorMessage={errors.firstname?.message}
                  value={user.firstname}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="rooms" className="block text-sm font-medium ">
                  Apellido
                </label>
                <Input
                  {...register("lastname", {
                    required: "El campo es requerido",
                  })}
                  isInvalid={!!errors.lastname}
                  errorMessage={errors.lastname?.message}
                  value={user.lastname}
                />
              </div>
              <div className="w-full space-y-2 ">
                <label htmlFor="rooms" className="block text-sm font-medium ">
                  Email
                </label>
                <Input
                  type="email"
                  {...register("email", {
                    required: "El campo es requerido",
                  })}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                  value={user.email}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="rooms" className="block text-sm font-medium ">
                  Telefono
                </label>
                <Input
                  type="number"
                  {...register("phone", {
                    required: "El campo es requerido",
                  })}
                  isInvalid={!!errors.phone}
                  errorMessage={errors.phone?.message}
                  value={`${user.number}`}
                />
              </div>
              <div className="col-span-full mt-3">
                <Button
                  fullWidth
                  isLoading={loading}
                  type="submit"
                  className="bg-black text-white dark:bg-white dark:text-black"
                >
                  Enviar solicitud
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </form>
    </div>
  );
};
