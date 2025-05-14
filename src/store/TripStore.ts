import { create } from "zustand";

interface Hotel {
  rating: string;
  service: string;
}

interface State {
  country_origin: string;
  region_origin:string;
  city_origin: string;
  contry_destination: string;
  region_destination:string;
  city_destination: string;
  date_start: string;
  date_end: string;
  flight?: boolean;
  hotel?: Hotel;
  car?: string;
  attractions?: string;
  adults: number;
  children: Array<string>;
  details: string;
  budget: number;
  currency: string;

  SetbudgetData: (
    country_origin: string,
    region_origin:string,
    city_origin: string,
    contry_destination: string,
    region_destination:string,
    city_destination: string,
    date_start: string,
    date_end: string
  ) => void;

  SetFlightData: (flight?: boolean) => void;
  SetHotelsData: (hotel?: Hotel) => void;
  SetCarData: (car?: string) => void;
  SetAttractionsData: (attractions?: string) => void;
  SetPersonalData: (

    adults: number,
    children: Array<string>,
    details: string
  ) => void;
  SetBudgetData: (budget: number, currency: string) => void;
}

export const TripStore = create<State>()((set) => ({
  country_origin: "",
  region_origin:"",
  city_origin: "",
  contry_destination: "",
  region_destination:"",
  city_destination: "",
  date_start: "",
  date_end: "",
  flight: false,
  //   hotel: {
  //     rating: 0,
  //     service: "",
  //   },
  //   car: "",
  //   attractions: "",
  adults: 0,
  children: [],
  details: "",
  budget: 0,
  currency: "",
  SetbudgetData: (
    country_origin: string,
    region_origin:string,
    city_origin: string,
    contry_destination: string,
    region_destination:string,
    city_destination: string,
    date_start: string,
    date_end: string
  ) => {
    set({
      country_origin,
      region_origin,
      city_origin,
      contry_destination,
      region_destination,
      city_destination,
      date_start,
      date_end,
    });
  },
  SetFlightData: (flight?: boolean) => {
    set({ flight });
  },
  SetHotelsData: (hotel?: Hotel) => {
    set({ hotel });
  },
  SetCarData: (car?: string) => {
    set({ car });
  },
  SetAttractionsData: (attractions?: string) => {
    set({ attractions });
  },
  SetPersonalData: (

    adults: number,
    children: Array<string>,
    details: string
  ) => {
    set({ adults, children, details });
  },
  SetBudgetData: (budget: number, currency: string) => {
    set({ budget, currency });
  },
}));
