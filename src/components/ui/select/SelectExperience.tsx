import { GetSelectExperience } from "@/actions/yachts/GetSelect";
import { Experience } from "@/interfaces/selectYatch-response";
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
export const SelectExperience = <T extends FieldValues>({ control,name,error }: Props<T>) => {
 
  const [data, setdata] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
    const t = useTranslations("Yachts");
  useEffect(() => {
    const GetCountry = async () => {
      setLoading(true);
      const resp = await GetSelectExperience();
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
      rules={{ required: "Seleccione tipo de Experiencia" }}
      render={({ field, fieldState }) => {
        return (
          <Select
            {...field}
            items={data}
            placeholder={t("item2.placeholder")}
            className="mt-3"
            defaultSelectedKeys={field.value ? new Set([field.value]) : new Set()}
            onSelectionChange={(keys) => field.onChange(Array.from(keys).pop())}
            isInvalid={fieldState.invalid}
            errorMessage={error?.message}
          >
            {(item) => (
              <SelectItem key={item.typeOfExperienceId}>{item.name}</SelectItem>
            )}
          </Select>
        );
      }}
    />
  );
};
