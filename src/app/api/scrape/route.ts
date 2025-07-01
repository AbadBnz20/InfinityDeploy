import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(req: Request) {
  console.log("entra api");
  try {
    // const { searchParams } = new URL(req.url);
    // const targetUrl = searchParams.get("url") || "https://www.mywebrezvacations.com/travser";

    // const host = "http://localhost:3000";
    const BASE_URL = "https://www.mywebrezvacations.com";

    // const response = await fetch(targetUrl);
    // console.log(response)
    // if (!response.ok)
    //   throw new Error(`Error al obtener la página: ${response.status}`);

    // const html = await response.text();
    // const $ = cheerio.load(html);

    // // 🔴 Eliminar elementos no deseados
    // $(".header-navigation-bar").remove();

    // // 🔵 Reescribir links de CSS
    // $("link[rel='stylesheet']").each((_, el) => {
    //   const href = $(el).attr("href");
    //   if (href && !href.startsWith("http")) {
    //     $(el).attr("href", `${BASE_URL}${href}`);
    //   }
    // });

    // // 🔵 Reescribir scripts
    // $("script[src]").each((_, el) => {
    //   const src = $(el).attr("src");
    //   if (src && !src.startsWith("http")) {
    //     $(el).attr("src", `${BASE_URL}${src}`);
    //   }
    // });

    // // 🔵 Reescribir <a> y filtrar links peligrosos
    // $("a[href]").each((_, el) => {
    //   const href = $(el).attr("href");
    //   if (!href) return;

    //   // ❌ Lista de rutas peligrosas

    //   // ✅ Si es absoluto al dominio original
    //   if (href.startsWith("https://www.mywebrezvacations.com")) {
    //     $(el).attr(
    //       "href",
    //       `${host}/api/scrape?url=${encodeURIComponent(href)}`
    //     );
    //   }
    //   // ✅ Si es relativo
    //   else if (href.startsWith("/")) {
    //     $(el).attr(
    //       "href",
    //       `${host}/api/scrape?url=${encodeURIComponent(`${BASE_URL}${href}`)}`
    //     );
    //   }
    // });

    // return new Response($.html(), {
    //   headers: { "Content-Type": "text/html" },
    // });
    console.log("entra api");
    const url = new URL(req.url);
    const {searchParams} = new URL(req.url);

    // console.log(searchParams)
   const baseUrl = `${url.protocol}//${url.host}`;
   console.log(baseUrl)
   const targetUrl = searchParams.get("url") || "https://www.mywebrezvacations.com/travser";
    const host = baseUrl;

    const response = await axios
      .get("https://api.scraperapi.com/", {
        params: {
          api_key: "f526d9f2b95933b2a671ac5feb131233",
          url: targetUrl,
          render: "true",
          follow_redirect: "false",
          retry_404: "true",
        },
      })
      
    // console.log(response.data);
    const $ = cheerio.load(response.data);

    // Inyectar base
    $("head").prepend('<base href="https://www.mywebrezvacations.com/">');
    $(".header-navigation-bar").remove();

    $("a[href]").each((_, el) => {
      const href = $(el).attr("href");
      if (!href) return;

      // ❌ Lista de rutas peligrosas

      // ✅ Si es absoluto al dominio original
      if (href.startsWith("https://www.mywebrezvacations.com")) {
        $(el).attr(
          "href",
          `${host}/api/scrape?url=${encodeURIComponent(href)}`
        );
      }
      // ✅ Si es relativo
      else if (href.startsWith("/")) {
        $(el).attr(
          "href",
          `${host}/api/scrape?url=${encodeURIComponent(`${BASE_URL}${href}`)}`
        );
      }
    });

    return new Response($.html(), {
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
