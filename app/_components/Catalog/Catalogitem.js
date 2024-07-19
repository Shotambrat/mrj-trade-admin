"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GreenArrow from "../Buttons/GreenArrow";
import fav from "@/public/svg/main/fav.svg"
import favFilled from "@/public/svg/main/fav-filled.svg"

export default function Catalogitem({ new: isNew, sale, image, title, description, price, slug }) {

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(item => item.slug === slug));
  }, [slug]);

  const handleFavoriteToggle = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      favorites = favorites.filter(item => item.slug !== slug);
    } else {
      favorites.push({ title, description, image, price, slug });
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="h-[450px] w-full">
      <div className="border border-neutral-300 rounded-2xl p-4 pt-8 flex flex-col h-full relative">
        <div className="absolute top-2 left-2 flex gap-1">
          {isNew && (
            <div className="py-1 px-2 font-semibold rounded-full text-xs text-greenView bg-green-100">
              New
            </div>
          )}
          {sale && (
            <div className="py-1 px-2 font-semibold rounded-full text-xs text-red-500 bg-red-100">
              {sale}
            </div>
          )}
        </div>
        <div onClick={handleFavoriteToggle} className="absolute top-4 right-4">
          <Image
            src={isFavorite ? favFilled : fav}
            width={100}
            height={100}
            alt="Favorite Icon"
            className="w-5 h-5 max-mdx:w-8 max-mdx:h-8"
          />
        </div>
        <div className="w-full h-[300px] flex items-center justify-center overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
            className="object-contain w-full h-full"
          />
        </div>
        <h3 className="text-md font-semibold mt-3">{title}</h3>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
        <div className="flex w-full justify-between items-center flex-wrap mt-3">
          <Link href={`/product/${slug}`}>
            <GreenArrow title={"more details"} />
          </Link>
          {price && (
            <div className="py-1 px-2 font-semibold rounded-full text-greenView">
              {price}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}