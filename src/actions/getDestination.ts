"use server";
import { HotelsApi } from "@/Api/Hotels";
import { ConnectMongo } from "@/database/config";
import { DateTime } from "luxon";
import { DestinationResponse, Region } from "@/interfaces/destination-response";
import { DataDetails, DataDetailsRooms } from "@/interfaces/details-response";
import { HotelsResponse } from "@/interfaces/hotels-response";
import { RoomsResponse } from "@/interfaces/rooms-response";

export const formatDateToISO = (dateString: string): string => {
  const formattedDate = DateTime.fromFormat(dateString, "yyyy-M-d").toFormat(
    "yyyy-MM-dd"
  );
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
    console.log(error);

    return [];
  }
};

export const GetHotels = async (
  id: number,
  checkin: string,
  checkout: string,
  guest: Array<any>
) => {
  try {
    const resp = await HotelsApi.post<HotelsResponse>("/search/serp/region", {
      checkin: await formatDateToISO(checkin),
      checkout: await formatDateToISO(checkout),
      residency: "",
      language: "es",
      guests: guest,
      region_id: id,
      currency: "USD",
    });
    // console.log(resp.data);

    return resp.data.data.hotels;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const convertMongoDocument = (doc: any): DataDetails => {
  return {
    ...doc,
    _id: doc._id.toString(),
  };
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
    if (rooms.length === 0) {
      return [];
    }
    rooms.forEach((x) => {
      if (offers.length === 0) {
        return [];
      }
      const check = offers.find((y) => y.id === x.id);
      if (check) {
        checkrooms.push({
          DataDetails: convertMongoDocument(check),
          RoomsCheck: x,
        });
      }
    });

    return checkrooms.sort(
      (a, b) => b.DataDetails.star_rating - a.DataDetails.star_rating
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const Getoffersbystart = async (
  id: number,
  checkin: string,
  checkout: string,
  guest: Array<any>,
  start: number
): Promise<any[]> => {
  try {
    const collection = await ConnectMongo();
    const [offers, rooms] = await Promise.all([
      collection.find({ "region.id": id, star_rating: start }).toArray(),
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
    console.log(error);
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
      checkin: await formatDateToISO(checkin),
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
