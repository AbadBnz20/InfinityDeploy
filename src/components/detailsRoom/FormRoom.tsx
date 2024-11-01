"use client";
import { DestinationStore } from "@/store/DestinationStore";
import { Button , Divider, Input } from "@nextui-org/react";
import { SelectCountry } from "./SelectCountry";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GetCountry } from "@/actions/Country/getCountry";
import { PaymentStore } from "@/store/PaymentStore";
import { ReservationStore } from "@/store/ReservationStore";
import {
  OrderBookingForm,
  RegisterReservation,
  ReservationStrapi,
} from "@/actions/reservation/registerreservation";
import { formatDateToISO } from "@/actions/getDestination";
import { useRouter } from "next/navigation";

export interface Guest {
  first_name: string;
  last_name: string;
  is_child?: boolean;
  age?: number;
}
interface User {
  first_name_original: string;
  last_name_original: string;
  phone: string;
  email: string;
}
interface Partner {
  partner_order_id: string;
}

export interface RoomGuest {
  guests: Guest[];
}

interface FormValues {
  rooms: RoomGuest[];
  supplier_data: User;
}

export const FormRoom: React.FC = () => {
  const { guest, checkin, checkout } = DestinationStore();
  const { destination, name, nameroom, subtotal, total, book_hash } =
    ReservationStore();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { rooms: [] },
  });
  const router = useRouter();
  const { setPaymentData } = PaymentStore();
  const [code, setcode] =  useState<string|null>(null);;
  useEffect(() => {
    if (guest && guest.length > 0) {
      reset({
        rooms: guest.map((room) => ({
          guests: [
            ...Array(room.adults).fill({ first_name: "", last_name: "" }),
            ...room.children.map(() => ({
              first_name: "",
              last_name: "",
              is_child: true,
              age: 0,
            })),
          ],
        })),
      });
    }
  }, [guest, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    if (!code) {
      return;
    }
    const resp = await GetCountry(code);
    data.supplier_data.phone = `${resp[0].idd.root}${resp[0].idd.suffixes}${data.supplier_data.phone}`;
    const obj: ReservationStrapi = {
      Descuento: 0,
      Destino: destination,
      Fecha_Final: await formatDateToISO(checkin),
      Fecha_Inicio: await formatDateToISO(checkout),
      hotel: name,
      nombre_habitacion: nameroom,
      Numero_Adultos: guest.reduce((sum, item) => sum + item.adults, 0),
      Numero_Habitaciones: guest.length,
      Numero_Ninos: guest.reduce((sum, item) => sum + item.children.length, 0),
      Precio: subtotal,
      Sub_Total: subtotal,
      Total: total,
    };
    const reservation = await RegisterReservation(obj);
    if (reservation) {
      const parther: Partner = {
        partner_order_id: reservation.data.documentId,
      };

      const resp = await OrderBookingForm(
        reservation.data.documentId,
        book_hash
      );

      if (resp?.data) {
        setPaymentData(
          resp.data.item_id,
          data.rooms,
          data.supplier_data,
          parther
        );

        router.push("/reservation");
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-5">
        <p className="font-semibold">Adulto Responsable</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
          <Input
            {...register("supplier_data.first_name_original", {
              required: "El campo de nombre es requerido",
            })}
            autoComplete="off"
            label="Nombre"
            type="text"
            placeholder="Ingrese nombre"
            isInvalid={!!errors.supplier_data?.first_name_original}
            errorMessage={errors.supplier_data?.first_name_original?.message}
          />
          <Input
            {...register("supplier_data.last_name_original", {
              required: "El campo de apellido es requerido",
            })}
            label="Apellido"
            type="text"
            placeholder="Ingrese apellido"
            isInvalid={!!errors.supplier_data?.last_name_original}
            errorMessage={errors.supplier_data?.last_name_original?.message}
          />
          <SelectCountry text={code} setText={setcode} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
          <Input
            {...register("supplier_data.email", {
              required: "El campo de Correo es requerido",
            })}
            label="Correo"
            type="email"
            placeholder="Ingrese Correo"
            isInvalid={!!errors.supplier_data?.email}
            errorMessage={errors.supplier_data?.email?.message}
          />
          <Input
            {...register("supplier_data.phone", {
              required: "El campo de Numero es requerido",
            })}
            label="Numero"
            type="number"
            placeholder="Ingrese numero"
            isInvalid={!!errors.supplier_data?.phone}
            errorMessage={errors.supplier_data?.phone?.message}
          />
        </div>
      </div>

      {guest.map((room, roomIndex) => (
        <div className="my-5" key={roomIndex}>
          <p className="font-semibold">Habitación {roomIndex + 1}</p>

          {/* Campos de Adultos */}
          {Array.from({ length: room.adults }).map((_, adultIndex) => (
            <div key={`adult-${roomIndex}-${adultIndex}`} className="mt-5">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Adulto {adultIndex + 1}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Input
                  {...register(
                    `rooms.${roomIndex}.guests.${adultIndex}.first_name` as const,
                    {
                      required: "El campo de Nombre es requerido",
                    }
                  )}
                  isInvalid={
                    !!errors.rooms?.[roomIndex]?.guests?.[adultIndex]
                      ?.first_name
                  }
                  errorMessage={
                    errors.rooms?.[roomIndex]?.guests?.[adultIndex]?.first_name
                      ?.message
                  }
                  label="Nombre"
                  type="text"
                  placeholder="Ingrese nombre"
                />
                <Input
                  {...register(
                    `rooms.${roomIndex}.guests.${adultIndex}.last_name` as const,
                    {
                      required: "El campo de Apellido es requerido",
                    }
                  )}
                  isInvalid={
                    !!errors.rooms?.[roomIndex]?.guests?.[adultIndex]?.last_name
                  }
                  errorMessage={
                    errors.rooms?.[roomIndex]?.guests?.[adultIndex]?.last_name
                      ?.message
                  }
                  label="Apellido"
                  type="text"
                  placeholder="Ingrese apellido"
                />
              </div>
            </div>
          ))}
          {room.children.map((age: any, childIndex: any) => (
            <div key={`child-${roomIndex}-${childIndex}`} className="mt-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Niño {childIndex + 1}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Input
                  {...register(
                    `rooms.${roomIndex}.guests.${
                      room.adults + childIndex
                    }.first_name` as const,
                    {
                      required: "El campo de Nombre es requerido",
                    }
                  )}
                  isInvalid={
                    !!errors.rooms?.[roomIndex]?.guests?.[
                      room.adults + childIndex
                    ]?.first_name
                  }
                  errorMessage={
                    errors.rooms?.[roomIndex]?.guests?.[
                      room.adults + childIndex
                    ]?.first_name?.message
                  }
                  label="Nombre"
                  type="text"
                  placeholder="Ingrese nombre"
                />
                <Input
                  {...register(
                    `rooms.${roomIndex}.guests.${
                      room.adults + childIndex
                    }.last_name` as const,
                    {
                      required: "El campo de Apellido es requerido",
                    }
                  )}
                  isInvalid={
                    !!errors.rooms?.[roomIndex]?.guests?.[
                      room.adults + childIndex
                    ]?.last_name
                  }
                  errorMessage={
                    errors.rooms?.[roomIndex]?.guests?.[
                      room.adults + childIndex
                    ]?.last_name?.message
                  }
                  label="Apellido"
                  type="text"
                  placeholder="Ingrese apellido"
                />
                <Input
                  {...register(
                    `rooms.${roomIndex}.guests.${
                      room.adults + childIndex
                    }.age` as const,
                    {
                      required: "El campo de Edad es requerido",
                      min: {
                        value: 0,
                        message: "La edad no puede ser negativa",
                      },
                      max: {
                        value: 18,
                        message: "La edad no puede ser mayor a 120",
                      },
                    }
                  )}
                  isInvalid={
                    !!errors.rooms?.[roomIndex]?.guests?.[
                      room.adults + childIndex
                    ]?.age
                  }
                  errorMessage={
                    errors.rooms?.[roomIndex]?.guests?.[
                      room.adults + childIndex
                    ]?.age?.message
                  }
                  label="Edad"
                  type="number"
                  placeholder="Ingrese edad"
                />
              </div>
            </div>
          ))}

          <Divider className="my-5" />
        </div>
      ))}
      <Button
        className="bg-black text-white dark:bg-white dark:text-black mt-2"
        type="submit"
        isLoading={loading}
      >
        Continuar
      </Button>
    </form>
  );
};
