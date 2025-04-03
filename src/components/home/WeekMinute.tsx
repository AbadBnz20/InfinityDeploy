import React from "react";

export const WeekMinute = () => {
  // const [content, setContent] = useState("");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/scrape");
  //       const data = await response.json();

  //       if (data.siteContainer && data.bannerContainer) {
  //         setContent(data.siteContainer + data.bannerContainer);
  //       }

  //       // Cargar estilos
  //       data.styles.forEach((href: string) => {
  //         if (!document.querySelector(`link[href="${href}"]`)) {
  //           const link = document.createElement("link");
  //           link.rel = "stylesheet";
  //           link.href = href.startsWith("http") ? href : "https://www.mywebrezvacations.com" + href;
  //           document.head.appendChild(link);
  //         }
  //       });

  //       // Cargar scripts
  //       data.scripts.forEach((src: string) => {
  //         if (!document.querySelector(`script[src="${src}"]`)) {
  //           const script = document.createElement("script");
  //           script.src = src.startsWith("http") ? src : "https://www.mywebrezvacations.com" + src;
  //           script.async = true;
  //           document.body.appendChild(script);
  //         }
  //       });

  //     } catch (error) {
  //       console.error("Error al cargar los datos:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="h-[100vh]">
      {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
      <iframe
        src="https://www.mywebrezvacations.com/travser"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Página Web"
      />
    </div>
  );
};
