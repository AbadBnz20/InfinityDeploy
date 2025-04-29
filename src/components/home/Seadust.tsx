import { getLocalTimeZone, today } from "@internationalized/date";
import {
  Button,
  DateRangePicker,
  DateValue,
  RangeValue,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useForm, UseFormSetValue } from "react-hook-form";
import { useTranslations } from "next-intl";
import { SelectGuestSeadust } from "../ui/select/SelectGuestSeadust";
import { SeadustStore } from "@/store/SeadustStore";
import { useRouter } from "next/navigation";

export interface DestinationSeadust {
  id: number;
  checkin: string;
  checkout: string;
  guest: Array<any>;
}

export const Seadust = () => {
  const router = useRouter();
  const { setValue, handleSubmit } = useForm<DestinationSeadust>();
  const [date, setdate] = useState<RangeValue<DateValue> | null>({
    start: today(getLocalTimeZone()).add({ days: 1 }),
    end: today(getLocalTimeZone()).add({ days: 2 }),
  });
  const t = useTranslations("Filter");

  const { setDestination,guest } = SeadustStore();

  const onsubmit = (data: DestinationSeadust) => {
    const start = date?.start?.toDate(getLocalTimeZone());
    const end = date?.end?.toDate(getLocalTimeZone());
    if (start && end) {
      setDestination(
        data.id,
        start.toISOString(),
        end.toISOString(),
        data.guest
      );
      router.push(`/seadust`);
    }
  };

  return (
    <div className="p-2">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="grid grid-cols-1 md:grid-cols-5 items-center gap-2"
      >
        <div className="col-span-2">
          <SelectDestinationSeadust setValue={setValue} />
        </div>
        <div className=" col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-2">
            <label htmlFor="rooms" className="block text-sm font-medium ">
              Check-in Check-out (mm/dd/aaa)
            </label>
            <DateRangePicker
              value={date}
              onChange={setdate}
              minValue={today(getLocalTimeZone())}
              className="text-blue-600"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="rooms" className="block text-sm font-medium ">
              {t("room.title")}
            </label>
            <SelectGuestSeadust value={guest} setValue={setValue} />
          </div>
          <div className="mt-6">
            <Button type="submit" className="w-full">
              {t("button")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

interface Props {
  setValue: UseFormSetValue<DestinationSeadust>;
}

export const SelectDestinationSeadust = ({ setValue }: Props) => {
  const t = useTranslations("Filter");

  const onSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setValue("id", Number(e.target.value));
    }
  };
  return (
    <>
      <label htmlFor="rooms" className="block text-sm font-medium ">
        {t("seach.title")}
      </label>
      <Select
        defaultSelectedKeys={["1"]}
        onChange={onSelectionChange}
        placeholder={t("seach.placeholder")}
        className="mt-3"
      >
        <SelectItem key={"1"}>Seadust</SelectItem>
      </Select>
    </>
  );
};
