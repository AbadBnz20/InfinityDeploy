"use client";
import { DestinationStore } from "@/store/DestinationStore";
import { Button, Divider, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ReservationStore } from "@/store/ReservationStore";
import {
  OrderBookingForm,
  RegisterReservation,
  ReservationStrapi,
} from "@/actions/reservation/registerreservation";
import { formatDateToISO } from "@/actions/getDestination";
import { InformationRoom } from "../reservation/InformationRoom";
import { OrderBooking } from "@/interfaces/OrderBookingInterface";
import { CreateOrderBooking } from "@/actions/reservation/orderbooking";
import { RegisterPointsBySession } from "@/actions/points/RegisterPoints";
import { toast } from "react-toastify";

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

interface Props {
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  country: string;
  phone: string;
}

export const FormRoom = ({ firstname, lastname, phone, email }: Props) => {
  const { guest } = DestinationStore();
  const { checkin, checkout } = DestinationStore();
  const { destination, name, nameroom, price, subtotal, total, book_hash } =
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
  // const router = useRouter();
  // const { setPaymentData } = PaymentStore();
  useEffect(() => {
    if (guest && guest.length > 0) {
      reset({
        rooms: guest.map((room, index) => ({
          guests: [
            ...Array.from({ length: room.adults }, (_, adultIndex) => ({
              first_name: index === 0 && adultIndex === 0 ? firstname : "",
              last_name: index === 0 && adultIndex === 0 ? lastname : "",
            })),
            ...room.children.map(() => ({
              first_name: "",
              last_name: "",
              is_child: true,
              age: 0,
            })),
          ],
        })),
        supplier_data: {
          first_name_original: firstname,
          last_name_original: lastname,
          email: email,
          phone: phone,
        },
      });
    }
  }, [guest, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    // console.log(data);
    const obj: ReservationStrapi = {
      discount: 0,
      destination: destination,
      end_date: await formatDateToISO(checkout),
      start_date: await formatDateToISO(checkin),
      hotel_name: name,
      room_name: nameroom,
      number_adults: guest.reduce((sum, item) => sum + item.adults, 0),
      rooms_number: guest.length,
      number_children: guest.reduce(
        (sum, item) => sum + item.children.length,
        0
      ),
      price: subtotal,
      sub_total: subtotal,
      total: total,
    };
    const reservation = await RegisterReservation(obj);
    if (reservation) {
      const parther: Partner = {
        partner_order_id: reservation.rom_reservation_id!,
      };

      const resp = await OrderBookingForm(
        reservation.rom_reservation_id!,
        book_hash
      );

      if (resp?.data) {
        // setPaymentData(
        //   resp.data.item_id,
        //   data.rooms,
        //   data.supplier_data,
        //   parther
        // );

        const orderbooking: OrderBooking = {
          user: {
            email: "infinity@gmail.com",
            comment: "comment",
            phone: "+525585266251",
          },
          supplier_data: {
            first_name_original: data.supplier_data.first_name_original,
            last_name_original: data.supplier_data.last_name_original,
            phone: data.supplier_data.phone,
            email: data.supplier_data.email,
          },
          partner: {
            partner_order_id: parther.partner_order_id,
          },
          language: "es",
          rooms: data.rooms,
          payment_type: {
            type: "now",
            amount: price,
            currency_code: "USD",
          },
          return_path: "http://localhost:3000/success",
        };

        const booking = await CreateOrderBooking(orderbooking);
        console.log(booking);
        if (!booking.status) {
          toast.error(
            `Ha ocurrido un error a registrar la reserva: ${booking.message}`,
            {
              position: "top-right",
            }
          );
          setLoading(false);
          return;
        }

        await RegisterPointsBySession(Math.round(total));
        toast.success("Se ha registrado correctamente.", {
          position: "top-right",
        });
      }
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="col-span-3">
            <div className="mt-5">
              <p className="font-semibold">Socio</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                <Input
                  {...register("supplier_data.first_name_original", {
                    required: "El campo de nombre es requerido",
                  })}
                  label="Nombre"
                  defaultValue={firstname}
                  placeholder="Ingrese nombre"
                  type="text"
                />
                <Input
                  {...register("supplier_data.last_name_original", {
                    required: "El campo de apellido es requerido",
                  })}
                  label="Apellido"
                  defaultValue={lastname}
                  type="text"
                  placeholder="Ingrese apellido"
                  isInvalid={!!errors.supplier_data?.last_name_original}
                  errorMessage={
                    errors.supplier_data?.last_name_original?.message
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                <Input
                  {...register("supplier_data.email", {
                    required: "El campo de Correo es requerido",
                  })}
                  label="Correo"
                  type="email"
                  placeholder="Ingrese Correo"
                  defaultValue={email}
                  isInvalid={!!errors.supplier_data?.email}
                  errorMessage={errors.supplier_data?.email?.message}
                />
                <Input
                  {...register("supplier_data.phone", {
                    required: "El campo de Numero es requerido",
                  })}
                  label="Numero"
                  type="text"
                  defaultValue={phone}
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
                  <div
                    key={`adult-${roomIndex}-${adultIndex}`}
                    className="mt-5"
                  >
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
                          errors.rooms?.[roomIndex]?.guests?.[adultIndex]
                            ?.first_name?.message
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
                          !!errors.rooms?.[roomIndex]?.guests?.[adultIndex]
                            ?.last_name
                        }
                        errorMessage={
                          errors.rooms?.[roomIndex]?.guests?.[adultIndex]
                            ?.last_name?.message
                        }
                        label="Apellido"
                        type="text"
                        placeholder="Ingrese apellido"
                      />
                    </div>
                  </div>
                ))}
                {room.children.map((age: any, childIndex: any) => (
                  <div
                    key={`child-${roomIndex}-${childIndex}`}
                    className="mt-3"
                  >
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
          </div>
          <div className="col-span-2">
            <InformationRoom />
            <div className=" w-full">
              <Button
                className="w-full bg-black text-white dark:bg-white dark:text-black mt-1"
                type="submit"
                isLoading={loading}
              >
                Realizar Reserva
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

{
  /* <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
<div className=" flex flex-col">
  <label className="text-sm font-medium" htmlFor="firstName">
    Nombre
  </label>
  <input
    {...register("supplier_data.first_name_original", {
      required: "El campo de nombre es requerido",
    })}
    type="text"
    className="bg-[#f4f4f5] h-[40px] p-3 rounded-xl"
  />
</div>
<div className=" flex flex-col">
  <label className="text-sm font-medium" htmlFor="firstName">
    Apellido
  </label>
  <input
    {...register("supplier_data.last_name_original", {
      required: "El campo de apellido es requerido",
    })}
    type="text"
    className="bg-[#f4f4f5] h-[40px] p-3 rounded-xl"
  />
</div>
<div className=" flex flex-col">
  <label className="text-sm font-medium" htmlFor="firstName">
    Pais
  </label>
  <input
    defaultValue={data?.user.country}
    type="text"
    className="bg-[#f4f4f5] h-[40px] p-3 rounded-xl"
  />
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
<div className=" flex flex-col">
  <label className="text-sm font-medium" htmlFor="firstName">
    Correo
  </label>
  <input
    {...register("supplier_data.email", {
      required: "El campo de Correo es requerido",
    })}
    type="text"
    className="bg-[#f4f4f5] h-[40px] p-3 rounded-xl"
  />
</div>
<div className=" flex flex-col">
  <label className="text-sm font-medium" htmlFor="firstName">
    Numero
  </label>
  <input
    {...register("supplier_data.phone", {
      required: "El campo de Numero es requerido",
    })}
    type="text"
    className="bg-[#f4f4f5] h-[40px] p-3 rounded-xl"
  />
</div>
<div className=" flex flex-col">
  <label className="text-sm font-medium" htmlFor="firstName">
    Fecha nacimiento
  </label>
  <input
    defaultValue={data?.user.birthdate}
    type="text"
    className="bg-[#f4f4f5] h-[40px] p-3 rounded-xl"
  />
</div>
</div> */
}
