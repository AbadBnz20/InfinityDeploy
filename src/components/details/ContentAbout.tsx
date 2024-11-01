"use client";
import { Struct } from "@/interfaces/details-response";

const translations = {
  es: {
    aboutUs: "Acerca del hotel",
  },
  en: {
    aboutUs: "About the hotel",
  },
};
interface Props {
  struct: Struct[];
}

export const ContentAbout = ({ struct }: Props) => {
  const language = "es";
  const t = translations[language as keyof typeof translations];
  return (
    <div className="w-full mx-auto p-5 space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-2 ">{t.aboutUs}</h2>
        {struct.map((item, index) => (
          <div key={index}>
          <p  className="text-gray-500 dark:text-gray-300">
            {item.paragraphs} 
          </p>
          <br/>
          </div>
        ))}
      </section>


    </div>
  );
};
