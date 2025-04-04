import React from "react";
import { ContentCars } from "./ContentCars";
import { ContentFilterTransfer } from "./ContentFilterTransfer";

export const ContentTransfer = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full   md:w-1/4">
         <ContentFilterTransfer/>
        </aside>
        <div className="w-full md:w-3/4">
         <ContentCars/>
        </div>
      </div>
    </main>
  );
};
