'use server';
import { Strapi } from "@/Api/Strapi";
import { PackageResponse } from "@/interfaces/package-response";

export const GetPackage = async () => {
  try {
    const resp = await Strapi.get<PackageResponse>("/packages");
    return resp.data.data;
  } catch (error) {
    console.log(error)
    return [];
  }
};
