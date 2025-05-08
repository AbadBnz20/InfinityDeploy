"use client";
import Link from "next/link";
import {
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { UserContent } from "./user/UserContent";
import { useTheme } from "next-themes";
import { ContentTheme } from "./user/ContentTheme";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import { SelectLenguage } from "./user/SelectLenguage";
import { useTranslations } from "next-intl";

export const NavbarC = () => {
  const { theme, setTheme } = useTheme();
   const t = useTranslations("Navbar");
  const image = theme === 'dark' ? "https://res.cloudinary.com/devz7obre/image/upload/v1744926909/logo1dark_xmwuhb.png" : "https://res.cloudinary.com/devz7obre/image/upload/v1744321737/logo1_v9yswm.png"
  const Onchange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <>
      <div className="w-full  bg-maincolor py-2 flex justify-center items-center space-x-4 flex-col  md:flex-row  ">
        <div className="flex items-center space-x-2">
          <IoCallOutline />
          <span className="text-small">(+52) 998 500 2798 | (+1) 800 871 9040</span>
        </div>
        <div className="flex items-center space-x-2">
          <IoMailOutline  /> <span className="text-small">members@infinityluxurytravelclub.com </span> <span className="mx-2">|</span> <SelectLenguage/>
        </div>
      </div>
      <Divider />
      <Navbar
        shouldHideOnScroll
        className="p-2 bg-maincolor bg-opacity-80 backdrop-blur-md"
      >
        <NavbarContent>
          <NavbarBrand>
            <Link href="/">
              <img
                src={image}
                alt="Infinity Luxury Travel Logo"
                className="h-16 object-cover"
              />
            </Link>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link
                color="foreground"
                href="/"
                className="text-lg font-medium hover:text-gold-500 transition-colors "
              >
                {t("option1")}
               
              </Link>
            </NavbarItem>
            {/* <NavbarItem>
              <Link
                color="foreground"
                href="/about"
                className="text-lg font-medium hover:text-gold-500 transition-colors "
              >
                Nosotros
              </Link>
            </NavbarItem> */}
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="cursor-pointer" onClick={() => Onchange()}>
            <ContentTheme />
            </NavbarItem>
            <NavbarItem>
              <UserContent />
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>
      </Navbar>
    </>
  );
};
