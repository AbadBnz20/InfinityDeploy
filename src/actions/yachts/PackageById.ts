"use server";

import { PackageYachts, PackageYachtsLocation } from "@/interfaces/Yach";
import { createClient } from "@/utils/supabase/server";

export const PackageById = async (id: string) => {
  const supabase = await createClient();
  const { data: yachtPackage, error } = await supabase
    .from("yachtPackage")
    .select("*")
    .eq("yachtPackageId", id)
    .single();

  if (error) {
    return null;
  }

  return yachtPackage as PackageYachts;
};
export const PackagesYachts = async () => {
  const supabase = await createClient();
  const { data: yachtPackage, error } = await supabase
    .from("yachtPackage")
    .select("*,origin_destination_ship (name,city(name)) ")
    .eq("state", true);
  if (error) {
    return [];
  }

  return yachtPackage as PackageYachtsLocation[];
};
