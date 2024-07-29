"use client";
import List from '@/app/_components/Catalog/List';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const { slug } = useParams();
  const router = useRouter();
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    // Fetch the category details to get the category ID
    fetch("http://213.230.91.55:8110/category")
      .then((response) => response.json())
      .then((data) => {
        const category = data.data.item.find((cat) => cat.slug === slug);
        if (category) {
          setCategoryId(category.id);
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
      <List categoryId={categoryId} />
    </div>
  );
}