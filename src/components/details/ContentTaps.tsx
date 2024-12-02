"use client";
import { DataDetails } from "@/interfaces/details-response";
import { Tab, Tabs } from "@nextui-org/react";
import { ContentAbout } from "./ContentAbout";
import { ContentServices } from "./ContentServices";
import { ContentRoom } from "./ContentRoom";
import { useRef } from "react";

interface Props {
  hotel: DataDetails;
  slug: string;
}

export const ContentTaps = ({ hotel, slug }: Props) => {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="flex flex-wrap gap-4  sticky top-0 z-40  bg-white dark:bg-black">
        <Tabs
          variant="underlined"
          onSelectionChange={(key) => {
            if (key === "photos") scrollToSection(section1Ref);
            if (key === "music") scrollToSection(section2Ref);
            if (key === "videos") scrollToSection(section3Ref);
          }}
          aria-label="Tabs variants"
        >
          <Tab key="photos" title="Alojamiento" className="p-3 md:p-10 " />
          <Tab key="music" title="Servicio" className="p-3 md:p-10" />
          <Tab key="videos" title="Habitaciones" className="p-3 md:p-10" />
          <Tab key="location" title="Ubicacion" className="p-3 md:p-10" />

        </Tabs>
      </div>
      <section ref={section1Ref}>
        {hotel.description_struct.length > 0 && (
          <ContentAbout struct={hotel.description_struct} />
        )}
      </section>
      <section ref={section2Ref}>
        {hotel.amenity_groups.length > 0 && (
          <ContentServices services={hotel.amenity_groups} />
        )}
      </section>

      <section ref={section3Ref}>
        <ContentRoom hotel={hotel} slug={slug} />
      </section>
    </>
  );
};
