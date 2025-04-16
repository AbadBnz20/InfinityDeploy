import { useSession } from "@/hooks/useSession";
import { TripStore } from "@/store/TripStore";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { Key, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoChevronDown } from "react-icons/io5";

interface FormData {
  name: string;
  phone: string;
  email: string;
  adults: number;
  children: Array<string>;
  details: string;
}

interface Props {
  onchange: (key: Key) => void;
}

export const ContentFormTrip = ({ onchange }: Props) => {
  const { session } = useSession();
  const { SetPersonalData } = TripStore();
  const t = useTranslations("MyperfectPage");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [selection, setSelection] = useState({
    children: 0,
    childrenAges: ["", ""],
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    SetPersonalData(
      data.adults,
      selection.childrenAges,
      data.details
    );
    onchange("3" as Key);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        <div className="">
          <label className="block text-sm font-medium mb-2">
          {t("item.title")} <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Nombre"
            type="text"
            {...register("name", {
              required: "El campo es requerido",
            })}
            value={`${session?.firstname} ${session?.lastname}`}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
          />
        </div>
        <div className=" ">
          <label className="block text-sm font-medium mb-2">
          {t("item1.title")} <span className="text-red-500">*</span>

          </label>
          <Input
            placeholder="Telefono"
            type="text"
            {...register("phone", {
              required: "El campo es requerido",
            })}
            value={`${session?.number}`}
            isInvalid={!!errors.phone}
            errorMessage={errors.phone?.message}
          />
        </div>
        <div className="">
          <label className="block text-sm font-medium mb-2">Email <span className="text-red-500">*</span></label>
          <Input placeholder="Email" type="Email" value={session?.email} />
        </div>
        <div className="">
          <label className="block text-sm font-medium mb-2">
          {t("item2.title")} <span className="text-red-500">*</span>

          </label>
          <Input
            placeholder="Email"
            type="Email"
            {...register("email", {
              required: "El campo es requerido",
              validate: (value) =>
                value === session?.email || "El email no coincide con el original",
            })}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
        </div>
        <div className="">
          <label className="block text-sm font-medium mb-2">{t("item3.title")} <span className="text-red-500">*</span>
          </label>
          <Select
            placeholder={t("item3.placeholder")}
            {...register("adults", {
              required: "El campo es requerido",
            })}
            isInvalid={!!errors.adults}
            errorMessage={errors.adults?.message}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {`${num} Adulto${num > 1 ? "s" : ""}`}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="">
          <label className="block text-sm font-medium mb-2">{t("item4.title")}</label>
          <ContentFormChildren
            selection={selection}
            setSelection={setSelection}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2">
          {t("item5.title")}
          </label>
          <Textarea
            placeholder={t("item5.placeholder")}
            {...register("details")}
            isInvalid={!!errors.details}
            errorMessage={errors.details?.message}
          />
        </div>
      </div>
      <div className="w-full flex justify-end gap-3">
        <Button   size="lg" className="w-[50%]" onPress={() => onchange("1" as Key)} >
        {t("buttonStepprev")}
        </Button>
        <Button  size="lg"  className="bg-black text-white dark:bg-white dark:text-black w-[50%]"  type="submit" variant="flat">
        {t("buttonStepnext")}
        </Button>
      </div>
    </form>
  );
};

interface Props2 {
  selection: {
    children: number;
    childrenAges: string[];
  };
  setSelection: React.Dispatch<
    React.SetStateAction<{
      children: number;
      childrenAges: string[];
    }>
  >;
}

export const ContentFormChildren = ({ selection, setSelection }: Props2) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {}, [selection]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value: number = +e.target.value;

    setSelection((prev) => {
      const newAges = Array(value)
        .fill("")
        .map((_, i) => prev.childrenAges[i] || "");
      return { ...prev, childrenAges: newAges, children: value };
    });
  };

  const updateSelection = (key: keyof typeof selection, value: any) => {
    setSelection((prev) => {
      if (key === "children") {
        const newAges = Array(value)
          .fill("")
          .map((_, i) => prev.childrenAges[i] || "");
        return { ...prev, [key]: value, childrenAges: newAges };
      }
      return { ...prev, [key]: value };
    });
  };

  const getSummaryText = () => {
    const { children } = selection;
    if (children === 0) return "Agregar niños";
    return `${children} ${children === 1 ? "niño" : "niños"}`;
  };

  return (
    <div className="w-full">
      {/* Main Trigger */}
      <Button
        onPress={() => setIsOpen(!isOpen)}
        variant="flat"
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        {/* <Baby className="h-5 w-5 text-gray-500" /> */}
        <span className="flex-1 text-sm">{getSummaryText()}</span>
        <IoChevronDown
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute mt-2 w-full max-w-md bg-white rounded-lg shadow-lg border p-4 space-y-6 z-50">
          {/* Número de niños */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Niños
            </label>
            <Select
              value={selection.children.toString()}
              defaultSelectedKeys={selection.children.toString()}
              placeholder="Seleccione niños"
              onChange={handleSelectionChange}
            >
              {[0, 1, 2, 3, 4].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {` ${num} ${num === 1 ? "niño" : "niños"}`}
                </SelectItem>
              ))}
            </Select>
          </div>
          {/* Edades de los niños */}
          {selection.children > 0 && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-600">
                Edad niños en el momento del viaje
              </label>
              <div className="grid grid-cols-2 gap-3">
                {selection.childrenAges
                  .slice(0, selection.children)
                  .map((age, index) => (
                    <Select
                      key={index}
                      value={age}
                      defaultSelectedKeys={age}
                      onChange={(e) => {
                        const newAges = [...selection.childrenAges];
                        newAges[index] = e.target.value;
                        updateSelection("childrenAges", newAges);
                      }}
                    >
                      {Array.from({ length: 18 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {` ${i} ${i === 1 ? "año" : "años"}`}
                        </SelectItem>
                      ))}
                    </Select>
                  ))}
              </div>
              <p className="text-xs text-gray-500 italic">
                *Edades respecto al último día del viaje
              </p>
            </div>
          )}

          {/* Botón de Aceptar */}
          <div className="flex justify-end">
            <Button
              variant="flat"
              onPress={() => setIsOpen(false)}
              className="min-w-[100px] bg-black text-white"
            >
              Aceptar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
