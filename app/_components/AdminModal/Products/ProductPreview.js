"use client";
import { useState } from "react";
import Image from "next/image";
import VerticalCarousel from "./VerticalCarousel";
import ProductInfo from "./Modal/ProductInfo";
import ProductCharacteristics from "./ProductCharacteristics";

const formatNumber = (number) => {
  return new Intl.NumberFormat('ru-RU').format(Math.round(number));
};

export default function ProductPreview({
  productGallery,
  setProductGallery,
  activeProduct,
  updateCreatedList,
}) {
  const [modal, setModal] = useState(false);

  const handleEditClick = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  if (!activeProduct) return null;

  return (
    <div className="w-full flex flex-col p-12 overflow-y-scroll no-scrollbar">
      <div className="w-full flex gap-12 p-12">
        {modal && (
          <ProductInfo
            emptyProduct={activeProduct}
            setEmptyProduct={(product) => updateCreatedList(product)}
            closeModal={handleCloseModal}
            updateCreatedList={updateCreatedList}
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
            <h1 className="text-3xl font-semibold">{activeProduct.name}</h1>
            {activeProduct.tag.includes("New") && (
              <div className="py-2 px-5 font-bold rounded-full text-greenView bg-greenCategory">
                New
              </div>
            )}
          </div>
          <p className="text-neutral-400 leading-5">
            {activeProduct.shortDescription}
          </p>
          {activeProduct.tag.includes("Promotion") ? (
            <div className="flex items-start gap-6 text-lg">
              <div className="flex flex-col">
                <span className="text-greenView font-bold text-3xl ">
                  {formatNumber(activeProduct.priceWithDiscount)} ye
                </span>
                <span className="text-gray-500 line-through">
                  {formatNumber(activeProduct.originalPrice)} ye
                </span>
              </div>
              <span className="text-greenView bg-green-100 px-4 py-1 flex items-center rounded-full font-bold">
                -{activeProduct.discount}%
              </span>
            </div>
          ) : (
            <div className="text-lg text-green-500 font-bold">
              {/* {formatNumber(activeProduct.priceWithDiscount || activeProduct.originalPrice)} ye */}
            </div>
          )}
          <hr />
          <div className="w-full flex justify-between items-center">
            <p className="w-full text-lg max-w-[250px] font-semibold leading-5">
              {activeProduct.conditions}
            </p>
            {activeProduct.brand.id === 0 ? (
              <div></div>
            ) : (
              <Image
                src={activeProduct.brand.photo.url}
                width={300}
                height={300}
                alt={activeProduct.brand.title}
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
      <div className="mt-0">
        <ProductCharacteristics emptyProduct={activeProduct} setEmptyProduct={updateCreatedList} />
      </div>
    </div>
  );
}