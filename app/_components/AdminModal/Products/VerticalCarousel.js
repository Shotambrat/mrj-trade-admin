"use client";

import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import imageIcon from "@/public/svg/image-icon.svg";

const VerticalCarousel = ( {gallery, setGallery} ) => {
  const [selectedImage, setSelectedImage] = useState(0);
  

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      newImages.push(URL.createObjectURL(files[i]));
    }
    setGallery([...gallery, ...newImages]);
  };

  const handleImageDelete = (index) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  return (
    <div
      className={`flex flex-col ${
        gallery.length == 0 ? "gap-0 px-36 h-[300px]" : "gap-8"
      } w-full max-w-[1440px] mx-auto`}
    >
      <div
        className={`w-full h-full  ${
          gallery.length > 0 ? "" : "flex justify-center items-center"
        }`}
      >
        {gallery.length > 0 ? (
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
            {gallery.map((src, index) => (
              <div key={index} className="relative">
                <Image
                  src={src}
                  alt={`Slide ${index}`}
                  className="object-contain h-96 w-full border"
                  width={800}
                  height={600}
                />

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
              className="cursor-pointer text-greenView rounded-3xl h-full w-full flex flex-col gap-4 justify-center items-center border-2 border-greenView border-dashed"
            >
              <Image
                src={imageIcon}
                width={500}
                height={500}
                alt="Image Icon"
                className="w-12 h-12 "
              />
              <div className="px-8 py-3 rounded-xl bg-greenView text-white">
                Browse your file
              </div>
            </label>
          </div>
        )}
      </div>
      {gallery.length > 0 ? (
        <div className="w-full max-w-[550px] mt-4 flex justify-center h-[200px]">
          <Carousel
            selectedItem={selectedImage}
            onChange={(index) => setSelectedImage(index)}
            axis="horizontal"
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            // infiniteLoop={true}
            className="thumbnail-carousel"
            centerMode={true}
            centerSlidePercentage={20}
            swipeable={false}
            emulateTouch={true}
            showArrows={false}
          >
          <div className="w-full h-[80%] flex justify-center items-center">
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
              className="cursor-pointer text-greenView rounded-lg h-full w-full flex flex-col gap-4 justify-center items-center border-2 border-greenView border-dashed"
            >
              <Image
                src={imageIcon}
                width={500}
                height={500}
                alt="Image Icon"
                className="w-12 h-12 "
              />
            </label>
          </div>
            {gallery.map((src, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`cursor-pointer ml-2 relative h-[80%] rounded-xl ${
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
                                <button
                  onClick={() => handleImageDelete(index)}
                  className="absolute top-0 right-0 bg-greenView w-6 h-6 text-sm text-white rounded-full flex justify-center items-center"
                >
                  х
                </button>
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
