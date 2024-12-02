'use server';
import { cookies } from "next/headers";

export const createAuthCookie = async (terms:string) => {
    cookies().set("terms", terms, { secure: true });
  };
  