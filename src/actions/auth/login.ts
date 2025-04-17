"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signInAction = async (email: string, token: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: false,
      captchaToken: token,
    },
  });
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  return {
    status: true,
    message: "",
  };
};

export const signInActionVerifyOTP = async (email: string, token: string):Promise<{
  status: boolean,
  message: string,
}> => {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email,
    token: token,
    type: "email",
  });
  console.log(session);
  if (error) {
    return { status:false, message: error.message };
  }
  return { status: true, message: "Inicio correcto" };
};

export const signInActionPhone = async (phone: string, token: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    phone: phone,
    options: {
      shouldCreateUser: false,
      captchaToken: token,
    },
  });
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  return {
    status: true,
    message: "",
  };
};

export const signInActionVerifyOTPPhone = async (
  phone: string,
  token: string
) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    phone: phone,
    token: token,
    type: "sms",
  });
  // if (error) {
  //   return encodedRedirect("error", "/auth/login", error.message);
  // }
  if (error) {
    return { status:false, message: error.message };
  }
  return { status: true, message: "Inicio correcto" };
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  cookies().delete("userAuth");
  return redirect("/auth/login");
};
