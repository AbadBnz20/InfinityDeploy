import React from "react";
import ContentHotels from "./ContentHotels";
import { ContentFilter } from "./ContentFilter";
import { StartFilter } from "./StartFilter";
import { SerpFilter } from "./SerpFilter";
import { FilterDrawer } from "./FilterDrawer";
interface Props {
  discount:number;
}
export const ContentMain = ({discount}:Props) => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-2 block lg:hidden ">
      <FilterDrawer />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full  hidden lg:block  md:w-1/4">
          <ContentFilter />
          <StartFilter />
          <SerpFilter />
        </aside>
        <div className="w-full md:w-3/4">
          <ContentHotels discount={discount} />
        </div>
      </div>
    </main>
  );
};
