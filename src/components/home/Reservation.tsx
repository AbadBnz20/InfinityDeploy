"use client";
import {
  Button,
  DateRangePicker,
  DateValue,
  RangeValue,
} from "@nextui-org/react";
import { SelectDestination } from "../ui/select/SelectDestination";
import { SubmitHandler, useForm } from "react-hook-form";
import { Destination } from "@/interfaces/Destination";
import { useEffect, useState } from "react";
import { SelectGuest } from "../ui/select/SelectGuest";
import { DestinationStore } from "@/store/DestinationStore";
import { useRouter } from "next/navigation";
import { getLocalTimeZone, today } from "@internationalized/date";


export const Reservation = () => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
  } = useForm<Destination>();
  const [date, setdate] = useState<RangeValue<DateValue>>({
    start: today(getLocalTimeZone()).add({ days: 1 }),
    end: today(getLocalTimeZone()).add({ days: 2 }),
  });
  const [validate, setValidate] = useState(true);
  const { setDestinationData } = DestinationStore();
  const router = useRouter();
  useEffect(() => {
    setValue(
      "checkin",
      `${date?.start.year}-${date?.start.month}-${date?.start.day}`
    );
    setValue(
      "checkout",
      `${date?.end.year}-${date?.end.month}-${date?.end.day}`
    );
  }, [date]);
  const watchFields = watch("id");

  useEffect(() => {
    if (watchFields) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }, [watchFields]);

  const onsubmit: SubmitHandler<Destination> = (data) => {
    setDestinationData(data.id, data.checkin, data.checkout, data.guest);
    router.push(`/hotels`);
  };

  return (
    <section className="container mx-auto -mt-[115px] relative z-10">
      <div className="bg-maincolor shadow-xl rounded-lg ">
        <div className="p-6">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="grid grid-cols-1 md:grid-cols-5 items-center gap-2"
          >
            <div className="col-span-2">
              <SelectDestination register={register} setValue={setValue} />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="rooms"
                className="block text-sm font-medium "
              >
                Check-in Check-out
              </label>
              <DateRangePicker
                value={date}
                onChange={setdate}
                minValue={today(getLocalTimeZone())}
                className="text-blue-600"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="rooms"
                className="block text-sm font-medium "
              >
                Seleccionar
              </label>
              <SelectGuest setValue={setValue} />
            </div>

            <div className="mt-6">
              <Button
                isDisabled={validate}
                type="submit"
              
                className="w-[200px]"
              >
                Buscar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
