"use server";

import { DataRooms, Resort } from "@/interfaces/Weekminute-response";
import FirecrawlApp from "@mendable/firecrawl-js";
import * as Cheerio from "cheerio";

export const GetRoomsDestinations = async (url: string,domain:string) => {
  try {
    const app = new FirecrawlApp({
      apiKey: process.env.FireCrawlApp_API_KEY || "",
    });

    const scrapeResult = await app.scrapeUrl(
      `${domain}travser/search-resorts/results/destinations/${url}`,
      {
        formats: ["html"],
        // render: true,
        waitFor: 4000,
        onlyMainContent: true,
      }
    );

    const html = "html" in scrapeResult ? scrapeResult.html : undefined;
    if (!html) {
      console.error("❌ HTML vacío o no encontrado");
      return {
        pagination: { currentEnd: null, total: null },
        rooms: [],
      } as DataRooms;
    }

    // const $ = Cheerio.load(html);

    const [pagination, resorts] = await Promise.all([
      paginationResults(html),
      ListRooms(html),
    ]);
    console.log(pagination);
    return {
      pagination,
      rooms: resorts,
    } as DataRooms;
  } catch (error) {
    console.error("❌ Error al extraer resorts:", error);
    return {
      pagination: { currentEnd: null, total: null },
      rooms: [],
    } as DataRooms;
  }
};

const paginationResults = async (html: string) => {
  try {
    const $ = Cheerio.load(html);

    const paginationText = $(".view-more-control").text().trim();

    const match = paginationText.match(/(\d+)\s-\s(\d+)\s+de\s+(\d+)/i);

    if (match) {
      const [, , endStr, totalStr] = match;
      const currentEnd = parseInt(endStr, 10);
      const total = parseInt(totalStr, 10);
      return { currentEnd, total };
    }

    return { currentEnd: null, total: null };
  } catch (error) {
    console.error("❌ Error al extraer la paginación:", error);
    return null;
  }
};

const ListRooms = async (html: string) => {
  const $ = Cheerio.load(html);
  const baseUrl = ``;


  const resorts: {
    background_image: string;
    resort_location: string;
    resort_name: string;
    price: string;
    see_resort_url: string;
  }[] = [];

  $(".resort-primary-container").each((_, el) => {
    const container = $(el);

    // Imagen de fondo
    const style = container.find(".image").attr("style") || "";
    const imgMatch = style.match(/url\((["']?)(.*?)\1?\)/);
    let imageUrl = imgMatch?.[2] || "";
    if (imageUrl.startsWith("//")) imageUrl = "https:" + imageUrl;

    // Resort name y URL
    const nameEl = container.find(".resort-name a");
    const resort_name = nameEl.text().trim();
    const nameHref = nameEl.attr("href") || "";
    const see_resort_url = nameHref.startsWith("http")
      ? nameHref
      : baseUrl + nameHref;

    // Resort location
    const resort_location = container.find(".resort-location").text().trim();

    // Precio
    const price = container.find(".price").text().trim();

    // Agregar al array si tiene imagen y nombre
    if (imageUrl && resort_name) {
      resorts.push({
        background_image: imageUrl,
        resort_location,
        resort_name,
        price,
        see_resort_url,
      });
    }
  });
  console.log(resorts)
  return resorts as Resort[];
};
