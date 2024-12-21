import {
  ChangeLenguaje,
  getLanguageFromCookie,
} from "@/actions/lenguaje/lenguaje";
import React, { useEffect, useState } from "react";

export const SelectLenguage = () => {
  const [language, setLanguage] = useState<"es" | "en">("es");
  useEffect(() => {
     const onLenguage = async () =>{
        const cookieLanguage = await getLanguageFromCookie();
    if (cookieLanguage === "es" || cookieLanguage === "en") {
      setLanguage(cookieLanguage);
    }
     }

     onLenguage();

  }, []);
  const handleLanguageChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = e.target.value as "es" | "en";
    setLanguage(selectedLanguage);

    await ChangeLenguaje({ lenguaje: selectedLanguage });
  };
  return (
    <select
      value={language}
      onChange={handleLanguageChange}
      className="z-10 outline-none w-20 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
      id="theme"
      name="Idioma"
    >
      <option value="es">Español</option>
      <option value="en">Ingles</option>
    </select>
  );
};
