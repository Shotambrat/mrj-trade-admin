"use client";
import { useState } from "react";

const brands = [
  { id: 0, name: "Mindray" },
  { id: 1, name: "Brand A" },
  { id: 2, name: "Brand B" },
];

export default function ProductInfo({
  emptyProduct,
  setEmptyProduct,
  closeModal,
}) {
  const [product, setProduct] = useState(emptyProduct);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSave = () => {
    setEmptyProduct(product);
    closeModal();
  };

  const handleTagChange = (tag) => {
    const newTags = product.tag.includes(tag)
      ? product.tag.filter((t) => t !== tag)
      : [...product.tag, tag];
    setProduct({ ...product, tag: newTags });
  };

  return (
    <div className="fixed inset-0 z-[10000] flex justify-center items-center bg-modalBg">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] lg:w-[60%]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Product Info</h2>
          <button onClick={closeModal}>Close</button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <label>
            Product Name
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <label>
            Product Category
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <label>
            Product Subcategory
            <input
              type="text"
              name="subcategory"
              value={product.subcategory}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <label>
            Tag
            <div className="flex gap-2">
              <button
                onClick={() => handleTagChange("New")}
                className={`py-2 px-4 rounded ${
                  product.tag.includes("New")
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                New
              </button>
              <button
                onClick={() => handleTagChange("Promotion")}
                className={`py-2 px-4 rounded ${
                  product.tag.includes("Promotion")
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Promotion
              </button>
            </div>
          </label>
          <label>
            Brand
            <select
              name="brand"
              value={product.brand.id}
              onChange={(e) =>
                setProduct({
                  ...product,
                  brand: { id: Number(e.target.value) },
                })
              }
              className="border p-2 rounded w-full"
            >
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Short Description
            <textarea
              name="shortDescription"
              value={product.shortDescription}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <label>
            Conditions
            <input
              type="text"
              name="conditions"
              value={product.conditions}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </label>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="py-2 px-6 bg-green-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
} 