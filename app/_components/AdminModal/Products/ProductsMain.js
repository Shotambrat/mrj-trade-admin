"use client";
import { useState } from "react";
import ProductPreview from "./ProductPreview";
import CreatedList from "./CreatedList";

export default function ProductsMain() {
  const [createdList, setCreatedList] = useState([]);
  const [canClose, setCanClose] = useState(true);
  const [idCount, setIdCount] = useState(1);
  const [emptyProduct, setEmptyProduct] = useState({
    id: idCount,
    name: "",
    tag: [],
    description: "",
    discount: null,
    originalPrice: 0,
    conditions: "",
    brand: {
      id: 1,
    },
    catalog: {
      id: 1,
    },
    characteristics: [
      {
        parameterName: "",
        description: "",
      },
    ],
    mainPhoto: null,
    gallery: [],
  });

  return (
    <div className="fixed inset-0 z-[9999] h-screen w-screen bg-white flex ">
        <CreatedList />
        <ProductPreview />
    </div>
  );
}
