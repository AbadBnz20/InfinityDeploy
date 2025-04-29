"use client";
import React from "react";
import { ContentRooms } from "./ContentRooms";
import { ContentFilterSeadust } from "./ContentFilterSeadust";

export const ContentMain = () => {
  return (
    <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full   md:w-1/4">
            <ContentFilterSeadust />
            </aside>
            <div className="w-full md:w-3/4">
            <ContentRooms />
            </div>
          </div>
        </main>
  );
};
