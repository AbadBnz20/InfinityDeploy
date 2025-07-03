
import FireCrawlApp from "@mendable/firecrawl-js";
import z from "zod";

const schema = z.object({
  cards: z.array(
    z.object({
      title: z.string(),
      url: z.string().url(),
    })
  ),
});

export async function GET() {
  // console.log('entra api')
  try {
    const app = new FireCrawlApp({
      apiKey: "fc-fdc761cc22b84484bb36196654738284",
    });

    const scrapeResult = await app.scrapeUrl(
      "https://www.mywebrezvacations.com/travser/",
      {
        formats: ["json"],
        onlyMainContent: true,
        jsonOptions: { schema: schema },
      }
    );
 console.log(scrapeResult)
    // console.log(scrapeResult.json);
    // console.log(scrapeResult.error);
    return new Response("", {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Error al obtener la página:", error);
    return Response.json(
      { message: "No se puede renderizar" },
      { status: 500 }
    );
  }
}
