"use server";

import { Discount, PackageMain } from "@/interfaces/packageById-response";
import { createClient } from "@/utils/supabase/server";

export const GetPackageByIDResponse = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("profile")
    .select(
      `
      profileId,
      package (
        percentage
      )`
    )
    .eq("user_id", user?.id);
  if (error) {
    console.log(error);
    return {} as PackageMain;
  }
  return data?.[0].package as PackageMain;
};

export const GetDiscountByUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("profile")
    .select(`discount, package (percentage)`)
    .eq("user_id", user?.id)
    .single();

  if (error) {
    return 0;
  }
  const discount = data as unknown as Discount;
  const discount1 = discount.package.percentage;
  const discount2 = discount.discount;
  const discountotal = (discount2 / 100) * (discount1 / 100);
  const result = discount1 - discountotal * 100;
  return result;
};

export const UpdatePackageByIDResponse = async (name: string) => {
  return name;
};
