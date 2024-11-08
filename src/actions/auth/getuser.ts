
import { Strapi } from "@/Api/Strapi";
import { AuthResponse } from "@/interfaces/auth-response";

export const ValidateUser = async (email: string, password: string) => {
  try {
    const user = await Strapi.post<AuthResponse>("/userclient/auth", {
      email: email,
      password: password,
    });
    console.log(user.data.data)
    return user.data.data
  } catch (error) {
    console.log(error)
    return null;
  }
};
