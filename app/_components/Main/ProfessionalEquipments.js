"use client";

import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mindrayDC60 from "@/public/images/equipments/equip-lab.png"; // Пример изображения, замените на ваши изображения
import mindraySV300 from "@/public/images/equipments/equip-uzi.png"; // Пример изображения, замените на ваши изображения
import cl900i from "@/public/images/equipments/equip-lab.png"; // Пример изображения, замените на ваши изображения
import mindrayUniBase from "@/public/images/equipments/equip-uzi.png"; // Пример изображения, замените на ваши изображения
import mindrayBeneHeart from "@/public/images/equipments/equip-lab.png"; // Пример изображения, замените на ваши изображения
import Link from "next/link";
import GreenArrow from "@/app/_components/Buttons/GreenArrow";
import Catalogitem from "../Catalog/Catalogitem";

const equipmentData = [
  {
    title: "MINDRAY DC 60 X-insight",
    description:
      "A high-end ultrasound scanner that allows for high-quality diagnostics",
    image: mindrayDC60,
    new: false,
    promotions: true,
    price: "2500000 y.e",
    sale: "-35%",
    slug: "1-mindray",
  },
  {
    title: "MINDRAY SV300",
    description:
      "Advanced solution for mechanical ventilation in clinical settings",
    image: mindraySV300,
    new: true,
    promotions: false,
    slug: "2-mindray",
  },
  {
    title: "CL-900i",
    description:
      "One of the smallest fully automated chemiluminescent immunoassay analyzers",
    image: cl900i,
    new: true,
    promotions: false,
    sale: "-5%",
    slug: "1-cl",
  },
  {
    title: "MINDRAY UniBase 30",
    description: "Reliable and durable operating table at an affordable price",
    image: mindrayUniBase,
    new: true,
    promotions: false,
    slug: "2-mindray",
  },
  {
    title: "MINDRAY BeneHeart",
    description: "Mindray’s new solution for non-invasive electrocardiography",
    image: mindrayBeneHeart,
    new: false,
    promotions: true,
    price: "2500 y.e",
    sale: "-5%",
    slug: "4-mindray",
  },
  {
    title: "MINDRAY DC 60 X-insight",
    description:
      "A high-end ultrasound scanner that allows for high-quality diagnostics",
    image: mindrayDC60,
    new: false,
    promotions: true,
    price: "2500 y.e",
    sale: "-55%",
    slug: "5-mindray",
  },
  {
    title: "MINDRAY SV300",
    description:
      "Advanced solution for mechanical ventilation in clinical settings",
    image: mindraySV300,
    new: true,
    promotions: false,
    slug: "6-mindray",
  },
  {
    title: "CL-900i",
    description:
      "One of the smallest fully automated chemiluminescent immunoassay analyzers",
    image: cl900i,
    new: true,
    promotions: false,
    slug: "2-cl",
  },
  {
    title: "MINDRAY UniBase 30",
    description: "Reliable and durable operating table at an affordable price",
    image: mindrayUniBase,
    new: true,
    promotions: false,
    slug: "7-mindray",
  },
  {
    title: "MINDRAY BeneHeart",
    description: "Mindray’s new solution for non-invasive electrocardiography",
    image: mindrayBeneHeart,
    new: false,
    promotions: true,
    price: "2500 y.e",
    sale: "-25%",
    slug: "8-mindray",
  },
];

const categories = [
  {
    title: "All Equipment",
    slug: "all",
  },
  {
    title: "New Items",
    slug: "new",
  },
  {
    title: "Promotions",
    slug: "promotions",
  },
];

const EquipmentCarousel = () => {
  const [filteredData, setFilteredData] = useState(equipmentData);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredData(equipmentData);
    } else if (category === "new") {
      setFilteredData(equipmentData.filter((item) => item.new));
    } else if (category === "promotions") {
      setFilteredData(equipmentData.filter((item) => item.promotions));
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto flex flex-col gap-8 px-2">
      <h2 className="text-3xl max-mdx:text-2xl font-bold">
        PROFESSIONAL MEDICAL EQUIPMENT
      </h2>
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2 overflow-x-scroll no-scrollbar">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category.slug)}
              className={`text-sm font-semibold px-4 py-2 whitespace-nowrap transition-all duration-200 rounded-full ${
                selectedCategory === category.slug
                  ? "bg-greenView text-white"
                  : "text-gray-600 bg-slate-100 hover:bg-greenView hover:text-white"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
        <div className="w-full px-4">
          <Slider {...settings} className="h-auto flex">
            {filteredData.map((item, index) => (
              <div key={index} className="p-2">
                <Catalogitem
                  new={item.new}
                  sale={item.sale}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  slug={item.slug}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Link
          href="/categories"
          className="border border-greenView rounded-xl px-12 py-3"
        >
          <GreenArrow title={"All products"} />
        </Link>
      </div>
    </section>
  );
};

export default EquipmentCarousel;
