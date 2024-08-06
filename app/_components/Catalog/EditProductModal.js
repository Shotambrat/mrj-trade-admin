"use client";
import { useState, useEffect } from "react";

const formatNumber = (number) => {
  return new Intl.NumberFormat("ru-RU").format(Math.round(number));
};

export default function EditProductModal({ slug, onClose, onSave }) {
  const [product, setProduct] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    // Fetch product details
    fetch(`https://mrjtrade.uz/product/v2/${slug}`)
      .then((response) => response.json())
      .then((data) => setProduct(data.data));

    // Fetch brands
    fetch("http://213.230.91.55:8110/partner/get-all-partner-name")
      .then((response) => response.json())
      .then((data) => setBrands(data.data));

    // Fetch categories
    fetch("http://213.230.91.55:8110/category")
      .then((response) => response.json())
      .then((data) => setCategories(data.data.item));
  }, [slug]);

  useEffect(() => {
    if (product) {
      const selectedCategory = categories.find(
        (category) => category.title === product.category
      );
      setSubcategories(selectedCategory ? selectedCategory.catalog : []);
    }
  }, [product, categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(
      (category) => category.title === e.target.value
    );
    if (selectedCategory.catalog.length > 0) {
      setSubcategories(selectedCategory.catalog);
      setProduct({
        ...product,
        category: e.target.value,
        catalog: { id: selectedCategory.catalog[0].id },
        categoryItem: null,
      });
    } else {
      setSubcategories([]);
      setProduct({
        ...product,
        category: e.target.value,
        categoryItem: { id: selectedCategory.id },
        catalog: null,
      });
    }
  };

  const handleSubcategoryChange = (e) => {
    const selectedSubcategory = subcategories.find(
      (sub) => sub.name === e.target.value
    );
    setProduct({
      ...product,
      subcategory: e.target.value,
      catalog: { id: selectedSubcategory.id },
    });
  };

  const handleTagChange = (tag) => {
    const newTags = product.tag.includes(tag)
      ? product.tag.filter((t) => t !== tag)
      : [...product.tag.filter((t) => t !== "Promotion"), tag];
    setProduct({ ...product, tag: newTags });
  };

  const handleSave = async () => {
    try {
      const response = await fetch("https://mrjtrade.uz/product/v2", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Product updated successfully:", result);
      onSave(result.data);
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    const price = Math.min(parseFloat(value) || 0, 1e9);
    setProduct({ ...product, originalPrice: price });
  };

  const handleDiscountChange = (e) => {
    const { value } = e.target;
    const discount = Math.min(parseFloat(value) || 0, 100);
    const originalPrice = parseFloat(product.originalPrice) || 0;
    const discountPrice = originalPrice - (originalPrice * discount) / 100;
    setProduct({
      ...product,
      discount: discount,
      priceWithDiscount: discountPrice,
    });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 z-[10000] flex justify-center items-center bg-modalBg">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] lg:w-[60%] max-h-[95%] overflow-y-scroll no-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Product Info</h2>
          <button onClick={onClose}>Close</button>
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
            <select
              name="category"
              value={product.category}
              onChange={handleCategoryChange}
              className="border p-2 rounded w-full"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
          {product.catalog && subcategories.length > 0 && (
            <label>
              Product Subcategory
              <select
                name="subcategory"
                value={product.subcategory}
                onChange={handleSubcategoryChange}
                className="border p-2 rounded w-full"
              >
                {subcategories.map((sub) => (
                  <option key={sub.id} value={sub.name}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </label>
          )}
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
          {product.tag.includes("Promotion") && (
            <>
              <label>
                Amount of discount (%)
                <input
                  type="number"
                  name="discount"
                  value={product.discount || ""}
                  onChange={handleDiscountChange}
                  className="border p-2 rounded w-full"
                />
              </label>
              <label>
                Original price (у.е.)
                <input
                  type="number"
                  name="originalPrice"
                  value={product.originalPrice || ""}
                  onChange={handlePriceChange}
                  className="border p-2 rounded w-full"
                />
              </label>
              <label>
                Price with discount (у.е.)
                <input
                  type="text"
                  name="priceWithDiscount"
                  value={formatNumber(product.priceWithDiscount) || ""}
                  readOnly
                  className="border p-2 rounded w-full bg-gray-100"
                />
              </label>
            </>
          )}
          <label>
            Brand
            <select
              name="brand"
              value={product.brand.id}
              onChange={(e) =>
                setProduct({
                  ...product,
                  brand: {
                    id: Number(e.target.value),
                    ...brands.find(
                      (brand) => brand.id === Number(e.target.value)
                    ),
                  },
                })
              }
              className="border p-2 rounded w-full"
            >
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.title}
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
            Description
            <textarea
              name="description"
              value={product.description}
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
          <label>
            Characteristics
            <textarea
              name="characteristics"
              value={product.characteristics.map(c => `${c.parameterName}: ${c.description}`).join('\n')}
              readOnly
              className="border p-2 rounded w-full bg-gray-100"
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