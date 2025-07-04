"use server";
import FireCrawlApp from "@mendable/firecrawl-js";
import { WeekMinuteResponse } from "@/interfaces/Weekminute-response";
import * as Cheerio from "cheerio";


export const getMainDestinations = async () => {
  try {
    const app = new FireCrawlApp({
      apiKey: process.env.FireCrawlApp_API_KEY || "",
    });

    const scrapeResult = await app.scrapeUrl(
      "https://www.mywebrezlatino.com/travser/",
      {
        formats: ["html"],
        // render: true,
        waitFor: 3000, // espera justo para que cargue
        onlyMainContent: true,
      }
    );

   const html = 'html' in scrapeResult ? scrapeResult.html : undefined;
    if (!html) {
      throw new Error("HTML vacío");
    }

    const $ = Cheerio.load(html);
    const cards: {
      title: string;
      url: string;
      background_image: string;
    }[] = [];

    $("a:has(div.image)").each((_, el) => {
      const anchor = $(el);
      const href = anchor.attr("href");
      const bgDiv = anchor.find("div.image");
      const titleDiv = anchor.find(".fvd-title");

      const style = bgDiv.attr("style") || "";
      const match = style.match(/url\((['"]?)(.*?)\1?\)/);
      const imageUrl = match?.[2];

      if (href && imageUrl && titleDiv.length) {
        cards.push({
          title: titleDiv.text().trim(),
          url: new URL(href, "https://www.mywebrezlatino.com").href,
          background_image: imageUrl.startsWith("//")
            ? "https:" + imageUrl
            : imageUrl,
        });
      }
    });

    // console.log("✅ Cards encontradas:", cards);
    return   cards as WeekMinuteResponse[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
