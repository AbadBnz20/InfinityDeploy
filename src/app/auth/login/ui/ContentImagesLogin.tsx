'use client';
import React, { useEffect, useState } from 'react'

export const ContentImagesLogin = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const images = [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/30518861.jpg?k=ea4dc061719609f2348e7ee7df8cebc5c9a50c4e736c070f7dd882ac04cdea4d&o=&hp=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/3b/d9/48/un-hostal-muy-sencillo.jpg?w=700&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/bb/56/34/hotel-del-sol.jpg?w=700&h=-1&s=1"
    ]
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length)
      }, 5000)
      return () => clearInterval(interval)
    }, [])
  return (
    <div className="relative flex-1 hidden lg:block">
    {images.map((src, index) => (
      <div
        key={src}
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          index === currentImage ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${src})` }}
      />
    ))}
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <h1 className="text-4xl font-bold text-white">
        Hi, Welcome <span className="text-orange-500">Back</span>
      </h1>
    </div>
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {images.map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full ${
            index === currentImage ? 'bg-white' : 'bg-gray-400'
          }`}
        />
      ))}
    </div>
  </div>
  )
}
