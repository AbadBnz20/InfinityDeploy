import React, {  useState } from "react";
import {
  Button,
  DatePicker,
  DateValue,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Controller, useForm } from "react-hook-form";
import { SelectEngine } from "../ui/select/SelectEngine";
import { SelectExperience } from "../ui/select/SelectExperience";
import { YachtsStore } from "@/store/YachtsStore";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useTranslations } from "next-intl";

export interface FormYacht {
  idLocation: string;
  idEngine: string;
  idExperience: string;

  passengers: string;
}

export const Ships = () => {
  const [date, setdate] = useState<DateValue | null>(today(getLocalTimeZone()));
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormYacht>();
  const {SetYahtsData} = YachtsStore();
  const router = useRouter();
  const posthog = usePostHog();
   const t = useTranslations("Yachts");
  // useEffect(() => {
  //   setValue('idEngine',"b1aa48c4-97ba-4293-af9d-0faacd9ac395")
  // }, []);

  const Onsubmit = (data: FormYacht) => {
    if (!date) {
      return;
    }
    const departureDate = date?.toDate(getLocalTimeZone());
    SetYahtsData(
      data.idEngine,
      data.idExperience,
      departureDate,
      data.passengers
    );
    router.push(`/yachts`);
    posthog.capture("$pageview", { $current_url: '/yachts' });

  };

  return (
    <form onSubmit={handleSubmit(Onsubmit)} className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        {/* <div className="space-y-2">
          <label htmlFor="rooms" className="block text-sm font-medium ">
          {t("item.title")}
          </label>
          <SelectDestinationShip control={control}  name="idLocation" error={errors.idLocation} />
        </div> */}
        <div className="space-y-2">
          <label htmlFor="rooms" className="block text-sm font-medium ">
          {t("item1.title")}
          </label>
          <SelectEngine control={control}  name="idEngine" error={errors.idEngine} />
        </div>
        <div className="w-full space-y-2 ">
            <label htmlFor="rooms" className="block text-sm font-medium ">
            {t("date")}
            </label>
            <DatePicker
              value={date}
              onChange={setdate}
              minValue={today(getLocalTimeZone())}
            />
          </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <div className="grid grid-cols-1 gap-2">
          
          <div className="space-y-2">
            <label htmlFor="rooms" className="block text-sm font-medium ">
            {t("item2.title")}
            </label>
            <SelectExperience
              control={control}
              name="idExperience" error={errors.idExperience}
            />
          </div>
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-2 items-end gap-2">
          <div className="space-y-2">
            <label htmlFor="rooms" className="block text-sm font-medium ">
            {t("item3.title")}
            </label>
            <Controller
              control={control}
              name="passengers"
              rules={{ required: "Seleccione cantidad de huéspedes" }}
              render={({ field, fieldState, formState }) => {
                return (
                  <Select
                    {...field}
                    placeholder= {t("item3.placeholder")}
                    isInvalid={fieldState.invalid}
                    errorMessage={formState.errors.passengers?.message}
                  >
                    <SelectItem key={"1-6"}>1-6 Huespedes</SelectItem>
                    <SelectItem key={"7-12"}>7-12 Huespedes</SelectItem>
                    <SelectItem key={"13-18"}>13-18 Huespedes</SelectItem>
                    <SelectItem key={"+19"}>+19 Huespedes</SelectItem>
                  </Select>
                );
              }}
            />
          </div>
          <div className="w-full ">
            <Button type="submit" className="w-full">
            {t("button")}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

// interface SelectProps {
//   label: string;
//   options: { value: string; label: string }[];
//   register: UseFormRegisterReturn;
// }

// const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, options, register }, ref) => {
//   return (
//     <div>
//       <label>{label}</label>
//       <select ref={ref} {...register}>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// });
