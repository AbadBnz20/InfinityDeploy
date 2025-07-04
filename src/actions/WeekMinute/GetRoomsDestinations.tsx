'use server';

import { Resort } from "@/interfaces/Weekminute-response";
import FirecrawlApp from "@mendable/firecrawl-js";
import * as Cheerio from "cheerio";

export const  GetRoomsDestinations = async (url: string) => {
  try {
    const app = new FirecrawlApp({
       apiKey: process.env.FireCrawlApp_API_KEY || "",
    });

    const scrapeResult = await app.scrapeUrl(
      `https://www.mywebrezlatino.com/travser/search-resorts/results/destinations/${url}`,
      {
        formats: ["html"],
        // render: true,
        waitFor: 4000,
        onlyMainContent: true,
      }
    );

    const html = 'html' in scrapeResult ? scrapeResult.html : undefined;
    if (!html) {
        console.error("❌ HTML vacío o no encontrado");
      return [];
    }


    const $ = Cheerio.load(html);
    const baseUrl = `https://www.mywebrezlatino.com/travser/search-resorts/results/destinations/${url}`;

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
      const see_resort_url = nameHref.startsWith("http") ? nameHref : baseUrl + nameHref;

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

    return resorts as Resort[];
  } catch (error) {
    console.error("❌ Error al extraer resorts:", error);
    return [];
  }


}