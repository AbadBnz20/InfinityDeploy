'use server';

import {  Package, Profile } from "@/interfaces/package-response";
import { createClient } from "@/utils/supabase/server";


export const GetPackage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
  .from('profile')
  .select(`profileId,package(name,description)`)
  .eq("user_id", user?.id);
   console.log(data?.[0].package)
  if (error) {
    console.log(error)
     return {} as Profile;
  }
   
  const  profile: Profile ={
    profileId: data?.[0].profileId,
    package: { } as Package
  }

 return profile

};
