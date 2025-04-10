import { Image } from "@nextui-org/react";
import React from "react";

const logos=[
  {
    src:"home/logos/logo1.png",
    id:1
  },
  {
    src:"home/logos/logo2.png",
    id:2
  },
  {
    src:"home/logos/logo3.png",
    id:3
  },
  {
    src:"home/logos/logo4.png",
    id:4
  },
  {
    src:"home/logos/logo5.png",
    id:5
  },
]

export const ScrollingBanner = () => {
  return (
    <div className="container mx-auto overflow-hidden whitespace-nowrap  my-[50px] grid justify-center">
      <div className="inline-block ">
        <div className="flex space-x-6 gap-5  items-center">
          {
            logos.map(item=>(
              <Image
              key={item.id}
              src={item.src}
              className="object-cover"
              width={150}
            />
            ))
          }
          
        </div>
      </div>
    </div>
  );
};
