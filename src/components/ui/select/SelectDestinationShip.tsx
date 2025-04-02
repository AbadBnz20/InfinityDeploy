import { GetOriginDestinationShip } from "@/actions/originDestination/OriginDestination";
import { OriginDestinationShip } from "@/interfaces/OriginDestination";
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
  status?:boolean
}

export const SelectDestinationShip = <T extends FieldValues>({ control,name,error,status=false }: Props<T>) => {
  const [Items, setItems] = useState<OriginDestinationShip[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadItems();
  }, []);
  const t = useTranslations("Yachts");
  const loadItems = async () => {
    setLoading(true);
    try {
      const resp = await GetOriginDestinationShip();
      setItems(resp);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="my-4">
        <Progress size="sm" isIndeterminate aria-label="Loading..." />
      </div>
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: "Seleccione ubicacion" }}
      render={({ field, fieldState }) => {
        return (
          <Select
            {...field}
            className="w-full"
            isDisabled={status}
            isInvalid={fieldState.invalid}
            errorMessage={error?.message}
            placeholder= {t("item.placeholder")}
            defaultSelectedKeys={
              field.value ? new Set([field.value]) : new Set()
            }
            onSelectionChange={(keys) => field.onChange(Array.from(keys).pop())}
          >
            <>
              {Items.map((item) => (
                <SelectItem key={item.origin_destination_ship_id}>
                  {item.name}
                </SelectItem>
              ))}
            </>
          </Select>
        );
      }}
    />
  );
};
