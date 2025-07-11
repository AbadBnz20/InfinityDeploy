import { create } from "zustand";

export interface LocationCityStore {
  country: string;
  countryCode: string;
  region: string;
  regionWdId: string;
}

interface State {
  country_origin_code: string;
  region_origin_code: string;
  city_origin_code: string;
  contry_destination_code: string;
  region_destination_code: string;
  city_destination_code: string;
  SetCountryOrigin: (code: string) => void;
  SetRegionOrigin: (code: string) => void;
  SetCityOrigin: (code: string) => void;
  SetCountryDestination: (code: string) => void;
  SetRegionDestination: (code: string) => void;
  SetCityDestination: (code: string) => void;
  SetLocationCityOrigin: (data: LocationCityStore) => void;
  locationCityorigin: LocationCityStore;
  SetLocationCityDestination: (data: LocationCityStore) => void;
  locationCityDestination: LocationCityStore;
}

export const CodesStore = create<State>()((set) => ({
  country_origin_code: "",
  locationCityorigin: {
    country: "",
    countryCode: "",
    region: "",
    regionWdId: "",
  },
  locationCityDestination: {
    country: "",
    countryCode: "",
    region: "",
    regionWdId: "",
  },
  region_origin_code: "",
  city_origin_code: "",
  contry_destination_code: "",
  region_destination_code: "",
  city_destination_code: "",
  SetCountryOrigin: (country_origin_code: string) =>
    set({ country_origin_code }),
  SetRegionOrigin: (region_origin_code: string) => set({ region_origin_code }),
  SetCityOrigin: (city_origin_code: string) => set({ city_origin_code }),
  SetCountryDestination: (contry_destination_code: string) =>
    set({ contry_destination_code }),
  SetRegionDestination: (region_destination_code: string) =>
    set({ region_destination_code }),
  SetCityDestination: (city_destination_code: string) =>
    set({ city_destination_code }),
  SetLocationCityOrigin: (data: LocationCityStore) =>
    set({ locationCityorigin: data }),
  SetLocationCityDestination: (data: LocationCityStore) =>
    set({ locationCityDestination: data }),
}));
