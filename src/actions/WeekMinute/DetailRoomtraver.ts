"use server";

import { TraverRoom } from "@/interfaces/Weekminute-response";
import FirecrawlApp from "@mendable/firecrawl-js";
import * as cheerio from "cheerio";

export const hotelInformation = async (id:string, languaje:string) => {
 const  domain = languaje === 'es' ? 'https://www.mywebrezlatino.com/' : 'https://www.mywebrezvacations.com/'


  try {
    const app = new FirecrawlApp({
       apiKey: process.env.FireCrawlApp_API_KEY || "",
    });

    const scrapeResult = await app.scrapeUrl(
      `${domain}travser/search-resorts/resort/${id}`,
      {
        formats: ["html"],
        waitFor: 4000,
        onlyMainContent: false,
      }
    );

      const html = 'html' in scrapeResult ? scrapeResult.html : undefined;
    if (!html) throw new Error("❌ HTML vacío");

    const $ = cheerio.load(html);

    // Extraer datos en paralelo (aunque síncrono)
    const [overview, house, list] = await Promise.all([
      getOverview(html),
      getHouse(html),
      availabilityItems(html),
    ]);

    const images = $(".swiper-slide")
      .map((_, el) => {
        const style = $(el).attr("style") || "";
        const match = style.match(/url\((['"]?)(.*?)\1?\)/);
        let url = match?.[2];
        if (url?.startsWith("//")) url = "https:" + url;
        return url;
      })
      .get()
      .filter(Boolean);

    const resort_name = $(".resort-name").first().text().trim();
    const starting_price = $(".resort-starting-price").first().text().trim();

    const property_id = $(`.resort-logistic-detail-label:contains('${languaje === 'es' ? 'ID Propiedad':'Property ID'}:')`)
      .next(".resort-logistic-detail-data")
      .text()
      .trim();

    const address = $(".resort-logistic-detail-data.address").first().text().trim();

    const phone = $(`.resort-logistic-detail-label:contains('${languaje === 'es' ? 'Número telefónico':'Phone Number'}:')`)
      .next(".resort-logistic-detail-data")
      .text()
      .trim();
     
    return {
      resort_name,
      images,
      starting_price,
      property_id,
      address,
      phone,
      overview,
      housekeepingFees: house,
      availabilityList: list,
    } as TraverRoom;
  } catch (error) {
    console.error("❌ Error al extraer resort:", error);
    return null;
  }
};

// Cambié los parámetros para que reciban cheerio cargado y no recargar en cada función
const getOverview = async (html:string): Promise<string> => {
  try {
    const $ = cheerio.load(html);
    const overview = $(".resort-overview-container p").first().text().trim();
    return overview;
  } catch (error) {
    console.error("❌ Error al extraer overview:", error);
    return "";
  }
};

const getHouse = async (html:string): Promise<string[]> => {
  try {
    const $ = cheerio.load(html);
    const housekeepingFees: string[] = [];

    $(".resort-applicable-fees-listing-housekeeping-fees li span").each(
      (_, el) => {
        const feeText = $(el).text().trim();
        if (feeText) {
          housekeepingFees.push(feeText);
        }
      }
    );

    return housekeepingFees;
  } catch (error) {
    console.error("❌ Error al extraer housekeeping fees:", error);
    return [];
  }
};

const availabilityItems = async (html:string) => {
  try {
    const $ = cheerio.load(html);
    const items: {
      travelDates: { startDate: string; endDate: string };
      unitDetails: string[];
      price: string;
      pricePerNight: string;
    }[] = [];

    $(".availability-item").each((_, el) => {
      const $el = $(el);

      const travelDates = $el
        .find(".travel-date-container .primary-date-label")
        .map((_, dateEl) => $(dateEl).text().trim())
        .get();

      const unitDetails = $el
        .find(".unit-details .primary-detail-label")
        .map((_, detailEl) => $(detailEl).text().trim())
        .get();

      const priceMain = $el.find(".main-price").clone();
      priceMain.find(".change").each((_, span) => {
        const val = $(span).text();
        $(span).replaceWith(val);
      });
      const price = priceMain.text().trim();

      const pricePerNight = $el.find(".price-per-night").text().trim();

      items.push({
        travelDates: {
          startDate: travelDates[0] || "",
          endDate: travelDates[1] || "",
        },
        unitDetails,
        price,
        pricePerNight,
      });
    });

    return items;
  } catch (error) {
    console.error("❌ Error al extraer availability items:", error);
    return [];
  }
};