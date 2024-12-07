"use client";
import { signOutAction } from "@/actions/auth/login";
import { UserCookie } from "@/interfaces/auth-response";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { getCookie } from "cookies-next";
// import { useRouter } from "next/navigation";
import React, { useState } from "react";

const translations = {
  es: {
    title: "Iniciar sesion",
    option1: "Mi Perfil",
    option2: "Paquetes",
    option3: "Reservas",
    subtitle: "Cerrar Sesion",
  },
  en: {
    title: "Login",
    option1: "Profile",
    option2: "Packages",
    option3: "Reservations",
    subtitle: "Log Out",
  },
};

export const UserContent = () => {
  const [language] = useState("es");
  const t = translations[language as keyof typeof translations];
  console.log(t);
  // const { data: session } = useSession();

  // const isAuthenticated = !!session?.user;
  // console.log(isAuthenticated)
  return (
    <>
      <UserActive />
    </>
  );
};

const UserActive = () => {
  const [language] = useState("es");
  const t = translations[language as keyof typeof translations];
  
  const userAuth:UserCookie = JSON.parse(getCookie('userAuth') || "") ;
  // const router = useRouter();


  // const Onredirect = () => {
  //   router.push("/profile");
  // };

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
          src={userAuth?.phono}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">{userAuth?.firstname} {userAuth?.lastname} </p>
          <p className="font-semibold">{userAuth?.email}</p>
        </DropdownItem>
        {/* <DropdownItem key="settings" onClick={()=>Onredirect()}>
        {t.option1}
        </DropdownItem> */}
        {/* <DropdownItem key="team_settings">{t.option2}</DropdownItem> */}
        <DropdownItem key="configurations">{t.option3}</DropdownItem>
        <DropdownItem onClick={() => signOutAction()} key="logout" color="danger">
          {t.subtitle}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
