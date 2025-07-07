"use client";

import { hotelInformation } from "@/actions/WeekMinute/DetailRoomtraver";
import { TraverRoom } from "@/interfaces/Weekminute-response";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ContentMain } from "./ContentMain";
import { useLocale } from "next-intl";
import { ToastContainer } from "react-toastify";

interface Props {
  slug: string;
  user: {
    firstname: string;
    lastname: string;
    email: string | undefined;
    number: string;
  };
}

const ContentInfoRoom = ({ slug, user }: Props) => {
  const [data, setdata] = useState<TraverRoom | null>(null);
  const [loading, setloading] = useState(false);
 const language = useLocale()

  useEffect(() => {
    onLoad();
  }, [language]);

  const onLoad = async () => {
    try {
      setloading(true);
      const resp = await hotelInformation(slug,language);
      setdata(resp);
    } catch (error) {
        console.log(error)
    }
    setloading(false);
  };
  return (
    <div>
      <ToastContainer/>
      {loading ? (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        data && <ContentMain room={data} user={user} />
      )}
    </div>
  );
};

export default ContentInfoRoom;
