import { CountriesInterfaces } from "@/interfaces/countries";
import axios from "axios";

export const GetCountry = async (cad: string): Promise<CountriesInterfaces[]> => {
    try {
      const resp = await axios.get<CountriesInterfaces[]>(
        `https://restcountries.com/v3.1/name/${cad}` );

      return resp.data
    } catch (error) {
      console.log(error)
      return [];
    }
  };