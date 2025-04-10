"use client";
import { Button, Tab, Tabs } from "@nextui-org/react";
import React, { Key, useState } from "react";
import { ContentCardMain } from "./ContentCardMain";
import { ContentFormTrip } from "./ContentFormTrip";
import { ContentBudgetTrip } from "./ContentBudgetTrip";
import { useTranslations } from "next-intl";

export const TapsPerfecttrip = () => {
  const [selected, setSelected] = useState<string>("1");
 const t = useTranslations("MyperfectPage");
  const handleSelectionChange = (key: Key) => {
    if (key) {
      setSelected(key.toString());
    }
  };

  return (
    <>
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src="perfecttrip/header.jpg"
          alt="Family enjoying a luxury beach vacation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6 animate-fade-in-up text-white">
            {t("title")}
            </h1>
          </div>
        </div>
      </section>
      <div className="container mx-auto p-4 ">
        <div className="flex w-full flex-col ">
          <Tabs size="lg" color="primary" aria-label="Options" selectedKey={selected}   className="flex justify-center">
            <Tab key="1" title={t("step")}>
              <div>
                <ContentCardMain />
                <ContentButton
                  onchange={handleSelectionChange}
                  next="2"
                  prev="1"
                />
              </div>
            </Tab>
            <Tab key="2" title={t("step1")}>
              <div>
                <ContentFormTrip onchange={handleSelectionChange} />
              </div>
            </Tab>
            <Tab key="3" title={t("step2")}>
              <div>
                <ContentBudgetTrip onchange={handleSelectionChange} />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

interface Props {
  next: string;
  prev: string;
  onchange: (key: Key) => void;
}

const ContentButton = ({ next, onchange }: Props) => {
  const t = useTranslations("MyperfectPage");
  return (
    <div className="w-full flex justify-end gap-3">
      {/* <Button onPress={() => onchange(prev as Key)} variant="light">
        Anterior
      </Button> */}
      <Button size="lg" className="w-[50%]" onPress={() => onchange(next as Key)} variant="flat">
      {t("buttonStepnext")}
      </Button>
    </div>
  );
};
