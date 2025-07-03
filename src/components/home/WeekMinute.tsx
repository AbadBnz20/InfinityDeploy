import { getMainDestinations } from "@/actions/WeekMinute/GetMainDestinations";
import { WeekMinuteResponse } from "@/interfaces/Weekminute-response";
import { Card, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export const WeekMinute = () => {
  const [data, setdata] = useState<WeekMinuteResponse[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    OnGetDestinations();
  }, []);

  const OnGetDestinations = async () => {
    setLoading(true);
    const resp = await getMainDestinations();
    setdata(resp);
    setLoading(false);
  };

  return (
    <div className="">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className=" duration-300"
            >
              <Card className="p-3">
                <img
                  src={item.background_image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
