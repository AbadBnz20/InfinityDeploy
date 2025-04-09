"use client";
import { TransfersStore } from "@/store/TransfersStore";
import { useEffect, useState } from "react";
import { Car } from "./Car";
import { ModalLoading } from "../ui/modal/ModalLoading";
import { Accordion, AccordionItem, Button, Selection } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const ContentCars = () => {
  const [loading, setLoading] = useState(false);
  const {
    getCars,
    transferCars,
    updatecargoing,
    updatecarreturn,
    idcargoing,
    idcarreturn,
    selected,
    origin,
    destination
  } = TransfersStore();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["1"]));
  const router = useRouter();
  const t = useTranslations("TransfersPage");


  useEffect(() => {
    // console.log(loading)
  }, [loading])
  

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      await getCars();
      updatecargoing("");
      updatecarreturn("");
      setLoading(false);
    };
    fetchHotels();

  }, [selected,origin,destination]);

  const onRedirect = () => {
    router.push(`/detailstransfers`);
  };

  return (
    <div className="w-full md:w-full">
      <div className="mb-6">
        
         {
          loading &&  <ModalLoading loading={loading} />
         }
      </div>
      <div>
        <Accordion selectedKeys={selectedKeys} className="">
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            startContent={
              <div className="text-start">
                <h2 className="text-2xl font-semibold ">
                {t("title")}
                </h2>
                <h2 className="text-medium font-medium text-gray-400">
                {transferCars.going.length}  {t("subtitile")}
                </h2>
              </div>
            }
          >
            <div className=" grid gap-5">
              {transferCars.going.length === 0 ? (
                <div className="col-span-full h-[300px] flex justify-center items-center">
                  <em>{t("empy")}</em>
                </div>
              ) : (
                transferCars.going.map((item) => (
                  <Car
                    key={item.carId}
                    item={item}
                    selected={setSelectedKeys}
                    updatetId={updatecargoing}
                  />
                ))
              )}
            </div>
          </AccordionItem>
          {transferCars.return && (
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              startContent={
                <div className="text-start">
                  <h2 className="text-2xl font-semibold ">
                  {t("title1")}
                  </h2>
                  <h2 className="text-medium font-medium text-gray-400">
                    {transferCars.going.length} {t("subtitile")}
                  </h2>
                </div>
              }
            >
              <div className=" grid gap-5">
                {transferCars.return.length === 0 ? (
                  <div className="col-span-full h-[300px] flex justify-center items-center">
                    <em>{t("empy")}</em>
                  </div>
                ) : (
                  transferCars.return.map((item) => (
                    <Car
                      key={item.carId}
                      item={item}
                      selected={setSelectedKeys}
                      updatetId={updatecarreturn}
                    />
                  ))
                )}
              </div>
            </AccordionItem>
          )}
        </Accordion>
      </div>
      <div className="grid mt-2">
        { selected=== 'Ida y vuelta' ?   idcargoing && idcarreturn && (
          <Button
            onPress={() => onRedirect()}
            className="bg-black text-white dark:bg-white dark:text-black"
            fullWidth
            size="lg"
          >
           {t("button")}
          </Button>
        ) :idcargoing && (
          <Button
            onPress={() => onRedirect()}
            fullWidth
            className="bg-black text-white dark:bg-white dark:text-black "
            size="lg"
          >
          {t("button")}
          </Button>) }
      </div>
    </div>
  );
};
