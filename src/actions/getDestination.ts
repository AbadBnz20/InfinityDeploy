"use server";
import { HotelsApi } from "@/Api/Hotels";
import { ConnectMongo } from "@/database/config";
import { DateTime } from "luxon";
import {
  DestinationResponse,
  Region,
} from "@/interfaces/destination-response";
import {  DataDetailsRooms } from "@/interfaces/details-response";
import { HotelsResponse } from "@/interfaces/hotels-response";
import { RoomsResponse } from "@/interfaces/rooms-response";

 export const formatDateToISO = (dateString: string): string => {
  const formattedDate = DateTime.fromFormat(dateString, "yyyy-MM-d").toFormat("yyyy-MM-dd");
  return formattedDate;
};

export const GetDestination = async (cad: string): Promise<Region[]> => {
  try {
    const resp = await HotelsApi.post<DestinationResponse>(
      "/search/multicomplete",
      {
        query: cad,
        language: "es",
      }
    );
    return resp.data.data.regions;
  } catch (error) {
    console.log(error)

    return [];
  }
};

export const GetHotels = async (
  id: number,
  checkin: string,
  checkout: string,
  guest: Array<any>
) => {
  // console.log(formatDateToISO(checkin),formatDateToISO(checkout));

  try {
    const resp = await HotelsApi.post<HotelsResponse>("/search/serp/region", {
      checkin:await formatDateToISO(checkin),
      checkout:await formatDateToISO(checkout),
      residency: "",
      language: "es",
      guests: guest,
      region_id: id,
      currency: "USD",
    });
    // console.log(resp.data)

    return resp.data.data.hotels;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const Getoffers = async (
  id: number,
  checkin: string,
  checkout: string,
  guest: Array<any>
): Promise<any[]> => {
  try {
    const collection = await ConnectMongo();
    const [offers, rooms] = await Promise.all([
      collection.find({ "region.id": id }).toArray(),
      GetHotels(id, checkin, checkout, guest),
    ]);
    const checkrooms: DataDetailsRooms[] = [];
    rooms.forEach((x) => {
      const check = offers.find((y) => y.id === x.id);
      if (check) {
        checkrooms.push({ DataDetails: check, RoomsCheck: x });
      }
    });

    return checkrooms;
  } catch (error) {
    console.log(error)
    return [];
  }
};
export const GetRooms = async (
  id: string,
  checkin: string,
  checkout: string,
  guest: Array<any>
) => {
  // console.log(id, checkin, checkout, guest);
  // console.log(guest)
  try {
    const resp = await HotelsApi.post<RoomsResponse>("/search/hp", {
      checkin:await formatDateToISO(checkin),
      checkout: await formatDateToISO(checkout),
      residency: "",
      language: "es",
      guests: guest,
      id: id,
      currency: "USD",
    });
    // console.log(resp.data)
    return resp.data.data.hotels;
  } catch (error) {
    console.log(error);
    return [];
  }
};
