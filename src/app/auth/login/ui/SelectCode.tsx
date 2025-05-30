import { Contries } from "@/data/countries";
import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { StateForm } from "./SignUp";
import { useTranslations } from "next-intl";

interface Props{
  control:Control<StateForm>
}

export const SelectCode = ({control}:Props) => {
  const t = useTranslations("Auth");
  return (
    <Controller
      name="code"
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field} 
          className="w-full"
          inputProps={{
            classNames: {
              input: "rounded-none rounded-bl-md rounded-br-md",
              inputWrapper: "rounded-none rounded-bl-md rounded-tl-md",
            },
          }}
          defaultItems={Contries}
          label={t("loginPhone.title1")}
          radius="none"
          placeholder={t("loginPhone.placeholder1")}
          onInputChange={(value) => field.onChange(value)}
        >
          {(item) => (
            <AutocompleteItem key={item.key} value={item.code} startContent={<Avatar alt={item.code} className="w-6 h-6" src={item.image} />}>
              {item.code}
            </AutocompleteItem>
          )}
        </Autocomplete>
      )}
    />
  );
};
