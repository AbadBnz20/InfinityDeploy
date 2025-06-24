"use client";
import { Tabs, Tab } from "@nextui-org/react";

import { useLocale, useTranslations } from "next-intl";
import { LuHotel, LuShip } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { IoSwapHorizontalOutline } from "react-icons/io5";
import { Transfers } from "./Transfers";
import { PiAirplaneTakeoffLight } from "react-icons/pi";
import { Ships } from "./Ships";
import { MyTrip } from "./MyTrip";
import { Key, useState } from "react";
import { TapsStore } from "@/store/TapsMainStore";
import { Seadust } from "./Seadust";
import { Reservation } from "./Reservation";
export const TapsMain = () => {
  const t = useTranslations("TapsMain");
  const [selected, setSelected] = useState("");
  const locale = useLocale();
  const languaje =
    locale === "en"
      ? "https://www.mywebrezvacations.com/travser"
      : "https://www.mywebrezlatino.com/travser";

  const { SetYahtsData } = TapsStore();

  const onChange = (e: Key) => {
    if (e === "saving") {
      window.open("https://www.rcihotelsavings.com/v6/register", "_blank");
      return;
    }
    if (e === "ultimo") {
        window.open(languaje, "_blank");
      return;
    }
    setSelected(e.toString());
    SetYahtsData(e.toString());
  };
  return (
    <section className="container mx-auto -mt-[165px] relative z-10">
      <div className="bg-maincolor shadow-xl rounded-lg  py-2 px-4 flex w-full flex-col">
        <Tabs
          size="lg"
          variant="light"
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={onChange}
        >
          <Tab
            key="seadust"
            title={
              <div className="flex items-center space-x-2">
                <span> {t("option4")}</span>
              </div>
            }
          >
            <div>
              <Seadust />
            </div>
          </Tab>
          <Tab
            key="mytrip"
            title={
              <div className="flex items-center space-x-2">
                <PiAirplaneTakeoffLight size={24} />
                <span>{t("option6")}</span>
              </div>
            }
          >
            <MyTrip />
          </Tab>

          <Tab
            key="ultimo"
            title={
              <div className="flex items-center space-x-2">
                <FaRegClock size={24} />
                <a href={languaje} target="_blank" rel="noopener noreferrer">
                  <span>{t("option2")}</span>
                </a>
              </div>
            }
          >
            {/* <WeekMinute/> */}
          </Tab>
          <Tab
            key="saving"
            title={
              <a
                href="https://www.rcihotelsavings.com/v6/register"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 "
              >
                Saving
              </a>
            }
          >
          
          </Tab>
          <Tab
            key="yates"
            title={
              <div className="flex items-center space-x-2">
                <LuShip size={24} />
                <span>{t("option3")}</span>
              </div>
            }
          >
            <Ships />
          </Tab>
          <Tab
            key="traslados"
            title={
              <div className="flex items-center space-x-2">
                <IoSwapHorizontalOutline size={24} />
                <span>{t("option5")}</span>
              </div>
            }
          >
            <Transfers />
          </Tab>
          <Tab
            key="main"
            title={
              <div className="flex items-center space-x-2">
                <LuHotel size={24} />
                <span>{t("option1")}</span>
              </div>
            }
          >
            <div>
              <Reservation />
            </div>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};
