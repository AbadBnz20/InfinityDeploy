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

export const signInActionVerifyOTP = async (
  email: string,
  token: string
): Promise<{
  status: boolean;
  message: string;
}> => {
  const supabase = await createClient();
  const {
    data: { session },
    error: errorauth,
  } = await supabase.auth.verifyOtp({
    email,
    token: token,
    type: "email",
  });
  // console.log(session);

  if (session) {
    const { data: profile } = await supabase
      .from("profile")
      .select("DateSold, Expiration")
      .eq("user_id", session.user.id)
      .single();
    const today = new Date();

    const startDate = new Date(profile?.DateSold);
    const endDate = new Date(profile?.Expiration);
    if (today >= startDate && today <= endDate) {
      return { status: true, message: "Inicio correcto" };
    } else {
      await supabase.auth.signOut();
      return { status: false, message: "Paquete expirado" };
    }
  } else if (errorauth) {
    return { status: false, message: errorauth.message };
  } else {
    return { status: true, message: "Inicio correcto" };
  }
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
    return { status: false, message: error.message };
  }
  return { status: true, message: "Inicio correcto" };
};

export const signOutAction = async () => {
  
  const supabase = await createClient();
  await supabase.auth.signOut();
  cookies().delete("userAuth");
  return redirect("/auth/login");
};

export const VerifyPackage = async (id: string) => {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profile")
    .select("DateSold, Expiration")
    .eq("user_id", id)
    .single();
  const today = new Date();

  const startDate = new Date(profile?.DateSold);
  const endDate = new Date(profile?.Expiration);
  if (today >= startDate && today <= endDate) {
    const diffInMs = endDate.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return { status: true, count: diffInDays };
  } else { 
    return { status: false, count: 0 };
  }
};
