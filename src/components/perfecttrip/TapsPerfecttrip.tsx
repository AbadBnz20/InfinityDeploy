"use client";
import { Button, Tab, Tabs } from "@nextui-org/react";
import React, { Key, useState } from "react";
import { ContentCardMain } from "./ContentCardMain";
import { ContentFormTrip } from "./ContentFormTrip";
import { ContentBudgetTrip } from "./ContentBudgetTrip";

export const TapsPerfecttrip = () => {
  const [selected, setSelected] = useState<string>("1");




 
  const handleSelectionChange = (key: Key) => {
    if (key) {
      setSelected(key.toString());
    }
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs
        size="lg"
        aria-label="Options"
       
        selectedKey={selected}
      >
        <Tab key="1" title="Paso 1">
          <div>
            <ContentCardMain />
            <ContentButton onchange={handleSelectionChange} next="2" prev="1" />
          </div>
        </Tab>
        <Tab key="2" title="Paso 2">
          <div>
            <ContentFormTrip onchange={handleSelectionChange} />
          </div>
        </Tab>
        <Tab key="3" title="Paso 3">
          <div>
            <ContentBudgetTrip onchange={handleSelectionChange} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

interface Props {
  next: string;
  prev: string;
  onchange: (key: Key) => void;
}

const ContentButton = ({ next, prev, onchange }: Props) => {
  return (
    <div className="w-full flex justify-end gap-3">
      <Button onPress={() => onchange(prev as Key)} variant="light">
        Anterior
      </Button>
      <Button onPress={() => onchange(next as Key)} variant="flat" >
        Siguiente
      </Button>
    </div>
  );
};
