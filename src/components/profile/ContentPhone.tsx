import { GetNumberbyId } from "@/actions/phone/Phone";
import { Phone } from "@/interfaces/phone-response";
import { cn, Radio, RadioGroup, RadioProps, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FormPhone } from "./FormPhone";

export const ContentPhone = () => {
  const [date, setDate] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetNumber();
  }, []);
  const GetNumber = async () => {
    setLoading(true);
    const resp = await GetNumberbyId();
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
        <RadioGroup
          description="Seleccione un numero para establecer como principal"
          label="Lista"
        >
          {date.map((item) => (
            <CustomRadio key={item.phoneId} value={item.phoneId}>
              {`+${item.code} ${item.number}`}
            </CustomRadio>
          ))}
        </RadioGroup>
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
