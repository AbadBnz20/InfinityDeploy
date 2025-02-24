import React from "react";
import {
  ContentCardAttraction,
  ContentCardCars,
  ContentCardflights,
  ContentCardHotels,
} from "./ContentCardTrip";

export const ContentCardMain = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentCardflights />
        <ContentCardHotels />
        <ContentCardCars />
        <ContentCardAttraction />
      </div>
    </div>
  );
};
