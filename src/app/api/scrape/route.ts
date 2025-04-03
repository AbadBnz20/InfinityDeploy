import * as cheerio from "cheerio";

export async function GET() {
  try {
    // URL base del sitio
    const BASE_URL = "https://www.mywebrezvacations.com";

    // Obtener la página externa
    const response = await fetch(`${BASE_URL}/travser`);
    if (!response.ok) throw new Error(`Error al obtener la página: ${response.status}`);

    const html = await response.text();
    const $ = cheerio.load(html);

    // 🔴 Eliminar el navbar (ajusta el selector según el HTML)
    $(".header-navigation-bar").remove();

    // 🔵 Extraer y convertir los estilos en rutas absolutas
    $("head").append(
      $("link[rel='stylesheet']")
        .map((_, el) => {
          let href = $(el).attr("href");
          if (href && !href.startsWith("http")) {
            href = `${BASE_URL}${href}`;
          }
          return `<link rel="stylesheet" href="${href}">`;
        })
        .get()
        .join("")
    );

    return new Response($.html(), {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Error al obtener la página:", error);
    return Response.json({ message: "No se puede renderizar" }, { status: 500 });
  }
}