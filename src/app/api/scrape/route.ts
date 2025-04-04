import * as cheerio from "cheerio";

export async function GET() {
  try {
    const BASE_URL = "https://www.mywebrezvacations.com";
    const response = await fetch(`${BASE_URL}/travser`);
    if (!response.ok) throw new Error(`Error al obtener la página: ${response.status}`);

    const html = await response.text();
    const $ = cheerio.load(html);

    // 🔴 Eliminar elementos no deseados
    $(".header-navigation-bar").remove();

    // 🔵 Reescribir links de CSS a absolutos
    $("link[rel='stylesheet']").each((_, el) => {
      const href = $(el).attr("href");
      if (href && !href.startsWith("http")) {
        $(el).attr("href", `${BASE_URL}${href}`);
      }
    });

    // 🔵 Reescribir scripts a absolutos
    $("script[src]").each((_, el) => {
      const src = $(el).attr("src");
      if (src && !src.startsWith("http")) {
        $(el).attr("src", `${BASE_URL}${src}`);
      }
    });

    // 🔵 Reescribir enlaces <a href> a absolutos
    $("a[href]").each((_, el) => {
      const href = $(el).attr("href");
      if (href && href.startsWith("/")) {
        $(el).attr("href", `${BASE_URL}${href}`);
      }
    });

    return new Response($.html(), {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Error al obtener la página:", error);
    return Response.json({ message: "No se puede renderizar" }, { status: 500 });
  }
}