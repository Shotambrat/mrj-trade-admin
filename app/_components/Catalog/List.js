"use client";
import { useState, useEffect } from "react";
import CatalogList from "./CatalogBar";
import Catalogitem from "./Catalogitem";
import Dropdown from "./DropDown";
import Image from "next/image";
import Category from "../Modal/Category";
import ProductsMain from "../AdminModal/Products/ProductsMain";
import tableCatalog from "@/public/svg/table-catalog.svg";

export default function List({ categoryId, category, products, setProducts }) {
  const [categoryModal, setCategoryModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Fetch categories
    fetch("http://213.230.91.55:8110/category")
      .then((response) => response.json())
      .then((data) => setCategories(data.data.item))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCatalogSelect = (catalogId) => {
    fetch(`http://213.230.91.55:8110/product/v2/all?catalog-id=${catalogId}`)
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleCategorySelect = (categoryId) => {
    fetch(`http://213.230.91.55:8110/product/v2/all?category-id=${categoryId}`)
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredProducts = products.filter((product) => {
    if (filter === "new") return product.tag.includes("new");
    if (filter === "promotion") return product.tag.includes("promotion");
    return true;
  });

  const handleClose = () => {
    setCategoryModal(false);
  };

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
          <Dropdown onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="w-full flex gap-10 items-start">
        <div className="w-full max-w-[350px] max-2xl:max-w-[280px] max-lg:hidden">
          <CatalogList
            categories={categories}
            onCatalogSelect={handleCatalogSelect}
            onCategorySelect={handleCategorySelect}
            openSection={categoryId}
          />
        </div>
        <div className="w-full grid grid-cols-1 mdl:grid-cols-2 3xl:grid-cols-3 gap-4">
          {filteredProducts.map((item, index) => (
            <div key={index}>
              <Catalogitem
                new={item.tag.includes("new")}
                sale={item.discount ? `-${item.discount}%` : null}
                image={item.photo.url}
                title={item.name}
                description={item.shortDescription}
                price={item.originalPrice ? `${item.originalPrice} y.e` : null}
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
