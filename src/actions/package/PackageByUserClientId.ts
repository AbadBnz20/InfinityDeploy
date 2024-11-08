'use server';
import { Strapi } from "@/Api/Strapi";
import { auth } from "@/auth.config";
import { PackageByIDResponse } from "@/interfaces/packageById-response";

export const GetPackageByIDResponse = async () => {
    const session = await auth();

  try {
    const resp = await Strapi.post<PackageByIDResponse>(
      "/userclient/findOnePackageByUserClientId",
      {
        token: session?.user.token,
      }
    );
    return resp.data;
  } catch (error) {
    console.log(error)
    return null;
  }
};

export const UpdatePackageByIDResponse = async (name:string) => {
  const session = await auth();
try {
  const resp = await Strapi.post<PackageByIDResponse>(
    "/userclient/upgradePackage",
    {
      token: session?.user.token,
      name
    }
  );
  return resp.data;
} catch (error) {
  console.log(error)

  return null;
}
};

