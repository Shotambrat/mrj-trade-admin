"use client";
import { useState } from "react";

import CatalogList from "./CatalogBar";
import mindrayDC60 from "@/public/images/equipments/equip-lab.png"; // Пример изображения, замените на ваши изображения
import mindraySV300 from "@/public/images/equipments/equip-uzi.png"; // Пример изображения, замените на ваши изображения
import cl900i from "@/public/images/equipments/equip-lab.png"; // Пример изображения, замените на ваши изображения
import mindrayUniBase from "@/public/images/equipments/equip-uzi.png"; // Пример изображения, замените на ваши изображения
import mindrayBeneHeart from "@/public/images/equipments/equip-lab.png"; // Пример изображения, замените на ваши изображения
import Catalogitem from "./Catalogitem";
import Dropdown from "./DropDown";
import tableCatalog from "@/public/svg/table-catalog.svg";
import Image from "next/image";
import Category from "../Modal/Category";
import ProductsMain from "../AdminModal/Products/ProductsMain";

export default function List() {
  const [categoryModal, setCategoryModal] = useState(false);

  const data = [
    {
      category: "1-ultrasound-diagnostic-systems",
      caltalogList: [
        {
          catalog: "4-portable",
          data: [
            {
              title: "MINDRAY DC 60 X-insight",
              description: "A high-end ultrasound scanner that allows for high-quality diagnostics",
              image: mindrayDC60,
              new: false,
              promotions: true,
              price: '2500000 y.e',
              sale: '-35%',
              slug: '1-mindray',
            },
            {
              title: "MINDRAY SV300",
              description: "Advanced solution for mechanical ventilation in clinical settings",
              image: mindraySV300,
              new: true,
              promotions: false,
              slug: '2-mindray',
            },
            {
              title: "CL-900i",
              description: "One of the smallest fully automated chemiluminescent immunoassay analyzers",
              image: cl900i,
              new: true,
              promotions: false,
              sale: '-5%',
              slug: '1-cl',
            },
            {
              title: "MINDRAY UniBase 30",
              description: "Reliable and durable operating table at an affordable price",
              image: mindrayUniBase,
              new: true,
              promotions: false,
              slug: '2-mindray',
            },
            {
              title: "MINDRAY BeneHeart",
              description: "Mindray’s new solution for non-invasive electrocardiography",
              image: mindrayBeneHeart,
              new: false,
              promotions: true,
              price: '2500 y.e',
              sale: '-5%',
              slug: '4-mindray',
            },
            {
              title: "MINDRAY DC 60 X-insight",
              description: "A high-end ultrasound scanner that allows for high-quality diagnostics",
              image: mindrayDC60,
              new: false,
              promotions: true,
              price: '2500 y.e',
              sale: '-55%',
              slug: '5-mindray',
            },
            {
              title: "MINDRAY SV300",
              description: "Advanced solution for mechanical ventilation in clinical settings",
              image: mindraySV300,
              new: true,
              promotions: false,
              slug: '6-mindray',
            },
            {
              title: "CL-900i",
              description: "One of the smallest fully automated chemiluminescent immunoassay analyzers",
              image: cl900i,
              new: true,
              promotions: false,
              slug: '2-cl',
            },
            {
              title: "MINDRAY UniBase 30",
              description: "Reliable and durable operating table at an affordable price",
              image: mindrayUniBase,
              new: true,
              promotions: false,
              slug: '7-mindray',
            },
            {
              title: "MINDRAY BeneHeart",
              description: "Mindray’s new solution for non-invasive electrocardiography",
              image: mindrayBeneHeart,
              new: false,
              promotions: true,
              price: '2500 y.e',
              sale: '-25%',
              slug: '8-mindray',
            },
          ],
        },
        {
          catalog: "2-stationary",
          data: [
            {
              title: "MINDRAY DC 60 X-insight",
              description:
                "A high-end ultrasound scanner that allows for high-quality diagnostics",
              image: mindrayDC60,
              new: false,
              promotions: true,
              price: "2500 y.e",
              sale: "-55%",
            },
            {
              title: "MINDRAY SV300",
              description:
                "Advanced solution for mechanical ventilation in clinical settings",
              image: mindraySV300,
              new: true,
              promotions: false,
            },
            {
              title: "CL-900i",
              description:
                "One of the smallest fully automated chemiluminescent immunoassay analyzers",
              image: cl900i,
              new: true,
              promotions: false,
            },
            {
              title: "MINDRAY UniBase 30",
              description:
                "Reliable and durable operating table at an affordable price",
              image: mindrayUniBase,
              new: true,
              promotions: false,
            },
            {
              title: "MINDRAY BeneHeart",
              description:
                "Mindray’s new solution for non-invasive electrocardiography",
              image: mindrayBeneHeart,
              new: false,
              promotions: true,
              price: "2500 y.e",
              sale: "-25%",
            },
          ],
        },
      ],
    },
    {
      category: "2-laboratory-equipment",
      caltalogList: [
        {
          catalog: "3-portable",
          data: [
            {
              title: "MINDRAY DC 60 X-insight",
              description:
                "A high-end ultrasound scanner that allows for high-quality diagnostics",
              image: mindrayDC60,
              new: false,
              promotions: true,
              price: "2500000 y.e",
              sale: "-35%",
            },
            {
              title: "MINDRAY SV300",
              description:
                "Advanced solution for mechanical ventilation in clinical settings",
              image: mindraySV300,
              new: true,
              promotions: false,
            },
            {
              title: "CL-900i",
              description:
                "One of the smallest fully automated chemiluminescent immunoassay analyzers",
              image: cl900i,
              new: true,
              promotions: false,
              sale: "-5%",
            },
            {
              title: "MINDRAY UniBase 30",
              description:
                "Reliable and durable operating table at an affordable price",
              image: mindrayUniBase,
              new: true,
              promotions: false,
            },
            {
              title: "MINDRAY BeneHeart",
              description:
                "Mindray’s new solution for non-invasive electrocardiography",
              image: mindrayBeneHeart,
              new: false,
              promotions: true,
              price: "2500 y.e",
              sale: "-5%",
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
            },
            {
              title: "MINDRAY SV300",
              description:
                "Advanced solution for mechanical ventilation in clinical settings",
              image: mindraySV300,
              new: true,
              promotions: false,
            },
            {
              title: "CL-900i",
              description:
                "One of the smallest fully automated chemiluminescent immunoassay analyzers",
              image: cl900i,
              new: true,
              promotions: false,
            },
            {
              title: "MINDRAY UniBase 30",
              description:
                "Reliable and durable operating table at an affordable price",
              image: mindrayUniBase,
              new: true,
              promotions: false,
            },
            {
              title: "MINDRAY BeneHeart",
              description:
                "Mindray’s new solution for non-invasive electrocardiography",
              image: mindrayBeneHeart,
              new: false,
              promotions: true,
              price: "2500 y.e",
              sale: "-25%",
            },
            {
              title: "MINDRAY SV300",
              description:
                "Advanced solution for mechanical ventilation in clinical settings",
              image: mindraySV300,
              new: true,
              promotions: false,
            },
            {
              title: "CL-900i",
              description:
                "One of the smallest fully automated chemiluminescent immunoassay analyzers",
              image: cl900i,
              new: true,
              promotions: false,
            },
            {
              title: "MINDRAY UniBase 30",
              description:
                "Reliable and durable operating table at an affordable price",
              image: mindrayUniBase,
              new: true,
              promotions: false,
            },
            {
              title: "MINDRAY BeneHeart",
              description:
                "Mindray’s new solution for non-invasive electrocardiography",
              image: mindrayBeneHeart,
              new: false,
              promotions: true,
              price: "2500 y.e",
              sale: "-25%",
            },
          ],
        },
      ],
    },
    {
      category: "2-laboratory-equipment",
      data: [
        {
          title: "MINDRAY BeneHeart",
          description:
            "Mindray’s new solution for non-invasive electrocardiography",
          image: mindrayBeneHeart,
          new: false,
          promotions: true,
          price: "2500 y.e",
          sale: "-5%",
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
        },
        {
          title: "MINDRAY SV300",
          description:
            "Advanced solution for mechanical ventilation in clinical settings",
          image: mindraySV300,
          new: true,
          promotions: false,
        },
      ],
    },
  ];

  const [productModal, setProductModal] = useState(false)

  const handleClose = () => {
    setCategoryModal(false);
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:gap-20 gap-5 px-2">
      {productModal && <ProductsMain setProductModal={setProductModal} />}
      {categoryModal && <Category handleClose={handleClose} />}
      <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-5">
        <h1 className="text-3xl max-mdx:text2xl font-semibold">CATALOG</h1>
        <div className="z-10 flex gap-5 items-center">
          <button
            onClick={() => setCategoryModal(true)}
            className="px-4 py-3 rounded-xl bg-greenCategory gap-2 font-semibold backdrop-opacity-10 text-greenView flex items-center lg:hidden"
          >
            <Image
              src={tableCatalog}
              width={100}
              height={100}
              alt="Catalog Filter Icon"
              className="w-5 h-5"
            />
            Categories
          </button>
          <Dropdown />
        </div>
      </div>
      <div className="w-full flex gap-10">
        <div className="w-full max-w-[350px] max-2xl:max-w-[280px]  max-lg:hidden">
          <CatalogList />
        </div>
        <div className="w-full grid grid-cols-1 mdl:grid-cols-2 3xl:grid-cols-3 gap-4">
          {data[0].caltalogList[0].data.map((item, index) => (
            <div key={index}>
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
          <button onClick={() => setProductModal(true)} className="border-green-500 border-dashed border-4 flex justify-center items-center text-8xl text-green-500 font-bold">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
