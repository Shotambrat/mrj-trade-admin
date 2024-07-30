import { useState } from "react";
import Image from "next/image";
import NewsBlockModal from "./NewsBlockModal";

export default function NewsPreview({
  newsData,
  updateNewsData,
  newsGalleries,
  setNewsGalleries,
}) {
  const [modal, setModal] = useState(false);
  const [activeBlock, setActiveBlock] = useState(null);

  const handleEditBlock = (block) => {
    setActiveBlock(block);
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    setActiveBlock(null);
  };

  return (
    <div className="w-full flex flex-col p-12 overflow-y-scroll no-scrollbar">
      <div className="w-full flex gap-12 p-12">
        <div className="flex-1 w-full">
          <h1 className="text-3xl font-semibold">{newsData.head.title}</h1>
          <p className="text-neutral-400 leading-5">{newsData.head.body}</p>
          {newsData.head.photo && (
            <Image
              src={newsData.head.photo.url}
              width={800}
              height={600}
              alt="Main Photo"
              className="object-contain"
            />
          )}
        </div>
      </div>
      <div className="mt-0">
        {newsData.newOptions.map((block, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold">{block.heading}</h2>
            <p className="text-neutral-400">{block.text}</p>
            {block.photo && (
              <Image
                src={block.photo.url}
                width={800}
                height={600}
                alt={`Block ${index} Photo`}
                className="object-contain"
              />
            )}
            <button
              className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-greenView rounded-xl"
              onClick={() => handleEditBlock(block)}
            >
              Edit
            </button>
          </div>
        ))}
        <button
          className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-greenView rounded-xl"
          onClick={() => handleEditBlock({ heading: "", text: "", orderNum: newsData.newOptions.length + 1 })}
        >
          Add block
        </button>
      </div>
      {modal && (
        <NewsBlockModal
          block={activeBlock}
          closeModal={handleCloseModal}
          updateNewsData={updateNewsData}
        />
      )}
    </div>
  );
}