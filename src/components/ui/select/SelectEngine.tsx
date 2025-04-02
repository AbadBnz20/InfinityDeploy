import { GetSelectEngine } from "@/actions/yachts/GetSelect";
import { motorYacht } from "@/interfaces/selectYatch-response";
import { Progress, Select, SelectItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
interface Props<T extends FieldValues> {
  control: Control<T, any>;
  name: Path<T>;
  error?: FieldError;
}
export const SelectEngine = <T extends FieldValues>({ control,name,error }: Props<T>) => {

  const [data, setdata] = useState<motorYacht[]>([]);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Yachts");
  useEffect(() => {
    const GetCountry = async () => {
      setLoading(true);
      const resp = await GetSelectEngine();
      setdata(resp);
      setLoading(false);
    };

    GetCountry();
  }, []);
  if (loading) {
    return (
      <div className="my-4">
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="max-w-md"
        />
      </div>
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: "El Tipo de motor es requerido" }}
      render={({ field, fieldState }) => {
        return (
          <Select
          {...field}
          items={data}
          placeholder={t("item1.placeholder")}
          className="mt-3"
          isInvalid={fieldState.invalid}
          errorMessage={error?.message}
          defaultSelectedKeys={field.value ? new Set([field.value]) : new Set()}
          onSelectionChange={(keys) => field.onChange(Array.from(keys).pop())}
          >
            {(item) => (
              <SelectItem key={item.motorYachtId}>{item.name}</SelectItem>
            )}
          </Select>
        );
      }}
    />
  );
};
