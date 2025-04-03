import * as cheerio from "cheerio";

export async function GET() {
    try {
        const response = await fetch("https://www.mywebrezvacations.com/travser"); // Se usa fetch en vez de axios
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
        const html = await response.text(); // Obtener HTML de la respuesta
        const $ = cheerio.load(html); // Cargar el HTML con cheerio
    
        const siteContainer: string = $(".site-container-homepage").html() || "";
        const bannerContainer: string = $(".banner-container-homepage.js-disable-when-applicable").html() || "";
    
        const styles: string[] = [];
        $("link[rel='stylesheet']").each((_, el) => {
          const href = $(el).attr("href");
          if (href) styles.push(href);
        });
    
        const scripts: string[] = [];
        $("script[src]").each((_, el) => {
          const src = $(el).attr("src");
          if (src) scripts.push(src);
        });
        return Response.json({ siteContainer, bannerContainer, styles, scripts }, { status: 200 });
    
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        Response.json({ error: "No se pudo obtener la información" }, { status: 500 });
      }
}