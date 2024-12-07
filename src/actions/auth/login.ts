"use server";
import { signIn } from "@/auth.config";
import { UserActive, UserCookie } from "@/interfaces/auth-response";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return "Success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
    // return 'CredentialsSignin'
  }
}

export const signInAction = async (email: string,token:string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: false,
      captchaToken:token
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

export const signInActionVerifyOTP = async (email: string, token: string) => {
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
    return encodedRedirect("error", "/auth/login", error.message);
  }
  await  SaveExtensionUser(session?.user.id || "" ,session?.user.email || "");
  return redirect("/");
};

export const signInActionPhone = async (phone: string,token:string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    phone: phone,
    options: {
      shouldCreateUser: false,
      captchaToken:token
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
  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    phone: phone,
    token: token,
    type: "sms",
  });
  if (error) {
    return encodedRedirect("error", "/auth/login", error.message);
  }
  await  SaveExtensionUser(session?.user.id || "" ,session?.user.email || "");

  return redirect("/");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  cookies().delete("userAuth");
  return redirect("/auth/login");
};




const SaveExtensionUser = async (id:string,email:string)=>{
  const supabase = await createClient();
  const { data  } = await supabase.from("profile").select(`*`).eq("user_id", id); 
 const useractive = data?.[0] as UserActive

 const usercookie:UserCookie = {
  firstname:useractive.firstname,
  lastname:useractive.lastname,
  email:email,
  phono:useractive.photo

 }
 cookies().set("userAuth", JSON.stringify(usercookie), { secure: true });

}
