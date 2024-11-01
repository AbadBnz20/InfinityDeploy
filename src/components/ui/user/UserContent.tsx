"use client";
import { logout } from "@/actions/auth/logout";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const translations = {
  es: {
    title: "Iniciar sesion",
    option1:"Configuracion",
    option2:"Paquetes",
    option3:"Reservas",
    subtitle:"Cerrar Sesion"
  },
  en: {
    title: "Login",
    option1:"Configuration",
    option2:"Packages",
    option3:"Reservations",
    subtitle:"Log Out"

  },
};

export const UserContent = () => {
  const [language] = useState("es");
  const t = translations[language as keyof typeof translations];
  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;
  // console.log(isAuthenticated)
  return (
    <>
      {isAuthenticated ? (
          <UserActive />
      ) : (
        <Button
        as={Link}
        className="text-black bg-white"
        href="/auth/login"
        variant="flat"
      >
        {t.title}
      </Button>
      )}
    </>
  );
};

const UserActive = () => {
  const [language] = useState("es");
  const t = translations[language as keyof typeof translations];
  const { theme, setTheme } = useTheme();


  const Onchange = ()=> {
   if (theme === 'light') {
    setTheme('dark');
   }
   else {
     setTheme('light');
   }

  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="default"
          name="Jason Hughes"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Juan Perez</p>
          <p className="font-semibold">zoey@example.com</p>
        </DropdownItem>
        <DropdownItem key="settings">{t.option1}</DropdownItem>
        <DropdownItem key="team_settings">{t.option2}</DropdownItem>
        <DropdownItem key="configurations">{t.option3}</DropdownItem>
        <DropdownItem onClick={()=>Onchange()} description="Tema actual" key="theme" endContent={ theme === 'light'?  <IoMoonOutline size={'24px'}/>:<IoSunnyOutline size={'24px'}/> } > {theme ==='light' ? 'Light':'Dark' } </DropdownItem>
        <DropdownItem onClick={()=>logout()} key="logout" color="danger">
        {t.subtitle}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
