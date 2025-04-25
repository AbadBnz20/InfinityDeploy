'use client';
import { Image } from "@nextui-org/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const logos=[
  {
    src:"home/logos/logo1.png",
    id:1
  },
  {
    src:"home/logos/logo2dark.png",
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

const logosdark=[
  {
    src:"home/logos/logo1dark.png",
    id:1
  },
  {
    src:"home/logos/logo2dark.png",
    id:2
  },
  
  {
    src:"home/logos/logo3.png",
    id:4
  },
  {
    src:"home/logos/logo4dark.png",
    id:5
  },
  {
    src:"home/logos/logo5.png",
    id:6
  },
]



export const ScrollingBanner = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  return (
    <div className="container mx-auto overflow-hidden whitespace-nowrap my-[50px] grid justify-center">
      <div className="inline-block">
        <div className="flex space-x-6 gap-5 items-center">
          {(theme === "dark" ? logosdark : logos).map((logo) => (
            <Image
              key={logo.id}
              src={logo.src}
              alt="Logo"
             
              width={150}
             
            />
          ))}
        </div>
      </div>
    </div>
  );
};
