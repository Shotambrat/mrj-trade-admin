"use client";
import List from '@/app/_components/Catalog/List';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const { slug } = useParams();
  const router = useRouter();
  const [categoryId, setCategoryId] = useState(null);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the category details to get the category ID
    fetch("http://213.230.91.55:8110/category")
      .then((response) => response.json())
      .then((data) => {
        const category = data.data.item.find((cat) => cat.slug === slug);
        if (category) {
          setCategoryId(category.id);
          setCategory(category);

          // Fetch products by category ID
          fetch(`http://213.230.91.55:8110/product/v2/all?category-id=${category.id}`)
            .then((response) => response.json())
            .then((data) => setProducts(data.data))
            .catch((error) => {
              console.error("Error fetching products:", error);
              router.push('/404'); // Redirect to 404 page on error
            });
        } else {
          router.push('/404'); // Redirect to 404 page if category not found
        }
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
        router.push('/404'); // Redirect to 404 page on error
      });
  }, [slug, router]);

  if (categoryId === null) {
    return <div>Loading...</div>; // Show a loading state until the category is fetched
  }

  return (
    <div className='w-full bg-white flex flex-col py-24'>
      <List categoryId={categoryId} category={category} products={products} setProducts={setProducts} />
    </div>
  );
}