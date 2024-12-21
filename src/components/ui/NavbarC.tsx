"use client";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { UserContent } from "./user/UserContent";
import { useTheme } from "next-themes";
import { ContentTheme } from "./user/ContentTheme";
import { useTranslations } from "next-intl";

export const NavbarC = () => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Navbar");
  const Onchange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Navbar
      shouldHideOnScroll
      className="p-2 bg-maincolor bg-opacity-80 backdrop-blur-md"
    >
      <NavbarBrand>
        <Link href="/">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-eigb5La26zWW8G8xrkuVbJPlSSBNEC.png"
            alt="Infinity Luxury Travel Logo"
            className="h-16"
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
        <NavbarItem>
          <Link
            color="foreground"
            href="/about"
            className="text-lg font-medium hover:text-gold-500 transition-colors "
          >
            {t("option2")}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="cursor-pointer" onClick={() => Onchange()}>
          <ContentTheme />
        </NavbarItem>
        <NavbarItem>
          <UserContent />
        </NavbarItem>
      </NavbarContent>
    </Navbar>

  );
};
