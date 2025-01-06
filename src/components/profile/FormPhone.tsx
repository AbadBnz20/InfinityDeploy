import { RegisterNumber } from "@/actions/phone/Phone";
import { Contries } from "@/data/countries";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Input,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props{
  getnumbers: () => void;
}

interface State {
  code: string;
  number: string;
}
export const FormPhone = ({getnumbers}:Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<State>();
  const [loading, setLoading] = useState(false);
  const Onsubmit = async (data: State) => {
    try {
      data.code = data.code.split("+")[1];
      setLoading(true);
      const resp = await RegisterNumber(data.code, data.number);
      if (!resp.status) {
        setLoading(false);
        return toast.error(resp.message, {
          position: "top-right",
        });
      }
      getnumbers();
      toast.success(resp.message, {
        position: "top-right",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Ha ocurrido un error inesperado", {
        position: "top-right",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(Onsubmit)}
      className=" grid gap-3 items-center  grid-cols-1 md:grid-cols-3 my-3"
    >
      <Controller
        name="code"
        control={control}
        rules={{ required: "El campo es requerido" }}
        render={({ field }) => (
          <Autocomplete
            {...field}
           
            defaultItems={Contries}
            label="Code"
            size="sm"
            errorMessage={errors.code?.message}
            isInvalid={!!errors.code}
            onInputChange={(value) => field.onChange(value)}
          >
            {(item) => (
              <AutocompleteItem
                key={item.key}
                value={item.code}
                startContent={
                  <Avatar
                    alt={item.code}
                    className="w-6 h-6"
                    src={item.image}
                  />
                }
              >
                {item.code}
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
      <Input
        className="col-span-2"
        label="Numero"
        size={"sm"}
        type="number"
        {...register("number", { required: "El campo es requerido" })}
        isInvalid={!!errors.number}
        errorMessage={errors.number?.message}
      />
      <Button
        isLoading={loading}
        type="submit"
       
        color="primary"
        size="sm"
      >
        Agregar
      </Button>
    </form>
  );
};

