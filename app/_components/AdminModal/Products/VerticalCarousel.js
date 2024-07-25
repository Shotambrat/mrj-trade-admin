"use client";

import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import mindrayDC60 from "@/public/images/equipments/equip-lab.png";
import mindraySV300 from "@/public/images/equipments/equip-uzi.png";
import cl900i from "@/public/images/equipments/equip-lab.png";
import mindrayBeneHeart from "@/public/images/equipments/equip-lab.png";

const VerticalCarousel = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [images, setImages] = useState([
    mindraySV300,
    mindrayDC60,
    mindrayBeneHeart,
    cl900i,
  ]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      newImages.push(URL.createObjectURL(files[i]));
    }
    setImages([...images, ...newImages]);
  };

  const handleImageDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className={`flex flex-col ${images.length == 0 ? 'gap-0 px-36 h-[300px]' : 'gap-8'} w-full max-w-[1440px] mx-auto`}>
      <div className={`w-full h-full  ${images.length > 0 ? '' : 'flex justify-center items-center'}`}>
        {images.length > 0 ? (
          <Carousel
            selectedItem={selectedImage}
            onChange={(index) => setSelectedImage(index)}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            infiniteLoop={true}
            useKeyboardArrows={true}
            className="main-carousel"
            showArrows={false}
          >
            {images.map((src, index) => (
              <div key={index} className="relative">
                <Image
                  src={src}
                  alt={`Slide ${index}`}
                  className="object-contain h-96 w-full"
                  width={800}
                  height={600}
                />
                <button
                  onClick={() => handleImageDelete(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                >
                  X
                </button>
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer text-greenView rounded-3xl h-full w-full flex justify-center items-center border-2 border-greenView border-dashed"
            >
              
            </label>
          </div>
        )}
      </div>
      {images.length > 0 ? (
        <div className="w-full max-w-[550px] mt-4 flex justify-center h-[200px]">
          <Carousel
            selectedItem={selectedImage}
            onChange={(index) => setSelectedImage(index)}
            axis="horizontal"
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            infiniteLoop={true}
            className="thumbnail-carousel"
            centerMode={true}
            centerSlidePercentage={20}
            swipeable={false}
            emulateTouch={true}
            showArrows={false}
          >
            {images.map((src, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`cursor-pointer ml-2 h-[60%] rounded-xl ${
                  selectedImage === index
                    ? "border-2 border-greenView"
                    : "border"
                }`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${index}`}
                  className="object-contain h-full rounded-xl w-full"
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default VerticalCarousel;



// <input
// type="file"
// multiple
// accept="image/*"
// onChange={handleImageUpload}
// className="hidden"
// id="image-upload"
// />
// <label
// htmlFor="image-upload"
// className="cursor-pointer text-greenView rounded p-4 border-2 border-greenView border-dashed"
// >
// +
// </label>