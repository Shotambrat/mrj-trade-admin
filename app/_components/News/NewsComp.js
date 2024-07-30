"use client";

import newsPhoto from "@/public/images/news/news-photo.png";
import NewCard from "@/app/_components/News/NewCard";
import Pagination from "@/app/_components/News/Pagination";
import NewsMain from "@/app/_components/AdminModal/News/NewsMain";
import Link from "next/link";
import { useState } from "react";

export default function NewsComp() {
  const data = [
    {
      title: "The Future of Telemedicine and Remote Patient Monitoring",
      date: "12 June",
      imageSrc: newsPhoto,
      slug: "telemedicine",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [newsModal, setNewsModal] = useState(false);
  const itemsPerPage = 12; // Количество новостей на одной странице

  // Определим индексы новостей, которые нужно отображать на текущей странице
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8 my-[120px] mdx:my-[200px] 2xl:my-[250px]">
      {newsModal && <NewsMain setProductModal={setNewsModal} />}
      <div className="w-full flex justify-between">
        <h2 className="text-3xl max-mdx:text-2xl font-semibold">NEWS</h2>
        <button onClick={() => setNewsModal(true)} className="px-8 py-2 rounded-xl bg-greenView text-white flex gap-2 items-center">
          <p>Add News</p>
          <p className="text-3xl font-semibold">+</p>
        </button>
      </div>
      <div className="w-full grid gap-4 grid-cols-1 mdl:grid-cols-2 xl:grid-cols-4 h-auto">
        {currentItems.map((item, i) => (
          <Link key={i} href={`/news/${item.slug}`}>
            <NewCard
              key={i}
              title={item.title}
              date={item.date}
              imageSrc={item.imageSrc}
            />
          </Link>
        ))}
      </div>
      <div className="flex w-full justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
