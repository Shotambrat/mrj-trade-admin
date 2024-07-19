"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner from "@/public/images/main/banner.png";
import Image from "next/image";

// Custom Arrow Components
const LeftArrow = ({ onClick, hasPrev }) => (
  <button
    onClick={onClick}
    className={`${
      hasPrev ? "absolute" : "hidden"
    } top-1/2 z-10 left-4 transform -translate-y-1/2 bg-gray-500 rounded-full p-2 opacity-70 hover:opacity-100`}
    aria-label="Previous Slide"
  >
    <svg
      className="w-8 h-8 max-mdl:w-6 max-mdl:h-6 text-white"
      viewBox="-9 0 40 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2969 1.5625L1.85938 10L10.2969 18.4375M3.03125 10L20.1406 10"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
);

const RightArrow = ({ onClick, hasNext }) => (
  <button
    onClick={onClick}
    className={`${
      hasNext ? "absolute" : "hidden"
    } top-1/2 right-4 z-10 transform -translate-y-1/2 bg-gray-500 rounded-full p-2 opacity-70 hover:opacity-100`}
    aria-label="Next Slide"
  >

    <svg
      className="w-8 h-8 max-mdl:w-6 max-mdl:h-6 text-white"
      viewBox="-9 0 40 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.7031 1.5625L20.1406 10L11.7031 18.4375M18.9687 10L1.85937 10"
        stroke="white"
        stroke-width={2}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
);

const BannerCarousel = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto relative px-2">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <LeftArrow onClick={clickHandler} hasPrev={hasPrev} />
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <RightArrow onClick={clickHandler} hasNext={hasNext} />
        )}
        className="relative "
      >
        <div className="w-full relative ">
          <Image
            src={banner}
            width={1500}
            height={1500}
            alt="Surgical Equipment Banner"
            className="w-full h-full rounded-2xl z-0"
          />
        </div>
        <div className="w-full relative ">
          <Image
            src={banner}
            width={1500}
            height={1500}
            alt="Surgical Equipment Banner"
            className="w-full h-full rounded-2xl"
          />
        </div>
        <div className="w-full relative ">
          <Image
            src={banner}
            width={1500}
            height={1500}
            alt="Surgical Equipment Banner"
            className="w-full h-full rounded-2xl"
          />
        </div>
        <div className="w-full relative ">
          <Image
            src={banner}
            width={1500}
            height={1500}
            alt="Surgical Equipment Banner"
            className="w-full h-full rounded-2xl"
          />
        </div>
        {/* Add more slides as needed */}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
