"use server";

import { GeoApi } from "@/Api/HubAPI";
import { City } from "@/interfaces/City";
import { Country } from "@/interfaces/Country";
import { Region } from "@/interfaces/Regions";

export const GetCountries = async (text: string, languaje: string) => {
  try {
    const resp = await GeoApi.get<Country>("/countries", {
      params: { namePrefix: text, languageCode: languaje },
    });

    return resp.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const GetCountry = async (text: string) => {
  try {
    const resp = await GeoApi.get(`/countries/${text}`);
    console.log(resp.data);
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
};

export const GetRegions = async (text: string, code: string,languaje: string) => {
  try {
    const resp = await GeoApi.get<Region>(`/countries/${code}/regions`, {
      params: {
        namePrefix: text,
        languageCode: languaje
      },
    });

    return resp.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const GetCities = async (
  text: string,
  code_country: string,
  code_region: string,
  languaje: string
) => {
  try {
    const resp = await GeoApi.get<City>(
      `/countries/${code_country}/regions/${code_region}/cities`,
      {
        params: {
          namePrefix: text,
           languageCode: languaje
        },
      }
    );

    return resp.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
