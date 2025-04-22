import { SeadustStore } from "@/store/SeadustStore";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { ModalLoading } from "../ui/modal/ModalLoading";
import { CardRoom } from "./CardRoom";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const ContentRooms = () => {
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Hotels");
  const router = useRouter();
  const { getRoom, id, checkin, checkout, Rooms, updateroom,Deleteroom , RoomSelected,guest } =
    SeadustStore();

  useEffect(() => {
    fetchHotels();
  }, [id, checkin, checkout]);

  const fetchHotels = async () => {
    setLoading(true);
    SeadustStore.setState({ RoomSelected: [] });
    await getRoom();
    setLoading(false);
  };

  const onRedirect = () => {
    router.push(`/detailseadust`);
  };
  return (
    <div className="w-full md:w-full">
      <div className=" mb-6">
        <h2 className="text-2xl font-semibold ">{t("title")}</h2>
        <h2 className="text-medium font-medium text-gray-400">
          {t("subtitle")} {Rooms.length}
        </h2>
        {/* <ModalLoading loading={loading} /> */}

        {loading && <ModalLoading loading={loading} />}
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {Rooms.length === 0 ? (
          <div className="col-span-full h-[300px] flex justify-center items-center">
            <em>No se encontraron resultados</em>
          </div>
        ) : (
          Rooms.map((item) => (
            <CardRoom
              key={item.IdRoom}
              {...item}
              deleteId={Deleteroom}
              updatetId={updateroom}
              idSelected={RoomSelected}
            />
          ))
        )}
      </div>
      <div className="grid mt-5 grid-cols-2 c col-span-full">
        {RoomSelected.length === guest.length && (
          <Button
            onPress={() => onRedirect()}
            fullWidth
            className="bg-black text-white dark:bg-white dark:text-black "
            size="lg"
          >
            Siguiente
          </Button>
        )}
      </div>
    </div>
  );
};
