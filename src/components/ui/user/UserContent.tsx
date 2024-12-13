"use client";
import { signOutAction } from "@/actions/auth/login";
import { useSession } from "@/hooks/useSession";
import { UserCookie } from "@/interfaces/auth-response";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, {  useState } from "react";

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
   const {session,loading}= useSession();


  return (
    <>
    {
      loading ? <Spinner  size="sm"/> : session &&  <UserActive user={session} /> 
    }
     
    </>
  );
};
interface Props{
  user:UserCookie
}

const UserActive = ({user}:Props) => {
  const [language] = useState("es");
  const t = translations[language as keyof typeof translations];
   const route =  useRouter();
  const Onredirect = ()=>{
    route.push('/profile')
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
          src={user.phono}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">
            {user.firstname} {user.lastname}{" "}
          </p>
          <p className="font-semibold">{user.email}</p>
        </DropdownItem>
        <DropdownItem key="settings" onPress={() => Onredirect()}>
          {t.option1}
        </DropdownItem>
        {/* <DropdownItem key="team_settings">{t.option2}</DropdownItem> */}
        <DropdownItem key="configurations">{t.option3}</DropdownItem>
        <DropdownItem
          onClick={() => signOutAction()}
          key="logout"
          color="danger"
        >
          {t.subtitle}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
