
import { Strapi } from "@/Api/Strapi";
import { AuthResponse } from "@/interfaces/auth-response";

export const ValidateUser = async (email: string, password: string) => {
  try {
    const user = await Strapi.post<AuthResponse>("/auth/local/", {
      identifier: email,
      password: password,
    });
    return user.data
  } catch (error) {
    console.log(error)
    return null;
  }
};
