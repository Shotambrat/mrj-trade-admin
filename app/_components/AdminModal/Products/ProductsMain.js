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
    name: "Title",
    tag: ["new"],
    description: "Full product description",
    shortDescription: "Short description",
    discount: null,
    originalPrice: null,
    conditions: "Technical support",
    brand: {
      id: 0,
    },
    catalog: {
      id: 0,
    },
    characteristics: [
      {
        parameterName: "Parameter Name",
        description: "Description",
      },
    ],
  });
  const [productGallery, setProductGallery] = useState([]);

  return (
    <div className="fixed inset-0 z-[9999] h-screen w-screen bg-white flex">
      <CreatedList />
      <ProductPreview
        productGallery={productGallery}
        setProductGallery={setProductGallery}
        emptyProduct={emptyProduct}
        setEmptyProduct={setEmptyProduct}
      />
    </div>
  );
}