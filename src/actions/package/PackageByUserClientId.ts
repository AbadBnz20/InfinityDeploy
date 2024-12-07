'use server';
import { Strapi } from "@/Api/Strapi";
import { auth } from "@/auth.config";
import { PackageByIDResponse, PackageMain } from "@/interfaces/packageById-response";
import { createClient } from "@/utils/supabase/server";

export const GetPackageByIDResponse = async () => {
    const supabase = await createClient(); 
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase.from("profile").select(`
      profileId,
      package (
        percentage
      )`).eq("user_id", user?.id);  
    if (error) {
      console.log(error)
      return {} as PackageMain;
    }
  return  data?.[0].package as PackageMain
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

