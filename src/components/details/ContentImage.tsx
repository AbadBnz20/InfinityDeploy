"use client";
import { SizeImage } from "@/helpers/SizeImage";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline, IoCloseOutline } from "react-icons/io5";

interface Props {
  images: Array<string>;
}
const translations = {
  es: {
    title: "imagenes",
   
  },
  en: {
    title: "photos",
   
  },
};

export const ContentImage = ({ images }: Props) => {
  const [mainImage, setMainImage] = useState(SizeImage(images[0], "1024x768"));
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const language = "es";
  const t = translations[language as keyof typeof translations];

  const openGallery = (index: number) => {
    setCurrentIndex(index)
    console.log(mainImage);
    setIsOpen(true)
  }

  const closeGallery = () => {
    setIsOpen(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
   <>
    <div className="space-y-4">
      <div className="grid grid-col-1  md:grid-cols-3 gap-4">
        <div className="col-span-2">
          {/* <img
            src={mainImage}
            alt="Main hotel view"
            className="w-full  h-[300px] md:h-[520px] object-cover rounded-lg"
          /> */}
          <div className="relative w-full h-[300px] md:h-[520px]">
            <img
               src={SizeImage(images[currentIndex] , "1024x768")}
              alt={`Large Image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <Button
              variant="light"
              isIconOnly
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-default/30"
              onPress={goToPrevious}
            >
            <IoChevronBackOutline/>
            </Button>
            <Button
              variant="light"
             isIconOnly
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white  bg-default/30"
              onPress={goToNext}
            >
               <IoChevronForwardOutline/>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1  gap-4">
          <img
            src={SizeImage(images[1], "x500")}
            alt="Secondary hotel view 1"
            className="w-full h-[150px]  md:h-[250px] object-cover rounded-lg cursor-pointer"
            onClick={() => setMainImage(SizeImage(images[1], "1024x768"))}
          />
          <img
            src={SizeImage(images[2], "x500")}
            alt="Secondary hotel view 2"
            className="w-full  h-[150px]  md:h-[250px] object-cover rounded-lg cursor-pointer"
            onClick={() => setMainImage(SizeImage(images[2], "1024x768"))}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {images.length <= 8
          ? images.slice(3, images.length).map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={SizeImage(img, "x500")}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer"
                  onClick={() => setMainImage(SizeImage(img, "1024x768"))}
                />
              </div>
            ))
          : images.slice(3, 8).map((img, index) => (
              <div key={index} className="relative group cursor-pointer">
                <img
                  src={SizeImage(img, "x500")}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer"
                  onClick={() => setMainImage(SizeImage(img, "1024x768"))}
                />
                {images.length >= 7 && index === 4 && (
                  <div onClick={() => openGallery(index)} className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg group-hover:bg-opacity-75 transition-all">
                    <span className="text-white font-semibold">{`+${images.length - 7} ${t.title}`}   </span>
                  </div>
                )}
              </div>
            ))}
      </div>
    </div>
    {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
          <div className="relative max-w-4xl w-full h-[calc(100vh-120px)]">
            <img
              src={SizeImage(images[currentIndex] , "1024x768")}
              alt={`Large Image ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
            <Button
              variant="light"
              isIconOnly
              className="absolute top-2 right-2 text-white"
              onPress={closeGallery}
            >
             <IoCloseOutline/>
            </Button>
            <Button
              variant="light"
              isIconOnly
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white"
              onPress={goToPrevious}
            >
            <IoChevronBackOutline/>
            </Button>
            <Button
              variant="light"
             isIconOnly
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
              onPress={goToNext}
            >
               <IoChevronForwardOutline/>
            </Button>
          </div>
          <div className="flex justify-center mt-4 space-x-2 overflow-x-auto max-w-4xl w-full">
            {images.map((src, index) => (
              <Button
                key={index}
                variant="light"
                className={`p-0 h-16 w-24 ${index === currentIndex ? 'ring-2 ring-primary' : ''}`}
                onPress={() => setCurrentIndex(index)}
              >
                <img src={SizeImage(src, "1024x768")} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </Button>
            ))}
          </div>
        </div>
      )}
   </>
  );
};
