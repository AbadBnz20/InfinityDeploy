import React from "react";
import ContentHotels from "./ContentHotels";
import { ContentFilter } from "./ContentFilter";
export const ContentMain = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <ContentFilter/>
        </aside>
        <div className="w-full md:w-3/4">
          <ContentHotels />
        </div>
      </div>
    </main>
  );
};
