"use client";
import {  GetNumbers } from "@/actions/phone/Phone";
import { Phone } from "@/interfaces/phone-response";
import {
  cn,
  Radio,
  RadioGroup,
  RadioProps,
  Spinner,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FormPhone } from "./FormPhone";
import { ContentUpdatePhone } from "./ContentUpdatePhone";
interface Props {
  IdPackage: string;
}

export const ContentPhone = ({ IdPackage }: Props) => {
  const [date, setDate] = useState<Phone[]>([]);
  const [selected, setSelected] = useState(IdPackage);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetNumber();
  }, []);
  const GetNumber = async () => {
    setLoading(true);
    const resp = await GetNumbers();
    setDate(resp);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="w-full h-[20ppx] grid justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {date.length < 3 && <FormPhone getnumbers={GetNumber} />}
      {date.length > 0 ? (
        <div>
          <RadioGroup
            description="Seleccione un numero para establecer como principal"
            label="Lista"
            value={selected}
            onValueChange={setSelected}
          >
            {date.map((item) => (
              <CustomRadio
                key={item.phoneId}
                value={`${item.code}${item.number}`}
              >
                {`+${item.code} ${item.number}`}
              </CustomRadio>
            ))}
          </RadioGroup>
          <ContentUpdatePhone phone={selected} />
        </div>
      ) : (
        <div className="w-full h-[20ppx] grid justify-center my-4">
          <em>No hay elementos</em>
        </div>
      )}
    </div>
  );
};
export const CustomRadio = (props: RadioProps) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary shadow-md"
        ),
      }}
    >
      {children}
    </Radio>
  );
};
