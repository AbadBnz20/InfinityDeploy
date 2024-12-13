import { Strapi } from "@/Api/Strapi";
import { AuthResponse, UserActive as user } from "@/interfaces/auth-response";
import { createClient } from "@/utils/supabase/server";

export const ValidateUser = async (email: string, password: string) => {
  try {
    const user = await Strapi.post<AuthResponse>("/userclient/auth", {
      email: email,
      password: password,
    });
    console.log(user.data.data);
    return user.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const UserActive = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profile")
    .select(`* `)
    .eq("user_id", id);
  if (error) {
    return {} as user;
  }
  return data?.[0] as user;
};
