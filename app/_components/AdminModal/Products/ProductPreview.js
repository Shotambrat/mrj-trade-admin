"use client";
import { useState } from "react";
import Image from "next/image";
import VerticalCarousel from "./VerticalCarousel";
import mindray from "@/public/images/aboutUs/partners/image41.png";
import ProductInfo from "./Modal/ProductInfo";

export default function ProductPreview({
  productGallery,
  setProductGallery,
  emptyProduct,
  setEmptyProduct,
}) {
  const [modal, setModal] = useState(false);

  const handleEditClick = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <div className="w-full flex flex-col gap-12 lg:flex-row p-12 overflow-y-scroll no-scrollbar">
      {modal && (
        <ProductInfo
          emptyProduct={emptyProduct}
          setEmptyProduct={setEmptyProduct}
          closeModal={handleCloseModal}
        />
      )}
      <div className="flex-1 w-full">
        <VerticalCarousel
          gallery={productGallery}
          setGallery={setProductGallery}
        />
      </div>
      <div className="w-full flex-1 flex flex-col gap-5">
        <div className="flex gap-4 max-lg:hidden">
          <h1 className="text-3xl font-semibold">{emptyProduct.name}</h1>
          {emptyProduct.tag.map((item, index) => (
            <div
              key={index}
              className="py-2 px-5 font-bold rounded-full text-greenView bg-greenCategory"
            >
              {item}
            </div>
          ))}
        </div>
        <p className="text-neutral-400 leading-5">
          {emptyProduct.shortDescription}
        </p>
        <hr />
        <div className="w-full flex justify-between items-center">
          <p className="w-full text-lg max-w-[250px] font-semibold leading-5">
            {emptyProduct.conditions}
          </p>
          {emptyProduct.brand.id === 0 ? (
            <div></div>
          ) : (
            <Image
              src={mindray}
              width={300}
              height={300}
              alt="Mindray"
              className="w-32 h-10"
            />
          )}
        </div>
        <div className="flex gap-4">
          <button
            className="px-24 py-4 text-sm font-semibold text-white rounded-xl bg-greenView"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}