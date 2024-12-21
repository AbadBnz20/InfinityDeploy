"use server";

import { cookies } from "next/headers";

interface Props {
  lenguaje: "es" | "en";
}
export const ChangeLenguaje = async ({ lenguaje }: Props) => {
  cookies().set("lenguage", lenguaje, { secure: true });
};
export const getLanguageFromCookie =  (): string | null => {
  const lenguajeCookie = cookies().get("lenguage");
  return lenguajeCookie ? lenguajeCookie.value : null;
};
