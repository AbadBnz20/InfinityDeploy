"use client";
import { Tabs, Tab } from "@nextui-org/react";
import { Reservation } from "./Reservation";
export const TapsMain = () => {
  return (
    <section className="container mx-auto -mt-[165px] relative z-10">
      <div className="bg-maincolor shadow-xl rounded-lg  py-2 px-4 flex w-full flex-col">
        <Tabs  size="lg" variant="light" aria-label="Options" >
          <Tab key="main" title="Hoteles">
            <div>
              <Reservation />
            </div>
          </Tab>
          <Tab key="ultimo" title="Semanas Ultimo Minuto">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.2222
            </div>
          </Tab>
          <Tab key="yates" title="Yates">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </Tab>
          <Tab key="vacacion" title="Planea vacacion">
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
