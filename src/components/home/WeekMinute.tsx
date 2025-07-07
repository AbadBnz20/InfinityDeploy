import { destinations_EN, destinations_ES } from "@/data/Destinations";
import { WeekMinuteResponse } from "@/interfaces/Weekminute-response";
import { LastMinuteWeeksStore } from "@/store/LastMinuteWeeksStore";
import { Card, Spinner } from "@nextui-org/react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const WeekMinute = () => {
  const [data, setdata] = useState<WeekMinuteResponse[]>([]);
  const [loading, setLoading] = useState(false);
   const router = useRouter();
   const language = useLocale();
  const {SetDestination}=LastMinuteWeeksStore();


  useEffect(() => {
    OnGetDestinations();
  }, [language]);

  const OnGetDestinations = async () => {
    setLoading(true);
    // const resp = await getMainDestinations();
    setdata( language === 'es'? destinations_ES:destinations_EN);
    setLoading(false);
  };

  const handleClick = (url: string) => {
    const slug = url.split("/").pop() || "";
    SetDestination(slug);
    router.push(`/weekMinute/${slug}`);
  };

  return (
    <div className="">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          
          <div className="flex flex-col items-center gap-4">
            <Spinner />
            <p>Buscando mejores destinos...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <div  key={index}  onClick={() => handleClick(item.url)}>
              <Card
              className="p-3 cursor-pointer"
            >
              <img
                src={item.background_image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
