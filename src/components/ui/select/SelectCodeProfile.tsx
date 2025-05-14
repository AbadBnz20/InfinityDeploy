import { FormDataProfile } from "@/components/profile/FormProfile";
import { Contries } from "@/data/countries";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Progress,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

interface CountryCodes {
  image: string;
  code: string;
  key: string;
}

interface Props {
  register: UseFormRegister<FormDataProfile>;
  errors: FieldErrors<FormDataProfile>;
  watch: UseFormWatch<FormDataProfile>;
  control: Control<FormDataProfile>;
}

export const SelectCodeProfile = ({
  watch,
  errors,
  control,
}: Props) => {
  const t = useTranslations("Auth");

  const value = watch("code");
  const [data, setdata] = useState<CountryCodes[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const GetCountry = async () => {
      setLoading(true);
      setTimeout(() => {
        setdata(Contries);
        setLoading(false);
      }, 1000);
    };

    GetCountry();
  }, [value]);

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
      name="code"
      control={control}
      rules={{ required: "El Código es requerido" }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          items={data}
          className="w-full"
          inputProps={{
            classNames: {
              input: "rounded-none rounded-bl-md rounded-br-md",
              inputWrapper: "rounded-none rounded-bl-md rounded-tl-md",
            },
          }}
          placeholder={t("loginPhone.placeholder1")}
          selectedKey={field.value}
          onSelectionChange={(key) => {
            field.onChange(key)
            // console.log(key)
          }}
          isInvalid={!!errors.code}
          errorMessage={errors.code?.message}
        >
         
          {(item) => (
            <AutocompleteItem
              key={item.key}
            
              startContent={
                <Avatar alt={item.code} className="w-6 h-6" src={item.image} />
              }
            >
              {item.code}
            </AutocompleteItem>
          )}
        </Autocomplete>
      )}
    />
  );
};

{
  /* <Controller
      name="code"
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          items={data}
          className="w-full"
          inputProps={{
            classNames: {
              input: "rounded-none rounded-bl-md rounded-br-md",
              inputWrapper: "rounded-none rounded-bl-md rounded-tl-md",
            },
          }}
          placeholder={t("loginPhone.placeholder1")}
          onInputChange={(value) => field.onChange(value)}
        >
          {(item) => (
            <AutocompleteItem
              key={item.key}
              value={item.code}
              startContent={
                <Avatar alt={item.code} className="w-6 h-6" src={item.image} />
              }
            >
              {item.code}
            </AutocompleteItem>
          )}
        </Autocomplete>
      )}
    /> */
}
