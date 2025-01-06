"use client";
import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";

interface FormData {
  firstName: string;
  LastName: string;
  Country: string;
  Email: string;
  Age: string;
}

interface Props {
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  country: string;
}

export const FormProfile = ({
  firstname,
  lastname,
  country,
  birthdate,
  email,
}: Props) => {
  const { register } = useForm<FormData>({
    defaultValues: {
      firstName: firstname,
      LastName: lastname,
      Country: country,
      Email: email,

      Age: birthdate,
    },
  });

  return (
    <div className="">
      <h3 className="text-lg font-semibold">Informacion Personal</h3>
      <div className="my-6 grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium" htmlFor="firstName">
            Nombre
          </label>
          <Input id="firstName" {...register("firstName")} />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="lastName">
            Apellido
          </label>
          <Input  id="lastName" {...register("LastName")} />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <Input {...register("Email")} id="email" type="email" />
        </div>
        <div className="grid ">
          <label className="text-sm font-medium" htmlFor="firstName">
            fecha nacimiento
          </label>
          <Input {...register("Age")} id="email" type="text" />
        </div>
        {/* <div>
              <label className="text-sm font-medium" htmlFor="designation">
                Pais
              </label>
              <Input {...register("Country")}  id="designation" />
            </div> */}
      </div>
    
     
    </div>
  );
};
