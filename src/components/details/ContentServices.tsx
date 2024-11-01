"use client";

import {

  Button,

  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { cloneElement, createElement } from "react";
import { AmenityGroup } from "@/interfaces/details-response";
import { IoChevronDownOutline } from "react-icons/io5";
import { AmenitiesIcon } from "@/icons/ListIcon";
import { useTheme } from "next-themes";

interface Props {
  services: AmenityGroup[];
}

const translations = {
  es: {
    title: "Servicios que ofrece:",
  },
  en: {
    title: "Services offered:",
  },
};

// {AmenitiesIcon.map((amenity, index) => {
//   const IconComponent = amenity.icon; // Obtener el componente del ícono
//   return (
//     <div key={index}>
//       <IconComponent size={24} color="white" />{" "}
//       {/* Renderiza el ícono aquí */}
//       <span>{amenity.name}</span>
//     </div>
//   );
// })}

export const ContentServices = ({ services }: Props) => {
  const language = "es";
  const t = translations[language as keyof typeof translations];
  return (
    <div className=" p-5 ">
      <h2 className="text-2xl font-bold mb-2 ">{t.title}</h2>
      {services.map((item, index) => (
        <ButtonServices key={index} index={index} item={item} />
      ))}
    </div>
  );
};

interface Props2 {
  index: number;
  item: AmenityGroup;
}

const ButtonServices = ({ index, item }: Props2) => {
  const amenity = AmenitiesIcon.find((x) => x.name === item.group_name);
  const IconComponent = amenity
    ? cloneElement(createElement(amenity.icon), { size: 34 })
    : null;
  return (
    <Dropdown key={index} placement="bottom-end">
      <DropdownTrigger>
        <Button
          size="lg"
          className=" m-2 bg-maincolor  h-[100px]"
          endContent={<IoChevronDownOutline />}
        >
          {IconComponent} {item.group_name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        {item.amenities.map((item, index) => (
          <DropdownItem key={index}>{item}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
