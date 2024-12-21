"use client";
import { Tabs, Tab } from "@nextui-org/react";
import { Reservation } from "./Reservation";
import { useTranslations } from "next-intl";
import { LuHotel,LuShip  } from "react-icons/lu";
import { FaRegClock, FaRegPaperPlane } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
export const TapsMain = () => {
  const t = useTranslations("TapsMain");
  return (
    <section className="container mx-auto -mt-[165px] relative z-10">
      <div className="bg-maincolor shadow-xl rounded-lg  py-2 px-4 flex w-full flex-col">
        <Tabs size="lg" variant="light" aria-label="Options">
          <Tab
            key="main"
            title={
              <div className="flex items-center space-x-2">
                <LuHotel />
                <span>{t("option1")}</span>
              </div>
            }
          >
            <div>
              <Reservation />
            </div>
          </Tab>
          <Tab key="traslados" title={
               <div className="flex items-center space-x-2">
               <IoCarSportOutline  />
               <span>{t("option5")}</span>
             </div>
            }>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.2222
            </div>
          </Tab>
          <Tab key="ultimo" title={
               <div className="flex items-center space-x-2">
               <FaRegClock  />
               <span>{t("option2")}</span>
             </div>
            }>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.2222
            </div>
          </Tab>
          <Tab key="yates" title={
               <div className="flex items-center space-x-2">
               <LuShip  />
               <span>{ t("option3")}</span>
             </div>
           }>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </Tab>
          <Tab key="vacacion" title={
            <div className="flex items-center space-x-2">
            <FaRegPaperPlane/>
            <span>{ t("option4")}</span>
          </div>
            }>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </Tab>
          <Tab
            key="seadust"
            title={
              <div className="flex items-center space-x-2">
                <a href="https://infinityluxurytravelclub.com/" target="_blank">
                  Seadust
                </a>
              </div>
            }
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};
