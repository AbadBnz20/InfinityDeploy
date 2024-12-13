'use server';


import { PackageMain } from "@/interfaces/packageById-response";
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
  return name
};

