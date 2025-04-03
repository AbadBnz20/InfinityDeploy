import { Strapi } from "@/Api/Strapi";
import { AuthResponse, UserCookieSession } from "@/interfaces/auth-response";
import { Profile } from "@/interfaces/package-response";
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
    .select(`*, package(*)`)
    .eq("user_id", id);
  if (error) {
    return {} as Profile;
  }
  return data?.[0] as Profile;
};

export const GetSession = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {} as UserCookieSession;
  }
  // const userdata = await UserActive(user?.id);
  // console.log(user)

  const userActive: UserCookieSession = {
    firstname: user.user_metadata.firstname,
    lastname: user.user_metadata.lastname,
    email:  user.user_metadata.email,
    number: user?.phone || '',
  };
  return userActive;
};
